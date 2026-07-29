// ═══════════════════════════════════════════════════════════════════════════
// Web Push — être prévenu même application fermée.
//
// Complément, jamais remplacement : la veille en direct (VeilleMessages)
// continue de faire son travail quand l'app tourne. Le push prend le relais
// quand elle ne tourne plus, c'est-à-dire exactement là où elle ne peut rien.
//
// Le déclenchement vient du client de l'expéditeur, juste après l'envoi
// réussi du message : ni tâche planifiée, ni écoute permanente côté serveur.
// L'autorisation d'écrire à quelqu'un est vérifiée en base (fonction
// abonnements_push_ami), pas ici — un appel forgé n'obtiendrait rien.
//
// Tout est facultatif : sans les clés VAPID, ces fonctions ne font rien et
// l'app se comporte comme avant.
// ═══════════════════════════════════════════════════════════════════════════
import { supabase } from './supabase'

const CLE_PUBLIQUE = (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '').trim()

/** Le push est-il configuré sur cette installation ? */
export const pushConfigure = Boolean(CLE_PUBLIQUE)

// La clé VAPID voyage en base64url ; l'API du navigateur veut des octets.
function base64UrlVersOctets(base64url) {
  const bourrage = '='.repeat((4 - (base64url.length % 4)) % 4)
  const base64 = (base64url + bourrage).replace(/-/g, '+').replace(/_/g, '/')
  const brut = atob(base64)
  const octets = new Uint8Array(brut.length)
  for (let i = 0; i < brut.length; i++) octets[i] = brut.charCodeAt(i)
  return octets
}

function clesDe(abonnement) {
  const json = abonnement.toJSON?.() || {}
  return {
    endpoint: abonnement.endpoint,
    p256dh: json.keys?.p256dh || '',
    auth: json.keys?.auth || '',
  }
}

/**
 * Inscrit cet appareil aux notifications push et enregistre son adresse.
 * Sans effet — et sans erreur — si le push n'est pas configuré, si
 * l'autorisation manque, ou si aucun compte n'est connecté.
 */
export async function activerPush() {
  if (!pushConfigure || !supabase) return false
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false
  try {
    if (Notification.permission !== 'granted') return false

    const { data } = await supabase.auth.getUser()
    const moi = data?.user?.id
    if (!moi) return false

    const reg = await navigator.serviceWorker.ready
    if (!reg?.pushManager) return false

    let abonnement = await reg.pushManager.getSubscription()
    if (!abonnement) {
      abonnement = await reg.pushManager.subscribe({
        userVisibleOnly: true,   // exigé par les navigateurs : tout push doit se voir
        applicationServerKey: base64UrlVersOctets(CLE_PUBLIQUE),
      })
    }

    const { endpoint, p256dh, auth } = clesDe(abonnement)
    if (!endpoint || !p256dh || !auth) return false

    // Sur `endpoint` : le même appareil réabonné met à jour sa ligne au lieu
    // d'en créer une seconde, qui recevrait un doublon à chaque message.
    const { error } = await supabase.from('abonnements_push')
      .upsert({ user_id: moi, endpoint, p256dh, auth }, { onConflict: 'endpoint' })
    return !error
  } catch {
    // Table absente (migration 005 non appliquée), service d'envoi injoignable,
    // navigateur sans push : rien de tout cela ne doit remonter à l'écran.
    return false
  }
}

/** Cet appareil est-il déjà inscrit ? Sert à l'affichage du réglage. */
export async function pushActif() {
  if (!pushConfigure || typeof window === 'undefined') return false
  if (!('serviceWorker' in navigator)) return false
  try {
    const reg = await navigator.serviceWorker.ready
    return Boolean(await reg?.pushManager?.getSubscription())
  } catch { return false }
}

/** Retire cet appareil des notifications push. */
export async function desactiverPush() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    const abonnement = await reg?.pushManager?.getSubscription()
    if (!abonnement) return
    const { endpoint } = clesDe(abonnement)
    await abonnement.unsubscribe().catch(() => {})
    if (supabase && endpoint) {
      await supabase.from('abonnements_push').delete().eq('endpoint', endpoint)
    }
  } catch { /* rien à faire de plus */ }
}

/**
 * Prévient un ami qu'un message l'attend. Best-effort et sans attente : si
 * ça échoue, le message est déjà en base et la veille de l'ami l'affichera
 * dès qu'il rouvrira l'app.
 */
export async function previenirParPush(amiId, contenu, vin = null) {
  if (!pushConfigure || !supabase || !amiId) return
  try {
    const { data } = await supabase.auth.getSession()
    const jeton = data?.session?.access_token
    if (!jeton) return
    await fetch('/api/push', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${jeton}` },
      body: JSON.stringify({ destinataire: amiId, contenu, vin }),
      keepalive: true,   // l'envoi survit si l'utilisateur ferme l'onglet dans la foulée
    })
  } catch { /* l'essentiel — le message — est déjà parti */ }
}
