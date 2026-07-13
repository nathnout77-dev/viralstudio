import { MapPin } from 'lucide-react'
import { REGIONS_LIST } from '../data/wineDatabase'
import { setRegionsPref } from '../lib/suggestions'

// ═══════════════════════════════════════════════════════════════════════════
// Chips de régions préférées — réservé aux connaisseurs (niveau expert).
// Multi-sélection, persistée dans localStorage ('oeno-regions-pref'),
// partagée entre tous les flux de suggestion.
// ═══════════════════════════════════════════════════════════════════════════

export default function RegionsPrefFilter({ selected, onChange }) {
  const toggle = (region) => {
    const next = selected.includes(region)
      ? selected.filter(r => r !== region)
      : [...selected, region]
    setRegionsPref(next)
    onChange(next)
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-anthracite-500 uppercase tracking-wider mb-2">
        <MapPin size={11} className="text-wine-700" />
        Vos régions préférées
        {selected.length > 0 && (
          <button
            onClick={() => { setRegionsPref([]); onChange([]) }}
            className="ml-auto normal-case tracking-normal font-semibold text-wine-700 hover:text-wine-800 cursor-pointer"
          >
            Tout effacer
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {REGIONS_LIST.map(r => {
          const active = selected.includes(r)
          return (
            <button
              key={r}
              onClick={() => toggle(r)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                active
                  ? 'bg-wine-800 border-wine-800 text-cream shadow-sm'
                  : 'bg-white border-anthracite-200 text-anthracite-600 hover:border-wine-300'
              }`}
              aria-pressed={active}
            >
              {r}
            </button>
          )
        })}
      </div>
      {selected.length === 0 && (
        <p className="text-[10px] text-anthracite-400 mt-1.5">
          Sélectionnez une ou plusieurs régions pour restreindre les suggestions — sinon, toute la France.
        </p>
      )}
    </div>
  )
}
