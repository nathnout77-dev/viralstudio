import { useState, useEffect, useMemo, useRef } from 'react'
import { Search, X, Star, Grape, ArrowRight, Library, Camera, MapPin, Landmark } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import { millesimesAPrivilegier } from '../lib/millesimes'
import { normaliser } from '../data/aromes'
import { getDecouvertesAsWines } from '../lib/decouvertes'
import WineVisuel from './WineVisuel'
import BadgeGrandPublic from './BadgeGrandPublic'
import PastilleQualitePrix from './PastilleQualitePrix'
import { FicheVin } from './BibliothequeView'
import { chercherReferentiel, COUVERTURE } from '../lib/referentiel'
import FicheReferentiel from './FicheReferentiel'

// ─────────────────────────────────────────────────────────────────────────────
// RechercheRapide — recherche globale instantanée (retour utilisateur n°4).
// « Chablis », « Pouilly », « Chardonnay »… → la bonne fiche ET surtout les
// millésimes à privilégier, lisibles directement dans les résultats, sans
// naviguer. Pensé pour le rayon de supermarché : 3 secondes, réponse.
// ─────────────────────────────────────────────────────────────────────────────

// Suggestions affichées avant la première frappe — les exemples cités par
// les utilisateurs (appellations) + les cépages les plus demandés.
const SUGGESTIONS_APPELLATIONS = ['Chablis', 'Pouilly', 'Sancerre', 'Saint-Émilion', 'Côtes-du-Rhône', 'Chinon']
const SUGGESTIONS_CEPAGES = ['Chardonnay', 'Sauvignon', 'Pinot Noir', 'Merlot', 'Syrah', 'Gamay']

// Recherche multi-critères avec priorité : appellation > cépage > domaine > région.
// `extra` = découvertes personnelles converties en vins, cherchables comme le reste.
function chercher(query, extra = []) {
  const q = normaliser(query.trim())
  if (q.length < 2) return []
  const res = []
  for (const w of [...WINE_DB, ...extra]) {
    const app = normaliser(w.appellation)
    const cepageHit = (w.cepages || []).find(c => normaliser(c).includes(q))
    let score = 0
    let via = null
    if (app.startsWith(q)) score = 100
    else if (app.includes(q)) score = 80
    else if (cepageHit) { score = 60; via = { label: cepageHit, type: 'cepage' } }
    else if ((w.domaines || []).some(d => normaliser(d.name).includes(q))) { score = 50; via = { label: 'Domaine', type: 'domaine' } }
    else if (normaliser(w.region).includes(q)) { score = 30; via = { label: w.region, type: 'region' } }
    if (!score) continue
    // Départage : les valeurs sûres faciles d'abord, le grand public après le terroir
    if (w.difficulte === 'facile') score += 3
    if (w.grandPublic) score -= 5
    res.push({ w, score, via })
  }
  return res.sort((a, b) => b.score - a.score).slice(0, 24)
}

function LigneResultat({ w, via, onOpen }) {
  const mils = millesimesAPrivilegier(w, 3)
  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-anthracite-200 hover:border-gold-500/60 active:scale-[0.99] transition-all cursor-pointer text-left"
    >
      <WineVisuel type={w.type} size={26} className="flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-bold text-anthracite-900 truncate">{w.appellation}</span>
          {w.decouverte && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold-500/15 text-gold-700">
              <Camera size={8} /> Ma découverte
            </span>
          )}
          {w.grandPublic && <BadgeGrandPublic compact />}
          {via?.type === 'cepage' && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-wine-50 text-wine-800">
              <Grape size={8} /> {via.label}
            </span>
          )}
        </div>
        <div className="text-[11px] text-anthracite-400 mt-0.5 truncate">
          {w.region} · {w.typeLabel} · ~{w.prixMoyen} €
        </div>
        <div className="mt-1"><PastilleQualitePrix wine={w} compact /></div>
        {/* Le cœur de la fonctionnalité : les millésimes à demander, sans clic */}
        {mils.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-anthracite-400">Millésimes</span>
            {mils.map((m, i) => (
              <span
                key={m}
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  i === 0
                    ? 'bg-gold-500/20 text-gold-800 border border-gold-500/40'
                    : 'bg-anthracite-100 text-anthracite-600'
                }`}
              >
                {i === 0 && <Star size={8} className="fill-gold-600 text-gold-600" />}
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
      <ArrowRight size={14} className="text-anthracite-300 flex-shrink-0" />
    </button>
  )
}

// Résultat issu de la base viticole nationale (appellation, cépage, domaine)
const META_REF = {
  appellation: { Icon: MapPin,   label: 'Appellation', couleur: 'text-gold-700',  fond: 'rgba(199,161,90,0.13)' },
  cepage:      { Icon: Grape,    label: 'Cépage',      couleur: 'text-wine-700',  fond: 'rgba(140,47,57,0.10)' },
  domaine:     { Icon: Landmark, label: 'Domaine',     couleur: 'text-anthracite-600', fond: 'rgba(28,25,23,0.06)' },
}

function LigneReferentiel({ kind, item, onOpen }) {
  const meta = META_REF[kind]
  const sous = kind === 'appellation'
    ? [item.region, item.sousRegion, item.type === 'IGP' ? 'IGP' : null].filter(Boolean).join(' · ')
    : kind === 'cepage'
      ? [item.couleur, item.origine].filter(Boolean).join(' · ')
      : [item.appellation, item.region].filter(Boolean).join(' · ')
  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-anthracite-200 hover:border-gold-500/60 active:scale-[0.99] transition-all cursor-pointer text-left"
    >
      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: meta.fond }}>
        <meta.Icon size={15} className={meta.couleur} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-bold text-anthracite-900 truncate">{item.nom}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-anthracite-100 text-anthracite-500">
            {meta.label}
          </span>
        </div>
        <div className="text-[11px] text-anthracite-400 mt-0.5 truncate">{sous}</div>
      </div>
      <ArrowRight size={14} className="text-anthracite-300 flex-shrink-0" />
    </button>
  )
}

export default function RechercheRapide({ onClose, onOpenBibliotheque }) {
  const [query, setQuery] = useState('')
  const [fiche, setFiche] = useState(null)
  const [ficheRef, setFicheRef] = useState(null)
  const [decouvertes, setDecouvertes] = useState([])
  const inputRef = useRef(null)

  // Découvertes personnelles (vins scannés inconnus) : cherchables comme le reste
  useEffect(() => { setDecouvertes(getDecouvertesAsWines()) }, [])

  useEffect(() => {
    // Échap : ferme la fiche ouverte d'abord, l'overlay ensuite
    const esc = e => {
      if (e.key !== 'Escape') return
      // Ferme d'abord la fiche ouverte, l'overlay ensuite
      if (ficheRef) { setFicheRef(null); return }
      setFiche(f => { if (f) return null; onClose(); return f })
    }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose, ficheRef])

  const resultats = useMemo(() => chercher(query, decouvertes), [query, decouvertes])

  // Base nationale : tout ce qu'Œno connaît au-delà de ses vins modélisés.
  // On masque les appellations déjà couvertes par un vin affiché ci-dessus.
  const refResultats = useMemo(() => {
    const dejaVues = new Set(resultats.map(r => normaliser(r.w.appellation)))
    return chercherReferentiel(query, 20)
      .filter(r => !(r.kind === 'appellation' && dejaVues.has(normaliser(r.item.nom))))
      .slice(0, 10)
  }, [query, resultats])
  const enRecherche = normaliser(query.trim()).length >= 2

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-start justify-center sm:pt-[8vh]" role="dialog" aria-modal="true" aria-label="Recherche rapide">
      <div className="absolute inset-0 bg-anthracite-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full sm:max-w-xl max-h-[88dvh] flex flex-col bg-cream rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Champ de recherche */}
        <div className="p-4 pb-3 border-b border-anthracite-900/[0.07] flex items-center gap-3">
          <Search size={17} className="text-gold-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Chablis, Pouilly, Chardonnay, un domaine…"
            className="flex-1 bg-transparent text-[15px] text-anthracite-900 placeholder-anthracite-400 outline-none min-w-0"
            aria-label="Rechercher un vin, une appellation ou un cépage"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-anthracite-400 hover:text-anthracite-700 cursor-pointer" aria-label="Effacer">
              <X size={15} />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-100 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Fermer la recherche"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!enRecherche && (
            <div className="animate-fade-in">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2">Appellations</div>
              <div className="flex flex-wrap gap-2 mb-5">
                {SUGGESTIONS_APPELLATIONS.map(s => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-anthracite-700 bg-white border border-anthracite-200 hover:border-gold-500/60 active:scale-[0.97] transition-all cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-anthracite-400 mb-2">Cépages</div>
              <div className="flex flex-wrap gap-2 mb-5">
                {SUGGESTIONS_CEPAGES.map(s => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-wine-800 bg-wine-50 border border-wine-100 hover:border-wine-300 active:scale-[0.97] transition-all cursor-pointer">
                    <Grape size={11} /> {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-anthracite-400 leading-relaxed">
                Tapez une appellation, un cépage ou un domaine : les <span className="font-semibold text-anthracite-600">millésimes à privilégier</span> s'affichent directement — pratique devant le rayon. Toute la France est couverte : {COUVERTURE.appellations} appellations, {COUVERTURE.cepages} cépages, {COUVERTURE.domaines} domaines.
              </p>
            </div>
          )}

          {enRecherche && resultats.length === 0 && refResultats.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <div className="text-sm font-semibold text-anthracite-700 mb-1.5">Aucun vin trouvé pour « {query} »</div>
              <p className="text-xs text-anthracite-400 max-w-xs mx-auto">Essayez une appellation (« Chablis »), un cépage (« Chardonnay ») ou une région (« Loire »).</p>
            </div>
          )}

          {enRecherche && resultats.length > 0 && (
            <div className="space-y-2 animate-fade-in">
              <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-anthracite-400 mb-1">
                {resultats.length} vin{resultats.length > 1 ? 's' : ''} · <Star size={8} className="inline fill-gold-600 text-gold-600 -mt-0.5" /> = millésime à demander en priorité
              </div>
              {resultats.map(({ w, via }) => (
                <LigneResultat key={w.id} w={w} via={via} onOpen={() => setFiche(w)} />
              ))}
            </div>
          )}

          {/* Base viticole nationale : appellations, cépages et domaines
              qu'Œno documente au-delà de ses vins entièrement modélisés. */}
          {enRecherche && refResultats.length > 0 && (
            <div className="space-y-2 animate-fade-in mt-5">
              <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-anthracite-400 mb-1">
                Base viticole de France · {COUVERTURE.appellations} appellations, {COUVERTURE.cepages} cépages
              </div>
              {refResultats.map(r => (
                <LigneReferentiel
                  key={`${r.kind}-${r.item.id}`}
                  kind={r.kind}
                  item={r.item}
                  onOpen={() => setFicheRef(r)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tout voir dans la bibliothèque avec la même recherche */}
        {enRecherche && (
          <div className="p-3 border-t border-anthracite-900/[0.07]">
            <button
              onClick={() => { onClose(); onOpenBibliotheque?.(query) }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-anthracite-700 border border-anthracite-900/15 hover:border-gold-500/60 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Library size={13} className="text-gold-600" />
              Affiner dans la bibliothèque
            </button>
          </div>
        )}
      </div>

      {fiche && <FicheVin wine={fiche} onClose={() => setFiche(null)} />}
      {ficheRef && (
        <FicheReferentiel
          entree={ficheRef}
          onClose={() => setFicheRef(null)}
          onOuvrirVin={w => { setFicheRef(null); setFiche(w) }}
        />
      )}
    </div>
  )
}
