import { useState } from 'react'
import { X, RefreshCw, Sparkles, ChevronLeft } from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import JaugesGout from './JaugesGout'

// ═══════════════════════════════════════════════════════════════════════════
// « Ce soir, je bois quoi ? » — 5 questions guidées → le meilleur vin pour vous
// ═══════════════════════════════════════════════════════════════════════════

const QUESTIONS = [
  {
    id: 'plat',
    q: 'Vous mangez quoi ce soir ?',
    options: [
      { emoji: '🥩', label: 'Viande rouge',        v: 'viande_rouge' },
      { emoji: '🍗', label: 'Poulet / volaille',   v: 'volaille' },
      { emoji: '🐟', label: 'Poisson / fruits de mer', v: 'poisson' },
      { emoji: '🍝', label: 'Pâtes / pizza',       v: 'pates' },
      { emoji: '🧀', label: 'Fromage / raclette',  v: 'fromage' },
      { emoji: '🥗', label: 'Végétarien / léger',  v: 'vege' },
      { emoji: '🍰', label: 'Un dessert',          v: 'dessert' },
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
      { emoji: '🪙', label: 'Moins de 10 €',  v: 10 },
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
  viande_rouge: ['red'],
  volaille:     ['white', 'red'],
  poisson:      ['white', 'rosé'],
  pates:        ['red', 'rosé'],
  fromage:      ['white', 'red'],
  vege:         ['white', 'rosé', 'red'],
  dessert:      ['sweet'],
  apero:        ['white', 'rosé', 'sparkling'],
}

function score(w, a, mode) {
  let s = 0
  // Plat
  const types = PLAT_TYPES[a.plat] || ['red', 'white', 'rosé']
  if (!types.includes(w.type)) s -= 15
  else if (w.type === types[0]) s += 3

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

function buildReason(w, a) {
  const bits = []
  const platLabels = {
    viande_rouge: 'votre viande rouge', volaille: 'la volaille', poisson: 'le poisson',
    pates: 'les pâtes', fromage: 'le fromage', vege: 'un repas léger',
    dessert: 'le dessert', apero: 'l\'apéro',
  }
  bits.push(`Parfait avec ${platLabels[a.plat] || 'votre repas'}`)
  if (a.style === 'leger') bits.push('léger et frais comme demandé')
  if (a.style === 'puissant') bits.push('du caractère, comme vous l\'aimez')
  if (a.style === 'doux') bits.push('la gourmandise que vous cherchez')
  if (a.occasion === 'invites') bits.push('de quoi impressionner vos invités')
  if (w.prixMoyen <= a.budget * 0.6) bits.push(`et il reste dans votre budget (~${w.prixMoyen}€)`)
  return bits.join(', ') + '.'
}

export default function CeSoirMode({ onClose, onOpenBibliotheque, mode }) {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const current = QUESTIONS[step]

  const select = (v) => {
    const next = { ...answers, [current.id]: v }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 180)
    } else {
      const top = WINE_DB
        .map(w => ({ w, s: score(w, next, mode) }))
        .filter(x => x.s > -5)
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .map(x => x.w)
      setResults(top)
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setResults(null) }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(30,25,20,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Ce soir, je bois quoi ?"
    >
      <div
        className="bg-cream w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[92vh] flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #5c0d22 0%, #8c2f39 100%)' }}>
          <div className="absolute -top-6 -right-4 text-[100px] opacity-10 select-none leading-none">🍽️</div>
          <div className="relative flex items-start justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold">Ce soir, je bois quoi ?</h3>
              <p className="text-cream/70 text-sm mt-1">
                {results ? 'Vos 3 vins, choisis pour vous.' : '5 petites questions → le vin parfait pour votre soirée.'}
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
                {QUESTIONS.map((_, i) => (
                  <span key={i} className="rounded-full transition-all duration-300"
                        style={{ width: i === step ? 24 : 7, height: 7,
                                 background: i <= step ? '#8c2f39' : '#e5e0d8' }} />
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
                      className={`card p-4 text-center hover:-translate-y-1 hover:border-wine-300 transition-all cursor-pointer animate-scale-in ${
                        answers[current.id] === o.v ? 'border-wine-700 bg-wine-50' : ''
                      }`}
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="text-2xl mb-1.5">{o.emoji}</div>
                      <div className="text-xs font-semibold text-anthracite-800 leading-snug">{o.label}</div>
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
              <div className="flex items-center justify-end mb-1">
                <button onClick={reset} className="text-xs text-wine-700 hover:text-wine-800 cursor-pointer flex items-center gap-1 font-semibold">
                  <RefreshCw size={11} /> Recommencer
                </button>
              </div>

              {results.length === 0 && (
                <p className="text-center text-sm text-anthracite-500 py-8">
                  Aucun vin ne colle parfaitement — essayez avec un budget plus large !
                </p>
              )}

              {results.map((w, i) => {
                const diff = DIFFICULTE_CONFIG[w.difficulte]
                return (
                  <div key={w.id} className={`card p-4 animate-slide-up ${i === 0 ? 'ring-2 ring-gold-500/50' : ''}`}
                       style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}>
                    {i === 0 && (
                      <div className="text-[10px] font-bold text-gold-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles size={10} /> Notre coup de cœur pour ce soir
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                           style={{ background: `${w.color}18` }}>
                        {w.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-serif text-sm font-bold text-anthracite-900">{w.appellation}</div>
                            <div className="text-[11px] text-anthracite-400">{w.region} · {w.typeLabel} · ~{w.prixMoyen} €</div>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: diff.bg, color: diff.color }}>
                            {diff.emoji}
                          </span>
                        </div>
                        <p className="text-xs text-anthracite-500 italic mt-1">« {w.enUneMot} »</p>
                        <div className="mt-2">
                          <JaugesGout jauges={w.jauges} compact animate={false} />
                        </div>
                        <p className="text-[11px] text-anthracite-600 mt-2 leading-relaxed">
                          {buildReason(w, answers)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {results.length > 0 && (
                <button
                  onClick={() => { onClose(); onOpenBibliotheque?.() }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-cream cursor-pointer transition-all hover:brightness-110"
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
    </div>
  )
}
