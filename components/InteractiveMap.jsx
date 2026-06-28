import { useEffect, useState } from 'react'
import { X, Wine, Grape, MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

const REGIONS = [
  {
    id: 'bordeaux', name: 'Bordeaux', lat: 44.84, lng: -0.58,
    color: '#72102a',
    terroir: 'Graves, argilo-calcaires, estuaire de la Gironde',
    cepages: 'Cabernet Sauvignon, Merlot, Cabernet Franc',
    wines: ['Pauillac (Château Latour, Mouton Rothschild)', 'Saint-Émilion (Cheval Blanc, Ausone)', 'Sauternes (d\'Yquem)', 'Pomerol (Pétrus)'],
    style: 'Rouges puissants et tanniques, blancs secs (Pessac-Léognan), liquoreux (Sauternes)',
  },
  {
    id: 'bourgogne', name: 'Bourgogne', lat: 47.05, lng: 4.85,
    color: '#b81d3c',
    terroir: 'Calcaires jurassiques, marne, pentes exposées Est',
    cepages: 'Pinot Noir, Chardonnay, Aligoté',
    wines: ['Gevrey-Chambertin', 'Vosne-Romanée (DRC)', 'Meursault', 'Chablis', 'Puligny-Montrachet'],
    style: 'Rouges élégants et soyeux, blancs minéraux d\'une précision inégalée',
  },
  {
    id: 'champagne', name: 'Champagne', lat: 49.25, lng: 4.03,
    color: '#3b82f6',
    terroir: 'Craie blanche, marnes, calcaires cénomaniens',
    cepages: 'Chardonnay, Pinot Noir, Pinot Meunier',
    wines: ['Moët & Chandon', 'Dom Pérignon', 'Krug', 'Salon', 'Billecart-Salmon'],
    style: 'Effervescents de prestige : Blanc de Blancs, Blanc de Noirs, rosé, millésimés',
  },
  {
    id: 'rhone', name: 'Vallée du Rhône', lat: 45.05, lng: 4.85,
    color: '#9a1633',
    terroir: 'Granit (nord), galets roulés et sables (sud)',
    cepages: 'Syrah, Grenache, Mourvèdre, Viognier',
    wines: ['Côte-Rôtie', 'Hermitage', 'Condrieu', 'Châteauneuf-du-Pape', 'Gigondas'],
    style: 'Nord : Syrah pure et épicée. Sud : assemblages généreux et solaires',
  },
  {
    id: 'alsace', name: 'Alsace', lat: 48.25, lng: 7.45,
    color: '#b8962a',
    terroir: 'Granite, grès, calcaire, argile – grande diversité géologique',
    cepages: 'Riesling, Gewurztraminer, Pinot Gris, Muscat',
    wines: ['Riesling Grand Cru Schlossberg', 'Gewurztraminer Vendanges Tardives', 'Crémant d\'Alsace'],
    style: 'Blancs aromatiques secs et moelleux d\'une grande pureté, vins de garde',
  },
  {
    id: 'loire', name: 'Vallée de la Loire', lat: 47.40, lng: 0.70,
    color: '#059669',
    terroir: 'Tuffeau, schistes, silex, granit selon les sous-régions',
    cepages: 'Sauvignon Blanc, Chenin Blanc, Cabernet Franc, Melon de Bourgogne',
    wines: ['Sancerre', 'Pouilly-Fumé', 'Vouvray', 'Chinon', 'Muscadet sur Lie'],
    style: 'Blancs vifs et minéraux, rouges légères et fruités, liquoreux exceptionnels',
  },
  {
    id: 'provence', name: 'Provence', lat: 43.50, lng: 5.50,
    color: '#e45872',
    terroir: 'Calcaire, argile rouge, schistes, bauxite',
    cepages: 'Grenache, Cinsault, Mourvèdre, Syrah, Rolle',
    wines: ['Bandol (Domaine Tempier)', 'Côtes de Provence rosé', 'Palette', 'Cassis'],
    style: 'Rosés de renommée mondiale, rouges de Bandol parmi les plus grands de France',
  },
  {
    id: 'languedoc', name: 'Languedoc-Roussillon', lat: 43.60, lng: 3.88,
    color: '#7c3aed',
    terroir: 'Schistes, galets, grès, calcaire, grande diversité',
    cepages: 'Carignan, Grenache, Syrah, Mourvèdre, Vermentino',
    wines: ['Pic Saint-Loup', 'Faugères', 'Banyuls', 'Rivesaltes', 'Saint-Chinian'],
    style: 'Rouges solaires et généreux, vins doux naturels (Banyuls, Rivesaltes)',
  },
]

function RegionPanel({ region, onClose }) {
  if (!region) return null
  return (
    <div className="absolute top-3 right-3 bottom-3 z-[1000] w-72 sm:w-80 bg-cream rounded-xl shadow-card-hover border border-anthracite-200 overflow-hidden flex flex-col animate-slide-up">
      <div className="p-4 flex-shrink-0" style={{ background: region.color }}>
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-white">{region.name}</h3>
          <button onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  aria-label="Fermer">
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Grape size={11} className="text-anthracite-400" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400">Cépages</span>
          </div>
          <p className="text-xs text-anthracite-700">{region.cepages}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin size={11} className="text-anthracite-400" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400">Terroir</span>
          </div>
          <p className="text-xs text-anthracite-600 italic">{region.terroir}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Wine size={11} className="text-gold-600" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400">Vins emblématiques</span>
          </div>
          <ul className="space-y-1.5">
            {region.wines.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-anthracite-700">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: region.color }} />
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-anthracite-100">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-1.5">Style</div>
          <p className="text-xs text-anthracite-600 leading-relaxed">{region.style}</p>
        </div>
      </div>
    </div>
  )
}

export default function InteractiveMap() {
  const [selected, setSelected] = useState(null)
  const [MapComponents, setMapComponents] = useState(null)

  useEffect(() => {
    // Dynamically import Leaflet components client-side
    Promise.all([
      import('react-leaflet').then(m => ({
        MapContainer: m.MapContainer,
        TileLayer:    m.TileLayer,
        CircleMarker: m.CircleMarker,
        Tooltip:      m.Tooltip,
      })),
    ]).then(([comps]) => setMapComponents(comps))
  }, [])

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-wine-800 flex items-center justify-center shadow-wine">
          <MapPin size={18} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">Carte des Vignobles</h2>
          <p className="section-sub">Cliquez sur une région pour découvrir ses vins</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="relative" style={{ height: '520px' }}>
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
                center={[46.8, 2.5]}
                zoom={5.5}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <MapComponents.TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />
                {REGIONS.map(region => (
                  <MapComponents.CircleMarker
                    key={region.id}
                    center={[region.lat, region.lng]}
                    radius={selected?.id === region.id ? 16 : 12}
                    pathOptions={{
                      color: '#fff',
                      weight: 2,
                      fillColor: region.color,
                      fillOpacity: selected?.id === region.id ? 1 : 0.85,
                    }}
                    eventHandlers={{ click: () => setSelected(selected?.id === region.id ? null : region) }}
                  >
                    <MapComponents.Tooltip direction="top" offset={[0, -8]} permanent={false}>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 12, color: '#1e2426' }}>
                        {region.name}
                      </span>
                    </MapComponents.Tooltip>
                  </MapComponents.CircleMarker>
                ))}
              </MapComponents.MapContainer>

              {selected && <RegionPanel region={selected} onClose={() => setSelected(null)} />}
            </>
          )}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-anthracite-100 flex flex-wrap gap-3">
          {REGIONS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelected(selected?.id === r.id ? null : r)}
              className={`flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:opacity-80 ${
                selected?.id === r.id ? 'font-semibold text-anthracite-900' : 'text-anthracite-500'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
