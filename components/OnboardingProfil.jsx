import { useState, useMemo, useCallback } from 'react'
import { Wine, ArrowRight, Quote } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import WineVisuel from './WineVisuel'
import { diversifyByRegion, buildRaison, getRegionsPref } from '../lib/suggestions'
import RegionsPrefFilter from './RegionsPrefFilter'
import useModalBehavior from '../lib/useModal'
import Icone from './Icone'

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
  { id: 'debutant', ic: 'debutant', label: 'Je débute',            hint: 'Langage simple, vins « faciles à aimer », chaque terme expliqué' },
  { id: 'amateur',  ic: 'amateur', label: 'J\'ai quelques repères', hint: 'J\'aime le vin, je veux approfondir et explorer' },
  { id: 'expert',   ic: 'expert', label: 'Je m\'y connais bien',  hint: 'Recommandations ciblées et techniques, sans vulgarisation' },
]

const QUESTIONS = {
  debutant: [
    {
      id: 'sucre',
      q: 'Vous aimez quand c\'est plutôt sucré ou sec ?',
      options: [
        { ic: 'doux', label: 'Doux, comme un jus de fruit' },
        { ic: 'agrumes', label: 'Sec et frais' },
        { ic: 'incertain', label: 'Aucune idée, je découvre !' },
      ],
    },
    {
      id: 'fruits',
      q: 'Quels types de fruits préférez-vous ?',
      options: [
        { ic: 'fruits_rouges', label: 'Fruits rouges (fraise, cerise)' },
        { ic: 'fruits_jaunes', label: 'Fruits jaunes (pêche, abricot)' },
        { ic: 'agrumes', label: 'Agrumes (citron, pamplemousse)' },
        { ic: 'fruits_noirs', label: 'Fruits noirs (mûre, cassis)' },
      ],
    },
    {
      id: 'intensite',
      q: 'En bouche, vous préférez…',
      options: [
        { ic: 'leger', label: 'Léger et facile à boire' },
        { ic: 'equilibre', label: 'Équilibré' },
        { ic: 'puissant', label: 'Costaud, qui a du corps' },
      ],
    },
    {
      id: 'budget',
      q: 'Votre budget habituel pour une bouteille ?',
      options: [
        { ic: 'petit_prix', label: 'Moins de 10 €' },
        { ic: 'budget', label: '10 à 20 €' },
        { ic: 'prestige', label: 'Plus de 20 €' },
      ],
    },
  ],
  expert: [
    {
      id: 'bouche',
      q: 'Qu\'aimez-vous en bouche : puissant, corsé, léger, âpre ?',
      options: [
        { ic: 'puissant', label: 'Puissant et corsé' },
        { ic: 'leger', label: 'Léger et élégant' },
        { ic: 'tannique', label: 'Tannique, avec de la mâche' },
        { ic: 'mineral', label: 'Minéral et tendu' },
      ],
    },
    {
      id: 'frequence',
      q: 'Quelle est votre fréquence de consommation de vin ?',
      options: [
        { ic: 'amateur', label: 'Occasionnelle (fêtes, dîners)' },
        { ic: 'millesime', label: 'Hebdomadaire' },
        { ic: 'vigne', label: 'Passionné, plusieurs fois par semaine' },
      ],
    },
    {
      id: 'regions',
      q: 'Vos régions de prédilection ?',
      options: [
        { ic: 'amateur', label: 'Bordeaux & Sud-Ouest' },
        { ic: 'fruits_rouges', label: 'Bourgogne & Beaujolais' },
        { ic: 'soleil', label: 'Rhône & Sud' },
        { ic: 'chateau', label: 'Loire' },
        { ic: 'apero', label: 'Grand Est (Alsace, Champagne, Jura)' },
        { ic: 'decouverte', label: 'Éclectique, tout m\'intéresse' },
      ],
    },
    {
      id: 'budget',
      q: 'Budget par bouteille, en général ?',
      options: [
        { ic: 'budget', label: '10 à 20 €' },
        { ic: 'prestige', label: '20 à 50 €' },
        { ic: 'prestige', label: '50 € et plus' },
      ],
    },
  ],
}

// Budget max en euros déduit du libellé choisi par l'utilisateur
function budgetMax(label) {
  if (!label) return null
  if (label.includes('Moins de 10')) return 10
  if (label.includes('10 à 20') || label.includes('10 a 20')) return 20
  if (label.includes('20 à 50')) return 50
  if (label.includes('Plus de 20')) return 999
  if (label.includes('50 € et plus') || label.includes('50 €')) return 999
  return null
}

// Score un vin en fonction du niveau + goûts + budget récoltés pendant l'onboarding
function scoreWine(w, niveau, gouts) {
  let s = 0

  if (niveau === 'debutant' && w.difficulte === 'facile') s += 3
  if (niveau === 'amateur' && w.difficulte === 'explorer') s += 2
  if (niveau === 'expert' && (w.difficulte === 'pointu' || w.difficulte === 'explorer')) s += 3

  if (gouts.sucre === 'Doux, comme un jus de fruit' && (w.type === 'sweet' || w.jauges.douceur >= 3)) s += 3
  if (gouts.sucre === 'Sec et frais' && w.jauges.douceur <= 2) s += 3

  if (gouts.intensite === 'Léger et facile à boire' && w.jauges.puissance <= 2) s += 3
  if (gouts.intensite === 'Équilibré' && w.jauges.puissance === 3) s += 2
  if (gouts.intensite === 'Costaud, qui a du corps' && w.jauges.puissance >= 4) s += 3

  if (gouts.fruits) {
    const aromes = w.aromes.toLowerCase()
    if (gouts.fruits.includes('rouges') && /fraise|cerise|framboise|groseille/.test(aromes)) s += 2
    if (gouts.fruits.includes('jaunes') && /pêche|abricot|coing/.test(aromes)) s += 2
    if (gouts.fruits.includes('Agrumes') && /citron|agrume|pamplemousse/.test(aromes)) s += 2
    if (gouts.fruits.includes('noirs') && /mûre|cassis|prune/.test(aromes)) s += 2
  }

  if (gouts.bouche === 'Puissant et corsé' && w.jauges.puissance >= 4) s += 3
  if (gouts.bouche === 'Léger et élégant' && w.jauges.puissance <= 2) s += 3
  if (gouts.bouche === 'Tannique, avec de la mâche' && w.jauges.tanins >= 4) s += 3
  if (gouts.bouche === 'Minéral et tendu' && w.type === 'white' && w.jauges.tanins <= 1) s += 3

  if (gouts.regions) {
    if (gouts.regions.includes('Bordeaux') && /Bordeaux|Sud-Ouest/.test(w.region)) s += 2
    if (gouts.regions.includes('Bourgogne') && /Bourgogne|Beaujolais/.test(w.region)) s += 2
    if (gouts.regions.includes('Rhône') && /Rhône|Languedoc|Roussillon|Provence/.test(w.region)) s += 2
    if (gouts.regions.includes('Loire') && /Loire/.test(w.region)) s += 2
    if (gouts.regions.includes('Grand Est') && /Alsace|Champagne|Jura|Savoie/.test(w.region)) s += 2
  }

  const max = budgetMax(gouts.budget)
  if (max != null) {
    if (w.prixMoyen <= max) s += 2
    else s -= 3
  }

  return s
}

const N_RESULTS = 5

// Traduit les réponses d'onboarding en critères pour buildRaison
function criteresFromGouts(niveau, gouts) {
  const c = { niveau }
  if (gouts.sucre?.includes('Doux')) c.sucre = 'doux'
  if (gouts.sucre?.includes('Sec')) c.sucre = 'sec'
  if (gouts.intensite?.includes('Léger')) c.style = 'leger'
  if (gouts.intensite === 'Équilibré') c.style = 'equilibre'
  if (gouts.intensite?.includes('Costaud')) c.style = 'costaud'
  if (gouts.bouche?.includes('Puissant')) c.style = 'puissant'
  if (gouts.bouche?.includes('Léger')) c.style = 'leger'
  if (gouts.bouche?.includes('Tannique')) c.style = 'puissant'
  if (gouts.bouche?.includes('Minéral')) c.fraicheur = true
  const max = budgetMax(gouts.budget)
  if (max != null && max < 999) c.budget = max
  return c
}

// Profil par défaut posé quand l'utilisateur quitte l'onboarding avant la fin
// (Échap ou lien « plus tard ») : niveau intermédiaire raisonnable, sans
// goûts particuliers — cohérent avec les valeurs utilisées ailleurs
// (goutsAppris.js, SommelierForm, AssistantView, RegionsPrefFilter).
const PROFIL_PAR_DEFAUT = { niveau: 'amateur', gouts: {} }

export default function OnboardingProfil({ onComplete }) {
  // Échappatoire : pas question de laisser l'utilisateur bloqué sans issue.
  // Échap pose un profil par défaut raisonnable puis ferme, comme le lien
  // « plus tard » ci-dessous — jamais une fermeture qui laisserait l'app
  // sans aucun profil.
  const skipOnboarding = useCallback(() => {
    try { localStorage.setItem(PROFIL_KEY, JSON.stringify(PROFIL_PAR_DEFAUT)) } catch {}
    onComplete(PROFIL_PAR_DEFAUT)
  }, [onComplete])
  useModalBehavior(skipOnboarding)
  const [niveau, setNiveau] = useState(null)
  const [step, setStep]     = useState(0)
  const [answers, setAnswers] = useState({})
  const [pendingProfil, setPendingProfil] = useState(null)
  const [regionsPref, setRegionsPrefState] = useState(() =>
    typeof window === 'undefined' ? [] : getRegionsPref()
  )
  const isConnaisseur = niveau === 'expert'

  const questions = niveau ? QUESTIONS[niveau === 'debutant' ? 'debutant' : 'expert'] : []
  const currentQ  = niveau && step < questions.length ? questions[step] : null

  // Résultats recalculés à chaque changement de régions préférées
  const results = useMemo(() => {
    if (!pendingProfil) return null
    const activeRegions = isConnaisseur ? regionsPref : []
    const pool = activeRegions.length ? WINE_DB.filter(w => activeRegions.includes(w.region)) : WINE_DB
    const scored = pool
      .map(w => ({ w, s: scoreWine(w, pendingProfil.niveau, pendingProfil.gouts) }))
      .sort((a, b) => b.s - a.s)
    return diversifyByRegion(scored, N_RESULTS) // jamais deux vins de la même région
  }, [pendingProfil, regionsPref, isConnaisseur])

  const criteres = useMemo(
    () => (pendingProfil ? criteresFromGouts(pendingProfil.niveau, pendingProfil.gouts) : {}),
    [pendingProfil]
  )

  const answer = (qid, label) => {
    const next = { ...answers, [qid]: label }
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      setPendingProfil({ niveau, gouts: next })
    }
  }

  const finish = () => {
    if (!pendingProfil) return
    try { localStorage.setItem(PROFIL_KEY, JSON.stringify(pendingProfil)) } catch {}
    onComplete(pendingProfil)
  }

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      role="dialog" aria-modal="true" aria-label="Bienvenue — faisons connaissance"
    >
      <div className="modal-panel sm:max-w-md max-h-[92vh] shadow-card-hover">

        {/* Header */}
        <div className="px-6 py-5 flex-shrink-0 text-cream text-center"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-2">
            <Wine size={18} className="text-gold-400" />
          </div>
          <h3 className="font-serif text-xl font-medium">Bienvenue sur Œno !</h3>
          <p className="text-cream/70 text-xs mt-1">
            {results ? `Voici $🎉 {results.length} vins pour démarrer, choisis pour vous` : niveau ? `Encore ${questions.length - step} petite${questions.length - step > 1 ? 's' : ''} question${questions.length - step > 1 ? 's' : ''}…` : '5 questions max pour tout personnaliser pour vous.'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {results ? (
            <div className="animate-fade-in-up">
              <h4 className="font-serif text-base font-bold text-anthracite-900 text-center mb-1">
                {results.length} vins pour démarrer
              </h4>
              <p className="text-xs text-anthracite-400 text-center mb-5">
                Sélectionnés selon vos réponses — vous les retrouverez dans la Bibliothèque
              </p>
              {isConnaisseur && (
                <RegionsPrefFilter selected={regionsPref} onChange={setRegionsPrefState} />
              )}
              <div className="space-y-3">
                {results.map((w, i) => (
                  <div
                    key={w.id}
                    className="card p-4 flex items-start gap-3 animate-scale-in"
                    style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}
                  >
                    <WineVisuel type={w.type} size={20} className="flex-shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-anthracite-900 truncate">{w.appellation}</span>
                      <span className="block text-xs text-anthracite-400 truncate">{w.region} · ~{w.prixMoyen} €</span>
                      <span className="block text-xs text-anthracite-500 italic mt-0.5">« {w.enUneMot} »</span>
                      <span className="flex items-start gap-1.5 text-[11px] text-anthracite-600 italic mt-1.5 leading-relaxed">
                        <Quote size={10} className="flex-shrink-0 mt-0.5 text-gold-600" />
                        <span>{buildRaison(w, { ...criteres, regionPref: isConnaisseur && regionsPref.includes(w.region) })}</span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={finish}
                className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-cream bg-nuit hover:bg-nuit-doux active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                Découvrir Œno <ArrowRight size={15} />
              </button>
            </div>
          ) : !niveau ? (
            <div className="animate-fade-in-up">
              <h4 className="font-serif text-base font-bold text-anthracite-900 text-center mb-5">
                Le vin et vous, c'est… ?
              </h4>
              <div className="space-y-3">
                {NIVEAUX.map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => setNiveau(o.id)}
                    className="w-full choice-btn p-4 flex items-center gap-4 animate-scale-in"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <Icone nom={o.ic} size={22} className="text-wine-texte flex-shrink-0" />
                    <span>
                      <span className="block text-sm font-bold text-anthracite-900">{o.label}</span>
                      <span className="block text-xs text-anthracite-400 leading-snug mt-0.5">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={skipOnboarding}
                className="mt-5 mx-auto flex text-xs text-anthracite-400 hover:text-anthracite-700 cursor-pointer"
              >
                Plus tard, je verrai ça après
              </button>
            </div>
          ) : currentQ && (
            <div key={currentQ.id} className="animate-slide-up">
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {questions.map((_, i) => (
                  <span key={i} className="rounded-full transition-all"
                        style={{ width: i === step ? 22 : 7, height: 7,
                                 background: i <= step ? '#5c0d22' : '#e7e5e4' }} />
                ))}
              </div>
              <h4 className="font-serif text-base font-bold text-anthracite-900 text-center mb-5">{currentQ.q}</h4>
              <div className="space-y-2.5">
                {currentQ.options.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => answer(currentQ.id, o.label)}
                    className="w-full choice-btn p-4 flex items-center gap-3 animate-scale-in"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <Icone nom={o.ic} size={19} className="text-wine-texte flex-shrink-0" />
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
