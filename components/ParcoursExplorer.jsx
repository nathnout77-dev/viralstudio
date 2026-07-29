import { useState } from 'react'
import { Map, Landmark } from 'lucide-react'
import dynamic from 'next/dynamic'
import DomainesView from './DomainesView'

const InteractiveMap = dynamic(() => import('./InteractiveMap'), { ssr: false })

// ─────────────────────────────────────────────────────────────────────────────
// ParcoursExplorer — carte des vignobles, routes des vins et domaines réunis
// en un seul parcours « Explorer les régions ». La carte (qui embarque déjà
// les routes des vins avec itinéraire GPS) est l'entrée principale ; les
// domaines à visiter sont l'étape complémentaire.
// ─────────────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'carte',    label: 'Carte & routes des vins', Icon: Map },
  { id: 'domaines', label: 'Domaines à visiter',       Icon: Landmark },
]

export default function ParcoursExplorer({ onAddWine, onNoter }) {
  const [section, setSection] = useState('carte')

  return (
    <div className="animate-fade-in">
      <div className="flex gap-2 mb-6 lg:justify-center">
        {SECTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer lg:px-5 lg:py-3 ${
              section === id
                ? 'bg-wine-800 text-cream shadow-wine'
                : 'bg-carte text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {section === 'carte'    && <InteractiveMap onAddWine={onAddWine} onNoter={onNoter} />}
      {section === 'domaines' && <DomainesView onAddWine={onAddWine} />}
    </div>
  )
}
