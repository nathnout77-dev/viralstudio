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

// Chaîne de modèles multimodaux, du plus récent au plus ancien : Google
// renouvelle son catalogue et retire les anciens (404) — un modèle mort est
// simplement sauté, le suivant prend le relais. Tous gèrent la vision et le
// grounding google_search.
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
]

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

    const appeler = (model, body) => fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    )

    let response = null
    let data = null
    for (const model of GEMINI_MODELS) {
      response = await appeler(model, payload)

      // Dégradation propre : si le grounding fait échouer la requête, on
      // retente ce modèle sans l'outil web plutôt que de planter. Jamais sur
      // un 429 (quota) : ça ne ferait qu'aggraver la limitation.
      if (!response.ok && webSearch && response.status !== 429) {
        const sansOutil = { ...payload }
        delete sansOutil.tools
        response = await appeler(model, sansOutil)
      }

      data = await response.json().catch(() => null)
      if (response.ok) break

      // Modèle retiré du catalogue (404/400) ou quota de CE modèle atteint
      // (429, quotas séparés par modèle) : le suivant prend le relais.
      const skippable = [404, 400, 429].includes(response.status)
      console.error(`[gemini] ${response.status} sur ${model}${skippable ? ', modèle suivant' : ''}`, data?.error?.message || '')
      if (!skippable) break
    }

    if (!response || !response.ok) {
      const message = response?.status === 429
        ? 'Quota Gemini momentanément dépassé — réessayez dans une minute.'
        : (data?.error?.message || 'gemini_error')
      return res.status(response ? response.status : 500).json({ error: message })
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
