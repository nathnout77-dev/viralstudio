import { useState, useMemo } from 'react'
import { X, RefreshCw, Sparkles, ChevronLeft, GraduationCap } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import { computeProfilAppris, bonusProfilAppris } from '../data/goutsAppris'
import { diversifyByRegion, getRegionsPref } from '../lib/suggestions'
import RegionsPrefFilter from './RegionsPrefFilter'
import useModalBehavior from '../lib/useModal'
import { FicheVin } from './BibliothequeView'
import WineTile from './WineTile'

// ═══════════════════════════════════════════════════════════════════════════
// « Ce soir, je bois quoi ? » — 5 questions guidées → le meilleur vin pour vous
// ═══════════════════════════════════════════════════════════════════════════

const QUESTIONS = [
  {
    id: 'plat',
    q: 'Vous mangez quoi ce soir ?',
    options: [
      { emoji: '🥩', label: 'Viande rouge',        v: 'viande_rouge' },
      { emoji: '🍗', label: 'Viandes blanches',    v: 'viande_blanche' },
      { emoji: '🐟', label: 'Poisson / fruits de mer', v: 'poisson' },
      { emoji: '🍝', label: 'Pâtes / pizza',       v: 'pates' },
      { emoji: '🧀', label: 'Fromage / raclette',  v: 'fromage' },
      { emoji: '🥗', label: 'Végétarien / léger',  v: 'vege' },
      { emoji: '🔥', label: 'Grillades / barbecue', v: 'grillades' },
      { emoji: '🥜', label: 'Juste l\'apéro',      v: 'apero' },
    ],
  },
  {
    id: 'couleur',
    q: 'Une envie de couleur ?',
    options: [
      { emoji: '🍷', label: 'Rouge',       v: 'red' },
      { emoji: '🥂', label: 'Blanc',       v: 'white' },
      { emoji: '🌸', label: 'Rosé',        v: 'rosé' },
      { emoji: '🎲', label: 'Peu importe, surprenez-moi', v: 'any' },
    ],
  },
  {
    id: 'style',
    q: 'Et niveau goût, ce soir vous êtes plutôt…',
    options: [
      { emoji: '🪶', label: 'Léger et frais',      v: 'leger' },
      { emoji: '⚖️', label: 'Équilibré',            v: 'equilibre' },
      { emoji: '💪', label: 'Puissant, du caractère', v: 'puissant' },
      { emoji: '🍯', label: 'Doux et gourmand',    v: 'doux' },
    ],
  },
  {
    id: 'budget',
    q: 'Votre budget pour cette bouteille ?',
    options: [
      { emoji: '🪙', label: '3 à 10 €',       v: 10 },
      { emoji: '💶', label: '10 à 20 €',      v: 20 },
      { emoji: '💰', label: '20 à 50 €',      v: 50 },
      { emoji: '👑', label: 'Pas de limite',  v: 9999 },
    ],
  },
  {
    id: 'occasion',
    q: 'C\'est pour quelle occasion ?',
    options: [
      { emoji: '🛋️', label: 'Soirée tranquille',      v: 'tranquille' },
      { emoji: '👥', label: 'Des invités à impressionner', v: 'invites' },
      { emoji: '❤️', label: 'Un moment spécial',      v: 'special' },
      { emoji: '🎉', label: 'Ça fait la fête',        v: 'fete' },
    ],
  },
]

const PLAT_TYPES = {
  viande_rouge:   ['red'],
  viande_blanche: ['white', 'red'],
  poisson:        ['white', 'rosé'],
  pates:          ['red', 'rosé'],
  fromage:        ['white', 'red'],
  vege:           ['white', 'rosé', 'red'],
  grillades:      ['red', 'rosé'],
  apero:          ['white', 'rosé', 'sparkling'],
}

// Question conditionnelle : quand une viande est choisie, on précise laquelle.
const VIANDE_QUESTION = {
  viande_rouge: {
    id: 'viande',
    q: 'Laquelle, précisément ?',
    options: [
      { emoji: '🐂', label: 'Bœuf',            v: 'boeuf' },
      { emoji: '🐑', label: 'Agneau',          v: 'agneau' },
      { emoji: '🦌', label: 'Gibier',          v: 'gibier' },
      { emoji: '🦆', label: 'Canard / magret', v: 'canard' },
      { emoji: '🍖', label: 'Un peu de tout',  v: 'tout' },
    ],
  },
  viande_blanche: {
    id: 'viande',
    q: 'Laquelle, précisément ?',
    options: [
      { emoji: '🐔', label: 'Poulet / volaille', v: 'poulet' },
      { emoji: '🐄', label: 'Veau',             v: 'veau' },
      { emoji: '🐖', label: 'Porc',             v: 'porc' },
      { emoji: '🐇', label: 'Lapin',            v: 'lapin' },
      { emoji: '🍖', label: 'Un peu de tout',   v: 'tout' },
    ],
  },
}

// Affinage par viande précise : mots-clés cherchés dans les accords du vin
// + orientation de jauges (le bonus pèse sans écraser les autres critères).
const VIANDE_AFFINAGE = {
  boeuf:  { accords: /bœuf|boeuf|entrecôte|côte de|daube|steak|viandes? grillées|viandes? rouges?/i, jauges: w => (w.jauges.puissance >= 3 ? 2 : -1) },
  agneau: { accords: /agneau/i,                     jauges: w => (w.jauges.puissance >= 3 && w.jauges.tanins >= 3 ? 2 : 0) },
  gibier: { accords: /gibier|chevreuil|sanglier/i,  jauges: w => (w.jauges.puissance >= 4 ? 2 : w.jauges.puissance <= 2 ? -2 : 0) },
  canard: { accords: /canard|magret/i,              jauges: w => (w.jauges.puissance >= 3 ? 1.5 : 0) },
  poulet: { accords: /volaille|poulet/i,            jauges: w => (w.jauges.puissance <= 3 ? 1.5 : -1) },
  veau:   { accords: /veau|blanquette|volaille/i,   jauges: w => (w.jauges.tanins <= 3 ? 1.5 : -1) },
  porc:   { accords: /porc|charcuterie|cochon/i,    jauges: w => (w.jauges.puissance <= 3 && w.jauges.tanins <= 3 ? 1.5 : 0) },
  lapin:  { accords: /lapin|volaille/i,             jauges: w => (w.jauges.puissance <= 3 ? 1.5 : -1) },
}

function score(w, a, mode) {
  let s = 0
  // Plat
  const types = PLAT_TYPES[a.plat] || ['red', 'white', 'rosé']
  if (!types.includes(w.type)) s -= 15
  else if (w.type === types[0]) s += 3

  // Grillades : privilégier les vins dont les accords parlent de grillades/barbecue
  if (a.plat === 'grillades') {
    const accords = (w.accords || []).join(' ')
    if (/grill|barbecue|entrecôte|côte de bœuf|magret|viandes? rouges?/i.test(accords)) s += 4
    if (w.type === 'red' && w.jauges.puissance >= 3 && w.jauges.puissance <= 4) s += 1.5
  }

  // Viande précise (question conditionnelle après viande rouge / blanche)
  if (a.viande && a.viande !== 'tout' && VIANDE_AFFINAGE[a.viande]) {
    const aff = VIANDE_AFFINAGE[a.viande]
    if (aff.accords.test((w.accords || []).join(' '))) s += 4
    s += aff.jauges(w)
  }

  // Couleur explicite
  if (a.couleur !== 'any') {
    if (w.type === a.couleur) s += 5
    else if (a.couleur === 'white' && w.type === 'sweet') s += 1
    else s -= 10
  }

  // Style ↔ jauges
  if (a.style === 'leger')     s += (6 - w.jauges.puissance) + (6 - w.jauges.tanins) * 0.5
  if (a.style === 'puissant')  s += w.jauges.puissance + w.jauges.tanins * 0.5
  if (a.style === 'equilibre') s += 4 - Math.abs(w.jauges.puissance - 3)
  if (a.style === 'doux')      s += w.jauges.douceur * 1.5

  // Budget
  if (w.prixMoyen > a.budget) s -= 20
  else if (w.prixMoyen > a.budget * 0.4) s += 2 // profiter du budget

  // Occasion
  if (a.occasion === 'invites' && w.prixMoyen >= 20) s += 2
  if (a.occasion === 'special' && ['explorer', 'pointu'].includes(w.difficulte)) s += 2
  if (a.occasion === 'tranquille' && w.difficulte === 'facile') s += 2
  if (a.occasion === 'fete' && ['sparkling', 'rosé'].includes(w.type)) s += 3

  // Mode global (profil utilisateur)
  if (mode === 'debutant') {
    if (w.difficulte === 'facile') s += 3
    if (w.difficulte === 'pointu') s -= 4
  } else if (mode === 'expert') {
    if (w.difficulte !== 'facile') s += 1.5
  }

  return s
}

const N_RESULTS = 5

export default function CeSoirMode({ onClose, onOpenBibliotheque, mode }) {
  useModalBehavior(onClose)
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone]       = useState(false)
  const [regionsPref, setRegionsPrefState] = useState(() => getRegionsPref())
  const [wineSelected, setWineSelected] = useState(null)
  // Profil appris des dégustations : bonus doux (~30 %), n'écrase pas le quiz.
  const profilAppris = useMemo(() => computeProfilAppris(), [])
  const isConnaisseur = mode === 'expert'

  // Liste dynamique : la question « Laquelle, précisément ? » s'insère juste
  // après le plat quand une viande (rouge ou blanche) est choisie.
  const questions = useMemo(() => {
    const viandeQ = VIANDE_QUESTION[answers.plat]
    return viandeQ ? [QUESTIONS[0], viandeQ, ...QUESTIONS.slice(1)] : QUESTIONS
  }, [answers.plat])

  const current = questions[step]

  // Résultats recalculés à chaque changement de réponses ou de régions préférées
  const results = useMemo(() => {
    if (!done) return null
    const activeRegions = isConnaisseur ? regionsPref : []
    const pool = activeRegions.length ? WINE_DB.filter(w => activeRegions.includes(w.region)) : WINE_DB
    const scored = pool
      .map(w => ({ w, s: score(w, answers, mode) + bonusProfilAppris(w, profilAppris, 0.5) }))
      .sort((a, b) => b.s - a.s)
    let filtered = scored.filter(x => x.s > -5)
    if (filtered.length < N_RESULTS) filtered = scored // fallback : garantir toujours 5 vins
    return diversifyByRegion(filtered, N_RESULTS) // jamais deux vins de la même région
  }, [done, answers, mode, profilAppris, regionsPref, isConnaisseur])

  const criteresFor = (w) => ({
    plat: answers.plat, viande: answers.viande, style: answers.style, budget: answers.budget,
    occasion: answers.occasion, niveau: mode, profilAppris: !!profilAppris,
    regionPref: isConnaisseur && regionsPref.includes(w.region),
  })

  const select = (v) => {
    const next = { ...answers, [current.id]: v }
    // Changer de plat purge la précision de viande devenue obsolète
    if (current.id === 'plat' && v !== answers.plat) delete next.viande
    setAnswers(next)
    const total = VIANDE_QUESTION[current.id === 'plat' ? v : next.plat]
      ? QUESTIONS.length + 1
      : QUESTIONS.length
    if (step < total - 1) {
      setTimeout(() => setStep(s => s + 1), 180)
    } else {
      setDone(true)
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setDone(false) }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Ce soir, je bois quoi ?"
    >
      <div
        className="modal-panel sm:max-w-lg max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="absolute -top-6 -right-4 text-[100px] opacity-10 select-none leading-none">🍽️</div>
          <div className="relative flex items-start justify-between">
            <div>
              <span className="eyebrow-dark mb-2">Sommelier express</span>
              <h3 className="font-serif text-2xl font-medium">Ce soir, je bois quoi ?</h3>
              <p className="text-cream/70 text-sm mt-1">
                {results ? `Vos ${results.length} vins, choisis pour vous.` : 'Quelques questions → le vin parfait pour votre soirée.'}
              </p>
            </div>
            <button onClick={onClose}
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
                    aria-label="Fermer">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!results ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {questions.map((_, i) => (
                  <span key={i} className="rounded-full transition-all duration-300"
                        style={{ width: i === step ? 24 : 7, height: 7,
                                 background: i <= step ? '#5c0d22' : '#e7e5e4' }} />
                ))}
              </div>

              <div key={step} className="animate-slide-up">
                <h4 className="font-serif text-lg font-bold text-anthracite-900 text-center mb-5">
                  {current.q}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {current.options.map((o, i) => (
                    <button
                      key={o.label}
                      onClick={() => select(o.v)}
                      className={`choice-btn p-4 text-center animate-scale-in ${
                        answers[current.id] === o.v ? 'selected' : ''
                      }`}
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="text-2xl mb-1.5">{o.emoji}</div>
                      <div className="text-xs font-semibold leading-snug">{o.label}</div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)}
                          className="mt-5 mx-auto flex items-center gap-1 text-xs text-anthracite-400 hover:text-anthracite-700 cursor-pointer">
                    <ChevronLeft size={12} /> Question précédente
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {profilAppris && (
                <div className="flex items-center gap-1.5 text-[11px] text-gold-700 font-semibold">
                  <GraduationCap size={12} />
                  Affiné par vos {profilAppris.nbDegustations} dégustations notées
                </div>
              )}
              <div className="flex items-center justify-end mb-1">
                <button onClick={reset} className="text-xs text-wine-700 hover:text-wine-800 cursor-pointer flex items-center gap-1 font-semibold">
                  <RefreshCw size={11} /> Recommencer
                </button>
              </div>

              {isConnaisseur && (
                <RegionsPrefFilter selected={regionsPref} onChange={setRegionsPrefState} />
              )}

              {results.length === 0 && (
                <p className="text-center text-sm text-anthracite-500 py-8">
                  Aucun vin ne colle parfaitement — essayez avec un budget plus large !
                </p>
              )}

              {results.map((w, i) => (
                <WineTile
                  key={w.id}
                  wine={w}
                  variant="compact"
                  index={i}
                  onOpen={setWineSelected}
                  showRaison
                  raisonCriteres={criteresFor(w)}
                  showBadgeCoupDeCoeur
                  coupDeCoeurLabel="Notre coup de cœur pour ce soir"
                  nameClass="font-serif text-sm font-bold text-anthracite-900"
                  className={i === 0 ? 'ring-1 ring-gold-600/60' : ''}
                />
              ))}

              {results.length > 0 && (
                <button
                  onClick={() => { onClose(); onOpenBibliotheque?.() }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                >
                  <Sparkles size={14} />
                  Voir les fiches complètes dans la Bibliothèque
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {wineSelected && (
        <FicheVin wine={wineSelected} onClose={() => setWineSelected(null)} />
      )}
    </div>
  )
}
