import { useState, useEffect, useCallback } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Halo respirant du CTA « Ce soir, je bois quoi ? ».
// Actif tant que le bouton n'a jamais été cliqué dans la session ; le premier
// clic (sur n'importe quelle instance) l'éteint partout, définitivement pour
// la session (sessionStorage + événement window pour les instances montées).
// ═══════════════════════════════════════════════════════════════════════════

const KEY = 'oeno-cta-calmed'
const EVENT = 'oeno-cta-calmed'

export default function useCtaBreathe() {
  // Calme par défaut : pas de halo pendant le SSR/avant hydratation.
  const [calmed, setCalmed] = useState(true)

  useEffect(() => {
    try { setCalmed(sessionStorage.getItem(KEY) === '1') } catch { /* no-op */ }
    const calm = () => setCalmed(true)
    window.addEventListener(EVENT, calm)
    return () => window.removeEventListener(EVENT, calm)
  }, [])

  const settle = useCallback(() => {
    try { sessionStorage.setItem(KEY, '1') } catch { /* no-op */ }
    window.dispatchEvent(new CustomEvent(EVENT))
  }, [])

  return { breatheClass: calmed ? '' : 'cta-breathe', settle }
}
