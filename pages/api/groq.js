// Proxy de repli vers l'API Groq (assistant Œno + scan d'étiquette).
// Utilisé automatiquement par lib/askIA.js quand Anthropic et Gemini sont
// absents ou échouent. Reçoit un body au format Anthropic (messages texte
// ou blocs image base64, prompt système) et le traduit vers le format
// OpenAI-compatible de Groq. Renvoie une structure IDENTIQUE à celle
// d'Anthropic ({content:[...]}) afin d'être 100 % interchangeable côté
// composants.
export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' },
  },
}

// Modèle texte rapide et gratuit sur Groq.
const GROQ_TEXT_MODEL = 'llama-3.3-70b-versatile'
// Modèle multimodal (vision) pour le scan d'étiquette.
const GROQ_VISION_MODEL = 'llama-3.2-90b-vision-preview'

// Traduit un bloc de contenu Anthropic → « part » OpenAI.
function blockToPart(block) {
  if (typeof block === 'string') return { type: 'text', text: block }
  if (block?.type === 'text') return { type: 'text', text: block.text || '' }
  if (block?.type === 'image' && block.source?.data) {
    const mime = block.source.media_type || 'image/jpeg'
    return {
      type: 'image_url',
      image_url: { url: `data:${mime};base64,${block.source.data}` },
    }
  }
  return null
}

function messagesToOpenAI(messages, system) {
  const out = []
  if (system) out.push({ role: 'system', content: String(system) })
  for (const m of messages || []) {
    const role = m.role === 'assistant' ? 'assistant' : 'user'
    if (Array.isArray(m.content)) {
      const parts = m.content.map(blockToPart).filter(Boolean)
      out.push({ role, content: parts.length ? parts : [{ type: 'text', text: '' }] })
    } else {
      out.push({ role, content: String(m.content ?? '') })
    }
  }
  return out
}

function hasImage(messages) {
  return (messages || []).some(
    m => Array.isArray(m.content) && m.content.some(b => b?.type === 'image')
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'missing_api_key' })
  }

  try {
    const { system, messages, max_tokens } = req.body || {}
    const model = hasImage(messages) ? GROQ_VISION_MODEL : GROQ_TEXT_MODEL

    const payload = {
      model,
      messages: messagesToOpenAI(messages, system),
      max_tokens: max_tokens || 1500,
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      const message = response.status === 429
        ? 'Quota Groq momentanément dépassé — réessayez dans une minute.'
        : (data?.error?.message || 'groq_error')
      return res.status(response.status).json({ error: message })
    }

    const text = data?.choices?.[0]?.message?.content || ''
    return res.status(200).json({ content: [{ type: 'text', text }], provider: 'groq' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
