import { Wine, GlassWater, MapPin, Sparkles, BookOpen, Plus } from 'lucide-react'

const TABS = [
  { id: 'cave',      label: 'Ma Cave',    Icon: Wine },
  { id: 'carte',     label: 'Vignobles',  Icon: MapPin },
  { id: 'sommelier', label: 'Sommelier',  Icon: Sparkles },
  { id: 'accords',   label: 'Accords',    Icon: GlassWater },
  { id: 'millésimes',label: 'Millésimes', Icon: BookOpen },
]

export default function Navbar({ tab, setTab, total, onAdd }) {
  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-anthracite-950/95 backdrop-blur-xl border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #9a1633 0%, #72102a 100%)', boxShadow: '0 0 0 1px rgba(201,168,76,0.2)' }}>
              <Wine size={18} className="text-gold-400" />
            </div>
            <div>
              <div className="font-serif text-base font-semibold text-cream tracking-wide">Œnothèque</div>
              <div className="text-[9px] text-gold-500/70 uppercase tracking-[0.15em]">{total} bouteilles en cave</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
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

          {/* Add button */}
          <button onClick={onAdd} className="btn-gold text-xs px-4 py-2 hidden sm:inline-flex">
            <Plus size={14} />
            Ajouter
          </button>
          <button onClick={onAdd} className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg btn-gold">
            <Plus size={16} />
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-anthracite-950/97 backdrop-blur-xl border-t border-gold-500/10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="navigation"
      >
        <div className="flex h-[60px]">
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
                className={tab === id ? 'text-gold-500' : 'text-anthracite-400'}
              />
              <span className={`text-[8px] uppercase tracking-[0.08em] font-medium ${tab === id ? 'text-gold-500' : 'text-anthracite-500'}`}>
                {label}
              </span>
              {tab === id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-full bg-gold-500" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
