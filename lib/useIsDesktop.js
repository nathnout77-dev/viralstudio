import { useState, useEffect } from 'react'

/**
 * Détecte le desktop (≥ 1024px, breakpoint lg de Tailwind).
 * SSR-safe : rend `false` (mobile) par défaut, puis bascule après le mount
 * pour éviter tout mismatch d'hydratation Next.
 * À n'utiliser que pour les différences structurelles impossibles en CSS pur.
 */
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isDesktop
}
