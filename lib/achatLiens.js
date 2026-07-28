// ═══════════════════════════════════════════════════════════════════════════
// Où acheter cette bouteille — deux clics, jamais zéro résultat.
//
// Aucun vin ne doit rester sans porte de sortie : les liens sont construits
// par formule à partir de l'appellation, du domaine et du millésime, donc ils
// existent pour les 703 vins du catalogue comme pour un vin tout juste scanné.
// Ce sont des recherches marchandes, pas des fiches produit : une référence
// épuisée renvoie vers l'équivalent le plus proche au lieu d'une page morte.
// ═══════════════════════════════════════════════════════════════════════════

// Les moteurs marchands digèrent mal les accents dans une URL de recherche.
function sansAccent(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/** Ce qu'on tape dans la barre de recherche du marchand, à la place de l'utilisateur. */
export function requeteAchat(wine, millesime) {
  if (!wine) return ''
  const nom = wine.appellation || wine.name || ''
  const domaine = wine.domaines?.[0]?.name
    // « Château Margaux (Bernard) » → « Château Margaux »
    ?.replace(/\s*\([^)]*\)\s*/g, ' ').trim()

  // Le domaine devant, comme sur une étiquette : c'est ce qui discrimine le
  // plus. On évite de le répéter s'il contient déjà l'appellation.
  const morceaux = []
  if (domaine && !sansAccent(nom).toLowerCase().includes(sansAccent(domaine).toLowerCase())) {
    morceaux.push(domaine)
  }
  morceaux.push(nom)
  if (millesime) morceaux.push(String(millesime))

  return sansAccent(morceaux.join(' ')).replace(/\s+/g, ' ').trim()
}

const enc = q => encodeURIComponent(q)

// ── Les marchands ──────────────────────────────────────────────────────────
// `pour` filtre : 'tous', 'rayon' (vins de supermarché), 'cave' (vins de garde).
const MARCHANDS = [
  {
    id: 'google-shopping',
    nom: 'Comparer les prix',
    detail: 'Tous les marchands, prix en direct',
    emoji: '🔎',
    pour: 'tous',
    url: q => `https://www.google.com/search?tbm=shop&hl=fr&gl=fr&q=${enc(q)}`,
  },
  {
    id: 'vivino',
    nom: 'Vivino',
    detail: 'Avis, notes et achat',
    emoji: '⭐',
    pour: 'tous',
    url: q => `https://www.vivino.com/search/wines?q=${enc(q)}`,
  },
  {
    id: 'wine-searcher',
    nom: 'Wine-Searcher',
    detail: 'La référence mondiale du prix',
    emoji: '🌍',
    pour: 'cave',
    // Wine-Searcher attend des « + » littéraux entre les mots : on encode le
    // reste, puis on rend les espaces sous leur forme attendue.
    url: q => `https://www.wine-searcher.com/find/${enc(q).replace(/%20/g, '+')}`,
  },
  {
    id: 'vinatis',
    nom: 'Vinatis',
    detail: 'Caviste en ligne français',
    emoji: '🍷',
    pour: 'cave',
    url: q => `https://www.vinatis.com/recherche?s=${enc(q)}`,
  },
  {
    id: 'twil',
    nom: 'Twil',
    detail: 'Vins de vignerons',
    emoji: '🌿',
    pour: 'cave',
    url: q => `https://www.twil.fr/catalogsearch/result/?q=${enc(q)}`,
  },
  {
    id: 'carrefour',
    nom: 'Carrefour',
    detail: 'Livraison ou drive',
    emoji: '🛒',
    pour: 'rayon',
    url: q => `https://www.carrefour.fr/s?q=${enc(q)}`,
  },
  {
    id: 'leclerc',
    nom: 'E.Leclerc',
    detail: 'Drive près de chez vous',
    emoji: '🛒',
    pour: 'rayon',
    url: q => `https://www.e.leclerc/recherche?q=${enc(q)}`,
  },
]

/**
 * Les endroits où acheter ce vin, du plus pertinent au plus large.
 * Renvoie toujours au moins deux entrées, quel que soit le vin.
 */
export function liensAchat(wine, millesime = null) {
  const q = requeteAchat(wine, millesime)
  if (!q) return []

  // Un vin de rayon ne se trouve pas chez un caviste de garde, et inversement.
  const famille = wine?.grandPublic ? 'rayon' : 'cave'
  const liste = MARCHANDS
    .filter(m => m.pour === 'tous' || m.pour === famille)
    .map(m => ({ id: m.id, nom: m.nom, detail: m.detail, emoji: m.emoji, url: m.url(q) }))

  // Le site du producteur quand la base le connaît : c'est le lien le plus sûr
  // et le plus juste pour le vigneron, donc il passe devant.
  const domaine = wine?.domaines?.[0]
  if (domaine?.url) {
    liste.unshift({
      id: 'domaine',
      nom: `Chez ${domaine.name.replace(/\s*\([^)]*\)\s*/g, ' ').trim()}`,
      detail: 'Directement chez le producteur',
      emoji: '🏛️',
      url: domaine.url,
      producteur: true,
    })
  }

  return liste
}

/**
 * Le lien à ouvrir si l'on ne veut poser aucune question : comparateur de
 * prix, valable pour n'importe quelle bouteille. Jamais nul.
 */
export function lienAchatDirect(wine, millesime = null) {
  const q = requeteAchat(wine, millesime)
  if (!q) return null
  return MARCHANDS[0].url(q)
}
