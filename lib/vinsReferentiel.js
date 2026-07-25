import { PROFILS_GOUT, APPELLATIONS_DETAIL, MILLESIMES_FR } from '../data/referentielFrance'
import { WINE_DB } from '../data/wineDatabase'
import { normaliser } from '../data/aromes'

// ═══════════════════════════════════════════════════════════════════════════
// vinsReferentiel — les 580 appellations de la base nationale, converties en
// vins RECOMMANDABLES.
//
// Jusqu'ici le référentiel était documentaire : il décrivait les appellations
// sans permettre de les conseiller, faute de jauges de goût et de prix. La
// table « Profils, goût & prix » comble ce manque : chaque appellation porte
// désormais puissance, acidité, tanin, sucrosité, arômes, accords et une
// fourchette de prix. On peut donc l'injecter dans les moteurs de conseil.
//
// Deux garde-fous :
//  · les appellations déjà présentes dans WINE_DB sont écartées — les fiches
//    écrites à la main sont plus riches (domaines, histoire, millésimes) ;
//  · `estimation: true` marque ces vins, et `fiabilitePrix` dit si le prix est
//    relevé sur une référence réelle ou modélisé. On n'affiche jamais une
//    estimation comme une donnée vérifiée.
// ═══════════════════════════════════════════════════════════════════════════

const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }
const TYPE_COLORS = { red: '#8c2f39', white: '#c9a84c', 'rosé': '#e58f8f', sweet: '#b8860b', sparkling: '#5b8db8' }

// « Blanc (dominante) », « VDN / Vin de liqueur »… → type interne
function typeDepuis(couleur) {
  const c = normaliser(couleur)
  if (c.includes('liquoreux') || c.includes('moelleux') || c.includes('vdn') || c.includes('liqueur')) return 'sweet'
  if (c.includes('effervescent')) return 'sparkling'
  if (c.startsWith('rose')) return 'rosé'
  if (c.startsWith('blanc')) return 'white'
  return 'red'
}

// Les jauges d'Œno vont de 1 à 5 ; la source descend à 0 (sec, sans tanin).
const cadrer = (n) => Math.max(1, Math.min(5, Number(n) || 1))

// Potentiel de garde /5 → fenêtre de dégustation en années
const GARDE = {
  1: { from: 1, until: 3,  label: '1-3 ans' },
  2: { from: 1, until: 5,  label: '2-5 ans' },
  3: { from: 2, until: 10, label: '5-10 ans' },
  4: { from: 3, until: 20, label: '10-20 ans' },
  5: { from: 5, until: 30, label: '20 ans et plus' },
}

const SERVICE = { red: 16, white: 10, 'rosé': 10, sweet: 8, sparkling: 7 }

// Une appellation est « facile », « à explorer » ou « pointue » selon son
// prix et sa structure : c'est ce qui pilote le mode débutant.
function difficulteDe(p, type) {
  const prix = p.prixCoeur || p.prixEntree || 0
  if (prix >= 60 || p.garde >= 5) return 'pointu'
  if (prix <= 20 && p.tanin <= 3 && type !== 'sweet') return 'facile'
  return 'explorer'
}

// Phrase courte affichée sur les cartes, dérivée des jauges (jamais inventée).
function enUneMot(p, type) {
  const t = TYPE_LABELS[type].toLowerCase()
  if (p.sucrosite >= 3) return `${TYPE_LABELS[type]} doux et parfumé`
  if (p.puissance >= 4) return `${TYPE_LABELS[type]} puissant et structuré`
  if (p.puissance <= 2) return `${TYPE_LABELS[type]} léger et facile`
  if (p.acidite >= 4) return `${TYPE_LABELS[type]} vif et tendu`
  return `${TYPE_LABELS[type]} équilibré`
}

const EMOJI_TYPE = { red: '🍷', white: '🥂', 'rosé': '🌸', sweet: '🍯', sparkling: '🍾' }

// Index des appellations déjà écrites à la main : elles gardent la priorité.
const DEJA_ECRITES = new Set(WINE_DB.map(w => normaliser(w.appellation)))

// Détail officiel (cépages du cahier des charges), quand il existe
const DETAIL = new Map(APPELLATIONS_DETAIL.map(d => [normaliser(d.nom), d]))

// Bons millésimes par région : les années réellement notées ≥ 16/20 dans la
// base, plutôt qu'une liste inventée. Les écrans de millésimes s'appuient
// dessus (sélecteur de la carte, fiche vin).
const MILLESIMES_PAR_REGION = (() => {
  const m = new Map()
  for (const x of MILLESIMES_FR) {
    if (!x.annee || (x.note ?? 0) < 16) continue
    const k = normaliser(x.region)
    if (!m.has(k)) m.set(k, [])
    m.get(k).push(x.annee)
  }
  for (const [k, annees] of m) {
    m.set(k, [...new Set(annees)].sort((a, b) => a - b).slice(-6))
  }
  return m
})()

function bonsMilsimesDe(region) {
  const k = normaliser(region)
  if (MILLESIMES_PAR_REGION.has(k)) return MILLESIMES_PAR_REGION.get(k)
  // Région au libellé différent (« Rhône Nord » vs « Vallée du Rhône »)
  for (const [cle, annees] of MILLESIMES_PAR_REGION) {
    if (cle.includes(k) || k.includes(cle)) return annees
  }
  return []
}

function profilVersVin(p) {
  const type = typeDepuis(p.couleur)
  const garde = GARDE[cadrer(p.garde)]
  const detail = DETAIL.get(normaliser(p.appellation))
  const prix = p.prixCoeur || p.prixEntree || null

  return {
    id: `ref-${p.id}`,
    appellation: p.appellation,
    region: p.region,
    type,
    typeLabel: TYPE_LABELS[type],
    color: TYPE_COLORS[type],
    emoji: EMOJI_TYPE[type],
    cepages: detail?.cepages || [],
    aromes: p.aromes.join(', '),
    enUneMot: enUneMot(p, type),
    pourQui: p.profil || '',
    jauges: {
      puissance: cadrer(p.puissance),
      douceur: cadrer(p.sucrosite),
      tanins: cadrer(p.tanin),
    },
    // Jauges supplémentaires de la source, exploitables par les moteurs
    acidite: cadrer(p.acidite),
    intensite: cadrer(p.intensite),
    difficulte: difficulteDe(p, type),
    prixMoyen: prix,
    prixEntree: p.prixEntree,
    prixHaut: p.prixHaut,
    fiabilitePrix: p.fiabilitePrix,
    bonsMilsimes: bonsMilsimesDe(p.region),
    garde: garde.label,
    drinkFrom: garde.from,
    drinkUntil: garde.until,
    temperature: `${SERVICE[type]}°C`,
    serviceTemp: SERVICE[type],
    carafage: type === 'red' && p.tanin >= 4 ? '1h' : null,
    accords: p.accords,
    domaines: [],
    description: p.profil || '',
    // Marqueurs : fiche dérivée de la base nationale, pas rédigée à la main
    estimation: true,
    referentiel: true,
    igp: p.type === 'IGP',
  }
}

// Les vins issus du référentiel, hors doublons avec WINE_DB.
export const VINS_REFERENTIEL = PROFILS_GOUT
  .filter(p => p.appellation && !DEJA_ECRITES.has(normaliser(p.appellation)))
  .map(profilVersVin)
  .filter(w => w.prixMoyen)   // sans prix, impossible de conseiller honnêtement

// Le catalogue complet : fiches écrites à la main d'abord, référentiel ensuite.
export const CATALOGUE = [...WINE_DB, ...VINS_REFERENTIEL]

export const COUVERTURE_VINS = {
  redigees: WINE_DB.length,
  referentiel: VINS_REFERENTIEL.length,
  total: CATALOGUE.length,
}

export default CATALOGUE
