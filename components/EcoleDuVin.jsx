import { useState, useEffect, useMemo } from 'react'
import { GraduationCap, Clock, Check, ChevronLeft, ChevronRight, Lightbulb, RotateCcw } from 'lucide-react'
import { LECONS, LECONS_PAR_NIVEAU, NIVEAUX } from '../data/lecons'

// ═══════════════════════════════════════════════════════════════════════════
// L'École du Vin — parcours d'apprentissage gamifié.
// Progression persistée dans localStorage `oeno-ecole` : { leconId: {done, score} }
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'oeno-ecole'

function loadProgress() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? JSON.parse(raw) : {}
    return v && typeof v === 'object' ? v : {}
  } catch {
    return {}
  }
}

// ── Médaille SVG or, dessinée inline ─────────────────────────────────────────
function Medaille({ size = 40, earned = true }) {
  const gold = earned ? '#c9a84c' : '#d6d3d1'
  const goldDark = earned ? '#a16207' : '#a8a29e'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true"
         className={earned ? '' : 'opacity-50'}>
      {/* Rubans */}
      <path d="M13 2 L17 14 L11 16 L7 4 Z" fill="#5c0d22" />
      <path d="M27 2 L23 14 L29 16 L33 4 Z" fill="#8c2f39" />
      {/* Médaille */}
      <circle cx="20" cy="25" r="12" fill={gold} stroke={goldDark} strokeWidth="1.5" />
      <circle cx="20" cy="25" r="8.5" fill="none" stroke={goldDark} strokeWidth="0.8" opacity="0.6" />
      {/* Grappe stylisée */}
      <circle cx="18" cy="23" r="1.7" fill={goldDark} />
      <circle cx="22" cy="23" r="1.7" fill={goldDark} />
      <circle cx="20" cy="26" r="1.7" fill={goldDark} />
      <circle cx="20" cy="29.2" r="1.7" fill={goldDark} />
      <path d="M20 21.5 Q20 18.5 22.5 17.5" fill="none" stroke={goldDark} strokeWidth="1" strokeLinecap="round" />
      {/* Éclat */}
      {earned && <path d="M14 18 Q16 16 19 15.5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />}
    </svg>
  )
}

// ── Vue leçon : lecture + quiz ────────────────────────────────────────────────
function LeconView({ lecon, progress, onFinish, onBack }) {
  const [phase, setPhase] = useState('lecture') // lecture | quiz | fini
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)

  const question = lecon.quiz[qIndex]
  const niveau = NIVEAUX.find(n => n.id === lecon.niveau)

  const answer = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === question.bonne) setScore(s => s + 1)
  }

  const next = () => {
    if (qIndex < lecon.quiz.length - 1) {
      setQIndex(q => q + 1)
      setPicked(null)
    } else {
      setPhase('fini')
      onFinish(lecon.id, score)
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-anthracite-400 hover:text-anthracite-700 transition-colors cursor-pointer mb-5">
        <ChevronLeft size={13} /> Retour au parcours
      </button>

      {/* En-tête leçon */}
      <div className="mb-8">
        <span className="eyebrow mb-2">{niveau?.label} · {lecon.duree}</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-anthracite-900 leading-tight">{lecon.titre}</h2>
      </div>

      {phase === 'lecture' && (
        <div className="animate-fade-in-up">
          <div className="space-y-7">
            {lecon.sections.map((s, i) => (
              <section key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}>
                <h3 className="font-serif text-lg font-bold text-wine-texte mb-2">{s.titre}</h3>
                <p className="text-[15px] text-anthracite-700 leading-[1.75]">{s.texte}</p>
              </section>
            ))}
          </div>

          {/* Renvoi vers l'app */}
          <div className="mt-8 rounded-2xl border border-gold-500/40 bg-gold-500/[0.07] p-4 flex items-start gap-3">
            <Lightbulb size={16} className="text-gold-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-anthracite-700 leading-relaxed">{lecon.essayez.texte}</p>
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className="btn-primary w-full justify-center mt-8"
          >
            Vérifier ce que j'ai retenu — 3 questions
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {phase === 'quiz' && (
        <div key={qIndex} className="animate-slide-up">
          {/* Progression du quiz */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {lecon.quiz.map((_, i) => (
              <span key={i} className="rounded-full transition-all duration-300"
                    style={{ width: i === qIndex ? 24 : 7, height: 7,
                             background: i <= qIndex ? '#5c0d22' : '#e7e5e4' }} />
            ))}
          </div>

          <h3 className="font-serif text-lg font-bold text-anthracite-900 text-center mb-6">{question.q}</h3>

          <div className="space-y-2.5 max-w-md mx-auto">
            {question.options.map((opt, i) => {
              const isGood = i === question.bonne
              const revealed = picked !== null
              return (
                <button
                  key={opt}
                  onClick={() => answer(i)}
                  disabled={revealed}
                  className={`choice-btn w-full p-4 text-left text-sm font-semibold transition-all duration-300 ${
                    revealed
                      ? isGood
                        ? '!border-emerald-500 !bg-emerald-50 !text-emerald-800'
                        : picked === i
                          ? '!border-wine-700 !bg-wine-50 !text-wine-texte opacity-90'
                          : 'opacity-45'
                      : ''
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    {opt}
                    {revealed && isGood && <Check size={15} className="text-emerald-600 flex-shrink-0" />}
                  </span>
                </button>
              )
            })}
          </div>

          {picked !== null && (
            <div className="max-w-md mx-auto mt-4 animate-fade-in-up">
              <div className={`rounded-xl p-4 text-sm leading-relaxed ${
                picked === question.bonne
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-wine-50 border border-wine-200 text-wine-texte'
              }`}>
                <span className="font-bold">{picked === question.bonne ? 'Bien vu ! ' : 'Pas tout à fait. '}</span>
                {question.explication}
              </div>
              <button onClick={next} className="btn-primary w-full justify-center mt-4">
                {qIndex < lecon.quiz.length - 1 ? 'Question suivante' : 'Voir mon score'}
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'fini' && (
        <div className="text-center py-8 animate-scale-in">
          <div className="flex justify-center mb-4">
            <Medaille size={72} earned={score >= 2} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-anthracite-900">
            {score === 3 ? 'Sans faute !' : score === 2 ? 'Très bien !' : 'Leçon terminée'}
          </h3>
          <p className="text-sm text-anthracite-500 mt-2">
            {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {lecon.quiz.length}
            {score < 2 && ' — relisez la leçon quand vous voulez, elle ne bouge pas.'}
          </p>
          <div className="flex gap-3 max-w-sm mx-auto mt-8">
            <button
              onClick={() => { setPhase('lecture'); setQIndex(0); setPicked(null); setScore(0) }}
              className="btn-ghost flex-1 justify-center"
            >
              <RotateCcw size={13} /> Relire
            </button>
            <button onClick={onBack} className="btn-primary flex-1 justify-center">
              Continuer le parcours
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Vue parcours ──────────────────────────────────────────────────────────────
export default function EcoleDuVin() {
  const [progress, setProgress] = useState({})
  const [leconOuverte, setLeconOuverte] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProgress(loadProgress())
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const finish = (leconId, score) => {
    setProgress(prev => {
      const old = prev[leconId]
      const next = {
        ...prev,
        [leconId]: { done: true, score: Math.max(score, old?.score || 0) },
      }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const doneCount = useMemo(() => LECONS.filter(l => progress[l.id]?.done).length, [progress])
  const pctGlobal = Math.round((doneCount / LECONS.length) * 100)

  if (leconOuverte) {
    return (
      <LeconView
        lecon={leconOuverte}
        progress={progress}
        onFinish={finish}
        onBack={() => setLeconOuverte(null)}
      />
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <GraduationCap size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">L'École du Vin</span>
          <h2 className="section-title">Apprendre, cinq minutes à la fois</h2>
          <p className="section-sub">12 leçons courtes, 3 niveaux, zéro jargon — et des médailles à la clé</p>
        </div>
      </div>

      {/* Progression globale */}
      <div className="card p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400">Votre parcours</span>
          <span className="text-xs font-bold text-anthracite-800">{doneCount} / {LECONS.length} leçons · {pctGlobal} %</span>
        </div>
        <svg className="w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10" aria-label={`Progression : ${pctGlobal} %`}>
          <rect x="0" y="3" width="100" height="4" rx="2" fill="#efe9dd" />
          <rect x="0" y="3" height="4" rx="2"
                width={mounted ? Math.max(pctGlobal, doneCount ? 2 : 0) : 0}
                fill="url(#ecoleGrad)"
                style={{ transition: 'width 900ms cubic-bezier(0.22,1,0.36,1)' }} />
          <defs>
            <linearGradient id="ecoleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5c0d22" />
              <stop offset="100%" stopColor="#c9a84c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Niveaux */}
      <div className="space-y-10">
        {LECONS_PAR_NIVEAU.map((niveau, ni) => {
          const doneInNiveau = niveau.lecons.filter(l => progress[l.id]?.done).length
          const complete = doneInNiveau === niveau.lecons.length
          return (
            <div key={niveau.id}>
              <div className="flex items-center gap-3 mb-4">
                <Medaille size={36} earned={complete} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg font-bold text-anthracite-900">{niveau.label}</h3>
                    {complete && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/20 text-gold-700">
                        Badge « {niveau.badge} » obtenu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-anthracite-400">{niveau.sousTitre} · {doneInNiveau}/{niveau.lecons.length} leçons</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {niveau.lecons.map((l, i) => {
                  const p = progress[l.id]
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLeconOuverte(l)}
                      className="card p-4 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${(ni * 4 + i) * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-serif text-sm font-bold text-anthracite-900 leading-snug">{l.titre}</div>
                        {p?.done ? (
                          <span className="w-6 h-6 flex-shrink-0 rounded-full bg-emerald-100 flex items-center justify-center" title="Terminée">
                            <Check size={12} className="text-emerald-700" />
                          </span>
                        ) : (
                          <span className="w-6 h-6 flex-shrink-0 rounded-full border border-anthracite-200" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2.5 text-[11px] text-anthracite-400">
                        <Clock size={11} />
                        {l.duree}
                        {p?.done && <span className="text-gold-700 font-semibold">· Quiz {p.score}/3</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
