import { useState, useMemo } from 'react'
import { Coins } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import WineVisuel from './WineVisuel'
import { FicheVin } from './BibliothequeView'

// ═══════════════════════════════════════════════════════════════════════════
// PetitsPrix — bandeau réutilisable « 3 à 10 € la bouteille » : les vins
// accessibles et intéressants de la bibliothèque, en carrousel horizontal.
// Affiché partout où l'on parle prix (millésimes, carte, envies…).
// Chaque carte ouvre la fiche complète (ajout cave/envies inclus).
// ═══════════════════════════════════════════════════════════════════════════

export const petitsPrix = (region = null, max = 12) => WINE_DB
  .filter(w => w.prixMoyen >= 3 && w.prixMoyen <= 10)
  .filter(w => !region || region === 'Toutes' || w.region === region)
  .sort((a, b) => a.prixMoyen - b.prixMoyen)
  .slice(0, max)

export default function PetitsPrix({
  region = null,
  max = 12,
  title = 'Petits prix, grandes découvertes',
  subtitle = 'De 3 à 10 € la bouteille — accessibles et vraiment intéressants à déguster.',
  detail = null,          // (wine) => string, ligne d'info optionnelle par vin
  onAddWine = null,       // câblé → la fiche propose l'ajout à la cave
  className = '',
}) {
  const [fiche, setFiche] = useState(null)
  const wines = useMemo(() => petitsPrix(region, max), [region, max])
  if (!wines.length) return null

  return (
    <div className={`mb-6 ${className}`}>
      <p className="text-[10px] text-anthracite-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
        <Coins size={11} className="text-gold-500" />
        {title}
      </p>
      <p className="text-xs text-anthracite-500 mb-3">{subtitle}</p>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1" role="list">
        {wines.map(w => (
          <button
            key={w.id}
            role="listitem"
            onClick={() => setFiche(w)}
            title={`Ouvrir la fiche ${w.appellation}`}
            className="flex-shrink-0 card p-4 min-w-[190px] max-w-[220px] text-left group hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <WineVisuel type={w.type} size={15} />
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-700">
                ~ {w.prixMoyen} €
              </span>
            </div>
            <div className="font-wine-name text-2xl text-anthracite-900 leading-tight">{w.appellation}</div>
            <div className="text-[11px] text-anthracite-500 mt-0.5">{w.region} · {w.typeLabel}</div>
            <div className="text-[11px] text-anthracite-600 italic mt-1.5 line-clamp-2">« {w.enUneMot} »</div>
            {detail && (
              <div className="text-[10px] text-anthracite-400 mt-1.5">{detail(w)}</div>
            )}
          </button>
        ))}
      </div>

      {fiche && (
        <FicheVin
          wine={fiche}
          onClose={() => setFiche(null)}
          onAddToCave={onAddWine ? (w, m) => {
            onAddWine({
              id: `${w.id}-${m}-${Date.now()}`,
              name: w.appellation,
              domain: '',
              appellation: w.appellation,
              region: w.region,
              type: w.type,
              cepages: w.cepages,
              vintage: m,
              quantity: 1,
              drinkFrom: w.drinkFrom,
              drinkUntil: w.drinkUntil,
              serviceTemp: w.serviceTemp,
              carafage: w.carafage,
              estimatedValue: w.prixMoyen,
              foodPairings: w.accords,
              notes: `${w.enUneMot} — petit prix repéré dans Œno`,
            })
          } : undefined}
        />
      )}
    </div>
  )
}
