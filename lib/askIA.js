// Helper unique d'appel IA avec repli automatique Groq → Claude → Gemini.
//
// Toutes les fonctions IA de l'app passent par ici. On tente d'abord
// /api/groq (rapide, prioritaire pour la réactivité du chat/scanner). Si
// Groq est absent (missing_api_key), échoue ou renvoie une erreur, on
// retente /api/claude puis /api/gemini avec le MÊME payload. Chaque
// fournisseur renvoie une structure identique ({content:[...]}), donc
// l'appelant parse la réponse de la même manière quel que soit le fournisseur.
//
// Note : /api/claude et /api/gemini gèrent l'outil web_search (recherche
// web en direct pour l'actualité du vin / enrichissement des découvertes).
// Groq ne le supporte pas nativement — si le payload demande web_search,
// on saute Groq et on part directement sur Claude pour ne pas perdre cette
// capacité.
//
// Renvoie toujours { ok, data } pour refléter le pattern fetch d'origine :
// - ok:true  → data contient un content exploitable
// - ok:false → les trois fournisseurs ont échoué ; l'appelant affiche son
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

export async function askIA(payload) {
  const needsWebSearch = wantsWebSearch(payload?.tools)

  // 1. Groq (prioritaire, réponse la plus rapide) — sauf si la requête a
  // besoin de web_search, que Groq ne supporte pas nativement.
  if (!needsWebSearch) {
    try {
      const groq = await callProvider('/api/groq', payload)
      if (groq.ok) return groq
    } catch {
      // erreur réseau côté Groq → on bascule sur Claude
    }
  }

  // 2. Repli Claude (gère aussi web_search).
  try {
    const claude = await callProvider('/api/claude', payload)
    if (claude.ok) return claude
  } catch {
    // erreur réseau côté Claude → on bascule sur Gemini
  }

  // 3. Repli Gemini.
  try {
    const gemini = await callProvider('/api/gemini', payload)
    return gemini
  } catch {
    return { ok: false, data: { error: 'all_failed' } }
  }
}

export default askIA
