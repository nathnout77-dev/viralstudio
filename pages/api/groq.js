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

// Chaîne de modèles texte, du meilleur au plus léger. Les quotas gratuits
// Groq sont comptés PAR MODÈLE et PAR MINUTE : quand un modèle atteint sa
// limite (429/413), le suivant a encore son propre budget intact. Avec
// quatre modèles, une conversation soutenue reste fluide (≥ 4 questions
// par minute) même sur le plan gratuit. Un modèle inconnu/retiré (404)
// est simplement sauté, la chaîne reste robuste aux évolutions du catalogue.
const GROQ_TEXT_MODELS = [
  'llama-3.3-70b-versatile',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
]
// Modèles multimodaux (vision) pour le scan d'étiquette, même logique de
// chaîne : quotas séparés par modèle, 404 toléré si le catalogue évolue.
const GROQ_VISION_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
]

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
    const models = hasImage(messages) ? GROQ_VISION_MODELS : GROQ_TEXT_MODELS

    const basePayload = {
      messages: messagesToOpenAI(messages, system),
      max_tokens: max_tokens || 1500,
    }

    const callGroq = body => fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    let response = null
    let data = null

    for (const model of models) {
      response = await callGroq({ ...basePayload, model })
      data = await response.json().catch(() => null)

      if (response.ok) {
        const text = data?.choices?.[0]?.message?.content || ''
        return res.status(200).json({ content: [{ type: 'text', text }], provider: 'groq', model })
      }

      // Quota par minute atteint (429/413) ou modèle retiré du catalogue
      // (404/400) : le suivant de la chaîne a son propre budget, on continue.
      const skippable = [429, 413, 404, 400].includes(response.status)
      console.error(`[groq] ${response.status} sur ${model}${skippable ? ', modèle suivant' : ''}`, data?.error?.message || '')
      if (!skippable) break
    }

    const message = response && (response.status === 429 || response.status === 413)
      ? 'Quota Groq momentanément dépassé — réessayez dans une minute.'
      : (data?.error?.message || 'groq_error')
    return res.status(response ? response.status : 500).json({ error: message })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
