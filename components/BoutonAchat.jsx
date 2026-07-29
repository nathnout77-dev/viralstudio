import { useState, useCallback } from 'react'
import { ShoppingCart, ExternalLink, ChevronDown } from 'lucide-react'
import { liensAchat } from '../lib/achatLiens'

// ═══════════════════════════════════════════════════════════════════════════
// « Où l'acheter » — deux clics, montre en main.
// Clic 1 : on ouvre la liste. Clic 2 : on est chez le marchand, recherche
// déjà remplie. Le producteur passe devant quand on connaît son site.
// ═══════════════════════════════════════════════════════════════════════════

export default function BoutonAchat({ wine, millesime = null, compact = false }) {
  const [ouvert, setOuvert] = useState(false)
  const liens = liensAchat(wine, millesime)

  const basculer = useCallback(() => setOuvert(o => !o), [])

  if (!liens.length) return null

  return (
    <div className={compact ? '' : 'mt-4'}>
      <button
        onClick={basculer}
        aria-expanded={ouvert}
        className={`w-full flex items-center justify-center gap-2 rounded-full text-cream font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-wine ${
          compact ? 'text-[11px] py-2.5 px-4' : 'text-sm py-3.5 px-5'
        }`}
        style={{ background: 'linear-gradient(135deg, #72102a 0%, #5c0d22 100%)' }}
      >
        <ShoppingCart size={compact ? 13 : 16} />
        Où l'acheter
        <ChevronDown size={compact ? 12 : 14} className={`transition-transform duration-300 ${ouvert ? 'rotate-180' : ''}`} />
      </button>

      {ouvert && (
        <div className="mt-2 flex flex-col gap-1.5 animate-fade-in">
          {liens.map(l => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`flex items-center gap-3 rounded-2xl border bg-carte px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-px cursor-pointer ${
                l.producteur
                  ? 'border-gold-500/45 hover:border-gold-500/80'
                  : 'border-anthracite-900/[0.08] hover:border-gold-500/40'
              }`}
            >
              <span className="text-base leading-none flex-shrink-0" role="img" aria-hidden="true">{l.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold text-anthracite-900 truncate">{l.nom}</span>
                <span className="block text-[10px] text-anthracite-400 truncate">{l.detail}</span>
              </span>
              <ExternalLink size={13} className="text-anthracite-300 flex-shrink-0" />
            </a>
          ))}
          <p className="text-[10px] text-anthracite-400 leading-relaxed px-1 mt-0.5">
            Œno ne vend pas de vin et ne touche aucune commission : ces liens ouvrent
            une recherche chez le marchand, à vous de comparer.
          </p>
        </div>
      )}
    </div>
  )
}
