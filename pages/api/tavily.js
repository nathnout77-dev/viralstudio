// Proxy vers l'API Tavily (recherche web en temps réel pour l'assistant Œno).
// Donne un vrai grounding web à n'importe quel modèle de langage, y compris
// Groq qui n'a pas d'outil de recherche natif — lib/askIA.js appelle cette
// route en amont puis injecte les résultats dans le prompt.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.TAVILY_API_KEY) {
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

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.detail || data?.error || 'tavily_error' })
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
