// Garde-fou : détecte les composants JSX utilisés sans être importés ni définis.
//
// Webpack compile sans broncher un `<Icone />` non importé : l'identifiant est
// traité comme une variable globale, et l'app ne plante qu'à l'exécution, chez
// l'utilisateur, en écran noir « Application error ». Ce script fait échouer le
// build à la place.
//
//   node scripts/verifier-imports.mjs

import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const RACINES = ['components', 'pages', 'lib']

// Identifiants toujours disponibles (globaux du langage ou du navigateur)
const GLOBAUX = new Set([
  'React', 'Fragment', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number',
  'Boolean', 'Date', 'Map', 'Set', 'Promise', 'Error', 'RegExp', 'Intl',
  'Image', 'Touch', 'TouchEvent', 'FormData', 'URL', 'URLSearchParams',
])

function fichiers(dir) {
  const out = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) out.push(...fichiers(p))
    else if (/\.jsx?$/.test(p)) out.push(p)
  }
  return out
}

// Retire UNIQUEMENT les commentaires : un « <Composant> » cité dans un
// commentaire ne doit pas compter comme un usage. On ne touche pas aux
// chaînes — les apostrophes du français (« d'origine », « l'app ») y ouvriraient
// de fausses chaînes qui avaleraient de vrais bouts de JSX.
// Le `[^:]` avant `//` protège les URL (« https:// »).
function nettoyer(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

function identifiantsImportes(src) {
  const noms = new Set()
  const re = /import\s+([\s\S]*?)\s+from\s+['"][^'"]+['"]/g
  let m
  while ((m = re.exec(src))) {
    let clause = m[1].trim()
    // import Defaut, { a, b as c } from '…'   |   import * as X from '…'
    const nommes = clause.match(/\{([\s\S]*?)\}/)
    if (nommes) {
      for (const part of nommes[1].split(',')) {
        const nom = part.trim().split(/\s+as\s+/).pop().trim()
        if (nom) noms.add(nom)
      }
      clause = clause.replace(/\{[\s\S]*?\}/, '')
    }
    const ns = clause.match(/\*\s+as\s+(\w+)/)
    if (ns) noms.add(ns[1])
    for (const part of clause.split(',')) {
      const nom = part.trim()
      if (/^\w+$/.test(nom)) noms.add(nom)
    }
  }
  return noms
}

function identifiantsLocaux(src) {
  const noms = new Set()
  for (const re of [
    /function\s+([A-Z]\w*)/g,
    /(?:const|let|var)\s+([A-Z]\w*)\s*=/g,
    /class\s+([A-Z]\w*)/g,
    // déstructurations d'objet : const { Icon } = … / ({ Icon }) => … /
    // .map(({ Icon, label }, i) => …) — d'où la virgule acceptée après l'accolade
    /\{\s*([^}]*?)\s*\}\s*(?:=|\)|=>|,)/g,
    // déstructurations de tableau : .map(([v, Icon]) => …)
    /\[\s*([^\]]*?)\s*\]\s*(?:=|\)|=>)/g,
  ]) {
    let m
    while ((m = re.exec(src))) {
      for (const part of m[1].split(',')) {
        const nom = part.trim().split(':').pop().trim().replace(/\s*=.*$/, '')
        if (/^[A-Z]\w*$/.test(nom)) noms.add(nom)
      }
    }
  }
  return noms
}

function composantsUtilises(src) {
  const noms = new Set()
  const re = /<([A-Z]\w*)/g
  let m
  while ((m = re.exec(src))) noms.add(m[1])
  return noms
}

let problemes = 0
for (const racine of RACINES) {
  for (const f of fichiers(racine)) {
    const brut = readFileSync(f, 'utf8')
    // Imports et définitions se lisent sur la source BRUTE : le nettoyage vide
    // les chaînes (cassant `from './X'`) et, surtout, les apostrophes du texte
    // français (« d'origine ») y ouvrent de fausses chaînes qui avalent de
    // vraies définitions. Le texte nettoyé ne sert qu'à repérer les usages,
    // pour ne pas compter un `<Composant>` cité dans un commentaire.
    const src = nettoyer(brut)
    const dispo = new Set([
      ...identifiantsImportes(brut),
      ...identifiantsLocaux(brut),
      ...GLOBAUX,
    ])
    const manquants = [...composantsUtilises(src)]
      .filter(n => !dispo.has(n) && !n.includes('.'))
    if (manquants.length) {
      problemes += manquants.length
      for (const n of manquants) {
        const ligne = brut.split('\n').findIndex(l => l.includes(`<${n}`)) + 1
        console.error(`✗ ${f}:${ligne} — <${n}> utilisé sans import ni définition`)
      }
    }
  }
}

if (problemes) {
  console.error(`\n${problemes} composant(s) non résolu(s) : l'app planterait à l'exécution.`)
  process.exit(1)
}
console.log('✓ Imports JSX : tous les composants utilisés sont résolus.')
