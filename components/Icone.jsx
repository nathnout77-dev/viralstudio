import {
  Beef, Drumstick, Fish, Shell, Salad, Cake, Ham, Soup, Pizza, Flame, Nut,
  Wheat, Grape, Citrus, Cherry, Apple, Leaf, Sprout, GraduationCap, Wine,
  Snowflake, Sun, Mountain, Castle, Waves, TreePine, Landmark, Anchor,
  Crown, Gem, Coins, Banknote, Feather, Dumbbell, Scale, Flower2, Calendar,
  HelpCircle, Sparkles, Globe, Bird, Rabbit, Beer, Croissant, Candy,
  ThermometerSun, CloudRain, Hand, Milk, Egg, Carrot, Star, Lightbulb,
  PartyPopper, Newspaper, TrendingUp, Layers, Droplets,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Icone — registre sémantique unique de l'app. Œno n'affiche plus AUCUN emoji :
// chaque repère visuel passe par une icône vectorielle, nette à toute taille,
// cohérente en épaisseur de trait et colorable par le thème.
//
//   <Icone nom="viande_rouge" size={20} className="text-wine-700" />
//
// `nom` est une clé sémantique (plat, arôme, région, style…). Une clé inconnue
// retombe silencieusement sur une icône neutre : jamais de trou dans l'UI.
// ═══════════════════════════════════════════════════════════════════════════

const REGISTRE = {
  // ── Plats & accords ──────────────────────────────────────────────────────
  viande_rouge: Beef,
  viande_blanche: Drumstick,
  poisson: Fish,
  fruits_mer: Shell,
  fromage: Milk,
  dessert: Cake,
  vegetarien: Salad,
  charcuterie: Ham,
  pates: Pizza,
  pizza: Pizza,
  grillades: Flame,
  apero: Nut,
  epice: Flame,
  champignon: Soup,
  champignons: Soup,
  foie_gras: Crown,
  vege: Salad,
  volaille: Bird,
  gibier: Rabbit,
  oeuf: Egg,
  legume: Carrot,
  boeuf: Beef,
  agneau: Beef,
  canard: Bird,
  poulet: Bird,
  veau: Milk,
  porc: Ham,
  lapin: Rabbit,
  viande_tout: Beef,

  // ── Arômes & profils de goût ─────────────────────────────────────────────
  fruits_rouges: Cherry,
  fruits_noirs: Grape,
  fruits_jaunes: Apple,
  agrumes: Citrus,
  floral: Flower2,
  boise: TreePine,
  epices: Flame,
  mineral: Mountain,
  miel: Candy,
  brioche: Croissant,
  doux: Candy,
  sec: Citrus,
  leger: Feather,
  puissant: Dumbbell,
  equilibre: Scale,
  souple: Feather,
  tannique: Layers,
  frais: Snowflake,
  vif: Snowflake,

  // ── Couleurs de vin ──────────────────────────────────────────────────────
  rouge: Wine,
  blanc: Wine,
  rose: Wine,
  effervescent: Sparkles,
  liquoreux: Droplets,
  hasard: Sparkles,
  illimite: Crown,

  // ── Régions & terroirs ───────────────────────────────────────────────────
  chateau: Castle,
  vigne: Grape,
  soleil: Sun,
  montagne: Mountain,
  mer: Waves,
  foret: TreePine,
  monument: Landmark,
  port: Anchor,
  ble: Wheat,
  pluie: CloudRain,
  chaleur: ThermometerSun,

  // ── Niveaux & profils utilisateur ────────────────────────────────────────
  debutant: Sprout,
  amateur: Wine,
  expert: GraduationCap,
  incertain: HelpCircle,

  // ── Prix, prestige, occasions ────────────────────────────────────────────
  petit_prix: Coins,
  budget: Banknote,
  prestige: Crown,
  rare: Gem,
  fete: PartyPopper,
  millesime: Calendar,
  actualite: Newspaper,
  tendance: TrendingUp,
  conseil: Lightbulb,
  favori: Star,
  decouverte: Globe,
  aperitif: Beer,
  main: Hand,
  nature: Leaf,
}

const NEUTRE = Wine

export function iconeDe(nom) {
  return REGISTRE[nom] || NEUTRE
}

export default function Icone({ nom, size = 18, className = '', strokeWidth = 1.7, ...rest }) {
  const Composant = iconeDe(nom)
  return <Composant size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...rest} />
}
