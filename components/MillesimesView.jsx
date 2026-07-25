import { useState, useMemo, useEffect, useRef } from 'react'
import { BookOpen, ChevronDown, Star, TrendingUp, Award, Filter, Search, X } from 'lucide-react'
import { MILLESIMES_DB, WINE_DB, gardeForMillesime } from '../data/wineDatabase'
import { millesimesAPrivilegier, meilleurMillesime } from '../lib/millesimes'
import { normaliser } from '../data/aromes'
import useReferentiel from '../lib/useReferentiel'
import PetitsPrix from './PetitsPrix'
import WineVisuel from './WineVisuel'
import { FicheVin } from './BibliothequeView'
import BadgeGrandPublic from './BadgeGrandPublic'

const REGIONS = ['Toutes','Bordeaux','Bourgogne','Rhône Nord','Rhône Sud','Alsace','Loire','Provence','Languedoc','Beaujolais','Jura','Sud-Ouest']
const TYPES   = ['Tous','Rouge','Blanc','Rosé','Liquoreux']

const REC_CONFIG = {
  'Privilégier':         { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500', score: 4 },
  'Bon choix':           { bg: 'bg-blue-50',     text: 'text-blue-700',   dot: 'bg-blue-400',    score: 3 },
  'Sélection prudente':  { bg: 'bg-amber-100',   text: 'text-amber-800',  dot: 'bg-amber-500',   score: 2 },
  'À éviter':            { bg: 'bg-red-50',       text: 'text-red-600',   dot: 'bg-red-400',     score: 1 },
}

const TYPE_STYLE = {
  'Rouge':       'bg-wine-100 text-wine-800',
  'Blanc':       'bg-amber-50 text-amber-800 border border-amber-200',
  'Rosé':        'bg-pink-50 text-pink-700 border border-pink-200',
  'Liquoreux':   'bg-amber-100 text-amber-900',
}

// ── Animated row ─────────────────────────────────────────────────────────────
function TableRow({ row, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const rec = row[7]
  const cfg = REC_CONFIG[rec] || { bg: 'bg-anthracite-50', text: 'text-anthracite-500', dot: 'bg-anthracite-300' }

  return (
    <tr
      ref={ref}
      className="border-b border-anthracite-50 hover:bg-anthracite-50/60 transition-all duration-300 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.4s ease ${Math.min(index * 30, 300)}ms, transform 0.4s ease ${Math.min(index * 30, 300)}ms`,
      }}
    >
      <td className="px-4 py-3 pl-5">
        <span className="font-wine-name text-2xl text-anthracite-900">{row[0]}</span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${TYPE_STYLE[row[1]] || 'bg-anthracite-100 text-anthracite-600'}`}>
          {row[1]}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-anthracite-600 whitespace-nowrap">{row[2]}</td>
      <td className="px-4 py-3 text-xs text-anthracite-800 font-medium">{row[3]}</td>
      <td className="px-4 py-3 text-xs text-anthracite-500 hidden sm:table-cell">{row[4]}</td>
      <td className="px-4 py-3 text-xs text-center hidden md:table-cell">
        <span className="font-semibold text-anthracite-700">{row[5]}</span>
        <span className="text-anthracite-400 text-[10px]"> ans</span>
      </td>
      <td className="px-4 py-3 text-xs text-anthracite-600 hidden lg:table-cell max-w-[180px]">
        <span className="line-clamp-2">{row[6]}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
            {rec}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 pr-5 text-[10px] text-anthracite-400 hidden xl:table-cell max-w-[120px]">
        {row[8]}
      </td>
    </tr>
  )
}

// ── Highlights strip ─────────────────────────────────────────────────────────
function HighlightCard({ year, label, region, color }) {
  return (
    <div className="flex-shrink-0 card p-4 min-w-[200px] group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-2 mb-2">
        <Award size={14} style={{ color }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-anthracite-400">{label}</span>
      </div>
      <div className="font-wine-name text-4xl text-anthracite-900">{year}</div>
      <div className="text-xs text-anthracite-500 mt-1">{region}</div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
// Notes de millésimes /20 par région, issues de la base viticole nationale.
// Complète le guide interne : ici, la note critique et l'apogée conseillée.
function NotesMillesimesRef({ region, annee }) {
  const R = useReferentiel()
  const notes = useMemo(() => {
    if (!R) return []
    const base = region && region !== 'Toutes'
      ? R.millesimesRegion(region)
      : [...R.MILLESIMES_FR].sort((a, b) => b.annee - a.annee)
    const filtrees = annee ? base.filter(m => m.annee === Number(annee)) : base
    return filtrees.slice(0, 12)
  }, [R, region, annee])

  if (!notes.length) return null
  return (
    <div className="card p-4 mb-4 animate-fade-in">
      <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-gold-700 mb-2.5">
        📅 Notes de millésimes {region !== 'Toutes' ? `— ${region}` : '— toutes régions'}
      </div>
      <div className="space-y-1.5">
        {notes.map(m => (
          <div key={m.id} className="flex items-baseline gap-2.5 text-xs">
            <span className="font-bold text-anthracite-900 w-11 flex-shrink-0">{m.annee}</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
              style={{
                background: m.note >= 18 ? 'rgba(74,124,89,0.15)' : m.note >= 16 ? 'rgba(199,161,90,0.18)' : 'rgba(28,25,23,0.07)',
                color: m.note >= 18 ? '#3f6b4c' : m.note >= 16 ? '#8a6a1f' : '#57534e',
              }}
            >
              {m.note}/20
            </span>
            {region === 'Toutes' && (
              <span className="text-[10px] text-anthracite-400 w-24 flex-shrink-0 truncate">{m.region}</span>
            )}
            <span className="text-anthracite-600 truncate">{m.style}</span>
            {m.apogee && <span className="text-[10px] text-anthracite-400 flex-shrink-0 ml-auto">{m.apogee}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MillesimesView() {
  const [region, setRegion] = useState('Toutes')
  const [type,   setType]   = useState('Tous')
  const [year,   setYear]   = useState('')
  const [rec,    setRec]    = useState('Tous')
  const [search, setSearch] = useState('')
  const [vinChoisi, setVinChoisi] = useState(null) // vin sélectionné via la recherche
  const [ficheVin, setFicheVin] = useState(null)   // fiche complète ouverte
  const [showFilters, setShowFilters] = useState(false)
  const headerRef = useRef(null)

  const years = useMemo(() => [...new Set(MILLESIMES_DB.map(r => r[0]))].sort((a,b) => b-a), [])

  // Recherche par mot-clé : appellation, région ou cépage — chaque vin de la
  // bibliothèque est trouvable, même sans ligne dédiée dans le guide.
  const nq = normaliser(search.trim())
  const vinsTrouves = useMemo(() => {
    if (nq.length < 2) return []
    return WINE_DB.filter(w =>
      normaliser(w.appellation).includes(nq)
      || normaliser(w.region).includes(nq)
      || (w.cepages || []).some(c => normaliser(c).includes(nq))
    ).slice(0, 8)
  }, [nq])

  // Le vin mis en avant : celui cliqué, sinon le meilleur match de la saisie
  const vinFocus = vinChoisi || (nq.length >= 2 ? vinsTrouves[0] : null)

  const filtered = useMemo(() => MILLESIMES_DB.filter(r => {
    const matchR = region === 'Toutes' || r[2] === region
    const matchT = type   === 'Tous'   || r[1] === type
    const matchY = !year               || r[0] === Number(year)
    const matchC = rec    === 'Tous'   || r[7] === rec
    // Recherche : lignes de l'appellation exacte, sinon celles de la
    // région+couleur du vin trouvé (le guide raisonne par région).
    let matchS = true
    if (vinFocus) {
      const labelType = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux' }[vinFocus.type]
      matchS = normaliser(r[3] || '').includes(normaliser(vinFocus.appellation))
        || (r[2] === vinFocus.region && r[1] === labelType)
    } else if (nq.length >= 2) {
      matchS = normaliser(r[3] || '').includes(nq) || normaliser(r[2] || '').includes(nq)
    }
    return matchR && matchT && matchY && matchC && matchS
  }).sort((a,b) => b[0] - a[0]), [region, type, year, rec, nq, vinFocus])

  // Exceptional vintages for the highlight strip
  const exceptional = MILLESIMES_DB
    .filter(r => r[7] === 'Privilégier' && (r[6] || '').toLowerCase().includes('exception'))
    .slice(0, 8)

  const totalPrivilegier = MILLESIMES_DB.filter(r => r[7] === 'Privilégier').length

  return (
    <div className="animate-fade-in">

      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-wine-800 flex items-center justify-center shadow-wine">
          <BookOpen size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">Les grandes années</span>
          <h2 className="section-title">Guide des Millésimes</h2>
          <p className="section-sub">Base œnologique complète — {MILLESIMES_DB.length} millésimes analysés</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: MILLESIMES_DB.length, label: 'Millésimes', icon: BookOpen, color: 'text-gold-500' },
          { value: totalPrivilegier,      label: 'À Privilégier', icon: Star, color: 'text-emerald-500' },
          { value: [...new Set(MILLESIMES_DB.map(r => r[2]))].length, label: 'Régions', icon: TrendingUp, color: 'text-blue-500' },
        ].map(({ value, label, icon: Icon, color }) => (
          <div key={label} className="card p-3 sm:p-4 flex items-center gap-3">
            <Icon size={18} className={color} />
            <div>
              <div className="font-bold font-serif text-xl text-anthracite-900">{value}</div>
              <div className="text-[10px] text-anthracite-400 uppercase tracking-wider">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Exceptional strip */}
      {exceptional.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] text-anthracite-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
            <Award size={11} className="text-gold-500" />
            Millésimes d'exception
          </p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {exceptional.map((r, i) => (
              <HighlightCard
                key={i}
                year={r[0]}
                label={r[3]}
                region={r[2]}
                color={r[1] === 'Rouge' ? '#72102a' : r[1] === 'Blanc' ? '#b8962a' : '#3b82f6'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Petits prix, belles années */}
      <PetitsPrix
        title="Petits prix, belles années — 3 à 10 €"
        subtitle="Des appellations accessibles avec de très bons millésimes à saisir en ce moment."
        detail={w => `Bons millésimes : ${(w.bonsMilsimes || []).slice(-3).join(' · ')}`}
      />

      {/* Recherche par vin : n'importe quelle appellation, région ou cépage */}
      <div className="card p-4 mb-5">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-anthracite-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setVinChoisi(null) }}
            placeholder="Cherchez un vin : Menetou, Pauillac, Pinot Noir, Loire…"
            className="input-field w-full !pl-10 !text-sm"
            aria-label="Chercher un vin dans le guide des millésimes"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); setVinChoisi(null) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-anthracite-400 hover:text-anthracite-700 cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Vins correspondants */}
        {vinsTrouves.length > 1 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {vinsTrouves.map(w => (
              <button
                key={w.id}
                onClick={() => setVinChoisi(w)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  vinFocus?.id === w.id ? 'bg-wine-800 text-cream border-transparent' : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
                }`}
              >
                <WineVisuel type={w.type} size={11} />
                {w.appellation}
              </button>
            ))}
          </div>
        )}
        {nq.length >= 2 && vinsTrouves.length === 0 && (
          <p className="text-xs text-anthracite-500 mt-3">
            Aucun vin trouvé pour « {search} » — essayez le nom de l'appellation (ex. « Menetou », « Cahors »).
          </p>
        )}

        {/* Carte du vin : ses millésimes à privilégier, même sans ligne dédiée au guide */}
        {vinFocus && (() => {
          const mils = millesimesAPrivilegier(vinFocus, 4)
          const meilleur = meilleurMillesime(vinFocus)
          const garde = meilleur ? gardeForMillesime(vinFocus, meilleur) : null
          return (
            <div className="mt-4 rounded-2xl border border-gold-500/30 p-4"
                 style={{ background: 'linear-gradient(135deg, #fdf9f0, #f7ecd9)' }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 border border-anthracite-900/[0.06]">
                  <WineVisuel type={vinFocus.type} size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-serif text-base font-bold text-anthracite-900">{vinFocus.appellation}</div>
                    {vinFocus.grandPublic && <BadgeGrandPublic compact />}
                  </div>
                  <div className="text-[11px] text-anthracite-500">{vinFocus.region} · {vinFocus.typeLabel} · ~{vinFocus.prixMoyen} €</div>
                  <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold-700">Millésimes à privilégier :</span>
                    {mils.map(y => (
                      <span key={y} className="px-2.5 py-1 rounded-full text-xs font-bold text-cream" style={{ background: vinFocus.color }}>
                        {y}
                      </span>
                    ))}
                  </div>
                  {garde && (
                    <p className="text-[11px] text-anthracite-500 mt-2">
                      Le {meilleur} : à boire entre <span className="font-semibold text-anthracite-700">{garde.from}</span> et <span className="font-semibold text-anthracite-700">{garde.until}</span>
                    </p>
                  )}
                  <button
                    onClick={() => setFicheVin(vinFocus)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-wine-800 mt-2.5 cursor-pointer hover:underline"
                  >
                    <BookOpen size={11} /> Voir la fiche complète
                  </button>
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Notes officielles par région — base viticole nationale */}
      <NotesMillesimesRef region={region} annee={year} />

      {/* Filter bar */}
      <div className="card p-4 mb-5">
        <div className="flex items-center justify-between mb-3 sm:hidden">
          <span className="text-xs font-semibold text-anthracite-600 uppercase tracking-wider">Filtres</span>
          <button onClick={() => setShowFilters(f => !f)} className="flex items-center gap-1 text-xs text-gold-600 cursor-pointer">
            <Filter size={12} />
            {showFilters ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        <div className={`flex flex-wrap gap-3 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
          {[
            { label: 'Région',     value: region, onChange: setRegion, options: REGIONS },
            { label: 'Type',       value: type,   onChange: setType,   options: TYPES },
            { label: 'Millésime',  value: year,   onChange: setYear,   options: ['Tous', ...years.map(String)] },
            { label: 'Avis',       value: rec,    onChange: setRec,    options: ['Tous', ...Object.keys(REC_CONFIG)] },
          ].map(({ label, value, onChange, options }) => (
            <div key={label} className="relative">
              <label className="sr-only">{label}</label>
              <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white border border-anthracite-900/10 rounded-full text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none transition-all"
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
            </div>
          ))}

          {/* Active filters count */}
          {(region !== 'Toutes' || type !== 'Tous' || year || rec !== 'Tous' || search) && (
            <button
              onClick={() => { setRegion('Toutes'); setType('Tous'); setYear(''); setRec('Tous'); setSearch(''); setVinChoisi(null) }}
              className="px-3 py-2 text-xs text-wine-700 bg-wine-50 border border-wine-200 rounded-full hover:bg-wine-100 transition-colors cursor-pointer"
            >
              Réinitialiser
            </button>
          )}

          <div className="ml-auto text-xs text-anthracite-400 self-center font-medium">
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(REC_CONFIG).map(([label, { bg, text, dot }]) => (
          <button
            key={label}
            onClick={() => setRec(rec === label ? 'Tous' : label)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer border ${
              rec === label ? 'ring-2 ring-offset-1 ring-gold-400 ' : 'border-transparent'
            } ${bg} ${text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-anthracite-100 bg-anthracite-50/50">
                {[
                  ['Millésime',''],
                  ['Type',''],
                  ['Région',''],
                  ['Appellation',''],
                  ['Cépages','hidden sm:table-cell'],
                  ['Garde','hidden md:table-cell'],
                  ['Qualité','hidden lg:table-cell'],
                  ['Avis',''],
                  ['Note','hidden xl:table-cell'],
                ].map(([h, cls]) => (
                  <th key={h} className={`px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-wider text-anthracite-400 whitespace-nowrap first:pl-5 last:pr-5 ${cls}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <TableRow key={`${r[0]}-${r[3]}`} row={r} index={i} />
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <BookOpen size={32} className="text-anthracite-200 mx-auto mb-3" />
              <p className="text-anthracite-400 text-sm">Aucun résultat pour ces critères.</p>
              <button
                onClick={() => { setRegion('Toutes'); setType('Tous'); setYear(''); setRec('Tous'); setSearch(''); setVinChoisi(null) }}
                className="mt-3 text-xs text-gold-600 hover:text-gold-500 cursor-pointer underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {ficheVin && <FicheVin wine={ficheVin} onClose={() => setFicheVin(null)} />}
    </div>
  )
}
