import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { School, Flower2, GraduationCap, CheckCircle2, Trophy } from 'lucide-react'
import EcoleDuVin from './EcoleDuVin'
import CapsulesRow from './Capsules'
import RoueAromes from './RoueAromes'
import { LexiqueView } from './GuideView'
import { LECONS } from '../data/lecons'
import { CAPSULES } from '../data/capsules'

// Le quiz pioche dans la base viticole nationale (~230 Ko) : chargé seulement
// quand on ouvre l'étape, jamais au démarrage de l'app.
const QuizFrance = dynamic(() => import('./QuizFrance'), { ssr: false })

// ─────────────────────────────────────────────────────────────────────────────
// ParcoursApprendre — le chemin de progression unifié. École, capsules,
// roue des arômes et lexique ne sont plus des onglets éparpillés mais les
// étapes d'un même parcours, avec la progression affichée en tête et la
// reprise là où on s'était arrêté.
// ─────────────────────────────────────────────────────────────────────────────

const ETAPES = [
  { id: 'ecole',   num: 1, label: 'Les bases',         Icon: School,        texte: 'Leçons courtes et capsules vidéo' },
  { id: 'aromes',  num: 2, label: 'La roue des arômes', Icon: Flower2,       texte: 'Entraînez votre nez' },
  { id: 'lexique', num: 3, label: 'Le lexique',          Icon: GraduationCap, texte: 'Tous les mots, décodés' },
  { id: 'quiz',    num: 4, label: 'Quiz de France',      Icon: Trophy,        texte: 'Toute la France, une partie différente à chaque fois' },
]

const lireJSON = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || {} } catch { return {} }
}

export default function ParcoursApprendre() {
  const [etape, setEtape] = useState('ecole')
  const [progress, setProgress] = useState({ lecons: 0, capsules: 0 })

  useEffect(() => {
    const relire = () => {
      const ecole = lireJSON('oeno-ecole')
      const caps  = lireJSON('oeno-capsules')
      setProgress({
        lecons:   Object.values(ecole).filter(l => l?.done).length,
        capsules: Object.values(caps).filter(Boolean).length,
      })
    }
    relire()
    window.addEventListener('oeno-capsules-changed', relire)
    return () => window.removeEventListener('oeno-capsules-changed', relire)
  }, [etape])

  const pct = Math.round(((progress.lecons + progress.capsules) / (LECONS.length + CAPSULES.length)) * 100)

  return (
    <div className="lg:max-w-5xl lg:mx-auto animate-fade-in">
      {/* Progression globale */}
      <div className="card p-5 lg:p-6 mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <div className="font-serif text-lg font-bold text-anthracite-900">Votre parcours du vin</div>
            <div className="text-[11px] text-anthracite-400 mt-0.5">
              {progress.lecons}/{LECONS.length} leçons · {progress.capsules}/{CAPSULES.length} capsules vues
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-wine-texte flex-shrink-0">{pct}%</div>
        </div>
        <div className="h-1.5 rounded-full bg-anthracite-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(pct, 2)}%`, background: 'linear-gradient(to right, #8c2f39, #c9a84c)' }}
          />
        </div>
      </div>

      {/* Étapes du parcours */}
      <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-8">
        {ETAPES.map(({ id, num, label, Icon, texte }) => {
          const actif = etape === id
          return (
            <button
              key={id}
              onClick={() => setEtape(id)}
              className={`p-3.5 lg:p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${
                actif ? 'border-wine-700 bg-wine-50 shadow-md' : 'border-anthracite-200 bg-carte hover:border-wine-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  actif ? 'bg-wine-800 text-cream' : 'bg-anthracite-100 text-anthracite-500'
                }`}>{num}</span>
                <Icon size={14} className={actif ? 'text-wine-texte' : 'text-anthracite-400'} />
              </div>
              <div className={`text-xs lg:text-[13px] font-bold ${actif ? 'text-anthracite-900' : 'text-anthracite-600'}`}>{label}</div>
              <div className="text-[10px] text-anthracite-400 mt-0.5 hidden sm:block">{texte}</div>
            </button>
          )
        })}
      </div>

      {etape === 'ecole'   && <><CapsulesRow /><EcoleDuVin /></>}
      {etape === 'aromes'  && <RoueAromes />}
      {etape === 'lexique' && <LexiqueView />}
      {etape === 'quiz'    && <QuizFrance />}

      {/* Prochaine étape guidée */}
      {etape !== 'quiz' && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setEtape(etape === 'ecole' ? 'aromes' : etape === 'aromes' ? 'lexique' : 'quiz')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
          >
            <CheckCircle2 size={15} />
            Étape suivante : {etape === 'ecole' ? 'la roue des arômes' : etape === 'aromes' ? 'le lexique' : 'le quiz de France'}
          </button>
        </div>
      )}
    </div>
  )
}
