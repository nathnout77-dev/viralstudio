import { useState, useEffect, useCallback } from 'react'
import { X, Sun, Moon, Monitor, Volume2, Bell, Smartphone, Type, Home } from 'lucide-react'
import { lireReglages, ecrireReglage, REGLAGES_EVENT } from '../lib/reglages'
import { glouglou } from '../lib/son'
import ReglagesNotifications from './ReglagesNotifications'
import useModalBehavior from '../lib/useModal'

// ═══════════════════════════════════════════════════════════════════════════
// Réglages — ce qui appartient à l'appareil.
//
// Chaque réglage s'applique à l'instant où on le touche, sans bouton
// « enregistrer » : on voit le thème basculer et on entend le son. Un réglage
// qu'on doit valider pour juger du résultat n'est pas un réglage, c'est un
// formulaire.
// ═══════════════════════════════════════════════════════════════════════════

const THEMES = [
  { id: 'clair',   label: 'Clair',   Icone: Sun },
  { id: 'sombre',  label: 'Sombre',  Icone: Moon },
  { id: 'systeme', label: 'Système', Icone: Monitor },
]

const TAILLES = [
  { id: 'compact', label: 'Compact', apercu: 'text-[11px]' },
  { id: 'normal',  label: 'Normal',  apercu: 'text-[13px]' },
  { id: 'confort', label: 'Confort', apercu: 'text-[15px]' },
]

const ECRANS = [
  { id: 'cave',      label: 'Ma cave',   detail: 'Vos bouteilles' },
  { id: 'hub',       label: 'Accueil',   detail: 'Le hub' },
  { id: 'decouvrir', label: 'Découvrir', detail: 'Au geste' },
]

function Bloc({ Icone, titre, detail, children }) {
  return (
    <section className="py-5 border-b border-anthracite-900/[0.07] last:border-0">
      <div className="flex items-center gap-2 mb-1">
        <Icone size={14} className="text-gold-600" />
        <h3 className="text-sm font-bold text-anthracite-900">{titre}</h3>
      </div>
      {detail && <p className="text-[11px] text-anthracite-400 leading-relaxed mb-3">{detail}</p>}
      {children}
    </section>
  )
}

/** Rangée de choix exclusifs — même mécanique partout, donc rien à réapprendre. */
function Choix({ options, valeur, onChoisir, rendu }) {
  return (
    <div className="flex gap-2">
      {options.map(o => {
        const actif = o.id === valeur
        return (
          <button
            key={o.id}
            onClick={() => onChoisir(o.id)}
            aria-pressed={actif}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border transition-all duration-300 cursor-pointer ${
              actif
                ? 'border-gold-500 bg-gold-500/10 text-anthracite-900'
                : 'border-anthracite-900/12 text-anthracite-500 hover:border-anthracite-900/30'
            }`}
          >
            {rendu(o, actif)}
          </button>
        )
      })}
    </div>
  )
}

function Bascule({ actif, onChange, libelle }) {
  return (
    <button
      onClick={() => onChange(!actif)}
      role="switch"
      aria-checked={actif}
      aria-label={libelle}
      className={`relative w-12 h-7 rounded-full flex-shrink-0 transition-colors duration-300 cursor-pointer ${
        actif ? 'bg-wine-800' : 'bg-anthracite-300'
      }`}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-cream shadow transition-transform duration-300 ${
          actif ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function Reglages({ onClose }) {
  useModalBehavior(onClose)
  const [r, setR] = useState(null)

  useEffect(() => {
    const relire = () => setR(lireReglages())
    relire()
    window.addEventListener(REGLAGES_EVENT, relire)
    return () => window.removeEventListener(REGLAGES_EVENT, relire)
  }, [])

  const changer = useCallback((cle, valeur) => {
    setR(ecrireReglage(cle, valeur))
  }, [])

  // Le son se juge à l'oreille : on le fait entendre au moment du choix.
  const changerSon = useCallback(valeur => {
    changer('son', valeur)
    if (valeur) glouglou()
  }, [changer])

  if (!r) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Réglages" className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center scrim animate-fade-in" onClick={onClose}>
      <div className="modal-panel max-w-md sm:mx-4 max-h-[90dvh]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-anthracite-900/[0.07]">
          <div>
            <span className="eyebrow">Sur cet appareil</span>
            <h2 className="font-serif text-lg font-bold text-anthracite-900 leading-tight">Réglages</h2>
          </div>
          <button onClick={onClose} aria-label="Fermer"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-anthracite-400 hover:text-anthracite-800 hover:bg-anthracite-900/5 transition-all cursor-pointer">
            <X size={17} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto">
          {/* ── Apparence ─────────────────────────────────────────────────── */}
          <Bloc Icone={Moon} titre="Apparence"
                detail="« Système » suit le réglage de votre téléphone : sombre le soir s'il l'est.">
            <Choix
              options={THEMES} valeur={r.theme} onChoisir={v => changer('theme', v)}
              rendu={(o, actif) => (
                <>
                  <o.Icone size={17} className={actif ? 'text-gold-600' : ''} />
                  <span className="text-[11px] font-semibold">{o.label}</span>
                </>
              )}
            />
          </Bloc>

          {/* ── Taille ────────────────────────────────────────────────────── */}
          <Bloc Icone={Type} titre="Taille de l'affichage"
                detail="Agrandit tout le contenu, textes comme boutons — utile au restaurant ou à bout de bras en rayon.">
            <Choix
              options={TAILLES} valeur={r.taille} onChoisir={v => changer('taille', v)}
              rendu={o => (
                <>
                  <span className={`font-serif font-bold ${o.apercu}`}>Aa</span>
                  <span className="text-[11px] font-semibold">{o.label}</span>
                </>
              )}
            />
          </Bloc>

          {/* ── Écran d'ouverture ─────────────────────────────────────────── */}
          <Bloc Icone={Home} titre="À l'ouverture"
                detail="L'écran sur lequel Œno démarre.">
            <Choix
              options={ECRANS} valeur={r.ecranDepart} onChoisir={v => changer('ecranDepart', v)}
              rendu={o => (
                <>
                  <span className="text-[12px] font-bold">{o.label}</span>
                  <span className="text-[10px] opacity-70">{o.detail}</span>
                </>
              )}
            />
          </Bloc>

          {/* ── Son & vibration ───────────────────────────────────────────── */}
          <Bloc Icone={Volume2} titre="Son et vibration"
                detail="Le glouglou d'Œno à l'arrivée d'un message d'ami. Il ne peut se faire entendre que si l'app est ouverte : application fermée, c'est la sonnerie de votre téléphone qui prend le relais.">
            <div className="flex items-center gap-3 py-1">
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-anthracite-900">Glouglou d'Œno</div>
                <button
                  onClick={() => glouglou()}
                  className="text-[11px] text-gold-700 font-semibold hover:underline cursor-pointer mt-0.5"
                >
                  L'écouter
                </button>
              </div>
              <Bascule actif={r.son} onChange={changerSon} libelle="Son des messages" />
            </div>
            <div className="flex items-center gap-3 py-1 mt-2">
              <div className="min-w-0 flex-1 flex items-center gap-2">
                <Smartphone size={13} className="text-anthracite-400" />
                <span className="text-[13px] font-semibold text-anthracite-900">Vibration</span>
              </div>
              <Bascule
                actif={r.vibration}
                onChange={v => { changer('vibration', v); if (v) navigator.vibrate?.([90, 45, 90]) }}
                libelle="Vibration des messages"
              />
            </div>
          </Bloc>

          {/* ── Notifications ─────────────────────────────────────────────── */}
          <Bloc Icone={Bell} titre="Notifications">
            <ReglagesNotifications />
          </Bloc>
        </div>
      </div>
    </div>
  )
}
