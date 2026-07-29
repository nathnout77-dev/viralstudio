import { Fragment } from 'react'
import { Wine, Sparkles, Plus, Utensils, ScanLine, UserCircle2, Sprout, GraduationCap, Home, Search, LayoutGrid, Library, Map, Layers, Users } from 'lucide-react'
import AvatarOeno from './AvatarOeno'
import useCtaBreathe from '../lib/useCtaBreathe'

// ═══════════════════════════════════════════════════════════════════════════
// Navbar mobile/tablette (< lg) — mode guidé : la bottom nav ne liste plus
// 5 fonctions mais 4 repères : Accueil (hub), Trouver, Ma cave, Menu
// (grille d'accès à tout Œno). L'assistant reste la bulle flottante.
// ═══════════════════════════════════════════════════════════════════════════

// Nav condensée pour tablettes (le header est masqué ≥ lg, la sidebar prend le relais)
const TABLET_NAV = [
  { id: 'hub',       label: 'Accueil',   Icon: Home },
  { id: 'decouvrir', label: 'Découvrir', Icon: Layers },
  { id: 'trouver',   label: 'Trouver',   Icon: Search },
  { id: 'cave',      label: 'Cave',      Icon: Wine },
  { id: 'social',    label: 'Amis',      Icon: Users },
  { id: 'vins',      label: 'Vins',      Icon: Library },
  { id: 'explorer',  label: 'Explorer',  Icon: Map },
  { id: 'apprendre', label: 'Apprendre', Icon: GraduationCap },
]

const BOTTOM_NAV = [
  { id: 'decouvrir', label: 'Découvrir', emoji: '🍷' },
  { id: 'trouver',   label: 'Trouver',   emoji: '🔍' },
  { id: 'cave',      label: 'Ma cave',   emoji: '🍾' },
]

const MODE_BADGE = {
  debutant: { Icon: Sprout,        label: 'Débutant' },
  amateur:  { Icon: Wine,          label: 'Amateur' },
  expert:   { Icon: GraduationCap, label: 'Expert' },
}

export default function Navbar({ view, setView, total, mode, prenom, onProfil, onAdd, onLanding, onCeSoir, onScan, onCompte, onMenu, onRecherche, onAvatar }) {
  const badge = MODE_BADGE[mode]
  const { breatheClass, settle } = useCtaBreathe() // halo du CTA « Ce soir ? »
  const ceSoir = () => { settle(); onCeSoir?.() }
  return (
    <>
      {/* Top header — verre translucide crème, hairline */}
      <header className="lg:hidden sticky top-0 z-50 backdrop-blur-xl border-b border-anthracite-900/[0.08]"
              style={{ background: 'rgb(var(--fond) / 0.82)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Avatar du compte, à la place de l'emblème : c'est soi qu'on veut
              sous la main, pas la marque. Le texte garde l'accès à l'accueil. */}
          <div className="flex items-center gap-3">
            <AvatarOeno size={36} prenom={prenom} onClick={onAvatar} />
            <button onClick={onLanding} className="text-left cursor-pointer group">
              <div className="font-serif text-lg text-anthracite-950 tracking-wide leading-none transition-colors duration-300 group-hover:text-wine-800">Œno</div>
              <div className="text-[9px] text-gold-600 uppercase tracking-[0.2em] mt-1">{total} bouteille{total > 1 ? 's' : ''} en cave</div>
            </button>
          </div>

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
            {/* Recherche rapide — appellation, cépage → millésimes en 3 secondes */}
            <button
              onClick={onRecherche}
              title="Recherche rapide — appellation, cépage, millésimes"
              aria-label="Recherche rapide"
              className="w-11 h-11 flex items-center justify-center rounded-full text-anthracite-500 border border-anthracite-900/15 hover:border-gold-500/70 hover:text-anthracite-900 active:scale-[0.95] transition-all duration-300 cursor-pointer"
            >
              <Search size={17} strokeWidth={1.7} />
            </button>

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
            <button onClick={onAdd} data-tour="ajouter" className="sm:hidden w-11 h-11 flex items-center justify-center rounded-full btn-gold !px-0 !py-0" aria-label="Ajouter un vin">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav — 4 repères du mode guidé + Scan central proéminent */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl border-t border-anthracite-900/[0.08]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', background: 'rgb(var(--fond) / 0.88)' }}
        role="navigation"
      >
        <div className="flex h-[64px]">
          {BOTTOM_NAV.map(({ id, label, emoji }, i) => (
            <Fragment key={id}>
              <button
                onClick={() => setView(id)}
                data-tour={id}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
                aria-label={label}
                aria-current={view === id ? 'page' : undefined}
              >
                <span
                  role="img" aria-hidden="true"
                  className={`text-[21px] leading-none transition-all duration-300 ${
                    view === id ? 'scale-110' : 'opacity-55 grayscale-[0.35]'
                  }`}
                >
                  {emoji}
                </span>
                <span className={`text-[10px] uppercase tracking-[0.1em] font-medium ${view === id ? 'text-anthracite-950' : 'text-anthracite-400'}`}>
                  {label}
                </span>
                {view === id && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gold-600 animate-fade-in" />
                )}
              </button>
              {/* Scan au centre, après « Trouver » — accès direct en rayon */}
              {i === 1 && (
                <button
                  onClick={onScan}
                  data-tour="scan"
                  className="flex-1 flex flex-col items-center justify-center cursor-pointer relative -mt-4"
                  aria-label="Scanner une étiquette"
                >
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center text-cream shadow-wine ring-4 ring-fond active:scale-95 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                  >
                    <span className="text-[21px] leading-none" role="img" aria-hidden="true">📷</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-wine-800 mt-1">
                    Scan
                  </span>
                </button>
              )}
            </Fragment>
          ))}

          {/* Menu — grille d'accès à tout Œno */}
          <button
            onClick={onMenu}
            data-tour="menu"
            className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative"
            aria-label="Ouvrir le menu Tout Œno"
          >
            <span className="text-[21px] leading-none" role="img" aria-hidden="true">🧭</span>
            <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-gold-600">
              Menu
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
