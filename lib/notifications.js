// ═══════════════════════════════════════════════════════════════════════════
// Notifications système — « un ami vous a écrit ».
//
// Rien n'est demandé au démarrage : l'autorisation ne se réclame qu'au moment
// où elle a un sens, depuis l'onglet Amis, une fois qu'on a au moins un ami.
// Un refus n'a aucune conséquence sur le reste de l'app.
//
// Portée honnête : ces notifications partent de l'appareil, pas d'un serveur.
// Œno prévient donc dès que l'app tourne — au premier plan, en arrière-plan
// ou onglet masqué — mais pas application entièrement fermée (il faudrait
// alors du Web Push, avec ses clés VAPID et son service d'envoi).
// ═══════════════════════════════════════════════════════════════════════════
import { lireReglages } from './reglages'

export function notificationsSupportees() {
  return typeof window !== 'undefined' && 'Notification' in window
}

/** 'granted' | 'denied' | 'default' | 'indisponible' */
export function etatNotifications() {
  if (!notificationsSupportees()) return 'indisponible'
  try { return Notification.permission } catch { return 'indisponible' }
}

export async function demanderNotifications() {
  if (!notificationsSupportees()) return 'indisponible'
  try { return await Notification.requestPermission() } catch { return 'denied' }
}

/**
 * Vrai sur iPhone/iPad tant qu'Œno n'est pas installé à l'écran d'accueil.
 *
 * Safari mobile n'expose tout simplement pas l'API de notification dans un
 * onglet ordinaire : sans ce test, l'app ne pourrait que dire « indisponible »
 * là où il y a en réalité une marche à suivre.
 */
export function installationRequise() {
  if (typeof window === 'undefined' || notificationsSupportees()) return false
  const ua = navigator.userAgent || ''
  const pomme = /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS se fait passer pour un Mac, mais il a un écran tactile.
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (!pomme) return false
  const installee = window.matchMedia?.('(display-mode: standalone)')?.matches || navigator.standalone
  return !installee
}

// Le service worker est le seul chemin autorisé sur Android et en PWA
// installée ; `new Notification()` y lève une erreur. On le privilégie donc,
// avec un délai de garde : `serviceWorker.ready` ne rejette jamais, il
// attendrait indéfiniment si aucun worker ne prenait la main.
async function workerPret() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return null
  try {
    return await Promise.race([
      navigator.serviceWorker.ready,
      new Promise(resolve => setTimeout(() => resolve(null), 1500)),
    ])
  } catch { return null }
}

/**
 * Affiche une notification. `tag` regroupe les messages d'un même ami :
 * dix messages d'affilée remplacent la même pastille au lieu d'en empiler dix.
 */
export async function notifier({ titre, corps, tag, donnees }) {
  if (etatNotifications() !== 'granted') return false
  const options = {
    body: corps,
    tag,
    renotify: true,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    // Réglable : certains veulent être prévenus sans que le téléphone bouge.
    vibrate: lireReglages().vibration ? [90, 45, 90] : undefined,
    data: donnees || {},
  }
  const reg = await workerPret()
  if (reg?.showNotification) {
    try { await reg.showNotification(titre, options); return true } catch { /* on retente autrement */ }
  }
  try { new Notification(titre, options); return true } catch { return false }
}

/**
 * Notification d'essai — le seul moyen pour l'utilisateur de vérifier de ses
 * propres yeux que ça marche, sans avoir à mobiliser un ami.
 */
export function essaiNotification() {
  return notifier({
    titre: '🍷 Œno',
    corps: 'Voilà à quoi ressemblera le message d’un ami.',
    tag: 'oeno-essai',
  })
}

/** Pastille chiffrée sur l'icône de l'app installée (PWA). Silencieux ailleurs. */
export function pastilleApp(nombre) {
  if (typeof navigator === 'undefined') return
  try {
    if (nombre > 0) navigator.setAppBadge?.(nombre)
    else navigator.clearAppBadge?.()
  } catch { /* API non supportée : sans conséquence */ }
}
