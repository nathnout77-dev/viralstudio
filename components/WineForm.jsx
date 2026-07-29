import { useState, useMemo } from 'react'
import { X, Wine, ChevronDown, Sparkles, Search, Globe, Loader2, ArrowLeft, PenLine, Camera } from 'lucide-react'
import { WINE_DB, WINE_DB_APPELLATIONS } from '../data/wineDatabase'
import { normaliser } from '../data/aromes'
import { getDecouvertesAsWines } from '../lib/decouvertes'
import useModalBehavior from '../lib/useModal'
import WineVisuel from './WineVisuel'

const TYPES = [
  { value: 'red',       label: 'Rouge' },
  { value: 'white',     label: 'Blanc' },
  { value: 'rosé',      label: 'Rosé' },
  { value: 'sparkling', label: 'Effervescent' },
  { value: 'sweet',     label: 'Liquoreux' },
]
const REGIONS = ['Bordeaux','Bourgogne','Champagne','Rhône Nord','Rhône Sud','Loire','Alsace','Provence','Languedoc','Beaujolais','Jura','Sud-Ouest','Corse','Italie','Espagne','Autre']
const FOOD_OPTIONS = ['Viande rouge','Viande blanche','Gibier','Poisson','Fruits de mer','Fromage','Dessert','Charcuterie','Légumes','Champignons','Foie gras']
const CURRENT_YEAR = new Date().getFullYear()

// Recherche dans la bibliothèque : appellation > domaine > cépage > région.
// `extra` = découvertes personnelles (vins scannés) cherchables comme le reste.
function chercherDB(query, extra = []) {
  const q = normaliser(query.trim())
  if (q.length < 2) return []
  const res = []
  for (const w of [...WINE_DB, ...extra]) {
    const app = normaliser(w.appellation)
    let score = 0
    if (app.startsWith(q)) score = 100
    else if (app.includes(q)) score = 80
    else if ((w.domaines || []).some(d => normaliser(d.name).includes(q))) score = 55
    else if ((w.cepages || []).some(c => normaliser(c).includes(q))) score = 45
    else if (normaliser(w.region).includes(q)) score = 25
    if (!score) continue
    if (w.grandPublic) score -= 5
    res.push({ w, score })
  }
  return res.sort((a, b) => b.score - a.score).slice(0, 8).map(r => r.w)
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
    </div>
  )
}

const blankForm = () => ({
  id:             `w${Date.now()}`,
  name:           '',
  domain:         '',
  appellation:    '',
  region:         '',
  type:           'red',
  cepages:        '',
  vintage:        CURRENT_YEAR - 3,
  quantity:       1,
  drinkFrom:      3,
  drinkUntil:     10,
  serviceTemp:    '',
  carafage:       '',
  estimatedValue: '',
  rating:         '',
  foodPairings:   [],
  notes:          '',
})

export default function WineForm({ initial, onSave, onClose }) {
  useModalBehavior(onClose)

  // En édition (initial fourni) on va droit au formulaire ; à l'ajout, on
  // commence par une recherche pour préremplir sans tout ressaisir.
  const [phase, setPhase] = useState(initial ? 'form' : 'recherche')
  const [form, setForm] = useState(() => (initial ? {
    ...blankForm(),
    ...initial,
    id:       initial.id || `w${Date.now()}`,
    cepages:  Array.isArray(initial.cepages) ? initial.cepages.join(', ') : (initial.cepages || ''),
    foodPairings: initial.foodPairings || [],
  } : blankForm()))
  const [errors, setErrors] = useState({})
  const [useFreeText, setUseFreeText] = useState(
    !!initial?.appellation && !WINE_DB_APPELLATIONS.some(a => a.appellation === initial.appellation)
  )

  // État de l'étape recherche
  const [query, setQuery] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupError, setLookupError] = useState(null)
  const [decouvertes] = useState(() => (initial ? [] : getDecouvertesAsWines()))
  const resultats = useMemo(() => chercherDB(query, decouvertes), [query, decouvertes])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const appellationsByRegion = useMemo(() => {
    const sorted = [...WINE_DB_APPELLATIONS].sort((a, b) => a.appellation.localeCompare(b.appellation, 'fr'))
    const groups = {}
    sorted.forEach(a => {
      if (!groups[a.region]) groups[a.region] = []
      groups[a.region].push(a)
    })
    return Object.entries(groups).sort(([r1], [r2]) => r1.localeCompare(r2, 'fr'))
  }, [])

  const handleAppellationSelect = (val) => {
    if (val === '__autre__') {
      setUseFreeText(true)
      set('appellation', '')
      return
    }
    setUseFreeText(false)
    const a = WINE_DB_APPELLATIONS.find(x => x.appellation === val)
    if (a) applyAppellation(a)
    else set('appellation', val)
  }

  const applyAppellation = (a) => {
    setForm(f => ({
      ...f,
      appellation: a.appellation,
      region:      a.region,
      type:        a.type,
      cepages:     a.cepages.join(', '),
      serviceTemp: a.serviceTemp || f.serviceTemp,
      carafage:    a.carafage || f.carafage,
      drinkFrom:   a.drinkFrom || f.drinkFrom,
      drinkUntil:  a.drinkUntil || f.drinkUntil,
      foodPairings: a.accords || f.foodPairings,
    }))
  }

  // ── Préremplissage depuis un vin de la bibliothèque ────────────────────────
  const prefillFromDB = (w) => {
    setForm(f => ({
      ...blankForm(),
      id:           f.id,
      quantity:     f.quantity,
      name:         w.appellation,
      appellation:  w.appellation,
      region:       w.region,
      type:         w.type,
      cepages:      (w.cepages || []).join(', '),
      serviceTemp:  w.serviceTemp || '',
      carafage:     w.carafage || '',
      drinkFrom:    w.drinkFrom ?? 3,
      drinkUntil:   w.drinkUntil ?? 10,
      estimatedValue: w.prixMoyen || '',
      foodPairings: w.accords || [],
    }))
    setUseFreeText(!WINE_DB_APPELLATIONS.some(a => a.appellation === w.appellation))
    setPhase('form')
  }

  // ── Préremplissage depuis la recherche internet (/api/wine-lookup) ─────────
  const prefillFromLookup = (j, saisie) => {
    setForm(f => ({
      ...blankForm(),
      id:           f.id,
      quantity:     f.quantity,
      name:         j.appellation || j.domaine || saisie,
      domain:       j.domaine || '',
      appellation:  j.appellation || '',
      region:       j.region || '',
      type:         j.type || 'red',
      cepages:      Array.isArray(j.cepages) ? j.cepages.join(', ') : '',
      vintage:      j.millesime || (CURRENT_YEAR - 3),
      serviceTemp:  j.serviceTemp || '',
      carafage:     j.carafage || '',
      drinkFrom:    j.drinkFrom ?? 3,
      drinkUntil:   j.drinkUntil ?? 10,
      estimatedValue: j.prixMoyen || '',
      foodPairings: Array.isArray(j.accords) ? j.accords.slice(0, 6) : [],
      notes:        j.description || '',
    }))
    setUseFreeText(!j.appellation || !WINE_DB_APPELLATIONS.some(a => a.appellation === j.appellation))
    setPhase('form')
  }

  const rechercheInternet = async () => {
    const saisie = query.trim()
    if (saisie.length < 2) return
    setLookupError(null)
    setLookupLoading(true)
    try {
      const res = await fetch('/api/wine-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: saisie }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.json && data.json.trouve) {
        prefillFromLookup(data.json, saisie)
      } else if (res.ok && data?.json && !data.json.trouve) {
        setLookupError('introuvable')
      } else {
        setLookupError(data?.error === 'quota' ? 'quota' : 'api')
      }
    } catch {
      setLookupError('reseau')
    } finally {
      setLookupLoading(false)
    }
  }

  const saisieManuelle = () => {
    const saisie = query.trim()
    if (saisie) set('name', saisie)
    setPhase('form')
  }

  const toggleFood = (f) => set('foodPairings', form.foodPairings.includes(f)
    ? form.foodPairings.filter(x => x !== f)
    : [...form.foodPairings, f]
  )

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name    = 'Nom requis'
    if (!form.vintage || form.vintage < 1900 || form.vintage > CURRENT_YEAR + 2) e.vintage = 'Millésime invalide'
    if (form.quantity < 0)   e.quantity = 'Quantité invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      ...form,
      cepages:        form.cepages.split(',').map(s => s.trim()).filter(Boolean),
      vintage:        Number(form.vintage),
      quantity:       Number(form.quantity),
      drinkFrom:      Number(form.drinkFrom),
      drinkUntil:     Number(form.drinkUntil),
      serviceTemp:    form.serviceTemp ? Number(form.serviceTemp) : undefined,
      estimatedValue: form.estimatedValue ? Number(form.estimatedValue) : undefined,
      rating:         form.rating ? Number(form.rating) : undefined,
    })
  }

  const errMsg = {
    introuvable: "Vin introuvable. Vérifiez l'orthographe ou saisissez-le à la main.",
    quota:       'Recherche momentanément indisponible (quota). Saisie manuelle possible ci-dessous.',
    api:         "La recherche n'a rien renvoyé. Réessayez ou saisissez à la main.",
    reseau:      'Pas de connexion. Saisie manuelle possible ci-dessous.',
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={initial ? 'Modifier un vin' : 'Ajouter un vin'}
    >
      <div
        className="modal-panel sm:max-w-lg max-h-[94vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-anthracite-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {phase === 'form' && !initial && (
              <button
                type="button"
                onClick={() => setPhase('recherche')}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-anthracite-100 text-anthracite-500 transition-all cursor-pointer"
                aria-label="Retour à la recherche"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-wine-100 flex items-center justify-center">
              <Wine size={14} className="text-wine-800" />
            </div>
            <h2 className="font-serif text-base font-semibold text-anthracite-900">
              {initial ? 'Modifier le vin' : 'Ajouter un vin'}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-anthracite-100 text-anthracite-500 transition-all cursor-pointer" aria-label="Fermer">
            <X size={15} />
          </button>
        </div>

        {/* ══ Étape recherche ══════════════════════════════════════════════ */}
        {phase === 'recherche' && (
          <div className="overflow-y-auto flex-1 p-5">
            <p className="text-[13px] text-anthracite-500 mb-3 leading-relaxed">
              Tapez le nom du vin : on le retrouve dans la bibliothèque et on préremplit la fiche.
              Absent&nbsp;? On le cherche sur internet.
            </p>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-carte border border-anthracite-200 focus-within:border-gold-500/60 transition-colors">
              <Search size={16} className="text-gold-600 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setLookupError(null) }}
                onKeyDown={e => { if (e.key === 'Enter' && resultats.length === 0) rechercheInternet() }}
                placeholder="Château Margaux, Mouton Cadet 2020, Chablis…"
                className="flex-1 bg-transparent text-[15px] text-anthracite-900 placeholder-anthracite-400 outline-none min-w-0"
                aria-label="Rechercher un vin à ajouter"
              />
              {query && (
                <button onClick={() => { setQuery(''); setLookupError(null) }} className="text-anthracite-400 hover:text-anthracite-700 cursor-pointer" aria-label="Effacer">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Résultats bibliothèque */}
            {resultats.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-anthracite-400">Dans la bibliothèque</div>
                {resultats.map(w => (
                  <button
                    key={w.id}
                    onClick={() => prefillFromDB(w)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-carte border border-anthracite-200 hover:border-gold-500/60 active:scale-[0.99] transition-all cursor-pointer text-left"
                  >
                    <WineVisuel type={w.type} size={24} className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-anthracite-900 truncate">{w.appellation}</span>
                        {w.decouverte && <Camera size={11} className="text-gold-600 flex-shrink-0" />}
                      </div>
                      <div className="text-[11px] text-anthracite-400 truncate">{w.region} · {w.typeLabel}{w.prixMoyen ? ` · ~${w.prixMoyen} €` : ''}</div>
                    </div>
                    <Sparkles size={13} className="text-gold-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Aucun résultat en bibliothèque → recherche internet */}
            {query.trim().length >= 2 && resultats.length === 0 && (
              <div className="mt-4">
                {lookupError && (
                  <p className="text-[12px] text-wine-700 bg-wine-50 border border-wine-100 rounded-xl px-3 py-2 mb-3">
                    {errMsg[lookupError]}
                  </p>
                )}
                <button
                  onClick={rechercheInternet}
                  disabled={lookupLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-wine-800 text-cream font-semibold text-sm hover:bg-wine-900 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  {lookupLoading
                    ? <><Loader2 size={16} className="animate-spin" /> Recherche sur internet…</>
                    : <><Globe size={16} /> Rechercher « {query.trim()} » sur internet</>}
                </button>
                <p className="text-[11px] text-anthracite-400 mt-2 text-center">Pour les vins hors bibliothèque (crus rares, cuvées de rayon…).</p>
              </div>
            )}

            {/* Suggestion vide */}
            {query.trim().length < 2 && (
              <p className="mt-6 text-[12px] text-anthracite-400 leading-relaxed text-center">
                Commencez à taper le nom de votre bouteille.
              </p>
            )}
          </div>
        )}

        {/* ══ Étape formulaire ═════════════════════════════════════════════ */}
        {phase === 'form' && (
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Type selector */}
          <div>
            <label className="label">Type de vin</label>
            <div className="flex gap-2 flex-wrap">
              {TYPES.map(t => (
                <button
                  type="button" key={t.value}
                  onClick={() => set('type', t.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    form.type === t.value
                      ? 'bg-wine-800 text-cream border-wine-800 shadow-sm'
                      : 'bg-carte text-anthracite-600 border-anthracite-200 hover:border-wine-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nom du vin *" error={errors.name}>
              <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="ex: Gevrey-Chambertin 1er Cru" />
            </Field>
            <Field label="Domaine / Château">
              <input className="input-field" value={form.domain} onChange={e => set('domain', e.target.value)} placeholder="ex: Domaine Rossignol" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Région">
              <SelectWrapper>
                <select className="select-field" value={form.region} onChange={e => set('region', e.target.value)}>
                  <option value="">Sélectionner…</option>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </SelectWrapper>
            </Field>
            <Field label="Appellation">
              {useFreeText ? (
                <div className="space-y-1.5">
                  <input
                    className="input-field"
                    value={form.appellation}
                    onChange={e => set('appellation', e.target.value)}
                    placeholder="ex: Gevrey-Chambertin"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setUseFreeText(false)}
                    className="text-[11px] text-wine-700 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles size={10} className="text-gold-500" /> Choisir dans la liste
                  </button>
                </div>
              ) : (
                <SelectWrapper>
                  <select
                    className="select-field"
                    value={form.appellation}
                    onChange={e => handleAppellationSelect(e.target.value)}
                  >
                    <option value="">Sélectionner…</option>
                    {appellationsByRegion.map(([region, list]) => (
                      <optgroup key={region} label={region}>
                        {list.map(a => (
                          <option key={a.appellation} value={a.appellation}>{a.appellation}</option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="__autre__">Autre (saisie libre)</option>
                  </select>
                </SelectWrapper>
              )}
            </Field>
          </div>

          <Field label="Cépages (séparés par virgule)">
            <input className="input-field" value={form.cepages} onChange={e => set('cepages', e.target.value)} placeholder="ex: Pinot Noir, Chardonnay" />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Millésime *" error={errors.vintage}>
              <input type="number" className="input-field" value={form.vintage}
                     onChange={e => set('vintage', e.target.value)} min={1900} max={CURRENT_YEAR + 2} />
            </Field>
            <Field label="Quantité" error={errors.quantity}>
              <input type="number" className="input-field" value={form.quantity}
                     onChange={e => set('quantity', e.target.value)} min={0} max={9999} />
            </Field>
            <Field label="Note /20">
              <input type="number" className="input-field" value={form.rating}
                     onChange={e => set('rating', e.target.value)} min={0} max={20} step={0.5} placeholder="—" />
            </Field>
          </div>

          {/* Apogée */}
          <div className="card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-anthracite-500 mb-3">Apogée (années après millésime)</div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Boire à partir de">
                <input type="number" className="input-field" value={form.drinkFrom} onChange={e => set('drinkFrom', e.target.value)} min={0} max={50} />
              </Field>
              <Field label="Boire avant">
                <input type="number" className="input-field" value={form.drinkUntil} onChange={e => set('drinkUntil', e.target.value)} min={0} max={100} />
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Temp. service (°C)">
              <input type="number" className="input-field" value={form.serviceTemp}
                     onChange={e => set('serviceTemp', e.target.value)} placeholder="16" min={0} max={25} />
            </Field>
            <Field label="Carafage">
              <input className="input-field" value={form.carafage} onChange={e => set('carafage', e.target.value)} placeholder="1h" />
            </Field>
            <Field label="Valeur (€/btle)">
              <input type="number" className="input-field" value={form.estimatedValue}
                     onChange={e => set('estimatedValue', e.target.value)} placeholder="0" min={0} />
            </Field>
          </div>

          {/* Accords mets-vins */}
          <div>
            <label className="label">Accords mets-vins</label>
            <div className="flex flex-wrap gap-2">
              {FOOD_OPTIONS.map(f => (
                <button
                  type="button" key={f}
                  onClick={() => toggleFood(f)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                    form.foodPairings.includes(f)
                      ? 'bg-gold-500/20 border-gold-500/50 text-gold-700 font-medium'
                      : 'bg-carte border-anthracite-200 text-anthracite-500 hover:border-anthracite-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <Field label="Notes de dégustation">
            <textarea
              className="input-field resize-none"
              rows={3}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Arômes, structure, impression générale…"
            />
          </Field>
        </form>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-anthracite-100 flex-shrink-0 bg-fond">
          {phase === 'recherche' ? (
            <>
              <button type="button" onClick={saisieManuelle} className="btn-ghost inline-flex items-center gap-1.5">
                <PenLine size={13} /> Saisir à la main
              </button>
              <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
            </>
          ) : (
            <>
              <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
              <button onClick={handleSubmit} className="btn-gold">
                {initial ? 'Enregistrer' : 'Ajouter à la cave'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
