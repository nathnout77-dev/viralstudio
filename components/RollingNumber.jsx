import { useRef, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Chiffres qui roulent — anime les changements de valeur numérique en rouleau
// vertical : chaque chiffre modifié est une colonne [ancien / nouveau] qui
// monte (300ms, --ease-luxe). Les caractères non modifiés (et non numériques :
// espaces, €, séparateurs) restent statiques. Transform/opacity uniquement ;
// prefers-reduced-motion est géré par la règle globale (l'animation forwards
// saute directement à l'état final).
// ═══════════════════════════════════════════════════════════════════════════

export default function RollingNumber({ value, className = '' }) {
  const str = String(value ?? '')
  const prevRef = useRef(str)
  const prev = prevRef.current
  useEffect(() => { prevRef.current = str })

  // Alignement par la droite : les unités roulent, pas les ordres supérieurs.
  const show = c => (c === ' ' ? ' ' : c) // espaces insécables (sinon collapsés)
  const len = Math.max(str.length, prev.length)
  const cur = str.padStart(len, ' ')
  const old = prev.padStart(len, ' ')

  return (
    <span className={`whitespace-nowrap tabular-nums ${className}`} aria-label={str}>
      {Array.from(cur).map((ch, i) => {
        const was = old[i]
        if (ch === was || prev === str) {
          return <span key={i} aria-hidden="true">{show(ch)}</span>
        }
        return (
          <span key={i} className="rn-cell" aria-hidden="true">
            <span key={`${str}-${i}`} className="rn-col">
              <span>{show(was)}</span>
              <span>{show(ch)}</span>
            </span>
          </span>
        )
      })}
    </span>
  )
}
