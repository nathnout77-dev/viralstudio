import { useState } from 'react'
import { Utensils, UtensilsCrossed, Coins, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

// Vues lourdes : elles embarquent le catalogue national (~45 Ko une fois
// compressé). Chargées à l'ouverture de l'outil, jamais au démarrage.
const SommelierForm = dynamic(() => import('./SommelierForm'), { ssr: false })
const CeSoirMode    = dynamic(() => import('./CeSoirMode'), { ssr: false })

// ─────────────────────────────────────────────────────────────────────────────
// ParcoursVin — l'entonnoir unique « Je cherche un vin ». Une seule porte
// d'entrée qui pose LA bonne question (« quelle est votre situation ? »)
// puis route vers l'outil existant adapté : Ce soir ? (plat immédiat),
// Mode Dîner (repas complet), Budget caviste, ou Goût-o-mètre (profil).
// Les 4 outils sont réutilisés tels quels — seul le chemin change.
// ─────────────────────────────────────────────────────────────────────────────

const SITUATIONS = [
  {
    id: 'cesoir',
    titre: 'Je bois ce soir, avec un plat',
    texte: 'Dites-nous le plat, on vous donne 3 bouteilles tout de suite.',
    Icon: Utensils,
  },
  {
    id: 'diner',
    titre: 'Je compose un repas complet',
    texte: 'Entrée, plat, dessert — le menu des vins comme au restaurant.',
    Icon: UtensilsCrossed,
  },
  {
    id: 'budget',
    titre: 'J’ai un budget, surprenez-moi',
    texte: 'On compose la sélection comme un bon caviste, à l’euro près.',
    Icon: Coins,
  },
  {
    id: 'quiz',
    titre: 'Trouvez mon profil de goût',
    texte: '6 questions du quotidien — zéro jargon — et 5 vins rien que pour vous.',
    Icon: Sparkles,
  },
]

export default function ParcoursVin({ mode, onOpenBibliotheque }) {
  const [choix, setChoix] = useState(null)
  const [showCeSoir, setShowCeSoir] = useState(false)

  const choisir = (id) => {
    if (id === 'cesoir') { setShowCeSoir(true); return }
    // Les 3 autres outils vivent dans SommelierForm : on pré-sélectionne
    // l'outil via le canal sessionStorage qu'il lit déjà à son montage.
    try { sessionStorage.setItem('oeno-sommelier-tool', id) } catch { /* ignore */ }
    setChoix(id)
  }

  // Étape 2 : l'outil choisi, avec retour possible vers le choix de situation
  if (choix) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setChoix(null)}
          className="flex items-center gap-1.5 text-xs font-semibold text-anthracite-500 hover:text-anthracite-900 transition-colors cursor-pointer mb-5"
        >
          <ChevronLeft size={14} />
          Changer de situation
        </button>
        {/* key force le remontage : SommelierForm relit l'outil pré-sélectionné */}
        <SommelierForm key={choix} onOpenBibliotheque={onOpenBibliotheque} />
      </div>
    )
  }

  // Étape 1 : la question d'entrée
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-3xl items-center justify-center shadow-wine mb-3"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <Sparkles size={22} className="text-gold-400" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-anthracite-900">Quelle est votre situation ?</h2>
        <p className="text-sm text-anthracite-500 mt-1">
          Une réponse suffit — on vous emmène directement au bon endroit.
        </p>
      </div>

      <div className="space-y-3">
        {SITUATIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => choisir(s.id)}
            className="card w-full p-5 text-left group flex items-center gap-4 hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <s.Icon size={20} className="text-wine-texte" strokeWidth={1.7} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-base font-bold text-anthracite-900">{s.titre}</div>
              <p className="text-xs text-anthracite-500 mt-0.5 leading-relaxed">{s.texte}</p>
            </div>
            <ArrowRight size={16} className="text-anthracite-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </button>
        ))}
      </div>

      {showCeSoir && (
        <CeSoirMode
          mode={mode}
          onClose={() => setShowCeSoir(false)}
          onOpenBibliotheque={onOpenBibliotheque}
        />
      )}
    </div>
  )
}
