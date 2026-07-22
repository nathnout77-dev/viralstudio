import { ShoppingCart } from 'lucide-react'

// Pastille « Produit grand public » — affichée partout où un vin de grande
// distribution (flag grandPublic) ressort : résultats de quiz, fiche, millésimes,
// scan… pour que l'utilisateur sache d'emblée qu'il s'agit d'un vin de supermarché.
export default function BadgeGrandPublic({ className = '', compact = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold bg-anthracite-100 text-anthracite-600 border border-anthracite-900/10 ${compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]'} ${className}`}
      title="Vin de grande distribution (supermarché) — repère grand public"
    >
      <ShoppingCart size={compact ? 8 : 10} strokeWidth={2} />
      {compact ? 'Grand public' : 'Produit grand public'}
    </span>
  )
}
