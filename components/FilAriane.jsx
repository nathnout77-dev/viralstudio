import { ChevronLeft, Home } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Fil d'Ariane — bandeau permanent au-dessus de chaque parcours : retour à
// l'accueil en un geste + rappel du parcours en cours. C'est la colonne
// vertébrale du mode guidé : on sait toujours où l'on est et comment revenir.
// ─────────────────────────────────────────────────────────────────────────────
export default function FilAriane({ titre, sousTitre, onAccueil }) {
  return (
    <div className="flex items-center gap-3 mb-6 lg:mb-8 animate-fade-in">
      <button
        onClick={onAccueil}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-anthracite-600 bg-carte border border-anthracite-200 hover:border-gold-500/60 hover:text-anthracite-900 active:scale-[0.97] transition-all duration-300 cursor-pointer flex-shrink-0"
        aria-label="Revenir à l'accueil"
      >
        <ChevronLeft size={13} className="-ml-0.5" />
        <Home size={12} className="text-gold-600" />
        <span className="hidden sm:inline">Accueil</span>
      </button>
      <div className="min-w-0">
        <div className="font-serif text-base lg:text-lg font-bold text-anthracite-900 truncate leading-tight">{titre}</div>
        {sousTitre && <div className="text-[11px] text-anthracite-400 truncate">{sousTitre}</div>}
      </div>
    </div>
  )
}
