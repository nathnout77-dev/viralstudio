// ═══════════════════════════════════════════════════════════════════════════
// /api/scan — LE point d'entrée unique de la lecture d'étiquette.
// Reçoit l'image (base64 JPEG), exécute une course décalée à tête adaptative
// entre trois fournisseurs vision : Claude (maillon fiable, ouvre par défaut),
// Groq (modèles vision + découverte du catalogue) et Gemini (chaîne de modèles),
// en filets de sécurité — puis parse/répare le JSON du modèle. Le fournisseur
// qui a réussi la dernière lecture mène la course suivante (lambda chaude).
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
  // L'alias « latest » résiste au renouvellement du catalogue (les versions
  // épinglées deviennent « indisponibles aux nouveaux comptes ») : on l'essaie
  // en premier.
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
]

// ── Mode « rayon » : identifier PLUSIEURS bouteilles sur une photo de rayon ──
const RAYON_PROMPT = `Tu es un sommelier expert. On te montre la photo d'un RAYON de magasin (supermarché, caviste) avec plusieurs bouteilles de vin. Identifie chaque bouteille dont l'étiquette est lisible, de gauche à droite (12 maximum).
Réponds STRICTEMENT avec un objet JSON valide, sans aucun texte autour, sans balises markdown :
{"vins":[{"nom": string, "appellation": string|null, "type": "red"|"white"|"rosé"|"sweet"|null, "millesime": number|null, "prixEtiquette": number|null, "confiance": "haute"|"moyenne"|"basse"}]}
Règles :
- "nom" : ce qui identifie le mieux la bouteille (marque, domaine ou appellation lisible).
- "appellation" : l'appellation/IGP si lisible, sinon null. Ne devine pas.
- "millesime" : l'année EXACTEMENT telle qu'imprimée, sinon null. N'invente jamais.
- "prixEtiquette" : le prix affiché sur l'étiquette de rayon sous la bouteille, si lisible.
- Ne liste jamais deux fois la même référence. Ignore les bouteilles trop floues.
Si l'image n'est pas un rayon de vin ou est illisible : {"vins":[]}`

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
// `opts` : { prompt, maxTokens, consigne } — mode étiquette (défaut) ou rayon.
async function essaiGroq(model, image, trace, opts) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: opts.maxTokens,
      messages: [
        { role: 'system', content: opts.prompt },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image}` } },
            { type: 'text', text: opts.consigne },
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

async function essaiGemini(model, image, trace, opts) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: opts.prompt }] },
        contents: [{
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: image } },
            { text: opts.consigne },
          ],
        }],
        generationConfig: { maxOutputTokens: opts.maxTokens },
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

async function essaiClaude(image, trace, opts) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: opts.maxTokens,
      system: opts.prompt,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: opts.consigne },
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

  // Mode : 'etiquette' (défaut, une bouteille) ou 'rayon' (plusieurs bouteilles).
  const modeRayon = req.body?.mode === 'rayon'
  const opts = modeRayon
    ? { prompt: RAYON_PROMPT, maxTokens: 1600, consigne: 'Identifie chaque bouteille lisible de ce rayon et renvoie uniquement le JSON.' }
    : { prompt: SYSTEM_PROMPT, maxTokens: 700, consigne: "Lis cette étiquette de vin et renvoie uniquement le JSON." }

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
      const r = await tenter(() => essaiGroq(model, image, trace, opts))
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
        const r = await tenter(() => essaiGroq(model, image, trace, opts))
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
      const r = await tenter(() => essaiGemini(model, image, trace, opts))
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
    const r = await tenter(() => essaiClaude(image, trace, opts))
    if (r && typeof r === 'object') return r
    throw new Error('claude')
  }

  // ── Course décalée à tête adaptative ────────────────────────────────────
  // Le fournisseur qui a réussi la dernière lecture (lambda chaude) ouvre la
  // course. À froid, c'est Claude : Groq et Gemini reposent sur des quotas
  // gratuits volatils (modèles retirés, palier à 0) alors que la clé Anthropic
  // répond de façon fiable — inutile de lui faire attendre 8 s derrière deux
  // échecs. Les deux autres suivent en décalé comme filets de sécurité, prêts
  // à prendre le relais si Claude est lui-même limité. Le premier JSON gagne.
  const delai = ms => new Promise(r => setTimeout(r, ms))
  let gagne = false
  const enCourse = (chaine, attente, nom) => (async () => {
    if (attente) {
      await delai(attente)
      if (gagne) throw new Error('déjà-gagné')
    }
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
const memoire = { groqOk: null, geminiOk: null, gagnant: null, morts: new Set() }
