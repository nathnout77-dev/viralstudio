import { useState, useEffect } from 'react'
import {
  Wine, Search, Library, Map, GraduationCap, ScanLine,
  ArrowRight, Sparkles, Lightbulb, Layers,
} from 'lucide-react'
import { computeSuggestionDuJour } from '../lib/suggestionDuJour'
import { WINE_DB_TERROIR } from '../data/wineDatabase'

// ─────────────────────────────────────────────────────────────────────────────
// HubGuide — le nouvel écran d'accueil. L'app ne présente plus des onglets
// mais des INTENTIONS : « que voulez-vous faire ? ». Chaque carte ouvre un
// parcours guidé. En tête, la suggestion du jour calculée depuis la cave,
// la progression et la saison.
// ─────────────────────────────────────────────────────────────────────────────

// Un mot par intention, pas une phrase : l'icône et le titre suffisent.
const INTENTIONS = [
  { id: 'decouvrir', titre: 'Découvrir',    texte: 'Au geste',                       emoji: '🍷', hero: true },
  { id: 'trouver',   titre: 'Trouver',      texte: '2 questions',                    emoji: '🔍', hero: true },
  { id: 'cave',      titre: 'Ma cave',      texte: 'Mes bouteilles',                 emoji: '🍾' },
  { id: 'vins',      titre: 'Bibliothèque', texte: `${WINE_DB_TERROIR.length} vins`, emoji: '📚' },
  { id: 'explorer',  titre: 'Régions',      texte: 'Carte & routes',                 emoji: '🗺️' },
  { id: 'apprendre', titre: 'Apprendre',    texte: 'À mon rythme',                   emoji: '🎓' },
]

function CarteIntention({ intention, onClick, index }) {
  const { titre, texte, emoji, hero } = intention
  return (
    <button
      onClick={onClick}
      className={`card p-5 text-left group hover:-translate-y-1 hover:border-gold-500/40 transition-all duration-300 cursor-pointer animate-fade-in-up ${
        hero ? '!bg-wine-900 !border-wine-800' : ''
      }`}
      style={{ animationDelay: `${index * 55}ms`, animationFillMode: 'both' }}
    >
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
        hero ? 'bg-white/10' : 'bg-wine-50'
      }`}>
        <span className="text-2xl leading-none" role="img" aria-hidden="true">{emoji}</span>
      </div>
      <div className={`font-serif text-lg font-bold mt-3.5 ${hero ? 'text-cream' : 'text-anthracite-900'}`}>
        {titre}
      </div>
      <p className={`text-[11px] mt-0.5 ${hero ? 'text-cream/60' : 'text-anthracite-400'}`}>
        {texte}
      </p>
    </button>
  )
}

export default function HubGuide({ wines, onParcours, onScan, onAssistant, onRecherche, prenom }) {
  const [suggestion, setSuggestion] = useState(null)

  useEffect(() => {
    setSuggestion(computeSuggestionDuJour(wines))
  }, [wines])

  const heure = new Date().getHours()
  const salut = heure < 6 ? 'Bonsoir' : heure < 18 ? 'Bonjour' : 'Bonsoir'

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* En-tête — une ligne, pas un discours */}
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-anthracite-900 leading-tight mb-5">
        {salut}{prenom ? ` ${prenom}` : ''}.
      </h1>

      {/* Recherche rapide — faux champ qui ouvre l'overlay : appellation ou
          cépage → millésimes à privilégier, sans naviguer. Pensé rayon. */}
      <button
        onClick={onRecherche}
        className="w-full flex items-center gap-3 px-4 py-3 mb-6 rounded-full bg-white border border-anthracite-200 hover:border-gold-500/50 active:scale-[0.99] transition-all cursor-pointer text-left"
        aria-label="Recherche rapide — appellation, cépage, millésimes"
      >
        <span className="text-base leading-none flex-shrink-0" role="img" aria-hidden="true">🔍</span>
        <span className="text-[13px] text-anthracite-400 truncate">Chercher un vin, un cépage…</span>
      </button>

      {/* Suggestion du jour */}
      {suggestion && (
        <button
          onClick={() => onParcours(suggestion.action, suggestion.actionSearch)}
          className="w-full card !bg-gradient-to-br !from-[#fdf9f0] !to-[#f7ecd9] !border-gold-500/30 p-5 lg:p-6 mb-7 text-left group hover:-translate-y-0.5 hover:!border-gold-500/60 transition-all duration-300 cursor-pointer animate-fade-in"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gold-500/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xl leading-none" role="img" aria-hidden="true">💡</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold-700">{suggestion.eyebrow}</div>
              <div className="font-serif text-base lg:text-lg font-bold text-anthracite-900 mt-1">{suggestion.titre}</div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-wine-800 mt-2.5 group-hover:gap-2.5 transition-all">
                {suggestion.actionLabel} <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Cartes d'intentions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {INTENTIONS.map((it, i) => (
          <CarteIntention key={it.id} intention={it} index={i} onClick={() => onParcours(it.id)} />
        ))}

        {/* Actions rapides — scanner et assistant */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 col-span-2">
          <button
            onClick={onScan}
            className="card p-5 text-left group hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-2xl bg-gold-500/12 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.13)' }}>
              <span className="text-xl leading-none" role="img" aria-hidden="true">📷</span>
            </div>
            <div>
              <div className="text-sm font-bold text-anthracite-900">Scanner</div>
              <div className="text-[11px] text-anthracite-400 mt-0.5">Une photo suffit</div>
            </div>
          </button>
          <button
            onClick={onAssistant}
            className="card p-5 text-left group hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xl leading-none" role="img" aria-hidden="true">💬</span>
            </div>
            <div>
              <div className="text-sm font-bold text-anthracite-900">Demander</div>
              <div className="text-[11px] text-anthracite-400 mt-0.5">Œno répond</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
