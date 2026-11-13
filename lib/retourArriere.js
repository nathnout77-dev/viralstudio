import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Le bouton retour du téléphone.
//
// Œno est un écran unique : changer de vue ou ouvrir une fenêtre ne crée
// aucune entrée d'historique. Sur Android, le bouton retour faisait donc
// QUITTER l'application, où qu'on soit — au milieu d'une fiche, d'un
// formulaire à moitié rempli, d'une leçon. C'est le geste le plus réflexe du
// téléphone, et il punissait.
//
// Ce qu'il fait désormais, dans l'ordre où on l'attend :
//   1. une fenêtre est ouverte → il ferme celle du dessus ;
//   2. sinon → il revient à la vue précédente ;
//   3. sur la toute première vue → il quitte, comme partout ailleurs.
//
// Même parti pris que lib/focusModale.js : une seule pose, dans
// pages/index.jsx, qui observe le DOM. Une fenêtre nouvelle en hérite sans
// rien câbler, pourvu qu'elle porte `role="dialog"` et se ferme à Échap —
// fermer « celle du dessus » passe justement par Échap (lib/useModal.js).
//
// Le principe : chaque pas en avant (fenêtre ouverte, vue changée) empile une
// entrée d'historique ; chaque retour en dépile une. Quand l'utilisateur
// ferme lui-même une fenêtre, on dépile à sa place — sinon l'historique
// garderait des entrées fantômes et il faudrait appuyer deux fois.
// ═══════════════════════════════════════════════════════════════════════════

const nombreDeFenetres = () => document.querySelectorAll('[role="dialog"]').length

export default function useRetourArriere(view, setView, actif = true) {
  const vues = useRef([])          // les vues traversées, la courante en dernier
  const fenetres = useRef(0)       // fenêtres pour lesquelles une entrée est empilée
  const silence = useRef(0)        // retours provoqués par nous : à ne pas traiter
  const parRetour = useRef(false)  // le changement en cours vient du bouton retour

  // ── Les vues ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!actif || typeof window === 'undefined') return
    const pile = vues.current
    if (pile[pile.length - 1] === view) return
    if (parRetour.current) { parRetour.current = false; return }
    pile.push(view)
    // La première vue est l'entrée déjà présente : rien à empiler pour elle.
    if (pile.length > 1) window.history.pushState({ oeno: 'vue' }, '')
  }, [view, actif])

  // ── Les fenêtres, et le bouton lui-même ─────────────────────────────────
  useEffect(() => {
    if (!actif || typeof window === 'undefined') return

    const suivre = () => {
      const n = nombreDeFenetres()
      while (fenetres.current < n) {           // une fenêtre s'est ouverte
        fenetres.current++
        window.history.pushState({ oeno: 'fenetre' }, '')
      }
      while (fenetres.current > n) {           // fermée depuis l'app
        fenetres.current--
        silence.current++
        window.history.back()
      }
    }
    const observateur = new MutationObserver(suivre)
    observateur.observe(document.body, { childList: true, subtree: true })
    suivre()

    const surRetour = () => {
      if (silence.current > 0) { silence.current--; return }
      const avant = nombreDeFenetres()
      if (avant > 0) {
        // Fermer la fenêtre du dessus : c'est le rôle d'Échap, et la pile de
        // lib/useModal garantit qu'une seule répond.
        fenetres.current = Math.max(0, fenetres.current - 1)
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        // Une fenêtre sourde à Échap (la porte des 18 ans) reste ouverte :
        // on rend l'entrée consommée, pour que le retour ne fasse pas sortir.
        setTimeout(() => {
          if (nombreDeFenetres() >= avant) {
            fenetres.current++
            window.history.pushState({ oeno: 'fenetre' }, '')
          }
        }, 60)
        return
      }
      const pile = vues.current
      if (pile.length > 1) {
        pile.pop()
        parRetour.current = true
        setView(pile[pile.length - 1])
      }
    }
    window.addEventListener('popstate', surRetour)
    return () => { observateur.disconnect(); window.removeEventListener('popstate', surRetour) }
  }, [actif, setView])
}
