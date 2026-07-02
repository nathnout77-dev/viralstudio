import { useState } from 'react'
import { X, Utensils, RefreshCw, Sparkles } from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import JaugesGout from './JaugesGout'

// Mode express : "Je mange quoi ce soir ?" → 3 vins directement
const PLATS = [
  { id: 'viande_rouge', emoji: '🥩', label: 'Viande rouge',   types: ['red'],            regions: null },
  { id: 'poulet',       emoji: '🍗', label: 'Poulet / volaille', types: ['white', 'red'], regions: null },
  { id: 'poisson',      emoji: '🐟', label: 'Poisson',        types: ['white'],          regions: null },
  { id: 'pates',        emoji: '🍝', label: 'Pâtes / pizza',  types: ['red'],            regions: ['Italie', 'Languedoc', 'Beaujolais'] },
  { id: 'fromage',      emoji: '🧀', label: 'Raclette / fromage', types: ['white', 'red'], regions: ['Savoie', 'Jura', 'Loire', 'Beaujolais'] },
  { id: 'apero',        emoji: '🥜', label: 'Juste l\'apéro', types: ['white', 'rosé', 'sparkling'], regions: null },
  { id: 'sucre',        emoji: '🍰', label: 'Un dessert',     types: ['sweet'],          regions: null },
  { id: 'plateau',      emoji: '🍽️', label: 'Charcuterie',   types: ['red', 'rosé'],    regions: ['Loire', 'Beaujolais', 'Corse', 'Jura'] },
]

function pick3(plat, shuffleKey) {
  const conf = PLATS.find(p => p.id === plat)
  if (!conf) return []
  let candidates = WINE_DB.filter(w => conf.types.includes(w.type))
  if (conf.regions) {
    const regionMatch = candidates.filter(w => conf.regions.includes(w.region))
    if (regionMatch.length >= 3) candidates = regionMatch
  }
  // Prioriser les "faciles" pour un choix express, mélanger avec le shuffleKey
  const sorted = [...candidates].sort((a, b) => {
    const dOrder = { facile: 0, explorer: 1, pointu: 2 }
    const diffA = dOrder[a.difficulte] - dOrder[b.difficulte]
    if (diffA !== 0) return diffA
    return ((a.id.charCodeAt(0) + shuffleKey) % 7) - ((b.id.charCodeAt(0) + shuffleKey) % 7)
  })
  // Variété : max 1 par région si possible
  const out = []
  const regions = new Set()
  for (const w of sorted) {
    if (out.length >= 3) break
    if (!regions.has(w.region) || sorted.length < 6) {
      out.push(w)
      regions.add(w.region)
    }
  }
  for (const w of sorted) {
    if (out.length >= 3) break
    if (!out.includes(w)) out.push(w)
  }
  return out.slice(0, 3)
}

export default function CeSoirMode({ onClose, onOpenBibliotheque }) {
  const [plat, setPlat]   = useState(null)
  const [shuffle, setShuffle] = useState(0)

  const results = plat ? pick3(plat, shuffle) : []

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(30,25,20,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Ce soir, je bois quoi ?"
    >
      <div
        className="bg-cream w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[90vh] flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #5c0d22 0%, #8c2f39 100%)' }}>
          <div className="absolute -top-6 -right-4 text-[100px] opacity-10 select-none leading-none">🍽️</div>
          <div className="relative flex items-start justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold">Ce soir, je bois quoi ?</h3>
              <p className="text-cream/70 text-sm mt-1">Dites-nous ce que vous mangez → 3 vins, zéro blabla.</p>
            </div>
            <button onClick={onClose}
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
                    aria-label="Fermer">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!plat ? (
            <div className="grid grid-cols-2 gap-3">
              {PLATS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setPlat(p.id)}
                  className="card p-4 text-center hover:-translate-y-1 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <div className="text-sm font-semibold text-anthracite-800">{p.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <button onClick={() => setPlat(null)} className="text-xs text-anthracite-400 hover:text-anthracite-700 cursor-pointer flex items-center gap-1">
                  ← Changer de plat
                </button>
                <button onClick={() => setShuffle(s => s + 1)} className="text-xs text-wine-700 hover:text-wine-800 cursor-pointer flex items-center gap-1 font-semibold">
                  <RefreshCw size={11} /> D'autres idées
                </button>
              </div>

              {results.map((w, i) => {
                const diff = DIFFICULTE_CONFIG[w.difficulte]
                return (
                  <div key={w.id} className="card p-4 animate-slide-up" style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                           style={{ background: `${w.color}18` }}>
                        {w.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-serif text-sm font-bold text-anthracite-900">{w.appellation}</div>
                            <div className="text-[11px] text-anthracite-400">{w.region} · ~{w.prixMoyen} €</div>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: diff.bg, color: diff.color }}>
                            {diff.emoji}
                          </span>
                        </div>
                        <p className="text-xs text-anthracite-500 italic mt-1">« {w.enUneMot} »</p>
                        <div className="mt-2">
                          <JaugesGout jauges={w.jauges} compact animate={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <button
                onClick={() => { onClose(); onOpenBibliotheque?.() }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-cream cursor-pointer transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              >
                <Sparkles size={14} />
                Voir toutes les fiches dans la Bibliothèque
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
