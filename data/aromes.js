// ═══════════════════════════════════════════════════════════════════════════
// aromes — les 8 grandes familles d'arômes du vin, expliquées pour néophytes.
// Utilisé par la Roue des arômes (landing) : couleurs riches accordées à la
// palette Œno, explications sans jargon, exemples concrets, mots-clés pour
// retrouver les vins de WINE_DB dont le champ `aromes` correspond.
// ═══════════════════════════════════════════════════════════════════════════

export const AROME_FAMILLES = [
  {
    id: 'fruits-rouges',
    label: 'Fruits rouges',
    labelLignes: ['Fruits', 'rouges'],
    couleurs: ['#c22a47', '#7d1330'], // rouge cerise
    explication: "La famille la plus facile à reconnaître : fermez les yeux et pensez à un panier de fraises ou à un clafoutis aux cerises. On la retrouve surtout dans les rouges légers et frais — ceux qu'on sert un peu rafraîchis.",
    exemples: ['la confiture de fraises', 'la cerise bien mûre', 'la framboise écrasée'],
    motsCles: ['cerise', 'fraise', 'framboise', 'groseille', 'fruits rouges', 'grenadine', 'kirsch'],
  },
  {
    id: 'fruits-noirs',
    label: 'Fruits noirs',
    labelLignes: ['Fruits', 'noirs'],
    couleurs: ['#6d3580', '#331543'], // violet prune
    explication: "Plus sombre et plus profond que les fruits rouges : cassis, mûre, myrtille. C'est la signature des grands rouges puissants, de Bordeaux au Rhône. Si le vin sent la confiture de mûres, vous y êtes.",
    exemples: ['la confiture de mûres', 'le sirop de cassis', 'le pruneau'],
    motsCles: ['cassis', 'mûre', 'myrtille', 'prune', 'fruits noirs', 'pruneau'],
  },
  {
    id: 'agrumes',
    label: 'Agrumes',
    labelLignes: ['Agrumes'],
    couleurs: ['#dfae2a', '#9b7110'], // jaune citron
    explication: "Citron, pamplemousse, mandarine : les arômes qui donnent envie de se resservir. C'est la marque des blancs vifs et frais, parfaits à l'apéritif ou avec des fruits de mer.",
    exemples: ['le zeste de citron', 'le pamplemousse rose', 'la mandarine épluchée'],
    motsCles: ['citron', 'pamplemousse', 'agrume', 'orange', 'mandarine', 'zeste', 'bergamote'],
  },
  {
    id: 'fleurs',
    label: 'Fleurs',
    labelLignes: ['Fleurs'],
    couleurs: ['#d98ea1', '#a65a72'], // rose poudré
    explication: "Violette, rose, tilleul… Oui, un vin peut sentir le bouquet de fleurs. On les trouve dans les rouges élégants comme dans les blancs délicats. Un signe de finesse, presque toujours.",
    exemples: ['un bouquet de violettes', "l'eau de rose", 'le tilleul en fleur'],
    motsCles: ['violette', 'rose', 'fleur', 'acacia', 'aubépine', 'tilleul', 'jasmin', 'pivoine', 'chèvrefeuille', 'iris', 'lilas'],
  },
  {
    id: 'epices',
    label: 'Épices',
    labelLignes: ['Épices'],
    couleurs: ['#c96f2c', '#8a4416'], // orange épice
    explication: "Poivre, réglisse, cannelle : le rayon épices de votre cuisine, version vin. C'est souvent la Syrah qui parle — ou un élevage patient. Ces vins adorent les plats mijotés et les grillades.",
    exemples: ['le poivre du moulin', 'le bâton de réglisse', 'la cannelle'],
    motsCles: ['poivre', 'épice', 'réglisse', 'cannelle', 'girofle', 'garrigue', 'safran', 'muscade', 'anis'],
  },
  {
    id: 'boise',
    label: 'Boisé / Vanille',
    labelLignes: ['Boisé', 'Vanille'],
    couleurs: ['#8a5a38', '#4e2f1a'], // brun boisé
    explication: "Vanille, cèdre, fumée, tabac : ces arômes viennent surtout de l'élevage en fût de chêne. Bien dosés, ils enrobent le vin comme un écrin. On les retrouve dans les rouges de garde et les grands blancs.",
    exemples: ['la vanille', 'le crayon qu\'on taille', 'la fumée de cheminée'],
    motsCles: ['vanille', 'cèdre', 'boisé', 'tabac', 'fumée', 'toast', 'cuir', 'café', 'cacao', 'chocolat', 'chêne', 'sous-bois', 'goudron', 'moka'],
  },
  {
    id: 'beurre',
    label: 'Beurré / Brioché',
    labelLignes: ['Beurré', 'Brioché'],
    couleurs: ['#cda44a', '#927219'], // doré beurre
    explication: "Beurre frais, brioche tiède, noisette grillée : des arômes gourmands de boulangerie. C'est la signature des grands Chardonnays de Bourgogne et des Champagnes qui ont pris leur temps.",
    exemples: ['le croissant encore chaud', 'le beurre frais', 'la noisette grillée'],
    motsCles: ['beurre', 'brioche', 'noisette', 'amande', 'miel', 'pâtisserie', 'viennoiserie', 'fruits secs', 'crème'],
  },
  {
    id: 'mineral',
    label: 'Minéral',
    labelLignes: ['Minéral'],
    couleurs: ['#6e7b85', '#3d454c'], // gris ardoise
    explication: "Le plus mystérieux : pierre mouillée, silex, air marin. Difficile à décrire, impossible à oublier. C'est la sensation de fraîcheur « caillouteuse » des grands blancs tendus, de Chablis à Sancerre.",
    exemples: ['les galets mouillés', 'la pierre à fusil', "l'air marin"],
    motsCles: ['pierre', 'silex', 'minéral', 'iode', 'craie', 'fusil', 'coquillage', 'saline', 'embruns', 'ardoise', 'pétrole'],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

// Normalisation : minuscules + accents retirés (matching tolérant)
export const normaliser = s =>
  (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Les vins de WINE_DB dont le champ `aromes` évoque cette famille.
// Match en début de mot (\b) pour éviter les faux positifs (ex. « parfumé »).
export function vinsPourFamille(famille, wineDb, max = 3) {
  const regexes = famille.motsCles.map(k => new RegExp(`\\b${escapeRegex(normaliser(k))}`))
  return wineDb
    .filter(w => {
      const a = normaliser(w.aromes)
      return regexes.some(r => r.test(a))
    })
    .slice(0, max)
}
