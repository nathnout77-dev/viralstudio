// ── Simulateur de dégustation : moteur de prédiction ────────────────────────
// Construit « l'avis d'Œno » avant ouverture d'une bouteille : robe attendue,
// arômes à chercher, bouche (attaque / milieu / finale), idée du vin et
// objectif. Fonctionne pour n'importe quel vin — fiche WINE_DB, bouteille de
// la cave ou étiquette scannée — grâce à trois niveaux de connaissance :
//   1. 'bibliotheque' : le vin est dans WINE_DB → prédiction complète et fiable
//   2. 'cepages'      : on déduit le profil des cépages lus sur l'étiquette
//   3. 'type'         : à défaut, estimation générale par couleur du vin

import { WINE_DB } from '../data/wineDatabase'
import { AROME_FAMILLES, normaliser } from '../data/aromes'

// Profils des grands cépages : arômes typiques + jauges (1-5).
// Sert quand le vin n'est pas dans la bibliothèque.
const CEPAGE_PROFILS = {
  // Rouges
  'pinot noir':          { aromes: ['cerise', 'framboise', 'sous-bois'], jauges: { puissance: 2, douceur: 1, tanins: 2 } },
  'gamay':               { aromes: ['cerise', 'fraise', 'grenadine'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'cabernet sauvignon':  { aromes: ['cassis', 'cèdre', 'poivron grillé'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'cabernet franc':      { aromes: ['framboise', 'poivron', 'violette'], jauges: { puissance: 3, douceur: 1, tanins: 3 } },
  'merlot':              { aromes: ['prune', 'mûre', 'chocolat'], jauges: { puissance: 3, douceur: 1, tanins: 3 } },
  'syrah':               { aromes: ['poivre', 'violette', 'fruits noirs'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'grenache':            { aromes: ['fraise confite', 'garrigue', 'épices'], jauges: { puissance: 4, douceur: 1, tanins: 3 } },
  'mourvèdre':           { aromes: ['mûre', 'cuir', 'garrigue'], jauges: { puissance: 5, douceur: 1, tanins: 5 } },
  'carignan':            { aromes: ['fruits noirs', 'garrigue', 'réglisse'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'cinsault':            { aromes: ['fraise', 'fleurs', 'grenadine'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'malbec':              { aromes: ['mûre', 'violette', 'cacao'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'côt':                 { aromes: ['mûre', 'violette', 'cacao'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'tannat':              { aromes: ['fruits noirs', 'réglisse', 'tabac'], jauges: { puissance: 5, douceur: 1, tanins: 5 } },
  'nielluccio':          { aromes: ['cerise noire', 'maquis', 'épices'], jauges: { puissance: 4, douceur: 1, tanins: 4 } },
  'sangiovese':          { aromes: ['cerise', 'tomate séchée', 'cuir'], jauges: { puissance: 3, douceur: 1, tanins: 4 } },
  'tempranillo':         { aromes: ['fruits rouges', 'vanille', 'cuir'], jauges: { puissance: 3, douceur: 1, tanins: 3 } },
  'nebbiolo':            { aromes: ['rose', 'goudron', 'cerise'], jauges: { puissance: 4, douceur: 1, tanins: 5 } },
  // Blancs
  'chardonnay':          { aromes: ['beurre', 'noisette', 'citron confit'], jauges: { puissance: 3, douceur: 1, tanins: 1 } },
  'sauvignon blanc':     { aromes: ['pamplemousse', 'buis', 'pierre à fusil'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'sauvignon':           { aromes: ['pamplemousse', 'buis', 'pierre à fusil'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'chenin':              { aromes: ['coing', 'miel', 'tilleul'], jauges: { puissance: 3, douceur: 2, tanins: 1 } },
  'riesling':            { aromes: ['citron vert', 'pierre mouillée', 'fleurs blanches'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'gewurztraminer':      { aromes: ['litchi', 'rose', 'épices douces'], jauges: { puissance: 3, douceur: 4, tanins: 1 } },
  'pinot gris':          { aromes: ['poire', 'miel', 'fumée'], jauges: { puissance: 3, douceur: 3, tanins: 1 } },
  'viognier':            { aromes: ['abricot', 'pêche', 'violette'], jauges: { puissance: 3, douceur: 2, tanins: 1 } },
  'marsanne':            { aromes: ['amande', 'fleurs blanches', 'miel'], jauges: { puissance: 3, douceur: 1, tanins: 1 } },
  'roussanne':           { aromes: ['abricot', 'aubépine', 'miel'], jauges: { puissance: 3, douceur: 1, tanins: 1 } },
  'melon de bourgogne':  { aromes: ['citron', 'iode', 'coquillage'], jauges: { puissance: 1, douceur: 1, tanins: 1 } },
  'aligoté':             { aromes: ['citron', 'pomme verte', 'craie'], jauges: { puissance: 1, douceur: 1, tanins: 1 } },
  'muscat':              { aromes: ['raisin frais', 'fleur d\'oranger', 'menthe'], jauges: { puissance: 2, douceur: 3, tanins: 1 } },
  'sémillon':            { aromes: ['miel', 'abricot confit', 'cire'], jauges: { puissance: 3, douceur: 3, tanins: 1 } },
  'savagnin':            { aromes: ['noix', 'curry', 'pomme verte'], jauges: { puissance: 4, douceur: 1, tanins: 1 } },
  'mauzac':              { aromes: ['pomme au four', 'poire', 'fleurs'], jauges: { puissance: 2, douceur: 2, tanins: 1 } },
  'petit manseng':       { aromes: ['ananas rôti', 'mangue', 'miel'], jauges: { puissance: 3, douceur: 4, tanins: 1 } },
  'gros manseng':        { aromes: ['agrumes confits', 'fruits exotiques'], jauges: { puissance: 3, douceur: 2, tanins: 1 } },
  'vermentino':          { aromes: ['agrumes', 'fenouil', 'fleurs blanches'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'rolle':               { aromes: ['agrumes', 'fenouil', 'fleurs blanches'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'picpoul':             { aromes: ['citron', 'iode', 'fleurs blanches'], jauges: { puissance: 1, douceur: 1, tanins: 1 } },
  'jacquère':            { aromes: ['pierre', 'agrumes', 'herbe fraîche'], jauges: { puissance: 1, douceur: 1, tanins: 1 } },
  'altesse':             { aromes: ['bergamote', 'miel', 'amande'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'clairette':           { aromes: ['pomme', 'fenouil', 'fleurs'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
}

// Estimation générale quand on ne connaît ni la fiche ni les cépages.
const TYPE_FALLBACK = {
  red:       { aromes: ['fruits rouges', 'épices'], jauges: { puissance: 3, douceur: 1, tanins: 3 } },
  white:     { aromes: ['agrumes', 'fleurs blanches'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  'rosé':    { aromes: ['fraise', 'agrumes', 'grenadine'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  sparkling: { aromes: ['brioche', 'pomme verte', 'agrumes'], jauges: { puissance: 2, douceur: 1, tanins: 1 } },
  sweet:     { aromes: ['miel', 'abricot confit', 'fruits exotiques'], jauges: { puissance: 3, douceur: 5, tanins: 1 } },
}

// ── Recherche du vin dans WINE_DB (par appellation, tolérante) ───────────────
// IMPORTANT : les variantes de couleur d'une même appellation ("Menetou-Salon"
// blanc, "Menetou-Salon Rouge", "Menetou-Salon Rosé") ont des noms qui se
// contiennent. Une simple recherche par sous-chaîne + first-match renverrait la
// mauvaise couleur (ex. clic sur le rouge → fiche du blanc). On privilégie donc,
// dans l'ordre : l'id exact → l'appellation exacte de la bonne couleur →
// l'appellation approximative de la bonne couleur.
export function matchBibliotheque(vin) {
  // 1. Correspondance directe par id (carte, cave, fiche transmettent l'objet complet)
  if (vin?.id) {
    const parId = WINE_DB.find(w => w.id === vin.id)
    if (parId) return parId
  }

  const app = normaliser(vin?.appellation || vin?.nom)
  if (!app) return null
  const memeCouleur = w => !vin?.type || w.type === vin.type

  // 2. Appellation exacte (ex. "Menetou-Salon")
  const exacts = WINE_DB.filter(w => normaliser(w.appellation) === app)
  // 3. Variantes de couleur : "X" ↔ "X Rouge/Blanc/Rosé" (l'une préfixe l'autre au mot près).
  //    Couvre une étiquette scannée « Menetou-Salon » dont la couleur lue est le rouge.
  const variantes = WINE_DB.filter(w => {
    const wa = normaliser(w.appellation)
    return wa === app || wa.startsWith(app + ' ') || app.startsWith(wa + ' ')
  })
  // 4. Rapprochement approximatif (sous-chaîne) — dernier recours pour un libellé partiel.
  const flous = WINE_DB.filter(w => {
    const wa = normaliser(w.appellation)
    return app.includes(wa) || wa.includes(app)
  })

  // Couleur demandée d'abord (exact > variante > flou), sinon repli sur le plus proche.
  return (
    exacts.find(memeCouleur) ||
    variantes.find(memeCouleur) ||
    flous.find(memeCouleur) ||
    exacts[0] || variantes[0] || flous[0] || null
  )
}

// Famille aromatique d'un arôme donné (pour l'astuce « pensez à… »)
function familleDe(arome) {
  const a = normaliser(arome)
  return AROME_FAMILLES.find(f => f.motsCles.some(k => a.includes(normaliser(k)))) || null
}

// ── Robe attendue ─────────────────────────────────────────────────────────────
function predireRobe(type, jauges, millesime) {
  const age = millesime ? new Date().getFullYear() - millesime : null
  if (type === 'white') {
    if ((jauges.douceur || 1) >= 4) return { texte: 'Or doré, presque ambré — les vins doux sont plus foncés. Faites tourner le verre : les « larmes » qui coulent lentement trahissent la richesse.', chips: ['Doré', 'Ambré'] }
    if ((jauges.puissance || 1) >= 3) return { texte: 'Jaune paille aux reflets dorés — signe d\'un blanc avec de la matière, souvent élevé en fût.', chips: ['Paille', 'Doré'] }
    return { texte: 'Or pâle aux reflets verts, limpide et brillant — la signature des blancs jeunes et vifs.', chips: ['Or pâle', 'Paille'] }
  }
  if (type === 'rosé') return { texte: 'Rose pâle aux reflets saumonés — plus la robe est claire, plus le style est frais et délicat.', chips: ['Rosé pâle', 'Saumon'] }
  if (type === 'sparkling') return { texte: 'Or pâle animé de bulles fines et régulières : plus le cordon de bulles est fin et persistant, meilleur c\'est signe.', chips: ['Or pâle', 'Paille'] }
  if (type === 'sweet') return { texte: 'Or intense tirant vers l\'ambre, presque sirupeux dans le verre.', chips: ['Doré', 'Ambré'] }
  // Rouge
  const puissance = jauges.puissance || 3
  if (age !== null && age >= 8) return { texte: `Robe évoluée après ${age} ans : le rouge vif laisse place au grenat, avec des reflets tuilés (orangés) sur le bord du verre — c'est normal, et même bon signe.`, chips: ['Grenat', 'Tuilé'] }
  if (puissance >= 4) return { texte: 'Grenat profond, presque noir au cœur du verre — on devine la concentration avant même de sentir.', chips: ['Grenat', 'Pourpre'] }
  if (puissance <= 2) return { texte: 'Rubis clair et brillant, presque translucide — annonce un rouge léger, sur le fruit.', chips: ['Rubis'] }
  return { texte: 'Rubis intense aux reflets violacés si le vin est jeune.', chips: ['Rubis', 'Pourpre'] }
}

// ── Bouche : attaque / milieu / finale depuis les jauges ─────────────────────
function predireBouche(type, jauges) {
  const p = jauges.puissance || 3
  const d = jauges.douceur || 1
  const t = jauges.tanins || 1
  const attaque = d >= 4 ? 'Ronde et moelleuse : le sucre enrobe immédiatement le palais.'
    : d >= 2 ? 'Souple, un léger fondant dès la première gorgée.'
    : (type === 'white' || type === 'sparkling') ? 'Vive et fraîche : une pointe d\'acidité qui réveille, comme croquer dans un fruit.'
    : 'Franche et nette, sans sucre — le fruit arrive tout de suite.'
  const milieu = p >= 4 ? 'Ample et puissant : le vin emplit toute la bouche, on sent la matière.'
    : p === 3 ? 'Équilibré : du fruit, de la matière, sans excès d\'un côté ni de l\'autre.'
    : 'Léger et fluide, tout en fraîcheur — il se boit facilement.'
  const finale = (type === 'white' || type === 'sparkling' || type === 'rosé' || type === 'sweet')
    ? (p >= 3 ? 'Finale longue et persistante : les arômes restent plusieurs secondes après la gorgée.' : 'Finale fraîche et désaltérante, qui appelle la gorgée suivante.')
    : t >= 4 ? 'Tanins fermes qui « serrent » légèrement les gencives — c\'est la charpente du vin, signe qu\'il peut vieillir.'
    : t >= 2 ? 'Tanins présents mais fondus : une texture veloutée, sans âpreté.'
    : 'Finale souple, sans aucune accroche — tout en fruit.'
  return { attaque, milieu, finale }
}

// ── Objectif du vin : ce qu'il cherche à faire, et quand il est « réussi » ───
function predireObjectif(vin, jauges, difficulte) {
  if (difficulte === 'facile') return 'Faire plaisir immédiatement : du fruit, de la souplesse, zéro prise de tête. Réussi si vous avez envie d\'un second verre sans réfléchir.'
  if (difficulte === 'pointu') return 'Vous surprendre et vous faire réfléchir : c\'est un vin de caractère, qui ne cherche pas à plaire à tout le monde. Réussi s\'il vous a raconté quelque chose que vous n\'aviez jamais goûté.'
  if (difficulte === 'explorer') return 'Vous emmener un cran plus loin que d\'habitude : plus de complexité, plus de nuances. Réussi si vous découvrez de nouveaux arômes à chaque gorgée.'
  const p = jauges.puissance || 3
  if (vin.type === 'sparkling') return 'Célébrer : fraîcheur, bulles et légèreté. Réussi si la finesse des bulles vous donne le sourire.'
  if (vin.type === 'sweet') return 'La gourmandise assumée : sucre, richesse et arômes confits. Réussi si l\'acidité équilibre le sucre — jamais écœurant.'
  if (p >= 4) return 'Impressionner par la matière et la profondeur. Réussi si la puissance reste équilibrée, sans lourdeur.'
  return 'L\'équilibre et le plaisir de table. Réussi s\'il accompagne le repas sans jamais le dominer.'
}

// ── Prédiction complète ──────────────────────────────────────────────────────
// vin : { nom, appellation, domaine, millesime, region, type, cepages,
//         aromes?, jauges?, enUneMot?, pourQui?, difficulte?, temperature?,
//         carafage?, description? }  — seuls nom/appellation sont requis.
export function construirePrediction(vin) {
  const ref = matchBibliotheque(vin)

  // Fusion des connaissances : bibliothèque > données fournies > cépages > type
  const type = ref?.type || vin.type || 'red'
  const cepages = (ref?.cepages?.length ? ref.cepages : vin.cepages) || []
  const profilsCepages = cepages
    .map(c => CEPAGE_PROFILS[normaliser(c)])
    .filter(Boolean)

  let source, jauges, aromesListe
  if (ref) {
    source = 'bibliotheque'
    jauges = ref.jauges
    aromesListe = (ref.aromes || '').split(',').map(s => s.trim()).filter(Boolean)
  } else {
    // Jauges et arômes se complètent indépendamment : une découverte enrichie
    // par le web a des arômes mais pas de jauges, un scan brut a des cépages…
    const fb = TYPE_FALLBACK[type] || TYPE_FALLBACK.red
    const moy = k => Math.round(profilsCepages.reduce((s, p) => s + p.jauges[k], 0) / profilsCepages.length)
    const jaugesCepages = profilsCepages.length > 0
      ? { puissance: moy('puissance'), douceur: moy('douceur'), tanins: moy('tanins') }
      : null
    jauges = vin.jauges || jaugesCepages || fb.jauges
    const aromesFournis = String(vin.aromes || '').split(',').map(s => s.trim()).filter(Boolean)
    aromesListe = aromesFournis.length > 0 ? aromesFournis
      : profilsCepages.length > 0 ? [...new Set(profilsCepages.flatMap(p => p.aromes))]
      : fb.aromes
    source = (vin.jauges || aromesFournis.length > 0) ? 'verifie'
      : profilsCepages.length > 0 ? 'cepages'
      : 'type'
  }

  // Nez : 4 arômes max, chacun avec son astuce « pensez à… ».
  // On privilégie l'exemple de la famille qui évoque l'arôme lui-même
  // (framboise → « la framboise écrasée », pas « la confiture de fraises »).
  const nez = aromesListe.slice(0, 4).map(a => {
    const fam = familleDe(a)
    const astuce = fam
      ? fam.exemples.find(e => normaliser(e).includes(normaliser(a).split(' ')[0])) || fam.exemples[0]
      : null
    return { arome: a, famille: fam?.label || null, astuce }
  })

  const millesime = vin.millesime || null
  const difficulte = ref?.difficulte || vin.difficulte || null

  return {
    source,
    fiabilite: {
      bibliotheque: { label: 'Fiche Œno — prédiction fiable' },
      verifie: { label: 'Données connues de ce vin — prédiction solide' },
      cepages: { label: `Déduit des cépages (${cepages.join(', ')})` },
      type: { label: 'Estimation générale — à affiner en dégustant' },
    }[source],
    nom: ref?.appellation || vin.appellation || vin.nom || 'Ce vin',
    domaine: vin.domaine || '',
    millesime,
    type,
    robe: predireRobe(type, jauges, millesime),
    nez,
    bouche: predireBouche(type, jauges),
    jauges,
    idee: {
      enUneMot: ref?.enUneMot || vin.enUneMot || null,
      pourQui: ref?.pourQui || vin.pourQui || null,
    },
    objectif: predireObjectif({ ...vin, type }, jauges, difficulte),
    service: {
      temperature: ref?.temperature || vin.temperature || ({ red: '16-18°C', white: '10-12°C', 'rosé': '8-10°C', sparkling: '7-9°C', sweet: '8-10°C' }[type]),
      carafage: ref?.carafage ?? vin.carafage ?? null,
    },
  }
}
