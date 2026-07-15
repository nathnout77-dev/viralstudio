// Helper unique d'appel IA avec repli automatique Groq → Gemini → Claude,
// et grounding web via Tavily quand la requête le demande.
//
// Toutes les fonctions IA de l'app passent par ici. On tente d'abord
// /api/groq (rapide, prioritaire pour la réactivité du chat/scanner). Si
// Groq est absent (missing_api_key), échoue ou renvoie une erreur, on
// retente /api/gemini puis /api/claude avec le MÊME payload. Claude est en
// dernier recours (clé payante, généralement non configurée) — l'appel
// échoue simplement avec missing_api_key sans bloquer la chaîne. Chaque
// fournisseur renvoie une structure identique ({content:[...]}), donc
// l'appelant parse la réponse de la même manière quel que soit le fournisseur.
//
// Web search : Groq n'a pas d'outil de recherche natif contrairement à
// Claude et Gemini. Quand le payload demande web_search (actualité du vin,
// enrichissement des découvertes), on interroge d'abord /api/tavily avec la
// dernière question de l'utilisateur, on injecte les résultats dans le
// prompt système, puis on tente quand même Groq en premier (rapide) avec ce
// contexte déjà « pré-recherché ». Si Tavily échoue ou n'a rien trouvé, on
// se rabat sur Gemini/Claude qui ont leur propre recherche web intégrée.
//
// Renvoie toujours { ok, data } pour refléter le pattern fetch d'origine :
// - ok:true  → data contient un content exploitable
// - ok:false → tous les fournisseurs ont échoué ; l'appelant affiche son
//   fallback local élégant (comportement inchangé si aucune clé n'est configurée).

// Une réponse est-elle exploitable ? (ni erreur HTTP, ni erreur applicative)
function isUsable(res, data) {
  return res.ok && !data?.error && data?.type !== 'error'
}

async function callProvider(endpoint, payload) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: isUsable(res, data), data }
}

function wantsWebSearch(tools) {
  return Array.isArray(tools) && tools.some(t =>
    t?.type?.startsWith('web_search') || t?.name === 'web_search'
  )
}

// Texte de la dernière question utilisateur — sert de requête pour Tavily.
function extractQuery(messages) {
  const lastUser = [...(messages || [])].reverse().find(m => m.role === 'user')
  if (!lastUser) return ''
  if (Array.isArray(lastUser.content)) {
    const block = lastUser.content.find(b => typeof b === 'string' || b?.type === 'text')
    return typeof block === 'string' ? block : (block?.text || '')
  }
  return String(lastUser.content ?? '')
}

async function tavilySearch(query) {
  try {
    const res = await fetch('/api/tavily', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, max_results: 5 }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data?.error) return null
    return data
  } catch {
    return null
  }
}

function formatTavilyContext(data) {
  const lines = []
  if (data?.answer) lines.push(`Résumé : ${data.answer}`)
  for (const r of (data?.results || []).slice(0, 5)) {
    lines.push(`- ${r.title} (${r.url}) : ${(r.content || '').slice(0, 300)}`)
  }
  if (!lines.length) return ''
  return `\n\n[Résultats de recherche web en direct (Tavily), à utiliser en priorité pour répondre] :\n${lines.join('\n')}`
}

// Le palier gratuit Groq rejette (413) les requêtes dépassant ~6000 tokens
// (prompt + réponse). Le prompt de l'Assistant est calibré compact pour
// passer (~15 Ko) ; au-delà de ce seuil on saute Groq directement plutôt
// que de perdre du temps sur un aller-retour voué à l'échec.
const MAX_GROQ_CHARS = 20000

function tooLargeForGroq(payload) {
  if (Array.isArray(payload?.messages) && payload.messages.some(
    m => Array.isArray(m.content) && m.content.some(b => b?.type === 'image')
  )) return true // images : réservées aux modèles vision de Claude/Gemini
  try {
    return JSON.stringify(payload).length > MAX_GROQ_CHARS
  } catch {
    return true
  }
}

// Cette erreur signale-t-elle un quota/débit dépassé (temporaire) plutôt
// qu'une vraie indisponibilité ? Permet à l'UI d'afficher « patientez une
// minute » au lieu du mode hors-ligne.
function isRateLimit(data) {
  return /quota|429|rate.?limit|too many/i.test(String(data?.error || ''))
}

export async function askIA(payload) {
  const needsWebSearch = wantsWebSearch(payload?.tools)
  let groqPayload = payload
  let sawRateLimit = false

  if (needsWebSearch) {
    const query = extractQuery(payload?.messages)
    const tavily = query ? await tavilySearch(query) : null
    const context = tavily ? formatTavilyContext(tavily) : ''
    if (context) {
      groqPayload = { ...payload, system: `${payload.system || ''}${context}` }
    } else {
      groqPayload = null // pas de grounding trouvé → on saute Groq, direction Gemini/Claude natifs
    }
  }

  if (groqPayload && tooLargeForGroq(groqPayload)) groqPayload = null

  // 1. Groq (prioritaire, réponse la plus rapide) — avec contexte Tavily
  // injecté si la requête avait besoin de web_search, sauf si le prompt est
  // trop volumineux pour le palier gratuit Groq.
  if (groqPayload) {
    try {
      const groq = await callProvider('/api/groq', groqPayload)
      if (groq.ok) return groq
      if (isRateLimit(groq.data)) sawRateLimit = true
    } catch {
      // erreur réseau côté Groq → on bascule sur Gemini
    }
  }

  // 2. Repli Gemini (gère aussi web_search nativement).
  try {
    const gemini = await callProvider('/api/gemini', payload)
    if (gemini.ok) return gemini
    if (isRateLimit(gemini.data)) sawRateLimit = true
  } catch {
    // erreur réseau côté Gemini → on bascule sur Claude
  }

  // 3. Repli Claude, en tout dernier recours (clé payante, non configurée
  // par défaut — cet appel échoue proprement avec missing_api_key si
  // ANTHROPIC_API_KEY est absent, sans casser le reste de la chaîne).
  try {
    const claude = await callProvider('/api/claude', payload)
    if (claude.ok) return claude
    if (isRateLimit(claude.data)) sawRateLimit = true
    return sawRateLimit ? { ok: false, data: { error: 'rate_limited' } } : claude
  } catch {
    return { ok: false, data: { error: sawRateLimit ? 'rate_limited' : 'all_failed' } }
  }
}

export default askIA
