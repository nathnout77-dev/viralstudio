import { useState, useMemo } from 'react'
import { Sparkles, ChevronLeft, Utensils, Coins, GraduationCap, UtensilsCrossed } from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG, MILLESIMES_DB } from '../data/wineDatabase'
import { computeProfilAppris, bonusProfilAppris } from '../data/goutsAppris'
import dynamic from 'next/dynamic'
import JaugesGout from './JaugesGout'

// Outils secondaires chargés à la demande (le quiz reste l'écran par défaut)
const BudgetCaviste = dynamic(() => import('./BudgetCaviste'), { ssr: false })
const ModeDiner     = dynamic(() => import('./ModeDiner'), { ssr: false })

// ═══ GOÛT-O-MÈTRE ═══════════════════════════════════════════════════════════
// Quiz ludique : questions du quotidien → profil de goût vin.
// Aucun jargon. Chaque réponse ajuste des curseurs internes.

const QUIZ = [
  {
    id: 'boisson',
    question: 'Au petit-déj, vous êtes plutôt…',
    options: [
      { emoji: '☕', label: 'Café serré',        effect: { puissance: +2, tanins: +1 } },
      { emoji: '🍵', label: 'Thé vert',          effect: { puissance: -1, fraicheur: +2 } },
      { emoji: '🍫', label: 'Chocolat chaud',    effect: { douceur: +2, rondeur: +1 } },
      { emoji: '🧃', label: 'Jus de fruits',     effect: { fruit: +2, douceur: +1 } },
    ],
  },
  {
    id: 'tartine',
    question: 'Sur une tartine, vous mettez…',
    options: [
      { emoji: '🍓', label: 'Confiture',            effect: { douceur: +2, fruit: +1 } },
      { emoji: '🧈', label: 'Beurre salé',           effect: { rondeur: +2 } },
      { emoji: '🍋', label: 'Citron & miel',         effect: { fraicheur: +2 } },
      { emoji: '🥑', label: 'Avocat & piment',       effect: { puissance: +1, fraicheur: +1 } },
    ],
  },
  {
    id: 'dessert',
    question: 'Le dessert de vos rêves…',
    options: [
      { emoji: '🍰', label: 'Tarte au citron',      effect: { fraicheur: +2 } },
      { emoji: '🍮', label: 'Crème brûlée',          effect: { rondeur: +2, douceur: +1 } },
      { emoji: '🍫', label: 'Fondant au chocolat',  effect: { puissance: +2, tanins: +1 } },
      { emoji: '🍓', label: 'Salade de fruits',     effect: { fruit: +2, fraicheur: +1 } },
    ],
  },
  {
    id: 'plat_prefere',
    question: 'Votre plat réconfort ?',
    options: [
      { emoji: '🥩', label: 'Belle côte de bœuf',  effect: { puissance: +2, tanins: +2 } },
      { emoji: '🍜', label: 'Ramen / cuisine asiatique', effect: { fraicheur: +1, douceur: +1 } },
      { emoji: '🧀', label: 'Raclette entre amis', effect: { rondeur: +2 } },
      { emoji: '🍝', label: 'Pâtes à la tomate',   effect: { fruit: +1, fraicheur: +1 } },
    ],
  },
  {
    id: 'aventure',
    question: 'Côté découvertes, vous êtes…',
    options: [
      { emoji: '🛋️', label: 'Valeurs sûres',       effect: { difficulte: 'facile' } },
      { emoji: '🧭', label: 'Curieux modéré',       effect: { difficulte: 'explorer' } },
      { emoji: '🚀', label: 'Toujours à fond',      effect: { difficulte: 'pointu' } },
    ],
  },
  {
    id: 'budget',
    question: 'Et pour cette bouteille, on part sur…',
    options: [
      { emoji: '🪙', label: 'Moins de 10 €',  effect: { budgetMax: 10 } },
      { emoji: '💶', label: '10 à 20 €',      effect: { budgetMin: 10, budgetMax: 20 } },
      { emoji: '💰', label: '20 à 50 €',      effect: { budgetMin: 20, budgetMax: 50 } },
      { emoji: '👑', label: 'Pas de limite',  effect: { budgetMin: 0, budgetMax: 9999 } },
    ],
  },
]

function computeProfile(answers) {
  const p = { puissance: 0, douceur: 0, tanins: 0, fraicheur: 0, fruit: 0, rondeur: 0, difficulte: null, budgetMin: 0, budgetMax: 9999 }
  for (const step of QUIZ) {
    const chosen = step.options.find(o => o.label === answers[step.id])
    if (!chosen) continue
    for (const [k, v] of Object.entries(chosen.effect)) {
      if (k === 'difficulte') p.difficulte = v
      else if (k === 'budgetMin' || k === 'budgetMax') p[k] = v
      else p[k] += v
    }
  }
  return p
}

function scoreWine(w, p) {
  // Exclure les effervescents du sommelier
  if (w.type === 'sparkling') return -999
  let s = 0
  // Correspondance jauges (0 = parfait)
  const targetPuissance = Math.min(5, Math.max(1, 2 + p.puissance - p.fraicheur * 0.5))
  const targetDouceur   = Math.min(5, Math.max(1, 1 + p.douceur))
  const targetTanins    = Math.min(5, Math.max(1, 2 + p.tanins - p.rondeur * 0.5))
  s -= Math.abs(w.jauges.puissance - targetPuissance) * 2
  s -= Math.abs(w.jauges.douceur - targetDouceur) * 2
  s -= Math.abs(w.jauges.tanins - targetTanins) * 1.5
  // Fruit / fraîcheur → types
  if (p.fruit >= 2 && ['red', 'rosé'].includes(w.type) && w.jauges.puissance <= 3) s += 2
  if (p.fraicheur >= 2 && w.type === 'white') s += 3
  if (p.rondeur >= 2 && w.type === 'white' && w.jauges.puissance >= 3) s += 2
  if (p.douceur >= 3 && w.type === 'sweet') s += 4
  // Difficulté
  if (p.difficulte && w.difficulte === p.difficulte) s += 3
  if (p.difficulte === 'facile' && w.difficulte === 'pointu') s -= 4
  // Budget
  if (w.prixMoyen < p.budgetMin || w.prixMoyen > p.budgetMax) s -= 20
  return s
}

function getMillesimesFor(wine) {
  const label = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux' }[wine.type]
  const hits = MILLESIMES_DB
    .filter(m => m[2] === wine.region && m[1] === label && m[7] === 'Privilégier')
    .map(m => m[0])
  const uniq = [...new Set(hits)].sort((a, b) => b - a).slice(0, 4)
  return uniq.length ? uniq : wine.bonsMilsimes.slice(-4).reverse()
}

// ═══ UI ═════════════════════════════════════════════════════════════════════
// Sélecteur d'outil : Goût-o-mètre (quiz), Budget caviste ou Mode Dîner
function ToolSwitch({ tool, setTool }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {[
        { id: 'quiz',   label: 'Goût-o-mètre',   Icon: Sparkles },
        { id: 'budget', label: 'Budget caviste',  Icon: Coins },
        { id: 'diner',  label: 'Mode Dîner',      Icon: UtensilsCrossed },
      ].map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setTool(id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            tool === id
              ? 'bg-wine-800 text-cream shadow-wine'
              : 'bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
          }`}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  )
}

export default function SommelierForm({ onOpenBibliotheque }) {
  // Pré-sélection d'un outil (carte « Mode Dîner » de la landing, par ex.)
  const [tool, setTool] = useState(() => {
    if (typeof window === 'undefined') return 'quiz'
    const t = sessionStorage.getItem('oeno-sommelier-tool')
    sessionStorage.removeItem('oeno-sommelier-tool')
    return ['quiz', 'budget', 'diner'].includes(t) ? t : 'quiz'
  })
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  // Profil appris des dégustations : bonus doux (~30 %), n'écrase pas le quiz.
  const profilAppris = useMemo(() => computeProfilAppris(), [])

  const current = QUIZ[step]

  const select = (label) => {
    const newAnswers = { ...answers, [current.id]: label }
    setAnswers(newAnswers)
    if (step < QUIZ.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200)
    } else {
      const profile = computeProfile(newAnswers)
      const ranked = WINE_DB
        .map(w => ({ wine: w, score: scoreWine(w, profile) + bonusProfilAppris(w, profilAppris, 0.6) }))
        .filter(x => x.score > -50)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ wine }) => ({ ...wine, millesimesReco: getMillesimesFor(wine) }))
      setResults(ranked)
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setResults(null) }

  // ── Budget caviste ──
  if (tool === 'budget') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-3xl items-center justify-center shadow-wine mb-3"
               style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
            <Coins size={22} className="text-gold-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-anthracite-900">Budget caviste</h2>
          <p className="text-sm text-anthracite-500 mt-1">
            Donnez un budget et une occasion — on compose la sélection comme un bon caviste.
          </p>
        </div>
        <ToolSwitch tool={tool} setTool={setTool} />
        <BudgetCaviste />
      </div>
    )
  }

  // ── Mode Dîner ──
  if (tool === 'diner') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-3xl items-center justify-center shadow-wine mb-3"
               style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
            <UtensilsCrossed size={22} className="text-gold-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-anthracite-900">Le Mode Dîner</h2>
          <p className="text-sm text-anthracite-500 mt-1">
            Entrée, plat, dessert — composez le menu des vins de votre repas, comme au restaurant.
          </p>
        </div>
        <ToolSwitch tool={tool} setTool={setTool} />
        <ModeDiner />
      </div>
    )
  }

  // ── Résultats ──
  if (results) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎯</div>
          <h2 className="font-serif text-2xl font-bold text-anthracite-900">Votre profil est prêt !</h2>
          <p className="text-sm text-anthracite-500 mt-1">Voici {results.length} vins choisis rien que pour vous.</p>
          {profilAppris && (
            <p className="inline-flex items-center gap-1.5 text-[11px] text-gold-700 font-semibold mt-2">
              <GraduationCap size={12} />
              Affiné par vos {profilAppris.nbDegustations} dégustations notées
            </p>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {results.map((w, i) => {
            const diff = DIFFICULTE_CONFIG[w.difficulte]
            return (
              <div key={w.id} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                       style={{ background: `${w.color}18` }}>
                    {w.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-serif text-base font-bold text-anthracite-900">{w.appellation}</div>
                        <div className="text-xs text-anthracite-400 mt-0.5">{w.region} · {w.typeLabel} · ~{w.prixMoyen} €</div>
                      </div>
                      {i === 0 && (
                        <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-700">
                          ★ Coup de cœur
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-anthracite-500 italic mt-1.5">« {w.enUneMot} »</p>
                  </div>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Profil de goût</div>
                    <JaugesGout jauges={w.jauges} compact />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Millésimes à privilégier</div>
                    <div className="flex flex-wrap gap-1.5">
                      {w.millesimesReco.map(y => (
                        <span key={y} className="px-2.5 py-1 rounded-full text-xs font-bold text-cream" style={{ background: w.color }}>
                          {y}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: diff.bg, color: diff.color }}>
                        {diff.emoji} {diff.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-anthracite-100">
                  <p className="text-xs text-anthracite-600 leading-relaxed">
                    <span className="font-semibold">Pourquoi ce vin ? </span>{w.pourQui}.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.accords.slice(0, 3).map(a => (
                      <span key={a} className="text-[11px] bg-anthracite-50 border border-anthracite-200 text-anthracite-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Utensils size={8} /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="btn-ghost flex-1 justify-center">Refaire le test</button>
          <button
            onClick={onOpenBibliotheque}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
          >
            Explorer la bibliothèque
          </button>
        </div>
      </div>
    )
  }

  // ── Quiz ──
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-3xl items-center justify-center shadow-wine text-2xl mb-3"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <Sparkles size={22} className="text-gold-400" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-anthracite-900">Le Goût-o-mètre</h2>
        <p className="text-sm text-anthracite-500 mt-1">
          Pas besoin de connaître le vin — répondez sur VOS goûts, on s'occupe du reste.
        </p>
      </div>

      <ToolSwitch tool={tool} setTool={setTool} />

      {/* Progress bubbles */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {QUIZ.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? 28 : 8,
              height: 8,
              background: i < step ? '#8c2f39' : i === step ? 'linear-gradient(to right, #8c2f39, #c9a84c)' : '#e7e5e4',
            }}
          />
        ))}
      </div>

      <div key={step} className="animate-slide-up">
        <h3 className="font-serif text-xl font-bold text-anthracite-900 mb-6 text-center">{current.question}</h3>
        <div className={`grid gap-3 ${current.options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
          {current.options.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => select(opt.label)}
              className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer hover:-translate-y-1 animate-scale-in ${
                answers[current.id] === opt.label
                  ? 'border-wine-700 bg-wine-50 shadow-md'
                  : 'border-anthracite-200 bg-white hover:border-wine-300'
              }`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="text-3xl mb-2">{opt.emoji}</div>
              <div className="text-sm font-semibold text-anthracite-800">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="mt-8 mx-auto flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-anthracite-700 transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
          Question précédente
        </button>
      )}
    </div>
  )
}
