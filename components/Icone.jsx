// ═══════════════════════════════════════════════════════════════════════════
// Icone — le registre d'emojis d'Œno, source unique de tous les repères
// visuels de l'app. Un emoji se reconnaît instantanément, sans lire : c'est
// le guide le plus rapide pour l'utilisateur.
//
//   <Icone nom="viande_rouge" size={22} />   → 🥩
//
// `nom` est une clé sémantique (plat, arôme, région, style, budget…). Une clé
// inconnue retombe sur 🍷 : jamais de trou dans l'interface.
// ═══════════════════════════════════════════════════════════════════════════

const REGISTRE = {
  // ── Plats & accords ──────────────────────────────────────────────────────
  viande_rouge: '🥩',
  viande_blanche: '🍗',
  poisson: '🐟',
  fruits_mer: '🦞',
  fromage: '🧀',
  dessert: '🍮',
  vegetarien: '🥗',
  vege: '🥗',
  charcuterie: '🥓',
  pates: '🍝',
  pizza: '🍕',
  grillades: '🔥',
  apero: '🥜',
  aperitif: '🥂',
  champignon: '🍄',
  champignons: '🍄',
  foie_gras: '⭐',
  volaille: '🐔',
  gibier: '🦌',
  oeuf: '🥚',
  legume: '🥕',
  boeuf: '🐂',
  agneau: '🐑',
  canard: '🦆',
  poulet: '🐔',
  veau: '🐄',
  porc: '🐖',
  lapin: '🐇',
  viande_tout: '🍖',

  // ── Arômes & profils de goût ─────────────────────────────────────────────
  fruits_rouges: '🍓',
  fruits_noirs: '🫐',
  fruits_jaunes: '🍑',
  agrumes: '🍋',
  floral: '🌸',
  boise: '🌲',
  epice: '🌶️',
  epices: '🌶️',
  mineral: '💎',
  miel: '🍯',
  brioche: '🥐',
  doux: '🍯',
  sec: '🍋',
  leger: '🪶',
  puissant: '💪',
  equilibre: '⚖️',
  souple: '🪶',
  tannique: '🌵',
  frais: '❄️',
  vif: '❄️',

  // ── Couleurs de vin ──────────────────────────────────────────────────────
  rouge: '🍷',
  blanc: '🥂',
  rose: '🌸',
  effervescent: '🍾',
  liquoreux: '🍯',
  hasard: '🎲',

  // ── Régions & terroirs ───────────────────────────────────────────────────
  chateau: '🏰',
  vigne: '🍇',
  soleil: '☀️',
  montagne: '⛰️',
  mer: '🌊',
  foret: '🌲',
  monument: '🏯',
  port: '⚓',
  ble: '🌾',
  pluie: '🌧️',
  chaleur: '🌡️',
  nature: '🌿',

  // ── Niveaux & profils utilisateur ────────────────────────────────────────
  debutant: '🌱',
  amateur: '🍷',
  expert: '🎓',
  incertain: '🤷',

  // ── Le quotidien, pas le vin ─────────────────────────────────────────────
  // Le questionnaire de goût déduit le palais depuis le petit-déjeuner et les
  // desserts : c'est tout son intérêt, et il perdrait tout à être illustré de
  // verres de vin. D'où ces clés qui ne parlent que de la vie de tous les jours.
  cafe: '☕',
  the: '🍵',
  chocolat_chaud: '🍫',
  jus_fruits: '🧃',
  confiture: '🍓',
  beurre_sale: '🧈',
  citron_miel: '🍋',
  avocat_piment: '🥑',
  tarte_citron: '🥧',
  creme_brulee: '🍨',
  fondant_chocolat: '🍫',
  salade_fruits: '🍇',
  cote_de_boeuf: '🐂',
  ramen: '🍜',
  raclette: '🫕',
  pates_tomate: '🍅',

  // ── Appétit de découverte ────────────────────────────────────────────────
  valeurs_sures: '🛋️',
  curieux: '🧭',
  aventurier: '🚀',

  // ── Prix, prestige, occasions ────────────────────────────────────────────
  diner_amis: '👥',
  cadeau: '🎁',
  cave_depart: '🏠',
  grande_occasion: '🥂',
  petit_prix: '🪙',
  budget: '💶',
  prestige: '💰',
  illimite: '👑',
  rare: '💎',
  fete: '🎉',
  millesime: '📅',
  actualite: '📰',
  tendance: '📈',
  conseil: '💡',
  favori: '⭐',
  decouverte: '🌍',
  main: '👋',
  scan: '📷',
  cave: '🍾',
  carte: '🗺️',
  livre: '📚',
  recherche: '🔍',
  assistant: '✨',
  panier: '🛒',
  coeur: '❤️',
  temps: '⏳',
  temperature: '🌡️',
  carafe: '🍶',
}

const NEUTRE = '🍷'

export function emojiDe(nom) {
  return REGISTRE[nom] || NEUTRE
}

// `strokeWidth` est absorbé : hérité des anciens appels d'icônes vectorielles,
// il n'a aucun sens sur un emoji et polluerait le DOM.
export default function Icone({ nom, size = 18, className = '', style, strokeWidth, ...rest }) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={`inline-block leading-none select-none ${className}`}
      style={{ fontSize: size, lineHeight: 1, ...style }}
      {...rest}
    >
      {emojiDe(nom)}
    </span>
  )
}
