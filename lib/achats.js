// ── Journal d'achats (« J'achète / Je n'achète pas ») ────────────────────────
// Historique léger des décisions prises en rayon après un scan. L'assistant
// s'en sert pour profiler les goûts réels : ce qu'on achète en dit plus long
// que ce qu'on déclare aimer.
const ACHATS_KEY = 'oeno-achats'

export function loadAchats() {
  try { return JSON.parse(localStorage.getItem(ACHATS_KEY)) || [] } catch { return [] }
}

export function logAchat(entry) {
  try {
    const all = loadAchats()
    all.unshift({ ...entry, date: new Date().toISOString().slice(0, 10) })
    localStorage.setItem(ACHATS_KEY, JSON.stringify(all.slice(0, 50)))
  } catch { /* stockage plein/indispo : le scan continue sans historique */ }
}

// Résumé compact pour le prompt de l'assistant (économe en tokens).
export function resumeAchats(max = 12) {
  const all = loadAchats()
  if (!all.length) return null
  const lignes = all.slice(0, max).map(a =>
    `${a.achete ? 'ACHETÉ' : 'reposé'}|${a.appellation}|${a.type || '?'}|${a.prix ? a.prix + '€' : '?'}`
  )
  return lignes.join('\n')
}
