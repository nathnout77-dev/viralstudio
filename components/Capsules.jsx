import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { CAPSULES } from '../data/capsules'

// ═══════════════════════════════════════════════════════════════════════════
// Capsules « 1 minute pour comprendre » — lecteur plein écran façon stories.
// Avance auto ~7 s/écran, tap gauche/droite, pause au maintien.
// prefers-reduced-motion : pas d'avance auto, navigation manuelle.
// Progression vue/pas vue : localStorage `oeno-capsules` { id: true }.
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'oeno-capsules'
const DUREE = 7000 // ms par écran

function loadVues() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}
function marquerVue(id) {
  const v = loadVues()
  if (!v[id]) {
    v[id] = true
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    window.dispatchEvent(new CustomEvent('oeno-capsules-changed'))
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = e => setReduced(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

// ── Illustrations SVG animées (or sur fond sombre, animations CSS) ──────────
const G = '#c9a84c'   // or
const GD = '#a16207'  // or foncé
const W = '#8c2f39'   // bordeaux clair

function Illu({ type }) {
  switch (type) {
    case 'verre': case 'robe': case 'tourbillon':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path d="M40 18h40l-4 30c-2 14-10 20-16 20s-14-6-16-20z" fill="none" stroke={G} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M42.5 34 h35" stroke="none" />
          <path className="cap-swirl" d="M44 36c4 4 10 6 16 6s12-2 16-6l-2.5 14c-2 12-9 16-13.5 16s-11.5-4-13.5-16z"
                fill={type === 'robe' ? W : `${W}cc`} />
          <line x1="60" y1="68" x2="60" y2="94" stroke={G} strokeWidth="2.5" />
          <line x1="44" y1="97" x2="76" y2="97" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case 'carafe':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path d="M54 16h12v18c14 5 22 16 22 30 0 20-13 34-28 34S32 84 32 64c0-14 8-25 22-30z" fill="none" stroke={G} strokeWidth="2.5" strokeLinejoin="round" />
          <path className="cap-fill" d="M36 66c7-4 14 4 24 0s17 2 24 0c-1 17-12 28-24 28S37 83 36 66z" fill={W} />
          <circle className="cap-bulle" cx="52" cy="60" r="2" fill={G} />
          <circle className="cap-bulle cap-d2" cx="66" cy="56" r="1.6" fill={G} />
          <circle className="cap-bulle cap-d3" cx="60" cy="64" r="1.3" fill={G} />
        </svg>
      )
    case 'bouteille':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <g className="cap-balance">
            <path d="M54 12h12v20c0 4 8 8 8 18v46a6 6 0 0 1-6 6H52a6 6 0 0 1-6-6V50c0-10 8-14 8-18z" fill="none" stroke={G} strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="50" y="62" width="20" height="24" rx="2" fill="none" stroke={GD} strokeWidth="1.5" />
            <line x1="54" y1="12" x2="66" y2="12" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      )
    case 'goutte': case 'larmes':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path className="cap-goutte" d="M60 24c12 18 20 28 20 40a20 20 0 0 1-40 0c0-12 8-22 20-40z" fill={W} stroke={G} strokeWidth="2" />
          <path d="M52 68a10 10 0 0 0 6 9" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      )
    case 'thermometre': case 'chaleur': case 'froid': {
      const col = type === 'froid' ? '#7ea8d8' : type === 'chaleur' ? '#c0392b' : W
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <rect x="52" y="16" width="16" height="64" rx="8" fill="none" stroke={G} strokeWidth="2.5" />
          <circle cx="60" cy="92" r="14" fill="none" stroke={G} strokeWidth="2.5" />
          <circle cx="60" cy="92" r="8" fill={col} />
          <rect className={type === 'froid' ? 'cap-mercure-bas' : 'cap-mercure'} x="56" y="30" width="8" height="56" rx="4" fill={col} />
          <line x1="74" y1="30" x2="82" y2="30" stroke={GD} strokeWidth="1.5" />
          <line x1="74" y1="46" x2="82" y2="46" stroke={GD} strokeWidth="1.5" />
          <line x1="74" y1="62" x2="82" y2="62" stroke={GD} strokeWidth="1.5" />
        </svg>
      )
    }
    case 'sablier':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <g className="cap-balance">
            <path d="M40 20h40M40 100h40M44 20c0 22 13 26 13 40s-13 18-13 40M76 20c0 22-13 26-13 40s13 18 13 40" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M52 32c2 8 6 10 8 14 2-4 6-6 8-14z" fill={W} />
            <path className="cap-sable" d="M50 94c1-8 8-12 10-12s9 4 10 12z" fill={W} />
          </g>
        </svg>
      )
    case 'grappe': case 'tanin':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path d="M60 18c4-6 12-8 18-6" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
          {[[48, 38], [60, 34], [72, 38], [42, 54], [54, 52], [66, 52], [78, 54], [48, 68], [60, 68], [72, 68], [54, 82], [66, 82], [60, 96]].map(([x, y], i) => (
            <circle key={i} className="cap-grain" style={{ animationDelay: `${i * 90}ms` }} cx={x} cy={y} r="7.5"
                    fill={W} stroke={G} strokeWidth="1.2" />
          ))}
        </svg>
      )
    case 'soleil': case 'millesime':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <circle cx="60" cy="60" r="18" fill="none" stroke={G} strokeWidth="2.5" />
          <circle cx="60" cy="60" r="9" fill={G} opacity="0.35" />
          <g className="cap-rayons">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4
              return <line key={i} x1={60 + Math.cos(a) * 26} y1={60 + Math.sin(a) * 26}
                           x2={60 + Math.cos(a) * 36} y2={60 + Math.sin(a) * 36}
                           stroke={G} strokeWidth="2.5" strokeLinecap="round" />
            })}
          </g>
        </svg>
      )
    case 'aromes': case 'nez':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path d="M44 74h32l-4 18c-1 5-5 8-12 8s-11-3-12-8z" fill="none" stroke={G} strokeWidth="2.5" strokeLinejoin="round" />
          <path className="cap-vapeur" d="M48 62c-3-6 3-8 0-14" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
          <path className="cap-vapeur cap-d2" d="M60 60c-3-7 3-10 0-18" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
          <path className="cap-vapeur cap-d3" d="M72 62c-3-6 3-8 0-14" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'coeur': case 'accord':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path className="cap-pulse" d="M60 96C38 78 26 64 26 48a18 18 0 0 1 34-8 18 18 0 0 1 34 8c0 16-12 30-34 48z"
                fill={W} stroke={G} strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )
    case 'apogee':
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <path d="M20 96h80M20 96V24" stroke={GD} strokeWidth="1.5" strokeLinecap="round" />
          <path className="cap-trace" d="M24 90 C 40 88, 48 44, 62 42 S 88 60, 98 78" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
          <circle className="cap-pulse" cx="62" cy="42" r="5" fill={W} stroke={G} strokeWidth="2" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 120 120" className="cap-illu" aria-hidden="true">
          <circle cx="60" cy="60" r="30" fill="none" stroke={G} strokeWidth="2.5" />
        </svg>
      )
  }
}

const CAP_CSS = `
.cap-illu { width: clamp(130px, 32vmin, 200px); height: auto; }
.cap-mini .cap-illu { width: 38px; height: 38px; }
@media (prefers-reduced-motion: no-preference) {
  .cap-swirl   { transform-origin: 60px 50px; animation: capSwirl 3.2s ease-in-out infinite; }
  .cap-fill    { animation: capFade 3s ease-in-out infinite alternate; }
  .cap-bulle   { animation: capRise 2.4s ease-in infinite; }
  .cap-goutte  { transform-origin: 60px 60px; animation: capDrop 2.6s ease-in-out infinite; }
  .cap-mercure { transform-origin: 60px 86px; animation: capMercure 3s ease-in-out infinite alternate; }
  .cap-mercure-bas { transform-origin: 60px 86px; animation: capMercureBas 3s ease-in-out infinite alternate; }
  .cap-balance { transform-origin: 60px 60px; animation: capBalance 4s ease-in-out infinite; }
  .cap-sable   { animation: capFade 2s ease-in-out infinite alternate; }
  .cap-grain   { animation: capPop 2.8s ease-in-out infinite; }
  .cap-rayons  { transform-origin: 60px 60px; animation: capSpin 14s linear infinite; }
  .cap-vapeur  { animation: capVapeur 2.2s ease-in-out infinite; }
  .cap-pulse   { transform-origin: 60px 60px; animation: capPulse 1.6s ease-in-out infinite; }
  .cap-trace   { stroke-dasharray: 160; stroke-dashoffset: 160; animation: capTrace 3s ease-out infinite; }
  .cap-d2 { animation-delay: .5s; } .cap-d3 { animation-delay: 1s; }
  .cap-ecran   { animation: capIn .5s cubic-bezier(0.22,1,0.36,1); }
}
@keyframes capSwirl   { 0%,100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) } }
@keyframes capFade    { from { opacity: .55 } to { opacity: 1 } }
@keyframes capRise    { 0% { transform: translateY(10px); opacity: 0 } 30% { opacity: 1 } 100% { transform: translateY(-16px); opacity: 0 } }
@keyframes capDrop    { 0%,100% { transform: scale(0.96) translateY(-3px) } 55% { transform: scale(1.04) translateY(3px) } }
@keyframes capMercure { from { transform: scaleY(.45) } to { transform: scaleY(1) } }
@keyframes capMercureBas { from { transform: scaleY(1) } to { transform: scaleY(.45) } }
@keyframes capBalance { 0%,100% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } }
@keyframes capPop     { 0%,15% { opacity: .25; transform: scale(.85) } 35%,100% { opacity: 1; transform: scale(1) } }
@keyframes capSpin    { to { transform: rotate(360deg) } }
@keyframes capVapeur  { 0% { transform: translateY(4px); opacity: 0 } 40% { opacity: 1 } 100% { transform: translateY(-8px); opacity: 0 } }
@keyframes capPulse   { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
@keyframes capTrace   { to { stroke-dashoffset: 0 } }
@keyframes capIn      { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
`

// ── Lecteur plein écran ──────────────────────────────────────────────────────
export function CapsulePlayer({ capsule, onClose }) {
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)
  const nb = capsule.ecrans.length

  const next = useCallback(() => {
    setIdx(i => {
      if (i >= nb - 1) { onClose(); return i }
      return i + 1
    })
    setProgress(0)
  }, [nb, onClose])

  const prev = useCallback(() => {
    setIdx(i => Math.max(0, i - 1))
    setProgress(0)
  }, [])

  // Marque « vue » dès le dernier écran atteint
  useEffect(() => { if (idx === nb - 1) marquerVue(capsule.id) }, [idx, nb, capsule.id])

  // Avance auto (désactivée si prefers-reduced-motion)
  useEffect(() => {
    if (reduced) return
    let start = performance.now()
    let acc = 0
    const loop = now => {
      if (!pausedRef.current) {
        acc += now - start
        const p = Math.min(1, acc / DUREE)
        setProgress(p)
        if (p >= 1) { next(); return }
      }
      start = now
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [idx, reduced, next])

  // Clavier : flèches + Échap
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  const ecran = capsule.ecrans[idx]

  return (
    <div className="fixed inset-0 z-[90] flex flex-col select-none animate-fade-in"
         style={{ background: 'radial-gradient(ellipse 100% 90% at 50% 110%, #3a0616 0%, #1C1917 55%, #0C0A09 90%)' }}
         role="dialog" aria-modal="true" aria-label={capsule.titre}
         onPointerDown={() => { pausedRef.current = true }}
         onPointerUp={() => { pausedRef.current = false }}
         onPointerLeave={() => { pausedRef.current = false }}>
      <style>{CAP_CSS}</style>

      {/* Barres de progression segmentées */}
      <div className="flex gap-1.5 px-4 pt-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        {capsule.ecrans.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(250,250,249,0.22)' }}>
            <div className="h-full rounded-full" style={{
              background: G,
              width: i < idx ? '100%' : i === idx ? (reduced ? '100%' : `${progress * 100}%`) : '0%',
            }} />
          </div>
        ))}
      </div>

      {/* En-tête */}
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: G }}>
          1 minute pour comprendre
        </span>
        <button onClick={onClose} aria-label="Fermer la capsule"
                className="w-11 h-11 flex items-center justify-center rounded-full text-cream/80 hover:text-cream hover:bg-white/10 transition-all cursor-pointer">
          <X size={20} />
        </button>
      </div>

      {/* Écran courant */}
      <div key={idx} className="cap-ecran flex-1 flex flex-col items-center justify-center text-center px-8 gap-8 min-h-0">
        <Illu type={ecran.visuel} />
        <p className="font-serif text-cream leading-snug max-w-md"
           style={{ fontSize: 'clamp(1.35rem, 3.4vmin + 0.6rem, 2rem)' }}>
          {ecran.texte}
        </p>
      </div>

      {/* Pied : titre + compteur */}
      <div className="text-center pb-6 px-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="font-serif text-sm text-cream/70">{capsule.titre}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mt-1">{idx + 1} / {nb}</div>
      </div>

      {/* Zones tactiles gauche/droite */}
      <button onClick={prev} aria-label="Écran précédent"
              className="absolute left-0 top-16 bottom-16 w-1/3 cursor-pointer focus:outline-none" />
      <button onClick={next} aria-label="Écran suivant"
              className="absolute right-0 top-16 bottom-16 w-2/3 cursor-pointer focus:outline-none" />

      {/* Flèches visibles en navigation manuelle (reduced motion) */}
      {reduced && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 pointer-events-none">
          <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cream/70"><ChevronLeft size={16} /></span>
          <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cream/70"><ChevronRight size={16} /></span>
        </div>
      )}
    </div>
  )
}

// ── Rangée de vignettes rondes façon stories ─────────────────────────────────
export default function CapsulesRow() {
  const [vues, setVues] = useState({})
  const [active, setActive] = useState(null)

  useEffect(() => {
    const refresh = () => setVues(loadVues())
    refresh()
    window.addEventListener('oeno-capsules-changed', refresh)
    return () => window.removeEventListener('oeno-capsules-changed', refresh)
  }, [])

  return (
    <div className="mb-8">
      <style>{CAP_CSS}</style>
      <span className="eyebrow mb-3">1 minute pour comprendre</span>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
        {CAPSULES.map(c => {
          const vue = !!vues[c.id]
          return (
            <button key={c.id} onClick={() => setActive(c)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 w-[76px] cursor-pointer group"
                    aria-label={`${c.titre}${vue ? ' (déjà vue)' : ''}`}>
              <span className={`w-[68px] h-[68px] rounded-full p-[3px] transition-all duration-300 group-hover:scale-105 group-active:scale-95 ${vue ? '' : 'shadow-gold'}`}
                    style={{ background: vue ? '#d6d3d1' : `conic-gradient(from 20deg, ${G}, ${GD}, #e8cf8a, ${G})` }}>
                <span className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                      style={{ background: 'radial-gradient(circle at 50% 120%, #3a0616 0%, #1C1917 70%)' }}>
                  <span className={`cap-mini absolute inset-0 flex items-center justify-center ${vue ? 'opacity-50' : ''}`}>
                    <Illu type={c.vignette} />
                  </span>
                  {!vue && <Play size={11} className="absolute bottom-1.5 right-1.5 text-gold-400 fill-gold-400" />}
                </span>
              </span>
              <span className={`text-[10px] leading-tight text-center font-medium line-clamp-2 ${vue ? 'text-anthracite-400' : 'text-anthracite-700'}`}>
                {c.titre}
              </span>
            </button>
          )
        })}
      </div>
      {active && <CapsulePlayer capsule={active} onClose={() => setActive(null)} />}
    </div>
  )
}
