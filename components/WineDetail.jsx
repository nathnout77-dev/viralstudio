import { useState } from 'react'
import { X, Star, Thermometer, Clock, Wine, MapPin, Grape, TrendingUp, UtensilsCrossed, Edit2, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import WineGlassAnim from './WineGlassAnim'
import { FavoriStar } from './WineCard'
import BoutonAchat from './BoutonAchat'
import useModalBehavior from '../lib/useModal'

const DegustationSimulateur = dynamic(() => import('./DegustationSimulateur'), { ssr: false })


function Row({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-3 border-b border-anthracite-100 last:border-0">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-anthracite-50 flex-shrink-0">
        <Icon size={14} className="text-anthracite-500" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-0.5">{label}</div>
        <div className="text-sm text-anthracite-800 leading-snug">{value}</div>
      </div>
    </div>
  )
}

function ApogeeBar({ wine }) {
  const now  = new Date().getFullYear()
  const base = wine.vintage
  const from = base + (wine.drinkFrom  || 2)
  const to   = base + (wine.drinkUntil || 8)
  const pct  = Math.min(100, Math.max(0, ((now - from) / (to - from)) * 100))
  const isIn = now >= from && now <= to

  return (
    <div className="card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-anthracite-500">Fenêtre d'apogée</div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isIn ? 'bg-emerald-100 text-emerald-700' :
          now < from ? 'bg-blue-100 text-blue-700' : 'bg-anthracite-100 text-anthracite-500'
        }`}>
          {isIn ? 'À boire maintenant' : now < from ? `Prêt dans ${from - now} an${from - now > 1 ? 's' : ''}` : 'Passé l\'apogée'}
        </span>
      </div>
      <div className="relative h-2 bg-anthracite-100 rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-300 via-emerald-400 to-amber-400 rounded-full transition-all duration-500"
             style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-anthracite-400 mt-1.5">
        <span>{from}</span>
        <span className="font-medium text-anthracite-600">{wine.vintage}</span>
        <span>{to}</span>
      </div>
    </div>
  )
}

export default function WineDetail({ wine, onClose, onEdit, onToggleFavori }) {
  useModalBehavior(onClose)
  const [showSimulateur, setShowSimulateur] = useState(false)
  if (!wine) return null

  const typeLabels = { red:'Rouge', white:'Blanc', rosé:'Rosé', sparkling:'Effervescent', sweet:'Liquoreux' }
  const bottleColor = { red:'#8c2f39', white:'#c9a84c', rosé:'#e58f8f', sparkling:'#5b8db8', sweet:'#b8860b' }[wine.type] || '#8c2f39'
  const fillLevel = wine.rating ? Math.min(1, Math.max(0.15, wine.rating / 20)) : 0.6

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={`Fiche : ${wine.name}`}
    >
      <div
        className="modal-panel sm:max-w-lg lg:max-w-2xl max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative h-40 flex-shrink-0 overflow-hidden"
             style={{ background: `linear-gradient(150deg, ${bottleColor} 0%, ${bottleColor}99 45%, #1e2426 130%)` }}>
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-wine-name text-4xl text-cream">{wine.name}</h2>
                <p className="text-sm text-cream/70 mt-0.5">{wine.domain}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {wine.rating && (
                  <div className="flex items-center gap-1 bg-white/15 backdrop-blur rounded-lg px-2.5 py-1.5">
                    <Star size={12} className="text-gold-300 fill-gold-300" />
                    <span className="text-sm font-semibold text-cream">{wine.rating}</span>
                  </div>
                )}
                <WineGlassAnim color="#f5f0e8" fillLevel={fillLevel} size={30} />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {onToggleFavori && <FavoriStar wine={wine} onToggle={onToggleFavori} light />}
            <button onClick={() => onEdit?.(wine)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    aria-label="Modifier">
              <Edit2 size={13} />
            </button>
            <button onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    aria-label="Fermer">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Millésime + type + qty */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Millésime', value: wine.vintage },
              { label: 'Type',      value: typeLabels[wine.type] || wine.type },
              { label: 'Cave',      value: `${wine.quantity} btles` },
            ].map(({ label, value }) => (
              <div key={label} className="card p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-anthracite-400 mb-1">{label}</div>
                <div className="text-sm font-semibold text-anthracite-900">{value}</div>
              </div>
            ))}
          </div>

          {/* Apogée */}
          <ApogeeBar wine={wine} />

          {/* Simulateur de dégustation */}
          <button
            onClick={() => setShowSimulateur(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-gold-700 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 transition-colors cursor-pointer"
            title="L'avis d'Œno avant d'ouvrir, votre ressenti après"
          >
            <Sparkles size={13} /> Simuler la dégustation de cette bouteille
          </button>

          {/* Details */}
          <div className="card p-4">
            <Row icon={MapPin}         label="Appellation" value={wine.appellation} />
            <Row icon={MapPin}         label="Région"      value={wine.region} />
            <Row icon={Grape}          label="Cépages"     value={Array.isArray(wine.cepages) ? wine.cepages.join(', ') : wine.cepages} />
            <Row icon={Thermometer}    label="Température de service" value={wine.serviceTemp ? `${wine.serviceTemp}°C` : null} />
            <Row icon={Clock}          label="Carafage"    value={wine.carafage} />
            <Row icon={TrendingUp}     label="Prix payé" value={wine.estimatedValue ? `${wine.estimatedValue} € / bouteille` : null} />
          </div>

          {/* Accords */}
          {wine.foodPairings?.length > 0 && (
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed size={13} className="text-gold-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-anthracite-500">Accords mets-vins</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {wine.foodPairings.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-anthracite-50 border border-anthracite-200 rounded-full text-xs text-anthracite-700">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {wine.notes && (
            <div className="card p-4">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-2">Notes de dégustation</div>
              <p className="text-sm text-anthracite-700 italic leading-relaxed">&ldquo;{wine.notes}&rdquo;</p>
            </div>
          )}

          {/* En racheter : la bouteille de la cave garde son chemin d'achat */}
          <BoutonAchat
            wine={{ appellation: wine.name || wine.appellation, region: wine.region }}
            millesime={wine.vintage || null}
          />
        </div>
      </div>

      {showSimulateur && (
        <DegustationSimulateur
          vin={{
            nom: wine.name,
            appellation: wine.appellation || wine.name,
            domaine: wine.domain || '',
            millesime: wine.vintage || null,
            region: wine.region,
            type: wine.type,
            cepages: wine.cepages || [],
            carafage: wine.carafage,
          }}
          onClose={() => setShowSimulateur(false)}
        />
      )}
    </div>
  )
}
