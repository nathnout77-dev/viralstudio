import { useState, useMemo, useEffect } from 'react'
import { Library, Search, X, Plus, Check, Thermometer, Clock, Wine, MapPin, ChevronDown, ExternalLink, Sparkles, NotebookPen, ChefHat } from 'lucide-react'
import AccordInverse from './AccordInverse'
import { EnvieButton } from './Envies'
import { WINE_DB, REGIONS_LIST, DIFFICULTE_CONFIG, MILLESIMES_DB, gardeForMillesime } from '../data/wineDatabase'
import JaugesGout from './JaugesGout'
import Terme from './Tooltip'
import WineGlassAnim, { fillLevelFromJauges } from './WineGlassAnim'
import useModalBehavior from '../lib/useModal'

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
export function FicheVin({ wine, onClose, onAddToCave, added, onNoter }) {
  useModalBehavior(onClose)
  const [millesime, setMillesime] = useState(wine.bonsMilsimes[wine.bonsMilsimes.length - 1])
  // Si la fiche reste montée mais change de vin, on repart sur son dernier bon millésime
  useEffect(() => {
    setMillesime(wine.bonsMilsimes[wine.bonsMilsimes.length - 1])
  }, [wine.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const [showAccordInverse, setShowAccordInverse] = useState(false)
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  const addedSet = added || new Set()
  const isAdded = addedSet.has(`${wine.id}-${millesime}`)
  const garde = gardeForMillesime(wine, millesime)
  const petitsDomaines = wine.domaines.filter(d => d.confidentiel)
  const hasPetitDomaine = petitsDomaines.length > 0

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <div
        className="modal-panel sm:max-w-xl lg:max-w-4xl max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header coloré */}
        <div
          className="p-6 pb-5 flex-shrink-0 relative overflow-hidden"
          style={{ background: `linear-gradient(150deg, ${wine.color} 0%, ${wine.color}cc 55%, #1e2426 145%)` }}
        >
          <div className="absolute -top-8 -right-8 text-[120px] opacity-15 select-none leading-none">{wine.emoji}</div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-3xl mb-1.5">{wine.emoji}</div>
                  <h3 className="font-wine-name text-5xl text-cream">{wine.appellation}</h3>
                  <p className="text-cream/70 text-sm mt-1 flex items-center gap-1.5">
                    <MapPin size={11} /> {wine.region} · {wine.typeLabel}
                  </p>
                </div>
              </div>
              <p className="text-cream/90 font-medium italic mt-3 text-sm">« {wine.enUneMot} »</p>
              {hasPetitDomaine && (
                <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-cream backdrop-blur-sm">
                  <Sparkles size={10} /> Petit domaine
                </span>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <WineGlassAnim color="#f5f0e8" fillLevel={fillLevelFromJauges(wine.jauges)} size={44} />
              <EnvieButton appellation={wine.appellation} light />
              <button onClick={onClose}
                      className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-cream transition-all cursor-pointer"
                      aria-label="Fermer">
                <X size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5 lg:space-y-0 lg:columns-2 lg:gap-10 [&>*]:lg:break-inside-avoid [&>*]:lg:mb-5">
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
            <button
              onClick={() => setShowAccordInverse(true)}
              className="mt-3 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
            >
              <ChefHat size={13} /> Que cuisiner avec ?
            </button>
          </div>

          {/* Domaines */}
          {wine.domaines.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Noms à retenir chez le caviste</div>
              <div className="space-y-2">
                {wine.domaines.map(d => (
                  <div key={d.name} className="flex items-start gap-2">
                    <Wine size={10} className="mt-1 flex-shrink-0" style={{ color: wine.color }} />
                    <div className="min-w-0 flex-1">
                      <div>
                        <span className="font-wine-name text-xl text-anthracite-800">{d.name}</span>
                        <span className="text-[11px] text-anthracite-400"> — {d.note}</span>
                        {d.confidentiel && (
                          <span className="ml-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700 align-middle">
                            <Sparkles size={8} /> Petit domaine
                          </span>
                        )}
                      </div>
                      {d.histoire && (
                        <p className="text-[11px] text-anthracite-500 italic mt-0.5 leading-relaxed">{d.histoire}</p>
                      )}
                    </div>
                    <a
                      href={d.url || `https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${wine.appellation} site officiel`)}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
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
          {garde && (
            <p className="text-[11px] text-anthracite-500 mb-3">
              🕰️ À boire entre <span className="font-semibold text-anthracite-700">{garde.from}</span> et <span className="font-semibold text-anthracite-700">{garde.until}</span>
            </p>
          )}
          {onAddToCave && (
          <button
            onClick={() => onAddToCave(wine, millesime)}
            disabled={isAdded}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-cream shadow-wine hover:brightness-110 active:scale-[0.99]'
            }`}
            style={!isAdded ? { background: wine.color } : {}}
          >
            {isAdded ? <><Check size={15} /> Ajouté à ma cave</> : <><Plus size={15} /> Ajouter à ma cave ({millesime})</>}
          </button>
          )}
          {onNoter && (
            <button
              onClick={() => onNoter({ name: wine.appellation, domain: wine.domaines?.[0]?.name || '', vintage: millesime, type: wine.type })}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 mt-2 rounded-full text-xs font-semibold text-anthracite-500 hover:text-wine-700 transition-colors cursor-pointer"
            >
              <NotebookPen size={13} /> Noter cette dégustation
            </button>
          )}
        </div>
      </div>

      {showAccordInverse && (
        <AccordInverse wine={wine} onClose={() => setShowAccordInverse(false)} />
      )}
    </div>
  )
}

// ── Card compacte ──────────────────────────────────────────────────────────────
function VinCard({ wine, onClick, index }) {
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  const hasPetitDomaine = wine.domaines.some(d => d.confidentiel)
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
      <div className="flex items-center justify-between mt-3 gap-2">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: diff.bg, color: diff.color }}
        >
          {diff.emoji} {diff.label}
        </span>
        <div className="flex items-center gap-1.5">
          <EnvieButton appellation={wine.appellation} size={12} className="!w-6 !h-6" />
          {hasPetitDomaine && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700" title="Contient un petit domaine">
              ✨
            </span>
          )}
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: wine.color }} title={wine.typeLabel} />
        </div>
      </div>
    </button>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────────
export default function BibliothequeView({ onAddWine, mode, initialSearch = '', onNoter }) {
  const [search, setSearch]   = useState(initialSearch)
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
          <span className="eyebrow mb-1">La collection</span>
          <h2 className="section-title">Bibliothèque des Vins</h2>
          <p className="section-sub">{WINE_DB.length} appellations décodées pour vous — cliquez pour tout comprendre</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative mb-4 lg:mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite-400" />
        <input
          className="w-full pl-11 pr-4 py-3 bg-white border border-anthracite-200 rounded-2xl text-base sm:text-sm placeholder-anthracite-400 focus:outline-none focus:ring-2 focus:ring-gold-600/40 focus:border-gold-500 transition-all"
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

      {/* Desktop : panneau de filtres persistant à gauche · Mobile : filtres empilés */}
      <div className="lg:flex lg:gap-8 lg:items-start">
        <aside className="lg:w-52 lg:flex-shrink-0 lg:sticky lg:top-10">
          {/* Filtres type */}
          <div className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-3">Couleur</div>
          <div className="flex gap-2 flex-wrap mb-3 lg:flex-col lg:gap-1.5 lg:mb-6">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setType(f.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer lg:w-full lg:text-left lg:rounded-xl lg:px-3.5 lg:py-2 ${
                  type === f.value ? 'bg-wine-800 text-cream border-wine-800' : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Filtres budget + difficulté + région */}
          <div className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-3">Affiner</div>
          <div className="flex gap-2 flex-wrap mb-6 lg:flex-col lg:gap-2.5">
            {[
              { value: budget, set: setBudget, options: BUDGET_FILTERS },
              { value: diff,   set: setDiff,   options: DIFF_FILTERS },
              { value: region, set: setRegion, options: [{ value: 'all', label: 'Toutes régions' }, ...REGIONS_LIST.map(r => ({ value: r, label: r }))] },
            ].map(({ value, set, options }, i) => (
              <div key={i} className="relative lg:w-full">
                <select
                  value={value}
                  onChange={e => set(e.target.value)}
                  className="pl-3 pr-8 py-2 lg:w-full bg-white border border-anthracite-200 rounded-xl text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none font-medium"
                >
                  {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
              </div>
            ))}
            <span className="text-xs text-anthracite-400 self-center ml-auto font-medium lg:hidden">
              {filtered.length} vin{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </aside>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <p className="hidden lg:block text-xs text-anthracite-400 font-medium mb-4">
            {filtered.length} vin{filtered.length > 1 ? 's' : ''} sur {WINE_DB.length}
          </p>

          {/* Grille */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-anthracite-500 text-sm">Aucun vin ne correspond — élargissez vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filtered.map((w, i) => (
                <VinCard key={w.id} wine={w} index={i} onClick={() => setSelected(w)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fiche */}
      {selected && (
        <FicheVin
          wine={selected}
          onClose={() => setSelected(null)}
          onAddToCave={handleAdd}
          added={added}
          onNoter={onNoter}
        />
      )}
    </div>
  )
}
