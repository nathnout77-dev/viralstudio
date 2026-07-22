// Généré après `next build` : liste tous les assets statiques (JS, CSS,
// polices) dans public/sw-precache.js pour que le service worker les
// pré-cache à l'installation. C'est ce qui rend Œno réellement utilisable
// hors-ligne : même les écrans jamais ouverts (imports dynamiques) ont
// leurs chunks en cache. Le BUILD_ID versionne le cache et déclenche la
// mise à jour du service worker à chaque déploiement.
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const buildIdFile = path.join(root, '.next', 'BUILD_ID')
const staticDir = path.join(root, '.next', 'static')
const out = path.join(root, 'public', 'sw-precache.js')

if (!fs.existsSync(buildIdFile) || !fs.existsSync(staticDir)) {
  console.error('sw-precache : .next introuvable — lancer `next build` d\'abord')
  process.exit(1)
}

const buildId = fs.readFileSync(buildIdFile, 'utf8').trim()
const assets = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else assets.push('/_next/static/' + path.relative(staticDir, full).split(path.sep).join('/'))
  }
}
walk(staticDir)

// JS, CSS et polices uniquement — pas de source maps ni de fichiers de dev
const keep = assets.filter(a => /\.(js|css|woff2?)$/.test(a) && !a.endsWith('.map'))

fs.writeFileSync(out, `self.__OENO_PRECACHE=${JSON.stringify({ build: buildId, assets: keep })}\n`)
console.log(`sw-precache : ${keep.length} assets pré-cachés (build ${buildId})`)
