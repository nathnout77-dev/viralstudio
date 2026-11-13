import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, LayoutGrid, List, Wine, Plus, X, ChevronDown, BookHeart, BarChart3, Heart, CloudUpload, Star, Sparkles, Camera, Compass } from 'lucide-react'
import WineCard from './WineCard'
import JournalDegustation from './JournalDegustation'
import PanoramaCave from './PanoramaCave'
import ProfilGout from './ProfilGout'
import EnviesView, { useEnvies } from './Envies'
import RollingNumber from './RollingNumber'
import { estAPoint, aOuvrirSansTarder, libelleDeGarde } from '../lib/apogee'

const TYPES = ['Tous', 'Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Liquoreux']
const TYPE_MAP = { 'Rouge':'red', 'Blanc':'white', 'Rosé':'rosé', 'Effervescent':'sparkling', 'Liquoreux':'sweet' }
const REGIONS = ['Toutes','Bordeaux','Bourgogne','Champagne','Rhône Nord','Rhône Sud','Loire','Alsace','Provence','Languedoc','Beaujolais','Jura','Sud-Ouest','Corse','Autre']
const SORT_OPTIONS = [
  { value: 'name',     label: 'Nom A→Z' },
  { value: 'vintage',  label: 'Millésime ↓' },
  { value: 'quantity', label: 'Quantité ↓' },
  { value: 'value',    label: 'Valeur ↓' },
]

function SelectFilter({ value, onChange, options, label }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-3 pr-8 py-2 bg-carte border border-anthracite-900/10 rounded-full text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-600/40 cursor-pointer appearance-none"
        aria-label={label}
      >
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
    </div>
  )
}

export default function CaveView({ wines, caveDemo = false, onCommencerCave, onScan, onRecherche, onDecouvrir, onAdd, onEdit, onDelete, onSelect, onUpdateQty, onToggleFavori, onMarkFavori, journalPrefill, onConsumeJournalPrefill, onBuyEnvie, onCompte, onOpenBibliotheque }) {
  const envies = useEnvies()
  const [search, setSearch]   = useState('')
  const [typeFilter, setType] = useState('Tous')
  const [region, setRegion]   = useState('Toutes')
  const [sort, setSort]       = useState('name')
  const [favOnly, setFavOnly] = useState(false)
  const [view, setView]       = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sub, setSub]         = useState('cave')
  const [montre, setMontre]   = useState('cave') // 'cave' | 'bues'

  const favCount = useMemo(() => wines.filter(w => w.favori).length, [wines])

  // Si une note pré-remplie arrive (depuis « Noter cette dégustation »), on bascule sur le journal
  useEffect(() => {
    if (journalPrefill) setSub('journal')
  }, [journalPrefill])

  const filtered = useMemo(() => {
    let list = wines.filter(w => (w.quantity || 0) > 0).filter(w => {
      const q = search.toLowerCase()
      const matchSearch = !q || w.name.toLowerCase().includes(q) || w.domain?.toLowerCase().includes(q)
                          || w.appellation?.toLowerCase().includes(q) || String(w.vintage).includes(q)
      const matchType   = typeFilter === 'Tous' || w.type === TYPE_MAP[typeFilter]
      const matchRegion = region === 'Toutes' || w.region === region
      const matchFav    = !favOnly || !!w.favori
      return matchSearch && matchType && matchRegion && matchFav
    })
    list = [...list].sort((a, b) => {
      // Tri par défaut (nom) : les préférés remontent en tête
      if (sort === 'name') {
        if (!!b.favori !== !!a.favori) return (b.favori ? 1 : 0) - (a.favori ? 1 : 0)
        return a.name.localeCompare(b.name)
      }
      if (sort === 'vintage')  return b.vintage - a.vintage
      if (sort === 'quantity') return b.quantity - a.quantity
      if (sort === 'value')    return (b.estimatedValue || 0) - (a.estimatedValue || 0)
      return 0
    })
    return list
  }, [wines, search, typeFilter, region, sort, favOnly])

  const stats = useMemo(() => ({
    total:    wines.reduce((s, w) => s + w.quantity, 0),
    value:    wines.reduce((s, w) => s + (w.estimatedValue || 0) * w.quantity, 0),
    // Une bouteille finie ne compte ni pour les régions, ni pour « à boire ».
    regions:  new Set(wines.filter(w => (w.quantity || 0) > 0).map(w => w.region).filter(Boolean)).size,
    ready:    wines.filter(w => (w.quantity || 0) > 0 && estAPoint(w)).length,
  }), [wines])

  // Les bouteilles déjà ouvertes, la plus récente d'abord. Une bouteille à
  // zéro sans trace d'ouverture (finie avant que l'historique existe) y
  // figure aussi : sans cela elle disparaîtrait des deux listes.
  const bues = useMemo(() => wines
    .filter(w => !w.demo && ((w.ouvertes || 0) > 0 || (w.quantity || 0) <= 0))
    .sort((a, b) => (b.derniereOuverture || 0) - (a.derniereOuverture || 0)), [wines])
  const pressees = useMemo(() => aOuvrirSansTarder(wines), [wines])
  useEffect(() => { if (montre === 'bues' && bues.length === 0) setMontre('cave') }, [montre, bues.length])

  const hasFilters = typeFilter !== 'Tous' || region !== 'Toutes' || favOnly

  return (
    <div className="animate-fade-in">
      {/* Sous-onglets : Ma Cave / Mémoires de Vin */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {[
          { id: 'cave',     label: 'Ma Cave',         emoji: '🍾' },
          { id: 'gout',     label: 'Mon goût',        emoji: '👅' },
          { id: 'journal',  label: 'Mémoires de Vin', emoji: '📖' },
          { id: 'panorama', label: 'Panorama',        emoji: '📊' },
          { id: 'envies',   label: 'Envies',          emoji: '❤️', badge: envies.length },
        ].map(({ id, label, emoji, badge }) => (
          <button
            key={id}
            onClick={() => setSub(id)}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer lg:px-5 ${
              sub === id
                ? 'bg-wine-800 text-cream shadow-wine'
                : 'bg-carte text-anthracite-600 border border-anthracite-200 hover:border-wine-300'
            }`}
          >
            <span className="text-base leading-none" role="img" aria-hidden="true">{emoji}</span>
            {label}
            {badge > 0 && (
              <span className={`min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[9px] font-bold ${
                sub === id ? 'bg-gold-500/30 text-gold-300' : 'bg-wine-800 text-cream'
              }`}>
                <RollingNumber value={badge} />
              </span>
            )}
          </button>
        ))}

        {/* Compte & synchronisation */}
        <button
          onClick={onCompte}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer bg-carte text-anthracite-600 border border-anthracite-200 hover:border-gold-500/70"
          title="Mon compte, sauvegarde et synchronisation"
        >
          <CloudUpload size={13} className="text-gold-600" />
          Mon compte & sauvegarde
        </button>
      </div>

      {sub === 'gout' && <ProfilGout onOpenBibliotheque={onOpenBibliotheque} />}

      {sub === 'panorama' && <PanoramaCave wines={wines} />}

      {sub === 'envies' && <EnviesView onBuy={onBuyEnvie} />}

      {sub === 'journal' && (
        <JournalDegustation prefill={journalPrefill} onConsumePrefill={onConsumeJournalPrefill} onMarkFavori={onMarkFavori} />
      )}

      {sub === 'cave' && (
      <>
      {/* La cave d'exemple se présente : sans ce mot, un nouveau venu croit
          posséder 34 bouteilles — ou n'ose pas toucher à ce qui ressemble à
          la cave de quelqu'un d'autre. Elle s'efface d'elle-même au premier
          vrai ajout (voir saveWine) ; le bouton permet de ne pas l'attendre. */}
      {caveDemo && (
        <div className="card p-4 mb-6 border-gold-500/40 bg-gold-500/5">
          <p className="text-sm text-anthracite-800 font-semibold mb-1">
            Ces bouteilles sont un décor 🍷
          </p>
          <p className="text-xs text-anthracite-500 leading-relaxed mb-3">
            Une cave d’exemple pour vous montrer Œno. Ajoutez votre première
            bouteille : elle s’effacera d’elle-même. Ou partez de zéro tout de suite :
          </p>
          <button onClick={onCommencerCave} className="btn-primary text-xs">
            Commencer ma cave
          </button>
        </div>
      )}
      {/* À ouvrir sans tarder : une cave n'est pas un coffre, un vin oublié
          s'y abîme. C'est un repère d'appellation, pas un verdict — dit tel quel. */}
      {pressees.length > 0 && (
        <section className="card p-4 mb-6 border-gold-500/40 bg-gold-500/5" aria-label="À ouvrir sans tarder">
          <p className="text-sm font-semibold text-anthracite-900 mb-0.5">
            <span aria-hidden="true">⏳ </span>À ouvrir sans tarder
          </p>
          <p className="text-[11px] text-anthracite-500 leading-relaxed mb-3">
            Leur meilleure période se termine. Repère tiré de l’appellation : une
            grande cuvée ou une bonne cave peuvent tenir plus longtemps.
          </p>
          <ul className="space-y-1.5">
            {pressees.slice(0, 4).map(({ vin }) => (
              <li key={vin.id}>
                <button onClick={() => onSelect(vin)} className="w-full flex items-center justify-between gap-3 text-left px-3 py-2.5 rounded-xl bg-carte border border-anthracite-900/10 hover:border-gold-500/60 transition-colors cursor-pointer">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-anthracite-900 truncate">{vin.name} {vin.vintage}</span>
                    <span className="block text-[11px] text-anthracite-500">{libelleDeGarde(vin)} · {vin.quantity} btle{vin.quantity > 1 ? 's' : ''}</span>
                  </span>
                  <ChevronDown size={14} className="-rotate-90 flex-shrink-0 text-anthracite-400" />
                </button>
              </li>
            ))}
          </ul>
          {pressees.length > 4 && <p className="text-[11px] text-anthracite-500 mt-2">… et {pressees.length - 4} autre{pressees.length - 4 > 1 ? 's' : ''}.</p>}
        </section>
      )}
      {/* Stats strip */}
      {wines.length === 0 ? (
        <div className="card p-10 text-center">
          <Wine size={36} className="text-wine-300 mx-auto mb-4" />
          <p className="font-serif text-lg text-anthracite-900 mb-1">Votre cave démarre ici</p>
          <p className="text-xs text-anthracite-500 leading-relaxed mb-6 max-w-sm mx-auto">
            Une bouteille sous la main ? Scannez son étiquette. Sinon, cherchez
            un vin que vous aimez — ou laissez Œno vous en faire découvrir.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button onClick={onScan} className="btn-primary text-xs justify-center">
              <Camera size={13} /> Scanner une étiquette
            </button>
            <button onClick={onRecherche} className="btn-ghost text-xs justify-center">
              <Search size={13} /> Chercher un vin
            </button>
            <button onClick={onDecouvrir} className="btn-ghost text-xs justify-center">
              <Compass size={13} /> Découvrir
            </button>
          </div>
        </div>
      ) : (
      <>
      {/* Sur téléphone, une seule ligne serrée : en deux rangées de grandes
          cartes, les compteurs remplissaient tout le premier écran et l'on
          n'apercevait pas une bouteille sans faire défiler. */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {[
          { label: 'Bouteilles', court: 'Btles',   value: stats.total,               sub: 'en cave' },
          { label: 'Valeur totale', court: 'Valeur', value: `${Math.round(stats.value).toLocaleString('fr')} €`, sub: 'vos prix d’achat' },
          { label: 'Régions',    court: 'Régions', value: stats.regions,            sub: 'représentées' },
          { label: 'À boire',    court: 'À boire', value: stats.ready,              sub: 'à l\'apogée' },
        ].map(s => (
          <div key={s.label} className="card px-2 py-2.5 sm:p-4 text-center sm:text-left min-w-0">
            <div className="text-[15px] sm:text-2xl font-semibold text-anthracite-900 font-serif whitespace-nowrap truncate">{s.value}</div>
            <div className="text-[9px] sm:text-xs text-anthracite-500 uppercase tracking-wide mt-0.5 truncate">
              <span className="sm:hidden">{s.court}</span><span className="hidden sm:inline">{s.label}</span>
            </div>
            <div className="hidden sm:block text-[10px] text-anthracite-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un vin, domaine, appellation…"
            className="input-field pl-9 pr-4"
            aria-label="Rechercher"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-anthracite-400 hover:text-anthracite-600">
              <X size={12} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
              showFilters || hasFilters
                ? 'bg-wine-50 border-wine-300 text-wine-texte'
                : 'bg-carte border-anthracite-200 text-anthracite-600 hover:border-anthracite-300'
            }`}
          >
            <SlidersHorizontal size={13} />
            Filtres
            {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-wine-700" />}
          </button>
          <div className="flex border border-anthracite-900/10 rounded-full overflow-hidden">
            {[['grid', LayoutGrid], ['list', List]].map(([v, Icon]) => (
              <button key={v} onClick={() => setView(v)}
                      className={`px-2.5 py-2 transition-all cursor-pointer ${view === v ? 'bg-wine-800 text-cream' : 'bg-carte text-anthracite-400 hover:text-anthracite-700'}`}
                      aria-label={v === 'grid' ? 'Grille' : 'Liste'} aria-pressed={view === v}>
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="card p-4 mb-4 flex flex-wrap gap-3 animate-fade-in">
          {/* Type pills */}
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-wine-800 text-cream border-wine-800'
                    : 'bg-carte text-anthracite-500 border-anthracite-200 hover:border-anthracite-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {favCount > 0 && (
            <button
              onClick={() => setFavOnly(f => !f)}
              aria-pressed={favOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                favOnly
                  ? 'bg-gold-500/15 text-gold-700 border-gold-500/50'
                  : 'bg-carte text-anthracite-500 border-anthracite-200 hover:border-gold-500/50'
              }`}
            >
              <Star size={12} strokeWidth={1.8} fill={favOnly ? '#c9a84c' : 'none'} className={favOnly ? 'text-gold-500' : 'text-anthracite-400'} />
              Favoris
              <span className="text-[10px] opacity-70">{favCount}</span>
            </button>
          )}
          <div className="flex gap-2 items-center ml-auto">
            <SelectFilter value={region} onChange={setRegion} options={REGIONS} label="Région" />
            <SelectFilter value={sort}   onChange={setSort}   options={SORT_OPTIONS} label="Trier par" />
          </div>
        </div>
      )}

      {bues.length > 0 && (
        <div className="flex gap-2 mb-4" role="group" aria-label="Ce que vous regardez">
          {[['cave', 'En cave'], ['bues', `Bues (${bues.length})`]].map(([id, nom]) => (
            <button key={id} onClick={() => setMontre(id)} aria-pressed={montre === id}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${montre === id ? 'bg-wine-800 text-cream border-wine-800' : 'bg-carte text-anthracite-600 border-anthracite-200 hover:border-wine-300'}`}>
              {nom}
            </button>
          ))}
        </div>
      )}

      {montre === 'bues' ? (
        <ul className="flex flex-col gap-2">
          {bues.map(w => (
            <li key={w.id} className="card p-4 flex items-center gap-3">
              <button onClick={() => onSelect(w)} className="min-w-0 flex-1 text-left cursor-pointer">
                <span className="block text-sm font-semibold text-anthracite-900 truncate">{w.name} {w.vintage}</span>
                <span className="block text-[11px] text-anthracite-500">
                  {(w.ouvertes || 0) > 0 ? `${w.ouvertes} ouverte${w.ouvertes > 1 ? 's' : ''}` : 'Terminée'}
                  {w.derniereOuverture ? ` · la dernière le ${new Date(w.derniereOuverture).toLocaleDateString('fr-FR')}` : ''}
                  {(w.quantity || 0) > 0 ? ` · il en reste ${w.quantity}` : ''}
                </span>
              </button>
              <button onClick={() => onUpdateQty(w, 1)} className="btn-ghost text-xs flex-shrink-0" aria-label={`Racheter ${w.name} : remettre une bouteille en cave`}>
                <Plus size={12} /> Rachetée
              </button>
            </li>
          ))}
        </ul>
      ) : (
      <>
      {/* Results */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-anthracite-400">
          {filtered.length} vin{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>
        <button onClick={onAdd} className="btn-gold text-xs px-3.5 py-1.5">
          <Plus size={12} /> Ajouter
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Wine size={36} className="text-anthracite-200 mx-auto mb-4" />
          <p className="font-serif text-base text-anthracite-400 mb-1">Aucun vin trouvé</p>
          <p className="text-xs text-anthracite-400 mb-4">Essayez d'autres critères ou ajoutez un vin.</p>
          <button onClick={onAdd} className="btn-primary mx-auto"><Plus size={13} />Ajouter un vin</button>
        </div>
      ) : (
        <div className={
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-2'
        }>
          {filtered.map(w => (
            <WineCard
              key={w.id} wine={w}
              compact={view === 'list'}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateQty={onUpdateQty}
              onToggleFavori={onToggleFavori}
            />
          ))}
        </div>
      )}
      </>
      )}
      </>
      )}
      </>
      )}
    </div>
  )
}
