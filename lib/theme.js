// ═══════════════════════════════════════════════════════════════════════════
// Application du thème et de la taille d'affichage.
//
// Tout passe par deux attributs posés sur <html> : `data-theme` et
// `data-taille`. Le CSS fait le reste — aucun composant n'a à savoir dans
// quel thème il est rendu.
//
// Le thème est aussi appliqué AVANT le premier rendu par un petit script
// injecté dans le document (voir pages/_document.jsx) : sans lui, la page
// s'afficherait en clair une fraction de seconde avant de basculer.
// ═══════════════════════════════════════════════════════════════════════════
import { lireReglages, REGLAGES_EVENT } from './reglages'

// La barre d'adresse du navigateur s'accorde au fond de l'app.
const TEINTE_BARRE = { clair: '#FAFAF9', sombre: '#141210' }

/** 'clair' | 'sombre' — ce que « suivre le système » donne à cet instant. */
export function themeEffectif(preference) {
  if (preference === 'clair' || preference === 'sombre') return preference
  if (typeof window === 'undefined' || !window.matchMedia) return 'clair'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair'
}

/**
 * Agrandissement de toute l'interface. Le zoom du document plutôt qu'une
 * taille de police : l'app dimensionne ses textes en pixels, une police de
 * base plus grande ne les toucherait pas. Ici tout grandit ensemble, textes
 * comme boutons — ce qu'attend quelqu'un qui règle « plus grand ».
 */
const ZOOM = { compact: 0.92, normal: 1, confort: 1.12 }

export function appliquerReglages(reglages = lireReglages()) {
  if (typeof document === 'undefined') return
  const racine = document.documentElement
  const theme = themeEffectif(reglages.theme)

  racine.dataset.theme = theme
  racine.dataset.taille = reglages.taille || 'normal'
  // `color-scheme` habille aussi ce que l'app ne dessine pas elle-même :
  // ascenseurs natifs, champs de formulaire, sélecteurs de date.
  racine.style.colorScheme = theme === 'sombre' ? 'dark' : 'light'

  const zoom = ZOOM[reglages.taille] || 1
  racine.style.zoom = zoom === 1 ? '' : String(zoom)

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', TEINTE_BARRE[theme])
}

/**
 * Met l'app en accord avec les réglages, et l'y maintient : au changement
 * d'un réglage, et quand le système bascule en sombre si c'est lui qu'on suit.
 * Renvoie de quoi tout débrancher.
 */
export function surveillerReglages() {
  if (typeof window === 'undefined') return () => {}
  const relire = () => appliquerReglages()
  relire()

  window.addEventListener(REGLAGES_EVENT, relire)
  window.addEventListener('storage', relire)   // réglage changé dans un autre onglet

  let media = null
  try {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', relire)
  } catch { /* navigateur ancien : le choix explicite fonctionne quand même */ }

  return () => {
    window.removeEventListener(REGLAGES_EVENT, relire)
    window.removeEventListener('storage', relire)
    try { media?.removeEventListener('change', relire) } catch { /* déjà retiré */ }
  }
}
