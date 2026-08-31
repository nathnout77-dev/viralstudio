import { useState, useMemo, useCallback } from 'react'
import { ChevronLeft, RefreshCw, Sparkles, ArrowRight, Check } from 'lucide-react'
import dynamic from 'next/dynamic'
import Icone from './Icone'
import WineTile from './WineTile'
import { FicheVin } from './BibliothequeView'
import { DIRECTIONS, prochaineQuestion, repondre, avancement } from '../lib/guide/parcours'
import { recommander, profilDepuisGout } from '../lib/guide/moteur'
import { lireMemoire, retenir, oublier } from '../lib/guide/memoire'
import { computeProfilAppris } from '../data/goutsAppris'
import { getRegionsPref } from '../lib/suggestions'

// Écrans spécialisés : leur résultat n'est pas une liste de bouteilles mais un
// panier à composer ou un menu par service. Les fondre dans le questionnaire
// commun aurait détruit ce qu'ils font de mieux. Ils gardent donc leur écran,
// mais plus leur porte d'entrée : on y arrive par le guide, comme le reste.
const BudgetCaviste = dynamic(() => import('./BudgetCaviste'), { ssr: false })
const ModeDiner     = dynamic(() => import('./ModeDiner'), { ssr: false })

// ═══════════════════════════════════════════════════════════════════════════
// Le guide — la porte unique vers un vin.
//
// Il y avait quatre questionnaires (« ce soir ? », le Goût-o-mètre, le budget
// caviste, le mode dîner), atteignables par trois portes différentes, chacun
// avec sa mise en page, sa barre de progression et sa façon de demander le
// budget. Le même utilisateur répondait trois fois aux mêmes questions sans
// que rien ne s'en souvienne.
//
// Ici : une question à la fois, toujours présentée pareil, et un palais retenu
// d'une fois sur l'autre. Les vins conseillés s'ouvrent en fiche — donc avec
// « ajouter à ma cave » et « noter », qui viennent du contexte (lib/cave.js).
// ═══════════════════════════════════════════════════════════════════════════

function BarreAvancement({ faites, total }) {
  const pct = total ? Math.round((faites / total) * 100) : 0
  return (
    <div className="flex items-center gap-3 mb-6" aria-hidden="true">
      <div className="flex-1 h-1 rounded-full bg-anthracite-100 overflow-hidden">
        <div className="h-full rounded-full bg-gold-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-anthracite-400 tabular-nums">
        {Math.min(faites + 1, total)} / {total}
      </span>
    </div>
  )
}

function Choix({ option, index, onChoisir }) {
  return (
    <button
      onClick={() => onChoisir(option.v)}
      className="card w-full p-4 text-left group flex items-center gap-3.5 hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <span className="w-11 h-11 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
        <Icone nom={option.ic} size={22} />
      </span>
      <span className="flex-1 font-semibold text-sm text-anthracite-900">{option.label}</span>
      <ArrowRight size={15} className="text-anthracite-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
    </button>
  )
}

export default function GuideVin({ mode, depart = null, onOpenBibliotheque }) {
  // La mémoire ne porte que sur le palais : le plat et l'envie du soir
  // décrivent un repas, pas un goût, et les ressortir proposerait le vin
  // d'hier. `depart` permet d'ouvrir directement sur une direction.
  const memoire = useMemo(() => lireMemoire(), [])
  const [reponses, setReponses] = useState(() => (depart ? { ...memoire, direction: depart } : {}))
  const [historique, setHistorique] = useState([])
  const [fiche, setFiche] = useState(null)
  const [rejoue, setRejoue] = useState(0)

  const profilAppris = useMemo(() => computeProfilAppris(), [])
  const regions = useMemo(() => (mode === 'expert' ? getRegionsPref() : []), [mode])

  const direction = DIRECTIONS.find(d => d.id === reponses.direction) || null
  const question = reponses.direction && !direction?.sortie ? prochaineQuestion(reponses) : null
  const termine = Boolean(reponses.direction) && !direction?.sortie && !question

  const vins = useMemo(() => {
    if (!termine) return []
    return recommander(reponses, {
      mode,
      profilGout: profilDepuisGout(reponses.gout),
      profilAppris,
      regions,
    })
    // `rejoue` force un nouveau tirage à l'identique : la diversification par
    // région n'est pas déterministe sur les ex æquo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termine, reponses, mode, profilAppris, regions, rejoue])

  const choisir = useCallback((valeur) => {
    setHistorique(h => [...h, reponses])
    const suite = question ? repondre(reponses, question, valeur) : reponses
    setReponses(suite)
    if (!prochaineQuestion(suite)) retenir(suite)
  }, [reponses, question])

  const revenir = useCallback(() => {
    setHistorique(h => {
      if (!h.length) return h
      setReponses(h[h.length - 1])
      return h.slice(0, -1)
    })
  }, [])

  const recommencer = useCallback(() => {
    setReponses({})
    setHistorique([])
  }, [])

  const Retour = ({ label = 'Retour' }) => (
    <button
      onClick={revenir}
      className="flex items-center gap-1.5 text-xs font-semibold text-anthracite-500 hover:text-anthracite-900 transition-colors cursor-pointer mb-5"
    >
      <ChevronLeft size={14} /> {label}
    </button>
  )

  // ── Étape 1 : la direction ───────────────────────────────────────────────
  if (!reponses.direction) {
    const palaisConnu = Boolean(memoire.gout && Object.keys(memoire.gout).length)
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-3xl items-center justify-center shadow-wine mb-3"
               style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
            <Sparkles size={22} className="text-gold-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-anthracite-900">Qu’est-ce qu’on cherche ?</h2>
          <p className="text-sm text-anthracite-500 mt-1">
            Une réponse suffit — les questions suivantes s’adaptent.
          </p>
        </div>

        <div className="space-y-3">
          {DIRECTIONS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setReponses({ ...memoire, direction: d.id })}
              className="card w-full p-5 text-left group flex items-center gap-4 hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
            >
              <span className="w-12 h-12 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Icone nom={d.ic} size={24} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-base font-bold text-anthracite-900">{d.titre}</span>
                <span className="block text-xs text-anthracite-500 mt-0.5 leading-relaxed">{d.texte}</span>
              </span>
              <ArrowRight size={16} className="text-anthracite-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Dire ce qu'Œno sait déjà, plutôt que de le faire en douce. */}
        {palaisConnu && (
          <p className="text-center text-[11px] text-anthracite-400 mt-6">
            Œno connaît vos goûts et s’en sert pour affiner ses conseils.{' '}
            <button onClick={() => { oublier(); recommencer() }} className="underline hover:text-wine-texte transition-colors cursor-pointer">
              Les oublier
            </button>
          </p>
        )}
      </div>
    )
  }

  // ── Sorties spécialisées ─────────────────────────────────────────────────
  if (direction?.sortie === 'budget') {
    return (
      <div className="animate-fade-in">
        <Retour label="Changer de direction" />
        <BudgetCaviste />
      </div>
    )
  }
  if (direction?.sortie === 'repas') {
    return (
      <div className="animate-fade-in">
        <Retour label="Changer de direction" />
        <ModeDiner />
      </div>
    )
  }

  // ── Étape 2 : les questions, une à la fois ───────────────────────────────
  if (question) {
    const { faites, total } = avancement(reponses)
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Retour />
        <BarreAvancement faites={faites} total={total} />
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-anthracite-900 mb-5">{question.q}</h2>
        <div className="space-y-2.5">
          {question.options.map((o, i) => (
            <Choix key={o.label} option={o} index={i} onChoisir={choisir} />
          ))}
        </div>
      </div>
    )
  }

  // ── Étape 3 : les vins ───────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Retour label="Changer ma dernière réponse" />

      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-anthracite-900">
          {vins.length ? 'Voilà ce qu’on vous conseille' : 'Rien ne correspond'}
        </h2>
        <p className="text-sm text-anthracite-500 mt-1">
          {vins.length
            ? 'Ouvrez une fiche pour la ranger dans votre cave.'
            : 'Revenez sur une réponse — le budget, souvent, est le plus contraignant.'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {vins.map((v, i) => (
          <WineTile key={v.id} wine={v} variant="compact" index={i} onOpen={() => setFiche(v)} showEnvie={false} />
        ))}
      </div>

      {vins.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <button onClick={() => setRejoue(n => n + 1)} className="btn-ghost text-xs px-4 py-2.5">
            <RefreshCw size={13} /> Une autre sélection
          </button>
          <button onClick={recommencer} className="btn-ghost text-xs px-4 py-2.5">
            <Check size={13} /> Repartir d’une autre envie
          </button>
          {onOpenBibliotheque && (
            <button onClick={onOpenBibliotheque} className="btn-ghost text-xs px-4 py-2.5">
              Explorer toute la bibliothèque
            </button>
          )}
        </div>
      )}

      {fiche && <FicheVin wine={fiche} onClose={() => setFiche(null)} />}
    </div>
  )
}
