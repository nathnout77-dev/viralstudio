// Helper unique d'appel IA avec repli automatique Claude → Groq → Gemini.
//
// Toutes les fonctions IA de l'app passent par ici. On tente d'abord
// /api/claude (Anthropic, prioritaire). Si Anthropic est absent (missing_api_key),
// échoue ou renvoie une erreur, on retente /api/groq puis /api/gemini avec
// le MÊME payload. Chaque fournisseur renvoie une structure identique
// ({content:[...]}), donc l'appelant parse la réponse de la même manière
// quel que soit le fournisseur.
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

export async function askIA(payload) {
  // 1. Claude (prioritaire) — comportement actuel préservé si ANTHROPIC_API_KEY existe.
  try {
    const claude = await callProvider('/api/claude', payload)
    if (claude.ok) return claude
  } catch {
    // erreur réseau côté Claude → on bascule sur Gemini
  }

  // 2. Repli Groq (rapide, palier gratuit généreux).
  try {
    const groq = await callProvider('/api/groq', payload)
    if (groq.ok) return groq
  } catch {
    // erreur réseau côté Groq → on bascule sur Gemini
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
