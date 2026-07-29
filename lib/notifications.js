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
    vibrate: [90, 45, 90],
    data: donnees || {},
  }
  const reg = await workerPret()
  if (reg?.showNotification) {
    try { await reg.showNotification(titre, options); return true } catch { /* on retente autrement */ }
  }
  try { new Notification(titre, options); return true } catch { return false }
}

/** Pastille chiffrée sur l'icône de l'app installée (PWA). Silencieux ailleurs. */
export function pastilleApp(nombre) {
  if (typeof navigator === 'undefined') return
  try {
    if (nombre > 0) navigator.setAppBadge?.(nombre)
    else navigator.clearAppBadge?.()
  } catch { /* API non supportée : sans conséquence */ }
}
