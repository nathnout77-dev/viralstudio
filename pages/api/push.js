// ═══════════════════════════════════════════════════════════════════════════
// /api/push — envoie la notification « un ami vous a écrit », application
// fermée comprise.
//
// Appelée par le client de l'EXPÉDITEUR juste après l'envoi d'un message.
// Ce choix évite d'avoir à surveiller la base en permanence côté serveur :
// il n'y a ni tâche planifiée, ni connexion ouverte, donc rien à héberger
// au-delà de cette fonction, appelée une fois par message.
//
// Sécurité — deux barrières, dont aucune ne dépend du client :
//   1. l'appelant doit présenter un jeton de session Supabase valide ;
//   2. la liste des adresses d'envoi vient d'une fonction SQL qui ne répond
//      que pour un ami confirmé (abonnements_push_ami, SECURITY DEFINER).
// Un appel forgé avec un identifiant au hasard ne reçoit donc rien à envoyer.
//
// La clé privée VAPID ne quitte jamais le serveur. Sans elle, la route
// répond « non configuré » et l'app continue sans push.
// ═══════════════════════════════════════════════════════════════════════════
import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'

const APERCU_MAX = 120

const URL_SUPABASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const CLE_ANON     = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()
const VAPID_PUB    = (process.env.VAPID_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '').trim()
const VAPID_PRIV   = (process.env.VAPID_PRIVATE_KEY || '').trim()
const VAPID_SUJET  = (process.env.VAPID_SUBJECT || 'mailto:contact@oeno.app').trim()

const configure = Boolean(VAPID_PUB && VAPID_PRIV && URL_SUPABASE && CLE_ANON)
if (configure) {
  try { webpush.setVapidDetails(VAPID_SUJET, VAPID_PUB, VAPID_PRIV) } catch { /* clés mal formées */ }
}

// Ce que verra le destinataire. Le corps vient de l'expéditeur — qui a de
// toute façon le droit de lui écrire ce qu'il veut — mais on le borne et on
// le nettoie des caractères de contrôle avant de le rendre à un tiers.
function apercu(contenu, vin) {
  if (vin && (vin.appellation || vin.name)) return `🍷 ${String(vin.appellation || vin.name).slice(0, 80)}`
  const texte = String(contenu || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim()
  if (!texte) return 'Vous a envoyé un message'
  return texte.length > APERCU_MAX ? `${texte.slice(0, APERCU_MAX - 1)}…` : texte
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ erreur: 'méthode non autorisée' })
  }
  if (!configure) return res.status(200).json({ envoyees: 0, raison: 'push non configuré' })

  const jeton = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim()
  if (!jeton) return res.status(401).json({ erreur: 'session requise' })

  const { destinataire, contenu, vin } = req.body || {}
  if (!destinataire || typeof destinataire !== 'string') {
    return res.status(400).json({ erreur: 'destinataire manquant' })
  }

  // Client agissant AU NOM de l'appelant : ses droits sont exactement les
  // siens. Aucune clé de service n'entre en jeu, donc aucun moyen d'élever
  // ses privilèges même si cette route était détournée.
  const supabase = createClient(URL_SUPABASE, CLE_ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${jeton}` } },
  })

  // Supabase injoignable lève au lieu de renvoyer une erreur : sans ce filet,
  // une panne réseau ferait répondre 500 à une route dont l'échec doit rester
  // sans conséquence pour l'expéditeur.
  let expediteur = null
  try {
    const { data: auth } = await supabase.auth.getUser(jeton)
    expediteur = auth?.user?.id || null
  } catch { expediteur = null }
  if (!expediteur) return res.status(401).json({ erreur: 'session invalide' })
  if (expediteur === destinataire) return res.status(200).json({ envoyees: 0 })

  // Le pseudo affiché vient de la base, jamais du corps de la requête :
  // personne ne peut se faire passer pour quelqu'un d'autre dans l'alerte.
  const { data: profil } = await supabase
    .from('profiles').select('pseudo').eq('id', expediteur).maybeSingle()

  let cibles = null
  try {
    const { data, error } = await supabase.rpc('abonnements_push_ami', { destinataire })
    if (error) throw error
    cibles = data
  } catch {
    // Migration 005 non appliquée, ou fonction absente : ce n'est pas une
    // erreur de l'utilisateur, l'app marche sans.
    return res.status(200).json({ envoyees: 0, raison: 'abonnements indisponibles' })
  }
  const liste = Array.isArray(cibles) ? cibles : []
  if (liste.length === 0) return res.status(200).json({ envoyees: 0 })

  const charge = JSON.stringify({
    titre: `🍷 ${profil?.pseudo || 'Un ami'}`,
    corps: apercu(contenu, vin),
    amiId: expediteur,
  })

  let envoyees = 0
  const perimes = []

  await Promise.all(liste.map(async cible => {
    try {
      await webpush.sendNotification(
        { endpoint: cible.endpoint, keys: { p256dh: cible.p256dh, auth: cible.auth } },
        charge,
        { TTL: 24 * 3600, urgency: 'high' },
      )
      envoyees++
    } catch (e) {
      // 404/410 : l'appareil s'est désabonné ou l'app a été désinstallée.
      // On oublie l'adresse, sinon on réessaierait à chaque message.
      if (e?.statusCode === 404 || e?.statusCode === 410) perimes.push(cible.endpoint)
    }
  }))

  await Promise.all(perimes.map(endpoint =>
    supabase.rpc('oublier_abonnement_push', { endpoint_mort: endpoint }).then(() => {}, () => {}),
  ))

  return res.status(200).json({ envoyees })
}
