import {
  APPELLATIONS_FR, APPELLATIONS_DETAIL, CEPAGES_FR, DOMAINES_FR,
  MILLESIMES_FR, CLASSEMENTS_BORDEAUX, CRUS_FR, REPERES_FR,
} from '../data/referentielFrance'
import { normaliser } from '../data/aromes'

// ═══════════════════════════════════════════════════════════════════════════
// referentiel — accès à la base viticole nationale.
//
// WINE_DB porte les vins entièrement modélisés (goût, prix, accords) ; ce
// référentiel couvre TOUTE la France de façon factuelle. Les deux se
// complètent : on cherche ici ce que WINE_DB ne connaît pas, et on enrichit
// les fiches existantes avec le sol, la garde, la hiérarchie, le classement.
// ═══════════════════════════════════════════════════════════════════════════

// ── Index normalisés, construits une seule fois ─────────────────────────────
const idx = (arr, cle) => {
  const m = new Map()
  for (const x of arr) {
    const k = normaliser(typeof cle === 'function' ? cle(x) : x[cle])
    if (k && !m.has(k)) m.set(k, x)
  }
  return m
}

const IDX_APPELLATION = idx(APPELLATIONS_FR, 'nom')
const IDX_DETAIL      = idx(APPELLATIONS_DETAIL, 'nom')
const IDX_CEPAGE      = idx(CEPAGES_FR, 'nom')
const IDX_DOMAINE     = idx(DOMAINES_FR, 'nom')

// Synonymes de cépages → fiche du cépage (Breton → Cabernet Franc…)
const IDX_CEPAGE_SYN = (() => {
  const m = new Map()
  for (const c of CEPAGES_FR) {
    for (const s of c.synonymes || []) {
      const k = normaliser(s)
      if (k && !m.has(k)) m.set(k, c)
    }
  }
  return m
})()

// Classements groupés par château, puis par appellation
const IDX_CLASSEMENT_CHATEAU = (() => {
  const m = new Map()
  for (const c of CLASSEMENTS_BORDEAUX) {
    const k = normaliser(c.chateau)
    if (!k) continue
    if (!m.has(k)) m.set(k, [])
    m.get(k).push(c)
  }
  return m
})()

// ── Recherches unitaires ────────────────────────────────────────────────────
export const appellationInfo   = (nom) => IDX_APPELLATION.get(normaliser(nom)) || null
export const detailAppellation = (nom) => IDX_DETAIL.get(normaliser(nom)) || null
export const domaineInfo       = (nom) => IDX_DOMAINE.get(normaliser(nom)) || null

export function cepageInfo(nom) {
  const k = normaliser(nom)
  return IDX_CEPAGE.get(k) || IDX_CEPAGE_SYN.get(k) || null
}

// Classement d'un château (1855, Graves, Saint-Émilion 2022)
export function classementDe(chateau) {
  return IDX_CLASSEMENT_CHATEAU.get(normaliser(chateau)) || []
}

// Crus classés d'une appellation (ex. tous les crus de Pauillac)
export function classementsAppellation(appellation) {
  const k = normaliser(appellation)
  if (!k) return []
  return CLASSEMENTS_BORDEAUX.filter(c => normaliser(c.appellation) === k)
}

// Grands crus rattachés à une région (Alsace, Bourgogne, Champagne)
export function crusRegion(region) {
  const k = normaliser(region)
  if (!k) return []
  const famille = k.includes('alsace') ? 'alsace_gc'
    : k.includes('bourgogne') || k.includes('chablis') ? 'bourgogne_gc'
    : k.includes('champagne') ? 'champagne'
    : null
  return famille ? CRUS_FR.filter(c => c.type === famille) : []
}

// Millésimes notés d'une région, du plus récent au plus ancien
export function millesimesRegion(region) {
  const k = normaliser(region)
  if (!k) return []
  return MILLESIMES_FR
    .filter(m => {
      const mr = normaliser(m.region)
      return mr === k || mr.includes(k) || k.includes(mr)
    })
    .sort((a, b) => b.annee - a.annee)
}

// Note /20 d'un millésime pour une région donnée
export function noteMillesime(annee, region) {
  const an = Number(annee)
  if (!an) return null
  return millesimesRegion(region).find(m => m.annee === an) || null
}

// ── Comptages par région (carte, écrans d'exploration) ──────────────────────
export const APPELLATIONS_PAR_REGION = (() => {
  const m = new Map()
  for (const a of APPELLATIONS_FR) {
    const r = a.region || 'Autre'
    if (!m.has(r)) m.set(r, { region: r, aoc: 0, igp: 0, total: 0, noms: [] })
    const e = m.get(r)
    e.total += 1
    if (a.type === 'IGP') e.igp += 1; else e.aoc += 1
    e.noms.push(a.nom)
  }
  return [...m.values()].sort((a, b) => b.total - a.total)
})()

// Les régions du référentiel portent des noms longs (« Vallée du Rhône »)
// là où WINE_DB en utilise de courts (« Rhône Nord »). On rapproche les deux.
export function statsRegion(region) {
  const k = normaliser(region)
  if (!k) return null
  return APPELLATIONS_PAR_REGION.find(r => {
    const rk = normaliser(r.region)
    return rk === k || rk.includes(k) || k.includes(rk)
  }) || null
}

// Appellations d'une région, triées alphabétiquement
export function appellationsRegion(region) {
  const s = statsRegion(region)
  if (!s) return []
  return APPELLATIONS_FR
    .filter(a => a.region === s.region)
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
}

// ── Recherche globale ───────────────────────────────────────────────────────
// Renvoie des entrées typées, prêtes à s'afficher aux côtés des vins WINE_DB.
// `kind` : 'appellation' | 'cepage' | 'domaine'
export function chercherReferentiel(query, max = 12) {
  const q = normaliser(query)
  if (!q || q.length < 2) return []

  const score = (nom, bonus = 0) => {
    const n = normaliser(nom)
    if (!n.includes(q)) return -1
    if (n === q) return 100 + bonus
    if (n.startsWith(q)) return 60 + bonus
    return 25 + bonus
  }

  const out = []

  for (const a of APPELLATIONS_FR) {
    // Les AOC priment sur les IGP à pertinence égale
    const s = score(a.nom, a.type === 'AOC' ? 6 : 0)
    if (s > 0) out.push({ kind: 'appellation', s, item: a })
  }
  for (const c of CEPAGES_FR) {
    let s = score(c.nom, 4)
    if (s < 0) {
      // Recherche par synonyme (« Breton » → Cabernet Franc)
      const parSyn = (c.synonymes || []).some(x => normaliser(x).includes(q))
      if (parSyn) s = 20
    }
    if (s > 0) out.push({ kind: 'cepage', s, item: c })
  }
  for (const d of DOMAINES_FR) {
    const s = score(d.nom, 2)
    if (s > 0) out.push({ kind: 'domaine', s, item: d })
  }

  return out.sort((a, b) => b.s - a.s).slice(0, max)
}

// ── Chiffres de couverture (écrans d'accueil, « à propos ») ─────────────────
export const COUVERTURE = {
  appellations: APPELLATIONS_FR.length,
  aoc: APPELLATIONS_FR.filter(a => a.type === 'AOC').length,
  igp: APPELLATIONS_FR.filter(a => a.type === 'IGP').length,
  detaillees: APPELLATIONS_DETAIL.length,
  cepages: CEPAGES_FR.length,
  domaines: DOMAINES_FR.length,
  millesimes: MILLESIMES_FR.length,
  classements: CLASSEMENTS_BORDEAUX.length,
  crus: CRUS_FR.length,
}

export { APPELLATIONS_FR, APPELLATIONS_DETAIL, CEPAGES_FR, DOMAINES_FR, MILLESIMES_FR, CLASSEMENTS_BORDEAUX, CRUS_FR, REPERES_FR }
