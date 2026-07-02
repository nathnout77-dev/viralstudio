import { useState } from 'react'
import { GlassWater, BookOpen, GraduationCap } from 'lucide-react'
import AccordsView from './AccordsView'
import MillesimesView from './MillesimesView'
import { GLOSSAIRE_LIST } from '../data/glossaire'

const SUBTABS = [
  { id: 'accords',    label: 'Accords mets-vins', Icon: GlassWater },
  { id: 'millesimes', label: 'Millésimes',        Icon: BookOpen },
  { id: 'lexique',    label: 'Lexique décodé',    Icon: GraduationCap },
]

function LexiqueView() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <GraduationCap size={18} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">Le vin, décodé</h2>
          <p className="section-sub">Tous les mots compliqués, expliqués comme à un ami</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GLOSSAIRE_LIST.map((entry, i) => (
          <div key={entry.terme} className="card p-4 animate-fade-in-up" style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, animationFillMode: 'both' }}>
            <div className="font-serif text-base font-bold text-wine-800 mb-1.5">{entry.terme}</div>
            <p className="text-xs text-anthracite-600 leading-relaxed">{entry.simple}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GuideView() {
  const [sub, setSub] = useState('accords')

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {SUBTABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setSub(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              sub === id
                ? 'bg-wine-800 text-cream shadow-wine'
                : 'bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {sub === 'accords'    && <AccordsView />}
      {sub === 'millesimes' && <MillesimesView />}
      {sub === 'lexique'    && <LexiqueView />}
    </div>
  )
}
