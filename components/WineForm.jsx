import { useState } from 'react'
import { X, Wine, ChevronDown } from 'lucide-react'

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

export default function WineForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    id:             initial?.id || `w${Date.now()}`,
    name:           initial?.name || '',
    domain:         initial?.domain || '',
    appellation:    initial?.appellation || '',
    region:         initial?.region || '',
    type:           initial?.type || 'red',
    cepages:        Array.isArray(initial?.cepages) ? initial.cepages.join(', ') : (initial?.cepages || ''),
    vintage:        initial?.vintage || CURRENT_YEAR - 3,
    quantity:       initial?.quantity || 1,
    drinkFrom:      initial?.drinkFrom || 3,
    drinkUntil:     initial?.drinkUntil || 10,
    serviceTemp:    initial?.serviceTemp || '',
    carafage:       initial?.carafage || '',
    estimatedValue: initial?.estimatedValue || '',
    rating:         initial?.rating || '',
    foodPairings:   initial?.foodPairings || [],
    notes:          initial?.notes || '',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(17,21,22,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={initial ? 'Modifier un vin' : 'Ajouter un vin'}
    >
      <div
        className="bg-cream w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[94vh] flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-anthracite-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-wine-100 flex items-center justify-center">
              <Wine size={14} className="text-wine-800" />
            </div>
            <h2 className="font-serif text-base font-semibold text-anthracite-900">
              {initial ? 'Modifier le vin' : 'Ajouter un vin'}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-anthracite-100 text-anthracite-500 transition-all cursor-pointer" aria-label="Fermer">
            <X size={15} />
          </button>
        </div>

        {/* Form */}
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
                      : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
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
              <input className="input-field" value={form.appellation} onChange={e => set('appellation', e.target.value)} placeholder="ex: Gevrey-Chambertin" />
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
                      : 'bg-white border-anthracite-200 text-anthracite-500 hover:border-anthracite-300'
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-anthracite-100 flex-shrink-0 bg-cream">
          <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
          <button onClick={handleSubmit} className="btn-gold">
            {initial ? 'Enregistrer' : 'Ajouter à la cave'}
          </button>
        </div>
      </div>
    </div>
  )
}
