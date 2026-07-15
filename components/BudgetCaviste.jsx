import { useState, useCallback } from 'react'
import {
  Coins, RefreshCw, ExternalLink, Wine, Sparkles, Gift, Home, PartyPopper, Users, ChevronDown,
} from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import { EnvieButton } from './Envies'
import { FicheVin } from './BibliothequeView'

// ═══════════════════════════════════════════════════════════════════════════
// Budget caviste — « Composez ma sélection »
// Budget + occasion + couleur → sélection de 3-6 bouteilles (somme ≈ budget ±10%)
// avec le pourquoi de chaque vin et les domaines où le trouver.
// ═══════════════════════════════════════════════════════════════════════════

const BUDGET_CHIPS = [15, 30, 50, 100, 200]

const OCCASIONS = [
  { id: 'diner',   label: 'Dîner entre amis', Icon: Users,       hint: 'De quoi accompagner tout le repas' },
  { id: 'cadeau',  label: 'Cadeau',           Icon: Gift,        hint: 'Peu de bouteilles, mais qui marquent' },
  { id: 'depart',  label: 'Cave de départ',   Icon: Home,        hint: 'Diversité maximale, valeurs sûres' },
  { id: 'grande',  label: 'Grande occasion',  Icon: PartyPopper, hint: 'Moins de flacons, plus haut de gamme' },
]

const COULEURS = [
  { id: 'mixte', label: 'Mixte' },
  { id: 'red',   label: 'Rouge' },
  { id: 'white', label: 'Blanc' },
]

// Contraintes par occasion : nb de bouteilles + biais de composition.
const OCCASION_RULES = {
  diner:  { min: 4, max: 6, favorFacile: 1,  diversifyType: true,  minShare: 0.10 },
  cadeau: { min: 3, max: 4, favorFacile: 0,  diversifyType: false, minShare: 0.18 },
  depart: { min: 5, max: 6, favorFacile: 2,  diversifyType: true,  minShare: 0.08 },
  grande: { min: 3, max: 4, favorFacile: -1, diversifyType: false, minShare: 0.20 },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Compose une sélection : tirages aléatoires notés, on garde la meilleure.
export function composeSelection(budget, occasion, couleur) {
  const rules = OCCASION_RULES[occasion] || OCCASION_RULES.diner
  const lo = budget * 0.9
  const hi = budget * 1.1

  let candidates = WINE_DB.filter(w => {
    if (couleur === 'red' && w.type !== 'red') return false
    if (couleur === 'white' && !['white', 'sparkling', 'sweet'].includes(w.type)) return false
    if (w.prixMoyen > budget * (occasion === 'grande' || occasion === 'cadeau' ? 0.75 : 0.5)) return false
    if (w.prixMoyen < budget * rules.minShare * 0.4) return false
    return true
  })
  if (candidates.length < rules.min) {
    candidates = WINE_DB.filter(w =>
      (couleur === 'mixte' || (couleur === 'red' ? w.type === 'red' : w.type !== 'red')) && w.prixMoyen <= budget
    )
  }

  let best = null
  for (let attempt = 0; attempt < 80; attempt++) {
    const pool = shuffle(candidates)
    const pick = []
    let sum = 0
    for (const w of pool) {
      if (pick.length >= rules.max) break
      if (sum + w.prixMoyen > hi) continue
      if (pick.some(p => p.appellation === w.appellation)) continue
      // Diversité : éviter deux fois la même région sur les gros paniers
      if (rules.diversifyType && pick.filter(p => p.region === w.region).length >= 2) continue
      pick.push(w)
      sum += w.prixMoyen
    }
    if (pick.length < rules.min) continue

    // Score : proximité du budget + biais d'occasion
    let score = -Math.abs(sum - budget) / budget * 100
    const regions = new Set(pick.map(p => p.region)).size
    const types = new Set(pick.map(p => p.type)).size
    if (rules.diversifyType) score += regions * 2 + types * 3
    score += pick.filter(p => p.difficulte === 'facile').length * rules.favorFacile
    if (occasion === 'grande' || occasion === 'cadeau') {
      score += pick.filter(p => p.prixMoyen >= budget * 0.25).length * 2
    }
    if (sum < lo) score -= 15

    if (!best || score > best.score) best = { pick, sum, score }
  }

  if (!best) return null
  return { wines: best.pick, total: best.sum }
}

// Le « pourquoi » en une phrase, selon l'occasion.
function buildWhy(w, occasion) {
  const base = w.enUneMot ? `${w.enUneMot.charAt(0).toLowerCase()}${w.enUneMot.slice(1)}` : w.pourQui
  switch (occasion) {
    case 'diner':  return `Pour la tablée : ${base} — parfait avec ${w.accords[0]?.toLowerCase() || 'le repas'}.`
    case 'cadeau': return `À offrir les yeux fermés : ${base}.`
    case 'depart': return `Une brique de votre culture vin : ${base}, niveau ${DIFFICULTE_CONFIG[w.difficulte].label.toLowerCase()}.`
    case 'grande': return `À la hauteur de l'événement : ${base}.`
    default:       return `${base}.`
  }
}

export default function BudgetCaviste() {
  const [budget, setBudget]     = useState(50)
  const [custom, setCustom]     = useState('')
  const [occasion, setOccasion] = useState('diner')
  const [couleur, setCouleur]   = useState('mixte')
  const [selection, setSelection] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [wineSelected, setWineSelected] = useState(null)

  const effectiveBudget = custom ? Math.max(15, Number(custom) || 0) : budget

  const compose = useCallback(() => {
    setSpinning(true)
    // micro-délai pour laisser respirer l'animation du bouton
    setTimeout(() => {
      setSelection(composeSelection(effectiveBudget, occasion, couleur))
      setSpinning(false)
    }, 250)
  }, [effectiveBudget, occasion, couleur])

  return (
    <div className="animate-fade-in">
      {/* Paramètres */}
      <div className="card p-5 sm:p-6 mb-6">
        <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-3">Votre budget total</div>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {BUDGET_CHIPS.map(b => (
            <button
              key={b}
              onClick={() => { setBudget(b); setCustom('') }}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                !custom && budget === b
                  ? 'bg-wine-800 text-cream border-wine-800 shadow-wine'
                  : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
              }`}
            >
              {b} €
            </button>
          ))}
          <div className="relative">
            <input
              type="number" min="10" max="2000" placeholder="Autre…"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              className={`w-28 pl-3 pr-8 py-2.5 rounded-xl text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-gold-600/40 transition-all ${
                custom ? 'border-wine-700 bg-wine-50 text-wine-800' : 'border-anthracite-200 bg-white text-anthracite-700'
              }`}
              aria-label="Budget libre en euros"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-anthracite-400 pointer-events-none">€</span>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-3">L'occasion</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {OCCASIONS.map(({ id, label, Icon, hint }) => (
            <button
              key={id}
              onClick={() => setOccasion(id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                occasion === id
                  ? 'border-wine-700 bg-wine-50 shadow-sm'
                  : 'border-anthracite-200 bg-white hover:border-wine-300'
              }`}
            >
              <Icon size={15} className={occasion === id ? 'text-wine-700' : 'text-anthracite-400'} />
              <div className="text-xs font-bold text-anthracite-800 mt-1.5">{label}</div>
              <div className="text-[10px] text-anthracite-400 mt-0.5 leading-snug">{hint}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400">Couleurs :</span>
            {COULEURS.map(c => (
              <button
                key={c.id}
                onClick={() => setCouleur(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  couleur === c.id
                    ? 'bg-wine-800 text-cream border-wine-800'
                    : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={compose} className="btn-gold text-sm px-6 py-3" disabled={spinning || effectiveBudget < 15}>
            <Sparkles size={14} className={spinning ? 'animate-spin' : ''} />
            {selection ? 'Recomposer' : 'Composez ma sélection'}
          </button>
        </div>
      </div>

      {/* Résultat */}
      {selection === null && (
        <div className="text-center py-10 text-anthracite-400">
          <Coins size={32} className="mx-auto mb-3 text-anthracite-200" />
          <p className="text-sm">Choisissez un budget, une occasion, et laissez le caviste composer.</p>
        </div>
      )}

      {selection && !selection.wines && (
        <div className="card p-8 text-center">
          <p className="text-sm text-anthracite-500">Budget trop serré pour composer une belle sélection — essayez un peu plus large.</p>
        </div>
      )}

      {selection?.wines && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-anthracite-600">
              <span className="font-serif text-lg font-bold text-anthracite-900">{selection.wines.length} bouteilles</span>
              {' '}pour <span className="font-bold text-wine-800">{selection.total} €</span>
              <span className="text-anthracite-400 text-xs"> (budget : {effectiveBudget} €)</span>
            </p>
            <button
              onClick={compose}
              className="flex items-center gap-1.5 text-xs font-semibold text-wine-700 hover:text-wine-800 cursor-pointer"
            >
              <RefreshCw size={12} className={spinning ? 'animate-spin' : ''} /> Une autre proposition
            </button>
          </div>

          {selection.wines.map((w, i) => {
            const diff = DIFFICULTE_CONFIG[w.difficulte]
            return (
              <div
                key={w.id}
                onClick={() => setWineSelected(w)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setWineSelected(w)}
                className="card p-5 animate-slide-up cursor-pointer hover:border-gold-500/30 hover:-translate-y-0.5 transition-all"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                       style={{ background: `${w.color}18` }}>
                    {w.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-wine-name text-3xl text-anthracite-900 leading-none">{w.appellation}</div>
                        <div className="text-xs text-anthracite-400 mt-1">{w.region} · {w.typeLabel}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        <span className="text-sm font-bold text-anthracite-900">~{w.prixMoyen} €</span>
                        <EnvieButton appellation={w.appellation} size={13} className="!w-7 !h-7" />
                      </div>
                    </div>
                    <p className="text-xs text-anthracite-600 mt-2 leading-relaxed">
                      <span className="font-semibold">Pourquoi lui ? </span>{buildWhy(w, occasion)}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: diff.bg, color: diff.color }}>
                        {diff.emoji} {diff.label}
                      </span>
                    </div>
                    {w.domaines.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-anthracite-100">
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-anthracite-400 mb-1.5">Où le trouver</div>
                        <div className="flex flex-wrap gap-1.5">
                          {w.domaines.slice(0, 3).map(d => (
                            <a
                              key={d.name}
                              href={d.url || `https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${w.appellation} acheter`)}`}
                              target="_blank" rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
                            >
                              <ExternalLink size={9} /> {d.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <p className="text-[11px] text-anthracite-400 text-center italic pt-2">
            <Wine size={11} className="inline mr-1 -mt-0.5" />
            Prix indicatifs du marché — votre caviste ajustera au millésime près.
          </p>
        </div>
      )}

      {wineSelected && (
        <FicheVin wine={wineSelected} onClose={() => setWineSelected(null)} />
      )}
    </div>
  )
}
