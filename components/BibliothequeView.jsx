import { useState, useMemo } from 'react'
import { Library, Search, X, Plus, Check, Thermometer, Clock, Wine, MapPin, ChevronDown, ExternalLink } from 'lucide-react'
import { WINE_DB, REGIONS_LIST, DIFFICULTE_CONFIG, MILLESIMES_DB } from '../data/wineDatabase'
import JaugesGout from './JaugesGout'
import Terme from './Tooltip'

const TYPE_FILTERS = [
  { value: 'all',       label: 'Tous' },
  { value: 'red',       label: '🍷 Rouge' },
  { value: 'white',     label: '🥂 Blanc' },
  { value: 'rosé',      label: '🌸 Rosé' },
  { value: 'sweet',     label: '🍯 Doux' },
  { value: 'sparkling', label: '🍾 Bulles' },
]

const BUDGET_FILTERS = [
  { value: 'all',   label: 'Tout budget' },
  { value: '0-10',  label: 'Moins de 10 €' },
  { value: '10-20', label: '10 – 20 €' },
  { value: '20-50', label: '20 – 50 €' },
  { value: '50+',   label: '50 € et +' },
]

const DIFF_FILTERS = [
  { value: 'all',      label: 'Tous niveaux' },
  { value: 'facile',   label: '😊 Facile à aimer' },
  { value: 'explorer', label: '🧭 Pour explorer' },
  { value: 'pointu',   label: '🎓 Pointu' },
]

// ── Fiche détaillée ────────────────────────────────────────────────────────────
function FicheVin({ wine, onClose, onAddToCave, added }) {
  const [millesime, setMillesime] = useState(wine.bonsMilsimes[wine.bonsMilsimes.length - 1])
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  const isAdded = added.has(`${wine.id}-${millesime}`)

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(30,25,20,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <div
        className="bg-cream w-full sm:max-w-xl rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[92vh] flex flex-col animate-slide-up shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header coloré */}
        <div className="p-6 pb-5 flex-shrink-0 relative overflow-hidden" style={{ background: wine.color }}>
          <div className="absolute -top-8 -right-8 text-[120px] opacity-15 select-none leading-none">{wine.emoji}</div>
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-3xl mb-1.5">{wine.emoji}</div>
                <h3 className="font-wine-name text-5xl text-cream">{wine.appellation}</h3>
                <p className="text-cream/70 text-sm mt-1 flex items-center gap-1.5">
                  <MapPin size={11} /> {wine.region} · {wine.typeLabel}
                </p>
              </div>
              <button onClick={onClose}
                      className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-cream transition-all cursor-pointer"
                      aria-label="Fermer">
                <X size={14} />
              </button>
            </div>
            <p className="text-cream/90 font-medium italic mt-3 text-sm">« {wine.enUneMot} »</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Pour qui + difficulté */}
          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: diff.bg, color: diff.color }}
            >
              {diff.emoji} {diff.label}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-anthracite-100 text-anthracite-700">
              ~ {wine.prixMoyen} € la bouteille
            </span>
          </div>
          <p className="text-sm text-anthracite-600 leading-relaxed -mt-1">
            <span className="font-semibold text-anthracite-800">Pour qui ? </span>{wine.pourQui}
          </p>

          {/* Jauges */}
          <div className="card p-4">
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-3">Profil de goût</div>
            <JaugesGout jauges={wine.jauges} />
          </div>

          {/* Arômes + cépages */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Ça sent quoi ?</div>
            <p className="text-sm text-anthracite-700">{wine.aromes}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {wine.cepages.map(c => (
                <span key={c} className="text-xs bg-white border border-anthracite-200 text-anthracite-600 px-2.5 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Service */}
          <div className="grid grid-cols-3 gap-2">
            <div className="card p-3 text-center">
              <Thermometer size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.temperature}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5">Service</div>
            </div>
            <div className="card p-3 text-center">
              <Clock size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.carafage || 'Non'}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5"><Terme id="carafage">Carafage</Terme></div>
            </div>
            <div className="card p-3 text-center">
              <Wine size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.garde}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5"><Terme id="garde">Garde</Terme></div>
            </div>
          </div>

          {/* À table */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">À table avec…</div>
            <div className="flex flex-wrap gap-1.5">
              {wine.accords.map(a => (
                <span key={a} className="text-xs bg-gold-500/10 border border-gold-500/30 text-anthracite-700 px-2.5 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Domaines */}
          {wine.domaines.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Noms à retenir chez le caviste</div>
              <div className="space-y-1.5">
                {wine.domaines.map(d => (
                  <div key={d.name} className="flex items-start gap-2">
                    <Wine size={10} className="mt-1 flex-shrink-0" style={{ color: wine.color }} />
                    <div className="min-w-0 flex-1">
                      <span className="font-wine-name text-xl text-anthracite-800">{d.name}</span>
                      <span className="text-[11px] text-anthracite-400"> — {d.note}</span>
                    </div>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${wine.appellation} site officiel`)}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
                      title={`Visiter le site de ${d.name}`}
                    >
                      <ExternalLink size={9} />
                      Site
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Le mot du caviste */}
          <div className="rounded-2xl p-4" style={{ background: '#f0e9dd' }}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">💬 Le mot du caviste</div>
            <p className="text-sm text-anthracite-700 leading-relaxed italic">{wine.description}</p>
          </div>
        </div>

        {/* Footer : ajout cave */}
        <div className="p-5 border-t border-anthracite-100 bg-cream flex-shrink-0">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto hide-scrollbar">
            <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 flex-shrink-0">
              <Terme id="millesime">Millésime</Terme> :
            </span>
            {wine.bonsMilsimes.map(y => (
              <button
                key={y}
                onClick={() => setMillesime(y)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex-shrink-0 ${
                  millesime === y ? 'text-cream border-transparent' : 'bg-white border-anthracite-200 text-anthracite-600'
                }`}
                style={millesime === y ? { background: wine.color } : {}}
              >
                {y}
              </button>
            ))}
          </div>
          <button
            onClick={() => onAddToCave(wine, millesime)}
            disabled={isAdded}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-cream shadow-wine hover:brightness-110 active:scale-[0.99]'
            }`}
            style={!isAdded ? { background: wine.color } : {}}
          >
            {isAdded ? <><Check size={15} /> Ajouté à ma cave</> : <><Plus size={15} /> Ajouter à ma cave ({millesime})</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Card compacte ──────────────────────────────────────────────────────────────
function VinCard({ wine, onClick, index }) {
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  return (
    <button
      onClick={onClick}
      className="card p-4 text-left w-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ background: `${wine.color}18` }}
        >
          {wine.emoji}
        </div>
        <div className="min-w-0">
          <div className="font-wine-name text-2xl text-anthracite-900 truncate">{wine.appellation}</div>
          <div className="text-[11px] text-anthracite-400 mt-0.5">{wine.region} · ~{wine.prixMoyen} €</div>
        </div>
      </div>
      <p className="text-xs text-anthracite-500 italic mb-3 line-clamp-1">« {wine.enUneMot} »</p>
      <JaugesGout jauges={wine.jauges} compact animate={false} />
      <div className="flex items-center justify-between mt-3">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: diff.bg, color: diff.color }}
        >
          {diff.emoji} {diff.label}
        </span>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: wine.color }} title={wine.typeLabel} />
      </div>
    </button>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────────
export default function BibliothequeView({ onAddWine, mode }) {
  const [search, setSearch]   = useState('')
  const [type, setType]       = useState('all')
  const [budget, setBudget]   = useState('all')
  // Mode Débutant : vins « faciles à aimer » proposés en premier (filtre modifiable)
  const [diff, setDiff]       = useState(mode === 'debutant' ? 'facile' : 'all')
  const [region, setRegion]   = useState('all')
  const [selected, setSelected] = useState(null)
  const [added, setAdded]     = useState(new Set())

  const filtered = useMemo(() => WINE_DB.filter(w => {
    if (search) {
      const q = search.toLowerCase()
      const hit = w.appellation.toLowerCase().includes(q)
        || w.region.toLowerCase().includes(q)
        || w.cepages.some(c => c.toLowerCase().includes(q))
        || w.aromes.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (type !== 'all' && w.type !== type) return false
    if (diff !== 'all' && w.difficulte !== diff) return false
    if (region !== 'all' && w.region !== region) return false
    if (budget !== 'all') {
      const p = w.prixMoyen
      if (budget === '0-10'  && p > 10) return false
      if (budget === '10-20' && (p <= 10 || p > 20)) return false
      if (budget === '20-50' && (p <= 20 || p > 50)) return false
      if (budget === '50+'   && p <= 50) return false
    }
    return true
  }), [search, type, budget, diff, region])

  const handleAdd = (wine, millesime) => {
    onAddWine?.({
      id: `${wine.id}-${millesime}-${Date.now()}`,
      name: wine.appellation,
      domain: '',
      appellation: wine.appellation,
      region: wine.region,
      type: wine.type,
      cepages: wine.cepages,
      vintage: millesime,
      quantity: 1,
      drinkFrom: wine.drinkFrom,
      drinkUntil: wine.drinkUntil,
      serviceTemp: wine.serviceTemp,
      carafage: wine.carafage,
      estimatedValue: wine.prixMoyen,
      foodPairings: wine.accords,
      notes: `${wine.emoji} ${wine.enUneMot} — Arômes : ${wine.aromes}`,
    })
    setAdded(prev => new Set([...prev, `${wine.id}-${millesime}`]))
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <Library size={18} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">Bibliothèque des Vins</h2>
          <p className="section-sub">{WINE_DB.length} appellations décodées pour vous — cliquez pour tout comprendre</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite-400" />
        <input
          className="w-full pl-11 pr-4 py-3 bg-white border border-anthracite-200 rounded-2xl text-sm placeholder-anthracite-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all"
          placeholder="Cherchez un vin, une région, un cépage, un arôme…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-anthracite-400 hover:text-anthracite-700 cursor-pointer">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filtres type */}
      <div className="flex gap-2 flex-wrap mb-3">
        {TYPE_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setType(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              type === f.value ? 'bg-wine-800 text-cream border-wine-800' : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Filtres budget + difficulté + région */}
      <div className="flex gap-2 flex-wrap mb-6">
        {[
          { value: budget, set: setBudget, options: BUDGET_FILTERS },
          { value: diff,   set: setDiff,   options: DIFF_FILTERS },
          { value: region, set: setRegion, options: [{ value: 'all', label: 'Toutes régions' }, ...REGIONS_LIST.map(r => ({ value: r, label: r }))] },
        ].map(({ value, set, options }, i) => (
          <div key={i} className="relative">
            <select
              value={value}
              onChange={e => set(e.target.value)}
              className="pl-3 pr-8 py-2 bg-white border border-anthracite-200 rounded-xl text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer appearance-none font-medium"
            >
              {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
          </div>
        ))}
        <span className="text-xs text-anthracite-400 self-center ml-auto font-medium">
          {filtered.length} vin{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-anthracite-500 text-sm">Aucun vin ne correspond — élargissez vos filtres.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((w, i) => (
            <VinCard key={w.id} wine={w} index={i} onClick={() => setSelected(w)} />
          ))}
        </div>
      )}

      {/* Fiche */}
      {selected && (
        <FicheVin
          wine={selected}
          onClose={() => setSelected(null)}
          onAddToCave={handleAdd}
          added={added}
        />
      )}
    </div>
  )
}
