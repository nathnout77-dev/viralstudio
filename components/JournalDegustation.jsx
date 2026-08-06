import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  NotebookPen, Grape, X, Plus, Search, Trash2, Pencil, ArrowLeft,
  Calendar, Users, Feather, ChevronDown, BookHeart, Share2, Sparkles,
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Génération d'image canvas : chargée seulement quand on partage
const ShareDegustation = dynamic(() => import('./ShareDegustation'), { ssr: false })
import { WINE_DB } from '../data/wineDatabase'
import { AROME_FAMILLES } from '../data/aromes'
import useModalBehavior from '../lib/useModal'
import { toast } from './Toast'

const STORAGE_KEY = 'oeno-journal'
const CAVE_KEY = 'oenotheque-v2'

const ROBE_CHIPS = ['Rubis', 'Grenat', 'Pourpre', 'Or pâle', 'Paille', 'Doré', 'Rosé pâle', 'Saumon', 'Ambré']
const NEZ_CHIPS = AROME_FAMILLES.map(f => f.label)

const CURRENT_YEAR = new Date().getFullYear()
const todayISO = () => new Date().toISOString().slice(0, 10)

function loadJournal() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadCaveWines() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CAVE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

// ── Grappe de notation, discrète, en or ──────────────────────────────────────
function NoteGrappe({ value = 0, onChange, size = 16, readOnly = false }) {
  return (
    <div className="flex items-center gap-1" role={readOnly ? undefined : 'radiogroup'} aria-label="Note globale">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          aria-label={`${n} sur 5`}
          aria-pressed={value >= n}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-200 ${readOnly ? '' : 'active:scale-95'}`}
        >
          <Grape
            size={size}
            strokeWidth={1.5}
            fill={value >= n ? '#c9a84c' : 'none'}
            className={value >= n ? 'text-gold-500' : 'text-anthracite-300'}
          />
        </button>
      ))}
    </div>
  )
}

// ── Sélecteur de vin : cave / bibliothèque / saisie libre ────────────────────
function WinePicker({ query, onQueryChange, onPick, caveWines }) {
  const [open, setOpen] = useState(false)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    const fromCave = caveWines
      .filter(w => w.name?.toLowerCase().includes(q) || w.domain?.toLowerCase().includes(q))
      .slice(0, 4)
      .map(w => ({ source: 'cave', name: w.name, domain: w.domain, vintage: w.vintage, type: w.type }))
    const fromDb = WINE_DB
      .filter(w => w.appellation.toLowerCase().includes(q))
      .slice(0, 4)
      .flatMap(w => (w.domaines.length ? w.domaines.slice(0, 1) : [{ name: '' }]).map(d => ({
        source: 'bibliotheque', name: w.appellation, domain: d.name || '', type: w.type,
      })))
    return [...fromCave, ...fromDb].slice(0, 6)
  }, [query, caveWines])

  return (
    <div className="relative">
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
        <input
          className="input-field pl-9"
          placeholder="Nom du vin (ex. Gevrey-Chambertin)"
          value={query}
          onChange={e => { onQueryChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1.5 w-full bg-carte border border-anthracite-900/10 rounded-xl shadow-card-hover overflow-hidden animate-fade-in">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => onPick(s)}
              className="w-full text-left px-4 py-2.5 hover:bg-fond transition-colors cursor-pointer flex items-center justify-between gap-2"
            >
              <span className="min-w-0">
                <span className="font-wine-name text-lg text-anthracite-900 truncate block leading-tight">{s.name}</span>
                {s.domain && <span className="text-[11px] text-anthracite-400">{s.domain}</span>}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gold-600 flex-shrink-0">
                {s.source === 'cave' ? 'Ma cave' : 'Bibliothèque'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chips de suggestion rapide ────────────────────────────────────────────────
function ChipRow({ chips, onPick }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {chips.map(c => (
        <button
          key={c}
          type="button"
          onClick={() => onPick(c)}
          className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-anthracite-900/10 text-anthracite-600 bg-carte hover:border-gold-500/60 hover:text-anthracite-900 transition-all cursor-pointer"
        >
          {c}
        </button>
      ))}
    </div>
  )
}

// ── Formulaire de nouvelle note ───────────────────────────────────────────────
function JournalForm({ initial, caveWines, onSave, onClose }) {
  useModalBehavior(onClose)
  const [form, setForm] = useState({
    id: initial?.id || `j${Date.now()}`,
    name: initial?.name || '',
    domain: initial?.domain || '',
    vintage: initial?.vintage || '',
    tastedAt: initial?.tastedAt || todayISO(),
    context: initial?.context || '',
    robe: initial?.robe || '',
    nez: initial?.nez || '',
    bouche: initial?.bouche || '',
    unMot: initial?.unMot || '',
    note: initial?.note || 0,
    ressenti: initial?.ressenti || '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const appendWord = (k, word) => setForm(f => ({ ...f, [k]: f[k] ? `${f[k]}, ${word}` : word }))

  const handlePick = s => setForm(f => ({ ...f, name: s.name, domain: s.domain || f.domain }))

  const submit = e => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave({
      ...form,
      vintage: form.vintage ? Number(form.vintage) : null,
      timestamp: initial?.timestamp || Date.now(),
      updatedAt: Date.now(),
    })
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Noter une dégustation"
    >
      <form
        onSubmit={submit}
        className="modal-panel sm:max-w-xl max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 pb-4 flex-shrink-0 flex items-center justify-between border-b border-anthracite-900/[0.06]">
          <div>
            <span className="eyebrow mb-1">{initial ? 'Modifier la note' : 'Nouvelle note'}</span>
            <h3 className="text-2xl font-bold text-anthracite-900" style={{ fontFamily: 'Fraunces, serif' }}>
              {initial ? 'Affiner ce souvenir' : 'Racontez cette dégustation'}
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer"
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-600 transition-all cursor-pointer">
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="label">Le vin</label>
            <WinePicker query={form.name} onQueryChange={v => set('name', v)} onPick={handlePick} caveWines={caveWines} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Domaine</label>
              <input className="input-field" placeholder="Domaine Roulot…" value={form.domain} onChange={e => set('domain', e.target.value)} />
            </div>
            <div>
              <label className="label">Millésime</label>
              <input
                type="number" className="input-field" placeholder={String(CURRENT_YEAR)}
                value={form.vintage} onChange={e => set('vintage', e.target.value)}
                min="1950" max={CURRENT_YEAR}
              />
            </div>
          </div>

          <div>
            <label className="label"><Calendar size={11} className="inline mr-1 -mt-0.5" />Date de dégustation</label>
            <input type="date" className="input-field" value={form.tastedAt} max={todayISO()} onChange={e => set('tastedAt', e.target.value)} />
          </div>

          <div>
            <label className="label"><Users size={11} className="inline mr-1 -mt-0.5" />Avec qui ? À quelle occasion ?</label>
            <input className="input-field" placeholder="Un dimanche soir, entre amis…" value={form.context} onChange={e => set('context', e.target.value)} />
          </div>

          <div className="divider-gold" />

          <div>
            <label className="label">Robe</label>
            <input className="input-field" placeholder="Rubis profond, reflets grenat…" value={form.robe} onChange={e => set('robe', e.target.value)} />
            <ChipRow chips={ROBE_CHIPS} onPick={c => appendWord('robe', c)} />
          </div>

          <div>
            <label className="label">Nez</label>
            <input className="input-field" placeholder="Cerise noire, sous-bois, une pointe d'épices…" value={form.nez} onChange={e => set('nez', e.target.value)} />
            <ChipRow chips={NEZ_CHIPS} onPick={c => appendWord('nez', c)} />
          </div>

          <div>
            <label className="label">Bouche</label>
            <textarea
              className="input-field resize-none" rows={2}
              placeholder="Rond, épicé, une pointe de fruits noirs…"
              value={form.bouche} onChange={e => set('bouche', e.target.value)}
            />
          </div>

          <div>
            <label className="label">En un mot…</label>
            <input className="input-field" placeholder="Envoûtant" value={form.unMot} onChange={e => set('unMot', e.target.value)} />
          </div>

          <div className="divider-gold" />

          <div>
            <label className="label">Note globale</label>
            <NoteGrappe value={form.note} onChange={v => set('note', v)} size={22} />
          </div>

          <div>
            <label className="label"><Feather size={11} className="inline mr-1 -mt-0.5" />Votre ressenti</label>
            <textarea
              className="input-field resize-none" rows={4}
              placeholder="Racontez ce moment…"
              value={form.ressenti} onChange={e => set('ressenti', e.target.value)}
            />
          </div>
        </div>

        <div className="p-5 border-t border-anthracite-100 bg-fond flex-shrink-0 flex items-center gap-3">
          <button type="button" onClick={onClose} className="btn-ghost text-xs px-5 py-2.5 flex-1 justify-center">Annuler</button>
          <button type="submit" className="btn-gold text-xs px-5 py-2.5 flex-1 justify-center" disabled={!form.name.trim()}>
            {initial ? 'Enregistrer' : 'Consigner ce souvenir'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Page de carnet : vue détail d'une entrée ─────────────────────────────────
function CarnetPage({ entry, onClose, onEdit, onDelete }) {
  useModalBehavior(onClose)
  const [showShare, setShowShare] = useState(false)
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Détail de la dégustation"
    >
      <div
        className="modal-panel sm:max-w-2xl max-h-[92vh] shadow-card-hover"
        style={{
          background: 'rgb(var(--carte))',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(28,25,23,0.035) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-7 sm:p-10 flex-1 overflow-y-auto">
          <div className="flex items-start justify-between gap-3 mb-6">
            <button onClick={onClose} className="flex items-center gap-1.5 text-xs text-anthracite-500 hover:text-anthracite-900 transition-colors cursor-pointer">
              <ArrowLeft size={13} /> Retour au journal
            </button>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setShowShare(true)} aria-label="Partager cette dégustation" title="Partager cette dégustation"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-carte border border-anthracite-900/10 hover:border-gold-500/60 text-anthracite-600 transition-all cursor-pointer">
                <Share2 size={13} />
              </button>
              <button onClick={() => onEdit(entry)} aria-label="Modifier"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-carte border border-anthracite-900/10 hover:border-gold-500/60 text-anthracite-600 transition-all cursor-pointer">
                <Pencil size={13} />
              </button>
              <button onClick={() => onDelete(entry.id)} aria-label="Supprimer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-carte border border-anthracite-900/10 hover:border-red-400 hover:text-red-600 text-anthracite-600 transition-all cursor-pointer">
                <Trash2 size={13} />
              </button>
              <button onClick={onClose} aria-label="Fermer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-600 transition-all cursor-pointer">
                <X size={14} />
              </button>
            </div>
          </div>

          <p className="eyebrow mb-2">{formatDate(entry.tastedAt)}</p>
          <h2 className="font-wine-name text-6xl text-wine-texte leading-none">{entry.name}</h2>
          {(entry.domain || entry.vintage) && (
            <p className="font-wine-name text-3xl text-anthracite-500 mt-1">
              {entry.domain}{entry.domain && entry.vintage ? ' · ' : ''}{entry.vintage}
            </p>
          )}

          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <NoteGrappe value={entry.note} readOnly size={17} />
            {entry.context && (
              <span className="text-xs text-anthracite-500 italic">« {entry.context} »</span>
            )}
          </div>

          <div className="divider-gold" />

          <div className="grid sm:grid-cols-3 gap-5">
            {entry.robe && (
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-1.5">Robe</div>
                <p className="text-sm text-anthracite-700 leading-relaxed">{entry.robe}</p>
              </div>
            )}
            {entry.nez && (
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-1.5">Nez</div>
                <p className="text-sm text-anthracite-700 leading-relaxed">{entry.nez}</p>
              </div>
            )}
            {entry.bouche && (
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-1.5">Bouche</div>
                <p className="text-sm text-anthracite-700 leading-relaxed">{entry.bouche}</p>
              </div>
            )}
          </div>

          {entry.unMot && (
            <p className="font-wine-name text-4xl text-wine-texte text-center my-7">« {entry.unMot} »</p>
          )}

          {/* Dégustation guidée : le bilan Vous vs Œno */}
          {entry.simulation && (
            <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-5">
              <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-3">
                Dégustation guidée avec Œno
              </div>
              {entry.simulation.badge && (
                <p className="font-serif text-lg font-bold text-anthracite-900 mb-1">{entry.simulation.badge}</p>
              )}
              {entry.simulation.aromesPredits?.length > 0 && (
                <p className="text-sm text-anthracite-700 leading-relaxed">
                  <span className="font-semibold">{entry.simulation.aromesTrouves?.length || 0} / {entry.simulation.aromesPredits.length}</span> arômes
                  annoncés retrouvés
                  {entry.simulation.aromesTrouves?.length > 0 && (
                    <span className="text-anthracite-500"> ({entry.simulation.aromesTrouves.join(', ')})</span>
                  )}.
                </p>
              )}
              {entry.simulation.objectif && (
                <p className="text-xs text-anthracite-500 italic mt-2 leading-relaxed">
                  L'objectif du vin : {entry.simulation.objectif}
                </p>
              )}
              {entry.simulation.avisOeno && (
                <div className="mt-4 pt-4 border-t border-gold-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold-700">La lecture d'Œno</span>
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/15 text-[11px] font-bold text-gold-700">
                      Cohérence {entry.simulation.avisOeno.note}/10
                    </span>
                  </div>
                  <p className="text-sm text-anthracite-700 leading-relaxed">{entry.simulation.avisOeno.avis}</p>
                  {entry.simulation.avisOeno.conseil && (
                    <p className="text-xs text-anthracite-500 italic mt-2">💡 {entry.simulation.avisOeno.conseil}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {entry.ressenti && (
            <>
              <div className="divider-gold" />
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Votre ressenti</div>
              <p className="text-[15px] text-anthracite-800 leading-loose whitespace-pre-line" style={{ fontFamily: 'Fraunces, serif' }}>
                {entry.ressenti}
              </p>
            </>
          )}

          <button
            onClick={() => setShowShare(true)}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-cream shadow-wine hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
          >
            <Share2 size={13} /> Partager cette dégustation
          </button>
        </div>
      </div>

      {showShare && <ShareDegustation entry={entry} onClose={() => setShowShare(false)} />}
    </div>
  )
}

// ── Carte d'entrée (liste) ────────────────────────────────────────────────────
function EntryCard({ entry, onSelect, index }) {
  return (
    <button
      onClick={() => onSelect(entry)}
      className="card p-5 text-left w-full hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="eyebrow !text-[10px]">
          {formatDate(entry.tastedAt)}
          {entry.simulation && <Sparkles size={10} className="inline ml-1.5 -mt-0.5 text-gold-600" title="Dégustation guidée avec Œno" />}
        </span>
        <NoteGrappe value={entry.note} readOnly size={12} />
      </div>
      <h3 className="font-wine-name text-4xl text-anthracite-900 leading-none truncate">{entry.name}</h3>
      {(entry.domain || entry.vintage) && (
        <p className="font-wine-name text-xl text-anthracite-400 mt-0.5">
          {entry.domain}{entry.domain && entry.vintage ? ' · ' : ''}{entry.vintage}
        </p>
      )}
      {entry.ressenti && (
        <p className="text-xs text-anthracite-500 italic mt-3 line-clamp-2">« {entry.ressenti} »</p>
      )}
    </button>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────────
export default function JournalDegustation({ prefill, onConsumePrefill, onMarkFavori }) {
  const [entries, setEntries] = useState([])
  const [ready, setReady] = useState(false)
  const [caveWines, setCaveWines] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editEntry, setEditEntry] = useState(null)
  const [formSeed, setFormSeed] = useState(null)
  const [detail, setDetail] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recent')

  useEffect(() => {
    setEntries(loadJournal())
    setCaveWines(loadCaveWines())
    setReady(true)
    // Le simulateur de dégustation consigne directement dans localStorage :
    // on recharge quand il signale une nouvelle entrée.
    const reload = () => setEntries(loadJournal())
    window.addEventListener('oeno-journal-changed', reload)
    return () => window.removeEventListener('oeno-journal-changed', reload)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries, ready])

  // Pré-remplissage depuis « Noter cette dégustation » (FicheVin / WinePanel)
  useEffect(() => {
    if (prefill) {
      setFormSeed(prefill)
      setEditEntry(null)
      setShowForm(true)
      onConsumePrefill?.()
    }
  }, [prefill]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    let list = entries.filter(e => {
      const q = search.toLowerCase()
      return !q || e.name?.toLowerCase().includes(q) || e.domain?.toLowerCase().includes(q) || e.ressenti?.toLowerCase().includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'note') return (b.note || 0) - (a.note || 0)
      return (b.timestamp || 0) - (a.timestamp || 0)
    })
    return list
  }, [entries, search, sort])

  const save = useCallback(entry => {
    setEntries(prev => prev.find(e => e.id === entry.id) ? prev.map(e => e.id === entry.id ? entry : e) : [entry, ...prev])
    setShowForm(false)
    setEditEntry(null)
    setFormSeed(null)
    toast('Souvenir consigné dans vos Mémoires de Vin')
    // Pont vers les préférés : une belle note sur un vin en cave le marque favori
    onMarkFavori?.(entry)
  }, [onMarkFavori])

  const remove = useCallback(id => {
    if (!confirm('Supprimer définitivement cette note de dégustation ?')) return
    setEntries(prev => prev.filter(e => e.id !== id))
    setDetail(null)
  }, [])

  const openEdit = useCallback(entry => {
    setDetail(null)
    setEditEntry(entry)
  }, [])

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <BookHeart size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">Vos souvenirs</span>
          <h2 className="section-title">Mémoires de Vin</h2>
          <p className="section-sub">{entries.length} dégustation{entries.length > 1 ? 's' : ''} racontée{entries.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
            <input
              type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un vin, un souvenir…"
              className="input-field pl-9" aria-label="Rechercher"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <select
                value={sort} onChange={e => setSort(e.target.value)}
                className="pl-3 pr-8 py-2.5 bg-carte border border-anthracite-900/10 rounded-full text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none"
              >
                <option value="recent">Plus récent</option>
                <option value="note">Meilleure note</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
            </div>
            <button onClick={() => { setEditEntry(null); setFormSeed(null); setShowForm(true) }} className="btn-gold text-xs px-4 py-2.5 whitespace-nowrap">
              <Plus size={13} /> Nouvelle note
            </button>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="card p-12 text-center">
          <NotebookPen size={36} className="text-anthracite-200 mx-auto mb-4" />
          <p className="font-serif text-base text-anthracite-400 mb-1">Votre journal est encore vierge</p>
          <p className="text-xs text-anthracite-400 mb-5 max-w-sm mx-auto">Chaque vin ouvert mérite un souvenir. Notez votre prochaine dégustation — un mot, une émotion, une occasion.</p>
          <button onClick={() => { setEditEntry(null); setFormSeed(null); setShowForm(true) }} className="btn-primary mx-auto">
            <Plus size={13} /> Écrire ma première note
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-anthracite-400">Aucune note ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e, i) => <EntryCard key={e.id} entry={e} index={i} onSelect={setDetail} />)}
        </div>
      )}

      {(showForm || editEntry) && (
        <JournalForm
          initial={editEntry || formSeed}
          caveWines={caveWines}
          onSave={save}
          onClose={() => { setShowForm(false); setEditEntry(null); setFormSeed(null) }}
        />
      )}

      {detail && (
        <CarnetPage entry={detail} onClose={() => setDetail(null)} onEdit={openEdit} onDelete={remove} />
      )}
    </div>
  )
}
