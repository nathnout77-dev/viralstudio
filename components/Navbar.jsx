import { Wine, Sparkles, Plus, Utensils, ScanLine, UserCircle2, Sprout, GraduationCap, Home, Search, LayoutGrid, Library, Map } from 'lucide-react'
import LogoOeno from './LogoOeno'
import useCtaBreathe from '../lib/useCtaBreathe'

// ═══════════════════════════════════════════════════════════════════════════
// Navbar mobile/tablette (< lg) — mode guidé : la bottom nav ne liste plus
// 5 fonctions mais 4 repères : Accueil (hub), Trouver, Ma cave, Menu
// (grille d'accès à tout Œno). L'assistant reste la bulle flottante.
// ═══════════════════════════════════════════════════════════════════════════

// Nav condensée pour tablettes (le header est masqué ≥ lg, la sidebar prend le relais)
const TABLET_NAV = [
  { id: 'hub',       label: 'Accueil',   Icon: Home },
  { id: 'trouver',   label: 'Trouver',   Icon: Search },
  { id: 'cave',      label: 'Cave',      Icon: Wine },
  { id: 'vins',      label: 'Vins',      Icon: Library },
  { id: 'explorer',  label: 'Explorer',  Icon: Map },
  { id: 'apprendre', label: 'Apprendre', Icon: GraduationCap },
]

const BOTTOM_NAV = [
  { id: 'hub',     label: 'Accueil', Icon: Home },
  { id: 'trouver', label: 'Trouver', Icon: Search },
  { id: 'cave',    label: 'Ma cave', Icon: Wine },
]

const MODE_BADGE = {
  debutant: { Icon: Sprout,        label: 'Débutant' },
  amateur:  { Icon: Wine,          label: 'Amateur' },
  expert:   { Icon: GraduationCap, label: 'Expert' },
}

export default function Navbar({ view, setView, total, mode, onProfil, onAdd, onLanding, onCeSoir, onScan, onCompte, onMenu }) {
  const badge = MODE_BADGE[mode]
  const { breatheClass, settle } = useCtaBreathe() // halo du CTA « Ce soir ? »
  const ceSoir = () => { settle(); onCeSoir?.() }
  return (
    <>
      {/* Top header — verre translucide crème, hairline */}
      <header className="lg:hidden sticky top-0 z-50 backdrop-blur-xl border-b border-anthracite-900/[0.08]"
              style={{ background: 'rgba(250,250,249,0.82)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <button onClick={onLanding} className="flex items-center gap-3 cursor-pointer group">
            <LogoOeno size={36} className="transition-transform duration-500 group-hover:scale-105" />
            <div className="text-left">
              <div className="font-serif text-lg text-anthracite-950 tracking-wide leading-none">Œno</div>
              <div className="text-[9px] text-gold-600 uppercase tracking-[0.2em] mt-1">{total} bouteille{total > 1 ? 's' : ''} en cave</div>
            </div>
          </button>

          {/* Nav tablette (md → lg) */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {TABLET_NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`relative px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 cursor-pointer ${
                  view === id ? 'text-anthracite-950' : 'text-anthracite-500 hover:text-anthracite-900'
                }`}
              >
                {label}
                <span className={`absolute bottom-0.5 left-3 right-3 h-px transition-all duration-500 ${
                  view === id ? 'bg-gold-600 opacity-100' : 'opacity-0'
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
                <badge.Icon size={12} className="text-gold-600" />
                {badge.label}
              </button>
            )}

            {/* Compte & synchronisation (tablette) */}
            <button
              onClick={onCompte}
              title="Mon compte — sauvegarde & synchronisation"
              aria-label="Mon compte — sauvegarde et synchronisation"
              className="hidden md:inline-flex w-11 h-11 items-center justify-center rounded-full text-anthracite-500 border border-anthracite-900/15 hover:border-gold-500/70 hover:text-anthracite-900 active:scale-[0.95] transition-all duration-300 cursor-pointer"
            >
              <UserCircle2 size={18} strokeWidth={1.6} />
            </button>

            {/* Scanner une étiquette */}
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
              onClick={ceSoir}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-cream active:scale-[0.98] cursor-pointer transition-all duration-300 hover:brightness-110 ${breatheClass}`}
              style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
            >
              <Utensils size={12} />
              Ce soir ?
            </button>
            <button
              onClick={ceSoir}
              className={`sm:hidden w-11 h-11 flex items-center justify-center rounded-full text-cream cursor-pointer active:scale-[0.95] transition-transform duration-300 ${breatheClass}`}
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

      {/* Mobile bottom nav — 4 repères du mode guidé */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl border-t border-anthracite-900/[0.08]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', background: 'rgba(250,250,249,0.88)' }}
        role="navigation"
      >
        <div className="flex h-[64px]">
          {BOTTOM_NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
              aria-label={label}
              aria-current={view === id ? 'page' : undefined}
            >
              <Icon
                size={19}
                strokeWidth={view === id ? 2 : 1.5}
                className={`transition-all duration-300 ${view === id ? 'text-anthracite-950' : 'text-anthracite-400'}`}
              />
              <span className={`text-[10px] uppercase tracking-[0.1em] font-medium ${view === id ? 'text-anthracite-950' : 'text-anthracite-400'}`}>
                {label}
              </span>
              {view === id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gold-600 animate-fade-in" />
              )}
            </button>
          ))}

          {/* Menu — grille d'accès à tout Œno */}
          <button
            onClick={onMenu}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
            aria-label="Ouvrir le menu Tout Œno"
          >
            <LayoutGrid size={19} strokeWidth={1.5} className="text-gold-600" />
            <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-gold-600">
              Menu
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
