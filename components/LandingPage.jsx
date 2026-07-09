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
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#12100e' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-noise"
               style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 20%, #2a1218 0%, #12100e 55%)' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 w-full grid md:grid-cols-2 gap-10 items-center py-20">

          {/* Texte */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/25 bg-gold-500/8 mb-8 animate-fade-in-down">
              <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">Le vin, enfin simple</span>
            </div>

            <h1 className="font-serif font-bold leading-[1.03] tracking-tight animate-fade-in-up"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', animationDelay: '0.1s' }}>
              <span className="text-cream">Vous n'y connaissez</span>
              <br />
              <span className="text-cream">rien en vin ?</span>
              <br />
              <span className="shimmer-text">Parfait.</span>
            </h1>

            <p className="text-anthracite-300 text-lg max-w-md leading-relaxed mt-6 mb-10 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              Œno traduit le monde du vin en langage humain. Pas de jargon, pas de snobisme —
              juste les bonnes bouteilles pour vos vrais moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onCeSoir}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-cream shadow-wine-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #a63d4a 0%, #5c0d22 100%)' }}
              >
                <Utensils size={18} />
                Ce soir, je bois quoi ?
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onEnter}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-semibold text-cream border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <Wine size={17} />
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
              <span className="text-[10px] text-gold-500/60 uppercase tracking-[0.2em]">Scrollez pour remplir le verre</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce-subtle">
          <ChevronDown size={16} className="text-gold-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, transparent, #12100e)' }} />
      </section>

      {/* ── MANIFESTO + STATS ── */}
      <section data-reveal-zone className="py-24 px-6 sm:px-10" style={{ background: '#12100e' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 reveal">Notre conviction</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream leading-tight reveal reveal-delay-1">
            L'œnologie n'a jamais été
            <br />
            <span className="text-gradient-gold">une affaire d'experts.</span>
          </h2>
          <p className="text-anthracite-300 text-lg leading-relaxed mt-8 max-w-2xl mx-auto reveal reveal-delay-2">
            C'est une affaire de plaisir. Le reste — les appellations, les millésimes, les tanins —
            on vous l'explique au fur et à mesure, simplement, quand vous en avez besoin.
          </p>

          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 mt-16 reveal reveal-delay-3">
            {[
              [nVins,       'Vins décodés'],
              [nRegions,    'Régions viticoles'],
              [nCepages,    'Cépages expliqués'],
              [nMillesimes, 'Millésimes analysés'],
              [nDomaines,   'Domaines recommandés'],
              [nFaciles,    '« Faciles à aimer »'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-gold">{n}</div>
                <div className="text-xs text-anthracite-400 mt-2 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAINE DU MOMENT ── */}
      {domaineDuMoment && domaineWine && (
        <section data-reveal-zone className="py-20 px-6 sm:px-10" style={{ background: '#17130f' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 reveal text-center">Aujourd'hui, on met en lumière</p>
            <div className="reveal reveal-delay-1 card-glass-warm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <WineGlassAnim color={domaineWine.color} fillLevel={fillLevelFromJauges(domaineWine.jauges)} size={64} />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-400 mb-2">
                  <Sparkles size={10} /> Petit domaine
                </div>
                <h3 className="font-wine-name text-4xl text-cream">{domaineDuMoment.name}</h3>
                <p className="text-anthracite-400 text-xs mt-1">{domaineDuMoment.appellations.join(', ')} · {domaineDuMoment.regions.join(', ')}</p>
                <p className="text-anthracite-300 text-sm leading-relaxed mt-3 italic">« {domaineDuMoment.histoire} »</p>
                <button
                  onClick={() => onTabChange('vins', domaineDuMoment.name)}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-anthracite-950 cursor-pointer hover:-translate-y-0.5 transition-all"
                  style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
                >
                  <Wine size={14} />
                  Découvrir sa fiche
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      <section data-reveal-zone className="py-24 px-6 sm:px-10"
               style={{ background: 'linear-gradient(180deg, #12100e 0%, #17130f 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream reveal">
              Six façons de trouver <span className="text-gradient-gold">votre</span> vin
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, action, cta, color }, i) => (
              <button
                key={title}
                onClick={action}
                className="reveal card-glass text-left p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer group w-full"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                     style={{ background: color }}>
                  <Icon size={20} className="text-cream" />
                </div>
                <h3 className="font-serif text-lg font-bold text-cream mb-2">{title}</h3>
                <p className="text-sm text-anthracite-300 leading-relaxed mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                  {cta} <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section data-reveal-zone className="py-28 px-6 text-center relative overflow-hidden"
               style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, #2a1218 0%, #12100e 70%)' }}>
        <div className="relative max-w-2xl mx-auto">
          <div className="text-5xl mb-6 reveal">🍷</div>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-bold leading-tight mb-4 reveal reveal-delay-1">
            La meilleure bouteille,
            <br />c'est celle qu'on ose ouvrir.
          </h2>
          <p className="text-anthracite-400 mb-10 reveal reveal-delay-2">Gratuit. Privé. Vos données restent chez vous.</p>
          <button
            onClick={onEnter}
            className="reveal reveal-delay-3 inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-anthracite-950 text-base shadow-gold-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
          >
            <Wine size={20} />
            C'est parti
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-white/5 text-center" style={{ background: '#12100e' }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}>
            <Wine size={14} className="text-gold-400" />
          </div>
          <span className="font-serif text-cream font-bold">Œno</span>
        </div>
        <p className="text-anthracite-500 text-xs">Le vin, enfin simple. L'abus d'alcool est dangereux pour la santé.</p>
      </footer>
    </div>
  )
}
