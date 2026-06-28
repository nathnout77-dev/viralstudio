import { Wine, Star, Clock, Thermometer, Edit2, Trash2, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const TYPE_CONFIG = {
  red:       { label: 'Rouge',       color: '#72102a', bg: 'bg-wine-100',    text: 'text-wine-800',     dot: 'bg-wine-700' },
  white:     { label: 'Blanc',       color: '#b8962a', bg: 'bg-amber-50',    text: 'text-amber-800',    dot: 'bg-amber-500' },
  rosé:      { label: 'Rosé',        color: '#e45872', bg: 'bg-pink-50',     text: 'text-pink-700',     dot: 'bg-pink-400' },
  sparkling: { label: 'Effervescent',color: '#3b82f6', bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-400' },
  sweet:     { label: 'Liquoreux',   color: '#92400e', bg: 'bg-amber-100',   text: 'text-amber-900',    dot: 'bg-amber-700' },
}

function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.red
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function DrinkingWindow({ wine }) {
  const now = new Date().getFullYear()
  const start = wine.vintage + (wine.drinkFrom || 2)
  const end   = wine.vintage + (wine.drinkUntil || 8)

  if (now < start)  return <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Trop jeune · {start - now} ans</span>
  if (now > end)    return <span className="text-[10px] font-medium text-anthracite-400 bg-anthracite-100 px-2 py-0.5 rounded-full">Passé l'apogée</span>
  return <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">À boire · jusqu'à {end}</span>
}

export default function WineCard({ wine, onSelect, onEdit, onDelete, onUpdateQty, compact = false }) {
  const [imgError, setImgError] = useState(false)
  const cfg = TYPE_CONFIG[wine.type] || TYPE_CONFIG.red

  const bottleColor = {
    red: '#4a0f1f', white: '#d4b896', rosé: '#e8a0b0',
    sparkling: '#c8d8e8', sweet: '#c4a060',
  }[wine.type] || '#4a0f1f'

  if (compact) {
    return (
      <div
        onClick={() => onSelect?.(wine)}
        className="card p-4 cursor-pointer hover:border-gold-500/30 group animate-fade-in"
        role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onSelect?.(wine)}
        aria-label={`${wine.name} ${wine.vintage}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-14 rounded flex-shrink-0 flex items-center justify-center"
               style={{ background: `linear-gradient(180deg, ${bottleColor}dd 0%, ${bottleColor} 100%)` }}>
            <Wine size={16} className="text-white/60" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-sm font-semibold text-anthracite-900 truncate">{wine.name}</div>
            <div className="text-xs text-anthracite-500 truncate">{wine.domain}</div>
            <div className="flex items-center gap-2 mt-1">
              <TypeBadge type={wine.type} />
              <span className="text-xs text-anthracite-400">{wine.vintage}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-semibold text-anthracite-900">{wine.quantity}</div>
            <div className="text-[10px] text-anthracite-400 uppercase tracking-wide">btle</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card group animate-slide-up overflow-hidden hover:border-gold-500/20">
      {/* Bottle visual strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${bottleColor} 0%, ${bottleColor}88 100%)` }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <button
              onClick={() => onSelect?.(wine)}
              className="font-serif text-base font-semibold text-anthracite-900 hover:text-wine-800 transition-colors text-left leading-snug cursor-pointer"
            >
              {wine.name}
            </button>
            <div className="text-xs text-anthracite-500 mt-0.5 truncate">{wine.domain}</div>
          </div>
          {wine.rating && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star size={11} className="text-gold-500 fill-gold-500" />
              <span className="text-xs font-semibold text-gold-600">{wine.rating}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <TypeBadge type={wine.type} />
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-anthracite-100 text-anthracite-700">
            {wine.vintage}
          </span>
          {wine.appellation && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-anthracite-50 text-anthracite-600 border border-anthracite-200">
              {wine.appellation}
            </span>
          )}
        </div>

        {/* Drinking window */}
        <DrinkingWindow wine={wine} />

        {/* Info row */}
        <div className="flex items-center gap-3 mt-3 text-xs text-anthracite-400">
          {wine.serviceTemp && (
            <span className="flex items-center gap-1">
              <Thermometer size={10} />
              {wine.serviceTemp}°C
            </span>
          )}
          {wine.carafage && (
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {wine.carafage}
            </span>
          )}
          {wine.region && (
            <span className="ml-auto text-anthracite-400">{wine.region}</span>
          )}
        </div>

        <div className="divider-gold" />

        {/* Quantity + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onUpdateQty?.(wine, -1) }}
              disabled={wine.quantity <= 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-anthracite-200 text-anthracite-600 hover:border-wine-300 hover:text-wine-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Retirer une bouteille"
            >
              <Minus size={11} />
            </button>
            <div className="text-center min-w-[2.5rem]">
              <div className="text-base font-semibold text-anthracite-900">{wine.quantity}</div>
              <div className="text-[9px] text-anthracite-400 uppercase tracking-wide">btle</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onUpdateQty?.(wine, +1) }}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-anthracite-200 text-anthracite-600 hover:border-wine-300 hover:text-wine-700 transition-all cursor-pointer"
              aria-label="Ajouter une bouteille"
            >
              <Plus size={11} />
            </button>
          </div>

          {wine.estimatedValue && (
            <div className="text-sm font-semibold text-gold-600">
              {wine.estimatedValue}€
              <span className="text-[9px] text-anthracite-400 font-normal ml-1">/btle</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(wine) }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-anthracite-400 hover:text-wine-700 hover:bg-wine-50 transition-all cursor-pointer"
              aria-label="Modifier"
            >
              <Edit2 size={13} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(wine.id) }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-anthracite-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              aria-label="Supprimer"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
