import { Wine, Star, Clock, Thermometer, Edit2, Trash2, Plus, Minus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { tintStyle, pastilleStyle, regionMonogram } from '../lib/wineStyle'
import { MiniVerre } from './WineGlassAnim'

const TYPE_CONFIG = {
  red:       { label: 'Rouge',       color: '#72102a', cls: 'border-wine-800/25 text-wine-800',   dot: 'bg-wine-700' },
  white:     { label: 'Blanc',       color: '#b8962a', cls: 'border-gold-600/30 text-gold-700',   dot: 'bg-gold-500' },
  rosé:      { label: 'Rosé',        color: '#e45872', cls: 'border-pink-700/25 text-pink-800',   dot: 'bg-pink-400' },
  sparkling: { label: 'Effervescent',color: '#3b82f6', cls: 'border-blue-700/25 text-blue-800',   dot: 'bg-blue-400' },
  sweet:     { label: 'Liquoreux',   color: '#92400e', cls: 'border-amber-800/30 text-amber-900', dot: 'bg-amber-700' },
}

// Étoile discrète « favori » : remplie or quand actif, pop au clic (comme le cœur envies)
export function FavoriStar({ wine, onToggle, size = 14, light = false, className = '' }) {
  const [pop, setPop] = useState(false)
  useEffect(() => {
    if (!pop) return undefined
    const t = setTimeout(() => setPop(false), 350)
    return () => clearTimeout(t)
  }, [pop])
  if (!onToggle) return null
  const active = !!wine.favori
  const toggle = e => {
    e.stopPropagation()
    e.preventDefault()
    if (!active) setPop(true)
    onToggle(wine)
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={active ? 'Retirer de vos préférés' : 'Ajouter à vos préférés'}
      aria-pressed={active}
      title={active ? 'Dans vos préférés' : 'Ajouter à vos préférés'}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
        light ? 'bg-white/20 hover:bg-white/35' : 'hover:bg-gold-500/10'
      } ${className}`}
    >
      <Star
        size={size}
        strokeWidth={1.8}
        fill={active ? '#c9a84c' : 'none'}
        className={`${pop ? 'envie-pop' : ''} ${active ? 'text-gold-500' : light ? 'text-cream' : 'text-anthracite-300 hover:text-gold-500'}`}
      />
    </button>
  )
}

function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.red
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] border ${cfg.cls}`}>
      <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function DrinkingWindow({ wine }) {
  const now = new Date().getFullYear()
  const start = wine.vintage + (wine.drinkFrom || 2)
  const end   = wine.vintage + (wine.drinkUntil || 8)

  if (now < start)  return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border border-blue-700/25 text-blue-800">Trop jeune · {start - now} ans</span>
  if (now > end)    return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border border-anthracite-900/15 text-anthracite-500">Passé l'apogée</span>
  return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border border-emerald-800/25 text-emerald-800">À boire · jusqu'à {end}</span>
}

export default function WineCard({ wine, onSelect, onEdit, onDelete, onUpdateQty, onToggleFavori, compact = false }) {
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
        className="card card-tinted p-5 cursor-pointer hover:border-anthracite-900/20 hover:-translate-y-0.5 active:scale-[0.98] group animate-fade-in"
        style={tintStyle(wine.type)}
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
            <div className="font-wine-name text-2xl text-anthracite-900 leading-tight line-clamp-2 whitespace-normal">{wine.name}</div>
            <div className="text-xs text-anthracite-500 truncate">{wine.domain}</div>
            <div className="flex items-center gap-2 mt-1">
              <TypeBadge type={wine.type} />
              <span className="text-xs text-anthracite-400">{wine.vintage}</span>
            </div>
          </div>
          <FavoriStar wine={wine} onToggle={onToggleFavori} className="flex-shrink-0" />
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-semibold text-anthracite-900">{wine.quantity}</div>
            <div className="text-[10px] text-anthracite-400 uppercase tracking-wide">btle</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="etiquette group animate-slide-up overflow-hidden hover:-translate-y-0.5" style={tintStyle(wine.type)}>
      <div className="p-5">
        {/* En-tête d'étiquette : pastille robe + type, monogramme de région */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full ring-1 ring-anthracite-900/10 flex-shrink-0" style={pastilleStyle(wine.type)} aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-anthracite-500">{cfg.label}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <FavoriStar wine={wine} onToggle={onToggleFavori} className="-mr-1" />
            <MiniVerre color={cfg.color} fillLevel={Math.min(1, 0.35 + wine.quantity * 0.06)} size={13} hoverFill />
            {wine.region && (
              <span className="medaillon" title={wine.region}>{regionMonogram(wine.region)}</span>
            )}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <button
              onClick={() => onSelect?.(wine)}
              className="font-wine-name text-3xl text-anthracite-900 hover:text-wine-800 transition-colors text-left cursor-pointer"
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
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] border border-anthracite-900/15 text-anthracite-600">
            {wine.vintage}
          </span>
          {wine.appellation && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] border border-anthracite-900/15 text-anthracite-500">
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
              className="w-7 h-7 flex items-center justify-center rounded-full border border-anthracite-900/15 text-anthracite-600 hover:border-anthracite-900/40 hover:text-anthracite-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
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
              className="w-7 h-7 flex items-center justify-center rounded-full border border-anthracite-900/15 text-anthracite-600 hover:border-anthracite-900/40 hover:text-anthracite-950 transition-all cursor-pointer"
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
              className="w-8 h-8 flex items-center justify-center rounded-full text-anthracite-400 hover:text-wine-800 hover:bg-wine-50 transition-all cursor-pointer"
              aria-label="Modifier"
            >
              <Edit2 size={13} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(wine.id) }}
              className="w-8 h-8 flex items-center justify-center rounded-full text-anthracite-400 hover:text-red-700 hover:bg-red-50 transition-all cursor-pointer"
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
