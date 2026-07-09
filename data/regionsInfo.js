// ═══════════════════════════════════════════════════════════════════════════
// regionsInfo — courts textes éditoriaux par région, pour la carte narrative.
// 2-3 phrases, ton Œno : simple, chaleureux, sans jargon.
// ═══════════════════════════════════════════════════════════════════════════

export const REGIONS_INFO = {
  'Bordeaux': {
    emoji: '🏰',
    blurb: "Le vignoble le plus célèbre du monde, coupé en deux par la Gironde. Rive gauche, le Cabernet Sauvignon donne des vins puissants et tanniques ; rive droite, le Merlot arrondit tout. Ici naissent les plus grands vins de garde de la planète.",
  },
  'Bourgogne': {
    emoji: '🍇',
    blurb: "Un patchwork de petites parcelles où chaque climat a sa personnalité. Pinot Noir en rouge, Chardonnay en blanc : deux cépages, mille visages selon le sol et le village. La région qui a inventé le mot terroir.",
  },
  'Rhône Nord': {
    emoji: '🌶️',
    blurb: "Des coteaux vertigineux plantés à la main au-dessus du fleuve. La Syrah y donne des rouges épicés et fumés, le Viognier des blancs à l'abricot capiteux. Peu de surface, des vins d'une rare intensité.",
  },
  'Rhône Sud': {
    emoji: '☀️',
    blurb: "Le Sud généreux : galets roulés, garrigue et soleil à revendre. Grenache, Syrah et Mourvèdre s'assemblent pour des rouges chaleureux, accessibles et gourmands, de Châteauneuf-du-Pape aux petits crus voisins.",
  },
  'Loire': {
    emoji: '🏯',
    blurb: "Le plus long fleuve de France traverse tous les styles : blancs vifs de Sauvignon, rouges légers de Cabernet Franc, Chenin caméléon du sec au liquoreux. Une région idéale pour apprendre sans se ruiner.",
  },
  'Alsace': {
    emoji: '🍏',
    blurb: "Coincée entre Vosges et Rhin, l'Alsace cultive des cépages aromatiques rares en France : Riesling, Gewurztraminer, Pinot Gris. Des blancs purs, parfumés, souvent sous-estimés — et parfaits avec la cuisine du monde.",
  },
  'Beaujolais': {
    emoji: '🍒',
    blurb: "Longtemps réduit au Nouveau, le Beaujolais des dix crus est un des meilleurs rapports plaisir-prix de France. Le Gamay, vinifié avec soin, donne des rouges fruités et digestes, parfois capables de vieillir.",
  },
  'Provence': {
    emoji: '🌸',
    blurb: "Le pays du rosé — mais pas seulement. Face à la Méditerranée, le Mourvèdre de Bandol donne aussi l'un des plus grands rouges de garde du Sud. Soleil, garrigue et embruns dans chaque verre.",
  },
  'Languedoc': {
    emoji: '🌾',
    blurb: "Le plus vaste vignoble de France, longtemps discret, aujourd'hui en pleine renaissance qualitative. Syrah, Grenache et vieux Carignan y donnent des rouges généreux et solaires, à des prix encore très raisonnables.",
  },
  'Sud-Ouest': {
    emoji: '🦆',
    blurb: "Une mosaïque de petites appellations à l'ombre de Bordeaux, chacune avec son cépage rare : Malbec à Cahors, Tannat à Madiran, Petit Manseng à Jurançon. Le territoire préféré des amateurs curieux.",
  },
  'Roussillon': {
    emoji: '🍇',
    blurb: "Au pied des Pyrénées, face à la Méditerranée, le Roussillon cultive de très vieilles vignes de Grenache. Rouges denses de Collioure et vins doux naturels de Banyuls s'y côtoient, sur des terrasses vertigineuses.",
  },
  'Jura': {
    emoji: '🥜',
    blurb: "Un tout petit vignoble aux vins uniques au monde. Le Savagnin y donne le mystérieux Vin Jaune, élevé six ans sous voile sans ouillage. Ailleurs, Poulsard et Trousseau signent des rouges légers et originaux.",
  },
  'Savoie': {
    emoji: '⛰️',
    blurb: "Vignoble de montagne planté sur des pentes escarpées face aux Alpes. La Roussanne (Chignin-Bergeron) donne des blancs riches et parfumés — le compagnon idéal des plats de fromage fondu après le ski.",
  },
  'Corse': {
    emoji: '🏝️',
    blurb: "L'Île de Beauté cultive ses propres cépages, introuvables ailleurs : Nielluccio, Sciaccarello. Des vins méditerranéens, solaires, marqués par le maquis — un vignoble encore largement à découvrir.",
  },
  'Espagne': {
    emoji: '🇪🇸',
    blurb: "Du haut plateau castillan aux ardoises du Priorat, l'Espagne assume la puissance. Le Tempranillo y atteint une concentration extrême, pour des rouges denses et taillés pour la garde.",
  },
  'Italie': {
    emoji: '🇮🇹',
    blurb: "Un pays, mille cépages autochtones. Sangiovese en Toscane, Nebbiolo dans le Piémont : des rouges de caractère, souvent tanniques jeunes, mais capables d'un vieillissement magistral.",
  },
  'Portugal': {
    emoji: '🇵🇹',
    blurb: "Berceau du Porto, la vallée du Douro produit aussi d'excellents rouges secs avec les mêmes cépages : Touriga Nacional en tête. Des vins denses, épicés, encore très abordables.",
  },
}

export function regionInfo(region) {
  return REGIONS_INFO[region] || { emoji: '🍷', blurb: `Une région viticole à découvrir : ${region}.` }
}
