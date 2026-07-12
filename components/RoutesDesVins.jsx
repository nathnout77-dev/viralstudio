import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Route, CalendarDays, Lightbulb, ChevronLeft, ExternalLink, Wine, MapPin } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import { ROUTES_DES_VINS } from '../data/routesDesVins'
import { WinePanel } from './InteractiveMap'

// ═══════════════════════════════════════════════════════════════════════════
// Routes des vins — itinéraires œnotouristiques tracés sur la carte Leaflet.
// Tracé or pointillé + marqueurs numérotés, déroulé jour par jour,
// appellations cliquables (fiche vin) et domaines visitables (liens directs).
// ═══════════════════════════════════════════════════════════════════════════

const wineById = id => WINE_DB.find(w => w.id === id) || null

export default function RoutesDesVins({ onAddWine, onNoter }) {
  const [route, setRoute] = useState(null)
  const [MapComponents, setMap] = useState(null)
  const [Leaflet, setLeaflet] = useState(null)
  const [selected, setSelected] = useState(null)
  const [addedIds, setAddedIds] = useState(new Set())
  const mapRef = useRef(null)

  useEffect(() => {
    Promise.all([import('react-leaflet'), import('leaflet')]).then(([m, L]) => {
      setMap({
        MapContainer: m.MapContainer,
        TileLayer: m.TileLayer,
        Polyline: m.Polyline,
        Marker: m.Marker,
        Tooltip: m.Tooltip,
      })
      setLeaflet(L.default || L)
    })
  }, [])

  // Recadrage animé sur l'itinéraire sélectionné
  useEffect(() => {
    if (!mapRef.current || !route) return
    const pts = route.etapes.map(e => [e.lat, e.lng])
    mapRef.current.flyToBounds(pts, { padding: [50, 50], duration: 1.2, maxZoom: 10 })
  }, [route, MapComponents])

  const handleAddToCave = useCallback((wineObj, wineId, millesime) => {
    onAddWine?.(wineObj)
    setAddedIds(prev => new Set([...prev, `${wineId}-${millesime}`]))
  }, [onAddWine])

  // Icônes numérotées (divIcon or/bordeaux)
  const numberIcon = useCallback((n) => Leaflet?.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50%;background:#5c0d22;border:2.5px solid #c9a84c;color:#FAFAF9;display:flex;align-items:center;justify-content:center;font:700 12px Inter,sans-serif;box-shadow:0 2px 8px rgba(12,10,9,0.35)">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  }), [Leaflet])

  // Domaines visitables d'une étape (dédupliqués, liens directs si url)
  const domainesEtape = (etape) =>
    etape.appellations.flatMap(id => {
      const w = wineById(id)
      return w ? w.domaines.map(d => ({ ...d, appellation: w.appellation })) : []
    }).filter((d, i, arr) => arr.findIndex(x => x.name === d.name) === i)

  // ── Sélection d'une route ──
  if (!route) {
    return (
      <div className="animate-fade-in">
        <div className="grid sm:grid-cols-2 gap-4">
          {ROUTES_DES_VINS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setRoute(r)}
              className="card p-5 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-2">
                <Route size={12} />
                {r.region} · {r.duree} · {r.etapes.length} étapes
              </div>
              <div className="font-serif text-base font-bold text-anthracite-900 leading-snug mb-2">{r.titre}</div>
              <p className="text-xs text-anthracite-500 leading-relaxed line-clamp-3">{r.intro}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Route sélectionnée ──
  return (
    <div className="animate-fade-in">
      <button onClick={() => { setRoute(null); setSelected(null) }}
              className="flex items-center gap-1.5 text-xs text-anthracite-400 hover:text-anthracite-700 transition-colors cursor-pointer mb-4">
        <ChevronLeft size={13} /> Toutes les routes
      </button>

      <div className="mb-5">
        <span className="eyebrow mb-1">{route.region} · {route.duree}</span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-anthracite-900">{route.titre}</h3>
        <p className="text-sm text-anthracite-500 leading-relaxed mt-2 max-w-2xl">{route.intro}</p>
      </div>

      {/* Desktop : carte sticky à gauche, déroulé en colonne droite · Mobile : empilé */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
      {/* Carte — fix z-index Leaflet préservé (isolation + zIndex 0) */}
      <div className="card overflow-hidden mb-5 lg:mb-0 lg:sticky lg:top-10" style={{ isolation: 'isolate', zIndex: 0, position: 'relative' }}>
        <div className="relative h-[420px] lg:h-[72vh] lg:min-h-[520px]">
          {!MapComponents || !Leaflet ? (
            <div className="absolute inset-0 flex items-center justify-center bg-anthracite-50">
              <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
              <MapComponents.MapContainer
                ref={mapRef}
                bounds={route.etapes.map(e => [e.lat, e.lng])}
                boundsOptions={{ padding: [50, 50], maxZoom: 10 }}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <MapComponents.TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />
                {/* Tracé or pointillé */}
                <MapComponents.Polyline
                  positions={route.etapes.map(e => [e.lat, e.lng])}
                  pathOptions={{ color: '#c9a84c', weight: 3.5, dashArray: '8 10', lineCap: 'round' }}
                />
                {/* Marqueurs numérotés */}
                {route.etapes.map((e, i) => (
                  <MapComponents.Marker key={i} position={[e.lat, e.lng]} icon={numberIcon(i + 1)}>
                    <MapComponents.Tooltip direction="top" offset={[0, -14]}>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 12, color: '#1e2426', fontWeight: 600 }}>
                        Jour {e.jour} — {e.titre}
                      </div>
                    </MapComponents.Tooltip>
                  </MapComponents.Marker>
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
      </div>

      {/* Déroulé jour par jour */}
      <div className="space-y-4 lg:max-h-[72vh] lg:overflow-y-auto lg:pr-1">
        {route.etapes.map((e, i) => {
          const domaines = domainesEtape(e)
          return (
            <div key={i} className="card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-cream"
                     style={{ background: '#5c0d22', border: '2px solid #c9a84c' }}>
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1">
                    <CalendarDays size={11} /> Jour {e.jour}
                  </div>
                  <h4 className="font-serif text-base font-bold text-anthracite-900 mb-1.5">{e.titre}</h4>
                  <p className="text-sm text-anthracite-600 leading-relaxed">{e.texte}</p>

                  {/* Appellations → fiche vin */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.appellations.map(id => {
                      const w = wineById(id)
                      if (!w) return null
                      return (
                        <button
                          key={id}
                          onClick={() => setSelected(w)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-anthracite-200 bg-white text-anthracite-700 hover:border-wine-300 hover:text-wine-700 transition-all cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: w.color }} />
                          {w.appellation}
                        </button>
                      )
                    })}
                  </div>

                  {/* Domaines visitables */}
                  {domaines.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-anthracite-100">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2 flex items-center gap-1.5">
                        <Wine size={10} /> Domaines à visiter en chemin
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {domaines.map(d => d.url ? (
                          <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                             className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
                             title={`Site officiel — ${d.appellation}`}>
                            {d.name} <ExternalLink size={9} />
                          </a>
                        ) : (
                          <span key={d.name}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] text-anthracite-500 bg-anthracite-50 border border-anthracite-200"
                                title={d.appellation}>
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>

      {/* Conseils pratiques */}
      <div className="mt-5 rounded-2xl p-5 text-cream"
           style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-gold-400" />
          <span className="eyebrow-dark">Conseils pratiques</span>
        </div>
        <ul className="space-y-2">
          {route.conseils.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-cream/85 leading-relaxed">
              <MapPin size={12} className="text-gold-400 flex-shrink-0 mt-1" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
