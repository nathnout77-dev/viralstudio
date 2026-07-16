import { useId } from 'react'

// ── WineVisuel — mini visuel réaliste d'un verre de vin ──────────────────────
// Remplace les émojis dans toute l'app : un verre SVG dont la robe (dégradé
// riche + reflet spéculaire) suit le type du vin. Tailles libres via `size`.

const ROBES = {
  red:       { haut: '#b0475c', milieu: '#7d1330', bas: '#3a0616', reflet: 'rgba(255,235,240,0.55)' },
  white:     { haut: '#f6ead3', milieu: '#e3c26e', bas: '#b08a2e', reflet: 'rgba(255,255,255,0.75)' },
  'rosé':    { haut: '#fbd9de', milieu: '#ee9ba4', bas: '#c25f70', reflet: 'rgba(255,255,255,0.7)' },
  sweet:     { haut: '#f2d391', milieu: '#cf9c3a', bas: '#8a5f14', reflet: 'rgba(255,250,235,0.7)' },
  sparkling: { haut: '#eef4f9', milieu: '#b9d0e2', bas: '#5b8db8', reflet: 'rgba(255,255,255,0.8)' },
}

export default function WineVisuel({ type = 'red', size = 40, className = '', style }) {
  const uid = useId()
  const robe = ROBES[type] || ROBES.red
  const gVin = `wv-vin-${uid}`
  const gVerre = `wv-verre-${uid}`

  return (
    <svg
      viewBox="0 0 40 56"
      width={size}
      height={size * 1.4}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Robe du vin : dégradé vertical riche */}
        <linearGradient id={gVin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={robe.haut} />
          <stop offset="45%" stopColor={robe.milieu} />
          <stop offset="100%" stopColor={robe.bas} />
        </linearGradient>
        {/* Paroi du verre : voile froid translucide */}
        <linearGradient id={gVerre} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(230,238,244,0.12)" />
          <stop offset="100%" stopColor="rgba(160,175,190,0.28)" />
        </linearGradient>
      </defs>

      {/* Ombre portée douce */}
      <ellipse cx="20" cy="53.5" rx="9.5" ry="1.8" fill="rgba(28,25,23,0.18)" />

      {/* Calice (bol) */}
      <path
        d="M7.5 3 h25 c0 10.5 -4.2 17.5 -12.5 18.6 C11.7 20.5 7.5 13.5 7.5 3 Z"
        fill={`url(#${gVerre})`}
        stroke="rgba(90,100,110,0.35)"
        strokeWidth="0.8"
      />
      {/* Vin dans le calice (rempli aux 2/3, ménisque elliptique) */}
      <path
        d="M9.2 8.5 h21.6 c-0.9 7.2 -4.4 11.9 -10.8 12.8 C13.6 20.4 10.1 15.7 9.2 8.5 Z"
        fill={`url(#${gVin})`}
      />
      <ellipse cx="20" cy="8.5" rx="10.8" ry="1.7" fill={robe.haut} opacity="0.9" />

      {/* Reflet spéculaire sur la paroi */}
      <path
        d="M11 5.5 c0.4 6 2 10.5 4.6 13 c-3.8 -1.8 -6.1 -6 -6.7 -12.4 Z"
        fill={robe.reflet}
        opacity="0.6"
      />

      {/* Jambe */}
      <rect x="19.1" y="21.5" width="1.8" height="24" rx="0.9" fill="rgba(120,132,142,0.55)" />
      {/* Pied */}
      <ellipse cx="20" cy="49" rx="9.5" ry="2.6" fill="rgba(150,162,172,0.5)" />
      <ellipse cx="20" cy="48.4" rx="9.5" ry="2.2" fill="rgba(226,234,240,0.75)" />
    </svg>
  )
}
