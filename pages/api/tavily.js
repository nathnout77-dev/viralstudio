// Proxy vers l'API Tavily (recherche web en temps réel pour l'assistant Œno).
// Donne un vrai grounding web à n'importe quel modèle de langage, y compris
// Groq qui n'a pas d'outil de recherche natif — lib/askIA.js appelle cette
// route en amont puis injecte les résultats dans le prompt.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.TAVILY_API_KEY) {
    console.error('[tavily] TAVILY_API_KEY absente des variables d\'environnement')
    return res.status(500).json({ error: 'missing_api_key' })
  }

  try {
    const { query, max_results } = req.body || {}
    if (!query) return res.status(400).json({ error: 'missing_query' })

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'basic',
        max_results: max_results || 5,
        include_answer: true,
      }),
    })

    // Tavily peut renvoyer du texte brut (ex. "Unauthorized") sur certaines
    // erreurs d'authentification plutôt que du JSON — on évite un crash.
    const raw = await response.text()
    let data = null
    try { data = raw ? JSON.parse(raw) : null } catch {}

    if (!response.ok) {
      const message = data?.detail || data?.error || raw?.slice(0, 200) || 'tavily_error'
      console.error('[tavily] erreur API', response.status, message)
      return res.status(response.status).json({ error: message })
    }

    return res.status(200).json(data || {})
  } catch (err) {
    console.error('[tavily] exception', err.message)
    return res.status(500).json({ error: err.message })
  }
}
