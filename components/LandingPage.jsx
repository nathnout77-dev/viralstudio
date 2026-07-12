import { useEffect, useRef, useState } from 'react'
import { Wine, Library, MapPin, Sparkles, BookOpen, ChevronDown, Utensils, ArrowRight, Gauge, Hourglass, Camera, GraduationCap, Compass, NotebookPen, Users, Play, UtensilsCrossed } from 'lucide-react'
import { CAPSULES } from '../data/capsules'
import { CapsulePlayer } from './Capsules'
import { WINE_DB, MILLESIMES_DB, CONFIDENTIEL_DOMAINES, WINE_DB_BY_REGION } from '../data/wineDatabase'
import WineGlassAnim, { fillLevelFromJauges } from './WineGlassAnim'
import RoueAromes from './RoueAromes'

// ═══════════════════════════════════════════════════════════════════════════
// ŒNO — Landing cinématique scroll-driven (façon keynote produit)
// Un seul listener scroll passif + rAF ; styles pilotés par refs (zéro
// re-render React par frame). Uniquement transform/opacity.
// prefers-reduced-motion → tout est rendu statiquement, sans pinning.
// ═══════════════════════════════════════════════════════════════════════════

// ── Easings / helpers ─────────────────────────────────────────────────────────
const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (p, a, b) => { const t = clamp01((p - a) / (b - a)); return t * t * (3 - 2 * t) }
const outCubic = t => 1 - Math.pow(1 - t, 3)

// ── Compteur cinématique — easeOutExpo, 1200 ms ──────────────────────────────
function useCountUp(target, start = false, instant = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    if (instant) { setCount(target); return }
    let raf, t0 = null
    const tick = t => {
      if (t0 === null) t0 = t
      const p = Math.min((t - t0) / 1200, 1)
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setCount(Math.round(e * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, instant])
  return count
}

// ── Grand verre SVG — remplissage piloté par transform (translateY) ──────────
// Le vin est un rect plein clippé dans le bol ; on translate le groupe vers le
// haut pour "remplir". staticFill sert au premier rendu et au mode réduit.
function GrandVerre({ id, staticFill = 0, className = '', stroke = 'rgba(201,168,76,0.75)' }) {
  const ty = (1 - clamp01(staticFill)) * 54
  return (
    <svg viewBox="0 0 100 150" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={`lp-bowl-${id}`}>
          <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" />
        </clipPath>
        <linearGradient id={`lp-vin-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a63d4a" />
          <stop offset="100%" stopColor="#5c0d22" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#lp-bowl-${id})`}>
        <g data-lp-vin style={{ transform: `translateY(${ty}px)`, willChange: 'transform' }}>
          <rect x="18" y="10" width="64" height="60" fill={`url(#lp-vin-${id})`} />
          <ellipse data-lp-surface cx="50" cy="10.5" rx="27" ry="2.6" fill="#c9727e"
                   style={{ opacity: staticFill > 0.05 ? 0.55 : 0 }} />
        </g>
      </g>
      <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <line x1="50" y1="62" x2="50" y2="122" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="128" x2="70" y2="128" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ── Bouteille bordelaise stylisée, reflets or ────────────────────────────────
function Bouteille({ className = '' }) {
  return (
    <svg viewBox="0 0 120 360" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lp-btl-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#150409" />
          <stop offset="42%" stopColor="#3a0616" />
          <stop offset="58%" stopColor="#4a0a1c" />
          <stop offset="100%" stopColor="#100308" />
        </linearGradient>
        <linearGradient id="lp-btl-capsule" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c96b" />
          <stop offset="55%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#8f7223" />
        </linearGradient>
      </defs>
      {/* Corps bordelais : épaules marquées, fût droit */}
      <path d="M51 30 L51 104 C51 133 28 140 28 168 L28 330 Q28 343 41 343 L79 343 Q92 343 92 330 L92 168 C92 140 69 133 69 104 L69 30 Z"
            fill="url(#lp-btl-body)" stroke="rgba(201,168,76,0.45)" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Capsule or */}
      <rect x="48.5" y="8" width="23" height="30" rx="3.5" fill="url(#lp-btl-capsule)" />
      <rect x="48.5" y="30" width="23" height="2" fill="rgba(12,10,9,0.35)" />
      {/* Reflet lumineux + filet or */}
      <path d="M37 178 L37 322" stroke="rgba(250,250,249,0.10)" strokeWidth="7" strokeLinecap="round" />
      <path d="M84 178 L84 322" stroke="rgba(201,168,76,0.30)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M52 40 L52 96" stroke="rgba(250,250,249,0.14)" strokeWidth="3" strokeLinecap="round" />
      {/* Étiquette crème */}
      <rect x="35" y="206" width="50" height="66" rx="2.5" fill="#FAFAF9" opacity="0.94" />
      <rect x="35" y="206" width="50" height="66" rx="2.5" stroke="rgba(201,168,76,0.65)" strokeWidth="1" />
      <text x="60" y="236" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="19" fontWeight="600" fill="#1C1917">Œno</text>
      <text x="60" y="252" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="6" letterSpacing="2.2" fill="#A16207">GRAND VIN</text>
      <line x1="46" y1="261" x2="74" y2="261" stroke="rgba(161,98,7,0.5)" strokeWidth="0.8" />
    </svg>
  )
}

// ── Caractéristique autour de la bouteille (scène 3) ─────────────────────────
// Défini au niveau module : une définition inline serait remontée à chaque
// re-render (compteurs), ce qui écraserait les styles posés par le moteur rAF.
function FeatCard({ f, i, hidden }) {
  const Icon = f.icon
  return (
    <div data-lp-feat={i} style={hidden} className="flex items-start gap-3.5 max-w-[15rem]">
      <div className="w-10 h-10 shrink-0 rounded-full border border-gold-500/35 flex items-center justify-center">
        <Icon size={16} className="text-gold-400" strokeWidth={1.75} />
      </div>
      <div className="text-left">
        <div className="font-serif text-cream text-base sm:text-lg leading-snug">{f.t}</div>
        <div className="text-anthracite-400 text-xs font-light leading-relaxed mt-1">{f.d}</div>
      </div>
    </div>
  )
}

// ── Landing ───────────────────────────────────────────────────────────────────
export default function LandingPage({ onEnter, onTabChange, onCeSoir, onScan }) {
  const [reduced, setReduced] = useState(false)
  const [statsOn, setStatsOn] = useState(false)
  const [capsuleActive, setCapsuleActive] = useState(null) // capsule « 1 minute pour comprendre »
  const statsRef = useRef(null)

  // Racines des scènes épinglées (le moteur rAF va chercher les nœuds dedans)
  const heroRef   = useRef(null)
  const acteARef  = useRef(null)
  const acteBRef  = useRef(null)
  const bottleRef = useRef(null)

  // ── prefers-reduced-motion ──────────────────────────────────────────────
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

  // ── Moteur de scroll : 1 listener passif + rAF, styles via refs ─────────
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const scenes = []

    const progressOf = el => {
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      if (span < 1) return r.top < 0 ? 1 : 0
      return clamp01(-r.top / span)
    }

    // Scène 1 — HERO : verre qui se remplit, titre qui se réduit, sous-titre qui bascule
    if (heroRef.current) {
      const root    = heroRef.current
      const title   = root.querySelector('[data-lp-title]')
      const vin     = root.querySelector('[data-lp-vin]')
      const surface = root.querySelector('[data-lp-surface]')
      const sub1    = root.querySelector('[data-lp-sub1]')
      const sub2    = root.querySelector('[data-lp-sub2]')
      const glow    = root.querySelector('[data-lp-glow]')
      const bg      = root.querySelector('[data-lp-herobg]')
      const hint    = root.querySelector('[data-lp-hint]')
      scenes.push({ el: root, last: -1, render(p) {
        const fill = 0.06 + 0.86 * p
        if (vin)     vin.style.transform = `translateY(${(1 - fill) * 54}px)`
        if (surface) surface.style.opacity = fill > 0.08 ? 0.55 : 0
        if (title)   title.style.transform = `scale(${1 - 0.16 * outCubic(p)}) translateY(${-10 * p}px)`
        const out = smooth(p, 0.16, 0.44), inn = smooth(p, 0.42, 0.7)
        if (sub1) { sub1.style.opacity = 1 - out; sub1.style.transform = `translateY(${-16 * out}px)` }
        if (sub2) { sub2.style.opacity = inn;     sub2.style.transform = `translateY(${(1 - inn) * 16}px)` }
        if (glow) glow.style.opacity = 0.35 + 0.55 * p
        if (bg)   bg.style.opacity = p
        if (hint) hint.style.opacity = 1 - smooth(p, 0, 0.12)
      } })
    }

    // Scènes 2a/2b — messages géants ligne par ligne
    const lineScene = root => {
      if (!root) return
      const lines = [...root.querySelectorAll('[data-lp-line]')]
      const T = [0.06, 0.34, 0.62]
      scenes.push({ el: root, last: -1, render(p) {
        lines.forEach((el, i) => {
          const t = smooth(p, T[i] ?? 0.6, (T[i] ?? 0.6) + 0.22)
          el.style.opacity = t
          el.style.transform = `translateY(${(1 - t) * 44}px)`
        })
      } })
    }
    lineScene(acteARef.current)
    lineScene(acteBRef.current)

    // Scène 3 — zoom bouteille : scale 1.4 → 1, caractéristiques en fade+slide décalés
    if (bottleRef.current) {
      const root  = bottleRef.current
      const btl   = root.querySelector('[data-lp-bottle]')
      const feats = [...root.querySelectorAll('[data-lp-feat]')]
      scenes.push({ el: root, last: -1, render(p) {
        const settle = outCubic(smooth(p, 0, 0.55))
        if (btl) btl.style.transform = `translateY(${(1 - settle) * 6}%) scale(${1.4 - 0.4 * settle})`
        feats.forEach(el => {
          const i = Number(el.dataset.lpFeat) || 0
          const a = 0.4 + i * 0.13
          const t = smooth(p, a, a + 0.2)
          el.style.opacity = t
          el.style.transform = `translateY(${(1 - t) * 28}px)`
        })
      } })
    }

    const update = () => {
      raf = 0
      for (const s of scenes) {
        const p = progressOf(s.el)
        if (Math.abs(p - s.last) < 0.0005) continue
        s.last = p
        s.render(p)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  // ── Reveal zones (sections non épinglées) + déclencheur des compteurs ───
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 90))
          if (e.target === statsRef.current) setStatsOn(true)
        }
      }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-reveal-zone]').forEach(z => observer.observe(z))
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  // ── Stats (calculées depuis WINE_DB / MILLESIMES_DB) ────────────────────
  const totRegions  = new Set(WINE_DB.map(w => w.region)).size
  const nVins       = useCountUp(WINE_DB.length, statsOn, reduced)
  const nRegions    = useCountUp(totRegions, statsOn, reduced)
  const nFaciles    = useCountUp(WINE_DB.filter(w => w.difficulte === 'facile').length, statsOn, reduced)
  const nDomaines   = useCountUp(WINE_DB.reduce((s, w) => s + w.domaines.length, 0), statsOn, reduced)
  const nMillesimes = useCountUp(MILLESIMES_DB.length, statsOn, reduced)
  const nCepages    = useCountUp(new Set(WINE_DB.flatMap(w => w.cepages)).size, statsOn, reduced)

  // ── Domaine du moment — un nouveau domaine à chaque visite de la page ──
  const [domaineIdx] = useState(() =>
    CONFIDENTIEL_DOMAINES.length ? Math.floor(Math.random() * CONFIDENTIEL_DOMAINES.length) : 0
  )
  const domaineDuMoment = CONFIDENTIEL_DOMAINES.length
    ? CONFIDENTIEL_DOMAINES[domaineIdx]
    : null
  const domaineWine = domaineDuMoment
    ? WINE_DB.find(w => w.id === domaineDuMoment.wines[0].id)
    : null

  // ── Cartes du carrousel : moments (features) + régions phares ───────────
  const features = [
    { icon: Utensils, title: '« Ce soir, je bois quoi ? »', desc: 'Dites-nous juste ce que vous mangez. 3 vins, 10 secondes, zéro jargon.', action: onCeSoir, cta: 'Essayer', color: '#8c2f39' },
    { icon: Camera, title: 'Scannez une étiquette', desc: 'Une bouteille vous intrigue au restaurant ? Photographiez l\'étiquette : Œno vous la décode en quelques secondes.', action: onScan, cta: 'Scanner', color: '#a16207' },
    { icon: Sparkles, title: 'Le Goût-o-mètre', desc: 'Café ou thé ? Confiture ou citron ? Répondez sur VOS goûts, on trouve VOS vins.', action: () => onTabChange('sommelier'), cta: 'Faire le test', color: '#b8722c' },
    { icon: UtensilsCrossed, title: 'Le Mode Dîner', desc: 'Entrée, plat, dessert : composez le menu des vins de votre repas, comme au restaurant.', action: () => { try { sessionStorage.setItem('oeno-sommelier-tool', 'diner') } catch {} ; onTabChange('sommelier') }, cta: 'Composer', color: '#72102a' },
    { icon: Library, title: `${WINE_DB.length} vins décodés`, desc: 'Chaque appellation expliquée simplement : jauges de goût, prix moyen, "pour qui ?".', action: () => onTabChange('vins'), cta: 'Explorer', color: '#4d7c50' },
    { icon: MapPin, title: 'La carte des vignobles', desc: `Voyagez dans ${totRegions} régions, cliquez, découvrez, ajoutez à votre cave.`, action: () => onTabChange('carte'), cta: 'Voyager', color: '#3d5a80' },
    { icon: Wine, title: 'Votre cave, simplifiée', desc: 'Suivez vos bouteilles et sachez toujours laquelle ouvrir ce soir.', action: onEnter, cta: 'Ma cave', color: '#5c0d22' },
    { icon: BookOpen, title: 'Le lexique décodé', desc: 'Tanins, millésime, carafage… tous les mots compliqués expliqués comme à un ami.', action: () => onTabChange('guide'), cta: 'Apprendre', color: '#6b4a3a' },
    { icon: Play, title: '1 minute pour comprendre', desc: 'Le carafage, les tanins, la robe… 8 capsules animées façon stories. Une minute chrono chacune.', action: () => setCapsuleActive(CAPSULES[0]), cta: 'Regarder', color: '#7a5c1e' },
  ]
  const topRegions = Object.entries(WINE_DB_BY_REGION)
    .map(([region, ws]) => ({ region, count: ws.length, color: ws[0].color }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  // Caractéristiques autour de la bouteille (scène 3)
  const bottleFeats = [
    { icon: Library,   t: `${WINE_DB.length} vins décodés`,     d: 'Chaque appellation en langage humain.' },
    { icon: MapPin,    t: `${totRegions} régions viticoles`,    d: 'De Bordeaux à la Toscane, sans passeport.' },
    { icon: Gauge,     t: 'Jauges de goût',                     d: 'Puissance, douceur, tanins — lisibles en un regard.' },
    { icon: Hourglass, t: 'Garde par millésime',                d: 'Sait exactement quand ouvrir chaque bouteille.' },
  ]

  // Styles initiaux des éléments animés (visibles d'emblée en mode réduit)
  const hiddenLine = reduced ? undefined : { opacity: 0, transform: 'translateY(44px)', willChange: 'transform, opacity' }
  const hiddenFeat = reduced ? undefined : { opacity: 0, transform: 'translateY(28px)', willChange: 'transform, opacity' }
  const pinH  = h => (reduced ? undefined : { height: h })
  const pinCls = reduced ? 'relative lp-min-screen overflow-hidden' : 'lp-pin lp-screen'

  return (
    <div className="min-h-screen" style={{ background: '#0C0A09' }}>

      {/* ════ SCÈNE 1 — HERO ÉPINGLÉ : le verre se remplit au scroll ════ */}
      <section ref={heroRef} className="relative" style={pinH('300vh')} aria-label="Œno — le vin, enfin simple">
        <div className={`${pinCls} bg-noise flex flex-col`}
             style={{ background: 'radial-gradient(ellipse 100% 85% at 50% 115%, #3a0616 0%, #1C1917 52%, #0C0A09 85%)' }}>

          {/* Voile bordeaux qui s'intensifie avec le remplissage */}
          <div data-lp-herobg aria-hidden="true" className="absolute inset-0 pointer-events-none"
               style={{ opacity: reduced ? 1 : 0, background: 'radial-gradient(ellipse 85% 60% at 50% 100%, rgba(92,13,34,0.75) 0%, transparent 65%)' }} />

          {/* Mini header */}
          <header className="relative z-10 flex items-center justify-between max-w-6xl mx-auto w-full px-6 pt-5">
            <span className="font-serif text-cream text-xl tracking-tight">Œno</span>
            <button onClick={onEnter}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 rounded-full text-sm font-medium text-cream border border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/10 active:scale-[0.98] transition-all duration-300 cursor-pointer">
              Entrer dans l'app
            </button>
          </header>

          {/* Contenu central */}
          <div className="lp-hero-content relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 gap-[2svh] py-2 min-h-0">
            <h1 data-lp-title className="font-serif font-medium text-cream tracking-tight leading-none will-change-transform"
                style={{ fontSize: 'clamp(3.2rem, 16vw, 12rem)' }}>
              Œno
            </h1>

            <div className="lp-hero-glass relative flex items-center justify-center" style={{ height: 'min(26svh, 18rem)' }}>
              <div data-lp-glow aria-hidden="true" className="absolute w-[130%] aspect-square rounded-full"
                   style={{ opacity: reduced ? 0.9 : 0.35, background: 'radial-gradient(circle, rgba(140,47,57,0.4) 0%, transparent 70%)' }} />
              <GrandVerre id="hero" staticFill={reduced ? 0.85 : 0.06} className="relative h-full w-auto" />
            </div>

            {/* Sous-titre : "Le vin…" → "…enfin simple." */}
            <div className="relative h-10 w-full">
              {reduced ? (
                <p className="text-anthracite-300 text-lg sm:text-xl font-light">Le vin, <span className="shimmer-text font-serif italic">enfin simple.</span></p>
              ) : (
                <>
                  <p data-lp-sub1 className="absolute inset-x-0 text-anthracite-300 text-lg sm:text-xl font-light will-change-transform">Le vin…</p>
                  <p data-lp-sub2 className="absolute inset-x-0 text-lg sm:text-xl font-light will-change-transform" style={{ opacity: 0 }}>
                    <span className="shimmer-text font-serif italic">…enfin simple.</span>
                  </p>
                </>
              )}
            </div>

            {/* CTA — toujours accessibles */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button onClick={onCeSoir}
                      className="group min-h-[52px] inline-flex items-center justify-center gap-3 px-8 rounded-full font-semibold text-anthracite-950 shadow-gold-lg transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}>
                <Utensils size={17} />
                Ce soir, je bois quoi ?
                <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <button onClick={onEnter}
                      className="min-h-[52px] inline-flex items-center justify-center gap-3 px-8 rounded-full font-medium text-cream border border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] cursor-pointer">
                <Wine size={16} />
                Entrer dans l'app
              </button>
            </div>
          </div>

          {/* Indice de scroll */}
          <div data-lp-hint className="lp-hero-hint relative z-10 pb-4 flex-shrink-0 flex flex-col items-center gap-1.5 text-gold-500/70">
            <span className="text-[10px] uppercase tracking-[0.3em]">Faites défiler</span>
            <ChevronDown size={15} className="animate-bounce-subtle" />
          </div>
        </div>
      </section>

      {/* ════ L'ŒNOLOGIE, EXPLIQUÉE SIMPLEMENT ════ */}
      <section data-reveal-zone className="relative overflow-hidden py-24 sm:py-32 px-6 sm:px-10" style={{ background: '#FAFAF9' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="eyebrow reveal">L'œnologie, une idée de vie</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-anthracite-950 leading-[1.15] tracking-tight mt-5 reveal reveal-delay-1">
            L'œnologie, c'est <span className="italic text-wine-900">la science du vin</span> —
            <br className="hidden sm:block" /> mais surtout, un art de vivre au quotidien.
          </h2>
          <p className="reveal reveal-delay-2 text-anthracite-500 font-light text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
            Elle étudie comment un raisin devient un vin, pourquoi deux bouteilles de la même appellation
            n'ont pas le même goût selon l'année, et ce qui distingue un grand vin d'un vin simplement bon.
            S'y intéresser, ce n'est pas apprendre par cœur — c'est prendre le temps de goûter, d'observer,
            et de savourer chaque bouteille comme un moment à part entière.
          </p>

          <div className="reveal reveal-delay-3 grid sm:grid-cols-3 gap-6 sm:gap-8 mt-16 text-left">
            {[
              { icon: Compass,    t: 'Goûtez, sans pression',   d: "Ouvrez une bouteille, observez sa couleur, respirez, goûtez. Il n'y a pas de mauvaise réponse — seulement votre ressenti." },
              { icon: GraduationCap, t: 'Apprenez un mot à la fois', d: 'Le lexique Œno explique chaque terme technique simplement, dès que vous le croisez sur une fiche vin.' },
              { icon: NotebookPen, t: 'Gardez une trace',        d: 'Notez vos dégustations dans Mémoires de Vin : avec le temps, vous découvrirez ce que vous aimez vraiment.' },
            ].map((f, i) => (
              <div key={f.t} className="flex flex-col items-start gap-3 p-6 rounded-2xl border border-anthracite-100 bg-white/60">
                <f.icon size={22} className="text-gold-600" strokeWidth={1.6} />
                <h3 className="font-serif text-lg font-medium text-anthracite-900">{f.t}</h3>
                <p className="text-sm text-anthracite-500 font-light leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SCÈNE 2a — MESSAGE ÉPINGLÉ, ligne par ligne (crème) ════ */}
      <section ref={acteARef} className="relative" style={pinH('240vh')}>
        <div className={`${pinCls} flex items-center justify-center`} style={{ background: '#FAFAF9' }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif font-medium text-anthracite-950 tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.6rem, 9vw, 6.2rem)' }}>
              <span data-lp-line style={hiddenLine} className="block">Vous n'y connaissez</span>
              <span data-lp-line style={hiddenLine} className="block">rien en vin ?</span>
              <span data-lp-line style={hiddenLine} className="block italic text-wine-900 mt-3">Parfait.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* ════ SCÈNE 2b — MESSAGE ÉPINGLÉ, ligne par ligne (sombre) ════ */}
      <section ref={acteBRef} className="relative" style={pinH('240vh')}>
        <div className={`${pinCls} bg-noise flex items-center justify-center`}
             style={{ background: 'radial-gradient(ellipse 80% 90% at 50% 0%, #1C1917 0%, #0C0A09 70%)' }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif font-medium text-cream tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.6rem, 9vw, 6.2rem)' }}>
              <span data-lp-line style={hiddenLine} className="block">Pas de jargon.</span>
              <span data-lp-line style={hiddenLine} className="block">Pas de snobisme.</span>
              <span data-lp-line style={hiddenLine} className="block mt-5">
                <span className="shimmer-text italic" style={{ fontSize: '0.62em' }}>Juste le plaisir, expliqué simplement.</span>
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ════ SCÈNE 3 — ZOOM BOUTEILLE : scale 1.4 → 1, caractéristiques autour ════ */}
      <section ref={bottleRef} className="relative" style={pinH('280vh')}>
        <div className={`${pinCls} bg-noise flex items-center justify-center`}
             style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 18%, #2a0410 0%, #0C0A09 72%)' }}>
          <div className="max-w-5xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-10">
              {/* Colonne gauche (desktop) */}
              <div className="hidden md:flex flex-col items-end gap-12">
                {bottleFeats.slice(0, 2).map((f, i) => <FeatCard key={f.t} f={f} i={i} hidden={hiddenFeat} />)}
              </div>

              {/* Bouteille */}
              <div className="flex justify-center">
                <div data-lp-bottle className="will-change-transform"
                     style={reduced ? undefined : { transform: 'translateY(6%) scale(1.4)' }}>
                  <Bouteille className="h-[40svh] max-h-[420px] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]" />
                </div>
              </div>

              {/* Colonne droite (desktop) */}
              <div className="hidden md:flex flex-col items-start gap-12">
                {bottleFeats.slice(2).map((f, i) => <FeatCard key={f.t} f={f} i={i + 2} hidden={hiddenFeat} />)}
              </div>
            </div>

            {/* Mobile : caractéristiques sous la bouteille */}
            <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-6 mt-8">
              {bottleFeats.map((f, i) => <FeatCard key={f.t} f={f} i={i} hidden={hiddenFeat} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════ SCÈNE 3bis — ROUE DES ARÔMES (crème, non épinglée, reveal) ════ */}
      <section data-reveal-zone className="relative overflow-hidden py-28 sm:py-36 px-6 sm:px-10" style={{ background: '#FAFAF9' }}
               aria-label="Apprenez à sentir — la roue des arômes">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow mb-6 reveal">Apprenez à sentir</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-medium text-anthracite-950 leading-[1.1] tracking-tight reveal reveal-delay-1">
              Votre nez sait déjà
              <br /><span className="italic text-wine-900">tout faire.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-anthracite-500 font-light mt-6 max-w-xl mx-auto">
              Huit familles d'arômes suffisent pour décrire presque tous les vins du monde.
              Touchez la roue : on vous explique chacune, sans jargon.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <RoueAromes />
          </div>
        </div>
      </section>

      {/* ════ SCÈNE 4 — COMPTEURS CINÉMATIQUES (crème) ════ */}
      <section data-reveal-zone className="relative overflow-hidden py-28 sm:py-36 px-6 sm:px-10" style={{ background: '#FAFAF9' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="eyebrow mb-6 reveal">Œno en chiffres</span>
          <h2 className="font-serif text-4xl sm:text-6xl font-medium text-anthracite-950 leading-[1.1] tracking-tight reveal reveal-delay-1">
            Une cave de savoir,
            <br /><span className="italic text-wine-900">ouverte à tous.</span>
          </h2>

          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-14 mt-24 reveal reveal-delay-2">
            {[
              [nVins,       'Vins décodés'],
              [nRegions,    'Régions viticoles'],
              [nCepages,    'Cépages expliqués'],
              [nMillesimes, 'Millésimes analysés'],
              [nDomaines,   'Domaines recommandés'],
              [nFaciles,    '« Faciles à aimer »'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="font-serif text-6xl sm:text-7xl font-light text-anthracite-950 tabular-nums leading-none">{n}</div>
                <div className="text-[11px] text-gold-600 mt-4 uppercase tracking-[0.2em] font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DOMAINE DU MOMENT (conservé, interlude sombre) ════ */}
      {domaineDuMoment && domaineWine && (
        <section data-reveal-zone className="section-dark relative overflow-hidden py-28 sm:py-36 px-6 sm:px-10"
                 style={{ background: 'radial-gradient(ellipse 80% 90% at 50% 0%, #1C1917 0%, #0C0A09 70%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="eyebrow-dark mb-6 reveal">Domaine du moment</span>
            <div className="reveal reveal-delay-1 flex justify-center mb-8">
              <WineGlassAnim color={domaineWine.color} fillLevel={fillLevelFromJauges(domaineWine.jauges)} size={80} />
            </div>
            <h3 className="font-wine-name text-6xl sm:text-7xl text-cream reveal reveal-delay-1">{domaineDuMoment.name}</h3>
            <p className="text-anthracite-400 text-[11px] uppercase tracking-[0.2em] mt-4 reveal reveal-delay-2">
              {domaineDuMoment.appellations.join(', ')} · {domaineDuMoment.regions.join(', ')}
            </p>
            <p className="text-anthracite-300 text-lg font-light leading-relaxed italic mt-8 max-w-2xl mx-auto reveal reveal-delay-2">
              « {domaineDuMoment.histoire} »
            </p>
            <button
              onClick={() => onTabChange('vins', domaineDuMoment.name)}
              className="reveal reveal-delay-3 mt-12 min-h-[48px] inline-flex items-center gap-2.5 px-8 rounded-full font-medium text-sm text-cream border border-gold-500/40 hover:bg-gold-500/10 hover:border-gold-500/70 active:scale-[0.98] transition-all duration-500 cursor-pointer">
              <Wine size={14} className="text-gold-400" />
              Découvrir sa fiche
              <ArrowRight size={13} />
            </button>
          </div>
        </section>
      )}

      {/* ════ SCÈNE 5 — CARROUSEL HORIZONTAL SNAP : moments & régions ════ */}
      <section data-reveal-zone className="relative overflow-hidden py-28 sm:py-36" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center mb-14">
          <span className="eyebrow mb-6 reveal">L'expérience Œno</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-anthracite-950 tracking-tight reveal reveal-delay-1">
            Six façons de trouver <span className="italic text-wine-900">votre</span> vin
          </h2>
          <p className="reveal reveal-delay-2 inline-flex items-center gap-2 text-anthracite-500 text-xs uppercase tracking-[0.25em] mt-6">
            Faites glisser <ArrowRight size={12} className="text-gold-600" />
          </p>
        </div>

        <div className="reveal reveal-delay-2 flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[max(1.5rem,calc(50vw-38rem))] pb-4">
          {features.map(({ icon: Icon, title, desc, action, cta, color }) => (
            <button key={title} onClick={action}
                    className="snap-center shrink-0 w-[78vw] max-w-[320px] min-h-[360px] rounded-3xl border border-white/10 p-8 text-left flex flex-col group hover:-translate-y-2 active:scale-[0.98] transition-transform duration-500 cursor-pointer"
                    style={{ background: `linear-gradient(165deg, ${color} -60%, #1C1917 48%, #0C0A09 100%)` }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                   style={{ background: color }}>
                <Icon size={19} className="text-cream" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-2xl font-medium text-cream mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-anthracite-400 font-light leading-relaxed">{desc}</p>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-gold-400 text-[11px] font-semibold uppercase tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {cta} <ArrowRight size={11} className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          ))}

          {topRegions.map(({ region, count, color }) => (
            <button key={region} onClick={() => onTabChange('vins', region)}
                    className="snap-center shrink-0 w-[78vw] max-w-[320px] min-h-[360px] rounded-3xl border border-white/10 p-8 text-left flex flex-col group hover:-translate-y-2 active:scale-[0.98] transition-transform duration-500 cursor-pointer"
                    style={{ background: `linear-gradient(200deg, ${color} -70%, #1C1917 52%, #0C0A09 100%)` }}>
              <span className="eyebrow-dark mb-4">Région</span>
              <h3 className="font-wine-name text-5xl text-cream leading-none">{region}</h3>
              <p className="text-sm text-anthracite-400 font-light leading-relaxed mt-4">
                {count} appellation{count > 1 ? 's' : ''} décodée{count > 1 ? 's' : ''}, du grand cru au vin de copains.
              </p>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-gold-400 text-[11px] font-semibold uppercase tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Découvrir <ArrowRight size={11} className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ════ SCÈNE 6 — CTA FINAL : verre rempli en filigrane ════ */}
      <section data-reveal-zone className="section-dark relative overflow-hidden lp-min-screen flex items-center justify-center px-6 text-center"
               style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, #3a0616 0%, #0C0A09 70%)' }}>
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.09 }}>
          <GrandVerre id="final" staticFill={0.9} className="h-[85svh] w-auto" stroke="rgba(201,168,76,0.9)" />
        </div>

        <div className="relative max-w-2xl mx-auto py-28">
          <span className="eyebrow-dark mb-8 reveal">La suite vous appartient</span>
          <h2 className="font-serif text-4xl sm:text-6xl text-cream font-medium leading-[1.1] tracking-tight mb-6 reveal reveal-delay-1">
            Commencez
            <br /><span className="italic">la dégustation.</span>
          </h2>
          <p className="text-anthracite-400 font-light mb-14 reveal reveal-delay-2">Gratuit. Privé. Vos données restent chez vous.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onEnter}
                    className="reveal reveal-delay-3 min-h-[52px] inline-flex items-center gap-3 px-12 rounded-full font-semibold text-anthracite-950 text-base shadow-gold-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}>
              <Wine size={19} />
              C'est parti
            </button>
            <button onClick={onCeSoir}
                    className="reveal reveal-delay-4 min-h-[52px] inline-flex items-center gap-2.5 px-8 rounded-full font-medium text-sm text-cream border border-white/20 bg-white/[0.04] hover:bg-white/10 active:scale-[0.98] transition-all duration-500 cursor-pointer">
              <Utensils size={15} />
              Ce soir, je bois quoi ?
            </button>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer className="py-12 px-6 border-t border-white/[0.06] text-center" style={{ background: '#0C0A09' }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)', boxShadow: '0 0 0 1px rgba(201,168,76,0.25)' }}>
            <Wine size={14} className="text-gold-400" />
          </div>
          <span className="font-serif text-cream text-lg">Œno</span>
        </div>
        <p className="text-anthracite-500 text-xs font-light tracking-wide">Le vin, enfin simple. L'abus d'alcool est dangereux pour la santé.</p>
      </footer>

      {/* Lecteur de capsule « 1 minute pour comprendre » */}
      {capsuleActive && <CapsulePlayer capsule={capsuleActive} onClose={() => setCapsuleActive(null)} />}
    </div>
  )
}
