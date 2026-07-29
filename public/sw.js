// Service worker Œno — écrit à la main, aucune dépendance.
// Mode hors-ligne complet : le manifeste généré à la build
// (/sw-precache.js, voir scripts/generate-sw-precache.js) liste tous les
// chunks JS/CSS, y compris ceux des imports dynamiques — l'app entière
// (bibliothèque, cave, quiz, recherche) fonctionne donc sans réseau.
// Seules les fonctions IA (scan, assistant) exigent une connexion.
let BUILD = 'dev'
let PRECACHE_ASSETS = []
try {
  importScripts('/sw-precache.js')
  BUILD = (self.__OENO_PRECACHE && self.__OENO_PRECACHE.build) || 'dev'
  PRECACHE_ASSETS = (self.__OENO_PRECACHE && self.__OENO_PRECACHE.assets) || []
} catch (e) { /* dev local sans build : app-shell seul */ }

const CACHE_NAME = `oeno-${BUILD}`
const APP_SHELL = ['/', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL).catch(() => {})
      // Ajouts individuels tolérants : un asset manquant ne doit pas
      // faire échouer toute l'installation.
      await Promise.all(PRECACHE_ASSETS.map((a) => cache.add(a).catch(() => {})))
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Message poussé par le serveur — le seul chemin qui fonctionne application
// fermée, puisque plus aucune page n'est là pour surveiller quoi que ce soit.
//
// Les navigateurs imposent qu'un push se voie toujours : on affiche donc à
// tous les coups. Quand une fenêtre Œno est déjà ouverte et visible, la
// veille en direct a probablement déjà prévenu — même `tag`, la pastille est
// alors remplacée au lieu d'être doublée, et sans réalerter.
self.addEventListener('push', (event) => {
  let charge = {}
  try { charge = event.data ? event.data.json() : {} } catch (e) { /* charge illisible */ }
  const amiId = charge.amiId || ''

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((fenetres) => {
      const sousLesYeux = fenetres.some((f) => f.visibilityState === 'visible')
      return self.registration.showNotification(charge.titre || '🍷 Œno', {
        body: charge.corps || 'Un ami vous a écrit.',
        tag: amiId ? `oeno-ami-${amiId}` : 'oeno-message',
        renotify: !sousLesYeux,
        silent: sousLesYeux,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: sousLesYeux ? undefined : [90, 45, 90],
        data: { amiId },
      })
    })
  )
})

// Les adresses d'envoi tournent de temps en temps (le navigateur en décide) :
// on prévient les fenêtres ouvertes pour qu'elles réenregistrent la nouvelle.
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((fenetres) => {
      fenetres.forEach((f) => f.postMessage({ type: 'oeno-push-a-renouveler' }))
    })
  )
})

// Clic sur la notification « un ami vous a écrit » : on ramène l'onglet Œno
// existant au premier plan plutôt que d'en ouvrir un second, et on lui indique
// quelle conversation ouvrir. Sans onglet vivant, on démarre l'app sur la
// bonne discussion via l'URL.
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const amiId = (event.notification.data && event.notification.data.amiId) || ''
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((fenetres) => {
      for (const fenetre of fenetres) {
        let memeSite = false
        try { memeSite = new URL(fenetre.url).origin === self.location.origin } catch (e) { /* URL exotique */ }
        if (!memeSite) continue
        fenetre.postMessage({ type: 'oeno-ouvrir-discussion', amiId })
        return fenetre.focus()
      }
      return self.clients.openWindow(amiId ? `/?ami=${encodeURIComponent(amiId)}` : '/')
    })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  // Jamais de cache pour l'IA : hors-ligne, ces appels échouent
  // proprement et l'app affiche ses messages d'erreur habituels.
  if (url.pathname.startsWith('/api/')) return

  // Assets fingerprintés (immuables) : cache d'abord, réseau en secours.
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {})
          return response
        })
      )
    )
    return
  }

  // Pages et autres : réseau d'abord (contenu à jour), cache hors-ligne,
  // et l'app-shell « / » en dernier recours pour les navigations.
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {})
        return response
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached
          if (request.mode === 'navigate') return caches.match('/')
          return Response.error()
        })
      )
  )
})
