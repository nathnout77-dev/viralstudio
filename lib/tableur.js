import { identifiantUnique } from './identifiant'

// ═══════════════════════════════════════════════════════════════════════════
// La cave en tableur : sortir ses bouteilles vers Excel ou Numbers, et faire
// entrer une cave tenue ailleurs sans la ressaisir bouteille par bouteille.
//
// Le format est le CSV, et pas le .xlsx : tout tableur sait l'ouvrir et
// l'enregistrer, et le lire ne demande aucune bibliothèque. À l'export, le
// point-virgule et la marque d'ordre des octets sont choisis pour qu'un
// double-clic l'ouvre proprement dans un Excel français (qui prend la
// virgule pour le séparateur décimal).
//
// À l'import, on est tolérant sur la forme — séparateur, ordre et nom des
// colonnes, accents, guillemets — et strict sur le fond : une ligne sans nom
// est écartée et comptée, un prix absent reste absent. Œno n'invente ni un
// prix ni un millésime pour faire joli (même règle que lib/ajoutCave.js).
// ═══════════════════════════════════════════════════════════════════════════

const COLONNES = [
  ['Nom', v => v.name],
  ['Domaine', v => v.domain],
  ['Appellation', v => v.appellation],
  ['Région', v => v.region],
  ['Couleur', v => COULEUR_FR[v.type] || ''],
  ['Cépages', v => (v.cepages || []).join(', ')],
  ['Millésime', v => v.vintage],
  ['Quantité', v => v.quantity],
  ['Prix payé', v => (v.estimatedValue == null ? '' : String(v.estimatedValue).replace('.', ','))],
  ['Notes', v => v.notes],
  ['Bouteilles ouvertes', v => v.ouvertes || ''],
]

const COULEUR_FR = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sparkling: 'Effervescent', sweet: 'Liquoreux' }

const cellule = x => {
  const s = x == null ? '' : String(x)
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** La cave (sans ses bouteilles d'exemple) en texte CSV. */
export function caveVersCsv(cave = []) {
  const lignes = [COLONNES.map(([nom]) => nom).join(';')]
  for (const v of cave) {
    if (!v || v.demo) continue
    lignes.push(COLONNES.map(([, lire]) => cellule(lire(v))).join(';'))
  }
  return '﻿' + lignes.join('\r\n') + '\r\n'
}

// ── Lecture ─────────────────────────────────────────────────────────────────

const sansAccent = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

// Ce que les gens écrivent en tête de colonne, toutes caves confondues.
const ALIAS = {
  name:           ['nom', 'vin', 'nom du vin', 'cuvee', 'name', 'wine', 'designation', 'libelle'],
  domain:         ['domaine', 'producteur', 'chateau', 'producer', 'winery', 'proprietaire'],
  appellation:    ['appellation', 'aoc', 'aop'],
  region:         ['region', 'vignoble'],
  type:           ['couleur', 'type', 'color', 'colour'],
  cepages:        ['cepages', 'cepage', 'grapes', 'varietal'],
  vintage:        ['millesime', 'annee', 'vintage', 'year'],
  quantity:       ['quantite', 'qte', 'nombre', 'bouteilles', 'stock', 'quantity', 'qty', 'nb'],
  estimatedValue: ['prix paye', 'prix', 'prix achat', 'prix d achat', "prix d'achat", 'price', 'valeur', 'cout'],
  notes:          ['notes', 'note', 'commentaire', 'commentaires', 'remarques', 'comment'],
  ouvertes:       ['bouteilles ouvertes', 'ouvertes', 'bues'],
}

const COULEURS = [
  [/ros/, 'rosé'],
  [/efferv|petill|mousseu|champagne|cremant|bulle|sparkl/, 'sparkling'],
  [/liquor|moell|doux|sweet|vendange/, 'sweet'],
  [/blanc|white/, 'white'],
  [/rouge|red/, 'red'],
]

function separateur(entete) {
  const compte = c => entete.split(c).length - 1
  return [';', '\t', ','].sort((a, b) => compte(b) - compte(a))[0]
}

// Découpe en lignes et cellules, guillemets doublés et retours à la ligne
// dans une cellule compris. Écrit à la main : vingt lignes valent mieux
// qu'une dépendance pour un format aussi simple.
function decouper(texte, sep) {
  const lignes = []
  let ligne = [], cel = '', dans = false
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i]
    if (dans) {
      if (c === '"' && texte[i + 1] === '"') { cel += '"'; i++ }
      else if (c === '"') dans = false
      else cel += c
    } else if (c === '"') dans = true
    else if (c === sep) { ligne.push(cel); cel = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && texte[i + 1] === '\n') i++
      ligne.push(cel); cel = ''
      lignes.push(ligne); ligne = []
    } else cel += c
  }
  if (cel !== '' || ligne.length) { ligne.push(cel); lignes.push(ligne) }
  return lignes.filter(l => l.some(x => x.trim() !== ''))
}

const nombre = s => {
  const n = Number(String(s || '').replace(/[^\d,.-]/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

/**
 * Lit un CSV et rend `{ bouteilles, ignorees, reconnues }`.
 * `ignorees` compte les lignes sans nom ; `reconnues` liste les champs
 * retrouvés dans l'en-tête — vide, c'est que le fichier n'est pas une cave.
 */
export function csvVersCave(texte, annee = new Date().getFullYear()) {
  const propre = String(texte || '').replace(/^﻿/, '')
  const premiere = propre.split(/\r?\n/)[0] || ''
  const lignes = decouper(propre, separateur(premiere))
  if (lignes.length < 2) return { bouteilles: [], ignorees: 0, reconnues: [] }

  const place = {}
  lignes[0].forEach((titre, i) => {
    const t = sansAccent(titre).replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim()
    for (const [champ, noms] of Object.entries(ALIAS)) {
      if (!(champ in place) && noms.includes(t)) place[champ] = i
    }
  })
  const reconnues = Object.keys(place)
  if (!('name' in place) && !('appellation' in place)) return { bouteilles: [], ignorees: 0, reconnues }

  const bouteilles = []
  let ignorees = 0
  for (const l of lignes.slice(1)) {
    const lire = champ => (champ in place ? String(l[place[champ]] ?? '').trim() : '')
    const nom = lire('name') || lire('appellation')
    if (!nom) { ignorees++; continue }

    const millesime = nombre(lire('vintage'))
    const quantite = nombre(lire('quantity'))
    const prix = lire('estimatedValue') === '' ? null : nombre(lire('estimatedValue'))
    const couleur = sansAccent(lire('type'))
    const ouvertes = nombre(lire('ouvertes'))

    bouteilles.push({
      id: identifiantUnique('w'),
      name: nom,
      domain: lire('domain'),
      appellation: lire('appellation') || nom,
      region: lire('region'),
      country: 'France',
      type: COULEURS.find(([motif]) => motif.test(couleur))?.[1] || 'red',
      cepages: lire('cepages') ? lire('cepages').split(/[,/]/).map(s => s.trim()).filter(Boolean) : [],
      // Un millésime invraisemblable vaut mieux absent que faux.
      vintage: millesime && millesime >= 1900 && millesime <= annee + 1 ? Math.round(millesime) : undefined,
      // Une ligne dans une cave, c'est au moins une bouteille — sauf zéro écrit.
      quantity: quantite == null || lire('quantity') === '' ? 1 : Math.max(0, Math.round(quantite)),
      estimatedValue: prix != null && prix >= 0 ? prix : undefined,
      notes: lire('notes'),
      ...(ouvertes > 0 ? { ouvertes: Math.round(ouvertes) } : {}),
      provenance: 'import',
    })
  }
  return { bouteilles, ignorees, reconnues }
}
