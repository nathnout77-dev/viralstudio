// ═══════════════════════════════════════════════════════════════════════════
// /api/scan — LE point d'entrée unique de la lecture d'étiquette.
// Reçoit l'image (base64 JPEG), exécute toute la chaîne côté serveur :
//   Groq (modèles vision + découverte du catalogue) → Gemini (chaîne de
//   modèles) → Claude — puis parse/répare le JSON du modèle.
// Renvoie :
//   200 { json }                       → lecture réussie
//   4xx/5xx { error, detail }          → error: 'quota'|'config'|'api'|'unreadable'
//     `detail` trace CHAQUE tentative (« groq/scout:404 · gemini/2.5-flash:429 … »)
//     pour un diagnostic immédiat, à l'écran comme dans les logs Vercel.
// ═══════════════════════════════════════════════════════════════════════════
export const config = {
  api: { bodyParser: { sizeLimit: '4mb' } },
  maxDuration: 60,
}

// Le prompt de lecture COMPLET (identique à celui historique du client) :
// les écrans de résultat exploitent tous ces champs, y compris pour les vins
// hors bibliothèque (styleEtQualite, pourQui, accords, fourchette de prix).
const SYSTEM_PROMPT = `Tu es un sommelier expert capable d'identifier N'IMPORTE QUELLE bouteille de vin à partir de la photo de son étiquette : grand cru comme vin de supermarché premier prix, vin français (AOC/AOP, IGP, Vin de France) comme vin étranger de tout pays. Tu aides quelqu'un à évaluer une bouteille EN RAYON, en magasin, avant de l'acheter. Tu dois TOUJOURS fournir une identification exploitable dès que l'étiquette est lisible — ne renonce jamais sous prétexte que le vin serait modeste, générique ou inconnu.
On te montre la photo d'une étiquette de bouteille. Réponds STRICTEMENT avec un objet JSON valide, sans aucun texte autour, sans balises markdown :
{"appellation": string|null, "region": string|null, "cepages": string[], "type": "red"|"white"|"rosé"|"sweet"|null, "millesime": number|null, "domaine": string|null, "confiance": "haute"|"moyenne"|"basse", "styleEtQualite": string, "pourQui": string, "accordsSuggeres": string[], "fourchettePrixHabituelle": {"min": number, "max": number}}
Règles :
- "appellation" : l'appellation officielle si elle existe (AOC/AOP ex. "Gevrey-Chambertin", "Chianti Classico" ; IGP ex. "Pays d'Oc" ; ou "Vin de France"). S'il n'y a AUCUNE appellation lisible, mets à la place le nom le plus identifiant de l'étiquette (nom de cuvée ou de marque, ex. "Roche Mazet Cabernet-Syrah"). Ne mets "appellation" à null QUE si rien d'identifiable n'est lisible.
- "region" : la région viticole française ("Bordeaux", "Bourgogne", "Rhône Nord", "Rhône Sud", "Loire", "Alsace", "Beaujolais", "Provence", "Languedoc", "Roussillon", "Sud-Ouest", "Jura", "Savoie", "Corse", "Champagne") OU le pays/région si le vin est étranger ("Italie", "Espagne", "Portugal", "Allemagne", "Autriche", "Chili", "Argentine", "États-Unis", "Afrique du Sud", "Australie", "Nouvelle-Zélande", etc.).
- "cepages" : les cépages écrits sur l'étiquette si présents (fréquent sur les IGP et vins étrangers) ; sinon déduis-les de l'appellation en respectant STRICTEMENT son cahier des charges (ex. un Anjou blanc = Chenin blanc, un Cahors = Malbec ; JAMAIS un cépage étranger à l'appellation).
- "type" : la couleur du vin ("red", "white", "rosé", ou "sweet" pour un liquoreux).
- "millesime" : l'année EXACTEMENT telle qu'elle est imprimée sur l'étiquette. Les vins de supermarché sont le plus souvent très récents (2021 à 2025) : lis le millésime avec attention et ne le rajeunis ni ne le vieillis pas. Si aucune année n'apparaît (vin non millésimé / "sans année"), mets null — n'invente JAMAIS de millésime.
- "domaine" : le producteur, château, domaine, cave coopérative ou marque commerciale visible sur l'étiquette.
- "confiance" : ton niveau de certitude global sur la lecture.
- "styleEtQualite" : 2 à 3 phrases, ton simple et sans jargon, décrivant le style et les qualités attendues de ce type de vin. Comme un ami connaisseur qui te dit honnêtement à quoi t'attendre.
- "pourQui" : une courte phrase disant à qui ce vin va plaire.
- "accordsSuggeres" : 3 à 4 plats concrets et courants, cohérents avec le style du vin.
- "fourchettePrixHabituelle" : estimation réaliste de la fourchette de prix en euros que ce vin coûte habituellement en France, {min, max}. Pour un vin de supermarché générique, la fourchette peut démarrer bas (3 à 8 €). Ne mentionne JAMAIS un magasin, une enseigne ou un point de vente précis.
Si l'image n'est pas une étiquette de vin ou est totalement illisible, réponds exactement : {"appellation":null,"region":null,"cepages":[],"type":null,"millesime":null,"domaine":null,"confiance":"basse","styleEtQualite":"","pourQui":"","accordsSuggeres":[],"fourchettePrixHabituelle":null}`

const GROQ_VISION_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
  'llama-3.2-90b-vision-preview',
  'llama-3.2-11b-vision-preview',
]

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
]

// ── Parsing tolérant : isole le JSON, répare les réponses tronquées ────────
function parseJSONRobuste(text) {
  const cleaned = String(text || '').replace(/```json|```/g, '').trim()
  const start = cleaned.indexOf('{')
  if (start === -1) return null
  const end = cleaned.lastIndexOf('}')
  if (end > start) {
    try { return JSON.parse(cleaned.slice(start, end + 1)) } catch { /* réparation */ }
  }
  let brut = cleaned.slice(start)
  for (let i = 0; i < 24; i++) {
    const coupe = Math.max(brut.lastIndexOf(','), brut.lastIndexOf('['), brut.lastIndexOf('{'))
    if (coupe <= 0) return null
    brut = brut.slice(0, coupe)
    let dansChaine = false
    const pile = []
    for (let j = 0; j < brut.length; j++) {
      const c = brut[j]
      if (c === '"' && brut[j - 1] !== '\\') dansChaine = !dansChaine
      if (dansChaine) continue
      if (c === '{' || c === '[') pile.push(c)
      if (c === '}' || c === ']') pile.pop()
    }
    if (dansChaine) continue
    let fermetures = ''
    for (let j = pile.length - 1; j >= 0; j--) fermetures += pile[j] === '{' ? '}' : ']'
    try { return JSON.parse(brut + fermetures) } catch { /* on recoupe plus tôt */ }
  }
  return null
}

// ── Fournisseurs ────────────────────────────────────────────────────────────
async function essaiGroq(model, image, trace) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image}` } },
            { type: 'text', text: "Lis cette étiquette de vin et renvoie uniquement le JSON." },
          ],
        },
      ],
    }),
  })
  const data = await res.json().catch(() => null)
  if (res.ok) {
    trace.push(`groq/${model.split('/').pop()}:ok`)
    return { text: data?.choices?.[0]?.message?.content || '' }
  }
  trace.push(`groq/${model.split('/').pop()}:${res.status}`)
  console.error(`[scan] groq ${res.status} sur ${model}`, data?.error?.message || '')
  return { status: res.status }
}

async function decouvrirModelesGroq(trace) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !Array.isArray(data?.data)) return []
    const vision = data.data.map(m => m.id)
      .filter(id => /vision|scout|maverick|llama-4|pixtral|multimodal/i.test(id))
    console.error('[scan] catalogue vision groq :', vision.join(', ') || '(aucun)')
    trace.push(`catalogue:${vision.length}`)
    return vision.filter(id => !GROQ_VISION_MODELS.includes(id))
  } catch { return [] }
}

async function essaiGemini(model, image, trace) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: image } },
            { text: "Lis cette étiquette de vin et renvoie uniquement le JSON." },
          ],
        }],
        generationConfig: { maxOutputTokens: 700 },
      }),
    }
  )
  const data = await res.json().catch(() => null)
  if (res.ok) {
    trace.push(`gemini/${model}:ok`)
    const text = (data?.candidates?.[0]?.content?.parts || [])
      .map(p => (typeof p.text === 'string' ? p.text : '')).join('')
    return { text }
  }
  trace.push(`gemini/${model}:${res.status}`)
  console.error(`[scan] gemini ${res.status} sur ${model}`, data?.error?.message || '')
  return { status: res.status }
}

async function essaiClaude(image, trace) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: "Lis cette étiquette de vin et renvoie uniquement le JSON." },
        ],
      }],
    }),
  })
  const data = await res.json().catch(() => null)
  if (res.ok) {
    trace.push('claude:ok')
    return { text: (data?.content || []).find(b => b.type === 'text')?.text || '' }
  }
  trace.push(`claude:${res.status}`)
  console.error(`[scan] claude ${res.status}`, data?.error?.message || '')
  return { status: res.status }
}

// ── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const image = req.body?.image
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'api', detail: 'image absente du corps de la requête' })
  }

  const trace = []
  let vuQuota = false
  const skippable = s => [429, 413, 404, 400].includes(s)
  const noteQuota = s => { if (s === 429 || s === 413) vuQuota = true }

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

  // ── Chaînes par fournisseur : résolvent avec le JSON, rejettent sinon ────
  const chaineGroq = async () => {
    if (!process.env.GROQ_API_KEY) { trace.push('groq:pas-de-clé'); throw new Error('groq') }
    // Le modèle gagnant de la dernière lecture (lambda chaude) passe en tête,
    // les modèles vus morts (404/400) sont écartés : zéro aller-retour perdu.
    const ordre = [
      ...(memoire.groqOk ? [memoire.groqOk] : []),
      ...GROQ_VISION_MODELS.filter(m => m !== memoire.groqOk && !memoire.morts.has(m)),
    ]
    let dernierStatus = null
    for (const model of ordre) {
      const r = await tenter(() => essaiGroq(model, image, trace))
      if (r && typeof r === 'object') { memoire.groqOk = model; return r }
      if (typeof r === 'number') {
        dernierStatus = r
        if ([404, 400].includes(r)) memoire.morts.add(model)
        if (!skippable(r)) break
      }
    }
    if ([400, 404].includes(dernierStatus) || ordre.length === 0) {
      const decouverts = await decouvrirModelesGroq(trace)
      for (const model of decouverts.slice(0, 3)) {
        const r = await tenter(() => essaiGroq(model, image, trace))
        if (r && typeof r === 'object') { memoire.groqOk = model; return r }
      }
    }
    throw new Error('groq')
  }

  const chaineGemini = async () => {
    if (!process.env.GEMINI_API_KEY) { trace.push('gemini:pas-de-clé'); throw new Error('gemini') }
    const ordre = [
      ...(memoire.geminiOk ? [memoire.geminiOk] : []),
      ...GEMINI_MODELS.filter(m => m !== memoire.geminiOk && !memoire.morts.has(m)),
    ]
    for (const model of ordre) {
      const r = await tenter(() => essaiGemini(model, image, trace))
      if (r && typeof r === 'object') { memoire.geminiOk = model; return r }
      if (typeof r === 'number') {
        if ([404, 400].includes(r)) memoire.morts.add(model)
        if (!skippable(r)) break
      }
    }
    throw new Error('gemini')
  }

  const chaineClaude = async () => {
    if (!process.env.ANTHROPIC_API_KEY) { trace.push('claude:pas-de-clé'); throw new Error('claude') }
    const r = await tenter(() => essaiClaude(image, trace))
    if (r && typeof r === 'object') return r
    throw new Error('claude')
  }

  // ── Course décalée : Groq part immédiatement ; si aucune réponse en 4 s,
  // Gemini entre en course en PARALLÈLE (puis Claude à 8 s). Le premier JSON
  // valide gagne — le temps de lecture n'est plus la somme des échecs.
  const delai = ms => new Promise(r => setTimeout(r, ms))
  let gagne = false
  const enCourse = (chaine, attente) => (async () => {
    if (attente) {
      await delai(attente)
      if (gagne) throw new Error('déjà-gagné')
    }
    const json = await chaine()
    gagne = true
    return json
  })()

  try {
    const json = await Promise.any([
      enCourse(chaineGroq, 0),
      enCourse(chaineGemini, 4000),
      enCourse(chaineClaude, 8000),
    ])
    return res.status(200).json({ json, trace })
  } catch {
    // Toutes les chaînes ont échoué — verdict + trace pour diagnostic
    const detail = trace.join(' · ')
    console.error('[scan] échec complet :', detail)
    const aucuneCle = !process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY && !process.env.ANTHROPIC_API_KEY
    const error = aucuneCle ? 'config' : vuQuota ? 'quota' : 'api'
    return res.status(vuQuota ? 429 : 502).json({ error, detail })
  }
}

// Mémoire de la lambda chaude : modèle gagnant par fournisseur + modèles
// morts (404/400), pour que les lectures suivantes partent du bon endroit.
const memoire = { groqOk: null, geminiOk: null, morts: new Set() }
