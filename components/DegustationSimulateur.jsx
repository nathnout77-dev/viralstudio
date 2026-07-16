import { useState, useMemo } from 'react'
import {
  X, Eye, Wind, Wine, Target, Thermometer, Clock, Grape,
  ArrowRight, ArrowLeft, NotebookPen, Check, Sparkles,
} from 'lucide-react'
import { construirePrediction } from '../lib/predictionDegustation'
import { AROME_FAMILLES } from '../data/aromes'
import JaugesGout from './JaugesGout'
import useModalBehavior from '../lib/useModal'
import { toast } from './Toast'

const JOURNAL_KEY = 'oeno-journal'
const todayISO = () => new Date().toISOString().slice(0, 10)

const JAUGES_FORM = [
  { key: 'puissance', label: 'Corps', left: 'Léger', right: 'Puissant', color: '#8c2f39' },
  { key: 'douceur',   label: 'Sucre', left: 'Sec',   right: 'Doux',     color: '#c98f2c' },
  { key: 'tanins',    label: 'Tanins', left: 'Souple', right: 'Costaud', color: '#6b4a3a' },
]

const ROBE_CHIPS = ['Rubis', 'Grenat', 'Pourpre', 'Tuilé', 'Or pâle', 'Paille', 'Doré', 'Ambré', 'Rosé pâle', 'Saumon']

// ── Jauge cliquable (même langage visuel que JaugesGout) ─────────────────────
function JaugeInput({ label, left, right, color, value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-anthracite-400 font-medium">{left}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-anthracite-500">{label}</span>
        <span className="text-[10px] text-anthracite-400 font-medium">{right}</span>
      </div>
      <div className="flex gap-1 h-5">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-label={`${label} : ${i} sur 5`}
            className="flex-1 rounded-full cursor-pointer transition-all active:scale-95"
            style={{ background: i <= value ? color : '#e7e5e4', opacity: i <= value ? 0.5 + i / 10 : 1 }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Note en grappes (1-5, or) ────────────────────────────────────────────────
function NoteGrappe({ value, onChange, size = 22 }) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Note globale">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n} type="button" onClick={() => onChange(n)}
          aria-label={`${n} sur 5`} aria-pressed={value >= n}
          className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <Grape size={size} strokeWidth={1.5} fill={value >= n ? '#c9a84c' : 'none'}
                 className={value >= n ? 'text-gold-500' : 'text-anthracite-300'} />
        </button>
      ))}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button" onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
        active
          ? 'bg-wine-700 border-wine-700 text-cream shadow-wine'
          : 'bg-white border-anthracite-900/10 text-anthracite-600 hover:border-gold-500/60'
      }`}
    >
      {children}
    </button>
  )
}

function SectionTitre({ icon: Icon, titre, sous }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="w-8 h-8 rounded-xl bg-wine-800 flex items-center justify-center flex-shrink-0 shadow-wine">
        <Icon size={14} className="text-gold-400" />
      </div>
      <div>
        <div className="text-sm font-bold text-anthracite-900">{titre}</div>
        {sous && <div className="text-[11px] text-anthracite-400">{sous}</div>}
      </div>
    </div>
  )
}

// ── Bilan : verdicts ludiques ────────────────────────────────────────────────
function badgeNez(taux) {
  if (taux >= 0.75) return { emoji: '🏅', titre: 'Nez d\'exception !', texte: 'Vous avez retrouvé presque tous les arômes annoncés. Les sommeliers n\'ont qu\'à bien se tenir.' }
  if (taux >= 0.5) return { emoji: '👃', titre: 'Beau nez !', texte: 'Plus de la moitié des arômes retrouvés — votre nez se forme, et vite.' }
  if (taux > 0) return { emoji: '🌱', titre: 'Le nez s\'éveille', texte: 'Quelques arômes retrouvés : c\'est comme ça qu\'on apprend. Resentez le verre dans 10 minutes, le vin change.' }
  return { emoji: '🎯', titre: 'Tout reste à découvrir', texte: 'Aucun arôme annoncé retrouvé — et c\'est très bien ! Votre ressenti compte plus que la théorie. La prochaine fois, laissez le vin s\'ouvrir 15 minutes.' }
}

function verdictJauges(prediction, ressenti) {
  const deltas = JAUGES_FORM.map(({ key, label }) => ({
    label,
    prevu: prediction.jauges[key] || 1,
    percu: ressenti[key] || 1,
  }))
  const ecartMoyen = deltas.reduce((s, d) => s + Math.abs(d.prevu - d.percu), 0) / deltas.length
  const phrases = deltas
    .filter(d => Math.abs(d.prevu - d.percu) >= 2)
    .map(d => d.percu > d.prevu
      ? `plus ${d.label === 'Corps' ? 'puissant' : d.label === 'Sucre' ? 'doux' : 'tannique'} qu'annoncé`
      : `plus ${d.label === 'Corps' ? 'léger' : d.label === 'Sucre' ? 'sec' : 'souple'} qu'annoncé`)
  return {
    deltas,
    accord: ecartMoyen <= 0.7,
    texte: ecartMoyen <= 0.7
      ? 'Votre palais et Œno sont d\'accord sur le style du vin.'
      : `Vous l'avez trouvé ${phrases.join(' et ') || 'un peu différent de la prédiction'} — le millésime, le service ou votre sensibilité : tout joue.`,
  }
}

// ── Composant principal ──────────────────────────────────────────────────────
// vin : { nom, appellation, domaine, millesime, region, type, cepages, ... }
export default function DegustationSimulateur({ vin, onClose }) {
  useModalBehavior(onClose)
  const prediction = useMemo(() => construirePrediction(vin || {}), [vin])
  const [step, setStep] = useState('avis') // 'avis' | 'notes' | 'bilan'
  const [saved, setSaved] = useState(false)

  // Ressenti utilisateur
  const [robeChoisie, setRobeChoisie] = useState([])
  const [aromesTrouves, setAromesTrouves] = useState([]) // parmi les prédits
  const [autresAromes, setAutresAromes] = useState([])   // familles hors prédiction
  const [jaugesRessenties, setJaugesRessenties] = useState({ ...prediction.jauges })
  const [note, setNote] = useState(0)
  const [ressenti, setRessenti] = useState('')

  const toggle = (list, setList, v) =>
    setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v])

  const famillesPredites = new Set(prediction.nez.map(n => n.famille).filter(Boolean))
  const autresFamilles = AROME_FAMILLES.filter(f => !famillesPredites.has(f.label))
  const estRouge = prediction.type === 'red'

  const taux = prediction.nez.length ? aromesTrouves.length / prediction.nez.length : 0
  const badge = badgeNez(taux)
  const jaugesVerdict = verdictJauges(prediction, jaugesRessenties)

  // ── Consigner dans les Mémoires de Vin ────────────────────────────────────
  const consigner = () => {
    if (saved) return
    const nezTexte = [...aromesTrouves, ...autresAromes].join(', ')
    const boucheTexte = JAUGES_FORM
      .filter(({ key }) => estRouge || key !== 'tanins')
      .map(({ key, left, right }) => {
        const v = jaugesRessenties[key] || 1
        return v >= 4 ? right.toLowerCase() : v <= 2 ? left.toLowerCase() : `${left.toLowerCase()}/${right.toLowerCase()} équilibré`
      }).join(', ')
    const entry = {
      id: `j${Date.now()}`,
      name: prediction.nom,
      domain: prediction.domaine || '',
      vintage: prediction.millesime || null,
      tastedAt: todayISO(),
      context: 'Dégustation guidée avec Œno',
      robe: robeChoisie.join(', '),
      nez: nezTexte,
      bouche: boucheTexte,
      unMot: '',
      note,
      ressenti,
      timestamp: Date.now(),
      updatedAt: Date.now(),
      simulation: {
        source: prediction.source,
        aromesPredits: prediction.nez.map(n => n.arome),
        aromesTrouves,
        taux: Math.round(taux * 100),
        jaugesPredites: prediction.jauges,
        jaugesRessenties,
        objectif: prediction.objectif,
        badge: `${badge.emoji} ${badge.titre}`,
      },
    }
    try {
      const raw = localStorage.getItem(JOURNAL_KEY)
      const list = raw ? JSON.parse(raw) : []
      localStorage.setItem(JOURNAL_KEY, JSON.stringify([entry, ...(Array.isArray(list) ? list : [])]))
      window.dispatchEvent(new Event('oeno-journal-changed'))
    } catch { /* quota / mode privé */ }
    setSaved(true)
    toast('Dégustation consignée dans vos Mémoires de Vin')
  }

  const titres = {
    avis: { eyebrow: 'Avant d\'ouvrir la bouteille', titre: 'L\'avis d\'Œno' },
    notes: { eyebrow: 'À vous de jouer', titre: 'Votre dégustation' },
    bilan: { eyebrow: 'Le moment de vérité', titre: 'Vous vs Œno' },
  }[step]

  return (
    <div
      className="fixed inset-0 z-[85] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Simulateur de dégustation"
    >
      <div className="modal-panel sm:max-w-xl max-h-[92vh] shadow-card-hover" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="absolute -top-4 -right-3 opacity-10 select-none pointer-events-none" aria-hidden="true">
            <Wine size={100} strokeWidth={1} />
          </div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="eyebrow-dark mb-1.5">{titres.eyebrow}</span>
              <h3 className="font-serif text-2xl font-medium">{titres.titre}</h3>
              <p className="text-cream/70 text-sm mt-1 truncate">
                {prediction.nom}{prediction.domaine ? ` · ${prediction.domaine}` : ''}{prediction.millesime ? ` · ${prediction.millesime}` : ''}
              </p>
            </div>
            <button onClick={onClose} aria-label="Fermer"
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer">
              <X size={14} />
            </button>
          </div>
          {/* Étapes */}
          <div className="relative flex items-center gap-1.5 mt-4">
            {['avis', 'notes', 'bilan'].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-500 ${s === step ? 'w-8 bg-gold-400' : 'w-4 bg-white/25'}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">

          {/* ── ÉTAPE 1 : L'avis d'Œno ─────────────────────────────────── */}
          {step === 'avis' && (
            <div className="space-y-5 animate-fade-in">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-700">
                {prediction.fiabilite.emoji} {prediction.fiabilite.label}
              </span>

              <div className="card p-4">
                <SectionTitre icon={Eye} titre="L'œil — ce que vous devriez voir" />
                <p className="text-sm text-anthracite-700 leading-relaxed">{prediction.robe.texte}</p>
              </div>

              <div className="card p-4">
                <SectionTitre icon={Wind} titre="Le nez — les arômes à chercher" sous="Sentez avant de goûter, puis re-sentez après quelques minutes" />
                <div className="space-y-2.5">
                  {prediction.nez.map(n => (
                    <div key={n.arome} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                      <div className="text-sm text-anthracite-700">
                        <span className="font-semibold capitalize">{n.arome}</span>
                        {n.astuce && <span className="text-anthracite-500"> — pensez à {n.astuce}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4">
                <SectionTitre icon={Wine} titre="La bouche — le déroulé attendu" />
                <div className="space-y-2 text-sm text-anthracite-700 leading-relaxed">
                  <p><span className="font-semibold text-wine-700">L'attaque · </span>{prediction.bouche.attaque}</p>
                  <p><span className="font-semibold text-wine-700">Le milieu · </span>{prediction.bouche.milieu}</p>
                  <p><span className="font-semibold text-wine-700">La finale · </span>{prediction.bouche.finale}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-anthracite-100">
                  <JaugesGout jauges={prediction.jauges} compact />
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: '#f0e9dd' }}>
                <SectionTitre icon={Target} titre="L'idée du vin — son objectif" />
                {prediction.idee.enUneMot && (
                  <p className="font-wine-name text-2xl text-wine-700 mb-2">« {prediction.idee.enUneMot} »</p>
                )}
                <p className="text-sm text-anthracite-700 leading-relaxed">{prediction.objectif}</p>
                {prediction.idee.pourQui && (
                  <p className="text-xs text-anthracite-500 mt-2 italic">Pour qui ? {prediction.idee.pourQui}</p>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-anthracite-600">
                <span className="inline-flex items-center gap-1.5"><Thermometer size={12} className="text-wine-600" /> {prediction.service.temperature}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-wine-600" /> Carafage : {prediction.service.carafage || 'inutile'}</span>
              </div>

              <button
                onClick={() => setStep('notes')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-cream shadow-wine hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              >
                J'ai dégusté — noter mon ressenti <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* ── ÉTAPE 2 : le ressenti ──────────────────────────────────── */}
          {step === 'notes' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <SectionTitre icon={Eye} titre="La robe" sous="Ce que vous avez vu dans le verre" />
                <div className="flex flex-wrap gap-1.5">
                  {ROBE_CHIPS.map(c => (
                    <Chip key={c} active={robeChoisie.includes(c)} onClick={() => toggle(robeChoisie, setRobeChoisie, c)}>{c}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitre icon={Wind} titre="Le nez" sous="Cochez les arômes annoncés que vous avez retrouvés" />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {prediction.nez.map(n => (
                    <Chip key={n.arome} active={aromesTrouves.includes(n.arome)} onClick={() => toggle(aromesTrouves, setAromesTrouves, n.arome)}>
                      <span className="capitalize">{aromesTrouves.includes(n.arome) ? '✓ ' : ''}{n.arome}</span>
                    </Chip>
                  ))}
                </div>
                <div className="text-[11px] text-anthracite-400 mb-1.5">Et senti autre chose ?</div>
                <div className="flex flex-wrap gap-1.5">
                  {autresFamilles.map(f => (
                    <Chip key={f.id} active={autresAromes.includes(f.label)} onClick={() => toggle(autresAromes, setAutresAromes, f.label)}>{f.label}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitre icon={Wine} titre="La bouche" sous="Placez le curseur selon votre ressenti" />
                <div className="space-y-3">
                  {JAUGES_FORM.filter(j => estRouge || j.key !== 'tanins').map(j => (
                    <JaugeInput
                      key={j.key} {...j}
                      value={jaugesRessenties[j.key] || 1}
                      onChange={v => setJaugesRessenties(r => ({ ...r, [j.key]: v }))}
                    />
                  ))}
                </div>
              </div>

              <div className="divider-gold" />

              <div>
                <label className="label">Votre note</label>
                <NoteGrappe value={note} onChange={setNote} />
              </div>

              <div>
                <label className="label">Votre avis, librement</label>
                <textarea
                  className="input-field resize-none" rows={3}
                  placeholder="Ce que ce vin vous a évoqué…"
                  value={ressenti} onChange={e => setRessenti(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setStep('avis')} className="btn-ghost text-xs px-4 py-3 flex items-center gap-1.5 cursor-pointer">
                  <ArrowLeft size={13} /> L'avis d'Œno
                </button>
                <button
                  onClick={() => setStep('bilan')}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-cream shadow-wine hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                >
                  Voir le bilan <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 : Vous vs Œno ──────────────────────────────────── */}
          {step === 'bilan' && (
            <div className="space-y-5 animate-fade-in">
              {/* Badge nez */}
              <div className="card p-5 text-center">
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <div className="font-serif text-xl font-bold text-anthracite-900">{badge.titre}</div>
                <p className="text-xs text-anthracite-500 mt-1.5 max-w-sm mx-auto leading-relaxed">{badge.texte}</p>
                {prediction.nez.length > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15">
                    <Wind size={13} className="text-gold-700" />
                    <span className="text-sm font-bold text-gold-700">{aromesTrouves.length} / {prediction.nez.length} arômes retrouvés</span>
                  </div>
                )}
              </div>

              {/* Jauges : prévu vs perçu */}
              <div className="card p-4">
                <SectionTitre icon={Wine} titre="Le style — Œno vs vous" />
                <div className="space-y-3">
                  {jaugesVerdict.deltas.filter(d => estRouge || d.label !== 'Tanins').map(d => (
                    <div key={d.label}>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-anthracite-500 mb-1">
                        <span>{d.label}</span>
                        <span className={Math.abs(d.prevu - d.percu) <= 1 ? 'text-emerald-600' : 'text-gold-700'}>
                          {Math.abs(d.prevu - d.percu) <= 1 ? '✓ accord' : `écart de ${Math.abs(d.prevu - d.percu)}`}
                        </span>
                      </div>
                      {[{ v: d.prevu, lab: 'Œno', color: '#c9a84c' }, { v: d.percu, lab: 'Vous', color: '#8c2f39' }].map(({ v, lab, color }) => (
                        <div key={lab} className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-anthracite-400 w-8 flex-shrink-0">{lab}</span>
                          <div className="flex gap-1 h-1.5 flex-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="flex-1 rounded-full" style={{ background: i <= v ? color : '#e7e5e4' }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-anthracite-600 leading-relaxed mt-3 pt-3 border-t border-anthracite-100">
                  {jaugesVerdict.texte}
                </p>
              </div>

              {/* Objectif atteint ? */}
              <div className="rounded-2xl p-4" style={{ background: '#f0e9dd' }}>
                <SectionTitre icon={Target} titre="L'objectif était…" />
                <p className="text-sm text-anthracite-700 leading-relaxed">{prediction.objectif}</p>
                {note > 0 && (
                  <p className="text-xs text-anthracite-600 mt-2.5 font-medium">
                    {note >= 4 ? '🎉 Vu votre note, mission accomplie.' : note === 3 ? 'Verdict mitigé — peut-être un autre millésime, ou un autre jour.' : 'Pas convaincu·e cette fois — c\'est noté, et ça compte autant qu\'un coup de cœur.'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <button
                onClick={consigner}
                disabled={saved}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  saved ? 'bg-emerald-100 text-emerald-700' : 'text-cream shadow-wine hover:brightness-110 active:scale-[0.99]'
                }`}
                style={!saved ? { background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' } : {}}
              >
                {saved
                  ? <><Check size={15} /> Consigné dans vos Mémoires de Vin</>
                  : <><NotebookPen size={15} /> Consigner dans mes Mémoires de Vin</>}
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('notes')} className="flex-1 btn-ghost text-xs py-3 justify-center cursor-pointer flex items-center gap-1.5">
                  <ArrowLeft size={13} /> Corriger mon ressenti
                </button>
                <button onClick={onClose} className="flex-1 btn-ghost text-xs py-3 justify-center cursor-pointer flex items-center gap-1.5">
                  <Sparkles size={13} className="text-gold-600" /> {saved ? 'Terminer' : 'Fermer sans consigner'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
