import { CATALOGUE } from '../vinsReferentiel'
import { bonusProfilAppris } from '../../data/goutsAppris'
import { diversifyByRegion } from '../suggestions'

// ═══════════════════════════════════════════════════════════════════════════
// Le moteur unique du guide.
//
// Avant : quatre questionnaires, quatre moteurs de score, enfouis chacun dans
// son composant. « Ce soir ? » demandait le budget avec ses mots, le
// Goût-o-mètre avec les siens, et aucun des deux ne savait ce que l'autre
// avait appris. Répondre aux six questions de goût le lundi ne changeait rien
// à la recommandation du mardi soir.
//
// Ici, un seul jeu de critères. Chacun ne pèse que si la réponse
// correspondante existe — c'est ce qui permet aux branches de **se composer**
// au lieu de s'ignorer : le profil de goût, une fois connu, affine la
// recommandation du soir sans qu'on ait à le redemander.
//
// Les poids sont repris tels quels des deux moteurs d'origine : l'unification
// ne devait pas changer les vins conseillés, seulement cesser de les calculer
// deux fois de deux façons.
// ═══════════════════════════════════════════════════════════════════════════

const N_RESULTATS = 5

// Couleurs plausibles par plat. Sert de pénalité, pas de filtre : une couleur
// explicitement demandée l'emporte toujours sur l'accord théorique.
const PLAT_TYPES = {
  viande_rouge:   ['red'],
  viande_blanche: ['white', 'red'],
  poisson:        ['white', 'rosé'],
  pates:          ['red', 'rosé'],
  fromage:        ['white', 'red'],
  vege:           ['white', 'rosé', 'red'],
  grillades:      ['red', 'rosé'],
  apero:          ['white', 'rosé', 'sparkling'],
}

// Affinage par viande précise : mots cherchés dans les accords du vin, plus
// une orientation de jauges qui pèse sans écraser le reste.
const VIANDE_AFFINAGE = {
  boeuf:  { accords: /bœuf|boeuf|entrecôte|côte de|daube|steak|viandes? grillées|viandes? rouges?/i, jauges: w => (w.jauges.puissance >= 3 ? 2 : -1) },
  agneau: { accords: /agneau/i,                    jauges: w => (w.jauges.puissance >= 3 && w.jauges.tanins >= 3 ? 2 : 0) },
  gibier: { accords: /gibier|chevreuil|sanglier/i, jauges: w => (w.jauges.puissance >= 4 ? 2 : w.jauges.puissance <= 2 ? -2 : 0) },
  canard: { accords: /canard|magret/i,             jauges: w => (w.jauges.puissance >= 3 ? 1.5 : 0) },
  poulet: { accords: /volaille|poulet/i,           jauges: w => (w.jauges.puissance <= 3 ? 1.5 : -1) },
  veau:   { accords: /veau|blanquette|volaille/i,  jauges: w => (w.jauges.tanins <= 3 ? 1.5 : -1) },
  porc:   { accords: /porc|charcuterie|cochon/i,   jauges: w => (w.jauges.puissance <= 3 && w.jauges.tanins <= 3 ? 1.5 : 0) },
  lapin:  { accords: /lapin|volaille/i,            jauges: w => (w.jauges.puissance <= 3 ? 1.5 : -1) },
}

/**
 * Traduit les réponses de goût (café, tartine, dessert…) en cibles de jauges.
 * Repris du Goût-o-mètre : ces six questions n'ont jamais parlé de vin, c'est
 * tout leur intérêt — on déduit le palais depuis le petit-déjeuner.
 */
export function profilDepuisGout(gout) {
  if (!gout) return null
  const p = { puissance: 0, douceur: 0, tanins: 0, fraicheur: 0, fruit: 0, rondeur: 0 }
  let vu = false
  for (const effet of Object.values(gout)) {
    if (!effet || typeof effet !== 'object') continue
    vu = true
    for (const [k, v] of Object.entries(effet)) {
      if (k in p) p[k] += v
    }
  }
  return vu ? p : null
}

/** Le score d'un vin pour un jeu de réponses. Exporté pour être éprouvé seul. */
export function scoreVin(vin, rep, { mode = null, profilGout = null } = {}) {
  let s = 0
  const j = vin.jauges

  // ── Le plat ────────────────────────────────────────────────────────────
  if (rep.plat) {
    const types = PLAT_TYPES[rep.plat] || ['red', 'white', 'rosé']
    const couleurExplicite = rep.couleur && rep.couleur !== 'any'
    if (!types.includes(vin.type)) { if (!couleurExplicite) s -= 15 }
    else if (vin.type === types[0]) s += 3

    if (rep.plat === 'grillades') {
      const accords = (vin.accords || []).join(' ')
      if (/grill|barbecue|entrecôte|côte de bœuf|magret|viandes? rouges?/i.test(accords)) s += 4
      if (vin.type === 'red' && j.puissance >= 3 && j.puissance <= 4) s += 1.5
    }
  }

  if (rep.viande && rep.viande !== 'tout' && VIANDE_AFFINAGE[rep.viande]) {
    const aff = VIANDE_AFFINAGE[rep.viande]
    if (aff.accords.test((vin.accords || []).join(' '))) s += 4
    s += aff.jauges(vin)
  }

  // ── L'envie du moment ──────────────────────────────────────────────────
  if (rep.style === 'leger')     s += (6 - j.puissance) + (6 - j.tanins) * 0.5
  if (rep.style === 'puissant')  s += j.puissance + j.tanins * 0.5
  if (rep.style === 'equilibre') s += 4 - Math.abs(j.puissance - 3)
  if (rep.style === 'doux')      s += j.douceur * 1.5

  // ── Le palais, quand on le connaît ─────────────────────────────────────
  // Le apport majeur de l'unification : ce bloc s'applique aussi bien à la
  // branche « ce soir » qu'au questionnaire de goût. Répondre une fois aux six
  // questions profite à toutes les recommandations suivantes.
  if (profilGout) {
    const p = profilGout
    const cible = {
      puissance: Math.min(5, Math.max(1, 2 + p.puissance - p.fraicheur * 0.5)),
      douceur:   Math.min(5, Math.max(1, 1 + p.douceur)),
      tanins:    Math.min(5, Math.max(1, 2 + p.tanins - p.rondeur * 0.5)),
    }
    // Demi-poids quand l'envie du soir s'exprime aussi : ce qu'on a envie de
    // boire ce soir prime sur ce qu'on aime en général.
    const poids = rep.style ? 0.5 : 1
    s -= Math.abs(j.puissance - cible.puissance) * 2 * poids
    s -= Math.abs(j.douceur - cible.douceur) * 2 * poids
    s -= Math.abs(j.tanins - cible.tanins) * 1.5 * poids
    if (p.fruit >= 2 && ['red', 'rosé'].includes(vin.type) && j.puissance <= 3) s += 2 * poids
    if (p.fraicheur >= 2 && vin.type === 'white') s += 3 * poids
    if (p.rondeur >= 2 && vin.type === 'white' && j.puissance >= 3) s += 2 * poids
    if (p.douceur >= 3 && vin.type === 'sweet') s += 4 * poids
  }

  // ── L'appétit de découverte ────────────────────────────────────────────
  if (rep.aventure) {
    if (vin.difficulte === rep.aventure) s += 3
    if (rep.aventure === 'facile' && vin.difficulte === 'pointu') s -= 4
  }

  // ── Le budget ──────────────────────────────────────────────────────────
  if (rep.budget) {
    if (vin.prixMoyen > rep.budget) s -= 20
    else if (vin.prixMoyen > rep.budget * 0.4) s += 2   // profiter du budget
  }

  // ── Le niveau déclaré dans le profil ───────────────────────────────────
  if (mode === 'debutant') {
    if (vin.difficulte === 'facile') s += 3
    if (vin.difficulte === 'pointu') s -= 4
  } else if (mode === 'expert' && vin.difficulte !== 'facile') s += 1.5

  return s
}

/**
 * Les vins conseillés pour ces réponses, du meilleur au moins bon.
 *
 * @param rep         les réponses accumulées, toutes branches confondues
 * @param profilGout  le palais déduit des six questions, s'il est connu
 * @param profilAppris ce que les dégustations notées ont appris (bonus doux)
 * @param regions     restriction régionale volontaire, vide sinon
 */
export function recommander(rep = {}, { mode = null, profilGout = null, profilAppris = null, regions = [], catalogue = CATALOGUE, n = N_RESULTATS } = {}) {
  // La couleur demandée est servie sans exception : filtre dur avant le
  // score, pour qu'aucun repli ne puisse réintroduire une autre couleur.
  let pool = regions.length ? catalogue.filter(w => regions.includes(w.region)) : catalogue
  if (rep.couleur && rep.couleur !== 'any') {
    pool = pool.filter(w => w.type === rep.couleur)
    // Régions trop strictes pour cette couleur : on relâche les régions,
    // jamais la couleur.
    if (!pool.length) pool = catalogue.filter(w => w.type === rep.couleur)
  }
  if (!pool.length) return []

  const notes = pool
    .map(w => ({ w, s: scoreVin(w, rep, { mode, profilGout }) + bonusProfilAppris(w, profilAppris, 0.5) }))
    .sort((a, b) => b.s - a.s)

  // Le seuil écarte les vins hors sujet ; s'il ne reste pas de quoi remplir
  // l'écran, mieux vaut des propositions tièdes qu'un écran vide.
  let retenus = notes.filter(x => x.s > -5)
  if (retenus.length < n) retenus = notes
  return diversifyByRegion(retenus, n)
}
