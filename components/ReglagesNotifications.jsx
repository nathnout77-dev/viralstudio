import { useState, useEffect, useCallback } from 'react'
import { Bell, BellOff, BellRing, Check, Loader2, Share } from 'lucide-react'
import {
  etatNotifications, demanderNotifications, installationRequise, essaiNotification,
} from '../lib/notifications'
import { toast } from './Toast'

// ═══════════════════════════════════════════════════════════════════════════
// Réglage des notifications — et surtout, son diagnostic.
//
// Une notification qui ne part pas ne dit rien d'elle-même : ni pourquoi, ni
// quoi faire. Ce bloc rend l'état visible en toutes lettres et donne, dans
// chaque cas, la seule action qui débloque la situation — y compris quand
// c'est le navigateur qui bloque, ou quand il faut d'abord installer l'app.
//
// L'essai est essentiel : sans lui, on ne peut vérifier que ça marche qu'en
// demandant à un ami d'écrire.
// ═══════════════════════════════════════════════════════════════════════════

export default function ReglagesNotifications({ compact = false }) {
  const [etat, setEtat]       = useState(null)   // null = pas encore lu (rendu serveur)
  const [aInstaller, setAInstaller] = useState(false)
  const [occupe, setOccupe]   = useState(false)

  const relire = useCallback(() => {
    setEtat(etatNotifications())
    setAInstaller(installationRequise())
  }, [])

  useEffect(() => {
    relire()
    // Une autorisation peut être changée depuis les réglages du navigateur,
    // sans que la page ne bouge : on se remet d'accord en revenant dessus.
    const auRetour = () => { if (document.visibilityState === 'visible') relire() }
    document.addEventListener('visibilitychange', auRetour)
    return () => document.removeEventListener('visibilitychange', auRetour)
  }, [relire])

  const activer = useCallback(async () => {
    setOccupe(true)
    const r = await demanderNotifications()
    setEtat(r)
    setOccupe(false)
    if (r === 'granted') {
      toast('🔔 Notifications activées')
      essaiNotification()
    } else if (r === 'denied') {
      toast('Notifications refusées')
    }
  }, [])

  const essayer = useCallback(async () => {
    setOccupe(true)
    const parti = await essaiNotification()
    setOccupe(false)
    toast(parti
      ? 'Notification envoyée — regardez vos alertes'
      : '⚠️ Envoi impossible : le navigateur l’a refusée')
  }, [])

  if (etat === null) return null   // rien avant de savoir, pour ne pas mentir

  const cadre = compact
    ? 'mt-4 pt-4 border-t border-anthracite-900/[0.07]'
    : 'card p-4'

  // ── iPhone / iPad : l'API n'existe pas hors app installée ────────────────
  if (aInstaller) {
    return (
      <div className={cadre}>
        <Entete Icone={Bell} titre="Être prévenu des messages" />
        <p className="text-[11px] text-anthracite-400 leading-relaxed mt-1">
          Sur iPhone et iPad, Safari ne sait prévenir que depuis une app installée.
          Touchez <Share size={11} className="inline -mt-0.5 text-anthracite-500" />{' '}
          <span className="font-semibold text-anthracite-600">Partager</span>, puis
          « Sur l'écran d'accueil » : ouvrez Œno depuis cette icône, et l'activation
          apparaîtra ici.
        </p>
      </div>
    )
  }

  // ── Navigateur sans notifications ────────────────────────────────────────
  if (etat === 'indisponible') {
    return (
      <div className={cadre}>
        <Entete Icone={BellOff} titre="Notifications indisponibles" terne />
        <p className="text-[11px] text-anthracite-400 leading-relaxed mt-1">
          Ce navigateur ne sait pas afficher de notifications. Les messages de vos
          amis restent visibles dans l'onglet Amis, avec leur pastille.
        </p>
      </div>
    )
  }

  // ── Bloquées par le navigateur ───────────────────────────────────────────
  if (etat === 'denied') {
    return (
      <div className={cadre}>
        <Entete Icone={BellOff} titre="Notifications bloquées" terne />
        <p className="text-[11px] text-anthracite-400 leading-relaxed mt-1">
          Votre navigateur les refuse pour Œno — une fois refusées, il ne redemande
          plus. Pour les rétablir : touchez le cadenas (ou l'icône à gauche de
          l'adresse), puis autorisez les notifications. Le réglage se met à jour ici
          tout seul en revenant.
        </p>
      </div>
    )
  }

  // ── Actives ──────────────────────────────────────────────────────────────
  if (etat === 'granted') {
    return (
      <div className={cadre}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <Entete Icone={BellRing} titre="Notifications activées" actif />
            <p className="text-[11px] text-anthracite-400 leading-relaxed mt-1">
              Œno vous prévient quand un ami écrit, app ouverte ou en arrière-plan.
            </p>
          </div>
          <button onClick={essayer} disabled={occupe}
                  className="btn-ghost text-[11px] px-3 !py-2 flex-shrink-0 disabled:opacity-50">
            {occupe ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            Essai
          </button>
        </div>
      </div>
    )
  }

  // ── Jamais demandées ─────────────────────────────────────────────────────
  return (
    <div className={cadre}>
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <Entete Icone={Bell} titre="Être prévenu des messages" />
          <p className="text-[11px] text-anthracite-400 leading-relaxed mt-1">
            Œno vous signale les messages de vos amis, même depuis un autre écran.
          </p>
        </div>
        <button onClick={activer} disabled={occupe}
                className="btn-gold text-[11px] px-3.5 !py-2 flex-shrink-0 disabled:opacity-50">
          {occupe ? <Loader2 size={12} className="animate-spin" /> : 'Activer'}
        </button>
      </div>
    </div>
  )
}

function Entete({ Icone, titre, actif = false, terne = false }) {
  return (
    <div className="flex items-center gap-2">
      <Icone size={14} className={actif ? 'text-emerald-600' : terne ? 'text-anthracite-300' : 'text-gold-600'} />
      <span className="text-sm font-bold text-anthracite-900">{titre}</span>
    </div>
  )
}
