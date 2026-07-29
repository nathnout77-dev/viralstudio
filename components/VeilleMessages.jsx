import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ecouterSession, mesAmis, messagesNonLus, ecouterMessages, monPseudo,
} from '../lib/social'
import { notifier, pastilleApp } from '../lib/notifications'
import { lireAvatar, ecrireAvatar, ecrirePseudo, recupererAvatarCloud } from '../lib/avatar'
import { activerPush, pushConfigure } from '../lib/push'
import { lireReglages } from '../lib/reglages'
import { glouglou } from '../lib/son'

// ═══════════════════════════════════════════════════════════════════════════
// Veille des messages d'amis — le seul endroit de l'app qui surveille la
// boîte de réception en permanence, quel que soit l'écran affiché.
//
// Deux chemins volontairement redondants, comme dans une discussion ouverte :
// le direct (Realtime) pour l'instantanéité, un sondage régulier pour la
// garantie. Un message donné n'est notifié qu'une fois.
//
// Ce composant ne rend rien : il ne fait que notifier et tenir à jour la
// pastille de l'icône de l'app.
// ═══════════════════════════════════════════════════════════════════════════

const SONDAGE_MS = 15000
const APERCU_MAX = 100

function apercu(message) {
  const texte = (message?.contenu || '').trim()
  if (message?.vin) {
    const nom = message.vin.appellation || message.vin.name
    if (nom) return `🍷 ${nom}`
  }
  if (!texte) return 'Vous a envoyé un message'
  return texte.length > APERCU_MAX ? `${texte.slice(0, APERCU_MAX - 1)}…` : texte
}

export default function VeilleMessages({ amiOuvert }) {
  const [moi, setMoi] = useState(null)

  const pseudos  = useRef(new Map())  // ami_id → pseudo, pour nommer l'expéditeur
  const notifies = useRef(new Set())  // messages déjà signalés durant cette session
  const amorce   = useRef(false)      // le premier relevé sert de référence, il ne notifie pas
  const ouvert   = useRef(amiOuvert)
  const idPrecedent = useRef(undefined)

  // La discussion affichée à l'instant T : inutile de notifier ce que
  // l'utilisateur est déjà en train de lire.
  useEffect(() => { ouvert.current = amiOuvert }, [amiOuvert])

  useEffect(() => ecouterSession(setMoi), [])

  // Un changement de compte remet la veille à zéro : ni notification héritée
  // du compte précédent, ni pastille fantôme, ni initiale de quelqu'un d'autre.
  useEffect(() => {
    const id = moi?.id || null
    if (idPrecedent.current !== undefined && idPrecedent.current !== id) ecrirePseudo(null)
    idPrecedent.current = id
    notifies.current = new Set()
    amorce.current = false
    pseudos.current = new Map()
    if (!id) pastilleApp(0)
  }, [moi?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Identité recopiée en local : c'est elle qui permet à la barre du haut
  // d'afficher la bonne initiale — et la photo déposée depuis un autre
  // appareil — sans charger le moindre client réseau au démarrage.
  useEffect(() => {
    if (!moi) return
    let vivant = true
    ;(async () => {
      const p = await monPseudo(moi.id)
      if (vivant && p) ecrirePseudo(p)
      if (!lireAvatar()) {
        const distant = await recupererAvatarCloud()
        if (vivant && distant) ecrireAvatar(distant, { cloud: false })
      }
    })()
    return () => { vivant = false }
  }, [moi?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Inscription au push, à chaque ouverture de l'app : l'adresse d'envoi
  // attribuée par le navigateur peut changer, et c'est en base qu'elle doit
  // être à jour — sinon l'ami écrit dans le vide. Sans effet si le push n'est
  // pas configuré ou si l'autorisation manque.
  useEffect(() => {
    if (!moi || !pushConfigure) return
    activerPush()
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
    const surMessage = e => { if (e.data?.type === 'oeno-push-a-renouveler') activerPush() }
    navigator.serviceWorker.addEventListener('message', surMessage)
    return () => navigator.serviceWorker.removeEventListener('message', surMessage)
  }, [moi?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Annuaire des pseudos — rafraîchi de loin en loin, une amitié se noue rarement.
  useEffect(() => {
    if (!moi) return
    let vivant = true
    const charger = async () => {
      const r = await mesAmis()
      if (!vivant) return
      const carte = new Map()
      for (const a of [...r.amis, ...r.demandes, ...r.envoyees]) carte.set(a.ami_id, a.pseudo)
      pseudos.current = carte
    }
    charger()
    const id = setInterval(charger, 60000)
    return () => { vivant = false; clearInterval(id) }
  }, [moi?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const signaler = useCallback(async message => {
    if (!message?.id || notifies.current.has(message.id)) return
    notifies.current.add(message.id)
    // Premier relevé après ouverture de l'app : on prend acte des messages
    // déjà en attente sans en notifier un seul — ils sont visibles à l'écran.
    if (!amorce.current) return
    // Déjà sous les yeux de l'utilisateur : la conversation est ouverte et
    // l'app est au premier plan.
    const lisible = typeof document !== 'undefined' && document.visibilityState === 'visible'
    if (lisible && ouvert.current && message.expediteur_id === ouvert.current) return

    // Le glouglou d'Œno, en plus de la notification système : c'est lui qu'on
    // reconnaît sans regarder l'écran. Il ne peut sonner que l'app ouverte.
    if (lireReglages().son) glouglou()

    const pseudo = pseudos.current.get(message.expediteur_id) || 'Un ami'
    await notifier({
      titre: `🍷 ${pseudo}`,
      corps: apercu(message),
      tag: `oeno-ami-${message.expediteur_id}`,
      donnees: { amiId: message.expediteur_id },
    })
  }, [])

  // Relevé complet : notifie les nouveautés et remet la pastille d'accord
  // avec la réalité (un message lu ailleurs la fait redescendre).
  const relever = useCallback(async () => {
    if (!moi) return
    const enAttente = await messagesNonLus(moi.id)
    for (const m of enAttente) await signaler(m)
    amorce.current = true
    pastilleApp(enAttente.length)
  }, [moi?.id, signaler]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!moi) return
    let vivant = true
    const tour = () => { if (vivant) relever() }
    tour()
    const id = setInterval(tour, SONDAGE_MS)
    // Revenir sur l'app doit rafraîchir immédiatement : l'utilisateur va
    // regarder l'écran, pas attendre le prochain tour.
    const auRetour = () => { if (document.visibilityState === 'visible') tour() }
    document.addEventListener('visibilitychange', auRetour)
    return () => { vivant = false; clearInterval(id); document.removeEventListener('visibilitychange', auRetour) }
  }, [moi?.id, relever]) // eslint-disable-line react-hooks/exhaustive-deps

  // Direct : la même notification, sans attendre le tour de sondage.
  useEffect(() => {
    if (!moi) return
    return ecouterMessages(msg => {
      if (msg?.destinataire_id !== moi.id) return
      signaler(msg)
      relever()
    })
  }, [moi?.id, signaler, relever]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
