import { useEffect, useRef, useState } from 'react'
import { Wine, MapPin, Sparkles, GlassWater, BookOpen, ChevronDown, Star, Users, Award, Globe } from 'lucide-react'

// ── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const animate = (time) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [start, target, duration])
  return count
}

// ── Floating particle ────────────────────────────────────────────────────────
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={style}
    />
  )
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color, delay, onTabClick, tab }) {
  return (
    <button
      onClick={() => onTabClick(tab)}
      className="reveal card-glass text-left p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-gold cursor-pointer group w-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: color }}
      >
        <Icon size={22} className="text-cream" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-cream mb-2 group-hover:text-gradient-gold transition-colors">
        {title}
      </h3>
      <p className="text-sm text-anthracite-300 leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-gold-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Explorer</span>
        <ChevronDown size={12} className="-rotate-90" />
      </div>
    </button>
  )
}

// ── Stat box ─────────────────────────────────────────────────────────────────
function StatBox({ value, suffix, label, started, duration }) {
  const count = useCountUp(value, duration || 1800, started)
  return (
    <div className="text-center reveal">
      <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-gold">
        {count.toLocaleString('fr-FR')}{suffix}
      </div>
      <div className="text-sm text-anthracite-400 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  )
}

// ── Wine glass SVG animated ──────────────────────────────────────────────────
function WineGlassSVG({ fill = '#72102a', className = '' }) {
  return (
    <svg viewBox="0 0 80 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8 L60 8 L52 52 Q40 70 40 80 L40 108 M28 108 L52 108" stroke="rgba(201,168,76,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="40" cy="52" rx="18" ry="4" fill={fill} opacity="0.6"/>
      <path d="M22 10 Q22 48 40 56 Q58 48 58 10" fill={fill} opacity="0.25"/>
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LandingPage({ onEnter, onTabChange }) {
  const heroRef     = useRef(null)
  const statsRef    = useRef(null)
  const featuresRef = useRef(null)
  const [statsVisible, setStatsVisible]   = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
            if (entry.target === statsRef.current) setStatsVisible(true)
          }
        })
      },
      { threshold: 0.15 }
    )
    ;[heroRef, statsRef, featuresRef].forEach(r => r.current && observer.observe(r.current))
    return () => observer.disconnect()
  }, [])

  // Parallax
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const particles = [
    { width: 6,  height: 6,  background: '#c9a84c', top: '15%', left: '8%',  animation: 'float 8s ease-in-out infinite' },
    { width: 4,  height: 4,  background: '#72102a', top: '25%', right: '12%', animation: 'float 6s ease-in-out infinite 1s' },
    { width: 8,  height: 8,  background: '#c9a84c', top: '60%', left: '5%',  animation: 'float 10s ease-in-out infinite 2s' },
    { width: 3,  height: 3,  background: '#d4a847', top: '70%', right: '8%', animation: 'float 7s ease-in-out infinite 0.5s' },
    { width: 5,  height: 5,  background: '#72102a', top: '40%', left: '90%', animation: 'float 9s ease-in-out infinite 3s' },
    { width: 4,  height: 4,  background: '#c9a84c', top: '80%', left: '20%', animation: 'float 8s ease-in-out infinite 1.5s' },
    { width: 6,  height: 6,  background: '#b81d3c', top: '10%', right: '25%', animation: 'float 11s ease-in-out infinite 4s' },
  ]

  const features = [
    {
      icon: Wine,
      tab: 'cave',
      title: 'Ma Cave Privée',
      desc: 'Gérez votre collection avec précision : millésimes, apogées, valeur estimée. Votre cave numérique, toujours à portée de main.',
      color: 'linear-gradient(135deg, #72102a 0%, #9a1633 100%)',
      delay: 0,
    },
    {
      icon: MapPin,
      tab: 'carte',
      title: 'Carte des Vignobles',
      desc: 'Explorez les grandes appellations sur une carte interactive. Cliquez sur une région pour découvrir ses terroirs et ajouter des vins.',
      color: 'linear-gradient(135deg, #1e2426 0%, #3d4547 100%)',
      delay: 100,
    },
    {
      icon: Sparkles,
      tab: 'sommelier',
      title: 'Sommelier Virtuel',
      desc: 'Un guide personnalisé selon votre occasion, budget et profil aromatique. L\'expertise d\'un sommelier, accessible à tous.',
      color: 'linear-gradient(135deg, #b8962a 0%, #c9a84c 100%)',
      delay: 200,
    },
    {
      icon: GlassWater,
      tab: 'accords',
      title: 'Accords Mets-Vins',
      desc: 'Trouvez le vin parfait pour chaque plat. Notre base d\'accords couvre toutes les cuisines et tous les styles de vins.',
      color: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      delay: 300,
    },
    {
      icon: BookOpen,
      tab: 'millésimes',
      title: 'Guide des Millésimes',
      desc: 'Consultez la base œnologique complète : qualités, fenêtres de dégustation, recommandations par région et appellation.',
      color: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      delay: 400,
    },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0d1011' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-noise"
        style={{ background: 'linear-gradient(160deg, #0d1011 0%, #111516 40%, #1a0a10 70%, #0d1011 100%)' }}
      >
        {/* Radial glow behind hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
               style={{
                 background: 'radial-gradient(circle, rgba(114,16,42,0.25) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)',
                 transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`,
               }} />
        </div>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={{ ...p }} />
        ))}

        {/* Floating wine glasses — decorative */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-16 opacity-10 animate-float-slow">
            <WineGlassSVG className="w-16 h-24" />
          </div>
          <div className="absolute bottom-24 left-12 opacity-10 animate-float-delayed">
            <WineGlassSVG fill="#c9a84c" className="w-12 h-18" />
          </div>
          <div className="absolute top-1/3 right-6 opacity-5 animate-float">
            <WineGlassSVG className="w-24 h-36" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/25 bg-gold-500/8 mb-8 animate-fade-in-down">
            <Star size={12} className="text-gold-400" fill="currentColor" />
            <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">L\'Œnologie pour tous</span>
            <Star size={12} className="text-gold-400" fill="currentColor" />
          </div>

          {/* Title */}
          <h1
            className="font-serif font-bold mb-6 leading-[1.05] tracking-tight animate-fade-in-up"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              animationDelay: '0.15s',
            }}
          >
            <span className="text-cream">L'Art du</span>
            <br />
            <span className="shimmer-text">Vin Accessible</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-anthracite-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Gérez votre cave, explorez les vignobles du monde, consultez votre sommelier virtuel.
            L'expertise œnologique distillée en une expérience élégante et intuitive.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.45s' }}
          >
            <button
              onClick={onEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-anthracite-950 shadow-gold-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold cursor-pointer overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
            >
              <Wine size={18} />
              <span>Explorer ma Cave</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => onTabChange('carte')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-cream border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <MapPin size={18} />
              <span>Carte des Vignobles</span>
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-50 animate-bounce-subtle">
            <span className="text-xs text-anthracite-400 uppercase tracking-widest">Découvrir</span>
            <ChevronDown size={16} className="text-gold-500" />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, transparent, #0d1011)' }} />
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 px-6 sm:px-8" style={{ background: '#0d1011' }}>
        <div className="max-w-5xl mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
            <StatBox value={15} suffix="+"   label="Régions viticoles"    started={statsVisible} duration={1200} />
            <StatBox value={65} suffix=""    label="Appellations"          started={statsVisible} duration={1600} />
            <StatBox value={500} suffix="+"  label="Millésimes analysés"   started={statsVisible} duration={2000} />
            <StatBox value={100} suffix="%"  label="Gratuit & privé"       started={statsVisible} duration={1000} />
          </div>

          <div className="divider-gold my-16" />

          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Notre philosophie</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-6 leading-tight">
                L'œnologie n'est pas
                <br />
                <span className="text-gradient-gold">réservée aux experts</span>
              </h2>
              <p className="text-anthracite-300 leading-relaxed mb-4">
                Le monde du vin peut sembler intimidant — millésimes, appellations, accords, températures…
                Nous avons conçu L'Œnothèque pour démocratiser cette connaissance et la rendre accessible,
                intuitive et surtout <em className="text-cream">plaisante</em>.
              </p>
              <p className="text-anthracite-300 leading-relaxed">
                Que vous soyez amateur curieux ou collectionneur averti, notre plateforme s'adapte à vous.
                Gérez votre cave, explorez les terroirs, et laissez notre sommelier virtuel vous guider
                vers le vin parfait pour chaque moment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: 'Expertise', text: 'Base œnologique de référence' },
                { icon: Users, label: 'Simplicité', text: 'Interface pensée pour tous' },
                { icon: Globe, label: 'Complète',   text: '15 régions, 65 appellations' },
                { icon: Star,  label: 'Élégante',   text: 'Design inspiré des grandes maisons' },
              ].map(({ icon: Icon, label, text }, i) => (
                <div key={label} className="reveal card-glass-warm p-4" style={{ transitionDelay: `${i * 100}ms` }}>
                  <Icon size={18} className="text-gold-400 mb-2" />
                  <div className="text-cream font-semibold text-sm mb-1">{label}</div>
                  <div className="text-anthracite-400 text-xs leading-relaxed">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        ref={featuresRef}
        className="py-24 px-6 sm:px-8"
        style={{ background: 'linear-gradient(180deg, #0d1011 0%, #111516 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3 reveal">Fonctionnalités</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream reveal reveal-delay-1">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-anthracite-400 mt-3 max-w-xl mx-auto reveal reveal-delay-2">
              Cinq outils pensés pour vous accompagner de la cave au verre.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.slice(0, 3).map(f => (
              <FeatureCard key={f.tab} {...f} onTabClick={onTabChange} />
            ))}
            <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {features.slice(3).map(f => (
                <FeatureCard key={f.tab} {...f} onTabClick={onTabChange} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section
        className="py-24 px-6 sm:px-8 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0a10 0%, #111516 50%, #0d1011 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
               style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(114,16,42,0.15) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-6xl text-gold-500/30 font-serif mb-4">&ldquo;</div>
          <blockquote className="font-serif text-2xl sm:text-3xl text-cream font-light leading-relaxed mb-6">
            Le vin est la plus saine et la plus hygiénique des boissons.
          </blockquote>
          <cite className="text-anthracite-400 text-sm not-italic">— Louis Pasteur</cite>

          <div className="divider-gold my-12" />

          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-anthracite-950 text-base shadow-gold-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c9a84c 50%, #b8962a 100%)' }}
          >
            <Wine size={20} />
            Commencer l'exploration
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-white/5 text-center" style={{ background: '#0d1011' }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #72102a, #9a1633)' }}>
            <Wine size={14} className="text-gold-400" />
          </div>
          <span className="font-serif text-cream font-semibold">L'Œnothèque</span>
        </div>
        <p className="text-anthracite-500 text-xs">
          Votre cave numérique personnelle — données stockées localement, vie privée garantie.
        </p>
      </footer>
    </div>
  )
}
