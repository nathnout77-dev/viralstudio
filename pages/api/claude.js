// Proxy vers l'API Anthropic (assistant Œno + scan d'étiquette).
// Le body est forwardé tel quel : messages texte ou content blocks image (base64).
// Limite de body relevée pour les photos d'étiquettes redimensionnées côté client.
export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' },
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "missing_api_key" });
  }
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
