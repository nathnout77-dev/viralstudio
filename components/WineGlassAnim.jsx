import { useEffect, useState, useRef } from 'react'

// Petit verre animé : le niveau de vin monte au montage, coloré selon le vin.
// fillLevel : 0 → 1 (dérivé des jauges de goût, ex. moyenne puissance/douceur/tanins).
export default function WineGlassAnim({ color = '#8c2f39', fillLevel = 0.6, size = 56 }) {
  const [level, setLevel] = useState(0)

  useEffect(() => {
    setLevel(0)
    const t = requestAnimationFrame(() => {
      const t2 = setTimeout(() => setLevel(Math.min(1, Math.max(0.08, fillLevel))), 60)
      return () => clearTimeout(t2)
    })
    return () => cancelAnimationFrame(t)
  }, [fillLevel, color])

  const h = 34 * level

  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 100 150" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={`bowl-${color.replace('#', '')}`}>
          <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" />
        </clipPath>
        <linearGradient id={`wineGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#bowl-${color.replace('#', '')})`}>
        <rect
          x="20" y={62 - h} width="60" height={h + 5}
          fill={`url(#wineGrad-${color.replace('#', '')})`}
          style={{ transition: 'y 1.1s cubic-bezier(0.22, 1, 0.36, 1), height 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <ellipse
          cx="50" cy={62 - h} rx="24" ry="2.5"
          fill="#fff" opacity={level > 0.05 ? 0.35 : 0}
          style={{ transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </g>
      <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="50" y1="62" x2="50" y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="126" x2="68" y2="126" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Mini verre discret pour les étiquettes de collection ─────────────────────
// hoverFill : vide par défaut, se remplit au survol de la carte parente
// (`.group:hover`) sur les appareils à pointeur fin ; rempli statique sur
// tactile (pas d'IntersectionObserver par carte : trop coûteux à 100+ cartes).
// Le mouvement est un simple translateY sur le groupe clippé (transform only).
let miniVerreSeq = 0
export function MiniVerre({ color = '#72102a', fillLevel = 0.6, size = 16, stroke = 'rgba(28,25,23,0.35)', hoverFill = false, className = '' }) {
  const idRef = useRef(null)
  if (idRef.current === null) idRef.current = `mv-${++miniVerreSeq}`
  const id = idRef.current
  const level = Math.min(1, Math.max(0.15, fillLevel))
  const h = 12 * level // hauteur de vin dans la coupe (coupe : y 2 → 15)

  return (
    <svg
      width={size} height={size * 1.5} viewBox="0 0 20 30" fill="none"
      aria-hidden="true" className={`mini-verre ${className}`}
    >
      <defs>
        <clipPath id={id}>
          <path d="M4 2 L16 2 Q15.6 13 10 15 Q4.4 13 4 2 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect
          className={hoverFill ? 'mini-verre-vin' : undefined}
          x="3" y={15 - h} width="14" height={h + 2}
          fill={color} opacity="0.9"
        />
      </g>
      <path d="M4 2 L16 2 Q15.6 13 10 15 Q4.4 13 4 2 Z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="10" y1="15" x2="10" y2="24" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="26.5" x2="14" y2="26.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

// Dérive un niveau de remplissage 0-1 à partir des jauges de goût (moyenne simple).
export function fillLevelFromJauges(jauges) {
  if (!jauges) return 0.5
  const vals = Object.values(jauges).filter(v => typeof v === 'number')
  if (!vals.length) return 0.5
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  return Math.min(1, Math.max(0.15, avg / 5))
}
