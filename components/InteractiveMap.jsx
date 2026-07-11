import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { X, Wine, Grape, MapPin, Plus, Thermometer, Clock, Star, BookOpen, Check, ChevronRight, ExternalLink, Sparkles, NotebookPen, ChefHat, Route } from 'lucide-react'
import RoutesDesVins from './RoutesDesVins'
import AccordInverse from './AccordInverse'
import { EnvieButton } from './Envies'
import dynamic from 'next/dynamic'
import { WINE_DB, WINE_DB_DOMAINES, gardeForMillesime } from '../data/wineDatabase'
import { regionInfo } from '../data/regionsInfo'
import WineGlassAnim, { fillLevelFromJauges } from './WineGlassAnim'

const TYPE_COLORS = {
  red:       { bg: 'bg-wine-100',  text: 'text-wine-800',  label: 'Rouge' },
  white:     { bg: 'bg-amber-50',  text: 'text-amber-800', label: 'Blanc' },
  sweet:     { bg: 'bg-amber-100', text: 'text-amber-900', label: 'Liquoreux' },
  sparkling: { bg: 'bg-blue-50',   text: 'text-blue-700',  label: 'Effervescent' },
  rosé:      { bg: 'bg-pink-50',   text: 'text-pink-700',  label: 'Rosé' },
}

// ── Wine detail panel ──────────────────────────────────────────────────────────
export function WinePanel({ wine, onClose, onAddToCave, addedIds, onNoter }) {
  const [millesime, setMillesime] = useState(wine.bonsMilsimes[wine.bonsMilsimes.length - 1])
  const [qty, setQty] = useState(1)
  const [showAccordInverse, setShowAccordInverse] = useState(false)
  const isAdded = addedIds.has(`${wine.id}-${millesime}`)
  const hasPetitDomaine = wine.domaines.some(d => d.confidentiel)

  const handleAdd = () => {
    onAddToCave({
      id: `${wine.id}-${millesime}-${Date.now()}`,
      name: wine.appellation,
      domain: '',
      appellation: wine.appellation,
      region: wine.region,
      type: wine.type,
      cepages: wine.cepages,
      vintage: millesime,
      quantity: qty,
      drinkFrom: wine.drinkFrom,
      drinkUntil: wine.drinkUntil,
      serviceTemp: wine.serviceTemp,
      carafage: wine.carafage,
      foodPairings: wine.accords,
      notes: `Arômes : ${wine.aromes}`,
    }, wine.id, millesime)
  }

  return (
    <div className="absolute top-3 right-3 bottom-3 z-[1000] w-80 sm:w-96 bg-cream rounded-xl shadow-card-hover border border-anthracite-200 overflow-hidden flex flex-col animate-slide-up">
      {/* Header */}
      <div className="p-4 flex-shrink-0 text-cream relative overflow-hidden"
           style={{ background: `linear-gradient(150deg, ${wine.color} 0%, ${wine.color}cc 55%, #1e2426 150%)` }}>
        <div className="absolute inset-0 opacity-20"
             style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }} />
        <div className="relative flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-wine-name text-4xl">{wine.appellation}</div>
            <div className="text-sm opacity-75 mt-0.5">{wine.region}</div>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <WineGlassAnim color="#f5f0e8" fillLevel={fillLevelFromJauges(wine.jauges)} size={32} />
            <EnvieButton appellation={wine.appellation} size={13} light className="!w-7 !h-7" />
            <button onClick={onClose}
                    className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
                    aria-label="Fermer">
              <X size={13} />
            </button>
          </div>
        </div>
        <div className="mt-2 relative flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {wine.typeLabel}
          </span>
          {hasPetitDomaine && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">
              <Sparkles size={10} /> Petit domaine
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Arômes */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-1.5">Profil aromatique</div>
          <p className="text-xs text-anthracite-600 italic leading-relaxed">{wine.aromes}</p>
        </div>

        {/* Cépages */}
        <div className="flex items-start gap-2">
          <Grape size={12} className="text-anthracite-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-1.5">Cépages</div>
            <div className="flex flex-wrap gap-1">
              {wine.cepages.map(c => (
                <span key={c} className="text-xs bg-anthracite-100 text-anthracite-700 px-2.5 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Service info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="card p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Thermometer size={10} className="text-anthracite-400" />
              <span className="text-[9px] uppercase tracking-wider text-anthracite-400">Service</span>
            </div>
            <div className="text-xs font-semibold text-anthracite-800">{wine.temperature}</div>
          </div>
          <div className="card p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen size={10} className="text-anthracite-400" />
              <span className="text-[9px] uppercase tracking-wider text-anthracite-400">Garde</span>
            </div>
            <div className="text-xs font-semibold text-anthracite-800">{wine.garde}</div>
          </div>
          {wine.carafage && (
            <div className="card p-2.5 col-span-2">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={10} className="text-anthracite-400" />
                <span className="text-[9px] uppercase tracking-wider text-anthracite-400">Carafage</span>
              </div>
              <div className="text-xs font-semibold text-anthracite-800">{wine.carafage}</div>
            </div>
          )}
        </div>

        {/* Bons millésimes */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2">Bons millésimes</div>
          <div className="flex flex-wrap gap-1.5">
            {wine.bonsMilsimes.map(y => (
              <button
                key={y}
                onClick={() => setMillesime(y)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  millesime === y
                    ? 'border-current text-cream font-semibold scale-105'
                    : 'bg-white border-anthracite-200 text-anthracite-600 hover:border-anthracite-400'
                }`}
                style={millesime === y ? { background: wine.color, borderColor: wine.color } : {}}
              >
                {y}
              </button>
            ))}
          </div>
          {(() => {
            const garde = gardeForMillesime(wine, millesime)
            return garde ? (
              <p className="text-[11px] text-anthracite-500 mt-2">
                🕰️ À boire entre <span className="font-semibold text-anthracite-700">{garde.from}</span> et <span className="font-semibold text-anthracite-700">{garde.until}</span>
              </p>
            ) : null
          })()}
        </div>

        {/* Accords */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2">Accords mets-vins</div>
          <div className="flex flex-wrap gap-1.5">
            {wine.accords.map(a => (
              <span key={a} className="text-xs bg-anthracite-50 border border-anthracite-200 text-anthracite-600 px-2.5 py-1 rounded-full">{a}</span>
            ))}
          </div>
          <button
            onClick={() => setShowAccordInverse(true)}
            className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
          >
            <ChefHat size={12} /> Que cuisiner avec ?
          </button>
        </div>

        {/* Domaines */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2">Domaines & Châteaux</div>
          <div className="space-y-2">
            {wine.domaines.map(d => (
              <div key={d.name} className="flex items-start gap-2">
                <Wine size={10} className="mt-0.5 flex-shrink-0" style={{ color: wine.color }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-wine-name text-xl text-anthracite-800">{d.name}</span>
                    {d.confidentiel && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700">
                        <Sparkles size={8} /> Petit domaine
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-anthracite-400">{d.note}</div>
                  {d.histoire && <div className="text-[10px] text-anthracite-500 italic mt-0.5">{d.histoire}</div>}
                </div>
                <a
                  href={d.url || `https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${wine.appellation} site officiel`)}`}
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

        {/* Terroir */}
        <div className="pt-2 border-t border-anthracite-100">
          <p className="text-xs text-anthracite-500 leading-relaxed italic">{wine.description}</p>
        </div>
      </div>

      {/* Add to cave */}
      <div className="p-4 border-t border-anthracite-100 bg-cream flex-shrink-0">
        <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2.5">
          Ajouter — millésime {millesime}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-anthracite-900/10 rounded-full bg-white overflow-hidden">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-anthracite-500 hover:text-wine-700 hover:bg-anthracite-50 transition-all cursor-pointer text-lg leading-none">−</button>
            <span className="w-8 text-center text-sm font-semibold text-anthracite-900">{qty}</span>
            <button onClick={() => setQty(q => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-anthracite-500 hover:text-wine-700 hover:bg-anthracite-50 transition-all cursor-pointer text-lg leading-none">+</button>
          </div>
          <span className="text-xs text-anthracite-400">bouteille{qty > 1 ? 's' : ''}</span>

          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
              isAdded
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'text-cream shadow-wine hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0'
            }`}
            style={!isAdded ? { background: wine.color } : {}}
            aria-label={isAdded ? 'Ajouté à la cave' : 'Ajouter à la cave'}
          >
            {isAdded
              ? <><Check size={13} /> Ajouté</>
              : <><Plus size={13} /> Ajouter à la cave</>
            }
          </button>
        </div>
        {onNoter && (
          <button
            onClick={() => onNoter({ name: wine.appellation, domain: wine.domaines?.[0]?.name || '', vintage: millesime, type: wine.type })}
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 rounded-lg text-xs font-semibold text-anthracite-500 hover:text-wine-700 transition-colors cursor-pointer"
          >
            <NotebookPen size={12} /> Noter cette dégustation
          </button>
        )}
      </div>

      {showAccordInverse && (
        <AccordInverse wine={wine} onClose={() => setShowAccordInverse(false)} />
      )}
    </div>
  )
}

// ── Map component ─────────────────────────────────────────────────────────────
export default function InteractiveMap({ onAddWine, onNoter }) {
  const [view, setView] = useState('vignobles') // vignobles | routes
  const [selected, setSelected] = useState(null)
  const [MapComponents, setMap] = useState(null)
  const [addedIds, setAddedIds] = useState(new Set())
  const [activeRegion, setActiveRegion] = useState('Toutes')
  const mapRef = useRef(null)

  const regions = ['Toutes', ...new Set(WINE_DB.map(w => w.region))]

  const visibleWines = activeRegion === 'Toutes'
    ? WINE_DB
    : WINE_DB.filter(w => w.region === activeRegion)

  // Domaines du terroir sélectionné, pour la carte narrative.
  const regionDomaines = useMemo(() => {
    if (activeRegion === 'Toutes') return []
    return WINE_DB_DOMAINES.filter(d => d.regions.includes(activeRegion))
  }, [activeRegion])

  useEffect(() => {
    import('react-leaflet').then(m => setMap({
      MapContainer:  m.MapContainer,
      TileLayer:     m.TileLayer,
      CircleMarker:  m.CircleMarker,
      Tooltip:       m.Tooltip,
    }))
  }, [])

  // Zoom animé (flyTo) quand la région sélectionnée change.
  useEffect(() => {
    if (!mapRef.current) return
    if (activeRegion === 'Toutes') {
      mapRef.current.flyTo([46.8, 2.5], 6, { duration: 1.3 })
      return
    }
    const wines = WINE_DB.filter(w => w.region === activeRegion)
    if (!wines.length) return
    const lat = wines.reduce((s, w) => s + w.lat, 0) / wines.length
    const lng = wines.reduce((s, w) => s + w.lng, 0) / wines.length
    mapRef.current.flyTo([lat, lng], wines.length === 1 ? 9 : 7.5, { duration: 1.3 })
  }, [activeRegion, MapComponents])

  const handleAddToCave = useCallback((wineObj, wineId, millesime) => {
    onAddWine?.(wineObj)
    setAddedIds(prev => new Set([...prev, `${wineId}-${millesime}`]))
  }, [onAddWine])

  const openDomaineWine = useCallback((domaineWines) => {
    const ref = domaineWines.find(w => w.region === activeRegion) || domaineWines[0]
    const full = WINE_DB.find(w => w.id === ref.id)
    if (full) setSelected(full)
  }, [activeRegion])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-wine-800 flex items-center justify-center shadow-wine">
          {view === 'routes' ? <Route size={18} className="text-gold-400" /> : <MapPin size={18} className="text-gold-400" />}
        </div>
        <div>
          <span className="eyebrow mb-1">Le voyage</span>
          <h2 className="section-title">{view === 'routes' ? 'Routes des vins' : 'Carte des Vignobles'}</h2>
          <p className="section-sub">
            {view === 'routes'
              ? '6 itinéraires œnotouristiques, tracés jour par jour'
              : `${WINE_DB.length} appellations — cliquez pour explorer et ajouter à votre cave`}
          </p>
        </div>
      </div>

      {/* Sélecteur de vue : vignobles / routes des vins */}
      <div className="flex gap-2 mb-5">
        {[
          { id: 'vignobles', label: 'Vignobles', Icon: MapPin },
          { id: 'routes',    label: 'Routes des vins', Icon: Route },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              view === id
                ? 'bg-wine-800 text-cream shadow-wine'
                : 'bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {view === 'routes' ? (
        <RoutesDesVins onAddWine={onAddWine} onNoter={onNoter} />
      ) : (
      <>
      {/* Region filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setActiveRegion(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
              activeRegion === r
                ? 'bg-wine-800 text-cream border-wine-800'
                : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Carte narrative : blurb + domaines du terroir sélectionné */}
      {activeRegion !== 'Toutes' && (
        <div className="card p-4 mb-4 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{regionInfo(activeRegion).emoji}</span>
            <div className="min-w-0">
              <div className="font-serif text-base font-bold text-anthracite-900 mb-1">{activeRegion}</div>
              <p className="text-sm text-anthracite-600 leading-relaxed">{regionInfo(activeRegion).blurb}</p>
            </div>
          </div>
          {regionDomaines.length > 0 && (
            <div className="mt-3 pt-3 border-t border-anthracite-100">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2">
                Domaines de la région — cliquez pour ouvrir la fiche
              </div>
              <div className="flex flex-wrap gap-1.5">
                {regionDomaines.map(d => (
                  <button
                    key={d.name}
                    onClick={() => openDomaineWine(d.wines)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-anthracite-200 bg-white text-anthracite-700 hover:border-wine-300 hover:text-wine-700 transition-all cursor-pointer"
                  >
                    {d.confidentiel && <Sparkles size={9} className="text-gold-600" />}
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card overflow-hidden" style={{ isolation: 'isolate', zIndex: 0, position: 'relative' }}>
        <div className="relative" style={{ height: '560px' }}>
          {!MapComponents ? (
            <div className="absolute inset-0 flex items-center justify-center bg-anthracite-50">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin mx-auto mb-3" />
                <p className="text-xs text-anthracite-400">Chargement de la carte…</p>
              </div>
            </div>
          ) : (
            <>
              <MapComponents.MapContainer
                ref={mapRef}
                center={[46.8, 2.5]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <MapComponents.TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />

                {visibleWines.map(wine => (
                  <MapComponents.CircleMarker
                    key={wine.id}
                    center={[wine.lat, wine.lng]}
                    radius={selected?.id === wine.id ? 14 : 10}
                    pathOptions={{
                      color: '#fff',
                      weight: selected?.id === wine.id ? 3 : 2,
                      fillColor: wine.color,
                      fillOpacity: selected?.id === wine.id ? 1 : 0.85,
                    }}
                    eventHandlers={{
                      click: () => setSelected(selected?.id === wine.id ? null : wine),
                    }}
                  >
                    <MapComponents.Tooltip direction="top" offset={[0, -10]}>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 12, color: '#1e2426', fontWeight: 600 }}>
                        {wine.appellation}
                      </div>
                      <div style={{ fontSize: 10, color: '#7a8486', marginTop: 2 }}>
                        {wine.typeLabel} · {wine.region}
                      </div>
                    </MapComponents.Tooltip>
                  </MapComponents.CircleMarker>
                ))}
              </MapComponents.MapContainer>

              {selected && (
                <WinePanel
                  wine={selected}
                  onClose={() => setSelected(null)}
                  onAddToCave={handleAddToCave}
                  addedIds={addedIds}
                  onNoter={onNoter}
                />
              )}
            </>
          )}
        </div>

        {/* Legend */}
        <div className="px-5 py-4 border-t border-anthracite-100">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-3">
            {visibleWines.length} appellations — cliquez pour explorer
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleWines.map(w => (
              <button
                key={w.id}
                onClick={() => setSelected(selected?.id === w.id ? null : w)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 cursor-pointer ${
                  selected?.id === w.id
                    ? 'text-cream border-transparent font-semibold shadow-sm scale-105'
                    : 'bg-white border-anthracite-200 text-anthracite-600 hover:border-anthracite-400 hover:scale-105'
                }`}
                style={selected?.id === w.id ? { background: w.color, borderColor: w.color } : {}}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: w.color }} />
                {w.appellation}
              </button>
            ))}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}
