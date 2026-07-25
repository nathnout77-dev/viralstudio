import { useState, useMemo, useEffect } from 'react'
import { Library, Search, X, Plus, Check, Thermometer, Clock, Wine, MapPin, ChevronDown, ExternalLink, Sparkles, NotebookPen, ChefHat, Camera, Globe, Trash2, Grape, UtensilsCrossed, Calendar, Scale, Share2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import AccordInverse from './AccordInverse'
import { EnvieButton } from './Envies'
import { WINE_DB, REGIONS_LIST, DIFFICULTE_CONFIG, MILLESIMES_DB, gardeForMillesime, variantesDe, vinsSimilaires } from '../data/wineDatabase'
import { millesimesAPrivilegier } from '../lib/millesimes'
import JaugesGout from './JaugesGout'
import Terme from './Tooltip'
import WineGlassAnim, { fillLevelFromJauges } from './WineGlassAnim'
import useModalBehavior from '../lib/useModal'
import { tintStyle, pastilleStyle, regionMonogram, collectionNumero } from '../lib/wineStyle'
import WineTile from './WineTile'
import WineVisuel from './WineVisuel'
import BadgeGrandPublic from './BadgeGrandPublic'
import PastilleQualitePrix from './PastilleQualitePrix'
import { loadDecouvertes, removeDecouverte, decouverteNumero } from '../lib/decouvertes'
import { partagerVin } from '../lib/partage'
import { useAppellationRef } from '../lib/useReferentiel'

// Chargé dynamiquement : Comparateur importe FicheVin de ce fichier — le
// dynamic() évite le cycle d'imports au chargement du module.
const Comparateur = dynamic(() => import('./Comparateur'), { ssr: false })
const DegustationSimulateur = dynamic(() => import('./DegustationSimulateur'), { ssr: false })

const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }

function formatScanDate(ts) {
  if (!ts) return ''
  try {
    return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '' }
}

// ── Découverte : étiquette compacte ─────────────────────────────────────────────
function DecouverteCard({ dec, index, onClick }) {
  const titre = dec.appellation || dec.domaine || 'Vin scanné'
  return (
    <button
      onClick={onClick}
      className="etiquette p-4 pt-3.5 text-left w-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both', ...tintStyle(dec.type || 'red') }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full ring-1 ring-anthracite-900/10 flex-shrink-0" style={pastilleStyle(dec.type || 'red')} aria-hidden="true" />
          <span className="etiquette-numero">{decouverteNumero(index)}</span>
        </span>
        {dec.region
          ? <span className="medaillon transition-transform group-hover:scale-110" title={dec.region}>{regionMonogram(dec.region)}</span>
          : <Camera size={13} className="text-anthracite-300" />}
      </div>

      <div className="text-center mb-2 min-w-0">
        <div className="font-wine-name text-2xl text-anthracite-900 leading-tight line-clamp-2 whitespace-normal">{titre}</div>
        {dec.domaine && dec.appellation && (
          <div className="text-[11px] text-anthracite-500 truncate mt-0.5">{dec.domaine}</div>
        )}
        <div className="text-[9px] uppercase tracking-[0.22em] text-anthracite-400 mt-1.5">
          {[dec.region, dec.type ? TYPE_LABELS[dec.type] : null, dec.millesime].filter(Boolean).join(' · ') || 'Scanné'}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {dec.sourceWeb && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700" title="Enrichi par une recherche web">
            <Globe size={9} /> Web
          </span>
        )}
        <span className="text-[9px] text-anthracite-400">{formatScanDate(dec.scannedAt)}</span>
      </div>
    </button>
  )
}

// ── Découverte : fiche détail tolérante aux champs manquants ────────────────────
function DecouverteFiche({ dec, onClose, onDelete }) {
  useModalBehavior(onClose)
  const titre = dec.appellation || dec.domaine || 'Vin scanné'
  const color = { red: '#8c2f39', white: '#c9a84c', 'rosé': '#e58f8f', sparkling: '#5b8db8', sweet: '#b8860b' }[dec.type] || '#8c2f39'
  const fourchette = dec.fourchettePrix && dec.fourchettePrix.min != null
    ? `${dec.fourchettePrix.min}–${dec.fourchettePrix.max} €` : null
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <div className="modal-panel sm:max-w-lg max-h-[92vh] shadow-card-hover" onClick={e => e.stopPropagation()}>
        <div className="p-6 pb-5 flex-shrink-0 relative overflow-hidden text-cream"
             style={{ background: `linear-gradient(150deg, ${color} 0%, ${color}cc 55%, #1e2426 145%)` }}>
          <div className="absolute -top-2 -right-4 opacity-15 select-none pointer-events-none" aria-hidden="true">
            <WineVisuel type={dec.type || 'red'} size={80} />
          </div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/60">Ma découverte</span>
                {dec.sourceWeb && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/20 text-cream backdrop-blur-sm">
                    <Globe size={9} /> Web
                  </span>
                )}
              </div>
              <h3 className="font-wine-name text-4xl text-cream leading-none">{titre}</h3>
              <p className="text-cream/70 text-xs mt-2 flex items-center gap-1.5 flex-wrap">
                {dec.region && <span className="inline-flex items-center gap-1"><MapPin size={10} /> {dec.region}</span>}
                {dec.type && <span>· {TYPE_LABELS[dec.type] || dec.type}</span>}
                {dec.millesime && <span>· {dec.millesime}</span>}
              </p>
              {dec.domaine && dec.appellation && (
                <p className="text-cream/60 text-xs mt-1">Domaine scanné : {dec.domaine}</p>
              )}
            </div>
            <button onClick={onClose} aria-label="Fermer"
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-cream transition-all cursor-pointer">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <p className="text-[11px] text-anthracite-400 flex items-center gap-1.5">
            <Calendar size={11} /> Scanné le {formatScanDate(dec.scannedAt)}
          </p>

          {dec.histoire && (
            <div className="rounded-xl p-3.5 border border-gold-500/20" style={{ background: 'rgba(199,161,90,0.06)' }}>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-1.5">Le domaine</div>
              <p className="text-xs text-anthracite-700 leading-relaxed">{dec.histoire}</p>
            </div>
          )}

          {(dec.styleEtQualite || dec.description) && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Le style</div>
              <p className="text-sm text-anthracite-700 leading-relaxed">{dec.styleEtQualite || dec.description}</p>
              {dec.pourQui && <p className="text-xs text-anthracite-500 italic mt-1.5">{dec.pourQui}</p>}
            </div>
          )}

          {dec.cepages?.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5 flex items-center gap-1.5">
                <Grape size={11} className="text-wine-600" /> Cépages probables
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dec.cepages.map(c => (
                  <span key={c} className="text-xs bg-white border border-anthracite-200 text-anthracite-600 px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          )}

          {dec.accords?.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2 flex items-center gap-1.5">
                <UtensilsCrossed size={11} className="text-gold-600" /> À table avec
              </div>
              <div className="flex flex-wrap gap-2">
                {dec.accords.map(a => (
                  <span key={a} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-cream border border-anthracite-900/10 text-anthracite-700">{a}</span>
                ))}
              </div>
            </div>
          )}

          {fourchette && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-anthracite-100 text-anthracite-700">
              Fourchette de prix : {fourchette}
            </span>
          )}

          {dec.siteWeb && (
            <a href={dec.siteWeb} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-xs font-semibold text-wine-700 hover:text-wine-800">
              <Globe size={12} /> Site officiel du domaine
            </a>
          )}

          {!dec.histoire && !dec.styleEtQualite && !dec.description && !dec.cepages?.length && (
            <p className="text-sm text-anthracite-400 italic">Peu d'informations sur ce vin pour le moment — mais il est bien dans votre bibliothèque.</p>
          )}

          <button
            onClick={() => onDelete(dec.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold text-anthracite-500 hover:text-red-600 border border-anthracite-900/10 hover:border-red-300 transition-all cursor-pointer"
          >
            <Trash2 size={13} /> Retirer de mes découvertes
          </button>
        </div>
      </div>
    </div>
  )
}

// Index stable dans WINE_DB → numérotation de collection (« N° 07 »)
const WINE_INDEX = new Map(WINE_DB.map((w, i) => [w.id, i]))

const TYPE_FILTERS = [
  { value: 'all',       label: 'Tous' },
  { value: 'red',       label: 'Rouge' },
  { value: 'white',     label: 'Blanc' },
  { value: 'rosé',      label: 'Rosé' },
  { value: 'sweet',     label: 'Doux' },
]

const BUDGET_FILTERS = [
  { value: 'all',   label: 'Tout budget' },
  { value: '0-10',  label: '3 – 10 € (petits prix)' },
  { value: '10-20', label: '10 – 20 €' },
  { value: '20-50', label: '20 – 50 €' },
  { value: '50+',   label: '50 € et +' },
]

const DIFF_FILTERS = [
  { value: 'all',      label: 'Tous niveaux' },
  { value: 'facile',   label: 'Facile à aimer' },
  { value: 'explorer', label: 'Pour explorer' },
  { value: 'pointu',   label: 'Pointu' },
]

// ── Fiche détaillée ────────────────────────────────────────────────────────────
// Terroir officiel : sol, garde, hiérarchie, crus classés et millésimes notés
// de la région. Vient de la base viticole nationale, chargée seulement quand
// une fiche s'ouvre — jamais au démarrage de l'app.
function BlocTerroir({ appellation, region }) {
  const ref = useAppellationRef(appellation, region)
  if (!ref) return null
  const { detail, crus, millesimes } = ref
  if (!detail && !crus.length && !millesimes.length) return null
  return (
    <div className="rounded-2xl border border-gold-500/25 p-4 animate-fade-in" style={{ background: 'rgba(199,161,90,0.06)' }}>
      <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-2.5">
        🗺️ Le terroir, officiellement
      </div>

      {detail && (
        <div className="space-y-1.5 text-xs text-anthracite-700">
          {detail.sol && <p><span className="font-semibold">Sol :</span> {detail.sol}</p>}
          {detail.garde && <p><span className="font-semibold">Garde :</span> {detail.garde}</p>}
          {detail.hierarchie && <p><span className="font-semibold">Rang :</span> {detail.hierarchie}</p>}
          {detail.cepages?.length > 0 && (
            <p><span className="font-semibold">Cépages du cahier des charges :</span> {detail.cepages.join(', ')}</p>
          )}
        </div>
      )}

      {crus.length > 0 && (
        <div className="mt-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">
            {crus.length} cru{crus.length > 1 ? 's' : ''} classé{crus.length > 1 ? 's' : ''}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {crus.slice(0, 8).map(c => (
              <span key={c.id} className="text-[10px] bg-white border border-anthracite-200 text-anthracite-600 px-2 py-0.5 rounded-full">
                {c.chateau}
              </span>
            ))}
            {crus.length > 8 && (
              <span className="text-[10px] text-anthracite-400 px-1 py-0.5">+{crus.length - 8}</span>
            )}
          </div>
        </div>
      )}

      {millesimes.length > 0 && (
        <div className="mt-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">
            Millésimes notés — {millesimes[0].region}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {millesimes.map(m => (
              <span
                key={m.id}
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-gold-500/30 text-anthracite-700"
                title={m.commentaire || m.style || ''}
              >
                {m.annee}
                <span className="text-gold-700">{m.note}/20</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function FicheVin({ wine: wineProp, onClose, onAddToCave, added, onNoter }) {
  useModalBehavior(onClose)
  // Le vin affiché est un état : les chips « Existe aussi en… » permettent de
  // basculer entre les variantes de couleur d'une même appellation.
  const [wine, setWine] = useState(wineProp)
  useEffect(() => { setWine(wineProp) }, [wineProp?.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const variantes = variantesDe(wine)
  const similaires = vinsSimilaires(wine, 3)
  // Millésimes à privilégier (guide croisé région + couleur) : pré-sélection
  // sur le meilleur, étoile sur les chips correspondantes.
  const milsReco = millesimesAPrivilegier(wine, 4)
  const defaultMillesime = (w) => {
    const reco = millesimesAPrivilegier(w, 4).find(y => w.bonsMilsimes.includes(y))
    return reco ?? w.bonsMilsimes[w.bonsMilsimes.length - 1]
  }
  const [millesime, setMillesime] = useState(() => defaultMillesime(wine))
  // Si la fiche reste montée mais change de vin, on repart sur son meilleur millésime
  useEffect(() => {
    setMillesime(defaultMillesime(wine))
  }, [wine.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const [showAccordInverse, setShowAccordInverse] = useState(false)
  const [showSimulateur, setShowSimulateur] = useState(false)
  const [partageCopie, setPartageCopie] = useState(false)
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  const addedSet = added || new Set()
  const isAdded = addedSet.has(`${wine.id}-${millesime}`)
  const garde = gardeForMillesime(wine, millesime)
  const petitsDomaines = wine.domaines.filter(d => d.confidentiel)
  const hasPetitDomaine = petitsDomaines.length > 0

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <div
        className="modal-panel sm:max-w-xl lg:max-w-5xl max-h-[92vh] lg:h-[88vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header coloré — compact en desktop pour laisser la place au contenu */}
        <div
          className="p-6 pb-5 lg:py-4 lg:px-7 flex-shrink-0 relative overflow-hidden gold-sheen"
          style={{ background: `linear-gradient(150deg, ${wine.color} 0%, ${wine.color}cc 55%, #1e2426 145%)` }}
        >
          <div className="absolute -top-2 -right-4 opacity-20 select-none pointer-events-none">
            <WineVisuel type={wine.type} size={110} />
          </div>
          <div className="relative flex items-start lg:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5 lg:mb-1">
                <WineVisuel type={wine.type} size={22} className="flex-shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/60">
                  {collectionNumero(WINE_INDEX.get(wine.id) ?? 0)}
                </span>
                <span className="w-7 h-7 lg:w-6 lg:h-6 rounded-full border border-cream/40 flex items-center justify-center font-serif text-[11px] lg:text-[10px] text-cream/85" title={wine.region}>
                  {regionMonogram(wine.region)}
                </span>
                {hasPetitDomaine && (
                  <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-cream backdrop-blur-sm">
                    <Sparkles size={10} /> Petit domaine
                  </span>
                )}
              </div>
              <h3 className="font-wine-name text-5xl lg:text-[2.6rem] text-cream lg:leading-none">
                {wine.emoji && <span className="mr-2 text-2xl align-middle" role="img" aria-hidden="true">{wine.emoji}</span>}
                {wine.appellation}
              </h3>
              <p className="text-cream/70 text-sm lg:text-[13px] mt-1.5 lg:mt-1 flex items-center gap-1.5 flex-wrap">
                <MapPin size={11} /> {wine.region}
                <span className="w-2.5 h-2.5 rounded-full ml-1 ring-1 ring-white/40" style={pastilleStyle(wine.type)} aria-hidden="true" />
                <span className="uppercase tracking-[0.18em] text-[10px] font-semibold">{wine.typeLabel}</span>
                <span className="hidden lg:inline text-cream/85 font-medium italic ml-2">« {wine.enUneMot} »</span>
              </p>
              <p className="text-cream/90 font-medium italic mt-3 text-sm lg:hidden">« {wine.enUneMot} »</p>
              {hasPetitDomaine && (
                <span className="inline-flex lg:hidden items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-cream backdrop-blur-sm">
                  <Sparkles size={10} /> Petit domaine
                </span>
              )}
            </div>
            <div className="flex flex-col lg:flex-row-reverse items-center gap-2 lg:gap-2.5 flex-shrink-0">
              <button onClick={onClose}
                      className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-cream transition-all cursor-pointer"
                      aria-label="Fermer">
                <X size={14} />
              </button>
              <EnvieButton appellation={wine.appellation} light />
              <button
                onClick={async () => {
                  const r = await partagerVin(wine)
                  if (r === 'copie') { setPartageCopie(true); setTimeout(() => setPartageCopie(false), 2000) }
                }}
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-cream transition-all cursor-pointer"
                aria-label="Partager ce vin"
                title={partageCopie ? 'Copié !' : 'Partager ce coup de cœur'}
              >
                {partageCopie ? <Check size={14} /> : <Share2 size={13} />}
              </button>
              <div className="lg:hidden">
                <WineGlassAnim color="#f5f0e8" fillLevel={fillLevelFromJauges(wine.jauges)} size={44} />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:px-10 lg:py-8 space-y-5 lg:space-y-0 lg:columns-2 lg:gap-14 [&>*]:lg:break-inside-avoid [&>*]:lg:mb-7">
          {/* Pour qui + difficulté */}
          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: diff.bg, color: diff.color }}
            >
              {diff.label}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-anthracite-100 text-anthracite-700">
              ~ {wine.prixMoyen} € la bouteille
            </span>
            <PastilleQualitePrix wine={wine} />
            {wine.grandPublic && <BadgeGrandPublic />}
          </div>
          <p className="text-sm text-anthracite-600 leading-relaxed -mt-1">
            <span className="font-semibold text-anthracite-800">Pour qui ? </span>{wine.pourQui}
          </p>

          {/* Variantes de couleur de la même appellation */}
          {variantes.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400">Existe aussi en :</span>
              {variantes.map(v => (
                <button
                  key={v.id}
                  onClick={() => setWine(v)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-anthracite-200 bg-white text-anthracite-700 hover:border-gold-500/60 transition-all cursor-pointer"
                  title={`Voir ${v.appellation}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full ring-1 ring-anthracite-900/10" style={pastilleStyle(v.type)} aria-hidden="true" />
                  {v.typeLabel}
                </button>
              ))}
            </div>
          )}

          {/* Plan B en magasin : vins proches si celui-ci n'est pas en rayon */}
          {similaires.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400">Introuvable en rayon ? Essayez plutôt :</span>
              <div className="flex items-center gap-2 flex-wrap mt-1.5">
                {similaires.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setWine(v)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-anthracite-200 bg-white text-anthracite-700 hover:border-gold-500/60 transition-all cursor-pointer"
                    title={`${v.region} · ~${v.prixMoyen} €`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full ring-1 ring-anthracite-900/10" style={pastilleStyle(v.type)} aria-hidden="true" />
                    {v.appellation}
                    <span className="font-normal text-anthracite-400">~{v.prixMoyen} €</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Jauges */}
          <div className="card p-4">
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-3">Profil de goût</div>
            <JaugesGout jauges={wine.jauges} />
          </div>

          {/* Arômes + cépages */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Ça sent quoi ?</div>
            <p className="text-sm text-anthracite-700">{wine.aromes}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {wine.cepages.map(c => (
                <span key={c} className="text-xs bg-white border border-anthracite-200 text-anthracite-600 px-2.5 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Service */}
          <div className="grid grid-cols-3 gap-2">
            <div className="card p-3 text-center">
              <Thermometer size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.temperature}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5">Service</div>
            </div>
            <div className="card p-3 text-center">
              <Clock size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.carafage || 'Non'}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5"><Terme id="carafage">Carafage</Terme></div>
            </div>
            <div className="card p-3 text-center">
              <Wine size={13} className="text-wine-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-anthracite-800">{wine.garde}</div>
              <div className="text-[9px] text-anthracite-400 uppercase mt-0.5"><Terme id="garde">Garde</Terme></div>
            </div>
          </div>

          {/* Honnêteté : cette fiche est dérivée de la base nationale, pas
              rédigée à la main. Le prix est relevé ou modélisé — on le dit. */}
          {wine.referentiel && (
            <div className="rounded-2xl border border-anthracite-900/[0.08] bg-white p-3.5 flex items-start gap-2.5">
              <span className="text-base leading-none flex-shrink-0" role="img" aria-hidden="true">📊</span>
              <p className="text-[11px] text-anthracite-500 leading-relaxed">
                Fiche établie depuis la base viticole nationale
                {wine.fiabilitePrix ? ` — prix : ${wine.fiabilitePrix.toLowerCase()}` : ''}
                {wine.prixEntree && wine.prixHaut
                  ? `, de ${wine.prixEntree} € à ${wine.prixHaut} € selon le producteur.`
                  : '.'}
              </p>
            </div>
          )}

          {/* Le terroir, d'après la base viticole nationale (chargée à la volée) */}
          <BlocTerroir appellation={wine.appellation} region={wine.region} />

          {/* À table */}
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">À table avec…</div>
            <div className="flex flex-wrap gap-1.5">
              {wine.accords.map(a => (
                <span key={a} className="text-xs bg-gold-500/10 border border-gold-500/30 text-anthracite-700 px-2.5 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowAccordInverse(true)}
              className="mt-3 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
            >
              <ChefHat size={13} /> Que cuisiner avec ?
            </button>
          </div>

          {/* Domaines */}
          {wine.domaines.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Noms à retenir chez le caviste</div>
              <div className="space-y-2">
                {wine.domaines.map(d => (
                  <div key={d.name} className="flex items-start gap-2">
                    <Wine size={10} className="mt-1 flex-shrink-0" style={{ color: wine.color }} />
                    <div className="min-w-0 flex-1">
                      <div>
                        <span className="font-wine-name text-xl text-anthracite-800">{d.name}</span>
                        <span className="text-[11px] text-anthracite-400"> — {d.note}</span>
                        {d.confidentiel && (
                          <span className="ml-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700 align-middle">
                            <Sparkles size={8} /> Petit domaine
                          </span>
                        )}
                      </div>
                      {d.histoire && (
                        <p className="text-[11px] text-anthracite-500 italic mt-0.5 leading-relaxed">{d.histoire}</p>
                      )}
                    </div>
                    {d.url && (
                      <a
                        href={d.url}
                        target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-wine-700 bg-wine-50 border border-wine-200 hover:bg-wine-100 transition-colors cursor-pointer"
                        title={`Visiter le site de ${d.name}`}
                      >
                        <ExternalLink size={9} />
                        Site
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Le mot du caviste */}
          <div className="rounded-2xl p-4" style={{ background: '#f0e9dd' }}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Le mot du caviste</div>
            <p className="text-sm text-anthracite-700 leading-relaxed italic">{wine.description}</p>
          </div>
        </div>

        {/* Footer : ajout cave — sur une ligne en desktop */}
        <div className="p-5 lg:px-7 lg:py-4 border-t border-anthracite-100 bg-cream flex-shrink-0">
          <div className="lg:flex lg:items-center lg:gap-6">
            <div className="lg:flex-1 lg:min-w-0">
              <div className="flex items-center gap-2 mb-3 lg:mb-1.5 overflow-x-auto hide-scrollbar">
                <span className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 flex-shrink-0">
                  <Terme id="millesime">Millésime</Terme> :
                </span>
                {wine.bonsMilsimes.map(y => {
                  const reco = milsReco.includes(y)
                  return (
                    <button
                      key={y}
                      onClick={() => setMillesime(y)}
                      title={reco ? 'Millésime à privilégier' : undefined}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex-shrink-0 ${
                        millesime === y ? 'text-cream border-transparent' : 'bg-white border-anthracite-200 text-anthracite-600'
                      }`}
                      style={millesime === y ? { background: wine.color } : {}}
                    >
                      {reco && <span className={millesime === y ? 'text-gold-300' : 'text-gold-600'}>★ </span>}
                      {y}
                    </button>
                  )
                })}
                {milsReco.some(y => wine.bonsMilsimes.includes(y)) && (
                  <span className="text-[10px] text-anthracite-400 flex-shrink-0"><span className="text-gold-600">★</span> à privilégier</span>
                )}
              </div>
              {garde && (
                <p className="text-[11px] text-anthracite-500 mb-3 lg:mb-0">
                  À boire entre <span className="font-semibold text-anthracite-700">{garde.from}</span> et <span className="font-semibold text-anthracite-700">{garde.until}</span>
                </p>
              )}
            </div>
            <div className="lg:flex lg:items-center lg:gap-3 lg:flex-shrink-0">
              {onAddToCave && (
              <button
                onClick={() => onAddToCave(wine, millesime)}
                disabled={isAdded}
                className={`w-full lg:w-auto flex items-center justify-center gap-2 py-3 lg:px-7 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-cream shadow-wine hover:brightness-110 active:scale-[0.99]'
                }`}
                style={!isAdded ? { background: wine.color } : {}}
              >
                {isAdded ? <><Check size={15} /> Ajouté à ma cave</> : <><Plus size={15} /> Ajouter à ma cave ({millesime})</>}
              </button>
              )}
              <button
                onClick={() => setShowSimulateur(true)}
                className="w-full lg:w-auto flex items-center justify-center gap-1.5 py-2.5 lg:px-4 mt-2 lg:mt-0 rounded-full text-xs font-semibold text-gold-700 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 transition-colors cursor-pointer"
                title="L'avis d'Œno avant d'ouvrir, votre ressenti après"
              >
                <Sparkles size={13} /> Simuler la dégustation
              </button>
              {onNoter && (
                <button
                  onClick={() => onNoter({ name: wine.appellation, domain: wine.domaines?.[0]?.name || '', vintage: millesime, type: wine.type })}
                  className="w-full lg:w-auto flex items-center justify-center gap-1.5 py-2.5 lg:px-4 mt-2 lg:mt-0 rounded-full text-xs font-semibold text-anthracite-500 hover:text-wine-700 transition-colors cursor-pointer"
                >
                  <NotebookPen size={13} /> Noter cette dégustation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAccordInverse && (
        <AccordInverse wine={wine} onClose={() => setShowAccordInverse(false)} />
      )}
      {showSimulateur && (
        <DegustationSimulateur
          vin={{ ...wine, nom: wine.appellation, domaine: wine.domaines?.[0]?.name || '', millesime }}
          onClose={() => setShowSimulateur(false)}
        />
      )}
    </div>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────────
export default function BibliothequeView({ onAddWine, mode, initialSearch = '', onNoter }) {
  const [search, setSearch]   = useState(initialSearch)
  const [type, setType]       = useState('all')
  const [budget, setBudget]   = useState('all')
  // Mode Débutant : vins « faciles à aimer » proposés en premier (filtre modifiable)
  const [diff, setDiff]       = useState(mode === 'debutant' ? 'facile' : 'all')
  const [region, setRegion]   = useState('all')
  const [selected, setSelected] = useState(null)
  const [added, setAdded]     = useState(new Set())
  // Collection (WINE_DB) vs bibliothèque personnelle « Mes découvertes »
  const [onglet, setOnglet]   = useState('collection')
  const [decouvertes, setDecouvertes] = useState([])
  const [selectedDec, setSelectedDec] = useState(null)
  const [showComparateur, setShowComparateur] = useState(false)

  // Rechargement des découvertes à l'affichage de l'onglet (un scan a pu en ajouter)
  useEffect(() => {
    setDecouvertes(loadDecouvertes())
  }, [onglet])

  const supprimerDecouverte = (id) => {
    setDecouvertes(removeDecouverte(id))
    setSelectedDec(null)
  }

  const filtered = useMemo(() => WINE_DB.filter(w => {
    if (search) {
      const q = search.toLowerCase()
      const hit = w.appellation.toLowerCase().includes(q)
        || w.region.toLowerCase().includes(q)
        || w.cepages.some(c => c.toLowerCase().includes(q))
        || w.aromes.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (type !== 'all' && w.type !== type) return false
    if (diff !== 'all' && w.difficulte !== diff) return false
    if (region !== 'all' && w.region !== region) return false
    if (budget !== 'all') {
      const p = w.prixMoyen
      if (budget === '0-10'  && p > 10) return false
      if (budget === '10-20' && (p <= 10 || p > 20)) return false
      if (budget === '20-50' && (p <= 20 || p > 50)) return false
      if (budget === '50+'   && p <= 50) return false
    }
    return true
  }), [search, type, budget, diff, region])

  const handleAdd = (wine, millesime) => {
    onAddWine?.({
      id: `${wine.id}-${millesime}-${Date.now()}`,
      name: wine.appellation,
      domain: '',
      appellation: wine.appellation,
      region: wine.region,
      type: wine.type,
      cepages: wine.cepages,
      vintage: millesime,
      quantity: 1,
      drinkFrom: wine.drinkFrom,
      drinkUntil: wine.drinkUntil,
      serviceTemp: wine.serviceTemp,
      carafage: wine.carafage,
      estimatedValue: wine.prixMoyen,
      foodPairings: wine.accords,
      notes: `${wine.enUneMot} — Arômes : ${wine.aromes}`,
    })
    setAdded(prev => new Set([...prev, `${wine.id}-${millesime}`]))
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <Library size={18} className="text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="eyebrow mb-1">La collection</span>
          <h2 className="section-title">Bibliothèque des Vins</h2>
          <p className="section-sub">{WINE_DB.length} appellations décodées pour vous — cliquez pour tout comprendre</p>
        </div>
        <button
          onClick={() => setShowComparateur(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-anthracite-700 bg-white border border-anthracite-200 hover:border-gold-500/70 hover:text-anthracite-950 active:scale-[0.98] transition-all cursor-pointer"
          title="Comparer 2 ou 3 vins côte à côte"
        >
          <Scale size={13} className="text-gold-600" />
          Comparer
        </button>
      </div>

      {/* Chips : La collection / Mes découvertes */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setOnglet('collection')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            onglet === 'collection' ? 'bg-wine-800 text-cream shadow-wine' : 'bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
          }`}
        >
          <Library size={13} /> La collection <span className="opacity-70">({WINE_DB.length})</span>
        </button>
        <button
          onClick={() => setOnglet('decouvertes')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            onglet === 'decouvertes' ? 'bg-wine-800 text-cream shadow-wine' : 'bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
          }`}
        >
          <Camera size={13} /> Mes découvertes <span className="opacity-70">({decouvertes.length})</span>
        </button>
      </div>

      {/* ── Mes découvertes ──────────────────────────────────────────────────── */}
      {onglet === 'decouvertes' && (
        decouvertes.length === 0 ? (
          <div className="text-center py-16">
            <Camera size={36} className="text-anthracite-200 mx-auto mb-4" />
            <p className="font-serif text-base text-anthracite-500 mb-1">Votre bibliothèque personnelle est vide</p>
            <p className="text-xs text-anthracite-400 max-w-sm mx-auto">Scannez l'étiquette d'un vin inconnu : Œno l'identifie, l'enrichit d'une recherche web et le garde ici, rien que pour vous.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {decouvertes.map((dec, i) => (
              <DecouverteCard key={dec.id} dec={dec} index={i} onClick={() => setSelectedDec(dec)} />
            ))}
          </div>
        )
      )}

      {/* ── La collection ────────────────────────────────────────────────────── */}
      {onglet === 'collection' && (
      <>
      {/* Recherche */}
      <div className="relative mb-4 lg:mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite-400" />
        <input
          className="w-full pl-11 pr-4 py-3 bg-white border border-anthracite-200 rounded-2xl text-base sm:text-sm placeholder-anthracite-400 focus:outline-none focus:ring-2 focus:ring-gold-600/40 focus:border-gold-500 transition-all"
          placeholder="Cherchez un vin, une région, un cépage, un arôme…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-anthracite-400 hover:text-anthracite-700 cursor-pointer">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Desktop : panneau de filtres persistant à gauche · Mobile : filtres empilés */}
      <div className="lg:flex lg:gap-8 lg:items-start">
        <aside className="lg:w-52 lg:flex-shrink-0 lg:sticky lg:top-10">
          {/* Filtres type */}
          <div className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-3">Couleur</div>
          <div className="flex gap-2 flex-wrap mb-3 lg:flex-col lg:gap-1.5 lg:mb-6">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setType(f.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer lg:w-full lg:text-left lg:rounded-xl lg:px-3.5 lg:py-2 ${
                  type === f.value ? 'bg-wine-800 text-cream border-wine-800' : 'bg-white text-anthracite-600 border-anthracite-200 hover:border-wine-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Filtres budget + difficulté + région */}
          <div className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-3">Affiner</div>
          <div className="flex gap-2 flex-wrap mb-6 lg:flex-col lg:gap-2.5">
            {[
              { value: budget, set: setBudget, options: BUDGET_FILTERS, label: 'Filtrer par budget' },
              { value: diff,   set: setDiff,   options: DIFF_FILTERS, label: 'Filtrer par difficulté' },
              { value: region, set: setRegion, options: [{ value: 'all', label: 'Toutes régions' }, ...REGIONS_LIST.map(r => ({ value: r, label: r }))], label: 'Filtrer par région' },
            ].map(({ value, set, options, label }, i) => (
              <div key={i} className="relative lg:w-full">
                <select
                  value={value}
                  onChange={e => set(e.target.value)}
                  aria-label={label}
                  className="pl-3 pr-8 py-2 lg:w-full bg-white border border-anthracite-200 rounded-xl text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none font-medium"
                >
                  {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
              </div>
            ))}
            <span className="text-xs text-anthracite-400 self-center ml-auto font-medium lg:hidden">
              {filtered.length} vin{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </aside>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <p className="hidden lg:block text-xs text-anthracite-400 font-medium mb-4">
            {filtered.length} vin{filtered.length > 1 ? 's' : ''} sur {WINE_DB.length}
          </p>

          {/* Grille */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3" role="img" aria-hidden="true">🔍</div>
              <p className="text-anthracite-500 text-sm">Aucun vin ne correspond — élargissez vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filtered.map((w, i) => (
                <WineTile key={w.id} wine={w} variant="collection" index={WINE_INDEX.get(w.id) ?? i} onOpen={setSelected} />
              ))}
            </div>
          )}
        </div>
      </div>
      </>
      )}

      {/* Fiche */}
      {selected && (
        <FicheVin
          wine={selected}
          onClose={() => setSelected(null)}
          onAddToCave={handleAdd}
          added={added}
          onNoter={onNoter}
        />
      )}

      {/* Fiche découverte */}
      {selectedDec && (
        <DecouverteFiche dec={selectedDec} onClose={() => setSelectedDec(null)} onDelete={supprimerDecouverte} />
      )}

      {/* Comparateur de vins */}
      {showComparateur && (
        <Comparateur onClose={() => setShowComparateur(false)} onAddWine={onAddWine} />
      )}
    </div>
  )
}
