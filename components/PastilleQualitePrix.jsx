import { rapportQualitePrix, tonJeton } from '../data/wineDatabase'

// ─────────────────────────────────────────────────────────────────────────────
// PastilleQualitePrix — le rapport qualité/prix d'un vin, en un coup d'œil.
// Vert (excellent/très bon), orange (correct), rouge (premium/prestige).
// `compact` pour les cartes, complet pour la fiche. Aide à choisir en rayon.
// ─────────────────────────────────────────────────────────────────────────────
export default function PastilleQualitePrix({ wine, compact = false, className = '' }) {
  const qp = rapportQualitePrix(wine)
  if (!qp) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]'
      } ${className}`}
      style={tonJeton(qp.jeton, { fond: 0.13, bordure: 0.3 })}
      title={`${qp.niveau} — repère pour vous aider à choisir`}
    >
      <span className="rounded-full flex-shrink-0" style={{ width: compact ? 6 : 8, height: compact ? 6 : 8, background: `rgb(var(${qp.jeton}))` }} />
      {compact ? qp.court : qp.niveau}
    </span>
  )
}
