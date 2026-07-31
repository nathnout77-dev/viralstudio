import { useEffect } from 'react'
import {
  X, Home, Search, Wine, Library, Map, GraduationCap, Sparkles,
  GlassWater, BookOpen, ScanLine, Utensils, UserCircle2, Plus, Layers, Users, SlidersHorizontal } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// MenuGrille — « Tout Œno ». Le mode guidé est l'entrée principale, mais les
// habitués gardent un accès direct à chaque écran depuis cette grille,
// ouverte via le bouton Menu (mobile) ou « Tout Œno » (sidebar desktop).
// ─────────────────────────────────────────────────────────────────────────────

const PARCOURS = [
  { id: 'hub',       label: 'Accueil',              Icon: Home },
  { id: 'decouvrir', label: 'Découvrir',            Icon: Layers },
  { id: 'trouver',   label: 'Trouver un vin',       Icon: Search },
  { id: 'cave',      label: 'Ma cave',              Icon: Wine },
  { id: 'social',    label: 'Mes amis',             Icon: Users },
  { id: 'vins',      label: 'Bibliothèque',         Icon: Library },
  { id: 'explorer',  label: 'Explorer les régions', Icon: Map },
  { id: 'apprendre', label: 'Apprendre',            Icon: GraduationCap },
]

const CLASSIQUES = [
  { id: 'sommelier', label: 'Sommelier',       Icon: Sparkles,   sous: 'Goût-o-mètre · Budget · Dîner' },
  { id: 'guide',     label: 'Guide complet',   Icon: BookOpen,   sous: 'Accords · Millésimes · Actualité' },
  { id: 'carte',     label: 'Carte seule',     Icon: GlassWater, sous: 'Vignobles & routes des vins' },
]

export default function MenuGrille({ onGo, onScan, onAssistant, onCeSoir, onCompte, onAdd, onRecherche, onReglages, onClose }) {
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])

  const go = (fn, ...args) => { onClose(); fn?.(...args) }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Menu Œno">
      <div className="absolute inset-0 bg-nuit/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[88dvh] overflow-y-auto bg-fond rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <div className="font-serif text-xl font-bold text-anthracite-900">Tout Œno</div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-100 transition-colors cursor-pointer"
            aria-label="Fermer le menu"
          >
            <X size={17} />
          </button>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2.5">Parcours guidés</div>
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {PARCOURS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => go(onGo, id)}
              className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer"
            >
              <Icon size={18} className="text-wine-texte" strokeWidth={1.7} />
              <span className="text-[11px] font-semibold text-anthracite-800 text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2.5">Accès direct</div>
        <div className="space-y-2 mb-6">
          {CLASSIQUES.map(({ id, label, Icon, sous }) => (
            <button
              key={id}
              onClick={() => go(onGo, id)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.99] transition-all cursor-pointer text-left"
            >
              <Icon size={16} className="text-gold-700 flex-shrink-0" strokeWidth={1.7} />
              <div className="min-w-0">
                <div className="text-xs font-bold text-anthracite-900">{label}</div>
                <div className="text-[10px] text-anthracite-400 truncate">{sous}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2.5">Actions</div>
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => go(onRecherche)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <Search size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Recherche</span>
          </button>
          <button onClick={() => go(onScan)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <ScanLine size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Scanner</span>
          </button>
          <button onClick={() => go(onCeSoir)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <Utensils size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Ce soir ?</span>
          </button>
          <button onClick={() => go(onAssistant)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <Sparkles size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Assistant Œno</span>
          </button>
          <button onClick={() => go(onCompte)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <UserCircle2 size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Compte</span>
          </button>
          <button onClick={() => go(onReglages)} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.97] transition-all cursor-pointer">
            <SlidersHorizontal size={15} className="text-gold-700" /><span className="text-xs font-semibold text-anthracite-800">Réglages</span>
          </button>
        </div>

        <button onClick={() => go(onAdd)} className="btn-gold w-full text-xs px-4 py-3 mt-4 justify-center">
          <Plus size={14} /> Ajouter un vin à ma cave
        </button>
      </div>
    </div>
  )
}
