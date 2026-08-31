import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Comportement commun des modals/overlays :
// - Échap ferme — mais seulement la fenêtre du dessus. Chaque appel du hook
//   écoutait Échap pour son propre compte : deux fenêtres empilées (une fiche
//   de vin ouverte depuis le questionnaire d'arrivée, par exemple) se
//   fermaient donc d'un seul coup, et l'utilisateur perdait les deux. La pile
//   suit l'ordre de montage : le dernier monté est le seul à répondre.
// - le scroll du fond est verrouillé tant qu'un modal est monté (compteur :
//   il n'est rendu que lorsque le dernier overlay se ferme).
// ═══════════════════════════════════════════════════════════════════════════

let lockCount = 0

// Les fenêtres ouvertes, de la plus ancienne à celle du dessus. L'entrée est
// créée au montage et son `onClose` tenu à jour à part : une fenêtre du
// dessous qui se re-rend ne doit pas remonter sur la pile pour autant.
let pile = []

export default function useModalBehavior(onClose) {
  // Verrou de scroll (compteur : supporte les modals empilés)
  useEffect(() => {
    lockCount += 1
    if (lockCount === 1) document.body.style.overflow = 'hidden'
    return () => {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = ''
    }
  }, [])

  // Place dans la pile : fixée au montage, quoi qu'il se re-rende ensuite.
  const entree = useRef(null)
  useEffect(() => {
    const e = { onClose: null }
    entree.current = e
    pile.push(e)
    return () => { pile = pile.filter(x => x !== e) }
  }, [])
  useEffect(() => {
    if (entree.current) entree.current.onClose = onClose || null
  }, [onClose])

  // Échap ferme la fenêtre — si elle est celle du dessus
  useEffect(() => {
    const onKey = e => {
      if (e.key !== 'Escape') return
      const dessus = pile[pile.length - 1]
      if (dessus !== entree.current || !dessus?.onClose) return
      dessus.onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
