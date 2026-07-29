import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Check, X, Trophy, Loader2 } from 'lucide-react'
import { COUVERTURE } from '../lib/referentiel'

// ═══════════════════════════════════════════════════════════════════════════
// QuizFrance — l'entraînement qui pioche dans toute la base viticole
// nationale. Chaque partie est différente : régions, cépages, arômes,
// domaines, crus classés, millésimes, températures de service.
// ═══════════════════════════════════════════════════════════════════════════

const NB_QUESTIONS = 8

export default function QuizFrance() {
  const [questions, setQuestions] = useState(null)
  const [i, setI] = useState(0)
  const [choix, setChoix] = useState(null)
  const [score, setScore] = useState(0)
  const [fini, setFini] = useState(false)

  const nouvellePartie = useCallback(() => {
    setQuestions(null); setI(0); setChoix(null); setScore(0); setFini(false)
    // Le générateur tire dans le référentiel : chargé à la volée
    import('../lib/quizReferentiel').then(m => setQuestions(m.genererQuiz(NB_QUESTIONS)))
  }, [])

  useEffect(() => { nouvellePartie() }, [nouvellePartie])

  const q = questions?.[i]

  const repondre = (n) => {
    if (choix !== null) return
    setChoix(n)
    if (n === q.bonne) setScore(s => s + 1)
  }

  const suivante = () => {
    if (i < questions.length - 1) { setI(n => n + 1); setChoix(null) }
    else setFini(true)
  }

  if (!questions) {
    return (
      <div className="card p-10 flex flex-col items-center gap-3 text-center animate-fade-in">
        <Loader2 size={22} className="text-gold-600 animate-spin" />
        <p className="text-sm text-anthracite-500">Préparation de vos questions…</p>
      </div>
    )
  }

  if (fini) {
    const parfait = score === questions.length
    const bon = score >= Math.ceil(questions.length * 0.6)
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="text-5xl mb-3" role="img" aria-hidden="true">
          {parfait ? '🏆' : bon ? '🎉' : '📚'}
        </div>
        <div className="font-serif text-2xl font-bold text-anthracite-900">
          {score} / {questions.length}
        </div>
        <p className="text-sm text-anthracite-500 mt-2 max-w-xs mx-auto leading-relaxed">
          {parfait ? 'Sans faute — vous connaissez vos classiques.'
            : bon ? 'Belle performance. Encore une partie ?'
            : 'Chaque partie tire de nouvelles questions : recommencez pour progresser.'}
        </p>
        <button
          onClick={nouvellePartie}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-cream cursor-pointer active:scale-[0.98] transition-all"
          style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
        >
          <RefreshCw size={15} /> Nouvelle partie
        </button>
      </div>
    )
  }

  return (
    <div className="card p-5 lg:p-6 animate-fade-in">
      {/* Progression */}
      <div className="flex items-center gap-1.5 mb-5">
        {questions.map((_, n) => (
          <span
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              n < i ? 'bg-gold-500' : n === i ? 'bg-wine-800' : 'bg-anthracite-100'
            }`}
          />
        ))}
        <span className="text-[10px] font-bold text-anthracite-400 ml-2 flex-shrink-0">
          {i + 1}/{questions.length}
        </span>
      </div>

      <h3 className="font-serif text-lg font-bold text-anthracite-900 text-center mb-5">{q.q}</h3>

      <div className="space-y-2">
        {q.options.map((opt, n) => {
          const estBonne = n === q.bonne
          const choisie = choix === n
          const revele = choix !== null
          return (
            <button
              key={`${opt}-${n}`}
              onClick={() => repondre(n)}
              disabled={revele}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left text-sm transition-all ${
                !revele
                  ? 'bg-carte border-anthracite-200 hover:border-wine-300 cursor-pointer active:scale-[0.99]'
                  : estBonne
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : choisie
                      ? 'bg-wine-50 border-wine-400 text-wine-900'
                      : 'bg-carte border-anthracite-100 text-anthracite-400'
              }`}
            >
              <span className="flex-1 min-w-0">{opt}</span>
              {revele && estBonne && <Check size={16} className="text-emerald-600 flex-shrink-0" />}
              {revele && choisie && !estBonne && <X size={16} className="text-wine-600 flex-shrink-0" />}
            </button>
          )
        })}
      </div>

      {choix !== null && (
        <div className="mt-4 animate-fade-in">
          <p className="text-xs text-anthracite-600 leading-relaxed rounded-xl p-3.5 border border-gold-500/25"
             style={{ background: 'rgba(199,161,90,0.07)' }}>
            {q.explication}
          </p>
          <button
            onClick={suivante}
            className="w-full mt-3 py-3 rounded-full text-sm font-bold text-cream cursor-pointer active:scale-[0.98] transition-all"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
          >
            {i < questions.length - 1 ? 'Question suivante' : 'Voir mon score'}
          </button>
        </div>
      )}

      <p className="text-[10px] text-anthracite-400 text-center mt-4">
        Questions tirées de {COUVERTURE.appellations} appellations, {COUVERTURE.cepages} cépages,{' '}
        {COUVERTURE.domaines} domaines et {COUVERTURE.crus} crus.
      </p>
    </div>
  )
}
