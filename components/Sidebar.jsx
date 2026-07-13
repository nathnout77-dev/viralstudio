import { Wine, Library, MapPin, Sparkles, BookOpen, Plus, Utensils, ScanLine, UserCircle2, MessageCircleHeart } from 'lucide-react'
import RollingNumber from './RollingNumber'

// ═══════════════════════════════════════════════════════════════════════════
// Sidebar desktop (≥ lg) — signature luxe : noir profond, textes crème,
// filet or à gauche sur l'onglet actif. Remplace la topbar en desktop.
// Rendue en `hidden lg:flex`, z-30 : toujours sous les modals (z-[60/70]).
// ═══════════════════════════════════════════════════════════════════════════

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

function NavItem({ active, onClick, Icon, label, accent = false }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative w-full flex items-center gap-3.5 px-6 py-3 text-left cursor-pointer transition-all duration-300 group ${
        active ? 'text-cream' : 'text-stone-400 hover:text-cream'
      }`}
    >
      {/* Filet or à gauche — état actif */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-gold-500 transition-all duration-500 ${
          active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
      />
      <Icon
        size={17}
        strokeWidth={active ? 1.9 : 1.4}
        className={`transition-colors duration-300 ${active ? 'text-gold-400' : accent ? 'text-gold-600 group-hover:text-gold-400' : 'text-stone-500 group-hover:text-gold-400'}`}
      />
      <span className={`text-[13px] tracking-[0.08em] uppercase font-medium ${active ? 'font-semibold' : ''}`}>
        {label}
      </span>
    </button>
  )
}

export default function Sidebar({ tab, setTab, total, mode, onProfil, onAdd, onLanding, onCeSoir, onScan, onCompte, onAssistant }) {
  const badge = MODE_BADGE[mode]
  return (
    <aside
      className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-white/[0.06]"
      style={{ background: '#0C0A09' }}
      aria-label="Navigation principale"
    >
      {/* Wordmark */}
      <button onClick={onLanding} className="flex items-center gap-3 px-6 pt-8 pb-7 cursor-pointer group text-left">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)', boxShadow: '0 0 0 1px rgba(201,168,76,0.3)' }}
        >
          <Wine size={17} className="text-gold-400" />
        </div>
        <div>
          <div className="font-serif text-2xl text-cream tracking-wide leading-none">Œno</div>
          <div className="text-[9px] text-gold-500 uppercase tracking-[0.22em] mt-1.5">
            <RollingNumber value={total} /> bouteille{total > 1 ? 's' : ''} en cave
          </div>
        </div>
      </button>

      <div className="mx-6 h-px" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.35), transparent)' }} />

      {/* Navigation */}
      <nav className="flex flex-col gap-1 py-5" role="navigation">
        {TABS.map(({ id, label, Icon }) => (
          <NavItem key={id} active={tab === id} onClick={() => setTab(id)} Icon={Icon} label={label} />
        ))}
      </nav>

      <div className="mx-6 h-px bg-white/[0.06]" />

      {/* Actions */}
      <div className="flex flex-col gap-1 py-5">
        <div className="px-6 pb-2 text-[9px] uppercase tracking-[0.25em] text-stone-600 font-semibold">Actions</div>
        <NavItem accent onClick={onScan}      Icon={ScanLine}          label="Scanner" />
        <NavItem accent onClick={onAssistant} Icon={MessageCircleHeart} label="Assistant" />
        <NavItem accent onClick={onCeSoir}    Icon={Utensils}          label="Ce soir ?" />
        <NavItem accent onClick={onCompte}    Icon={UserCircle2}       label="Compte" />
        <div className="px-6 pt-3">
          <button onClick={onAdd} className="btn-gold w-full text-xs px-4 py-2.5">
            <Plus size={14} /> Ajouter un vin
          </button>
        </div>
      </div>

      {/* Section basse */}
      <div className="mt-auto px-6 pb-6 pt-4 border-t border-white/[0.06]">
        {badge && (
          <button
            onClick={onProfil}
            title="Changer de mode / refaire mon profil"
            className="w-full flex items-center gap-2 px-3 py-2 mb-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400 border border-white/10 hover:border-gold-500/60 hover:text-cream transition-all duration-300 cursor-pointer"
          >
            <span className="normal-case">{badge.emoji}</span>
            {badge.label}
          </button>
        )}
        <button onClick={onLanding} className="block text-[10px] text-stone-600 hover:text-gold-500 uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer">
          Découvrir Œno
        </button>
        <div className="text-[9px] text-stone-700 uppercase tracking-[0.18em] mt-2">Œno · v2</div>
      </div>
    </aside>
  )
}
