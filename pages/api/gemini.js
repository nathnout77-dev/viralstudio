// Proxy de repli vers l'API Google Gemini (assistant Œno + scan d'étiquette).
// Utilisé automatiquement par lib/askIA.js quand Anthropic est absent ou échoue.
// Reçoit un body au format Anthropic (messages texte ou blocs image base64,
// prompt système, éventuel outil web_search) et le traduit vers le format
// Gemini. Renvoie une structure IDENTIQUE à celle d'Anthropic ({content:[...]})
// afin d'être 100 % interchangeable côté composants.
export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' },
  },
}

// Modèle multimodal stable et rapide, compatible grounding google_search.
const GEMINI_MODEL = 'gemini-2.0-flash'

// Traduit un bloc de contenu Anthropic → « part » Gemini.
function blockToPart(block) {
  if (typeof block === 'string') return { text: block }
  if (block?.type === 'text') return { text: block.text || '' }
  if (block?.type === 'image' && block.source?.data) {
    return {
      inlineData: {
        mimeType: block.source.media_type || 'image/jpeg',
        data: block.source.data,
      },
    }
  }
  return null
}

// Traduit les messages Anthropic → contents Gemini (role user|model, parts).
function messagesToContents(messages) {
  return (messages || []).map(m => {
    const role = m.role === 'assistant' ? 'model' : 'user'
    let parts
    if (Array.isArray(m.content)) {
      parts = m.content.map(blockToPart).filter(Boolean)
    } else {
      parts = [{ text: String(m.content ?? '') }]
    }
    if (!parts.length) parts = [{ text: '' }]
    return { role, parts }
  })
}

// La requête demande-t-elle une recherche web ? (signal Anthropic : outil web_search)
function wantsWebSearch(tools) {
  return Array.isArray(tools) && tools.some(t =>
    t?.type?.startsWith('web_search') || t?.name === 'web_search'
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'missing_api_key' })
  }

  try {
    const { system, messages, max_tokens, tools } = req.body || {}

    const payload = {
      contents: messagesToContents(messages),
      generationConfig: {
        maxOutputTokens: max_tokens || 1500,
      },
    }
    if (system) {
      payload.systemInstruction = { parts: [{ text: String(system) }] }
    }
    // Grounding web natif de Gemini quand la requête le demande.
    // En cas d'incompatibilité, on dégrade proprement (voir plus bas).
    const webSearch = wantsWebSearch(tools)
    if (webSearch) {
      payload.tools = [{ googleSearch: {} }]
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`

    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // Dégradation propre : si le grounding fait échouer la requête, on retente
    // sans l'outil web plutôt que de planter (réponse sans recherche web).
    if (!response.ok && webSearch) {
      delete payload.tools
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    const data = await response.json()

    if (!response.ok) {
      const message = data?.error?.message || 'gemini_error'
      return res.status(response.status).json({ error: message })
    }

    // Reconstruction du format Anthropic attendu par les composants.
    const cand = data?.candidates?.[0]
    const text = (cand?.content?.parts || [])
      .map(p => (typeof p.text === 'string' ? p.text : ''))
      .join('')

    const content = [{ type: 'text', text }]

    // Signal « web utilisé » compatible avec ce que lisent les composants
    // (ils testent la présence d'un bloc server_tool_use / web_search_tool_result).
    if (cand?.groundingMetadata || cand?.grounding_metadata) {
      content.push({ type: 'server_tool_use', name: 'web_search' })
    }

    return res.status(200).json({ content, provider: 'gemini' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
