import { useMemo, useState } from 'react'
import { Sparkles, TrendingUp, MapPin, Wine, Euro, ArrowRight, Lightbulb } from 'lucide-react'
import { computeProfilAppris, recommandationsProfil } from '../data/goutsAppris'
import JaugesGout from './JaugesGout'
import WineTile from './WineTile'
import { FicheVin } from './BibliothequeView'

// ═══════════════════════════════════════════════════════════════════════════
// ProfilGout — « Mon goût ». Le profil appris (dégustations notées + décisions
// d'achat en rayon + notes de cave) rendu VISIBLE : couleurs de prédilection,
// jauges aimées, régions favorites, arômes, budget réel — puis des
// recommandations proactives de vins à découvrir, choisis pour ce profil.
// ═══════════════════════════════════════════════════════════════════════════

const TYPE_NOMS = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }
const TYPE_COULEURS = { red: '#8c2f39', white: '#c9a84c', 'rosé': '#e58f8f', sweet: '#b8860b', sparkling: '#5b8db8' }

function Puce({ children, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-carte border border-anthracite-200"
      style={color ? { borderColor: color + '55', color } : undefined}
    >
      {children}
    </span>
  )
}

export default function ProfilGout({ onOpenBibliotheque }) {
  const [fiche, setFiche] = useState(null)
  const profil = useMemo(() => computeProfilAppris(), [])
  const { vins: recos } = useMemo(() => recommandationsProfil(4), [])

  // Pas encore assez de signal : on invite à nourrir le profil.
  if (!profil) {
    return (
      <div className="text-center py-14 animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={22} className="text-gold-700" />
        </div>
        <div className="font-serif text-lg font-bold text-anthracite-900 mb-1.5">Votre profil de goût se construit</div>
        <p className="text-xs text-anthracite-500 max-w-xs mx-auto leading-relaxed">
          Notez 3 dégustations dans « Mémoires de Vin », ou scannez des vins en rayon avec « J'achète / Je n'achète pas » :
          Œno déduira vos goûts réels et vous proposera des vins faits pour vous.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* En-tête */}
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-gold-700 mb-1">
          <TrendingUp size={12} /> Appris de {profil.nbDegustations} signal{profil.nbDegustations > 1 ? 's' : ''}
        </div>
        <h3 className="font-serif text-xl font-bold text-anthracite-900">Votre goût, décodé</h3>
        <p className="text-xs text-anthracite-500 mt-1">Déduit de vos notes de dégustation et de vos choix en rayon.</p>
      </div>

      {/* Cartes du profil */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Couleurs */}
        <div className="card p-4">
          <div className="flex items-center gap-2 text-[11px] font-bold text-anthracite-700 mb-3"><Wine size={13} className="text-wine-texte" /> Vos couleurs</div>
          <div className="flex flex-wrap gap-2">
            {profil.typesPreferes.length ? profil.typesPreferes.map(t => (
              <Puce key={t} color={TYPE_COULEURS[t]}>
                <span className="w-2 h-2 rounded-full" style={{ background: TYPE_COULEURS[t] }} />
                {TYPE_NOMS[t] || t}
              </Puce>
            )) : <span className="text-xs text-anthracite-400">Pas encore de tendance</span>}
          </div>
          {profil.typesBoudes.length > 0 && (
            <div className="text-[11px] text-anthracite-400 mt-2.5">Moins pour vous : {profil.typesBoudes.map(t => TYPE_NOMS[t] || t).join(', ')}</div>
          )}
        </div>

        {/* Jauges aimées */}
        {profil.jauges && (
          <div className="card p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-anthracite-700 mb-3"><Sparkles size={13} className="text-gold-600" /> Le style qui vous parle</div>
            <JaugesGout jauges={profil.jauges} compact />
          </div>
        )}

        {/* Régions */}
        {profil.regionsFavorites.length > 0 && (
          <div className="card p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-anthracite-700 mb-3"><MapPin size={13} className="text-wine-texte" /> Vos régions</div>
            <div className="flex flex-wrap gap-2">
              {profil.regionsFavorites.map(r => <Puce key={r}>{r}</Puce>)}
            </div>
          </div>
        )}

        {/* Arômes + budget */}
        <div className="card p-4">
          {profil.famillesAromes.length > 0 && (
            <>
              <div className="flex items-center gap-2 text-[11px] font-bold text-anthracite-700 mb-3"><Sparkles size={13} className="text-gold-600" /> Vos arômes</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {profil.famillesAromes.map(f => <Puce key={f.id}>{f.label}</Puce>)}
              </div>
            </>
          )}
          {profil.prix && (
            <div className="flex items-center gap-2 text-[11px] text-anthracite-600">
              <Euro size={13} className="text-gold-600" />
              Budget habituel : <span className="font-bold text-anthracite-900">{profil.prix.min}–{profil.prix.max} €</span>
              <span className="text-anthracite-400">(moy. {profil.prix.moyen} €)</span>
            </div>
          )}
        </div>
      </div>

      {/* Recommandations proactives */}
      {recos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={15} className="text-gold-600" />
            <h4 className="font-serif text-lg font-bold text-anthracite-900">À découvrir, rien que pour vous</h4>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {recos.map(({ wine, raison }, i) => (
              <div key={wine.id} className="flex flex-col">
                <WineTile wine={wine} variant="compact" index={i} onOpen={() => setFiche(wine)} showEnvie={false} />
                <div className="text-[10px] text-gold-700 font-semibold mt-1.5 px-1 flex items-center gap-1">
                  <Sparkles size={9} /> {raison}
                </div>
              </div>
            ))}
          </div>
          {onOpenBibliotheque && (
            <button
              onClick={onOpenBibliotheque}
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-wine-texte hover:gap-2.5 transition-all cursor-pointer"
            >
              Explorer toute la bibliothèque <ArrowRight size={12} />
            </button>
          )}
        </div>
      )}

      {fiche && <FicheVin wine={fiche} onClose={() => setFiche(null)} />}
    </div>
  )
}
