// ═══════════════════════════════════════════════════════════════════════════
// Mode Dîner — logique pure (sans JSX, testable en node).
// Compose le « menu des vins » d'un repas : pour chaque plat saisi, LE vin
// recommandé + une alternative, ordonnés selon la règle sommelier
// (blanc/léger → rouge/puissant → liquoreux). Tout en local depuis WINE_DB.
// ═══════════════════════════════════════════════════════════════════════════

import { WINE_DB } from '../data/wineDatabase'
import { meilleurMillesime } from '../lib/millesimes'
import { RECETTES } from '../data/recettes'
import { normaliser as normBase } from '../data/aromes'
import { bonusProfilAppris } from '../data/goutsAppris'

// Normalisation renforcée : ligatures œ/æ (« bœuf » ↔ « boeuf »)
const normaliser = s => normBase(s).replace(/œ/g, 'oe').replace(/æ/g, 'ae')

// ── Plats connus : clés de RECETTES ∪ champs `accords` de WINE_DB ───────────
export const PLATS_CONNUS = [...new Set([
  ...Object.keys(RECETTES),
  ...WINE_DB.flatMap(w => w.accords),
])].sort((a, b) => a.localeCompare(b, 'fr'))

// Chips de suggestions rapides — plats réellement présents dans les accords
export const CHIPS = {
  entree:  ['Huîtres', 'Foie gras', 'Charcuterie', 'Saint-Jacques', 'Asperges', 'Fruits de mer', 'Poisson fumé', 'Quiche'],
  plat:    ['Bœuf bourguignon', 'Magret de canard', 'Poisson grillé', 'Risotto aux champignons', 'Volaille rôtie', 'Agneau rôti', 'Cassoulet', 'Raclette'],
  dessert: ['Tarte Tatin', 'Fondant au chocolat', 'Tarte aux fruits', 'Fromages affinés', 'Roquefort', 'Dessert aux fruits', 'Comté', 'Fruits secs'],
}

const STOPWORDS = new Set(['les', 'des', 'une', 'aux', 'sur', 'avec', 'pour', 'mes', 'ses'])
const mots = s => normaliser(s).split(/[^a-z0-9]+/).filter(m => m.length > 2 && !STOPWORDS.has(m))

// ── Matching souple plat ↔ accords (insensible casse/accents, mots partiels) ─
export function matchScore(dish, wine) {
  const d = normaliser(dish).trim()
  if (!d) return 0
  const dWords = mots(dish)
  let best = 0
  for (const acc of wine.accords) {
    const a = normaliser(acc)
    if (a === d) { best = Math.max(best, 10); continue }
    if (a.includes(d) || d.includes(a)) { best = Math.max(best, 7); continue }
    const aWords = mots(acc)
    const communs = dWords.filter(w => aWords.some(x => x === w || x.startsWith(w) || w.startsWith(x)))
    if (communs.length) best = Math.max(best, 3 + communs.length * 1.5)
  }
  return best
}

// ── Ordre de service : blanc/léger avant rouge/puissant avant liquoreux ─────
const TYPE_RANK = { sparkling: 0, white: 10, 'rosé': 20, red: 30, sweet: 50 }
export function serviceRank(wine) {
  return (TYPE_RANK[wine.type] ?? 30) + wine.jauges.puissance
}

// Millésime conseillé : le plus récent des bons millésimes
// Millésime conseillé : logique partagée avec tout le reste de l'app
// (guide des millésimes croisé région + couleur, cf. lib/millesimes.js).
export const millesimeConseille = w => meilleurMillesime(w) ?? w.bonsMilsimes[w.bonsMilsimes.length - 1]

// ~1 bouteille pour 3 convives par service, arrondi supérieur
export const bouteillesPour = convives => Math.max(1, Math.ceil(convives / 3))

// Vin de repli polyvalent quand un plat ne matche rien : facile, cohérent
// avec le moment du repas (entrée → blanc, plat → rouge, dessert → liquoreux).
function fallbackWine(courseKey, exclude, budgetMax) {
  const prefType = { entree: 'white', plat: 'red', dessert: 'sweet' }[courseKey] || 'red'
  const ok = w => !exclude.has(w.id) && w.type !== 'sparkling' && (!budgetMax || w.prixMoyen <= budgetMax)
  let pool = WINE_DB.filter(ok)
  // Budget trop serré pour trouver un repli : on relâche la contrainte de prix
  // plutôt que de laisser un service sans vin (le menu doit toujours aboutir).
  if (!pool.length && budgetMax) pool = WINE_DB.filter(w => !exclude.has(w.id) && w.type !== 'sparkling')
  if (!pool.length) pool = WINE_DB.filter(w => !exclude.has(w.id))
  const score = w =>
    (w.type === prefType ? 6 : 0) +
    (w.difficulte === 'facile' ? 4 : w.difficulte === 'explorer' ? 1 : -2) +
    w.accords.length * 0.5 -
    Math.abs(w.jauges.puissance - 3)
  return [...pool].sort((a, b) => score(b) - score(a))[0] || null
}

// ── Cœur : compose le menu des vins ─────────────────────────────────────────
// courses : [{ key: 'entree'|'plat'|'dessert', label, dish }] (dish non vide)
// caveIds : Set d'ids WINE_DB présents dans la cave de l'utilisateur
// Retourne les services ordonnés façon sommelier + le détail par plat.
export function buildMenu({ courses, convives = 5, useCave = false, caveIds = new Set(), budgetMax = 0, profil = null }) {
  const used = new Set()
  const items = []

  for (const course of courses) {
    const ranked = WINE_DB
      .filter(w => w.type !== 'sparkling' && !used.has(w.id))
      .map(w => {
        const m = matchScore(course.dish, w)
        if (m <= 0) return null
        let s = m
        if (useCave && caveIds.has(w.id)) s += 8            // bonus fort « dans votre cave »
        if (profil) s += bonusProfilAppris(w, profil, 0.4)  // bonus léger profil appris
        if (budgetMax && w.prixMoyen > budgetMax) s -= 20   // budget respecté
        if (w.difficulte === 'facile') s += 0.5
        return { wine: w, score: s }
      })
      .filter(x => x && x.score > 0)
      .sort((a, b) => b.score - a.score)

    let wine = ranked[0]?.wine || null
    let alt = ranked[1]?.wine || null
    let fallback = false
    if (!wine) {
      wine = fallbackWine(course.key, used, budgetMax)
      fallback = true
    }
    if (!wine) continue // WINE_DB vide : impossible en pratique, mais on ne plante pas
    used.add(wine.id)
    if (alt) used.add(alt.id)

    items.push({
      ...course,
      wine,
      alt,
      fallback,
      inCave: !!(wine && useCave && caveIds.has(wine.id)),
      altInCave: !!(alt && useCave && caveIds.has(alt.id)),
    })
  }

  // Ordre de service façon sommelier
  const ordered = [...items].sort((a, b) => serviceRank(a.wine) - serviceRank(b.wine))
  const reordonne = ordered.some((it, i) => it !== items[i])

  return { services: ordered, reordonne, bouteillesParService: bouteillesPour(convives) }
}

// ── Cave : retrouve les ids WINE_DB des vins possédés (quantité > 0) ─────────
export function caveIdsFromWines(wines) {
  const ids = new Set()
  for (const w of wines || []) {
    if (!w || !(w.quantity > 0)) continue
    const n = normaliser(w.appellation || w.name)
    if (!n) continue
    const hit = WINE_DB.find(x => normaliser(x.appellation) === n) ||
                WINE_DB.find(x => n.includes(normaliser(x.appellation)))
    if (hit) ids.add(hit.id)
  }
  return ids
}

// Autocomplete : plats connus qui matchent la saisie (préfixe puis inclusion)
export function suggestionsPour(saisie, limit = 6) {
  const q = normaliser(saisie).trim()
  if (q.length < 2) return []
  const starts = []
  const contains = []
  for (const p of PLATS_CONNUS) {
    const n = normaliser(p)
    if (n === q) continue
    if (n.startsWith(q)) starts.push(p)
    else if (n.includes(q) || mots(p).some(m => m.startsWith(q))) contains.push(p)
  }
  return [...starts, ...contains].slice(0, limit)
}
