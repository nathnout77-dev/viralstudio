// ═══════════════════════════════════════════════════════════════════════════
// Réglages personnels — ce qui appartient à l'appareil, pas au compte.
//
// Volontairement NON synchronisés : la taille d'affichage confortable sur un
// téléphone ne l'est pas sur un écran d'ordinateur, et le thème suit souvent
// celui du système, qui diffère lui aussi d'un appareil à l'autre. Chacun
// garde donc ses préférences là où elles ont un sens.
//
// Aucune dépendance : ce module est lu au tout premier rendu.
// ═══════════════════════════════════════════════════════════════════════════

const CLE = 'oeno-reglages'
export const REGLAGES_EVENT = 'oeno-reglages-change'

export const DEFAUTS = {
  theme: 'systeme',      // 'systeme' | 'clair' | 'sombre'
  son: true,             // le glouglou à l'arrivée d'un message
  vibration: true,
  taille: 'normal',      // 'compact' | 'normal' | 'confort'
  ecranDepart: 'cave',   // 'hub' | 'cave' | 'decouvrir' — au lancement sur mobile
}

export function lireReglages() {
  if (typeof window === 'undefined') return { ...DEFAUTS }
  try {
    const brut = localStorage.getItem(CLE)
    const lu = brut ? JSON.parse(brut) : null
    // Fusion avec les défauts : un réglage ajouté plus tard ne casse pas une
    // installation existante, et une valeur corrompue retombe sur la sienne.
    return lu && typeof lu === 'object' ? { ...DEFAUTS, ...lu } : { ...DEFAUTS }
  } catch { return { ...DEFAUTS } }
}

export function ecrireReglage(cle, valeur) {
  const suivant = { ...lireReglages(), [cle]: valeur }
  try { localStorage.setItem(CLE, JSON.stringify(suivant)) } catch { /* stockage refusé */ }
  try { window.dispatchEvent(new Event(REGLAGES_EVENT)) } catch { /* ignore */ }
  return suivant
}
