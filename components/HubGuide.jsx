import { useState, useEffect } from 'react'
import {
  Wine, Search, Library, Map, GraduationCap, ScanLine,
  ArrowRight, Sparkles, X, Lightbulb,
} from 'lucide-react'
import { computeSuggestionDuJour } from '../lib/suggestionDuJour'

// ─────────────────────────────────────────────────────────────────────────────
// HubGuide — le nouvel écran d'accueil. L'app ne présente plus des onglets
// mais des INTENTIONS : « que voulez-vous faire ? ». Chaque carte ouvre un
// parcours guidé. En tête, la suggestion du jour calculée depuis la cave,
// la progression et la saison.
// ─────────────────────────────────────────────────────────────────────────────

const INTENTIONS = [
  {
    id: 'trouver',
    titre: 'Je cherche un vin',
    texte: 'Pour ce soir, un repas, un budget… 2 questions et on vous guide.',
    Icon: Search,
    hero: true,
  },
  {
    id: 'cave',
    titre: 'Ma cave',
    texte: 'Vos bouteilles, vos dégustations, vos envies.',
    Icon: Wine,
  },
  {
    id: 'vins',
    titre: 'La bibliothèque',
    texte: '232 vins décodés, comparés, expliqués simplement.',
    Icon: Library,
  },
  {
    id: 'explorer',
    titre: 'Explorer les régions',
    texte: 'Carte des vignobles, routes des vins, domaines à visiter.',
    Icon: Map,
  },
  {
    id: 'apprendre',
    titre: 'Apprendre',
    texte: 'École du vin, arômes, lexique — à votre rythme.',
    Icon: GraduationCap,
  },
]

function CarteIntention({ intention, onClick, index }) {
  const { titre, texte, Icon, hero } = intention
  return (
    <button
      onClick={onClick}
      className={`card p-6 lg:p-7 text-left group hover:-translate-y-1 hover:border-gold-500/40 transition-all duration-300 cursor-pointer animate-fade-in-up ${
        hero ? 'sm:col-span-2 !bg-wine-900 !border-wine-800' : ''
      }`}
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          hero ? 'bg-white/10' : 'bg-wine-50'
        }`}>
          <Icon size={21} className={hero ? 'text-gold-400' : 'text-wine-700'} strokeWidth={1.7} />
        </div>
        <ArrowRight
          size={17}
          className={`mt-1 transition-all duration-300 group-hover:translate-x-1 ${
            hero ? 'text-gold-400' : 'text-anthracite-300 group-hover:text-gold-600'
          }`}
        />
      </div>
      <div className={`font-serif text-lg lg:text-xl font-bold mt-4 ${hero ? 'text-cream' : 'text-anthracite-900'}`}>
        {titre}
      </div>
      <p className={`text-xs lg:text-[13px] mt-1.5 leading-relaxed ${hero ? 'text-cream/70' : 'text-anthracite-500'}`}>
        {texte}
      </p>
    </button>
  )
}

// Bienvenue première visite : 3 repères, se referme d'un geste et ne revient plus.
function TourBienvenue({ onClose }) {
  return (
    <div className="card !border-gold-500/40 p-5 mb-6 animate-fade-in relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600" />
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-anthracite-400 hover:text-anthracite-800 hover:bg-anthracite-50 transition-colors cursor-pointer"
        aria-label="Fermer"
      >
        <X size={15} />
      </button>
      <div className="font-serif text-base font-bold text-anthracite-900 mb-2.5">Bienvenue dans le nouvel Œno</div>
      <ol className="space-y-1.5 text-xs text-anthracite-600 leading-relaxed list-none">
        <li><span className="font-bold text-wine-800">1.</span> Dites ce que vous voulez faire — l'app vous guide pas à pas.</li>
        <li><span className="font-bold text-wine-800">2.</span> Le bouton <span className="font-semibold">← Accueil</span> vous ramène toujours ici.</li>
        <li><span className="font-bold text-wine-800">3.</span> Œno, votre assistant, reste disponible en bas à droite.</li>
      </ol>
    </div>
  )
}

export default function HubGuide({ wines, onParcours, onScan, onAssistant, prenom }) {
  const [suggestion, setSuggestion] = useState(null)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    setSuggestion(computeSuggestionDuJour(wines))
    try {
      if (!localStorage.getItem('oeno-hub-tour')) setShowTour(true)
    } catch { /* stockage indisponible : pas de tour */ }
  }, [wines])

  const closeTour = () => {
    setShowTour(false)
    try { localStorage.setItem('oeno-hub-tour', '1') } catch { /* ignore */ }
  }

  const heure = new Date().getHours()
  const salut = heure < 6 ? 'Bonsoir' : heure < 18 ? 'Bonjour' : 'Bonsoir'

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* En-tête */}
      <div className="mb-7 lg:mb-9">
        <span className="eyebrow mb-2">Œno vous guide</span>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-anthracite-900 leading-tight">
          {salut}{prenom ? ` ${prenom}` : ''} — que fait-on ?
        </h1>
        <p className="text-sm text-anthracite-500 mt-2">
          Choisissez une intention, on s'occupe du chemin.
        </p>
      </div>

      {showTour && <TourBienvenue onClose={closeTour} />}

      {/* Suggestion du jour */}
      {suggestion && (
        <button
          onClick={() => onParcours(suggestion.action, suggestion.actionSearch)}
          className="w-full card !bg-gradient-to-br !from-[#fdf9f0] !to-[#f7ecd9] !border-gold-500/30 p-5 lg:p-6 mb-7 text-left group hover:-translate-y-0.5 hover:!border-gold-500/60 transition-all duration-300 cursor-pointer animate-fade-in"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gold-500/15 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={19} className="text-gold-700" strokeWidth={1.7} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold-700">{suggestion.eyebrow}</div>
              <div className="font-serif text-base lg:text-lg font-bold text-anthracite-900 mt-1">{suggestion.titre}</div>
              <p className="text-xs text-anthracite-600 mt-1 leading-relaxed">{suggestion.texte}</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-wine-800 mt-2.5 group-hover:gap-2.5 transition-all">
                {suggestion.actionLabel} <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Cartes d'intentions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INTENTIONS.map((it, i) => (
          <CarteIntention key={it.id} intention={it} index={i} onClick={() => onParcours(it.id)} />
        ))}

        {/* Actions rapides — scanner et assistant */}
        <div className="grid grid-cols-2 gap-4 sm:col-span-2">
          <button
            onClick={onScan}
            className="card p-5 text-left group hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-2xl bg-gold-500/12 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.13)' }}>
              <ScanLine size={17} className="text-gold-700" strokeWidth={1.7} />
            </div>
            <div>
              <div className="text-sm font-bold text-anthracite-900">Scanner une étiquette</div>
              <div className="text-[11px] text-anthracite-400 mt-0.5">Une photo, tout est décodé</div>
            </div>
          </button>
          <button
            onClick={onAssistant}
            className="card p-5 text-left group hover:-translate-y-0.5 hover:border-gold-500/40 transition-all duration-300 cursor-pointer flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0">
              <Sparkles size={17} className="text-wine-700" strokeWidth={1.7} />
            </div>
            <div>
              <div className="text-sm font-bold text-anthracite-900">Parler à Œno</div>
              <div className="text-[11px] text-anthracite-400 mt-0.5">Votre assistant répond à tout</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
