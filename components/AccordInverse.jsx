import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChefHat, Utensils, Thermometer, Clock, Lightbulb } from 'lucide-react'
import { recettesFor } from '../data/recettes'
import useModalBehavior from '../lib/useModal'

// ═══════════════════════════════════════════════════════════════════════════
// Accord inversé — « J'ai cette bouteille, je cuisine quoi ? »
// Panneau élégant listant les plats du vin, enrichis d'idées de recettes
// concrètes + conseil de service. Rendu en portal (au-dessus de tout).
// ═══════════════════════════════════════════════════════════════════════════

export default function AccordInverse({ wine, onClose }) {
  useModalBehavior(onClose)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || !wine) return null

  const conseilService = [
    `Servez-le à ${wine.temperature}`,
    wine.carafage
      ? `et pensez à le carafer ${wine.carafage.toLowerCase().includes('min') || wine.carafage.toLowerCase().includes('h') ? wine.carafage + ' avant' : '(' + wine.carafage + ')'} — il n'en sera que meilleur`
      : 'pas besoin de carafe, il s\'ouvre tout seul',
  ].join(', ') + '.'

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Que cuisiner avec ce vin ?"
    >
      <div
        className="modal-panel sm:max-w-xl max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
          style={{ background: `linear-gradient(150deg, ${wine.color} 0%, ${wine.color}cc 55%, #1e2426 145%)` }}
        >
          <div className="absolute -top-6 -right-4 opacity-10 select-none leading-none">
            <ChefHat size={110} strokeWidth={1} />
          </div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="eyebrow-dark mb-1.5 block">Accord inversé</span>
              <h3 className="font-serif text-2xl font-medium">Que cuisiner avec…</h3>
              <p className="font-wine-name text-4xl mt-1 text-cream">{wine.appellation}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Conseil de service */}
          <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgb(var(--anth-100))' }}>
            <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
              <Thermometer size={13} className="text-wine-700" />
              {wine.carafage && <Clock size={13} className="text-wine-700" />}
            </div>
            <p className="text-sm text-anthracite-700 leading-relaxed">
              <span className="font-semibold text-anthracite-900">Avant de passer à table : </span>
              {conseilService}
            </p>
          </div>

          {/* Plats + idées de recettes */}
          {wine.accords.map((plat, i) => (
            <div
              key={plat}
              className="card p-4 animate-fade-in-up"
              style={{ animationDelay: `${Math.min(i * 70, 400)}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${wine.color}18` }}
                >
                  <Utensils size={14} style={{ color: wine.color }} />
                </div>
                <h4 className="font-serif text-base font-bold text-anthracite-900">{plat}</h4>
              </div>
              <ul className="space-y-2">
                {recettesFor(plat).map((idee, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-anthracite-600 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gold-500" />
                    {idee}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Petit mot final */}
          <div className="flex items-start gap-2.5 px-1 pb-2">
            <Lightbulb size={14} className="text-gold-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-anthracite-500 italic leading-relaxed">
              Pas besoin d'un plat compliqué : un bon produit, une cuisson simple, et laissez le vin faire la conversation.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
