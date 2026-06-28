import { useState } from 'react'
import { Sparkles, ChevronRight, ChevronLeft, Wine, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    id: 'occasion',
    title: "L'occasion",
    question: 'Quelle est l\'occasion ?',
    options: [
      { value: 'romantique',  label: 'Dîner romantique',    hint: 'À deux, en amoureux' },
      { value: 'fete',        label: 'Grande fête',          hint: 'Anniversaire, mariage' },
      { value: 'quotidien',   label: 'Quotidien',            hint: 'Repas de semaine' },
      { value: 'garde',       label: 'Mise en cave',         hint: 'Pour garder 5–15 ans' },
      { value: 'affaires',    label: 'Repas d\'affaires',    hint: 'Impression garantie' },
      { value: 'apéritif',    label: 'Apéritif',             hint: 'Moment convivial' },
    ],
  },
  {
    id: 'budget',
    title: 'Le budget',
    question: 'Quel est votre budget par bouteille ?',
    options: [
      { value: '0-15',    label: '< 15 €',      hint: 'Découvertes abordables' },
      { value: '15-30',   label: '15 – 30 €',   hint: 'Bon rapport qualité-prix' },
      { value: '30-60',   label: '30 – 60 €',   hint: 'Qualité supérieure' },
      { value: '60-120',  label: '60 – 120 €',  hint: 'Prestige et grands crus' },
      { value: '120+',    label: '120 € et +',  hint: 'Vins d\'exception' },
    ],
  },
  {
    id: 'plat',
    title: 'Le plat',
    question: 'Avec quel plat ?',
    options: [
      { value: 'viande_rouge', label: 'Viande rouge',     hint: 'Bœuf, agneau, gibier' },
      { value: 'viande_blanche',label: 'Viande blanche',  hint: 'Poulet, veau, porc' },
      { value: 'poisson',      label: 'Poisson',          hint: 'Sole, bar, saumon' },
      { value: 'fruits_mer',   label: 'Fruits de mer',    hint: 'Huîtres, crevettes, homard' },
      { value: 'fromage',      label: 'Fromage',          hint: 'Plateau, raclette, fondue' },
      { value: 'dessert',      label: 'Dessert',          hint: 'Chocolate, fruits, pâtisserie' },
      { value: 'vegetarien',   label: 'Végétarien',       hint: 'Légumes, pâtes, risotto' },
    ],
  },
  {
    id: 'profil',
    title: 'Le profil',
    question: 'Quel profil aromatique vous attire ?',
    options: [
      { value: 'fruité',    label: 'Fruité',    hint: 'Cerise, cassis, framboise' },
      { value: 'boisé',     label: 'Boisé',     hint: 'Vanille, café, chêne' },
      { value: 'minéral',   label: 'Minéral',   hint: 'Pierre à fusil, craie' },
      { value: 'épicé',     label: 'Épicé',     hint: 'Poivre, réglisse, herbes' },
      { value: 'floral',    label: 'Floral',    hint: 'Rose, violette, jasmin' },
      { value: 'terreux',   label: 'Terreux',   hint: 'Sous-bois, champignon, truffe' },
    ],
  },
]

function getRecommendations(answers) {
  const { occasion, budget, plat, profil } = answers

  const recs = []

  // Rouge sec
  if (['viande_rouge','fromage','gibier'].includes(plat)) {
    recs.push({
      type: 'red',
      region: ['romantique','affaires'].includes(occasion) ? 'Bourgogne' : 'Bordeaux',
      appellation: occasion === 'romantique' ? 'Pommard 1er Cru' : 'Saint-Émilion Grand Cru',
      profil: ['boisé','fruité','terreux'].includes(profil) ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Cerise noire, vanille, épices douces',
      temperature: '16–18°C', carafage: '1h',
      pourquoi: `Le ${profil || 'fruité'} s'exprime magnifiquement avec les tanins fondus de ce vin.`,
    })
    recs.push({
      type: 'red', region: 'Rhône Nord',
      appellation: 'Crozes-Hermitage',
      profil: profil === 'épicé' ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Poivre noir, olive, fruits noirs', temperature: '16–18°C', carafage: '45min',
      pourquoi: 'La Syrah du Rhône Nord sublime les viandes grillées et le gibier.',
    })
  }

  if (plat === 'poisson' || plat === 'fruits_mer') {
    recs.push({
      type: 'white', region: 'Bourgogne',
      appellation: 'Meursault',
      profil: profil === 'boisé' ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Beurre, noisette, agrumes, minéral', temperature: '12–14°C',
      pourquoi: 'Le Chardonnay de Meursault et ses notes beurrées épousent parfaitement le poisson.',
    })
    recs.push({
      type: 'white', region: 'Loire',
      appellation: 'Sancerre',
      profil: profil === 'minéral' ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Citron, buis, pierre à fusil', temperature: '10–12°C',
      pourquoi: 'La minéralité du Sauvignon Blanc de Sancerre est un classique avec les fruits de mer.',
    })
  }

  if (plat === 'dessert') {
    recs.push({
      type: 'sweet', region: 'Bordeaux',
      appellation: 'Sauternes',
      profil: '★ Accord idéal',
      aromes: 'Miel, abricot confit, vanille, safran', temperature: '8–10°C',
      pourquoi: 'Le Sauternes est l\'accord classique par excellence pour les desserts.',
    })
  }

  if (occasion === 'apéritif') {
    recs.push({
      type: 'sparkling', region: 'Champagne',
      appellation: 'Champagne Brut',
      profil: '★ Accord idéal',
      aromes: 'Brioche, pomme, citron, craie', temperature: '8–10°C',
      pourquoi: 'Un Champagne Brut s\'impose à l\'apéritif pour sa fraîcheur et son élégance.',
    })
  }

  if (occasion === 'quotidien' && !recs.length) {
    recs.push({
      type: 'red', region: 'Beaujolais',
      appellation: 'Morgon',
      profil: profil === 'fruité' ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Cerise, pivoine, minéral', temperature: '14–16°C',
      pourquoi: 'Le Gamay de Morgon offre un rapport qualité-prix imbattable pour le quotidien.',
    })
    recs.push({
      type: 'white', region: 'Languedoc',
      appellation: 'Picpoul de Pinet',
      profil: profil === 'minéral' ? '★ Accord idéal' : 'Bon accord',
      aromes: 'Citron vert, floral, iodé', temperature: '10–12°C',
      pourquoi: 'Un blanc léger et vif parfait pour les repas quotidiens, à prix doux.',
    })
  }

  if (!recs.length) {
    recs.push({
      type: 'red', region: 'Bourgogne',
      appellation: 'Gevrey-Chambertin',
      profil: '★ Accord idéal',
      aromes: 'Cerise, épices, sous-bois, truffe', temperature: '16°C', carafage: '45min',
      pourquoi: 'Un grand Pinot Noir polyvalent qui répond à de nombreuses occasions.',
    })
  }

  return recs.slice(0, 3)
}

const TYPE_COLORS = {
  red: { bg: 'bg-wine-50', border: 'border-wine-200', dot: 'bg-wine-700', label: 'Rouge' },
  white: { bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Blanc' },
  rosé: { bg: 'bg-pink-50', border: 'border-pink-200', dot: 'bg-pink-400', label: 'Rosé' },
  sparkling: { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-400', label: 'Effervescent' },
  sweet: { bg: 'bg-amber-100', border: 'border-amber-300', dot: 'bg-amber-700', label: 'Liquoreux' },
}

export default function SommelierForm() {
  const [step, setStep] = useState(0)
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

  const progress = ((step) / STEPS.length) * 100

  if (results) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-wine-gradient flex items-center justify-center shadow-wine">
            <Sparkles size={18} className="text-gold-400" />
          </div>
          <div>
            <h2 className="section-title">Recommandations du Sommelier</h2>
            <p className="section-sub">Sélection personnalisée selon vos critères</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {results.map((rec, i) => {
            const cfg = TYPE_COLORS[rec.type] || TYPE_COLORS.red
            return (
              <div key={i} className={`card p-5 border ${cfg.border} ${cfg.bg} animate-slide-up`}
                   style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-serif text-base font-semibold text-anthracite-900">{rec.appellation}</div>
                    <div className="text-xs text-anthracite-500 mt-0.5">{rec.region}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className="text-xs font-medium text-anthracite-600">{cfg.label}</span>
                  </div>
                </div>
                <p className="text-xs text-anthracite-600 italic mb-3">{rec.aromes}</p>
                <div className="flex items-center gap-3 text-xs text-anthracite-500 mb-3">
                  {rec.temperature && <span>🌡 {rec.temperature}</span>}
                  {rec.carafage    && <span>⏱ Carafage {rec.carafage}</span>}
                </div>
                <div className="pt-3 border-t border-anthracite-200/60">
                  <div className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${
                    rec.profil.startsWith('★') ? 'bg-gold-500/20 text-gold-700' : 'bg-anthracite-100 text-anthracite-500'
                  }`}>
                    {rec.profil}
                  </div>
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
          <p className="section-sub">Trouvez le vin idéal en 4 questions</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-anthracite-400 mb-2">
          <span>{STEPS[step].title}</span>
          <span>{step + 1} / {STEPS.length}</span>
        </div>
        <div className="h-1 bg-anthracite-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-wine-700 to-gold-500 rounded-full transition-all duration-500"
               style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
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
                  ? 'border-wine-700 bg-wine-50 shadow-wine/30 shadow-md'
                  : 'border-anthracite-200 bg-white hover:border-wine-300 hover:bg-wine-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-anthracite-900">{opt.label}</div>
                  <div className="text-xs text-anthracite-400 mt-0.5">{opt.hint}</div>
                </div>
                <ArrowRight size={14} className="text-anthracite-300 group-hover:text-wine-700 transition-colors flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)}
                className="mt-6 flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-anthracite-700 transition-colors cursor-pointer">
          <ChevronLeft size={14} />
          Retour
        </button>
      )}
    </div>
  )
}
