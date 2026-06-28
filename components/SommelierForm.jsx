import { useState } from 'react'
import { Sparkles, ChevronLeft, ArrowRight, Wine, Star, Thermometer, Clock } from 'lucide-react'
import { WINE_DB, MILLESIMES_DB } from '../data/wineDatabase'

// Prix indicatifs par appellation (€/bouteille entrée de gamme)
const APPELLATION_PRICE = {
  'Pauillac':                 80,
  'Saint-Émilion Grand Cru':  40,
  'Sauternes':               120,
  'Gevrey-Chambertin':        55,
  'Meursault':                45,
  'Chablis Grand Cru':        35,
  'Châteauneuf-du-Pape':      30,
  'Côte-Rôtie':               60,
  'Condrieu':                 40,
  'Sancerre':                 18,
  'Chinon':                   12,
  'Alsace Grand Cru':         20,
  'Bandol':                   22,
  'Côtes de Provence Rosé':    8,
  // Vins quotidiens hors WINE_DB
  'Morgon':                   10,
  'Moulin-à-Vent':            12,
  'Picpoul de Pinet':          7,
  'Côtes du Rhône':            6,
  'Muscadet':                  6,
  'Languedoc Rouge':           5,
  'Vin de Pays d\'Oc':         5,
}

const BUDGET_RANGES = {
  '0-5':    [0, 5],
  '5-15':   [5, 15],
  '15-30':  [15, 30],
  '30-60':  [30, 60],
  '60-120': [60, 120],
  '120+':   [120, 9999],
}

const STEPS = [
  {
    id: 'occasion',
    title: "L'occasion",
    question: "C'est pour quelle occasion ?",
    options: [
      { value: 'romantique',    label: 'Dîner romantique',   hint: 'À deux, soirée spéciale' },
      { value: 'fete',          label: 'Fête ou célébration', hint: 'Anniversaire, mariage' },
      { value: 'quotidien',     label: 'Repas du quotidien',  hint: 'Tous les jours, sans prise de tête' },
      { value: 'aperitif',      label: 'Apéritif',            hint: 'Moment convivial entre amis' },
      { value: 'affaires',      label: 'Repas d\'affaires',   hint: 'Faire bonne impression' },
      { value: 'garde',         label: 'Mise en cave',        hint: 'Investir pour plus tard' },
    ],
  },
  {
    id: 'budget',
    title: 'Le budget',
    question: 'Combien souhaitez-vous dépenser par bouteille ?',
    options: [
      { value: '0-5',    label: 'Moins de 5 €',  hint: 'Vins de table, bonne surprise' },
      { value: '5-15',   label: '5 – 15 €',      hint: 'Rapport qualité-prix imbattable' },
      { value: '15-30',  label: '15 – 30 €',     hint: 'Beaux vins de plaisir' },
      { value: '30-60',  label: '30 – 60 €',     hint: 'Qualité supérieure, belles régions' },
      { value: '60-120', label: '60 – 120 €',    hint: 'Grands crus et prestige' },
      { value: '120+',   label: '120 € et plus', hint: 'Exception et collection' },
    ],
  },
  {
    id: 'plat',
    title: 'Le plat',
    question: 'Avec quoi allez-vous le boire ?',
    options: [
      { value: 'viande_rouge',   label: 'Viande rouge',      hint: 'Bœuf, agneau, magret, gibier' },
      { value: 'viande_blanche', label: 'Viande blanche',    hint: 'Poulet, veau, porc, dinde' },
      { value: 'poisson',        label: 'Poisson',           hint: 'Saumon, sole, daurade, truite' },
      { value: 'fruits_mer',     label: 'Fruits de mer',     hint: 'Huîtres, moules, crevettes, homard' },
      { value: 'fromage',        label: 'Fromage',           hint: 'Plateau, raclette, fondue' },
      { value: 'dessert',        label: 'Dessert',           hint: 'Gâteau, fruits, chocolat' },
      { value: 'vegetarien',     label: 'Légumes / Végétarien', hint: 'Pâtes, risotto, gratin, légumes' },
      { value: 'aperitif_seul',  label: 'À l\'apéritif seul', hint: 'Sans plat particulier' },
    ],
  },
  {
    id: 'profil',
    title: 'Votre goût',
    question: 'Quel style de vin vous attire le plus ?',
    options: [
      { value: 'fruité',   label: 'Fruité & Gourmand',   hint: 'Goût de fruits, facile à boire, agréable' },
      { value: 'boisé',    label: 'Riche & Généreux',    hint: 'Rond, corsé, un peu vanillé, chaleureux' },
      { value: 'minéral',  label: 'Frais & Léger',       hint: 'Frais, facile à déguster, désaltérant' },
      { value: 'épicé',    label: 'Puissant & Épicé',    hint: 'Caractère, intensité, notes de poivre' },
      { value: 'floral',   label: 'Délicat & Floral',    hint: 'Doux, parfumé, élégant et subtil' },
      { value: 'terreux',  label: 'Complexe & Profond',  hint: 'Racé, nuancé, notes de sous-bois' },
      { value: 'je_sais_pas', label: 'Je ne sais pas encore', hint: 'Le sommelier choisit pour moi !' },
    ],
  },
]

// ── Moteur de recommandation ───────────────────────────────────────────────────
function getRecommendations(answers) {
  const { occasion, budget, plat, profil } = answers
  const [budgetMin, budgetMax] = BUDGET_RANGES[budget] || [0, 9999]

  // Types de vins adaptés au plat (sans sparkling/effervescent)
  const platTypeMap = {
    viande_rouge:   ['red'],
    viande_blanche: ['white', 'red'],
    poisson:        ['white'],
    fruits_mer:     ['white', 'rosé'],
    fromage:        ['red', 'white', 'sweet'],
    dessert:        ['sweet', 'white'],
    vegetarien:     ['white', 'rosé', 'red'],
    aperitif_seul:  ['white', 'rosé'],
  }
  const allowedTypes = platTypeMap[plat] || ['red', 'white', 'rosé', 'sweet']

  // Profil → cépages/régions favoris
  const profilRegionBonus = {
    fruité:      ['Bourgogne', 'Beaujolais', 'Loire', 'Provence'],
    boisé:       ['Bordeaux', 'Rhône Sud', 'Languedoc'],
    minéral:     ['Bourgogne', 'Loire', 'Alsace', 'Champagne'],
    épicé:       ['Rhône Nord', 'Rhône Sud', 'Languedoc', 'Sud-Ouest'],
    floral:      ['Alsace', 'Loire', 'Rhône Nord', 'Provence'],
    terreux:     ['Bourgogne', 'Bordeaux', 'Jura'],
    je_sais_pas: [],
  }
  const bonusRegions = profilRegionBonus[profil] || []

  // Scorer chaque appellation de WINE_DB
  const scored = WINE_DB
    .filter(w => {
      // Exclure sparkling/effervescent
      if (w.type === 'sparkling') return false
      // Filtrer par type adapté au plat
      if (!allowedTypes.includes(w.type)) return false
      // Filtrer par budget
      const price = APPELLATION_PRICE[w.appellation] || 30
      return price >= budgetMin && price <= budgetMax
    })
    .map(w => {
      let score = 0
      if (bonusRegions.includes(w.region)) score += 3
      // Bonus occasion
      if (occasion === 'garde' && (w.drinkUntil >= 15)) score += 2
      if (occasion === 'affaires' && APPELLATION_PRICE[w.appellation] >= 40) score += 2
      if (occasion === 'romantique' && ['Bourgogne', 'Bordeaux'].includes(w.region)) score += 1
      if (occasion === 'aperitif' && ['white', 'rosé'].includes(w.type)) score += 2
      if (occasion === 'quotidien' && (APPELLATION_PRICE[w.appellation] || 30) <= 20) score += 2
      // Bonus plat-type match
      const platTypeFirst = (platTypeMap[plat] || ['red'])[0]
      if (w.type === platTypeFirst) score += 2
      return { wine: w, score }
    })
    .sort((a, b) => b.score - a.score)

  // Construire les résultats depuis WINE_DB
  const results = scored.slice(0, 5).map(({ wine }) => {
    // Trouver les bons millésimes depuis MILLESIMES_DB pour cette appellation/région
    const millesimesMatches = MILLESIMES_DB.filter(m =>
      m[2] === wine.region &&
      m[7] === 'Privilégier' &&
      (m[1] === typeToLabel(wine.type))
    ).map(m => m[0]).sort((a, b) => b - a).slice(0, 4)

    // Millésimes de la fiche si MILLESIMES_DB n'a rien
    const millesimes = millesimesMatches.length > 0
      ? millesimesMatches
      : wine.bonsMilsimes.slice(-4).reverse()

    const matchLabel = bonusRegions.includes(wine.region) ? '★ Accord idéal' : 'Bon accord'
    const pourquoi = buildPourquoi(wine, plat, profil, occasion)

    return {
      appellation: wine.appellation,
      region:      wine.region,
      type:        wine.type,
      aromes:      wine.aromes,
      temperature: wine.temperature,
      carafage:    wine.carafage,
      garde:       wine.garde,
      cepages:     wine.cepages,
      millesimes,
      matchLabel,
      pourquoi,
    }
  })

  // Compléter avec des vins abordables si moins de 3 résultats
  if (results.length < 3) {
    const fallbacks = getFallbacks(plat, profil, budgetMin, budgetMax, results.length)
    results.push(...fallbacks)
  }

  return results.slice(0, 5)
}

function typeToLabel(type) {
  return { red: 'Rouge', white: 'Blanc', rosé: 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }[type] || 'Rouge'
}

function buildPourquoi(wine, plat, profil, occasion) {
  const platLabels = {
    viande_rouge: 'les viandes rouges',
    viande_blanche: 'les viandes blanches',
    poisson: 'le poisson',
    fruits_mer: 'les fruits de mer',
    fromage: 'le fromage',
    dessert: 'les desserts',
    vegetarien: 'les plats végétariens',
    aperitif_seul: "l'apéritif",
  }
  const platLabel = platLabels[plat] || 'votre plat'

  if (wine.type === 'sweet')    return `Le ${wine.appellation} est le partenaire classique de ${platLabel}. Sa douceur équilibre parfaitement les saveurs.`
  if (wine.type === 'rosé')     return `Ce rosé de ${wine.region} est idéal : frais, léger et polyvalent, parfait pour ${platLabel}.`
  if (profil === 'minéral')     return `Ce vin frais et tendu de ${wine.region} est parfaitement rafraîchissant avec ${platLabel}.`
  if (profil === 'fruité')      return `Le ${wine.appellation} offre des arômes fruités gourmands qui s'accordent délicieusement avec ${platLabel}.`
  if (profil === 'boisé')       return `La richesse et la générosité du ${wine.appellation} subliment ${platLabel}.`
  if (profil === 'épicé')       return `Le caractère épicé et puissant de ce ${wine.region} est un mariage naturel avec ${platLabel}.`
  if (profil === 'floral')      return `La délicatesse florale du ${wine.appellation} apporte une belle élégance à votre repas.`
  if (occasion === 'affaires')  return `Le ${wine.appellation} est une valeur sûre qui fera forte impression — prestige et élégance assurés.`
  if (occasion === 'garde')     return `Ce vin de ${wine.region} peut se garder ${wine.garde}. Un excellent investissement pour votre cave.`
  return `Le ${wine.appellation} est une belle sélection de ${wine.region} pour accompagner ${platLabel}.`
}

function getFallbacks(plat, profil, budgetMin, budgetMax, existing) {
  const all = [
    { appellation: 'Morgon', region: 'Beaujolais', type: 'red', aromes: 'Cerise, pivoine, minéral', temperature: '14–16°C', carafage: null, garde: '5–8 ans', cepages: ['Gamay'], millesimes: [2022, 2020, 2019], matchLabel: 'Bon accord', pourquoi: 'Le Gamay de Morgon est un vin fruité, accessible et convivial — idéal pour débuter.' },
    { appellation: 'Sancerre', region: 'Loire', type: 'white', aromes: 'Agrumes, buis, minéral', temperature: '10–12°C', carafage: null, garde: '3–7 ans', cepages: ['Sauvignon Blanc'], millesimes: [2022, 2020, 2019], matchLabel: 'Bon accord', pourquoi: 'Le Sancerre est le blanc français par excellence — frais, élégant et facile à apprécier.' },
    { appellation: 'Côtes de Provence Rosé', region: 'Provence', type: 'rosé', aromes: 'Framboise, pêche, fleurs', temperature: '8–10°C', carafage: null, garde: '1–3 ans', cepages: ['Grenache', 'Cinsault'], millesimes: [2024, 2023, 2022], matchLabel: 'Bon accord', pourquoi: 'Ce rosé de Provence est le vin du partage — léger, fruité et toujours apprécié.' },
    { appellation: 'Chinon', region: 'Loire', type: 'red', aromes: 'Framboise, poivron vert, craie', temperature: '14–16°C', carafage: '30min', garde: '5–15 ans', cepages: ['Cabernet Franc'], millesimes: [2022, 2020, 2019], matchLabel: 'Bon accord', pourquoi: 'Le Chinon est un rouge léger et fruité, parfait pour une découverte sans se tromper.' },
    { appellation: 'Alsace Grand Cru', region: 'Alsace', type: 'white', aromes: 'Pêche, fleurs blanches, zeste', temperature: '10–12°C', carafage: null, garde: '10–30 ans', cepages: ['Riesling'], millesimes: [2019, 2018, 2017], matchLabel: 'Bon accord', pourquoi: "Le Riesling d'Alsace Grand Cru est l'un des plus grands blancs du monde — aromatique et équilibré." },
  ]
  return all.slice(0, 3 - existing)
}

const TYPE_COLORS = {
  red:      { bg: 'bg-wine-50',    border: 'border-wine-200',   dot: 'bg-wine-700',   label: 'Rouge' },
  white:    { bg: 'bg-amber-50',   border: 'border-amber-200',  dot: 'bg-amber-500',  label: 'Blanc' },
  rosé:     { bg: 'bg-pink-50',    border: 'border-pink-200',   dot: 'bg-pink-400',   label: 'Rosé' },
  sweet:    { bg: 'bg-amber-100',  border: 'border-amber-300',  dot: 'bg-amber-700',  label: 'Liquoreux' },
}

// ── UI ─────────────────────────────────────────────────────────────────────────
export default function SommelierForm() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const current = STEPS[step]

  const select = (value) => {
    const newAnswers = { ...answers, [current.id]: value }
    setAnswers(newAnswers)
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 180)
    } else {
      setResults(getRecommendations(newAnswers))
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setResults(null) }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-wine"
               style={{ background: 'linear-gradient(135deg, #9a1633 0%, #72102a 100%)' }}>
            <Sparkles size={18} className="text-gold-400" />
          </div>
          <div>
            <h2 className="section-title">Vos Recommandations</h2>
            <p className="section-sub">{results.length} sélection{results.length > 1 ? 's' : ''} personnalisée{results.length > 1 ? 's' : ''} par votre sommelier</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {results.map((rec, i) => {
            const cfg = TYPE_COLORS[rec.type] || TYPE_COLORS.red
            const isIdeal = rec.matchLabel.startsWith('★')
            return (
              <div
                key={i}
                className={`card p-5 border ${cfg.border} ${cfg.bg} animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-serif text-base font-semibold text-anthracite-900">{rec.appellation}</div>
                    <div className="text-xs text-anthracite-500 mt-0.5">{rec.region} · {rec.cepages?.join(', ')}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="text-xs font-medium text-anthracite-600">{cfg.label}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isIdeal ? 'bg-gold-500/20 text-gold-700' : 'bg-anthracite-100 text-anthracite-500'
                    }`}>
                      {rec.matchLabel}
                    </span>
                  </div>
                </div>

                {/* Arômes */}
                <p className="text-xs text-anthracite-600 italic mb-3">{rec.aromes}</p>

                {/* Service */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-anthracite-500 mb-3">
                  {rec.temperature && (
                    <span className="flex items-center gap-1">
                      <Thermometer size={10} />
                      {rec.temperature}
                    </span>
                  )}
                  {rec.carafage && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      Carafage {rec.carafage}
                    </span>
                  )}
                  {rec.garde && (
                    <span className="flex items-center gap-1">
                      <Wine size={10} />
                      Garde {rec.garde}
                    </span>
                  )}
                </div>

                {/* Millésimes recommandés */}
                {rec.millesimes?.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-1.5">
                      Millésimes à privilégier
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.millesimes.map(y => (
                        <span
                          key={y}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                          style={{ background: cfg.dot.replace('bg-','').includes('wine') ? '#fae0e4' : '#fef3c7',
                                   borderColor: 'transparent', color: '#1e2426' }}
                        >
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pourquoi */}
                <div className="pt-3 border-t border-anthracite-200/60">
                  <p className="text-xs text-anthracite-600 leading-relaxed">{rec.pourquoi}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={reset} className="btn-ghost w-full justify-center">
          Nouvelle recherche
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-wine"
             style={{ background: 'linear-gradient(135deg, #9a1633 0%, #72102a 100%)' }}>
          <Sparkles size={18} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">Sommelier Virtuel</h2>
          <p className="section-sub">4 questions pour trouver votre vin idéal</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-anthracite-400 mb-2">
          <span>{STEPS[step].title}</span>
          <span>{step + 1} / {STEPS.length}</span>
        </div>
        <div className="h-1.5 bg-anthracite-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((step + 1) / STEPS.length) * 100}%`,
              background: 'linear-gradient(to right, #9a1633, #c9a84c)',
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={step} className="animate-slide-up">
        <h3 className="font-serif text-xl font-semibold text-anthracite-900 mb-5">{current.question}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer group ${
                answers[current.id] === opt.value
                  ? 'border-wine-700 bg-wine-50 shadow-md'
                  : 'border-anthracite-200 bg-white hover:border-wine-300 hover:bg-wine-50/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-anthracite-900">{opt.label}</div>
                  <div className="text-xs text-anthracite-400 mt-0.5 leading-snug">{opt.hint}</div>
                </div>
                <ArrowRight size={14} className="text-anthracite-300 group-hover:text-wine-700 transition-colors flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back */}
      {step > 0 && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="mt-6 flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-anthracite-700 transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
          Retour
        </button>
      )}
    </div>
  )
}
