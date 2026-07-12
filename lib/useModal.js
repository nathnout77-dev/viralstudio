import { useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Comportement commun des modals/overlays :
// - Échap ferme (si onClose est fourni)
// - le scroll du fond est verrouillé tant que le modal est monté
// Gère l'empilement de plusieurs modals via un compteur global : le scroll
// n'est rendu que lorsque le dernier overlay se ferme.
// ═══════════════════════════════════════════════════════════════════════════

let lockCount = 0

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

  // Échap ferme le modal
  useEffect(() => {
    if (!onClose) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
}
