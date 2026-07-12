import { useEffect, useMemo, useState } from 'react'
import { AROME_FAMILLES, vinsPourFamille } from '../data/aromes'
import { WINE_DB } from '../data/wineDatabase'
import { FicheVin } from './BibliothequeView'

// ═══════════════════════════════════════════════════════════════════════════
// RoueAromes — roue interactive des 8 familles d'arômes, SVG inline.
// Clic/tap sur un secteur : la roue tourne pour l'amener en haut (rotation CSS
// animée), le secteur s'étend légèrement, et le panneau explique la famille.
// prefers-reduced-motion → aucune rotation animée, seul le panneau change.
// Accessible : chaque secteur est un role="button" focusable au clavier.
// ═══════════════════════════════════════════════════════════════════════════

const C = 210            // centre du viewBox 420×420
const R_OUT = 200        // rayon extérieur des secteurs
const R_IN = 78          // rayon intérieur (moyeu)
const R_GLYPH = 160      // rayon des petites formes SVG
const R_LBL1 = 128       // rayon de la 1re ligne de label
const R_LBL2 = 112       // rayon de la 2e ligne de label
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const pt = (angleDeg, r) => {
  const a = (angleDeg * Math.PI) / 180
  return [+(C + r * Math.sin(a)).toFixed(2), +(C - r * Math.cos(a)).toFixed(2)]
}

// Secteur en anneau de 45°, centré sur l'angle `mid` (0° = en haut)
function sectorPath(mid) {
  const a0 = mid - 22.5
  const a1 = mid + 22.5
  const [ox0, oy0] = pt(a0, R_OUT)
  const [ox1, oy1] = pt(a1, R_OUT)
  const [ix0, iy0] = pt(a0, R_IN)
  const [ix1, iy1] = pt(a1, R_IN)
  return [
    `M ${ix0} ${iy0}`,
    `L ${ox0} ${oy0}`,
    `A ${R_OUT} ${R_OUT} 0 0 1 ${ox1} ${oy1}`,
    `L ${ix1} ${iy1}`,
    `A ${R_IN} ${R_IN} 0 0 0 ${ix0} ${iy0}`,
    'Z',
  ].join(' ')
}

// ── Petites formes SVG par famille (pas d'emoji dans la roue) ────────────────
// Dessinées autour de (0,0) dans un carré ~26px, trait crème.
function Glyph({ id }) {
  const stroke = 'rgba(250,250,249,0.92)'
  const fill = 'rgba(250,250,249,0.85)'
  switch (id) {
    case 'fruits-rouges': // trio de baies
      return (
        <g fill={fill}>
          <circle cx="-6" cy="3" r="4" />
          <circle cx="6" cy="3" r="4" />
          <circle cx="0" cy="-5" r="4" />
        </g>
      )
    case 'fruits-noirs': // grappe serrée
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.6">
          <circle cx="-5" cy="-3" r="4.2" />
          <circle cx="5" cy="-3" r="4.2" />
          <circle cx="0" cy="5" r="4.2" />
        </g>
      )
    case 'agrumes': // rondelle d'agrume
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <circle cx="0" cy="0" r="8.5" />
          <line x1="0" y1="-8.5" x2="0" y2="8.5" />
          <line x1="-8.5" y1="0" x2="8.5" y2="0" />
          <line x1="-6" y1="-6" x2="6" y2="6" />
          <line x1="-6" y1="6" x2="6" y2="-6" />
        </g>
      )
    case 'fleurs': // 5 pétales
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.5">
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a} cx="0" cy="-5.5" rx="2.8" ry="5.5" transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="1.8" fill={fill} stroke="none" />
        </g>
      )
    case 'epices': // étoile d'anis
      return (
        <g stroke={stroke} strokeWidth="1.6" strokeLinecap="round">
          <line x1="0" y1="-8" x2="0" y2="8" />
          <line x1="-7" y1="-4" x2="7" y2="4" />
          <line x1="-7" y1="4" x2="7" y2="-4" />
          <circle cx="0" cy="0" r="2" fill={fill} stroke="none" />
        </g>
      )
    case 'boise': // douelles de fût
      return (
        <g stroke={stroke} strokeWidth="1.8" strokeLinecap="round" fill="none">
          <line x1="-6" y1="-6" x2="-6" y2="6" />
          <line x1="0" y1="-8" x2="0" y2="8" />
          <line x1="6" y1="-5" x2="6" y2="5" />
        </g>
      )
    case 'beurre': // croissant
      return (
        <path
          d="M -7.5 2.5 A 9.5 9.5 0 0 1 7.5 2.5 A 6 6 0 0 0 -7.5 2.5 Z"
          fill={fill}
        />
      )
    case 'mineral': // éclat de pierre
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none" strokeLinejoin="round">
          <polygon points="0,-8 7,-1 3,8 -5,7 -7,-2" />
          <line x1="-2" y1="-3" x2="2" y2="3" />
        </g>
      )
    default:
      return null
  }
}

export default function RoueAromes() {
  const [selectedId, setSelectedId] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [focusId, setFocusId] = useState(null)
  const [ficheWine, setFicheWine] = useState(null)
  const [reduced, setReduced] = useState(false)

  // prefers-reduced-motion : pas de rotation animée, juste le panneau
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = e => setReduced(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', fn)
    else mq.addListener(fn)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', fn)
      else mq.removeListener(fn)
    }
  }, [])

  const selected = AROME_FAMILLES.find(f => f.id === selectedId) || null
  const vins = useMemo(
    () => (selected ? vinsPourFamille(selected, WINE_DB, 3) : []),
    [selected]
  )

  const choisir = (famille, index) => {
    setSelectedId(famille.id)
    if (reduced) return
    // Rotation par le plus court chemin pour amener le secteur en haut
    const target = -index * 45
    const diff = ((((target - rotation) % 360) + 540) % 360) - 180
    setRotation(rotation + diff)
  }

  const rotT = reduced ? 'none' : `transform 700ms ${EASE}`
  const scaleT = reduced ? 'none' : `transform 300ms ${EASE}`

  return (
    <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
      {/* ── La roue ─────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[420px] mx-auto">
        <svg
          viewBox="0 0 420 420"
          className="w-full h-auto select-none"
          role="group"
          aria-label="Roue des huit familles d'arômes du vin"
        >
          <defs>
            {AROME_FAMILLES.map(f => (
              <radialGradient
                key={f.id}
                id={`roue-grad-${f.id}`}
                gradientUnits="userSpaceOnUse"
                cx={C} cy={C} r={R_OUT}
              >
                <stop offset="42%" stopColor={f.couleurs[0]} />
                <stop offset="100%" stopColor={f.couleurs[1]} />
              </radialGradient>
            ))}
          </defs>

          {/* Groupe rotatif : la roue tourne pour amener le secteur choisi en haut */}
          <g
            style={{
              transform: `rotate(${reduced ? 0 : rotation}deg)`,
              transformOrigin: '210px 210px',
              transformBox: 'view-box',
              transition: rotT,
              willChange: 'transform',
            }}
          >
            {AROME_FAMILLES.map((f, i) => {
              const mid = i * 45
              const isSel = f.id === selectedId
              const isFoc = f.id === focusId
              const d = sectorPath(mid)
              return (
                <g
                  key={f.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${f.label} — découvrir cette famille d'arômes`}
                  aria-pressed={isSel}
                  onClick={() => choisir(f, i)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      choisir(f, i)
                    }
                  }}
                  onFocus={() => setFocusId(f.id)}
                  onBlur={() => setFocusId(null)}
                  className="roue-secteur"
                  style={{
                    transform: `scale(${isSel ? 1.05 : 1})`,
                    transformOrigin: '210px 210px',
                    transformBox: 'view-box',
                    transition: scaleT,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <path
                    className="roue-fill"
                    d={d}
                    fill={`url(#roue-grad-${f.id})`}
                    stroke="#FAFAF9"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    style={{ transition: 'filter 300ms ease' }}
                  />
                  {(isSel || isFoc) && (
                    <path
                      d={d}
                      fill="none"
                      stroke={isFoc ? '#A16207' : 'rgba(250,250,249,0.95)'}
                      strokeWidth={isFoc ? 3 : 2.5}
                      strokeLinejoin="round"
                      pointerEvents="none"
                    />
                  )}

                  {/* Forme + label : contre-rotation pour rester horizontaux */}
                  <g transform={`rotate(${mid} 210 210)`} pointerEvents="none">
                    <g
                      style={{
                        transform: `rotate(${reduced ? -mid : -(rotation + mid)}deg)`,
                        transformOrigin: '210px 82px',
                        transformBox: 'view-box',
                        transition: rotT,
                      }}
                    >
                      <g transform={`translate(210 ${210 - R_GLYPH})`}>
                        <Glyph id={f.id} />
                      </g>
                      <text
                        x="210" y={210 - R_LBL1}
                        textAnchor="middle"
                        fill="#FAFAF9"
                        fontSize="13.5"
                        fontWeight="600"
                        fontFamily="'Inter', system-ui, sans-serif"
                      >
                        {f.labelLignes[0]}
                      </text>
                      {f.labelLignes[1] && (
                        <text
                          x="210" y={210 - R_LBL2}
                          textAnchor="middle"
                          fill="#FAFAF9"
                          fontSize="13.5"
                          fontWeight="600"
                          fontFamily="'Inter', system-ui, sans-serif"
                        >
                          {f.labelLignes[1]}
                        </text>
                      )}
                    </g>
                  </g>
                </g>
              )
            })}
          </g>

          {/* Centre fixe (ne tourne pas) */}
          <circle cx={C} cy={C} r={R_IN - 5} fill="#FAFAF9" stroke="rgba(161,98,7,0.35)" strokeWidth="1.5" />
          <circle cx={C} cy={C} r={R_IN - 13} fill="none" stroke="rgba(161,98,7,0.16)" strokeWidth="1" />
          <text
            x={C} y={C + 1}
            textAnchor="middle"
            fontFamily="'Fraunces', Georgia, serif"
            fontSize="22"
            fontWeight="500"
            fill="#1C1917"
          >
            Les arômes
          </text>
          <text
            x={C} y={C + 20}
            textAnchor="middle"
            fontFamily="'Inter', system-ui, sans-serif"
            fontSize="8"
            letterSpacing="0.18em"
            fill="#A16207"
          >
            TOUCHEZ UNE FAMILLE
          </text>
        </svg>

        <style jsx global>{`
          .roue-secteur:hover .roue-fill {
            filter: brightness(1.08);
          }
        `}</style>
      </div>

      {/* ── Panneau : explication de la famille sélectionnée ─────────────── */}
      <div aria-live="polite" className="w-full max-w-xl mx-auto lg:mx-0">
        {selected ? (
          <div key={selected.id} className="animate-fade-in">
            <span className="inline-flex items-center gap-2.5 eyebrow mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${selected.couleurs[0]}, ${selected.couleurs[1]})` }}
              />
              Famille d'arômes
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-anthracite-950 tracking-tight">
              {selected.label}
            </h3>
            <p className="text-anthracite-600 font-light leading-relaxed mt-4">
              {selected.explication}
            </p>

            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2">
                Ça sent comme…
              </div>
              <ul className="space-y-1">
                {selected.exemples.map(ex => (
                  <li key={ex} className="text-sm text-anthracite-700 italic leading-relaxed">
                    — {ex}
                  </li>
                ))}
              </ul>
            </div>

            {vins.length > 0 && (
              <div className="mt-7">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2.5">
                  Des vins qui sentent ça
                </div>
                <div className="flex flex-wrap gap-2">
                  {vins.map(w => (
                    <button
                      key={w.id}
                      onClick={() => setFicheWine(w)}
                      className="min-h-[44px] inline-flex items-center gap-2 pl-3 pr-4 rounded-full bg-white border border-anthracite-900/10 shadow-card hover:border-gold-500/60 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      title={`Ouvrir la fiche ${w.appellation}`}
                    >
                      <span className="text-lg" aria-hidden="true">{w.emoji}</span>
                      <span className="text-sm font-medium text-anthracite-800">{w.appellation}</span>
                      <span className="text-[11px] text-anthracite-400">{w.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center lg:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-anthracite-950 tracking-tight">
              Huit familles, tout un monde.
            </h3>
            <p className="text-anthracite-500 font-light leading-relaxed mt-4 max-w-md mx-auto lg:mx-0">
              Presque tout ce qu'on sent dans un verre appartient à l'une de ces
              huit familles. Touchez un secteur de la roue : on vous explique
              chacune avec des mots de tous les jours — et les vins où la retrouver.
            </p>
          </div>
        )}
      </div>

      {/* Fiche complète du vin cliqué */}
      {ficheWine && (
        <FicheVin wine={ficheWine} onClose={() => setFicheWine(null)} />
      )}
    </div>
  )
}
