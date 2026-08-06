import { useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Le piège de focus, une fois pour toutes les fenêtres.
//
// Pourquoi global plutôt que dans chaque modale. Œno compte dix-sept éléments
// `role="dialog"` et dix-neuf appels à `useModalBehavior` — deux ensembles qui
// ne se recouvrent pas. La recherche rapide, par exemple, est bien un dialogue
// mais n'appelle pas le hook. Câbler modale par modale aurait donc réparé
// celles auxquelles on pense, laissé les autres, et laissé la prochaine
// repartir sans rien. C'est exactement l'histoire du bouton « ajouter à ma
// cave » (voir lib/cave.js) : la capacité doit être ambiante.
//
// Ce qu'il fait, tant qu'une fenêtre est ouverte :
//   • Tab et Shift+Tab bouclent à l'intérieur, sans jamais s'en échapper ;
//   • le focus entre dans la fenêtre à l'ouverture ;
//   • il revient à ce qui l'a ouverte à la fermeture.
//
// Sans cela, tabuler depuis une modale parcourait à l'aveugle la navigation et
// l'écran masqués derrière, sans possibilité de revenir : pour qui navigue au
// clavier ou au lecteur d'écran, chaque fenêtre était un cul-de-sac.
// ═══════════════════════════════════════════════════════════════════════════

const FOCUSABLES = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const dessus = () => {
  const tous = document.querySelectorAll('[role="dialog"]')
  return tous.length ? tous[tous.length - 1] : null
}

// Ce qui peut réellement recevoir le focus : un élément masqué le refuserait
// et la boucle tournerait dans le vide.
const cibles = (racine) =>
  [...racine.querySelectorAll(FOCUSABLES)].filter(el => {
    if (el.closest('[aria-hidden="true"]')) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  })

export default function usePiegeDeFocus() {
  useEffect(() => {
    if (typeof document === 'undefined') return

    // Ce à quoi rendre le focus, fenêtre par fenêtre : les modales
    // s'empilent, et chacune doit rendre la main à celle d'en dessous.
    const pile = new Map()

    // Le dernier élément focalisé HORS fenêtre. Lire `document.activeElement`
    // au moment où la modale apparaît ne suffit pas : React a souvent déjà
    // démonté le bouton cliqué, et le focus est retombé sur `body`. On suit
    // donc le focus en continu pour savoir où le rendre.
    let dernierHorsFenetre = null
    const onFocus = e => {
      if (!e.target?.closest?.('[role="dialog"]')) dernierHorsFenetre = e.target
    }
    document.addEventListener('focusin', onFocus, true)

    const onTab = e => {
      if (e.key !== 'Tab') return
      const d = dessus()
      if (!d) return
      const liste = cibles(d)
      if (!liste.length) return
      const premier = liste[0]
      const dernier = liste[liste.length - 1]

      // Le focus a quitté la fenêtre (clic dans le voile) : on l'y ramène.
      if (!d.contains(document.activeElement)) {
        e.preventDefault()
        ;(e.shiftKey ? dernier : premier).focus()
        return
      }
      if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault(); premier.focus()
      } else if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault(); dernier.focus()
      }
    }
    document.addEventListener('keydown', onTab, true)

    // Ouvertures et fermetures : surveiller le DOM couvre aussi bien les
    // modales rendues par l'app que celles montées par un portail.
    const observateur = new MutationObserver(() => {
      const ouverts = new Set(document.querySelectorAll('[role="dialog"]'))

      for (const d of ouverts) {
        if (pile.has(d)) continue
        // Retenir qui ouvrait, puis entrer — sauf si un champ s'est déjà
        // saisi du focus (la recherche, le prix) : le lui reprendre
        // renverrait l'utilisateur au bouton « fermer ».
        pile.set(d, dernierHorsFenetre || document.activeElement)
        if (!d.contains(document.activeElement)) {
          requestAnimationFrame(() => {
            if (!document.contains(d) || d.contains(document.activeElement)) return
            cibles(d)[0]?.focus({ preventScroll: true })
          })
        }
      }

      for (const [d, origine] of [...pile]) {
        if (ouverts.has(d)) continue
        pile.delete(d)
        // Rendre le focus à ce qui a ouvert la fenêtre : sinon il repart au
        // début de la page, et il faut tout retraverser pour revenir.
        if (origine && document.contains(origine)) {
          origine.focus({ preventScroll: true })
        }
      }
    })
    observateur.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('keydown', onTab, true)
      document.removeEventListener('focusin', onFocus, true)
      observateur.disconnect()
    }
  }, [])
}
