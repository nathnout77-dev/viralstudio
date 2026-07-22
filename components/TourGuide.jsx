import { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// TourGuide — petit tutoriel guidé (coach-marks) au premier lancement mobile.
// Chaque étape éclaire un vrai élément de l'écran (spotlight) et pointe une
// bulle fléchée dessus, en expliquant la fonction. Se referme et ne revient
// plus (clé localStorage gérée par l'appelant).
//
// steps: [{ selector?: string, title, text, placement?: 'top'|'bottom' }]
//   - selector absent → carte centrée (écran de bienvenue).
// ═══════════════════════════════════════════════════════════════════════════

const MARGE = 8          // halo autour de la cible
const ESPACE = 14        // distance bulle ↔ cible

export default function TourGuide({ steps, onClose }) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
  const [vp, setVp] = useState({ w: 0, h: 0 })
  const step = steps[i]
  const dernier = i === steps.length - 1

  const mesurer = useCallback(() => {
    if (typeof window === 'undefined') return
    setVp({ w: window.innerWidth, h: window.innerHeight })
    if (!step?.selector) { setRect(null); return }
    const el = document.querySelector(step.selector)
    if (!el) { setRect(null); return }
    const r = el.getBoundingClientRect()
    // Élément masqué (display:none) → rect nul : on ignore le spotlight
    if (r.width === 0 && r.height === 0) { setRect(null); return }
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [step])

  // Recalcule à chaque changement d'étape, et sur resize/scroll.
  useLayoutEffect(() => {
    mesurer()
    const id = requestAnimationFrame(mesurer) // après animations de nav
    return () => cancelAnimationFrame(id)
  }, [mesurer])

  useEffect(() => {
    const on = () => mesurer()
    window.addEventListener('resize', on)
    window.addEventListener('scroll', on, true)
    return () => { window.removeEventListener('resize', on); window.removeEventListener('scroll', on, true) }
  }, [mesurer])

  const terminer = () => onClose?.()
  const suivant = () => { if (dernier) terminer(); else setI(n => n + 1) }

  // Géométrie de la bulle
  const largeur = Math.min(320, vp.w - 24)
  let bulleStyle, arrowLeft = largeur / 2, arrowEnHaut = false
  if (rect) {
    const centreX = rect.left + rect.width / 2
    const left = Math.max(12, Math.min(centreX - largeur / 2, vp.w - 12 - largeur))
    arrowLeft = Math.max(22, Math.min(centreX - left, largeur - 22))
    // La cible est-elle plutôt en bas de l'écran ? → bulle au-dessus.
    const placement = step.placement || (rect.top > vp.h * 0.5 ? 'top' : 'bottom')
    if (placement === 'top') {
      bulleStyle = { left, bottom: vp.h - rect.top + ESPACE, width: largeur }
      arrowEnHaut = false
    } else {
      bulleStyle = { left, top: rect.top + rect.height + ESPACE, width: largeur }
      arrowEnHaut = true
    }
  } else {
    // Carte centrée (bienvenue / cible introuvable)
    bulleStyle = { left: (vp.w - largeur) / 2, top: Math.max(80, vp.h / 2 - 120), width: largeur }
  }

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Visite guidée d'Œno">
      {/* Capteur de clics : neutralise l'app pendant la visite */}
      <div className="absolute inset-0" style={{ background: rect ? 'transparent' : 'rgba(12,10,9,0.72)' }} onClick={() => {}} />

      {/* Spotlight : trou lumineux sur la cible + voile sombre autour (box-shadow) */}
      {rect && (
        <div
          className="absolute rounded-2xl pointer-events-none transition-all duration-300"
          style={{
            top: rect.top - MARGE,
            left: rect.left - MARGE,
            width: rect.width + MARGE * 2,
            height: rect.height + MARGE * 2,
            boxShadow: '0 0 0 9999px rgba(12,10,9,0.72)',
            border: '2px solid #c9a84c',
          }}
        />
      )}

      {/* Bulle explicative */}
      <div
        className="absolute card !bg-anthracite-950 !border-gold-500/40 p-4 shadow-2xl animate-fade-in"
        style={bulleStyle}
      >
        {/* Flèche */}
        {rect && (
          <span
            className="absolute w-3.5 h-3.5 rotate-45 bg-anthracite-950 border-gold-500/40"
            style={arrowEnHaut
              ? { top: -7, left: arrowLeft, borderLeft: '1px solid', borderTop: '1px solid', borderColor: 'rgba(201,168,76,0.4)' }
              : { bottom: -7, left: arrowLeft, borderRight: '1px solid', borderBottom: '1px solid', borderColor: 'rgba(201,168,76,0.4)' }}
          />
        )}

        <button
          onClick={terminer}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:text-cream transition-colors cursor-pointer"
          aria-label="Fermer la visite"
        >
          <X size={14} />
        </button>

        <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold-500 mb-1">
          Visite guidée · {i + 1}/{steps.length}
        </div>
        <div className="font-serif text-base font-bold text-cream mb-1.5 pr-6">{step.title}</div>
        <p className="text-[13px] text-stone-300 leading-relaxed">{step.text}</p>

        <div className="flex items-center justify-between mt-4">
          {/* Points de progression */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, n) => (
              <span
                key={n}
                className={`h-1.5 rounded-full transition-all ${n === i ? 'w-4 bg-gold-500' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!dernier && (
              <button onClick={terminer} className="text-[12px] font-semibold text-stone-400 hover:text-cream transition-colors cursor-pointer px-2 py-1">
                Passer
              </button>
            )}
            <button
              onClick={suivant}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold text-anthracite-950 bg-gold-500 hover:bg-gold-400 active:scale-95 transition-all cursor-pointer"
            >
              {dernier ? <>C'est parti <Check size={13} /></> : <>Suivant <ArrowRight size={13} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
