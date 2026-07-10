import { Wine, Library, MapPin, Sparkles, BookOpen, Plus, Utensils, ScanLine } from 'lucide-react'

const TABS = [
  { id: 'cave',      label: 'Ma Cave',   Icon: Wine },
  { id: 'vins',      label: 'Vins',      Icon: Library },
  { id: 'carte',     label: 'Carte',     Icon: MapPin },
  { id: 'sommelier', label: 'Sommelier', Icon: Sparkles },
  { id: 'guide',     label: 'Guide',     Icon: BookOpen },
]

const MODE_BADGE = {
  debutant: { emoji: '🌱', label: 'Débutant' },
  amateur:  { emoji: '🍷', label: 'Amateur' },
  expert:   { emoji: '🎓', label: 'Expert' },
}

export default function Navbar({ tab, setTab, total, mode, onProfil, onAdd, onLanding, onCeSoir, onScan }) {
  const badge = MODE_BADGE[mode]
  return (
    <>
      {/* Top header — verre translucide crème, hairline */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-anthracite-900/[0.08]"
              style={{ background: 'rgba(250,250,249,0.82)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <button onClick={onLanding} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                 style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)', boxShadow: '0 0 0 1px rgba(201,168,76,0.25)' }}>
              <Wine size={17} className="text-gold-400" />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg text-anthracite-950 tracking-wide leading-none">Œno</div>
              <div className="text-[9px] text-gold-600 uppercase tracking-[0.2em] mt-1">{total} bouteille{total > 1 ? 's' : ''} en cave</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2" role="navigation">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`relative px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-500 cursor-pointer ${
                  tab === id ? 'text-anthracite-950' : 'text-anthracite-500 hover:text-anthracite-900'
                }`}
              >
                {label}
                <span className={`absolute bottom-0.5 left-4 right-4 h-px transition-all duration-500 ${
                  tab === id ? 'bg-gold-600 opacity-100' : 'opacity-0'
                }`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Badge mode (cliquable → refaire le profil) */}
            {badge && (
              <button
                onClick={onProfil}
                title="Changer de mode / refaire mon profil"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-anthracite-700 border border-anthracite-900/15 hover:border-anthracite-900/40 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span className="normal-case">{badge.emoji}</span>
                {badge.label}
              </button>
            )}

            {/* Scanner une étiquette (desktop) */}
            <button
              onClick={onScan}
              title="Scanner une étiquette de vin"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-anthracite-700 border border-anthracite-900/15 hover:border-gold-500/70 hover:text-anthracite-950 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <ScanLine size={12} className="text-gold-600" />
              Scanner
            </button>

            {/* Ce soir ? */}
            <button
              onClick={onCeSoir}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-cream active:scale-[0.98] cursor-pointer transition-all duration-300 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
            >
              <Utensils size={12} />
              Ce soir ?
            </button>
            <button
              onClick={onCeSoir}
              className="sm:hidden w-11 h-11 flex items-center justify-center rounded-full text-cream cursor-pointer active:scale-[0.95] transition-transform duration-300"
              style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              aria-label="Ce soir, je bois quoi ?"
            >
              <Utensils size={15} />
            </button>

            {/* Add */}
            <button onClick={onAdd} className="btn-gold text-xs px-5 py-2 hidden sm:inline-flex">
              <Plus size={14} />
              Ajouter
            </button>
            <button onClick={onAdd} className="sm:hidden w-11 h-11 flex items-center justify-center rounded-full btn-gold !px-0 !py-0" aria-label="Ajouter un vin">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav — translucide, icônes fines */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl border-t border-anthracite-900/[0.08]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', background: 'rgba(250,250,249,0.88)' }}
        role="navigation"
      >
        <div className="flex h-[64px]">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
              aria-label={label}
              aria-current={tab === id ? 'page' : undefined}
            >
              <Icon
                size={19}
                strokeWidth={tab === id ? 2 : 1.5}
                className={`transition-all duration-300 ${tab === id ? 'text-anthracite-950' : 'text-anthracite-400'}`}
              />
              <span className={`text-[10px] uppercase tracking-[0.1em] font-medium ${tab === id ? 'text-anthracite-950' : 'text-anthracite-400'}`}>
                {label}
              </span>
              {tab === id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gold-600 animate-fade-in" />
              )}
            </button>
          ))}

          {/* Scanner une étiquette (mobile) — action, pas un onglet */}
          <button
            onClick={onScan}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
            aria-label="Scanner une étiquette de vin"
          >
            <ScanLine size={19} strokeWidth={1.5} className="text-gold-600" />
            <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-gold-600">
              Scanner
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
