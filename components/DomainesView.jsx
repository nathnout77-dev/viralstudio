import { useState, useMemo } from 'react'
import { MapPin, Search, X, ChevronDown, ExternalLink, Sparkles, Wine } from 'lucide-react'
import { WINE_DB, WINE_DB_DOMAINES, REGIONS_LIST } from '../data/wineDatabase'
import { FicheVin } from './BibliothequeView'

// ── Card domaine ────────────────────────────────────────────────────────────
function DomaineCard({ domaine, onOpenWine, index }) {
  const firstWine = domaine.wines[0]
  return (
    <div
      className="card p-4 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 30, 400)}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="font-wine-name text-2xl text-anthracite-900 truncate">{domaine.name}</div>
          <div className="text-[11px] text-anthracite-400 mt-0.5 flex items-center gap-1">
            <MapPin size={10} />
            {domaine.regions.join(', ')}
          </div>
        </div>
        {domaine.confidentiel && (
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-700">
            <Sparkles size={9} /> Petit domaine
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {domaine.appellations.map(a => (
          <span key={a} className="text-[11px] bg-anthracite-50 border border-anthracite-200 text-anthracite-600 px-2 py-0.5 rounded-full">
            {a}
          </span>
        ))}
      </div>

      {domaine.histoire && (
        <p className="text-xs text-anthracite-500 italic leading-relaxed mb-3">{domaine.histoire}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => onOpenWine(firstWine)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-cream cursor-pointer hover:brightness-110 transition-all"
          style={{ background: firstWine.color }}
        >
          <Wine size={12} />
          Voir la fiche{domaine.wines.length > 1 ? ` (${domaine.wines.length} vins)` : ''}
        </button>
        {domaine.url && (
          <a
            href={domaine.url}
            target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
            title={`Visiter le site de ${domaine.name}`}
          >
            <ExternalLink size={11} />
            Site
          </a>
        )}
      </div>
    </div>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────
export default function DomainesView({ onAddWine }) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('all')
  const [onlyConfidentiel, setOnlyConfidentiel] = useState(false)
  const [selectedWine, setSelectedWine] = useState(null)
  const [added, setAdded] = useState(new Set())

  const filtered = useMemo(() => WINE_DB_DOMAINES.filter(d => {
    if (region !== 'all' && !d.regions.includes(region)) return false
    if (onlyConfidentiel && !d.confidentiel) return false
    if (search) {
      const q = search.toLowerCase()
      const hit = d.name.toLowerCase().includes(q)
        || d.appellations.some(a => a.toLowerCase().includes(q))
        || d.regions.some(r => r.toLowerCase().includes(q))
      if (!hit) return false
    }
    return true
  }), [search, region, onlyConfidentiel])

  const openWine = (ref) => {
    const full = WINE_DB.find(w => w.id === ref.id)
    if (full) setSelectedWine(full)
  }

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
      notes: `${wine.enUneMot} — Arômes : ${wine.aromes}`,
    })
    setAdded(prev => new Set([...prev, `${wine.id}-${millesime}`]))
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <MapPin size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">Les producteurs</span>
          <h2 className="section-title">Où trouver nos vins</h2>
          <p className="section-sub">{WINE_DB_DOMAINES.length} domaines et châteaux — cherchez, filtrez, trouvez le vôtre</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite-400" />
        <input
          className="w-full pl-11 pr-4 py-3 bg-carte border border-anthracite-200 rounded-2xl text-sm placeholder-anthracite-400 focus:outline-none focus:ring-2 focus:ring-gold-600/40 focus:border-gold-500 transition-all"
          placeholder="Cherchez un domaine, une appellation, une région…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-anthracite-400 hover:text-anthracite-700 cursor-pointer">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap mb-6 items-center">
        <div className="relative">
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="pl-3 pr-8 py-2 bg-carte border border-anthracite-200 rounded-xl text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none font-medium"
          >
            <option value="all">Toutes régions</option>
            {REGIONS_LIST.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
        </div>
        <button
          onClick={() => setOnlyConfidentiel(v => !v)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            onlyConfidentiel ? 'bg-gold-500/15 text-gold-700 border-gold-500/40' : 'bg-carte text-anthracite-600 border-anthracite-200 hover:border-gold-400'
          }`}
        >
          <Sparkles size={12} />
          Petits domaines uniquement
        </button>
        <span className="text-xs text-anthracite-400 self-center ml-auto font-medium">
          {filtered.length} domaine{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3" role="img" aria-hidden="true">🔍</div>
          <p className="text-anthracite-500 text-sm">Aucun domaine ne correspond — élargissez vos filtres.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d, i) => (
            <DomaineCard key={d.name} domaine={d} index={i} onOpenWine={openWine} />
          ))}
        </div>
      )}

      {/* Fiche */}
      {selectedWine && (
        <FicheVin
          wine={selectedWine}
          onClose={() => setSelectedWine(null)}
          onAddToCave={handleAdd}
          added={added}
        />
      )}
    </div>
  )
}
