// ═══════════════════════════════════════════════════════════════════════════
// Helpers partagés par tous les flux de suggestion (Ce soir, Onboarding,
// Goût-o-mètre) : diversification par région, raisons personnalisées,
// préférences de régions des connaisseurs.
// ═══════════════════════════════════════════════════════════════════════════

export const REGIONS_PREF_KEY = 'oeno-regions-pref'

// ── Préférence de régions (connaisseurs) ────────────────────────────────────
export function getRegionsPref() {
  try {
    const raw = localStorage.getItem(REGIONS_PREF_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}

export function setRegionsPref(regions) {
  try { localStorage.setItem(REGIONS_PREF_KEY, JSON.stringify(regions || [])) } catch {}
}

// ── Diversification : jamais deux vins de la même région ────────────────────
// `scored` : liste déjà triée par score décroissant, éléments = vins
// ou objets contenant le vin (clé `w` ou `wine`). Retourne les vins.
export function diversifyByRegion(scored, n = 5) {
  const getWine = x => x?.w || x?.wine || x
  const picked = []
  const seenRegions = new Set()
  const seenIds = new Set()
  // 1er passage : glouton, une seule bouteille par région
  for (const x of scored) {
    if (picked.length >= n) break
    const w = getWine(x)
    if (seenIds.has(w.id) || seenRegions.has(w.region)) continue
    picked.push(w)
    seenRegions.add(w.region)
    seenIds.add(w.id)
  }
  // 2e passage : si pas assez de régions distinctes, compléter avec les meilleurs restants
  if (picked.length < n) {
    for (const x of scored) {
      if (picked.length >= n) break
      const w = getWine(x)
      if (seenIds.has(w.id)) continue
      picked.push(w)
      seenIds.add(w.id)
    }
  }
  return picked
}

// ── Raisons personnalisées ──────────────────────────────────────────────────
// `criteres` : objet normalisé décrivant ce qui a réellement pesé dans le score.
// Champs reconnus (tous optionnels) :
//   plat ('viande_rouge'…), couleur ('red'…), style ('leger'|'equilibre'|'puissant'|'doux'),
//   budget (nombre €), occasion ('tranquille'|'invites'|'special'|'fete'),
//   sucre ('doux'|'sec'), intensite ('leger'|'equilibre'|'costaud'),
//   fraicheur (bool), fruit (bool), rondeur (bool),
//   niveau ('debutant'|'amateur'|'expert'), profilAppris (bool), regionPref (bool)
// La formulation varie selon le critère dominant et l'id du vin (pas de répétitions).

const PLAT_LABELS = {
  viande_rouge: 'votre viande rouge', volaille: 'la volaille', poisson: 'le poisson',
  pates: 'les pâtes', fromage: 'le fromage', vege: 'un repas léger',
  dessert: 'le dessert', apero: "l'apéro",
}

function pick(variants, seed) {
  return variants[Math.abs(seed) % variants.length]
}

function seedOf(wine) {
  const s = String(wine.id ?? wine.appellation ?? '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}

export function buildRaison(wine, criteres = {}) {
  const c = criteres
  const seed = seedOf(wine)
  const openers = []   // phrase d'accroche selon le critère dominant
  const extras = []    // compléments

  // Style / goût dominant
  const style = c.style || c.intensite
  if (style === 'leger') {
    openers.push(pick([
      `Choisi pour votre goût des vins légers — ${wine.appellation} joue la fraîcheur sans jamais forcer`,
      `Parce que vous aimez ce qui est léger et frais : ici, tout est en finesse`,
    ], seed))
  } else if (style === 'puissant' || style === 'costaud') {
    openers.push(pick([
      `Vous vouliez du caractère — celui-ci en a, avec la puissance qu'il faut`,
      `Choisi pour votre goût des vins qui ont du corps : structure et intensité au rendez-vous`,
    ], seed))
  } else if (style === 'doux') {
    openers.push(pick([
      `La gourmandise que vous cherchiez : de la douceur, tout en rondeur`,
      `Choisi pour votre penchant sucré — un vrai plaisir gourmand`,
    ], seed))
  } else if (style === 'equilibre') {
    openers.push(pick([
      `Vous aimez l'équilibre : ni trop léger, ni trop costaud, juste ce qu'il faut`,
      `Un choix tout en équilibre, comme vous le préfériez`,
    ], seed))
  }

  if (c.sucre === 'doux') {
    openers.push(pick([
      `Parce que vous aimez la douceur : un vin tendre et fruité`,
      `Choisi pour votre goût du sucré — souple et caressant`,
    ], seed))
  } else if (c.sucre === 'sec') {
    openers.push(pick([
      `Parce que vous aimez les vins secs et vifs : de la fraîcheur nette`,
      `Choisi pour votre goût du sec — droit, précis, désaltérant`,
    ], seed))
  }

  if (c.fraicheur) extras.push('sa vivacité colle à votre goût de la fraîcheur')
  if (c.fruit) extras.push('le fruit y est éclatant, comme vous l\'aimez')
  if (c.rondeur) extras.push('sa rondeur devrait vous plaire')

  // Plat
  if (c.plat && PLAT_LABELS[c.plat]) {
    extras.push(pick([
      `il accompagnera à merveille ${PLAT_LABELS[c.plat]}`,
      `un accord tout trouvé avec ${PLAT_LABELS[c.plat]}`,
    ], seed + 1))
  }

  // Occasion
  if (c.occasion === 'invites' && wine.prixMoyen >= 20) extras.push('de quoi impressionner vos invités')
  if (c.occasion === 'special') extras.push('une jolie découverte pour un moment spécial')
  if (c.occasion === 'fete') extras.push('parfait pour faire la fête')
  if (c.occasion === 'tranquille') extras.push('idéal pour une soirée tranquille')

  // Budget
  if (typeof c.budget === 'number' && c.budget < 9999 && wine.prixMoyen <= c.budget) {
    extras.push(pick([
      `le tout sans dépasser votre budget (~${wine.prixMoyen} €)`,
      `et à ~${wine.prixMoyen} €, il reste dans votre budget`,
    ], seed + 2))
  }

  // Niveau
  if (c.niveau === 'debutant' && wine.difficulte === 'facile') {
    extras.push('facile à aimer, parfait pour débuter')
  }
  if (c.niveau === 'expert' && wine.difficulte !== 'facile') {
    extras.push('un profil qui parlera à votre palais averti')
  }

  // Profil appris / région préférée
  if (c.profilAppris) extras.push('vos dégustations notées penchent dans ce sens')
  if (c.regionPref) extras.push(`et ${wine.region}, c'est une de vos régions de cœur`)

  // Assemblage : accroche + 1 ou 2 compléments max, ton chaleureux
  const opener = openers[0] || pick([
    `Un vin qui coche vos critères de ce soir`,
    `Une valeur sûre au vu de vos réponses`,
  ], seed)
  const chosen = extras.slice(0, 2)
  let phrase = opener
  if (chosen.length) phrase += ' — ' + chosen.join(', ')
  return phrase + '.'
}
