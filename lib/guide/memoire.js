// ═══════════════════════════════════════════════════════════════════════════
// Ce que le guide retient d'une fois sur l'autre.
//
// Sans mémoire, l'unification n'aurait été qu'un ravalement : les six
// questions de goût auraient encore été à refaire à chaque envie de vin, et
// « ce soir ? » aurait continué d'ignorer le palais qu'elles décrivent.
//
// Rangé dans `oeno-profil` — donc **synchronisé** avec le compte, comme le
// reste du profil. Un palais n'est pas un réglage d'appareil : il suit son
// propriétaire d'un téléphone à l'autre (voir SYNC_KEYS dans CompteSync).
// ═══════════════════════════════════════════════════════════════════════════

const PROFIL_KEY = 'oeno-profil'

function lireProfil() {
  if (typeof window === 'undefined') return null
  try {
    const brut = localStorage.getItem(PROFIL_KEY)
    const p = brut ? JSON.parse(brut) : null
    return p && typeof p === 'object' ? p : null
  } catch { return null }
}

/** Les réponses de goût déjà connues : `{ gout, aventure, budget }`. */
export function lireMemoire() {
  return lireProfil()?.guide || {}
}

/**
 * Retient ce qui resservira. Volontairement partiel : le plat et l'envie du
 * soir ne sont **pas** gardés — ils décrivent un repas, pas un palais, et les
 * ressortir demain proposerait le vin d'hier.
 */
export function retenir(reponses) {
  if (typeof window === 'undefined') return
  const { gout, aventure, budget } = reponses || {}
  const aGarder = {}
  if (gout && Object.keys(gout).length) aGarder.gout = gout
  if (aventure) aGarder.aventure = aventure
  if (budget) aGarder.budget = budget
  if (!Object.keys(aGarder).length) return
  try {
    const profil = lireProfil() || {}
    localStorage.setItem(PROFIL_KEY, JSON.stringify({
      ...profil,
      guide: { ...(profil.guide || {}), ...aGarder },
    }))
  } catch { /* quota / mode privé : le guide marche sans mémoire */ }
}

/** Repartir de zéro — proposé à l'écran quand le palais ne convient plus. */
export function oublier() {
  if (typeof window === 'undefined') return
  try {
    const profil = lireProfil() || {}
    delete profil.guide
    localStorage.setItem(PROFIL_KEY, JSON.stringify(profil))
  } catch { /* ignore */ }
}
