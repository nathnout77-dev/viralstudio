import { useState, useMemo } from 'react'
import { X, Scale, Search, Trophy, Plus, BookOpen, RefreshCw, UtensilsCrossed } from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import { bouteilleDepuisVin } from '../lib/ajoutCave'
import { meilleurMillesime } from '../lib/millesimes'
import JaugesGout from './JaugesGout'
import WineVisuel from './WineVisuel'
import { FicheVin } from './BibliothequeView'
import useModalBehavior from '../lib/useModal'

// ═══════════════════════════════════════════════════════════════════════════
// Comparateur de vins — 2 à 3 vins côte à côte, note automatique /20
// transparente (5 critères objectifs + affinité avec votre profil), verdict
// argumenté « pourquoi lui » pour chaque bouteille.
// ═══════════════════════════════════════════════════════════════════════════

const PROFIL_KEY = 'oeno-profil'

function loadProfil() {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(PROFIL_KEY)) } catch { return null }
}

// ── Notation : 5 critères /5, note finale /20 ────────────────────────────────
// Chaque critère est objectif et explicable ; l'affinité dépend du profil.

function notePrix(p) {
  if (p <= 8) return 5
  if (p <= 12) return 4.5
  if (p <= 18) return 4
  if (p <= 25) return 3.5
  if (p <= 40) return 3
  if (p <= 60) return 2.5
  return 2
}

function noteAccessibilite(w, niveau) {
  if (niveau === 'expert' || niveau === 'connaisseur') {
    return { pointu: 4.5, explorer: 4, facile: 3.5 }[w.difficulte] ?? 3.5
  }
  return { facile: 5, explorer: 3.5, pointu: 2.5 }[w.difficulte] ?? 3.5
}

function notePolyvalence(w) {
  const n = (w.accords || []).length
  if (n >= 6) return 5
  if (n === 5) return 4.5
  if (n === 4) return 4
  if (n === 3) return 3.5
  return 3
}

function noteGarde(w) {
  const span = (w.drinkUntil || 0) - (w.drinkFrom || 0)
  if (span >= 12) return 5
  if (span >= 8) return 4.5
  if (span >= 5) return 4
  if (span >= 3) return 3.5
  return 3
}

// Affinité avec le profil (goûts du quiz) : base 3, bonus/malus explicables.
function noteAffinite(w, profil) {
  const gouts = profil?.gouts
  if (!gouts) return { note: 3, raisons: [] }
  let n = 3
  const raisons = []
  const j = w.jauges || {}
  if (gouts.sucre === 'Doux, comme un jus de fruit' && (w.type === 'sweet' || j.douceur >= 3)) { n += 0.75; raisons.push('sa douceur colle à vos goûts') }
  if (gouts.sucre === 'Sec et frais' && j.douceur <= 2) { n += 0.5; raisons.push('sec et frais, comme vous aimez') }
  if (gouts.intensite === 'Léger et facile à boire' && j.puissance <= 2) { n += 0.75; raisons.push('léger, votre style') }
  if (gouts.intensite === 'Costaud, qui a du corps' && j.puissance >= 4) { n += 0.75; raisons.push('du corps, comme vous aimez') }
  if (gouts.bouche === 'Puissant et corsé' && j.puissance >= 4) { n += 0.75; raisons.push('puissant, votre registre') }
  if (gouts.bouche === 'Léger et élégant' && j.puissance <= 2) { n += 0.75; raisons.push('élégant, votre registre') }
  if (gouts.bouche === 'Tannique, avec de la mâche' && j.tanins >= 4) { n += 0.75; raisons.push('la mâche que vous cherchez') }
  if (gouts.bouche === 'Minéral et tendu' && w.type === 'white' && j.tanins <= 1) { n += 0.75; raisons.push('la tension minérale que vous cherchez') }
  const aromes = (w.aromes || '').toLowerCase()
  if (Array.isArray(gouts.fruits)) {
    if (gouts.fruits.some(f => /rouges/.test(f)) && /fraise|cerise|framboise|groseille/.test(aromes)) { n += 0.5; raisons.push('fruits rouges au rendez-vous') }
    if (gouts.fruits.some(f => /jaunes/.test(f)) && /pêche|abricot|coing|mirabelle/.test(aromes)) { n += 0.5; raisons.push('fruits jaunes au rendez-vous') }
    if (gouts.fruits.some(f => /Agrumes/.test(f)) && /citron|agrume|pamplemousse/.test(aromes)) { n += 0.5; raisons.push('les agrumes que vous aimez') }
    if (gouts.fruits.some(f => /noirs/.test(f)) && /mûre|cassis|prune/.test(aromes)) { n += 0.5; raisons.push('fruits noirs au rendez-vous') }
  }
  if (Array.isArray(gouts.regions)) {
    const r = w.region
    const match = (gouts.regions.includes('Bordeaux') && /Bordeaux|Sud-Ouest/.test(r))
      || (gouts.regions.includes('Bourgogne') && /Bourgogne|Beaujolais/.test(r))
      || (gouts.regions.includes('Rhône') && /Rhône|Languedoc|Roussillon|Provence/.test(r))
      || (gouts.regions.includes('Loire') && /Loire/.test(r))
      || (gouts.regions.includes('Grand Est') && /Alsace|Champagne|Jura|Savoie/.test(r))
    if (match) { n += 0.5; raisons.push(`${r}, une de vos régions de prédilection`) }
  }
  return { note: Math.min(5, n), raisons }
}

const CRITERES = [
  { id: 'prix',      label: 'Plaisir / prix' },
  { id: 'acces',     label: 'Accessibilité' },
  { id: 'table',     label: 'Polyvalence à table' },
  { id: 'garde',     label: 'Potentiel de garde' },
  { id: 'affinite',  label: 'Affinité avec vous' },
]

function evaluer(w, profil) {
  const affinite = noteAffinite(w, profil)
  const detail = {
    prix: notePrix(w.prixMoyen),
    acces: noteAccessibilite(w, profil?.niveau),
    table: notePolyvalence(w),
    garde: noteGarde(w),
    affinite: affinite.note,
  }
  const total = Object.values(detail).reduce((s, v) => s + v, 0)
  return { detail, note: Math.round((total / 25) * 20 * 10) / 10, raisonsAffinite: affinite.raisons }
}

// Arguments « pourquoi lui » : forces concrètes du vin face aux autres.
function argumentsPour(w, evalW, autres, profil) {
  const args = []
  const moinsCher = autres.every(a => w.prixMoyen < a.w.prixMoyen)
  const prixEcart = autres.length ? Math.min(...autres.map(a => a.w.prixMoyen)) - w.prixMoyen : 0
  if (moinsCher && prixEcart >= 3) args.push(`Le plus abordable : ~${w.prixMoyen} € contre ${autres.map(a => `${a.w.prixMoyen} €`).join(' et ')}`)
  if (w.difficulte === 'facile' && autres.some(a => a.w.difficulte !== 'facile')) args.push('« Facile à aimer » : aucun risque de déception, même sans habitude')
  if (w.difficulte === 'pointu' && (profil?.niveau === 'expert' || profil?.niveau === 'connaisseur')) args.push('Un vin pointu, à la hauteur de votre niveau')
  if (evalW.detail.table >= 4.5 && autres.every(a => evalW.detail.table > a.e.detail.table)) args.push(`Le plus polyvalent à table (${(w.accords || []).length} accords)`)
  if (evalW.detail.garde === 5 && autres.some(a => a.e.detail.garde < 4.5)) args.push(`Belle garde : jusqu'à ${w.drinkUntil} ans — il peut vous attendre`)
  const jw = w.jauges || {}
  if (jw.puissance >= 4 && autres.every(a => (a.w.jauges?.puissance || 0) < jw.puissance)) args.push('Le plus puissant et structuré des trois' .replace('des trois', autres.length === 1 ? 'des deux' : 'de la sélection'))
  if (jw.puissance <= 2 && autres.every(a => (a.w.jauges?.puissance || 5) > jw.puissance)) args.push('Le plus léger et digeste — idéal apéritif ou table délicate')
  for (const r of evalW.raisonsAffinite.slice(0, 2)) args.push(`Pour vous : ${r}`)
  if (!args.length) args.push(w.pourQui || `« ${w.enUneMot} »`)
  return args.slice(0, 4)
}

// Phrase de verdict comparant le gagnant au reste.
function verdictPhrase(gagnant, classement, profil) {
  const second = classement[1]
  const ecart = gagnant.eval.note - second.eval.note
  if (ecart < 0.1) {
    const jg = gagnant.w.jauges || {}, js = second.w.jauges || {}
    const styleG = jg.puissance >= (js.puissance || 0) ? 'plus de puissance' : 'plus de légèreté'
    const styleS = jg.puissance >= (js.puissance || 0) ? 'plus de finesse' : 'plus de corps'
    return `Égalité parfaite (${gagnant.eval.note}/20 chacun) : sur nos critères, impossible de les départager. Choisissez au style — ${gagnant.w.appellation} pour ${styleG}, ${second.w.appellation} pour ${styleS} — ou à l'accord avec votre plat du soir.`
  }
  if (ecart < 0.8) {
    return `Match serré (${gagnant.eval.note} contre ${second.eval.note}). ${gagnant.w.appellation} l'emporte d'un souffle — mais ${second.w.appellation} reste un excellent choix si ${second.w.difficulte === 'facile' ? 'vous cherchez la sécurité' : 'son style vous parle davantage'}.`
  }
  const forces = []
  const d = gagnant.eval.detail, ds = second.eval.detail
  if (d.prix - ds.prix >= 0.5) forces.push('meilleur rapport plaisir/prix')
  if (d.acces - ds.acces >= 0.5) forces.push(profil?.niveau === 'debutant' ? 'plus facile à aimer' : 'mieux adapté à votre niveau')
  if (d.table - ds.table >= 0.5) forces.push('plus polyvalent à table')
  if (d.garde - ds.garde >= 0.5) forces.push('meilleur potentiel de garde')
  if (d.affinite - ds.affinite >= 0.5) forces.push('plus proche de vos goûts')
  return `${gagnant.w.appellation} l'emporte nettement (${gagnant.eval.note}/20)${forces.length ? ' : ' + forces.join(', ') : ''}.`
}

// ── Barre de critère ─────────────────────────────────────────────────────────
function CritereBar({ label, value, best }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] mb-0.5">
        <span className="text-anthracite-500">{label}</span>
        <span className={`font-bold ${best ? 'text-emerald-700' : 'text-anthracite-700'}`}>{value}/5</span>
      </div>
      <div className="h-1.5 rounded-full bg-anthracite-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(value / 5) * 100}%`, background: best ? '#3f6b4c' : '#8c2f39' }}
        />
      </div>
    </div>
  )
}

// ── Composant principal ──────────────────────────────────────────────────────
export default function Comparateur({ onClose, onAddWine }) {
  useModalBehavior(onClose)
  const [selection, setSelection] = useState([])   // ids WINE_DB (2 à 3)
  const [search, setSearch] = useState('')
  const [compare, setCompare] = useState(false)
  const [fiche, setFiche] = useState(null)
  const profil = useMemo(loadProfil, [])

  const suggestions = useMemo(() => {
    const q = search.toLowerCase().trim()
    return WINE_DB
      .filter(w => !selection.includes(w.id))
      .filter(w => !q
        || w.appellation.toLowerCase().includes(q)
        || w.region.toLowerCase().includes(q)
        || w.cepages.some(c => c.toLowerCase().includes(q)))
      .slice(0, q ? 8 : 6)
  }, [search, selection])

  const vins = selection.map(id => WINE_DB.find(w => w.id === id)).filter(Boolean)

  const classement = useMemo(() => {
    if (!compare) return []
    return vins
      .map(w => ({ w, eval: evaluer(w, profil) }))
      .sort((a, b) => b.eval.note - a.eval.note)
  }, [compare, selection]) // eslint-disable-line react-hooks/exhaustive-deps

  const gagnant = classement[0]
  const bestPar = {}
  if (compare) {
    for (const c of CRITERES) {
      bestPar[c.id] = Math.max(...classement.map(x => x.eval.detail[c.id]))
    }
  }

  const ajouter = (id) => {
    if (selection.length >= 3) return
    setSelection([...selection, id])
    setSearch('')
  }
  const retirer = (id) => setSelection(selection.filter(x => x !== id))

  return (
    <div
      className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Comparateur de vins"
    >
      <div className="modal-panel sm:max-w-3xl max-h-[92vh] shadow-card-hover" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="absolute -top-5 -right-3 opacity-10 select-none pointer-events-none" aria-hidden="true">
            <Scale size={110} strokeWidth={1} />
          </div>
          <div className="relative flex items-start justify-between">
            <div>
              <span className="eyebrow-dark mb-2">Lequel choisir ?</span>
              <h3 className="font-serif text-2xl font-medium">Comparateur de vins</h3>
              <p className="text-cream/70 text-sm mt-1">
                {compare ? 'Verdict — noté sur 20, arguments à l\'appui.' : 'Choisissez 2 ou 3 vins de la bibliothèque.'}
              </p>
            </div>
            <button onClick={onClose}
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all duration-300 cursor-pointer"
                    aria-label="Fermer">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">

          {/* ── Sélection ─────────────────────────────────────────────── */}
          {!compare && (
            <div className="space-y-4 animate-fade-in">
              {/* Vins retenus */}
              {vins.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {vins.map(w => (
                    <span key={w.id} className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-wine-800 text-cream text-xs font-semibold">
                      <WineVisuel type={w.type} size={12} /> {w.appellation}
                      <button onClick={() => retirer(w.id)} aria-label={`Retirer ${w.appellation}`}
                              className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Recherche */}
              {selection.length < 3 && (
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-anthracite-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Chercher une appellation, une région, un cépage…"
                    className="input-field !pl-9"
                    autoFocus
                  />
                </div>
              )}

              {/* Suggestions */}
              {selection.length < 3 && (
                <div className="space-y-1.5">
                  {suggestions.map(w => (
                    <button
                      key={w.id}
                      onClick={() => ajouter(w.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-anthracite-900/[0.07] bg-carte hover:border-gold-500/50 active:scale-[0.99] transition-all cursor-pointer text-left"
                    >
                      <WineVisuel type={w.type} size={16} className="flex-shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="font-wine-name text-xl text-anthracite-900 block leading-tight">{w.appellation}</span>
                        <span className="text-[11px] text-anthracite-500">{w.region} · {w.typeLabel} · ~{w.prixMoyen} €</span>
                      </span>
                      <Plus size={15} className="text-gold-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setCompare(true)}
                disabled={vins.length < 2}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  vins.length >= 2
                    ? 'text-cream cursor-pointer hover:brightness-110 active:scale-[0.98] shadow-wine'
                    : 'bg-anthracite-100 text-anthracite-400 cursor-not-allowed'
                }`}
                style={vins.length >= 2 ? { background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' } : {}}
              >
                <Scale size={15} className={vins.length >= 2 ? 'text-gold-400' : ''} />
                {vins.length < 2 ? `Choisissez encore ${2 - vins.length} vin${2 - vins.length > 1 ? 's' : ''}` : `Comparer ces ${vins.length} vins`}
              </button>
            </div>
          )}

          {/* ── Verdict ───────────────────────────────────────────────── */}
          {compare && gagnant && (
            <div className="space-y-4 animate-slide-up">
              {/* Bandeau verdict */}
              <div className="rounded-2xl p-4 border border-gold-500/30" style={{ background: 'rgba(199,161,90,0.08)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Trophy size={14} className="text-gold-600 flex-shrink-0" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gold-700">Notre verdict</span>
                </div>
                <p className="text-sm text-anthracite-800 leading-relaxed">{verdictPhrase(gagnant, classement, profil)}</p>
                {!profil?.gouts && (
                  <p className="text-[10px] text-anthracite-400 mt-1.5">
                    Astuce : faites le quiz de profil (bouton mode en haut) pour une note « affinité » personnalisée.
                  </p>
                )}
              </div>

              {/* Colonnes de comparaison */}
              <div className={`grid gap-3 ${classement.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {classement.map(({ w, eval: e }, i) => (
                  <div key={w.id}
                       className={`rounded-2xl overflow-hidden border shadow-card ${i === 0 ? 'border-gold-500/60 ring-1 ring-gold-500/30' : 'border-anthracite-900/[0.07]'}`}>
                    <div className="p-4 relative text-cream"
                         style={{ background: `linear-gradient(150deg, ${w.color} 0%, ${w.color}cc 70%, #1e2426 160%)` }}>
                      {i === 0 && (
                        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gold-500 text-anthracite-950">
                          <Trophy size={8} /> Notre choix
                        </span>
                      )}
                      <WineVisuel type={w.type} size={16} className="mb-1" />
                      <div className="font-wine-name text-2xl leading-tight">{w.appellation}</div>
                      <div className="text-cream/70 text-[11px] mt-0.5">
                        {w.region} · {w.typeLabel} · ~{w.prixMoyen} €
                        {meilleurMillesime(w) ? <> · mill. conseillé {meilleurMillesime(w)}</> : null}
                      </div>
                      <div className="mt-2.5 flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-bold">{e.note}</span>
                        <span className="text-cream/60 text-xs">/20</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-carte">
                      {/* Critères */}
                      <div className="space-y-2">
                        {CRITERES.map(c => (
                          <CritereBar key={c.id} label={c.label} value={e.detail[c.id]}
                                      best={e.detail[c.id] === bestPar[c.id]} />
                        ))}
                      </div>

                      {/* Profil de goût */}
                      <div className="pt-1">
                        <JaugesGout jauges={w.jauges} compact />
                      </div>

                      {/* Pourquoi lui */}
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Pourquoi lui ?</div>
                        <ul className="space-y-1">
                          {argumentsPour(w, e, classement.filter(x => x.w.id !== w.id).map(x => ({ w: x.w, e: x.eval })), profil).map((a, k) => (
                            <li key={k} className="text-[11px] text-anthracite-700 leading-snug flex gap-1.5">
                              <span className="text-gold-600 flex-shrink-0">•</span> {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Accords */}
                      {w.accords?.length > 0 && (
                        <div className="flex items-start gap-1.5 text-[10px] text-anthracite-500">
                          <UtensilsCrossed size={10} className="text-gold-600 flex-shrink-0 mt-0.5" />
                          <span>{w.accords.slice(0, 3).join(' · ')}</span>
                        </div>
                      )}

                      <button
                        onClick={() => setFiche(w)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-[11px] font-semibold text-wine-texte bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
                      >
                        <BookOpen size={11} /> Fiche complète
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCompare(false)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                <RefreshCw size={12} /> Modifier la sélection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fiche complète par-dessus (z-70) */}
      {fiche && (
        <FicheVin
          wine={fiche}
          onClose={() => setFiche(null)}
          onAddToCave={onAddWine ? (w, m, prix) => {
            onAddWine(bouteilleDepuisVin(w, m, { prix, provenance: 'choisi via le comparateur' }))
          } : undefined}
        />
      )}
    </div>
  )
}
