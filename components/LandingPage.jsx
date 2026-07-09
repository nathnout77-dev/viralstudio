import { useEffect, useRef, useState } from 'react'
import { Wine, Library, MapPin, Sparkles, BookOpen, ChevronDown, Utensils, ArrowRight } from 'lucide-react'
import { WINE_DB, MILLESIMES_DB, CONFIDENTIEL_DOMAINES } from '../data/wineDatabase'
import WineGlassAnim, { fillLevelFromJauges } from './WineGlassAnim'

// ── Compteur animé ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let t0 = null
    const tick = (t) => {
      if (!t0) t0 = t
      const p = Math.min((t - t0) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, target, duration])
  return count
}

// ── Verre qui se remplit au scroll ────────────────────────────────────────────
function VerreAnime({ fillLevel }) {
  // fillLevel : 0 → 1
  const h = 34 * fillLevel
  return (
    <svg viewBox="0 0 100 150" className="w-full h-full" fill="none">
      <defs>
        <clipPath id="bowl">
          <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" />
        </clipPath>
        <linearGradient id="wineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a63d4a" />
          <stop offset="100%" stopColor="#5c0d22" />
        </linearGradient>
      </defs>
      {/* Vin (clippé dans le bol) */}
      <g clipPath="url(#bowl)">
        <rect x="20" y={62 - h} width="60" height={h + 5} fill="url(#wineGrad)" style={{ transition: 'all 0.3s ease-out' }} />
        {/* Reflet */}
        <ellipse cx="50" cy={62 - h} rx="24" ry="2.5" fill="#c9727e" opacity={fillLevel > 0.05 ? 0.6 : 0} style={{ transition: 'all 0.3s ease-out' }} />
      </g>
      {/* Verre */}
      <path d="M25 10 L75 10 Q74 55 50 62 Q26 55 25 10 Z" stroke="rgba(201,168,76,0.7)" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="50" y1="62" x2="50" y2="120" stroke="rgba(201,168,76,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="126" x2="68" y2="126" stroke="rgba(201,168,76,0.7)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Landing ───────────────────────────────────────────────────────────────────
export default function LandingPage({ onEnter, onTabChange, onCeSoir }) {
  const [scrollP, setScrollP]   = useState(0)
  const [statsOn, setStatsOn]   = useState(false)
  const statsRef  = useRef(null)
  const revealRefs = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
      setScrollP(Math.min(1, window.scrollY / (max * 0.4)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const nVins      = useCountUp(WINE_DB.length, 1400, statsOn)
  const nRegions   = useCountUp(new Set(WINE_DB.map(w => w.region)).size, 1700, statsOn)
  const nFaciles   = useCountUp(WINE_DB.filter(w => w.difficulte === 'facile').length, 2000, statsOn)
  const nDomaines  = useCountUp(WINE_DB.reduce((s, w) => s + w.domaines.length, 0), 1800, statsOn)
  const nMillesimes = useCountUp(MILLESIMES_DB.length, 2100, statsOn)
  const nCepages   = useCountUp(new Set(WINE_DB.flatMap(w => w.cepages)).size, 1600, statsOn)

  // ── Domaine du moment ── rotation déterministe par jour du mois, stable dans la journée.
  const domaineDuMoment = CONFIDENTIEL_DOMAINES.length
    ? CONFIDENTIEL_DOMAINES[new Date().getDate() % CONFIDENTIEL_DOMAINES.length]
    : null
  const domaineWine = domaineDuMoment
    ? WINE_DB.find(w => w.id === domaineDuMoment.wines[0].id)
    : null

  const features = [
    { icon: Utensils, title: '« Ce soir, je bois quoi ? »', desc: 'Dites-nous juste ce que vous mangez. 3 vins, 10 secondes, zéro jargon.', action: onCeSoir, cta: 'Essayer', color: '#8c2f39' },
    { icon: Sparkles, title: 'Le Goût-o-mètre', desc: 'Café ou thé ? Confiture ou citron ? Répondez sur VOS goûts, on trouve VOS vins.', action: () => onTabChange('sommelier'), cta: 'Faire le test', color: '#b8722c' },
    { icon: Library, title: `${WINE_DB.length} vins décodés`, desc: 'Chaque appellation expliquée simplement : jauges de goût, prix moyen, "pour qui ?".', action: () => onTabChange('vins'), cta: 'Explorer', color: '#4d7c50' },
    { icon: MapPin, title: 'La carte des vignobles', desc: 'Voyagez dans les régions, cliquez, découvrez, ajoutez à votre cave.', action: () => onTabChange('carte'), cta: 'Voyager', color: '#3d5a80' },
    { icon: Wine, title: 'Votre cave, simplifiée', desc: 'Suivez vos bouteilles et sachez toujours laquelle ouvrir ce soir.', action: onEnter, cta: 'Ma cave', color: '#5c0d22' },
    { icon: BookOpen, title: 'Le lexique décodé', desc: 'Tanins, millésime, carafage… tous les mots compliqués expliqués comme à un ami.', action: () => onTabChange('guide'), cta: 'Apprendre', color: '#6b4a3a' },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0C0A09' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-noise"
               style={{ background: 'radial-gradient(ellipse 90% 70% at 70% 15%, #3a0616 0%, #1C1917 45%, #0C0A09 80%)' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 w-full grid md:grid-cols-2 gap-12 items-center py-24">

          {/* Texte */}
          <div>
            <span className="eyebrow-dark mb-10 animate-fade-in-down">Le vin, enfin simple</span>

            <h1 className="font-serif font-medium leading-[1.05] tracking-tight animate-fade-in-up"
                style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', animationDelay: '0.15s' }}>
              <span className="text-cream">Vous n'y connaissez</span>
              <br />
              <span className="text-cream">rien en vin ?</span>
              <br />
              <span className="shimmer-text italic">Parfait.</span>
            </h1>

            <p className="text-anthracite-300 text-lg font-light max-w-md leading-relaxed mt-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              Œno traduit le monde du vin en langage humain. Pas de jargon, pas de snobisme —
              juste les bonnes bouteilles pour vos vrais moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
              <button
                onClick={onCeSoir}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-anthracite-950 shadow-gold-lg transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
              >
                <Utensils size={17} />
                Ce soir, je bois quoi ?
                <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <button
                onClick={onEnter}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-cream border border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
              >
                <Wine size={16} />
                Entrer dans l'app
              </button>
            </div>
          </div>

          {/* Verre animé */}
          <div className="hidden md:flex items-center justify-center relative">
            <div className="absolute w-72 h-72 rounded-full"
                 style={{ background: 'radial-gradient(circle, rgba(140,47,57,0.3) 0%, transparent 70%)' }} />
            <div className="w-64 h-96 animate-float">
              <VerreAnime fillLevel={0.25 + scrollP * 0.75} />
            </div>
            <div className="absolute bottom-8 text-center">
              <span className="text-[10px] text-gold-500/60 uppercase tracking-[0.25em]">Scrollez pour remplir le verre</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce-subtle">
          <ChevronDown size={16} className="text-gold-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, transparent, #FAFAF9)' }} />
      </section>

      {/* ── MANIFESTO + STATS — section crème ── */}
      <section data-reveal-zone className="py-28 sm:py-36 px-6 sm:px-10" style={{ background: '#FAFAF9' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="eyebrow mb-6 reveal">Notre conviction</span>
          <h2 className="font-serif text-4xl sm:text-6xl font-medium text-anthracite-950 leading-[1.1] tracking-tight reveal reveal-delay-1">
            L'œnologie n'a jamais été
            <br />
            <span className="italic text-wine-900">une affaire d'experts.</span>
          </h2>
          <p className="text-anthracite-600 text-lg font-light leading-relaxed mt-10 max-w-2xl mx-auto reveal reveal-delay-2">
            C'est une affaire de plaisir. Le reste — les appellations, les millésimes, les tanins —
            on vous l'explique au fur et à mesure, simplement, quand vous en avez besoin.
          </p>

          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-14 mt-24 reveal reveal-delay-3">
            {[
              [nVins,       'Vins décodés'],
              [nRegions,    'Régions viticoles'],
              [nCepages,    'Cépages expliqués'],
              [nMillesimes, 'Millésimes analysés'],
              [nDomaines,   'Domaines recommandés'],
              [nFaciles,    '« Faciles à aimer »'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="font-serif text-5xl sm:text-6xl font-light text-anthracite-950 tabular-nums">{n}</div>
                <div className="text-[11px] text-gold-600 mt-3 uppercase tracking-[0.2em] font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAINE DU MOMENT ── */}
      {domaineDuMoment && domaineWine && (
        <section data-reveal-zone className="section-dark py-28 sm:py-36 px-6 sm:px-10 relative overflow-hidden"
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
              className="reveal reveal-delay-3 mt-12 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm text-cream border border-gold-500/40 hover:bg-gold-500/10 hover:border-gold-500/70 active:scale-[0.98] transition-all duration-500 cursor-pointer"
            >
              <Wine size={14} className="text-gold-400" />
              Découvrir sa fiche
              <ArrowRight size={13} />
            </button>
          </div>
        </section>
      )}

      {/* ── FEATURES — section crème ── */}
      <section data-reveal-zone className="py-28 sm:py-36 px-6 sm:px-10" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="eyebrow mb-6 reveal">L'expérience Œno</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-anthracite-950 tracking-tight reveal reveal-delay-1">
              Six façons de trouver <span className="italic text-wine-900">votre</span> vin
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, action, cta, color }, i) => (
              <button
                key={title}
                onClick={action}
                className="reveal card text-left p-8 hover:-translate-y-2 active:scale-[0.98] cursor-pointer group w-full"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                     style={{ background: color }}>
                  <Icon size={19} className="text-cream" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-anthracite-950 mb-3">{title}</h3>
                <p className="text-sm text-anthracite-600 font-light leading-relaxed mb-6">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-gold-600 text-[11px] font-semibold uppercase tracking-[0.15em] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {cta} <ArrowRight size={11} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL — section sombre ── */}
      <section data-reveal-zone className="section-dark py-32 sm:py-44 px-6 text-center relative overflow-hidden"
               style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, #3a0616 0%, #0C0A09 70%)' }}>
        <div className="relative max-w-2xl mx-auto">
          <span className="eyebrow-dark mb-8 reveal">Œno</span>
          <h2 className="font-serif text-4xl sm:text-6xl text-cream font-medium leading-[1.1] tracking-tight mb-6 reveal reveal-delay-1">
            La meilleure bouteille,
            <br /><span className="italic">c'est celle qu'on ose ouvrir.</span>
          </h2>
          <p className="text-anthracite-400 font-light mb-14 reveal reveal-delay-2">Gratuit. Privé. Vos données restent chez vous.</p>
          <button
            onClick={onEnter}
            className="reveal reveal-delay-3 inline-flex items-center gap-3 px-12 py-4 rounded-full font-semibold text-anthracite-950 text-base shadow-gold-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
          >
            <Wine size={19} />
            C'est parti
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
    </div>
  )
}
