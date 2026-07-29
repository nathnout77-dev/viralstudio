import { X, Check, ArrowRight, Sparkles } from 'lucide-react'
import useModalBehavior from '../lib/useModal'
import { COUVERTURE_VINS } from '../lib/vinsReferentiel'
import { COUVERTURE } from '../lib/referentiel'

// ═══════════════════════════════════════════════════════════════════════════
// « Œno, c'est quoi ? » — la page qui explique et qui vend.
//
// Chargée à la demande (jamais au démarrage) : elle embarque les chiffres de
// la base nationale, qui pèsent lourd. Tous les nombres affichés sont
// calculés depuis les données réelles — aucune promesse inventée.
// ═══════════════════════════════════════════════════════════════════════════

const BENEFICES = [
  {
    emoji: '📷',
    titre: 'Photographiez, on vous dit tout',
    texte: 'Une étiquette en rayon, et vous savez en trois secondes ce que vaut la bouteille, si le prix est juste et avec quoi la boire.',
  },
  {
    emoji: '🍽️',
    titre: 'Plus jamais bloqué devant le rayon',
    texte: 'Dites le plat du soir ou votre budget : Œno propose trois bouteilles précises, pas un catalogue à éplucher.',
  },
  {
    emoji: '🍾',
    titre: 'Votre cave, enfin tenue',
    texte: 'Ce que vous avez, ce qu\'il faut boire maintenant, ce qui peut attendre. Avec vos notes de dégustation.',
  },
  {
    emoji: '👥',
    titre: 'Le vin se partage',
    texte: 'Ouvrez votre cave à vos proches, discutez de vos trouvailles, et donnez-leur enfin des idées cadeaux qui tombent juste.',
  },
  {
    emoji: '🎓',
    titre: 'Sans jargon, jamais',
    texte: 'On explique « tanins » avant de l\'employer. Débutant assumé ou amateur curieux, l\'app s\'adapte à votre niveau.',
  },
  {
    emoji: '📡',
    titre: 'Marche même sans réseau',
    texte: 'Votre cave et le catalogue restent consultables dans un parking souterrain. Rien n\'est perdu si la connexion tombe.',
  },
]

// Ce que chaque palier apporterait. Aucune de ces limites n'est appliquée
// aujourd'hui : l'app est entière et gratuite.
const PALIERS = [
  {
    nom: 'Découverte',
    prix: 'Gratuit',
    detail: 'Aujourd\'hui, tout Œno',
    actuel: true,
    lignes: [
      'Catalogue complet des vins',
      'Scan d\'étiquette',
      'Cave et dégustations',
      'Amis et caves partagées',
      'Accords mets & vins',
    ],
  },
  {
    nom: 'Cave particulière',
    prix: 'À venir',
    detail: 'En préparation',
    actuel: false,
    lignes: [
      'Alertes d\'apogée par bouteille',
      'Valeur de cave suivie dans le temps',
      'Historique de dégustation illimité',
      'Export de la cave',
      'Assistant sans limite',
    ],
  },
]

function Stat({ valeur, libelle }) {
  return (
    <div className="text-center">
      <div className="font-serif text-2xl lg:text-3xl font-bold text-gold-400 leading-none">{valeur}</div>
      <div className="text-[9px] uppercase tracking-[0.14em] text-cream/55 mt-1.5">{libelle}</div>
    </div>
  )
}

export default function PitchOeno({ onClose, onCommencer }) {
  useModalBehavior(onClose)

  return (
    <div className="fixed inset-0 z-[85] overflow-y-auto bg-fond animate-fade-in">
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-xl text-anthracite-600 border border-anthracite-900/15 hover:text-anthracite-900 hover:border-anthracite-900/40 transition-all cursor-pointer"
        style={{ background: 'rgb(var(--fond) / 0.9)' }}
      >
        <X size={18} />
      </button>

      {/* Bandeau d'ouverture */}
      <header
        className="px-5 pt-16 pb-10 text-center text-cream"
        style={{ background: 'linear-gradient(160deg, #0C0A09 0%, #3a0616 55%, #5c0d22 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold-400 font-semibold mb-3">
            Le vin, sans intimidation
          </div>
          <h1 className="font-serif text-3xl lg:text-5xl font-bold leading-[1.1] mb-4">
            Choisir une bouteille<br />ne devrait pas faire peur.
          </h1>
          <p className="text-sm lg:text-base text-cream/70 leading-relaxed max-w-lg mx-auto mb-9">
            Œno lit les étiquettes à votre place, connaît {COUVERTURE_VINS.total} vins français
            et vous dit lequel ouvrir ce soir. En français clair.
          </p>

          <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto pt-7 border-t border-cream/10">
            <Stat valeur={COUVERTURE_VINS.total} libelle="vins" />
            <Stat valeur={COUVERTURE.appellations} libelle="appellations" />
            <Stat valeur={COUVERTURE.cepages} libelle="cépages" />
            <Stat valeur={COUVERTURE.crus} libelle="crus classés" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12">
        {/* Ce que ça change */}
        <div className="mb-4">
          <span className="eyebrow mb-1">Concrètement</span>
          <h2 className="section-title">Ce que Œno fait pour vous</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
          {BENEFICES.map((b, i) => (
            <div
              key={b.titre}
              className="card p-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <span className="text-2xl leading-none block mb-3" role="img" aria-hidden="true">{b.emoji}</span>
              <h3 className="font-serif text-base font-bold text-anthracite-900 mb-1.5">{b.titre}</h3>
              <p className="text-[12px] text-anthracite-500 leading-relaxed">{b.texte}</p>
            </div>
          ))}
        </div>

        {/* Honnêteté sur la donnée — c'est un argument, pas une note de bas de page */}
        <div className="rounded-3xl border border-gold-500/25 bg-carte p-6 mb-14">
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none flex-shrink-0" role="img" aria-hidden="true">📊</span>
            <div>
              <h3 className="font-serif text-base font-bold text-anthracite-900 mb-2">
                On vous dit toujours d'où vient l'information
              </h3>
              <p className="text-[12px] text-anthracite-500 leading-relaxed">
                {COUVERTURE_VINS.redigees} fiches sont écrites à la main.
                Les {COUVERTURE_VINS.referentiel} autres sont établies depuis la base viticole
                nationale, et l'annoncent clairement — prix relevé ou modélisé, la fiche le précise.
                Une estimation n'est jamais présentée comme une certitude.
              </p>
            </div>
          </div>
        </div>

        {/* Paliers */}
        <div className="mb-4">
          <span className="eyebrow mb-1">Et demain</span>
          <h2 className="section-title">Œno restera utile sans payer</h2>
          <p className="section-sub">
            Tout ce que vous voyez aujourd'hui est gratuit et le restera. Un abonnement
            viendra plus tard pour les caves qui grossissent — rien ne sera repris.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {PALIERS.map(p => (
            <div
              key={p.nom}
              className={`rounded-3xl p-6 border ${
                p.actuel
                  ? 'bg-carte border-gold-500/45 shadow-card'
                  : 'bg-anthracite-50/60 border-anthracite-900/[0.08]'
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif text-lg font-bold text-anthracite-900">{p.nom}</h3>
                {p.actuel && (
                  <span className="text-[9px] uppercase tracking-[0.14em] font-bold text-gold-700 bg-gold-500/12 px-2 py-1 rounded-full">
                    Actif
                  </span>
                )}
              </div>
              <div className="font-serif text-2xl font-bold text-wine-800 mb-0.5">{p.prix}</div>
              <div className="text-[11px] text-anthracite-400 mb-4">{p.detail}</div>
              <ul className="flex flex-col gap-2">
                {p.lignes.map(l => (
                  <li key={l} className="flex items-start gap-2 text-[12px] text-anthracite-600 leading-relaxed">
                    <Check size={13} className={p.actuel ? 'text-gold-600 flex-shrink-0 mt-0.5' : 'text-anthracite-300 flex-shrink-0 mt-0.5'} />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button onClick={onCommencer || onClose} className="btn-primary mx-auto">
          <Sparkles size={15} /> Commencer maintenant <ArrowRight size={15} />
        </button>
        <p className="text-center text-[11px] text-anthracite-400 mt-4">
          Aucune carte bancaire. Aucune publicité. Œno ne vend pas de vin et ne touche
          aucune commission sur vos achats.
        </p>
      </main>
    </div>
  )
}
