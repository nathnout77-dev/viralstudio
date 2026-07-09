import { useEffect, useState } from 'react'

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

// Dérive un niveau de remplissage 0-1 à partir des jauges de goût (moyenne simple).
export function fillLevelFromJauges(jauges) {
  if (!jauges) return 0.5
  const vals = Object.values(jauges).filter(v => typeof v === 'number')
  if (!vals.length) return 0.5
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  return Math.min(1, Math.max(0.15, avg / 5))
}
