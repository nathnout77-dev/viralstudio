import { Wine, Library, MapPin, Sparkles, BookOpen, Plus, Home, Utensils } from 'lucide-react'

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

export default function Navbar({ tab, setTab, total, mode, onProfil, onAdd, onLanding, onCeSoir }) {
  const badge = MODE_BADGE[mode]
  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-anthracite-950/95 backdrop-blur-xl border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <button onClick={onLanding} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                 style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)', boxShadow: '0 0 0 1px rgba(201,168,76,0.2)' }}>
              <Wine size={18} className="text-gold-400" />
            </div>
            <div className="text-left">
              <div className="font-serif text-base font-bold text-cream tracking-wide">Œno</div>
              <div className="text-[9px] text-gold-500/70 uppercase tracking-[0.15em]">{total} bouteille{total > 1 ? 's' : ''} en cave</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  tab === id
                    ? 'bg-wine-800 text-cream shadow-wine'
                    : 'text-anthracite-300 hover:text-cream hover:bg-anthracite-800'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Badge mode (cliquable → refaire le profil) */}
            {badge && (
              <button
                onClick={onProfil}
                title="Changer de mode / refaire mon profil"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gold-400 border border-gold-500/25 bg-gold-500/10 hover:bg-gold-500/20 transition-all cursor-pointer"
              >
                <span>{badge.emoji}</span>
                Mode {badge.label}
              </button>
            )}

            {/* Ce soir ? */}
            <button
              onClick={onCeSoir}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-cream cursor-pointer transition-all hover:brightness-110 animate-pulse-gold"
              style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
            >
              <Utensils size={13} />
              Ce soir ?
            </button>
            <button
              onClick={onCeSoir}
              className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl text-cream cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              aria-label="Ce soir, je bois quoi ?"
            >
              <Utensils size={15} />
            </button>

            {/* Add */}
            <button onClick={onAdd} className="btn-gold text-xs px-4 py-2 hidden sm:inline-flex">
              <Plus size={14} />
              Ajouter
            </button>
            <button onClick={onAdd} className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl btn-gold" aria-label="Ajouter un vin">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-anthracite-950/97 backdrop-blur-xl border-t border-gold-500/10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="navigation"
      >
        <div className="flex h-[62px]">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-150 relative"
              aria-label={label}
              aria-current={tab === id ? 'page' : undefined}
            >
              <Icon
                size={19}
                className={`transition-all duration-200 ${tab === id ? 'text-gold-500 scale-110' : 'text-anthracite-400'}`}
              />
              <span className={`text-[8px] uppercase tracking-[0.08em] font-bold ${tab === id ? 'text-gold-500' : 'text-anthracite-500'}`}>
                {label}
              </span>
              {tab === id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gold-500 animate-fade-in" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
