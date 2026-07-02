import { useState } from 'react'
import { Wine } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Profilage à l'arrivée (≤ 5 questions) → active le Mode Débutant ou Expert
// Partage la clé localStorage 'oeno-profil' avec l'assistant conversationnel.
// ═══════════════════════════════════════════════════════════════════════════

export const PROFIL_KEY = 'oeno-profil'

export function loadProfil() {
  try {
    const raw = localStorage.getItem(PROFIL_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const NIVEAUX = [
  { id: 'debutant', emoji: '🌱', label: 'Je débute',            hint: 'Langage simple, vins « faciles à aimer », chaque terme expliqué' },
  { id: 'amateur',  emoji: '🍷', label: 'J\'ai quelques repères', hint: 'J\'aime le vin, je veux approfondir et explorer' },
  { id: 'expert',   emoji: '🎓', label: 'Je m\'y connais bien',  hint: 'Recommandations ciblées et techniques, sans vulgarisation' },
]

const QUESTIONS = {
  debutant: [
    {
      id: 'sucre',
      q: 'Vous aimez quand c\'est plutôt sucré ou sec ?',
      options: [
        { emoji: '🍯', label: 'Doux, comme un jus de fruit' },
        { emoji: '🍋', label: 'Sec et frais' },
        { emoji: '🤷', label: 'Aucune idée, je découvre !' },
      ],
    },
    {
      id: 'fruits',
      q: 'Quels types de fruits préférez-vous ?',
      options: [
        { emoji: '🍓', label: 'Fruits rouges (fraise, cerise)' },
        { emoji: '🍑', label: 'Fruits jaunes (pêche, abricot)' },
        { emoji: '🍋', label: 'Agrumes (citron, pamplemousse)' },
        { emoji: '🫐', label: 'Fruits noirs (mûre, cassis)' },
      ],
    },
    {
      id: 'intensite',
      q: 'En bouche, vous préférez…',
      options: [
        { emoji: '🪶', label: 'Léger et facile à boire' },
        { emoji: '⚖️', label: 'Équilibré' },
        { emoji: '💪', label: 'Costaud, qui a du corps' },
      ],
    },
    {
      id: 'budget',
      q: 'Votre budget habituel pour une bouteille ?',
      options: [
        { emoji: '🪙', label: 'Moins de 10 €' },
        { emoji: '💶', label: '10 à 20 €' },
        { emoji: '💰', label: 'Plus de 20 €' },
      ],
    },
  ],
  expert: [
    {
      id: 'bouche',
      q: 'Qu\'aimez-vous en bouche : puissant, corsé, léger, âpre ?',
      options: [
        { emoji: '🔥', label: 'Puissant et corsé' },
        { emoji: '🩰', label: 'Léger et élégant' },
        { emoji: '🌵', label: 'Tannique, avec de la mâche' },
        { emoji: '💎', label: 'Minéral et tendu' },
      ],
    },
    {
      id: 'frequence',
      q: 'Quelle est votre fréquence de consommation de vin ?',
      options: [
        { emoji: '🍷', label: 'Occasionnelle (fêtes, dîners)' },
        { emoji: '📅', label: 'Hebdomadaire' },
        { emoji: '🍇', label: 'Passionné, plusieurs fois par semaine' },
      ],
    },
    {
      id: 'regions',
      q: 'Vos régions de prédilection ?',
      options: [
        { emoji: '🍷', label: 'Bordeaux & Sud-Ouest' },
        { emoji: '🍒', label: 'Bourgogne & Beaujolais' },
        { emoji: '☀️', label: 'Rhône & Sud' },
        { emoji: '🌍', label: 'Éclectique, tout m\'intéresse' },
      ],
    },
    {
      id: 'budget',
      q: 'Budget par bouteille, en général ?',
      options: [
        { emoji: '💶', label: '10 à 20 €' },
        { emoji: '💰', label: '20 à 50 €' },
        { emoji: '👑', label: '50 € et plus' },
      ],
    },
  ],
}

export default function OnboardingProfil({ onComplete }) {
  const [niveau, setNiveau] = useState(null)
  const [step, setStep]     = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = niveau ? QUESTIONS[niveau === 'debutant' ? 'debutant' : 'expert'] : []
  const currentQ  = niveau && step < questions.length ? questions[step] : null

  const answer = (qid, label) => {
    const next = { ...answers, [qid]: label }
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      const profil = { niveau, gouts: next }
      try { localStorage.setItem(PROFIL_KEY, JSON.stringify(profil)) } catch {}
      onComplete(profil)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(18,16,14,0.85)', backdropFilter: 'blur(8px)' }}
      role="dialog" aria-modal="true" aria-label="Bienvenue — faisons connaissance"
    >
      <div className="bg-cream w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[92vh] flex flex-col animate-slide-up shadow-card-hover">

        {/* Header */}
        <div className="px-6 py-5 flex-shrink-0 text-cream text-center"
             style={{ background: 'linear-gradient(135deg, #5c0d22 0%, #8c2f39 100%)' }}>
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-2">
            <Wine size={18} className="text-gold-400" />
          </div>
          <h3 className="font-serif text-xl font-bold">Bienvenue sur Œno !</h3>
          <p className="text-cream/70 text-xs mt-1">
            {niveau ? `Encore ${questions.length - step} petite${questions.length - step > 1 ? 's' : ''} question${questions.length - step > 1 ? 's' : ''}…` : '5 questions max pour tout personnaliser pour vous.'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!niveau ? (
            <div className="animate-fade-in-up">
              <h4 className="font-serif text-base font-bold text-anthracite-900 text-center mb-5">
                Le vin et vous, c'est… ?
              </h4>
              <div className="space-y-3">
                {NIVEAUX.map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => setNiveau(o.id)}
                    className="w-full card p-4 flex items-center gap-4 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <span>
                      <span className="block text-sm font-bold text-anthracite-900">{o.label}</span>
                      <span className="block text-xs text-anthracite-400 leading-snug mt-0.5">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : currentQ && (
            <div key={currentQ.id} className="animate-slide-up">
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {questions.map((_, i) => (
                  <span key={i} className="rounded-full transition-all"
                        style={{ width: i === step ? 22 : 7, height: 7,
                                 background: i <= step ? '#8c2f39' : '#e5e0d8' }} />
                ))}
              </div>
              <h4 className="font-serif text-base font-bold text-anthracite-900 text-center mb-5">{currentQ.q}</h4>
              <div className="space-y-2.5">
                {currentQ.options.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => answer(currentQ.id, o.label)}
                    className="w-full card p-3.5 flex items-center gap-3 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-xl">{o.emoji}</span>
                    <span className="text-sm font-semibold text-anthracite-800">{o.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => step > 0 ? setStep(s => s - 1) : setNiveau(null)}
                className="mt-5 mx-auto flex text-xs text-anthracite-400 hover:text-anthracite-700 cursor-pointer"
              >
                ← Retour
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
