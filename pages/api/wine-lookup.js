// ═══════════════════════════════════════════════════════════════════════════
// /api/wine-lookup — recherche internet d'un vin par son NOM (texte, pas image).
// Sert le repli « ce vin n'est pas dans la bibliothèque » de l'ajout en cave :
// l'utilisateur tape « Mouton Cadet 2020 », « Château X », un vin de rayon…
// et on renvoie une fiche structurée à préremplir dans le formulaire.
// Même course décalée à tête adaptative que /api/scan (Claude fiable en tête,
// Groq/Gemini en filets), mais en mode TEXTE.
// Renvoie :
//   200 { json }               → { trouve, appellation, region, type, cepages,
//                                  domaine, millesime, serviceTemp, carafage,
//                                  drinkFrom, drinkUntil, accords, prixMoyen,
//                                  description, confiance }
//   4xx/5xx { error, detail }  → error: 'quota'|'config'|'api'|'introuvable'
// ═══════════════════════════════════════════════════════════════════════════
export const config = { maxDuration: 30 }

const LOOKUP_PROMPT = `Tu es un sommelier expert qui aide quelqu'un à ajouter un vin à sa cave. On te donne le NOM d'un vin tapé à la main (appellation, château/domaine, marque de supermarché, éventuellement un millésime). Identifie ce vin du mieux possible et renvoie sa fiche.
Réponds STRICTEMENT avec un objet JSON valide, sans aucun texte autour, sans balises markdown :
{"trouve": boolean, "appellation": string|null, "region": string|null, "type": "red"|"white"|"rosé"|"sparkling"|"sweet"|null, "cepages": string[], "domaine": string|null, "millesime": number|null, "serviceTemp": number|null, "carafage": string|null, "drinkFrom": number|null, "drinkUntil": number|null, "accords": string[], "prixMoyen": number|null, "description": string, "confiance": "haute"|"moyenne"|"basse"}
Règles :
- "trouve" : true dès que tu peux proposer une identification exploitable (même pour un vin de supermarché modeste). false uniquement si le texte ne désigne aucun vin plausible.
- "appellation" : l'appellation officielle (AOC/AOP ex. "Gevrey-Chambertin" ; IGP ex. "Pays d'Oc" ; ou "Vin de France"). Si le texte est surtout une marque (ex. "Mouton Cadet"), garde l'appellation réelle du vin ("Bordeaux") et mets la marque dans "domaine".
- "region" : région viticole française ("Bordeaux", "Bourgogne", "Rhône Nord", "Rhône Sud", "Loire", "Alsace", "Beaujolais", "Provence", "Languedoc", "Roussillon", "Sud-Ouest", "Jura", "Savoie", "Corse", "Champagne") ou le pays si le vin est étranger.
- "type" : la couleur ("red", "white", "rosé", "sparkling" pour un effervescent, "sweet" pour un liquoreux).
- "cepages" : les cépages du vin, déduits de l'appellation en respectant STRICTEMENT son cahier des charges.
- "domaine" : le producteur, château, domaine ou marque commerciale si présent dans le texte.
- "millesime" : l'année si elle figure dans le texte, sinon null. N'invente jamais de millésime.
- "serviceTemp" : température de service idéale en °C (nombre entier, ex. 17).
- "carafage" : durée de carafage conseillée (ex. "1h", "30 min") ou null si inutile.
- "drinkFrom"/"drinkUntil" : fenêtre de garde en ANNÉES APRÈS le millésime (ex. un vin à boire jeune : 0 et 3 ; un grand vin de garde : 8 et 25).
- "accords" : 3 à 5 accords mets-vins concrets et courants.
- "prixMoyen" : prix moyen réaliste en euros la bouteille en France.
- "description" : 2 à 3 phrases simples, sans jargon, sur le style et à quoi s'attendre.
- "confiance" : ta certitude sur l'identification.
Si le texte ne désigne aucun vin identifiable : {"trouve":false,"appellation":null,"region":null,"type":null,"cepages":[],"domaine":null,"millesime":null,"serviceTemp":null,"carafage":null,"drinkFrom":null,"drinkUntil":null,"accords":[],"prixMoyen":null,"description":"","confiance":"basse"}`

const GEMINI_MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash']
const GROQ_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']

function parseJSONRobuste(text) {
  const cleaned = String(text || '').replace(/```json|```/g, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end <= start) return null
  try { return JSON.parse(cleaned.slice(start, end + 1)) } catch { return null }
}

async function essaiClaude(query, trace) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 600,
      system: LOOKUP_PROMPT,
      messages: [{ role: 'user', content: `Vin à identifier : « ${query} ». Renvoie uniquement le JSON.` }],
    }),
  })
  const data = await res.json().catch(() => null)
  if (res.ok) { trace.push('claude:ok'); return { text: (data?.content || []).find(b => b.type === 'text')?.text || '' } }
  trace.push(`claude:${res.status}`)
  console.error(`[wine-lookup] claude ${res.status}`, data?.error?.message || '')
  return { status: res.status }
}

async function essaiGroq(model, query, trace) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model, max_tokens: 600,
      messages: [
        { role: 'system', content: LOOKUP_PROMPT },
        { role: 'user', content: `Vin à identifier : « ${query} ». Renvoie uniquement le JSON.` },
      ],
    }),
  })
  const data = await res.json().catch(() => null)
  if (res.ok) { trace.push(`groq/${model}:ok`); return { text: data?.choices?.[0]?.message?.content || '' } }
  trace.push(`groq/${model}:${res.status}`)
  return { status: res.status }
}

async function essaiGemini(model, query, trace) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: LOOKUP_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: `Vin à identifier : « ${query} ». Renvoie uniquement le JSON.` }] }],
        generationConfig: { maxOutputTokens: 700 },
      }),
    }
  )
  const data = await res.json().catch(() => null)
  if (res.ok) {
    trace.push(`gemini/${model}:ok`)
    return { text: (data?.candidates?.[0]?.content?.parts || []).map(p => (typeof p.text === 'string' ? p.text : '')).join('') }
  }
  trace.push(`gemini/${model}:${res.status}`)
  return { status: res.status }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const query = String(req.body?.query || '').trim()
  if (query.length < 2) return res.status(400).json({ error: 'api', detail: 'requête vide' })

  const trace = []
  let vuQuota = false
  const noteQuota = s => { if (s === 429) vuQuota = true }

  const tenter = async (fn) => {
    const r = await fn()
    if (r.text !== undefined) {
      const json = parseJSONRobuste(r.text)
      if (json) return json
      trace[trace.length - 1] += '(json-invalide)'
      return null
    }
    noteQuota(r.status)
    return r.status
  }

  const chaineClaude = async () => {
    if (!process.env.ANTHROPIC_API_KEY) { trace.push('claude:pas-de-clé'); throw new Error('claude') }
    const r = await tenter(() => essaiClaude(query, trace))
    if (r && typeof r === 'object') return r
    throw new Error('claude')
  }
  const chaineGroq = async () => {
    if (!process.env.GROQ_API_KEY) { trace.push('groq:pas-de-clé'); throw new Error('groq') }
    for (const model of GROQ_MODELS) {
      const r = await tenter(() => essaiGroq(model, query, trace))
      if (r && typeof r === 'object') return r
      if (typeof r === 'number' && ![404, 400, 429].includes(r)) break
    }
    throw new Error('groq')
  }
  const chaineGemini = async () => {
    if (!process.env.GEMINI_API_KEY) { trace.push('gemini:pas-de-clé'); throw new Error('gemini') }
    for (const model of GEMINI_MODELS) {
      const r = await tenter(() => essaiGemini(model, query, trace))
      if (r && typeof r === 'object') return r
      if (typeof r === 'number' && ![404, 400, 429].includes(r)) break
    }
    throw new Error('gemini')
  }

  const delai = ms => new Promise(r => setTimeout(r, ms))
  let gagne = false
  const enCourse = (chaine, attente, nom) => (async () => {
    if (attente) { await delai(attente); if (gagne) throw new Error('déjà-gagné') }
    const json = await chaine()
    gagne = true
    memoire.gagnant = nom
    return json
  })()

  const chaines = { claude: chaineClaude, groq: chaineGroq, gemini: chaineGemini }
  const ordreDefaut = ['claude', 'groq', 'gemini']
  const tete = memoire.gagnant && ordreDefaut.includes(memoire.gagnant)
    ? [memoire.gagnant, ...ordreDefaut.filter(f => f !== memoire.gagnant)]
    : ordreDefaut
  const delais = [0, 3000, 5000]

  try {
    const json = await Promise.any(tete.map((nom, i) => enCourse(chaines[nom], delais[i], nom)))
    return res.status(200).json({ json, trace })
  } catch {
    const detail = trace.join(' · ')
    console.error('[wine-lookup] échec :', detail)
    const aucuneCle = !process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY && !process.env.ANTHROPIC_API_KEY
    const error = aucuneCle ? 'config' : vuQuota ? 'quota' : 'api'
    return res.status(vuQuota ? 429 : 502).json({ error, detail })
  }
}

const memoire = { gagnant: null }
