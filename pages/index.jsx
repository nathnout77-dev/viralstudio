import { useState, useEffect, useCallback, useRef } from 'react'

// ─── Base œnologique 2017-2025 ────────────────────────────────────────────────
// [millesime, couleur, region, appellation, cepages, gardeMax, qualite, recommandation, commentaire]
const OENO_DB = [
[2017,"Rouge","Bordeaux","Saint-Émilion Grand Cru Classé","Merlot, Cabernet Franc",18,"Hétérogène, gel sévère rive droite","Sélection prudente","Choisir des producteurs ayant trié sévèrement ; volumes faibles"],
[2017,"Liquoreux","Bordeaux","Sauternes 1er Cru","Sémillon, Sauvignon",35,"Bon, botrytis présent","Bon choix","Encore très jeune"],
[2018,"Rouge","Bordeaux","Médoc Cru Classé (Pauillac/Margaux)","Cabernet Sauvignon dominant",28,"Excellent, mûr et concentré","Privilégier","Un des meilleurs millésimes de la décennie"],
[2018,"Rouge","Bordeaux","Médoc Cru Bourgeois","Cabernet Sauvignon, Merlot",10,"Excellent","Privilégier","Très bon rapport qualité-prix"],
[2018,"Blanc","Bordeaux","Pessac-Léognan","Sauvignon, Sémillon",12,"Très bon, riche","Bon choix",null],
[2019,"Rouge","Bordeaux","Pomerol","Merlot dominant",22,"Très bon, élégant","Privilégier",null],
[2019,"Rouge","Bordeaux","Côtes de Bordeaux","Merlot, Cabernet",7,"Bon","Bon choix","À boire sans trop attendre"],
[2020,"Rouge","Bordeaux","Saint-Émilion Grand Cru","Merlot",16,"Bon, volumes faibles","Bon choix",null],
[2021,"Rouge","Bordeaux","Médoc générique","Cabernet, Merlot",6,"Léger, frais, millésime mineur","Sélection prudente","À boire sans trop attendre"],
[2022,"Rouge","Bordeaux","Pauillac Cru Classé","Cabernet Sauvignon",28,"Excellent, très mûr","Privilégier",null],
[2022,"Liquoreux","Bordeaux","Sauternes","Sémillon",38,"Excellent, botrytis idéal","Privilégier",null],
[2023,"Rouge","Bordeaux","Médoc Cru Bourgeois","Cabernet, Merlot",11,"Bon, abondant","Bon choix",null],
[2024,"Rouge","Bordeaux","Bordeaux Supérieur","Merlot",5,"Difficile, pluie, sélection nécessaire","Sélection prudente","Choisir un producteur sérieux"],
[2022,"Rouge","Bordeaux","Saint-Julien Cru Classé","Cabernet Sauvignon",24,"Excellent","Privilégier",null],
[2017,"Rouge","Bourgogne","Pommard 1er Cru","Pinot Noir",14,"Bon, classique","Bon choix",null],
[2017,"Blanc","Bourgogne","Chablis 1er Cru","Chardonnay",9,"Bon, tendu","Bon choix","À boire maintenant"],
[2018,"Rouge","Bourgogne","Gevrey-Chambertin","Pinot Noir",20,"Excellent, mûr","Privilégier",null],
[2018,"Blanc","Bourgogne","Meursault","Chardonnay",15,"Excellent, riche","Privilégier",null],
[2018,"Rouge","Bourgogne","Grand Cru (Chambertin/Romanée)","Pinot Noir",25,"Excellent, exceptionnel","Privilégier","Très haut de gamme, pour grandes occasions"],
[2019,"Rouge","Bourgogne","Vosne-Romanée","Pinot Noir",22,"Excellent, équilibré","Privilégier",null],
[2019,"Blanc","Bourgogne","Puligny-Montrachet","Chardonnay",18,"Excellent","Privilégier",null],
[2020,"Rouge","Bourgogne","Bourgogne village","Pinot Noir",7,"Bon, faible volume","Bon choix",null],
[2021,"Blanc","Bourgogne","Chablis","Chardonnay",8,"Bon pour les blancs, acidité vive","Bon choix",null],
[2021,"Rouge","Bourgogne","Côte de Beaune village","Pinot Noir",8,"Gel sévère, faible volume, plus léger","Sélection prudente",null],
[2022,"Rouge","Bourgogne","Nuits-Saint-Georges 1er Cru","Pinot Noir",18,"Excellent, abondant","Privilégier",null],
[2022,"Blanc","Bourgogne","Mâcon-Villages","Chardonnay",5,"Excellent, mûr","Privilégier",null],
[2023,"Rouge","Bourgogne","Beaune 1er Cru","Pinot Noir",13,"Bon, abondant","Bon choix",null],
[2023,"Blanc","Bourgogne","Saint-Véran","Chardonnay",6,"Bon, abondant","Bon choix",null],
[2024,"Blanc","Bourgogne","Chablis village","Chardonnay",6,"Difficile, mildiou, faible volume","Sélection prudente","Rendements très faibles, qualité variable selon domaines"],
[2018,"Effervescent","Champagne","Champagne Brut Millésimé","Pinot Noir, Chardonnay",15,"Vintage déclaré, riche et mûr","Privilégier",null],
[2019,"Effervescent","Champagne","Champagne Brut Millésimé","Pinot Noir, Chardonnay",18,"Vintage exceptionnel, très équilibré","Privilégier","Un des meilleurs millésimes récents en Champagne"],
[2020,"Effervescent","Champagne","Champagne Brut Millésimé","Chardonnay, Pinot Noir",14,"Bon vintage, mûr","Bon choix",null],
[2022,"Effervescent","Champagne","Champagne Brut Millésimé","Chardonnay, Pinot Noir",16,"Excellent, récolte abondante et qualitative","Privilégier",null],
[2017,"Rouge","Rhône Nord","Côte-Rôtie","Syrah",18,"Chaud, mûr, bon","Bon choix",null],
[2018,"Rouge","Rhône Nord","Hermitage","Syrah",22,"Excellent, puissant","Privilégier",null],
[2019,"Blanc","Rhône Nord","Condrieu","Viognier",7,"Excellent, aromatique","Privilégier","Le Viognier ne se garde pas indéfiniment"],
[2020,"Rouge","Rhône Nord","Saint-Joseph","Syrah",10,"Bon, équilibré","Bon choix",null],
[2022,"Rouge","Rhône Nord","Crozes-Hermitage","Syrah",11,"Excellent, mûr","Privilégier",null],
[2024,"Rouge","Rhône Nord","Saint-Joseph","Syrah",8,"Irrégulier, pluie en cours de saison","Sélection prudente",null],
[2017,"Rouge","Rhône Sud","Lirac","Grenache, Syrah",7,"Bon, déjà à boire","À éviter","Fenêtre de consommation dépassée"],
[2017,"Rouge","Rhône Sud","Châteauneuf-du-Pape","Grenache, Syrah, Mourvèdre",14,"Chaud, généreux","Bon choix",null],
[2018,"Rouge","Rhône Sud","Châteauneuf-du-Pape","Grenache dominant",16,"Excellent, riche","Privilégier",null],
[2019,"Rouge","Rhône Sud","Gigondas","Grenache, Syrah",12,"Excellent","Privilégier",null],
[2020,"Rouge","Rhône Sud","Côtes du Rhône Villages","Grenache, Syrah",7,"Bon","Bon choix",null],
[2021,"Rosé","Rhône Sud","Tavel","Grenache, Cinsault",2,"Frais, bonne acidité","À éviter","Fenêtre de consommation dépassée"],
[2022,"Rouge","Rhône Sud","Châteauneuf-du-Pape (vieilles vignes)","Grenache, Syrah, Mourvèdre",18,"Excellent, très mûr","Privilégier",null],
[2023,"Rouge","Rhône Sud","Côtes du Rhône Village","Grenache, Syrah",8,"Bon","Bon choix",null],
[2017,"Blanc","Loire","Sancerre","Sauvignon Blanc",5,"Faible volume (gel)","À éviter","Trop tardif pour ce style de blanc vif"],
[2018,"Rouge","Loire","Chinon","Cabernet Franc",8,"Bon, mûr","Bon choix","À boire maintenant"],
[2019,"Liquoreux","Loire","Coteaux du Layon","Chenin Blanc",22,"Bon, équilibré","Bon choix",null],
[2020,"Blanc","Loire","Vouvray sec","Chenin Blanc",10,"Bon, sec et tendu","Bon choix",null],
[2021,"Blanc","Loire","Pouilly-Fumé","Sauvignon Blanc",6,"Gel sévère, faible volume, belle acidité","Sélection prudente",null],
[2022,"Rosé","Loire","Anjou rosé","Cabernet Franc, Grolleau",2,"Excellent, mûr","À éviter","Fenêtre de consommation dépassée"],
[2023,"Blanc","Loire","Muscadet sur lie","Melon de Bourgogne",4,"Bon","Bon choix",null],
[2025,"Rosé","Loire","Saumur rosé","Cabernet Franc, Grolleau",2,"Bon, frais, déjà en vente","Bon choix","Millésime tout juste commercialisé"],
[2025,"Blanc","Loire","Sancerre","Sauvignon Blanc",5,"Bon, déjà en vente","Bon choix","Profil frais et vif"],
[2018,"Blanc","Alsace","Riesling Grand Cru","Riesling",15,"Excellent, riche","Privilégier",null],
[2019,"Blanc","Alsace","Gewurztraminer","Gewurztraminer",9,"Bon, aromatique","Bon choix",null],
[2021,"Effervescent","Alsace","Crémant d'Alsace","Pinot Blanc, Auxerrois",5,"Bon, frais","Bon choix","À boire maintenant"],
[2022,"Blanc","Alsace","Pinot Gris","Pinot Gris",7,"Excellent, mûr","Bon choix",null],
[2024,"Blanc","Alsace","Riesling village","Riesling",8,"Difficile, mildiou, faible volume","Sélection prudente",null],
[2018,"Rouge","Provence","Bandol","Mourvèdre",16,"Excellent, structuré","Bon choix",null],
[2021,"Rosé","Provence","Côtes de Provence","Grenache, Cinsault",2,"Bon, frais","À éviter","Fenêtre de consommation dépassée"],
[2022,"Rosé","Provence","Côtes de Provence","Grenache, Cinsault",3,"Excellent millésime","À éviter","Fenêtre de consommation dépassée"],
[2023,"Rosé","Provence","Bandol","Mourvèdre, Cinsault",3,"Bon, structuré","Sélection prudente","Dernière fenêtre pour le boire"],
[2024,"Rosé","Provence","Côtes de Provence","Grenache, Cinsault",2,"Bon, malgré pression mildiou modérée","Privilégier","À boire maintenant"],
[2025,"Rosé","Provence","Côtes de Provence","Grenache, Cinsault",2,"Bon, fraîcheur, déjà disponible","Privilégier","Le rosé le plus frais actuellement sur le marché"],
[2017,"Liquoreux","Languedoc-Roussillon","Banyuls Rimage","Grenache Noir",30,"Style oxydatif, garde exceptionnelle","Bon choix","Garde quasi illimitée"],
[2018,"Rouge","Languedoc","Saint-Chinian","Syrah, Grenache",8,"Excellent","Privilégier","À boire maintenant"],
[2019,"Effervescent","Languedoc","Crémant de Limoux","Chardonnay, Chenin",6,"Bon","À éviter","Fenêtre de consommation dépassée"],
[2020,"Blanc","Languedoc","Picpoul de Pinet","Picpoul",4,"Bon, frais","À éviter","Fenêtre de consommation dépassée"],
[2022,"Rouge","Languedoc","Faugères","Syrah, Mourvèdre",9,"Excellent, mûr","Privilégier",null],
[2023,"Rouge","Languedoc","Minervois","Syrah, Carignan",6,"Bon","Bon choix",null],
[2019,"Rouge","Beaujolais","Morgon (Cru)","Gamay",9,"Excellent","Privilégier",null],
[2021,"Rouge","Beaujolais","Beaujolais-Villages","Gamay",5,"Gel, faible volume, léger","Sélection prudente","À boire maintenant"],
[2022,"Rouge","Beaujolais","Moulin-à-Vent (Cru)","Gamay",10,"Excellent, mûr et concentré","Privilégier",null],
[2024,"Rouge","Beaujolais","Fleurie (Cru)","Gamay",8,"Difficile mais sélection fine possible","Sélection prudente",null],
[2025,"Rouge","Beaujolais","Beaujolais Nouveau","Gamay",1,"Bon, déjà sur le marché depuis novembre 2025","Bon choix","À boire impérativement dans l'année"],
[2017,"Blanc","Jura","Vin Jaune","Savagnin",40,"Style oxydatif, garde exceptionnelle","Privilégier","Mis en bouteille après 6 ans sous voile"],
[2021,"Blanc","Jura","Côtes du Jura","Chardonnay",9,"Bon","Bon choix",null],
[2023,"Effervescent","Jura","Crémant du Jura","Chardonnay, Savagnin",5,"Bon","Bon choix",null],
[2018,"Rouge","Sud-Ouest","Cahors","Malbec",13,"Excellent, mûr","Privilégier",null],
[2019,"Rouge","Sud-Ouest","Madiran","Tannat",15,"Excellent, structuré","Privilégier",null],
[2020,"Liquoreux","Sud-Ouest","Jurançon moelleux","Petit Manseng",20,"Bon","Bon choix",null],
[2024,"Blanc","Sud-Ouest","Jurançon sec","Gros, Petit Manseng",6,"Bon, moins touché par le mildiou","Bon choix",null],
[2019,"Rouge","Corse","Patrimonio","Niellucciu",9,"Bon","Bon choix",null],
[2022,"Rosé","Corse","Corse rosé","Sciacarello, Niellucciu",3,"Excellent","À éviter","Fenêtre de consommation dépassée"],
[2024,"Rosé","Corse","Corse rosé","Sciacarello, Niellucciu",2,"Bon, île relativement épargnée par le mildiou","Privilégier","À boire maintenant"],
]

// Fonctions de recherche dans la base
const OENO_APPELLATIONS = [...new Set(OENO_DB.map(r=>r[3]))].sort()
const OENO_REGIONS = [...new Set(OENO_DB.map(r=>r[2]))].sort()

function getOenoMatch(appellation, millesime) {
  if (!appellation) return null
  const norm = s => s.toLowerCase().trim()
  // exact match first
  let hit = OENO_DB.find(r => norm(r[3]) === norm(appellation) && r[0] === millesime)
  if (!hit) hit = OENO_DB.find(r => norm(r[3]).includes(norm(appellation)) || norm(appellation).includes(norm(r[3])))
  return hit || null
}

function getOenoCepages(appellation) {
  const norm = s => s.toLowerCase().trim()
  const hit = OENO_DB.find(r => norm(r[3]).includes(norm(appellation)) || norm(appellation).includes(norm(r[3])))
  return hit ? hit[4] : null
}

// ─── Données de démonstration ──────────────────────────────────────────────────
const DEMO_WINES = [
  {
    id: '1', name: 'Gevrey-Chambertin 1er Cru', domain: 'Domaine Rossignol-Trapet',
    appellation: 'Gevrey-Chambertin', region: 'Bourgogne', country: 'France',
    type: 'red', cepages: ['Pinot Noir'], vintage: 2019, quantity: 6,
    price: 85, location: 'Rangée A - Case 3', drinkFrom: 2024, drinkUntil: 2032,
    rating: 93, status: 'cellar',
    aromas: ['Cerise noire', 'Réglisse', 'Terre humide', 'Épices douces'],
    foodPairings: ['Bœuf bourguignon', 'Canard aux cerises', 'Comté affiné'],
    notes: 'Nez complexe et élégant. Bouche structurée avec des tanins soyeux. Grande longueur en bouche.',
    purchaseDate: '2021-09-15',
  },
  {
    id: '2', name: 'Château Margaux', domain: 'Château Margaux',
    appellation: 'Margaux', region: 'Bordeaux', country: 'France',
    type: 'red', cepages: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'], vintage: 2015, quantity: 3,
    price: 480, location: 'Rangée B - Case 1', drinkFrom: 2025, drinkUntil: 2050,
    rating: 97, status: 'cellar',
    aromas: ['Cassis', 'Violette', 'Graphite', 'Tabac', 'Cèdre'],
    foodPairings: ['Agneau de Pauillac', 'Filet de bœuf en croûte', 'Truffe noire'],
    notes: 'Millésime exceptionnel. Profondeur et complexité remarquables. À attendre encore 5 ans minimum.',
    purchaseDate: '2018-06-20',
  },
  {
    id: '3', name: 'Puligny-Montrachet Les Pucelles', domain: 'Domaine Leflaive',
    appellation: 'Puligny-Montrachet', region: 'Bourgogne', country: 'France',
    type: 'white', cepages: ['Chardonnay'], vintage: 2020, quantity: 4,
    price: 120, location: 'Rangée C - Case 2', drinkFrom: 2023, drinkUntil: 2030,
    rating: 95, status: 'cellar',
    aromas: ['Fleurs blanches', 'Beurre frais', 'Noisette', 'Pierre à fusil', 'Citron confit'],
    foodPairings: ['Saint-Jacques à la crème', 'Homard thermidor', 'Sole meunière'],
    notes: 'Minéralité exceptionnelle. Texture crémeuse avec une acidité parfaitement intégrée.',
    purchaseDate: '2022-03-10',
  },
  {
    id: '4', name: 'Hermitage Rouge', domain: 'M. Chapoutier',
    appellation: 'Hermitage', region: 'Vallée du Rhône', country: 'France',
    type: 'red', cepages: ['Syrah'], vintage: 2017, quantity: 2,
    price: 65, location: 'Rangée A - Case 7', drinkFrom: 2023, drinkUntil: 2035,
    rating: 91, status: 'cellar',
    aromas: ['Olive noire', 'Viande fumée', 'Poivre noir', 'Violette', 'Réglisse'],
    foodPairings: ['Gibier', 'Daube provençale', 'Fromages affinés'],
    notes: 'Syrah puissante et épicée. Potentiel de garde impressionnant.',
    purchaseDate: '2020-11-05',
  },
  {
    id: '5', name: 'Sancerre Blanc', domain: 'Henri Bourgeois',
    appellation: 'Sancerre', region: 'Loire', country: 'France',
    type: 'white', cepages: ['Sauvignon Blanc'], vintage: 2022, quantity: 8,
    price: 22, location: 'Rangée D - Case 4', drinkFrom: 2023, drinkUntil: 2026,
    rating: 88, status: 'cellar',
    aromas: ['Buis', 'Citron vert', 'Pamplemousse', 'Pierre à fusil'],
    foodPairings: ['Chèvre frais', 'Huîtres', 'Ceviche', 'Asperges'],
    notes: 'Frais, vif et aromatique. À boire dans les 3 ans.',
    purchaseDate: '2023-04-01',
  },
]

const FEATURED_CEPAGES = [
  { name: 'Pinot Noir', region: 'Bourgogne', reason: 'Millésimes 2019-2021 exceptionnels', icon: '🍷', trend: 'up' },
  { name: 'Chardonnay', region: 'Bourgogne / Champagne', reason: 'Grand potentiel de garde 2020', icon: '🥂', trend: 'up' },
  { name: 'Grenache', region: 'Châteauneuf-du-Pape', reason: 'Renaissance qualitative en cours', icon: '🍷', trend: 'up' },
  { name: 'Riesling', region: 'Alsace / Moselle', reason: 'Acidité naturelle, vieillissement parfait', icon: '🍾', trend: 'stable' },
  { name: 'Nebbiolo', region: 'Barolo / Barbaresco', reason: 'Italie du Nord en pleine forme', icon: '🍷', trend: 'up' },
]

const FEATURED_MILLESIMES = [
  { year: 2025, regions: ['Bourgogne', 'Loire', 'Alsace'], score: 94, note: 'En cours de vinification — très prometteur après un été sec', action: 'À suivre' },
  { year: 2023, regions: ['Bourgogne', 'Bordeaux', 'Rhône'], score: 96, note: 'Millésime solaire, équilibre remarquable', action: 'Acheter maintenant' },
  { year: 2022, regions: ['Bourgogne', 'Loire', 'Alsace'], score: 95, note: 'Blancs exceptionnels, rouges concentrés', action: 'Acheter maintenant' },
  { year: 2019, regions: ['Bourgogne', 'Bordeaux'], score: 98, note: 'Millésime du siècle en Bourgogne — apogée 2026–2035', action: 'Conserver' },
  { year: 2015, regions: ['Bordeaux', 'Rhône'], score: 97, note: 'Grands rouges de garde — encore 10 ans minimum', action: 'Conserver' },
]

const AROMAS_LIST = [
  'Cassis','Cerise noire','Fraise','Framboise','Mûre','Myrtille','Prune',
  'Pêche','Abricot','Citron','Pamplemousse','Orange','Citron vert',
  'Fleurs blanches','Rose','Violette','Lavande','Acacia',
  'Vanille','Chocolat','Café','Caramel','Réglisse','Tabac',
  'Cèdre','Chêne','Épices','Poivre noir','Cannelle','Noix de muscade',
  'Truffe','Champignon','Terre humide','Sous-bois','Cuir',
  'Pierre à fusil','Silex','Minéral','Fumé','Grillé',
  'Beurre','Noisette','Amande','Miel','Cire d\'abeille',
  'Olive noire','Viande fumée','Buis','Herbe coupée',
]

const FOOD_PAIRINGS_LIST = [
  'Bœuf bourguignon','Filet de bœuf','Côte de bœuf','Agneau rôti','Gigot d\'agneau',
  'Canard aux cerises','Magret de canard','Pigeon rôti','Faisan en cocotte',
  'Homard thermidor','Langoustines','Saint-Jacques à la crème','Sole meunière','Turbot',
  'Huîtres','Ceviche','Saumon grillé','Thon mi-cuit',
  'Truffe noire','Foie gras','Terrine de gibier',
  'Comté affiné','Munster','Époisses','Reblochon','Chèvre frais',
  'Risotto aux cèpes','Pasta aux truffes','Pizza','Charcuterie',
  'Daube provençale','Cassoulet','Pot-au-feu','Blanquette de veau',
  'Asperges','Artichauts','Ratatouille','Gibier','Fromages affinés',
  'Agneau de Pauillac','Filet de bœuf en croûte',
]

// ─── Icônes ────────────────────────────────────────────────────────────────────
const WineGlass = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8M12 11v11M5 2h14l-2 7a5 5 0 0 1-10 0L5 2z"/>
  </svg>
)
const BottleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v3.5c0 .8-.3 1.6-.9 2.2L6 9.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5l-2.1-1.8c-.6-.6-.9-1.4-.9-2.2V2"/>
    <path d="M9 2h6M9 13h6"/>
  </svg>
)
const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const SearchIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const CloseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const EditIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6M14,11v6"/><path d="M9,6V4h6v2"/>
  </svg>
)
const MapPin = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const ChartBar = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const GrapeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8.5" cy="7" r="2.5"/><circle cx="15.5" cy="7" r="2.5"/>
    <circle cx="6" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/>
    <circle cx="8.5" cy="17" r="2.5"/><circle cx="15.5" cy="17" r="2.5"/>
    <path d="M12 2v2.5"/>
  </svg>
)
const AwardIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const TrendUpIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/>
  </svg>
)
const CellarIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
    <circle cx="7" cy="5" r="0.8" fill="currentColor"/><circle cx="7" cy="12" r="0.8" fill="currentColor"/><circle cx="7" cy="19" r="0.8" fill="currentColor"/>
  </svg>
)
const ForkKnifeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
)

// ─── Design tokens ─────────────────────────────────────────────────────────────
const BG    = '#0f0508'
const SURF  = '#1c0c10'
const CARD  = '#230f13'
const GOLD  = '#c9a84c'
const WINE  = '#8c2030'
const WINE2 = '#ca2e43'
const TEXT  = '#f5ede0'
const SUB   = '#a89080'
const MUTED = '#6b5a50'
const BORD  = 'rgba(201,168,76,0.18)'
const BORDW = 'rgba(140,32,48,0.35)'

// ─── Utilitaires ───────────────────────────────────────────────────────────────
const YEAR = new Date().getFullYear()
const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', rosé: 'Rosé', sparkling: 'Effervescent', sweet: 'Liquoreux' }
const TYPE_EMOJI  = { red: '🍷', white: '🥂', rosé: '🌹', sparkling: '🍾', sweet: '🍯' }

function getDrinkStatus(w) {
  if (w.drinkFrom > YEAR) return { label: 'Trop jeune', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' }
  if (w.drinkUntil < YEAR) return { label: 'À consommer vite', color: '#f87171', bg: 'rgba(248,113,113,0.12)' }
  if (w.drinkUntil - YEAR <= 2) return { label: 'Apogée imminente', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' }
  return { label: 'À maturité', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' }
}

function StarRating({ value, max=100, size=11 }) {
  const stars = Math.round((value / max) * 5)
  return (
    <span style={{ color: GOLD, fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      <span style={{ color: SUB, fontSize: size - 1, marginLeft: 4 }}>{value}</span>
    </span>
  )
}

function getTypeStyle(type) {
  const s = {
    red:      { bg: 'rgba(140,32,48,0.28)',   border: 'rgba(202,46,67,0.45)',  text: '#f4a0b0', dot: WINE2 },
    white:    { bg: 'rgba(201,168,76,0.18)',  border: 'rgba(201,168,76,0.4)',  text: '#e8c96a', dot: GOLD },
    rosé:     { bg: 'rgba(244,63,94,0.15)',   border: 'rgba(244,63,94,0.35)',  text: '#fda4af', dot: '#f43f5e' },
    sparkling:{ bg: 'rgba(180,220,255,0.1)',  border: 'rgba(180,220,255,0.25)',text: '#bae6fd', dot: '#7dd3fc' },
    sweet:    { bg: 'rgba(201,168,76,0.22)',  border: 'rgba(201,168,76,0.45)', text: '#fcd34d', dot: '#f59e0b' },
  }
  return s[type] || s.red
}

// ─── Autocomplete ──────────────────────────────────────────────────────────────
function AutocompleteInput({ value, onChange, suggestions, style, placeholder, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const filtered = value.length >= 1
    ? suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())).slice(0, 8)
    : []

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <input
        style={style}
        value={value}
        placeholder={placeholder}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div style={{
          position:'absolute', top:'100%', left:0, right:0, zIndex:100, marginTop:3,
          background:'#1c1c28', border:'1px solid rgba(139,26,48,0.4)', borderRadius:9,
          boxShadow:'0 8px 24px rgba(0,0,0,0.5)', maxHeight:220, overflowY:'auto',
        }}>
          {filtered.map(s => (
            <div key={s} onMouseDown={e=>{ e.preventDefault(); onChange(s); onSelect && onSelect(s); setOpen(false) }}
              style={{ padding:'9px 13px', fontSize:13, color:'#c9bfb5', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(139,26,48,0.15)'}
              onMouseLeave={e=>e.currentTarget.style.background=''}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  if (!open) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'flex-end', justifyContent:'center', background:'rgba(5,2,3,0.92)', backdropFilter:'blur(8px)' }}>
      <div style={{ position:'relative', width:'100%', maxWidth:720, maxHeight:'92vh', overflowY:'auto', borderRadius:'24px 24px 0 0', background:`linear-gradient(160deg, ${SURF} 0%, ${BG} 100%)`, border:`1px solid ${BORD}`, boxShadow:`0 -8px 60px rgba(140,32,48,0.22)` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:`1px solid ${BORD}`, position:'sticky', top:0, background:SURF, zIndex:1, borderRadius:'24px 24px 0 0' }}>
          <h2 style={{ fontSize:17, fontWeight:700, color:TEXT, fontFamily:'Georgia, serif', letterSpacing:'0.01em' }}>{title}</h2>
          <button onClick={onClose} style={{ padding:8, borderRadius:10, background:`rgba(201,168,76,0.08)`, border:`1px solid ${BORD}`, color:SUB, cursor:'pointer', display:'flex' }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ padding:22 }}>{children}</div>
      </div>
    </div>
  )
}

// ─── Formulaire ajout/édition ──────────────────────────────────────────────────
const EMPTY = {
  name:'', domain:'', appellation:'', region:'', country:'France',
  type:'red', cepages:[], vintage: YEAR-2, quantity:1, price:'',
  location:'', drinkFrom: YEAR+2, drinkUntil: YEAR+10,
  rating:'', status:'cellar', aromas:[], foodPairings:[], notes:'', purchaseDate:'',
  photo:'', history:[], reviews:[],
}

function WineForm({ initial, onSave, onClose, wines = [] }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [aroma, setAroma] = useState('')
  const [food, setFood] = useState('')
  const [cepage, setCepage] = useState('')
  const [oenoSearch, setOenoSearch] = useState('')
  const [oenoOpen, setOenoOpen] = useState(false)
  const oenoRef = useRef(null)

  // Search OENO_DB: filter by region or appellation name
  const oenoResults = oenoSearch.trim().length >= 2
    ? OENO_DB.filter(r =>
        r[2].toLowerCase().includes(oenoSearch.toLowerCase()) ||
        r[3].toLowerCase().includes(oenoSearch.toLowerCase()) ||
        r[4].toLowerCase().includes(oenoSearch.toLowerCase())
      ).slice(0, 20)
    : []

  useEffect(() => {
    const h = e => { if (oenoRef.current && !oenoRef.current.contains(e.target)) setOenoOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const applyOeno = (row) => {
    const couleurMap = { Rouge:'red', Blanc:'white', Rosé:'rosé', Effervescent:'sparkling', Liquoreux:'sweet' }
    setForm(f => ({
      ...f,
      appellation: row[3],
      region: row[2],
      type: couleurMap[row[1]] || f.type,
      cepages: row[4].split(', ').map(c => c.trim()).filter(Boolean),
      drinkUntil: f.vintage ? f.vintage + row[5] : f.drinkUntil,
    }))
    setOenoSearch(row[3])
    setOenoOpen(false)
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const addTag = (field, val, reset) => {
    if (!val.trim()) return
    if (!form[field].includes(val.trim())) set(field, [...form[field], val.trim()])
    reset('')
  }
  const removeTag = (field, val) => set(field, form[field].filter(x => x !== val))
  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.domain) return
    onSave({ ...form, id: form.id || Date.now().toString() })
  }

  const wineNames = [...new Set(wines.map(w=>w.name))].sort()
  const wineDomains = [...new Set(wines.map(w=>w.domain))].sort()

  const inp ={ width:'100%', background:`rgba(255,255,255,0.05)`, border:`1px solid ${BORD}`, borderRadius:10, padding:'10px 14px', color:TEXT, fontSize:14, outline:'none', fontFamily:'inherit' }
  const lbl = { display:'block', fontSize:10, color:MUTED, marginBottom:5, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.09em' }
  const tagRed = { padding:'3px 10px', background:'rgba(140,32,48,0.22)', border:`1px solid ${BORDW}`, borderRadius:20, fontSize:12, color:'#f9a8b8', cursor:'pointer' }
  const tagGold = { padding:'3px 10px', background:'rgba(201,168,76,0.15)', border:`1px solid rgba(201,168,76,0.35)`, borderRadius:20, fontSize:12, color:GOLD, cursor:'pointer' }
  const tagGreen = { padding:'3px 10px', background:'rgba(20,50,20,0.5)', border:'1px solid rgba(34,100,34,0.4)', borderRadius:20, fontSize:12, color:'#86efac', cursor:'pointer' }
  const addBtn = { padding:'10px 14px', background:`rgba(201,168,76,0.15)`, border:`1px solid rgba(201,168,76,0.35)`, borderRadius:10, color:GOLD, fontSize:13, cursor:'pointer', fontWeight:600 }

  return (
    <form onSubmit={submit}>
      {/* ── Recherche rapide OENO_DB ── */}
      <div ref={oenoRef} style={{ position:'relative', marginBottom:18 }}>
        <div style={{ fontSize:11, color:GOLD, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:7 }}>🔍 Rechercher un vin par région ou appellation</div>
        <input
          value={oenoSearch}
          onChange={e => { setOenoSearch(e.target.value); setOenoOpen(true) }}
          onFocus={() => setOenoOpen(true)}
          placeholder="Ex: Bourgogne, Sancerre, Bordeaux, Syrah…"
          style={{ ...inp, borderColor: oenoOpen && oenoResults.length ? GOLD : BORD }}
          autoComplete="off"
        />
        {oenoOpen && oenoResults.length > 0 && (
          <div style={{ position:'absolute', top:'100%', left:0, right:0, zIndex:200, marginTop:4, background:SURF, border:`1px solid ${BORD}`, borderRadius:12, boxShadow:`0 12px 40px rgba(0,0,0,0.6)`, maxHeight:280, overflowY:'auto' }}>
            {oenoResults.map((row, i) => (
              <div key={i} onMouseDown={e=>{ e.preventDefault(); applyOeno(row) }}
                style={{ padding:'10px 14px', borderBottom:`1px solid rgba(201,168,76,0.08)`, cursor:'pointer', display:'flex', gap:10, alignItems:'center' }}
                onMouseEnter={e=>e.currentTarget.style.background=`rgba(201,168,76,0.08)`}
                onMouseLeave={e=>e.currentTarget.style.background=''}
              >
                <span style={{ fontSize:16 }}>{TYPE_EMOJI[{Rouge:'red',Blanc:'white',Rosé:'rosé',Effervescent:'sparkling',Liquoreux:'sweet'}[row[1]]] || '🍷'}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{row[3]}</div>
                  <div style={{ fontSize:11, color:SUB }}>{row[2]} · {row[1]} · {row[0]} · garde {row[5]} ans</div>
                  <div style={{ fontSize:10, color:MUTED, fontStyle:'italic', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{row[4]}</div>
                </div>
                <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background: row[7]==='Privilégier'?'rgba(74,222,128,0.12)':row[7]==='Bon choix'?'rgba(251,191,36,0.12)':'rgba(248,113,113,0.1)', color: row[7]==='Privilégier'?'#4ade80':row[7]==='Bon choix'?'#fbbf24':'#f87171', whiteSpace:'nowrap', fontWeight:600 }}>{row[7]}</span>
              </div>
            ))}
          </div>
        )}
        {oenoSearch && <div style={{ fontSize:11, color:MUTED, marginTop:5 }}>↑ Sélectionner un résultat remplit automatiquement le formulaire</div>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Nom du vin *</label>
          <AutocompleteInput style={inp} value={form.name} placeholder="Gevrey-Chambertin 1er Cru"
            suggestions={wineNames} onChange={v=>set('name',v)} />
        </div>
        <div>
          <label style={lbl}>Domaine / Château *</label>
          <AutocompleteInput style={inp} value={form.domain} placeholder="Domaine Rossignol-Trapet"
            suggestions={wineDomains} onChange={v=>set('domain',v)} />
        </div>
        <div>
          <label style={lbl}>Appellation</label>
          <AutocompleteInput style={inp} value={form.appellation} placeholder="Gevrey-Chambertin, Sancerre…"
            suggestions={OENO_APPELLATIONS}
            onChange={v => set('appellation', v)}
            onSelect={v => {
              set('appellation', v)
              const match = getOenoMatch(v, form.vintage)
              if (match) {
                setForm(f => ({
                  ...f,
                  appellation: v,
                  drinkUntil: f.vintage + match[5],
                  drinkFrom: f.drinkFrom || f.vintage + 2,
                }))
              }
              const cep = getOenoCepages(v)
              if (cep && !form.cepages.length) {
                setForm(f => ({ ...f, cepages: cep.split(', ').map(c => c.trim()).filter(Boolean) }))
              }
            }}
          />
        </div>
        <div>
          <label style={lbl}>Région</label>
          <AutocompleteInput style={inp} value={form.region} placeholder="Bourgogne, Bordeaux…"
            suggestions={OENO_REGIONS}
            onChange={v => set('region', v)}
          />
        </div>
        <div>
          <label style={lbl}>Pays</label>
          <input style={inp} value={form.country} onChange={e=>set('country',e.target.value)} placeholder="France" />
        </div>
        <div>
          <label style={lbl}>Type</label>
          <select style={inp} value={form.type} onChange={e=>set('type',e.target.value)}>
            {Object.entries(TYPE_LABELS).map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>Millésime *</label>
          <input style={inp} type="number" min="1900" max="2025" value={form.vintage} onChange={e=>{
            const v = +e.target.value
            const match = getOenoMatch(form.appellation, v)
            setForm(f => ({ ...f, vintage: v, drinkUntil: match ? v + match[5] : f.drinkUntil }))
          }} required />
        </div>
        <div>
          <label style={lbl}>Quantité (btl)</label>
          <input style={inp} type="number" min="1" value={form.quantity} onChange={e=>set('quantity',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Prix unitaire (€)</label>
          <input style={inp} type="number" min="0" value={form.price} onChange={e=>set('price',+e.target.value)} placeholder="0" />
        </div>
        <div>
          <label style={lbl}>Emplacement cave</label>
          <input style={inp} value={form.location} onChange={e=>set('location',e.target.value)} placeholder="Rangée A - Case 3" />
        </div>
        <div>
          <label style={lbl}>Boire à partir de</label>
          <input style={inp} type="number" min="1900" max="2100" value={form.drinkFrom} onChange={e=>set('drinkFrom',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Boire avant</label>
          <input style={inp} type="number" min="1900" max="2100" value={form.drinkUntil} onChange={e=>set('drinkUntil',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Note (0–100)</label>
          <input style={inp} type="number" min="0" max="100" value={form.rating} onChange={e=>set('rating',+e.target.value)} placeholder="90" />
        </div>
        <div>
          <label style={lbl}>Date d'achat</label>
          <input style={inp} type="date" value={form.purchaseDate} onChange={e=>set('purchaseDate',e.target.value)} />
        </div>

        {/* Photo */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Photo de la bouteille</label>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            {form.photo && (
              <div style={{ position:'relative', flexShrink:0 }}>
                <img src={form.photo} alt="bouteille" style={{ width:72, height:96, objectFit:'cover', borderRadius:10, border:'1px solid rgba(139,26,48,0.4)' }} />
                <button type="button" onClick={()=>set('photo','')} style={{ position:'absolute', top:-6, right:-6, width:18, height:18, borderRadius:'50%', background:'#ca2e43', border:'none', color:'#fff', cursor:'pointer', fontSize:11, display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1 }}>×</button>
              </div>
            )}
            <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:'18px', border:'1px dashed rgba(139,26,48,0.4)', borderRadius:10, cursor:'pointer', background:'rgba(139,26,48,0.05)', color:'#9ca3af', fontSize:12 }}>
              📷 {form.photo ? 'Changer la photo' : 'Ajouter une photo'}
              <input type="file" accept="image/*" style={{ display:'none' }} onChange={e=>{
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = ev => set('photo', ev.target.result)
                reader.readAsDataURL(file)
              }} />
            </label>
          </div>
        </div>

        {/* Cépages */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Cépages</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <input style={{ ...inp, flex:1 }} value={cepage} onChange={e=>setCepage(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();addTag('cepages',cepage,setCepage)} }}
              placeholder="Pinot Noir, Cabernet Sauvignon…" />
            <button type="button" style={addBtn} onClick={()=>addTag('cepages',cepage,setCepage)}>+ Ajouter</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.cepages.map(c=><span key={c} style={tagRed} onClick={()=>removeTag('cepages',c)}>{c} ×</span>)}
          </div>
        </div>

        {/* Arômes */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Arômes</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <select style={{ ...inp, flex:1 }} value={aroma} onChange={e=>setAroma(e.target.value)}>
              <option value="">Sélectionner un arôme…</option>
              {AROMAS_LIST.map(a=><option key={a} value={a}>{a}</option>)}
            </select>
            <button type="button" style={addBtn} onClick={()=>addTag('aromas',aroma,setAroma)}>+</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.aromas.map(a=><span key={a} style={tagGold} onClick={()=>removeTag('aromas',a)}>{a} ×</span>)}
          </div>
        </div>

        {/* Accords */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Accords mets & vins</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <select style={{ ...inp, flex:1 }} value={food} onChange={e=>setFood(e.target.value)}>
              <option value="">Sélectionner un accord…</option>
              {FOOD_PAIRINGS_LIST.map(f=><option key={f} value={f}>{f}</option>)}
            </select>
            <button type="button" style={addBtn} onClick={()=>addTag('foodPairings',food,setFood)}>+</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.foodPairings.map(f=><span key={f} style={tagGreen} onClick={()=>removeTag('foodPairings',f)}>{f} ×</span>)}
          </div>
        </div>

        {/* Notes */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Notes de dégustation</label>
          <textarea style={{ ...inp, minHeight:80, resize:'vertical' }} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Nez, bouche, finale, potentiel de garde…" />
        </div>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:24 }}>
        <button type="button" onClick={onClose} style={{ flex:1, padding:'13px', background:'rgba(255,255,255,0.04)', border:`1px solid ${BORD}`, borderRadius:12, color:SUB, cursor:'pointer', fontSize:14, fontWeight:600 }}>
          Annuler
        </button>
        <button type="submit" style={{ flex:2, padding:'13px', background:`linear-gradient(135deg, ${WINE}, ${WINE2})`, border:'none', borderRadius:12, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:800, letterSpacing:'0.02em' }}>
          {initial ? '✓ Enregistrer' : '+ Ajouter à la cave'}
        </button>
      </div>
    </form>
  )
}

// ─── Carte vin ─────────────────────────────────────────────────────────────────
function WineCard({ wine, onClick, onEdit, onDelete }) {
  const status = getDrinkStatus(wine)
  const ts = getTypeStyle(wine.type)
  const [hov, setHov] = useState(false)

  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:'relative', cursor:'pointer', borderRadius:16,
        background: hov ? `linear-gradient(145deg,#2a1018,#1c0c10)` : `linear-gradient(145deg,${CARD},${SURF})`,
        border:`1px solid ${hov ? 'rgba(201,168,76,0.38)' : BORD}`,
        transition:'all 0.18s ease',
        boxShadow: hov ? `0 8px 30px rgba(201,168,76,0.10)` : '0 2px 10px rgba(0,0,0,0.35)',
        transform: hov ? 'translateY(-2px)' : 'none',
        overflow:'hidden',
      }}>

      {/* Actions hover */}
      {hov && (
        <div style={{ position:'absolute', top:10, right:10, display:'flex', gap:5, zIndex:2 }} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>onEdit(wine)} style={{ padding:'5px 7px', background:SURF, border:`1px solid ${BORD}`, borderRadius:7, color:SUB, cursor:'pointer', display:'flex' }}><EditIcon /></button>
          <button onClick={()=>onDelete(wine.id)} style={{ padding:'5px 7px', background:'rgba(248,113,113,0.12)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:7, color:'#f87171', cursor:'pointer', display:'flex' }}><TrashIcon /></button>
        </div>
      )}

      <div style={{ display:'flex', gap:0 }}>
        {/* Photo / icône */}
        <div style={{ width:72, minHeight:100, background:ts.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden', borderRight:`1px solid ${BORD}` }}>
          {wine.photo
            ? <img src={wine.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:26 }}>{TYPE_EMOJI[wine.type]||'🍷'}</span>
                <span style={{ fontSize:9, color:ts.text, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>{wine.vintage}</span>
              </div>
          }
        </div>

        {/* Contenu */}
        <div style={{ flex:1, padding:'13px 14px', minWidth:0 }}>
          <div style={{ display:'flex', gap:5, marginBottom:5, flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:12, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, fontWeight:700 }}>{TYPE_LABELS[wine.type]}</span>
            {wine.photo && <span style={{ fontSize:9, color:SUB }}>{wine.vintage}</span>}
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:TEXT, fontFamily:'Georgia,serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginBottom:2 }}>{wine.name}</div>
          <div style={{ fontSize:11, color:SUB, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{wine.domain}</div>
          <div style={{ fontSize:10, color:MUTED }}>{wine.region}</div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:10 }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:16, fontWeight:800, color:GOLD }}>{wine.quantity}</div>
                <div style={{ fontSize:8, color:MUTED, textTransform:'uppercase', letterSpacing:'0.05em' }}>btl</div>
              </div>
              {wine.price > 0 && (
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:14, fontWeight:700, color:SUB }}>{wine.price}€</div>
                  <div style={{ fontSize:8, color:MUTED, textTransform:'uppercase' }}>/ btl</div>
                </div>
              )}
            </div>
            <div style={{ textAlign:'right' }}>
              {wine.rating > 0 && <StarRating value={wine.rating} size={10} />}
              <div style={{ marginTop:3 }}>
                <span style={{ fontSize:9, padding:'2px 7px', borderRadius:10, background:status.bg, color:status.color, fontWeight:700 }}>{status.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Détail vin ────────────────────────────────────────────────────────────────
function WineDetail({ wine, onEdit, onUpdate, onDelete }) {
  const status = getDrinkStatus(wine)
  const ts = getTypeStyle(wine.type)
  const drinkWindow = Math.max(1, wine.drinkUntil - wine.drinkFrom)
  const progress = Math.max(0, Math.min(100, ((YEAR - wine.drinkFrom) / drinkWindow) * 100))

  // Mouvement entrée/sortie
  const [mvType, setMvType] = useState('out')
  const [mvQty, setMvQty] = useState(1)
  const [mvNote, setMvNote] = useState('')
  const [mvDate, setMvDate] = useState(new Date().toISOString().slice(0,10))
  const addMovement = () => {
    const qtyChange = mvType === 'in' ? +mvQty : -Math.min(+mvQty, wine.quantity)
    const newQty = Math.max(0, wine.quantity + qtyChange)
    const entry = { id: Date.now().toString(), date: mvDate, type: mvType, qty: +mvQty, note: mvNote }
    onUpdate({ ...wine, quantity: newQty, history: [...(wine.history||[]), entry] })
    setMvNote(''); setMvQty(1)
  }

  // Avis
  const [rvText, setRvText] = useState('')
  const [rvRating, setRvRating] = useState('')
  const [rvDate, setRvDate] = useState(new Date().toISOString().slice(0,10))
  const addReview = () => {
    if (!rvText.trim()) return
    const entry = { id: Date.now().toString(), date: rvDate, rating: rvRating ? +rvRating : null, text: rvText }
    onUpdate({ ...wine, reviews: [...(wine.reviews||[]), entry] })
    setRvText(''); setRvRating('')
  }

  const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:`1px solid ${BORD}`, borderRadius:10, padding:'10px 13px', color:TEXT, fontSize:14, outline:'none', fontFamily:'inherit' }
  const lbl = { display:'block', fontSize:10, color:MUTED, marginBottom:5, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.09em' }

  return (
    <div>
      {/* ── Entête ── */}
      <div style={{ display:'flex', gap:16, marginBottom:20 }}>
        {wine.photo
          ? <img src={wine.photo} alt="" style={{ width:76, height:104, borderRadius:12, objectFit:'cover', border:`1px solid ${BORD}`, flexShrink:0 }} />
          : <div style={{ width:64, height:80, borderRadius:14, background:ts.bg, border:`1px solid ${ts.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontSize:28 }}>{TYPE_EMOJI[wine.type]||'🍷'}</span>
            </div>
        }
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', gap:6, marginBottom:6, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, padding:'2px 9px', borderRadius:12, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, fontWeight:700 }}>{TYPE_LABELS[wine.type]}</span>
            <span style={{ fontSize:10, padding:'2px 9px', borderRadius:12, background:status.bg, color:status.color, fontWeight:700 }}>{status.label}</span>
          </div>
          <div style={{ fontSize:18, fontWeight:800, color:TEXT, fontFamily:'Georgia,serif', lineHeight:1.2, marginBottom:4 }}>{wine.name}</div>
          <div style={{ fontSize:13, color:SUB }}>{wine.domain}</div>
          <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{[wine.appellation, wine.region, wine.country].filter(Boolean).join(' · ')}</div>
          {wine.rating > 0 && <div style={{ marginTop:6 }}><StarRating value={wine.rating} size={12}/></div>}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:18 }}>
        {[
          { l:'Millésime', v:wine.vintage, c:GOLD },
          { l:'Quantité', v:`${wine.quantity} btl`, c:GOLD },
          { l:'Note', v: wine.rating ? `${wine.rating}` : '—', c:'#fbbf24' },
          { l:'Valeur', v: wine.price ? `${(wine.price*wine.quantity).toLocaleString('fr')}€` : '—', c:SUB },
        ].map(s=>(
          <div key={s.l} style={{ textAlign:'center', padding:'12px 4px', background:`rgba(201,168,76,0.06)`, borderRadius:10, border:`1px solid ${BORD}` }}>
            <div style={{ fontSize:17, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:9, color:MUTED, marginTop:2, textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Fenêtre */}
      <div style={{ marginBottom:16, padding:14, background:`rgba(201,168,76,0.05)`, borderRadius:11, border:`1px solid ${BORD}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontSize:10, color:SUB, textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700 }}>Fenêtre de dégustation</span>
          <span style={{ fontSize:11, color:MUTED }}>{wine.drinkFrom} – {wine.drinkUntil}</span>
        </div>
        <div style={{ height:6, background:'rgba(255,255,255,0.06)', borderRadius:4, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:`linear-gradient(90deg,${GOLD},#e8c96a)`, borderRadius:4 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11 }}>
          {wine.purchaseDate && <span style={{ color:MUTED }}>Acheté le {wine.purchaseDate}</span>}
          <span style={{ color:status.color, marginLeft:'auto', fontWeight:700 }}>{status.label}</span>
        </div>
      </div>

      {/* Conseil de garde OENO_DB */}
      {(() => {
        const match = getOenoMatch(wine.appellation, wine.vintage)
        if (!match) return null
        const recoBg = { 'Privilégier':'rgba(74,222,128,0.08)', 'Bon choix':'rgba(251,191,36,0.08)', 'Sélection prudente':'rgba(248,113,113,0.08)', 'À éviter':'rgba(107,114,128,0.08)' }
        const recoColor = { 'Privilégier':'#4ade80', 'Bon choix':'#fbbf24', 'Sélection prudente':'#f87171', 'À éviter':'#6b7280' }
        const boire = match[0] + match[5]
        return (
          <div style={{ marginBottom:16, padding:14, background: recoBg[match[7]] || `rgba(201,168,76,0.05)`, borderRadius:11, border:`1px solid ${(recoColor[match[7]]||GOLD)}33` }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, gap:8, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700 }}>📚 Base œnologique 2017–2025</span>
              <span style={{ fontSize:10, padding:'2px 9px', borderRadius:12, background: recoBg[match[7]], color: recoColor[match[7]] || GOLD, fontWeight:700 }}>{match[7]}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom: match[8] ? 8 : 0 }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:800, color:GOLD }}>{boire}</div>
                <div style={{ fontSize:8, color:MUTED, textTransform:'uppercase', letterSpacing:'0.04em' }}>boire avant</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:800, color:SUB }}>{match[5]} ans</div>
                <div style={{ fontSize:8, color:MUTED, textTransform:'uppercase' }}>garde max</div>
              </div>
              <div style={{ flex:1, fontSize:12, color:SUB, alignSelf:'center', fontStyle:'italic', lineHeight:1.5 }}>{match[6]}</div>
            </div>
            {match[8] && <p style={{ fontSize:12, color:SUB, margin:0, borderTop:`1px solid ${BORD}`, paddingTop:7, lineHeight:1.55 }}>{match[8]}</p>}
          </div>
        )
      })()}

      {wine.cepages?.length > 0 && (
        <Section title="Cépages">
          {wine.cepages.map(c=><Tag key={c} style="red">{c}</Tag>)}
        </Section>
      )}
      {wine.aromas?.length > 0 && (
        <Section title="Profil aromatique">
          {wine.aromas.map(a=><Tag key={a} style="gold">{a}</Tag>)}
        </Section>
      )}
      {wine.foodPairings?.length > 0 && (
        <Section title="Accords mets & vins">
          {wine.foodPairings.map(f=><Tag key={f} style="green">{f}</Tag>)}
        </Section>
      )}
      {wine.notes && (
        <div style={{ marginBottom:16, padding:14, background:'rgba(255,255,255,0.02)', borderRadius:10, borderLeft:'3px solid #8c2030' }}>
          <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:7, fontWeight:600 }}>Notes de dégustation</div>
          <p style={{ fontSize:13, color:'#c9bfb5', lineHeight:1.65, fontStyle:'italic' }}>{wine.notes}</p>
        </div>
      )}
      {wine.location && (
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:16, fontSize:12, color:'#6b7280' }}>
          <MapPin /> Emplacement : <span style={{ color:'#9ca3af' }}>{wine.location}</span>
        </div>
      )}

      {/* ── Mouvement entrée / sortie ── */}
      <div style={{ marginBottom:20, padding:16, background:'rgba(255,255,255,0.02)', borderRadius:12, border:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12, fontWeight:600 }}>Enregistrer un mouvement</div>
        <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
          {['out','in'].map(t=>(
            <button key={t} type="button" onClick={()=>setMvType(t)} style={{ padding:'6px 16px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:13,
              background: mvType===t ? (t==='in'?'rgba(74,222,128,0.2)':'rgba(248,113,113,0.2)') : 'rgba(255,255,255,0.04)',
              color: mvType===t ? (t==='in'?'#4ade80':'#f87171') : '#6b7280',
            }}>{t==='in'?'📦 Entrée':'🍾 Sortie'}</button>
          ))}
          <input type="number" min="1" value={mvQty} onChange={e=>setMvQty(e.target.value)} style={{ ...inp, width:70 }} />
          <input type="date" value={mvDate} onChange={e=>setMvDate(e.target.value)} style={{ ...inp, flex:1, minWidth:130 }} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input value={mvNote} onChange={e=>setMvNote(e.target.value)} placeholder="Commentaire (occasion, destinataire…)" style={{ ...inp, flex:1 }} />
          <button type="button" onClick={addMovement} style={{ padding:'9px 16px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>
            + Ajouter
          </button>
        </div>
      </div>

      {/* ── Historique ── */}
      {(wine.history||[]).length > 0 && (
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10, fontWeight:600 }}>Historique</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {[...(wine.history||[])].reverse().map(h=>(
              <div key={h.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 13px', background:'rgba(255,255,255,0.02)', borderRadius:9, border:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize:15 }}>{h.type==='in'?'📦':'🍾'}</span>
                <span style={{ fontSize:12, fontWeight:700, color: h.type==='in'?'#4ade80':'#f87171', minWidth:24 }}>{h.type==='in'?'+':'-'}{h.qty}</span>
                <span style={{ fontSize:11, color:'#6b7280', minWidth:85 }}>{h.date}</span>
                {h.note && <span style={{ fontSize:12, color:'#9ca3af', flex:1 }}>{h.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Ajouter un avis ── */}
      <div style={{ marginBottom:20, padding:16, background:'rgba(255,255,255,0.02)', borderRadius:12, border:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12, fontWeight:600 }}>Ajouter un avis de dégustation</div>
        <div style={{ display:'flex', gap:8, marginBottom:8 }}>
          <input type="number" min="0" max="100" value={rvRating} onChange={e=>setRvRating(e.target.value)} placeholder="Note /100" style={{ ...inp, width:100 }} />
          <input type="date" value={rvDate} onChange={e=>setRvDate(e.target.value)} style={{ ...inp, flex:1 }} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input value={rvText} onChange={e=>setRvText(e.target.value)} placeholder="Impressions, arômes, évolution…" style={{ ...inp, flex:1 }} onKeyDown={e=>{ if(e.key==='Enter') addReview() }} />
          <button type="button" onClick={addReview} style={{ padding:'9px 16px', background:'rgba(139,26,48,0.25)', border:'1px solid rgba(139,26,48,0.4)', borderRadius:9, color:'#f9a8b8', cursor:'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>
            + Avis
          </button>
        </div>
      </div>

      {/* ── Liste des avis ── */}
      {(wine.reviews||[]).length > 0 && (
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10, fontWeight:600 }}>Avis &amp; dégustations</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[...(wine.reviews||[])].reverse().map(r=>(
              <div key={r.id} style={{ padding:'12px 14px', background:'rgba(255,255,255,0.02)', borderRadius:10, borderLeft:'3px solid rgba(139,26,48,0.6)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  {r.rating && <span style={{ fontSize:14, fontWeight:800, color:'#f59e0b' }}>{r.rating}/100</span>}
                  <span style={{ fontSize:11, color:'#6b7280' }}>{r.date}</span>
                </div>
                <p style={{ fontSize:13, color:'#c9bfb5', lineHeight:1.6, fontStyle:'italic', margin:0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:10, marginTop:4 }}>
        <button onClick={()=>onEdit(wine)} style={{ flex:2, padding:'13px', background:`linear-gradient(135deg,${WINE},${WINE2})`, border:'none', borderRadius:12, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700, letterSpacing:'0.02em' }}>
          ✏️ Modifier ce vin
        </button>
        {onDelete && (
          <button onClick={()=>onDelete(wine.id)} style={{ flex:1, padding:'13px', background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.35)', borderRadius:12, color:'#f87171', cursor:'pointer', fontSize:13, fontWeight:700 }}>
            🗑️ Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:7, fontWeight:700 }}>{title}</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{children}</div>
    </div>
  )
}
function Tag({ children, style }) {
  const styles = {
    red:   { padding:'4px 12px', background:'rgba(140,32,48,0.22)', border:`1px solid ${BORDW}`, borderRadius:20, fontSize:12, color:'#f4a0b0' },
    gold:  { padding:'4px 12px', background:'rgba(201,168,76,0.15)', border:`1px solid rgba(201,168,76,0.35)`, borderRadius:20, fontSize:12, color:GOLD },
    green: { padding:'4px 12px', background:'rgba(20,55,25,0.5)', border:'1px solid rgba(34,110,34,0.4)', borderRadius:20, fontSize:12, color:'#86efac' },
  }
  return <span style={styles[style]}>{children}</span>
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ wines, searchQ, setSearchQ, onSelectWine, onGoToCave }) {
  const [dashModal, setDashModal] = useState(null) // { type: 'cepage'|'millesime', data }
  const total = wines.reduce((s,w)=>s+w.quantity,0)
  const value = wines.reduce((s,w)=>s+(w.price||0)*w.quantity,0)
  const rated = wines.filter(w=>w.rating>0)
  const avgRating = rated.length ? rated.reduce((s,w)=>s+w.rating,0)/rated.length : 0
  const ready = wines.filter(w=>getDrinkStatus(w).label==='À maturité').length
  const typeMap = wines.reduce((a,w)=>{a[w.type]=(a[w.type]||0)+w.quantity;return a},{})
  const regionMap = wines.reduce((a,w)=>{if(w.region){a[w.region]=(a[w.region]||0)+w.quantity}return a},{})

  const searchResults = searchQ.trim().length >= 2
    ? wines.filter(w => {
        const q = searchQ.toLowerCase()
        return w.name.toLowerCase().includes(q) || w.domain.toLowerCase().includes(q) || (w.region||'').toLowerCase().includes(q) || (w.appellation||'').toLowerCase().includes(q)
      })
    : []

  const cardStyle = { padding:18, borderRadius:16, background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${BORD}` }
  const secTitle = { fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:700, marginBottom:12 }

  return (
    <div>
      {/* Barre de recherche */}
      <div style={{ position:'relative', marginBottom:20 }}>
        <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:MUTED, pointerEvents:'none' }}><SearchIcon /></div>
        <input
          style={{ width:'100%', background:`rgba(201,168,76,0.06)`, border:`1px solid ${BORD}`, borderRadius:14, padding:'13px 14px 13px 40px', color:TEXT, fontSize:14, outline:'none', fontFamily:'inherit' }}
          placeholder="Rechercher un vin, domaine, région…"
          value={searchQ}
          onChange={e=>setSearchQ(e.target.value)}
        />
        {searchQ && <button onClick={()=>setSearchQ('')} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:MUTED, cursor:'pointer', fontSize:16 }}>×</button>}
      </div>

      {/* Résultats de recherche */}
      {searchResults.length > 0 && (
        <div style={{ marginBottom:20, ...cardStyle }}>
          <div style={secTitle}>🔍 Résultats ({searchResults.length})</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {searchResults.map(w => {
              const ts = getTypeStyle(w.type)
              return (
                <div key={w.id} onClick={()=>onSelectWine(w)} style={{ display:'flex', gap:10, alignItems:'center', padding:'9px 12px', background:`rgba(201,168,76,0.05)`, borderRadius:10, border:`1px solid ${BORD}`, cursor:'pointer' }}>
                  <div style={{ width:40, height:50, borderRadius:8, background:ts.bg, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 }}>
                    {w.photo ? <img src={w.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <span style={{ fontSize:18 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.name}</div>
                    <div style={{ fontSize:11, color:SUB }}>{w.domain} · {w.vintage}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    {w.rating > 0 && <StarRating value={w.rating} size={10}/>}
                    <div style={{ fontSize:11, color:GOLD, fontWeight:700 }}>{w.quantity} btl</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Carte cave summary */}
      <div onClick={onGoToCave} style={{ marginBottom:20, padding:22, borderRadius:18, background:`linear-gradient(135deg, #3e1420 0%, #1c0c10 55%, ${BG} 100%)`, border:`1px solid rgba(201,168,76,0.22)`, position:'relative', overflow:'hidden', cursor:'pointer' }}>
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'40%', background:'radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.1) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ fontSize:10, color:GOLD, textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:700, marginBottom:8 }}>Votre Cave à Vin</div>
        <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:12 }}>
          <span style={{ fontSize:52, fontWeight:900, color:TEXT, fontFamily:'Georgia,serif', lineHeight:1 }}>{total}</span>
          <span style={{ fontSize:14, color:SUB, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em' }}>bouteilles</span>
        </div>
        <div style={{ display:'flex', gap:18, flexWrap:'wrap' }}>
          {Object.entries(typeMap).map(([t,q])=>(
            <div key={t} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:14 }}>{TYPE_EMOJI[t]||'🍷'}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:TEXT }}>{q}</div>
                <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>{TYPE_LABELS[t]}</div>
              </div>
            </div>
          ))}
        </div>
        {value > 0 && (
          <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid rgba(201,168,76,0.15)`, display:'flex', gap:24 }}>
            <div>
              <div style={{ fontSize:18, fontWeight:800, background:'linear-gradient(135deg,#c9a84c,#e8c96a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{value.toLocaleString('fr')} €</div>
              <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>valeur estimée</div>
            </div>
            {avgRating > 0 && (
              <div>
                <div style={{ fontSize:18, fontWeight:800, color:GOLD }}>{avgRating.toFixed(1)}/100</div>
                <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>note moy.</div>
              </div>
            )}
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:'#4ade80' }}>{ready}</div>
              <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>à maturité</div>
            </div>
          </div>
        )}
      </div>

      {/* Découvertes du jour — scroll horizontal */}
      {wines.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:13 }}>
            <span style={{ fontSize:13, fontWeight:700, color:TEXT, textTransform:'uppercase', letterSpacing:'0.08em' }}>Découvertes du jour</span>
            <span style={{ fontSize:11, color:GOLD }}>›</span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8 }} className="hide-scrollbar">
            {[...wines].sort(()=>Math.random()-0.5).slice(0,6).map(w=>{
              const ts=getTypeStyle(w.type)
              return (
                <div key={w.id} onClick={()=>onSelectWine(w)} style={{ flexShrink:0, width:130, borderRadius:14, background:`linear-gradient(160deg,${CARD},${SURF})`, border:`1px solid ${BORD}`, cursor:'pointer', overflow:'hidden' }}>
                  <div style={{ height:90, background:ts.bg, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    {w.photo
                      ? <img src={w.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                      : <span style={{ fontSize:32 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>
                    }
                  </div>
                  <div style={{ padding:'10px 10px 12px' }}>
                    {w.rating > 0 && <div style={{ marginBottom:4 }}><StarRating value={w.rating} size={9}/></div>}
                    <div style={{ fontSize:12, fontWeight:700, color:TEXT, lineHeight:1.3, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{w.name}</div>
                    <div style={{ fontSize:10, color:MUTED, marginTop:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{TYPE_LABELS[w.type]}, {w.region}</div>
                    {w.price > 0 && <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginTop:5 }}>{w.price}€</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:22 }}>
        {/* Par type */}
        <div style={cardStyle}>
          <div style={secTitle}>Répartition</div>
          {Object.entries(typeMap).map(([t,q])=>{
            const ts=getTypeStyle(t), pct=Math.round(q/(total||1)*100)
            return (
              <div key={t} style={{ marginBottom:9 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                  <span style={{ color:ts.text }}>{TYPE_EMOJI[t]} {TYPE_LABELS[t]}</span>
                  <span style={{ color:MUTED }}>{q} · {pct}%</span>
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:3 }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:ts.dot, borderRadius:3 }}/>
                </div>
              </div>
            )
          })}
        </div>

        {/* Par région */}
        <div style={cardStyle}>
          <div style={secTitle}>Régions</div>
          {Object.entries(regionMap).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([r,q])=>{
            const pct=Math.round(q/(total||1)*100)
            return (
              <div key={r} style={{ marginBottom:9 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                  <span style={{ color:SUB, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'65%' }}>{r}</span>
                  <span style={{ color:MUTED }}>{q} btl</span>
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:3 }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${WINE},${WINE2})`, borderRadius:3 }}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cépages du moment */}
      <div style={{ marginBottom:22 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:13 }}>
          <span style={{ fontSize:13, fontWeight:700, color:TEXT, textTransform:'uppercase', letterSpacing:'0.08em' }}>Cépages idéaux du moment</span>
          <span style={{ fontSize:11, color:GOLD }}>›</span>
        </div>
        <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:6 }} className="hide-scrollbar">
          {FEATURED_CEPAGES.map(c=>(
            <div key={c.name} onClick={()=>setDashModal({ type:'cepage', data:c })} style={{ flexShrink:0, width:160, padding:14, borderRadius:13, background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${BORD}`, cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:7 }}>
                <span style={{ fontSize:22 }}>{c.icon}</span>
                {c.trend==='up' && <TrendUpIcon />}
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:TEXT, marginBottom:2 }}>{c.name}</div>
              <div style={{ fontSize:10, color:GOLD, fontWeight:600, marginBottom:5 }}>{c.region}</div>
              <div style={{ fontSize:10, color:MUTED, lineHeight:1.5 }}>{c.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Millésimes */}
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:13 }}>
          <span style={{ fontSize:13, fontWeight:700, color:TEXT, textTransform:'uppercase', letterSpacing:'0.08em' }}>Millésimes à privilégier</span>
          <span style={{ fontSize:11, color:GOLD }}>›</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {FEATURED_MILLESIMES.map(m=>(
            <div key={m.year} onClick={()=>setDashModal({ type:'millesime', data:m })} style={{ display:'flex', alignItems:'center', gap:14, padding:14, borderRadius:13, background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${BORD}`, cursor:'pointer' }}>
              <div style={{ textAlign:'center', minWidth:52 }}>
                <div style={{ fontSize:22, fontWeight:900, background:'linear-gradient(135deg,#c9a84c,#e8c96a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{m.year}</div>
                <div style={{ fontSize:10, color:GOLD, fontWeight:700 }}>{m.score} pts</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:SUB, marginBottom:5, lineHeight:1.45 }}>{m.note}</div>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                  {m.regions.map(r=>(
                    <span key={r} style={{ fontSize:9, padding:'1px 7px', borderRadius:10, background:`rgba(201,168,76,0.08)`, color:MUTED, border:`1px solid ${BORD}` }}>{r}</span>
                  ))}
                </div>
              </div>
              <span style={{
                fontSize:10, padding:'3px 10px', borderRadius:12, fontWeight:700, whiteSpace:'nowrap',
                background: m.action==='Acheter maintenant'?'rgba(74,222,128,0.12)':m.action==='Conserver'?'rgba(96,165,250,0.12)':'rgba(251,191,36,0.12)',
                color: m.action==='Acheter maintenant'?'#4ade80':m.action==='Conserver'?'#60a5fa':'#fbbf24',
              }}>{m.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dashboard detail modal ── */}
      {dashModal && (
        <div style={{ position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'flex-end', justifyContent:'center', background:'rgba(5,2,3,0.92)', backdropFilter:'blur(8px)' }} onClick={()=>setDashModal(null)}>
          <div style={{ width:'100%', maxWidth:720, maxHeight:'80vh', overflowY:'auto', borderRadius:'24px 24px 0 0', background:`linear-gradient(160deg,${SURF} 0%,${BG} 100%)`, border:`1px solid ${BORD}`, padding:24 }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h3 style={{ fontSize:17, fontWeight:700, color:TEXT, fontFamily:'Georgia,serif' }}>
                {dashModal.type==='cepage' ? `${dashModal.data.icon} ${dashModal.data.name}` : `Millésime ${dashModal.data.year}`}
              </h3>
              <button onClick={()=>setDashModal(null)} style={{ padding:'6px 12px', background:'rgba(201,168,76,0.08)', border:`1px solid ${BORD}`, borderRadius:9, color:SUB, cursor:'pointer', fontSize:12 }}>Fermer</button>
            </div>

            {dashModal.type==='cepage' && (() => {
              const c = dashModal.data
              const winesWithCepage = wines.filter(w=>w.cepages?.some(cp=>cp.toLowerCase().includes(c.name.toLowerCase())))
              return (
                <div>
                  <div style={{ marginBottom:16, padding:13, background:`rgba(201,168,76,0.07)`, borderRadius:11, border:`1px solid ${BORD}` }}>
                    <div style={{ fontSize:13, color:GOLD, fontWeight:700, marginBottom:4 }}>{c.region}</div>
                    <div style={{ fontSize:12, color:SUB, lineHeight:1.6 }}>{c.reason}</div>
                    {c.trend==='up' && <div style={{ fontSize:11, color:'#22c55e', marginTop:6, fontWeight:700 }}>↑ Tendance à la hausse</div>}
                  </div>
                  {winesWithCepage.length > 0 ? (
                    <div>
                      <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, fontWeight:700 }}>Dans votre cave ({winesWithCepage.length})</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {winesWithCepage.map(w=>(
                          <div key={w.id} onClick={()=>{ setDashModal(null); onSelectWine(w) }} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 12px', background:`rgba(201,168,76,0.05)`, borderRadius:10, border:`1px solid ${BORD}`, cursor:'pointer' }}>
                            <span style={{ fontSize:20 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontSize:13, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.name}</div>
                              <div style={{ fontSize:11, color:SUB }}>{w.domain} · {w.vintage} · {w.quantity} btl</div>
                            </div>
                            {w.rating>0 && <StarRating value={w.rating} size={10}/>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign:'center', padding:'24px 0', color:MUTED, fontSize:13 }}>Aucun vin avec ce cépage dans votre cave</div>
                  )}
                  {/* OENO data for this cépage */}
                  {(() => {
                    const oenoRows = OENO_DB.filter(r=>r[4].toLowerCase().includes(c.name.toLowerCase())).slice(0,5)
                    if (!oenoRows.length) return null
                    return (
                      <div style={{ marginTop:16 }}>
                        <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, fontWeight:700 }}>📚 Base œnologique</div>
                        {oenoRows.map((r,i)=>(
                          <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'9px 12px', marginBottom:6, background:'rgba(255,255,255,0.02)', borderRadius:9, border:`1px solid ${BORD}` }}>
                            <span style={{ fontSize:14 }}>{TYPE_EMOJI[{Rouge:'red',Blanc:'white',Rosé:'rosé',Effervescent:'sparkling',Liquoreux:'sweet'}[r[1]]]||'🍷'}</span>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:12, fontWeight:700, color:TEXT }}>{r[3]} {r[0]}</div>
                              <div style={{ fontSize:10, color:SUB }}>{r[2]} · garde {r[5]} ans</div>
                            </div>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:r[7]==='Privilégier'?'rgba(74,222,128,0.12)':r[7]==='Bon choix'?'rgba(251,191,36,0.12)':'rgba(248,113,113,0.1)', color:r[7]==='Privilégier'?'#4ade80':r[7]==='Bon choix'?'#fbbf24':'#f87171', fontWeight:600 }}>{r[7]}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              )
            })()}

            {dashModal.type==='millesime' && (() => {
              const m = dashModal.data
              const oenoRows = OENO_DB.filter(r=>r[0]===m.year)
              const winesOfYear = wines.filter(w=>w.vintage===m.year)
              return (
                <div>
                  <div style={{ display:'flex', gap:16, marginBottom:18, flexWrap:'wrap' }}>
                    <div style={{ textAlign:'center', padding:'14px 20px', background:`rgba(201,168,76,0.08)`, borderRadius:12, border:`1px solid ${BORD}` }}>
                      <div style={{ fontSize:32, fontWeight:900, background:'linear-gradient(135deg,#c9a84c,#e8c96a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{m.year}</div>
                      <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', marginTop:2 }}>millésime</div>
                    </div>
                    <div style={{ flex:1, padding:14, background:`rgba(201,168,76,0.05)`, borderRadius:12, border:`1px solid ${BORD}` }}>
                      <div style={{ fontSize:22, fontWeight:800, color:GOLD, marginBottom:4 }}>{m.score} pts</div>
                      <div style={{ fontSize:13, color:SUB, lineHeight:1.55, marginBottom:8 }}>{m.note}</div>
                      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:12, fontWeight:700,
                        background: m.action==='Acheter maintenant'?'rgba(74,222,128,0.12)':m.action==='Conserver'?'rgba(96,165,250,0.12)':'rgba(251,191,36,0.12)',
                        color: m.action==='Acheter maintenant'?'#4ade80':m.action==='Conserver'?'#60a5fa':'#fbbf24',
                      }}>{m.action}</span>
                    </div>
                  </div>

                  {winesOfYear.length > 0 && (
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, fontWeight:700 }}>Dans votre cave ({winesOfYear.length})</div>
                      {winesOfYear.map(w=>(
                        <div key={w.id} onClick={()=>{ setDashModal(null); onSelectWine(w) }} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 12px', marginBottom:6, background:`rgba(201,168,76,0.05)`, borderRadius:10, border:`1px solid ${BORD}`, cursor:'pointer' }}>
                          <span style={{ fontSize:20 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:13, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.name}</div>
                            <div style={{ fontSize:11, color:SUB }}>{w.domain} · {w.quantity} btl</div>
                          </div>
                          {w.rating>0 && <StarRating value={w.rating} size={10}/>}
                        </div>
                      ))}
                    </div>
                  )}

                  {oenoRows.length > 0 && (
                    <div>
                      <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, fontWeight:700 }}>📚 Base œnologique {m.year}</div>
                      {oenoRows.map((r,i)=>(
                        <div key={i} style={{ padding:'10px 13px', marginBottom:7, background:'rgba(255,255,255,0.02)', borderRadius:10, border:`1px solid ${BORD}` }}>
                          <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:4 }}>
                            <span style={{ fontSize:16 }}>{TYPE_EMOJI[{Rouge:'red',Blanc:'white',Rosé:'rosé',Effervescent:'sparkling',Liquoreux:'sweet'}[r[1]]]||'🍷'}</span>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:13, fontWeight:700, color:TEXT }}>{r[3]}</div>
                              <div style={{ fontSize:10, color:SUB }}>{r[2]} · {r[1]} · garde {r[5]} ans · {r[4]}</div>
                            </div>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:r[7]==='Privilégier'?'rgba(74,222,128,0.12)':r[7]==='Bon choix'?'rgba(251,191,36,0.12)':'rgba(248,113,113,0.1)', color:r[7]==='Privilégier'?'#4ade80':r[7]==='Bon choix'?'#fbbf24':'#f87171', fontWeight:600 }}>{r[7]}</span>
                          </div>
                          {r[6] && <div style={{ fontSize:11, color:SUB, fontStyle:'italic' }}>{r[6]}</div>}
                          {r[8] && <div style={{ fontSize:11, color:MUTED, marginTop:3 }}>{r[8]}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Vue Cave ──────────────────────────────────────────────────────────────────
function CaveView({ wines, onAdd, onEdit, onDelete, onSelect }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [statusF, setStatusF] = useState('all')
  const [sort, setSort] = useState('name')

  const list = wines
    .filter(w => {
      const lq = q.toLowerCase()
      if (lq && !w.name.toLowerCase().includes(lq) && !w.domain.toLowerCase().includes(lq) && !(w.region||'').toLowerCase().includes(lq)) return false
      if (type !== 'all' && w.type !== type) return false
      if (statusF !== 'all') {
        const s = getDrinkStatus(w).label
        if (statusF==='ready' && s!=='À maturité') return false
        if (statusF==='young' && s!=='Trop jeune') return false
        if (statusF==='urgent' && s!=='À consommer vite') return false
      }
      return true
    })
    .sort((a,b)=>{
      if (sort==='name') return a.name.localeCompare(b.name)
      if (sort==='vintage') return b.vintage - a.vintage
      if (sort==='rating') return (b.rating||0)-(a.rating||0)
      if (sort==='price') return (b.price||0)-(a.price||0)
      return 0
    })

  const sel = { background:`rgba(201,168,76,0.06)`, border:`1px solid ${BORD}`, borderRadius:10, padding:'10px 12px', color:TEXT, fontSize:13, outline:'none', cursor:'pointer' }

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:'1 1 200px' }}>
          <div style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:MUTED, pointerEvents:'none' }}><SearchIcon /></div>
          <input style={{ ...sel, width:'100%', paddingLeft:34 }} placeholder="Vin, domaine, région…" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <select style={sel} value={type} onChange={e=>setType(e.target.value)}>
          <option value="all">Tous types</option>
          {Object.entries(TYPE_LABELS).map(([v,l])=><option key={v} value={v}>{TYPE_EMOJI[v]} {l}</option>)}
        </select>
        <select style={sel} value={statusF} onChange={e=>setStatusF(e.target.value)}>
          <option value="all">Tous statuts</option>
          <option value="ready">À maturité</option>
          <option value="young">Trop jeunes</option>
          <option value="urgent">À consommer vite</option>
        </select>
        <select style={sel} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="name">Nom A–Z</option>
          <option value="vintage">Millésime</option>
          <option value="rating">Note</option>
          <option value="price">Prix</option>
        </select>
      </div>

      <div style={{ fontSize:11, color:MUTED, marginBottom:12 }}>
        {list.length} vin{list.length>1?'s':''} · {list.reduce((s,w)=>s+w.quantity,0)} bouteilles
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:52, marginBottom:14, opacity:0.3 }}>🍾</div>
          <div style={{ fontSize:15, color:SUB }}>Cave vide ou aucun résultat</div>
          <div style={{ fontSize:12, color:MUTED, marginTop:6 }}>Ajoutez votre premier vin pour commencer</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:12 }}>
          {list.map(w=><WineCard key={w.id} wine={w} onClick={()=>onSelect(w)} onEdit={onEdit} onDelete={onDelete}/>)}
        </div>
      )}
    </div>
  )
}

// ─── Vue Accords ───────────────────────────────────────────────────────────────
function AccordsView({ wines }) {
  const allFoods = [...new Set(wines.flatMap(w=>w.foodPairings||[]))].sort()
  const byFood = {}
  allFoods.forEach(f=>{ byFood[f]=wines.filter(w=>w.foodPairings?.includes(f)) })
  const typeDot = { red:'#ca2e43', white:'#d97706', rosé:'#f43f5e', sparkling:'#06b6d4', sweet:'#f59e0b' }

  return (
    <div>
      <div style={{ marginBottom:18, padding:14, borderRadius:12, background:`rgba(201,168,76,0.06)`, border:`1px solid ${BORD}` }}>
        <p style={{ fontSize:12, color:SUB, lineHeight:1.7 }}>
          Accords mets & vins issus de votre cave. Chaque plat est associé aux bouteilles que vous avez sélectionnées.
        </p>
      </div>
      {allFoods.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:52, marginBottom:14, opacity:0.3 }}>🍽️</div>
          <div style={{ fontSize:15, color:SUB }}>Aucun accord défini</div>
          <div style={{ fontSize:12, color:MUTED, marginTop:6 }}>Ajoutez des accords lors de l'édition d'un vin</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:12 }}>
          {allFoods.map(food=>(
            <div key={food} style={{ padding:15, borderRadius:13, background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${BORD}` }}>
              <div style={{ fontSize:13, fontWeight:700, color:TEXT, marginBottom:10, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>🍽️</span> {food}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {byFood[food].map(w=>(
                  <div key={w.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:9, background:`rgba(201,168,76,0.04)`, border:`1px solid ${BORD}` }}>
                    <span style={{ fontSize:14 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, color:SUB, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.name}</div>
                      <div style={{ fontSize:10, color:MUTED }}>{w.vintage} · {TYPE_LABELS[w.type]}</div>
                    </div>
                    {w.rating>0 && <StarRating value={w.rating} size={9}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Base de données vins à acheter ───────────────────────────────────────────
const WINE_DB = [
  // Rouges légers & fruités
  { name:'Pinot Noir d\'Alsace', appellation:'Alsace', region:'Alsace', type:'red', body:'light', taste:['fruité','floral','léger'], budget:[8,18], cepages:['Pinot Noir'], foods:['Charcuterie','Saumon grillé','Volaille','Fromages doux'], desc:'Léger, fruité, notes de cerise et framboise. Parfait en entrée de gamme.', score:87, garde:'1-4 ans' },
  { name:'Bourgogne Pinot Noir', appellation:'Bourgogne', region:'Bourgogne', type:'red', body:'light', taste:['fruité','élégant','minéral'], budget:[15,35], cepages:['Pinot Noir'], foods:['Volaille rôtie','Veau','Champignons','Comté'], desc:'Élégance bourguignonne, fruits rouges et notes terreuses caractéristiques.', score:89, garde:'3-8 ans' },
  { name:'Gevrey-Chambertin', appellation:'Gevrey-Chambertin', region:'Bourgogne', type:'red', body:'medium', taste:['complexe','épicé','terroir'], budget:[40,120], cepages:['Pinot Noir'], foods:['Bœuf bourguignon','Gibier','Canard','Époisses'], desc:'Grand terroir bourguignon. Tanins soyeux, finale longue et complexe.', score:94, garde:'8-20 ans' },
  { name:'Côte de Nuits-Villages', appellation:'Côte de Nuits', region:'Bourgogne', type:'red', body:'medium', taste:['fruité','structuré','terroir'], budget:[20,40], cepages:['Pinot Noir'], foods:['Magret de canard','Bœuf','Fromages affinés'], desc:'Porte d\'entrée idéale vers les grands vins de la Côte de Nuits.', score:90, garde:'5-12 ans' },
  // Rouges puissants
  { name:'Château Pichon Baron', appellation:'Pauillac', region:'Bordeaux', type:'red', body:'full', taste:['puissant','tannique','boisé'], budget:[60,150], cepages:['Cabernet Sauvignon','Merlot'], foods:['Agneau rôti','Filet de bœuf','Truffe'], desc:'Classique bordelais puissant. Fruits noirs, cèdre, finale tannique élégante.', score:95, garde:'15-30 ans' },
  { name:'Saint-Émilion Grand Cru', appellation:'Saint-Émilion', region:'Bordeaux', type:'red', body:'full', taste:['charnu','fruité','velouté'], budget:[25,80], cepages:['Merlot','Cabernet Franc'], foods:['Côte de bœuf','Magret','Foie gras'], desc:'Dominante Merlot, rondeur et générosité. Plus accessible que les Médocs.', score:91, garde:'8-20 ans' },
  { name:'Côtes du Rhône Villages', appellation:'Côtes du Rhône', region:'Vallée du Rhône', type:'red', body:'medium', taste:['épicé','fruité','chaleureux'], budget:[8,20], cepages:['Grenache','Syrah','Mourvèdre'], foods:['Daube','Pizza','Charcuterie','Grillades'], desc:'Rapport qualité-prix imbattable. Garrigue, fruits rouges, épices douces.', score:86, garde:'2-6 ans' },
  { name:'Châteauneuf-du-Pape', appellation:'Châteauneuf-du-Pape', region:'Vallée du Rhône', type:'red', body:'full', taste:['puissant','chaleureux','complexe'], budget:[30,80], cepages:['Grenache','Mourvèdre','Syrah'], foods:['Gibier','Agneau','Fromages puissants','Truffe'], desc:'Soleil du Rhône concentré. Alcool généreux, fruits mûrs, épices méditerranéennes.', score:93, garde:'8-20 ans' },
  { name:'Crozes-Hermitage', appellation:'Crozes-Hermitage', region:'Vallée du Rhône', type:'red', body:'medium', taste:['épicé','fumé','fruits noirs'], budget:[15,35], cepages:['Syrah'], foods:['Gibier','Daube provençale','Fromages affinés'], desc:'Syrah du Rhône septentrional. Olive noire, viande fumée, poivre blanc.', score:90, garde:'5-12 ans' },
  { name:'Barolo', appellation:'Barolo', region:'Piémont', type:'red', body:'full', taste:['tannique','complexe','floral'], budget:[35,100], cepages:['Nebbiolo'], foods:['Truffe blanche','Bœuf braisé','Gibier','Fromages affinés'], desc:'Le roi des vins italiens. Tanins puissants, rose fanée, goudron. Garde exceptionnelle.', score:96, garde:'15-30 ans' },
  { name:'Chianti Classico Riserva', appellation:'Chianti Classico', region:'Toscane', type:'red', body:'medium', taste:['fruité','épicé','acidité'], budget:[18,45], cepages:['Sangiovese'], foods:['Pasta bolognaise','Pizza','Viandes rouges','Pecorino'], desc:'Toscane authentique. Cerise, herbes, acidité fraîche et persistante.', score:91, garde:'5-15 ans' },
  { name:'Rioja Reserva', appellation:'Rioja', region:'Rioja', type:'red', body:'medium', taste:['boisé','vanillé','fruité'], budget:[12,30], cepages:['Tempranillo'], foods:['Agneau rôti','Jambon ibérique','Chorizo'], desc:'Espagne classique. Vieillissement en fût de chêne américain, vanille et fruits rouges.', score:89, garde:'5-12 ans' },
  // Blancs secs
  { name:'Sancerre', appellation:'Sancerre', region:'Loire', type:'white', body:'light', taste:['minéral','vif','fruité'], budget:[15,30], cepages:['Sauvignon Blanc'], foods:['Huîtres','Chèvre frais','Asperges','Poissons'], desc:'Le Sauvignon par excellence. Pierre à fusil, buis, agrumes, fraîcheur absolue.', score:91, garde:'2-6 ans' },
  { name:'Pouilly-Fumé', appellation:'Pouilly-Fumé', region:'Loire', type:'white', body:'light', taste:['fumé','minéral','vif'], budget:[18,40], cepages:['Sauvignon Blanc'], foods:['Chèvre','Asperges','Saumon','Crevettes'], desc:'Cousin du Sancerre, plus fumé. Minéralité unique, grande fraîcheur.', score:92, garde:'3-8 ans' },
  { name:'Chablis 1er Cru', appellation:'Chablis', region:'Bourgogne', type:'white', body:'medium', taste:['minéral','vif','iodé'], budget:[20,45], cepages:['Chardonnay'], foods:['Huîtres','Fruits de mer','Poissons nobles','Saint-Jacques'], desc:'Chardonnay le plus minéral qui soit. Silex, iode, citron vert. Accord huîtres parfait.', score:93, garde:'4-10 ans' },
  { name:'Puligny-Montrachet', appellation:'Puligny-Montrachet', region:'Bourgogne', type:'white', body:'full', taste:['complexe','beurré','minéral'], budget:[50,150], cepages:['Chardonnay'], foods:['Homard','Saint-Jacques','Truffe blanche','Sole'], desc:'Sommet du Chardonnay mondial. Beurre frais, noisette, minéralité profonde.', score:96, garde:'8-20 ans' },
  { name:'Meursault', appellation:'Meursault', region:'Bourgogne', type:'white', body:'full', taste:['beurré','noisette','opulent'], budget:[35,90], cepages:['Chardonnay'], foods:['Volaille à la crème','Poissons gras','Langoustines','Camembert'], desc:'Opulence bourguignonne. Beurre, noisette, miel. Plus généreux que Puligny.', score:94, garde:'6-15 ans' },
  { name:'Alsace Riesling Grand Cru', appellation:'Alsace Grand Cru', region:'Alsace', type:'white', body:'medium', taste:['minéral','pétrolé','vif'], budget:[20,50], cepages:['Riesling'], foods:['Choucroute','Poissons','Crustacés','Munster'], desc:'Riesling au sommet. Notes pétrolées avec l\'âge, acidité tendue, longévité exceptionnelle.', score:94, garde:'10-25 ans' },
  { name:'Condrieu', appellation:'Condrieu', region:'Vallée du Rhône', type:'white', body:'full', taste:['floral','exotique','opulent'], budget:[30,70], cepages:['Viognier'], foods:['Foie gras','Homard à la vanille','Poulet à la crème','Abricots'], desc:'Viognier pur, seul au monde à ce niveau. Abricot, violette, miel. Déroutant de luxe.', score:95, garde:'3-8 ans' },
  { name:'Muscadet Sèvre et Maine', appellation:'Muscadet', region:'Loire', type:'white', body:'light', taste:['minéral','iodé','vif'], budget:[6,15], cepages:['Melon de Bourgogne'], foods:['Huîtres','Moules marinières','Crevettes','Poissons'], desc:'Le vin des fruits de mer par excellence. Sur lie = plus de texture. Prix imbattable.', score:85, garde:'1-3 ans' },
  // Rosés
  { name:'Bandol Rosé', appellation:'Bandol', region:'Provence', type:'rosé', body:'medium', taste:['structuré','fruité','garrigue'], budget:[18,40], cepages:['Mourvèdre','Grenache'], foods:['Bouillabaisse','Grillades','Ratatouille','Tapenade'], desc:'Le roi des rosés provençaux. Tenue en bouche rare pour un rosé, fruits rouges et garrigue.', score:92, garde:'2-5 ans' },
  { name:'Tavel', appellation:'Tavel', region:'Vallée du Rhône', type:'rosé', body:'full', taste:['puissant','fruité','épicé'], budget:[12,22], cepages:['Grenache','Syrah'], foods:['Charcuterie','Grillades','Tajine','Fromages'], desc:'Le seul AOC 100% rosé de France. Charnu, coloré, peut se garder.', score:88, garde:'2-4 ans' },
  { name:'Côtes de Provence Rosé', appellation:'Côtes de Provence', region:'Provence', type:'rosé', body:'light', taste:['léger','fruité','floral'], budget:[8,20], cepages:['Grenache','Cinsault','Syrah'], foods:['Salade niçoise','Poissons grillés','Pizza','Apéritif'], desc:'L\'incontournable de l\'été. Pâle, frais, fleurs blanches et fruits exotiques.', score:86, garde:'1-2 ans' },
  // Effervescents
  { name:'Champagne Blanc de Blancs', appellation:'Champagne', region:'Champagne', type:'sparkling', body:'light', taste:['minéral','vif','élégant'], budget:[30,80], cepages:['Chardonnay'], foods:['Huîtres','Caviar','Saint-Jacques','Sushis'], desc:'100% Chardonnay, finesse absolue. Craie, citron, brioche légère. Apéritif de prestige.', score:93, garde:'5-15 ans' },
  { name:'Champagne Rosé', appellation:'Champagne', region:'Champagne', type:'sparkling', body:'medium', taste:['fruité','élégant','vif'], budget:[35,100], cepages:['Pinot Noir','Chardonnay'], foods:['Fraises','Saumon','Canard','Desserts aux fruits rouges'], desc:'Champagne rosé : fraise, framboise, petites bulles élégantes. Festif et versatile.', score:91, garde:'5-10 ans' },
  { name:'Crémant d\'Alsace', appellation:'Crémant d\'Alsace', region:'Alsace', type:'sparkling', body:'light', taste:['fruité','vif','frais'], budget:[10,20], cepages:['Pinot Blanc','Auxerrois'], foods:['Apéritif','Poissons','Fruits de mer','Desserts légers'], desc:'Meilleure alternative au Champagne en rapport Q/P. Frais, fruité, bulles fines.', score:88, garde:'2-5 ans' },
  // Liquoreux
  { name:'Sauternes', appellation:'Sauternes', region:'Bordeaux', type:'sweet', body:'full', taste:['doux','mielleux','complexe'], budget:[25,200], cepages:['Sémillon','Sauvignon'], foods:['Foie gras','Roquefort','Desserts exotiques','Tarte Tatin'], desc:'Le plus grand vin liquoreux du monde. Miel, abricot confit, botrytis noble unique.', score:96, garde:'20-50 ans' },
  { name:'Gewurztraminer Vendanges Tardives', appellation:'Alsace', region:'Alsace', type:'sweet', body:'full', taste:['exotique','doux','floral'], budget:[20,50], cepages:['Gewurztraminer'], foods:['Foie gras','Roquefort','Curry','Tarte aux mirabelles'], desc:'Litchi, rose, mangue, sucrosité équilibrée par l\'acidité alsacienne. Déroutant.', score:93, garde:'10-20 ans' },
]

const TASTE_OPTIONS = [
  { id:'léger', label:'Léger & délicat', icon:'🌸', desc:'Vins subtils, peu alcoolisés' },
  { id:'fruité', label:'Fruité & gourmand', icon:'🍓', desc:'Beaucoup de fruit, accessible' },
  { id:'minéral', label:'Minéral & vif', icon:'🪨', desc:'Fraîcheur, acidité, terroir' },
  { id:'boisé', label:'Boisé & vanillé', icon:'🪵', desc:'Passage en fût de chêne' },
  { id:'épicé', label:'Épicé & poivré', icon:'🌶️', desc:'Herbes, épices, garrigue' },
  { id:'puissant', label:'Puissant & tannique', icon:'💪', desc:'Structure, garde, concentration' },
  { id:'doux', label:'Doux & liquoreux', icon:'🍯', desc:'Sucré, mielleux, onctueux' },
  { id:'complexe', label:'Complexe & élégant', icon:'✨', desc:'Nuances, longueur, profondeur' },
]

const OCCASION_OPTIONS = [
  { id:'apero', label:'Apéritif', icon:'🥂' },
  { id:'poisson', label:'Poissons & fruits de mer', icon:'🐟' },
  { id:'viande', label:'Viandes & gibier', icon:'🥩' },
  { id:'fromage', label:'Fromages', icon:'🧀' },
  { id:'dessert', label:'Desserts', icon:'🍰' },
  { id:'fete', label:'Fête & célébration', icon:'🎉' },
  { id:'cadeau', label:'Cadeau', icon:'🎁' },
  { id:'cave', label:'Cave & investissement', icon:'📈' },
]

const BUDGET_RANGES = [
  { id:'b1', label:'< 15€', max:15, min:0, icon:'💰' },
  { id:'b2', label:'15 – 30€', max:30, min:15, icon:'💰💰' },
  { id:'b3', label:'30 – 60€', max:60, min:30, icon:'💰💰💰' },
  { id:'b4', label:'60 – 150€', max:150, min:60, icon:'💎' },
  { id:'b5', label:'+ de 150€', max:9999, min:150, icon:'👑' },
]

// ─── Vue Choisir un Vin ────────────────────────────────────────────────────────
function ChoisirView() {
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState({ type: null, tastes: [], occasion: null, budget: null })
  const [results, setResults] = useState(null)

  const toggle = (field, val, multi = false) => {
    if (multi) {
      setSel(s => ({ ...s, [field]: s[field].includes(val) ? s[field].filter(x=>x!==val) : [...s[field], val] }))
    } else {
      setSel(s => ({ ...s, [field]: s[field] === val ? null : val }))
    }
  }

  const compute = () => {
    let scored = WINE_DB.map(w => {
      let score = 0
      if (sel.type && sel.type !== 'all' && w.type !== sel.type) return null
      if (sel.budget) {
        const b = BUDGET_RANGES.find(b => b.id === sel.budget)
        if (b && (w.budget[0] > b.max || w.budget[1] < b.min)) return null
      }
      if (sel.tastes.length > 0) {
        const matches = sel.tastes.filter(t => w.taste.includes(t)).length
        if (matches === 0) score -= 10
        score += matches * 15
      }
      if (sel.occasion) {
        const occasionFoodMap = {
          apero: ['Apéritif','Charcuterie','Tapenade'],
          poisson: ['Poissons','Saumon','Huîtres','Fruits de mer','Saint-Jacques','Moules marinières','Sole','Turbot'],
          viande: ['Bœuf','Agneau','Gibier','Magret','Côte de bœuf','Filet de bœuf','Côte de bœuf'],
          fromage: ['Fromages','Comté','Reblochon','Époisses','Chèvre','Munster','Pecorino','Roquefort'],
          dessert: ['Desserts','Tarte','Fraises'],
          fete: ['Champagne'],
          cadeau: [],
          cave: [],
        }
        const foods = occasionFoodMap[sel.occasion] || []
        const match = w.foods.some(f => foods.some(occ => f.toLowerCase().includes(occ.toLowerCase())))
        if (match) score += 20
        if (sel.occasion === 'fete' && w.type === 'sparkling') score += 30
        if (sel.occasion === 'cadeau' && w.score >= 92) score += 20
        if (sel.occasion === 'cave' && w.garde.includes('ans') && parseInt(w.garde) >= 8) score += 20
      }
      score += (w.score - 85) * 2
      return { ...w, matchScore: score }
    }).filter(Boolean).sort((a,b) => b.matchScore - a.matchScore)
    setResults(scored.slice(0, 6))
    setStep(4)
  }

  const reset = () => { setSel({ type: null, tastes: [], occasion: null, budget: null }); setResults(null); setStep(0) }

  const typeColor = { red:'#ca2e43', white:'#d97706', rosé:'#f43f5e', sparkling:'#06b6d4', sweet:'#f59e0b' }
  const typeLabel = { red:'Rouge', white:'Blanc', rosé:'Rosé', sparkling:'Effervescent', sweet:'Liquoreux', all:'Tous' }

  const btnBase = { padding:'10px 14px', borderRadius:11, cursor:'pointer', fontSize:13, fontWeight:500, transition:'all 0.15s', textAlign:'left' }
  const selected = (active) => active
    ? { ...btnBase, background:'rgba(139,26,48,0.25)', border:'1px solid rgba(139,26,48,0.55)', color:'#f9a8b8' }
    : { ...btnBase, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#9ca3af' }

  const progress = Math.round((step / 4) * 100)

  return (
    <div style={{ maxWidth:860, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:28, padding:'24px 28px', borderRadius:18, background:'linear-gradient(135deg,#3e0c17 0%,#1a0a1a 55%,#0a0a0f 100%)', border:'1px solid rgba(139,26,48,0.28)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 70% 50%,rgba(139,26,48,0.15) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative' }}>
          <div style={{ fontSize:11, color:'#ca2e43', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:6, fontWeight:700 }}>Aide au choix</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'#e8e0d5', fontFamily:'Georgia,serif', marginBottom:8 }}>Quel vin choisir ?</h2>
          <p style={{ color:'#9ca3af', fontSize:13 }}>Répondez à 3 questions pour trouver le vin parfait selon votre goût, l'occasion et votre budget.</p>
        </div>
      </div>

      {step < 4 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#6b7280', marginBottom:8 }}>
            <span>{step === 0 ? 'Type de vin' : step === 1 ? 'Goût & style' : step === 2 ? 'Occasion' : 'Budget'}</span>
            <span>Étape {step+1} / 4</span>
          </div>
          <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
            <div style={{ height:'100%', width:`${(step+1)*25}%`, background:'linear-gradient(90deg,#8c2030,#ca2e43)', borderRadius:2, transition:'width 0.3s' }}/>
          </div>
        </div>
      )}

      {/* Étape 0 : Type */}
      {step === 0 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Quel type de vin ?</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10, marginBottom:24 }}>
            {[
              { id:'all', label:'Peu importe', icon:'🍷' },
              { id:'red', label:'Rouge', icon:'🔴' },
              { id:'white', label:'Blanc', icon:'⚪' },
              { id:'rosé', label:'Rosé', icon:'🌸' },
              { id:'sparkling', label:'Effervescent', icon:'🥂' },
              { id:'sweet', label:'Liquoreux', icon:'🍯' },
            ].map(t => (
              <button key={t.id} onClick={() => toggle('type', t.id)} style={{
                ...selected(sel.type === t.id),
                display:'flex', flexDirection:'column', alignItems:'center', padding:'16px 10px', gap:8, borderRadius:13,
              }}>
                <span style={{ fontSize:24 }}>{t.icon}</span>
                <span style={{ fontSize:12, fontWeight:600 }}>{t.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!sel.type}
            style={{ width:'100%', padding:'12px', background: sel.type ? 'linear-gradient(135deg,#8c2030,#ca2e43)' : 'rgba(255,255,255,0.05)', border:'none', borderRadius:11, color: sel.type ? '#fff' : '#4b5563', cursor: sel.type ? 'pointer' : 'default', fontSize:14, fontWeight:700 }}>
            Continuer →
          </button>
        </div>
      )}

      {/* Étape 1 : Goût */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:6 }}>Quel(s) style(s) vous attire(nt) ?</h3>
          <p style={{ fontSize:12, color:'#6b7280', marginBottom:16 }}>Sélectionnez 1 à 3 styles (facultatif)</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:9, marginBottom:24 }}>
            {TASTE_OPTIONS.map(t => (
              <button key={t.id} onClick={() => toggle('tastes', t.id, true)} style={{
                ...selected(sel.tastes.includes(t.id)),
                display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
              }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color: sel.tastes.includes(t.id) ? '#f9a8b8' : '#c9bfb5' }}>{t.label}</div>
                  <div style={{ fontSize:10, color:'#6b7280', marginTop:1 }}>{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(0)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={() => setStep(2)} style={{ flex:3, padding:'12px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:11, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700 }}>Continuer →</button>
          </div>
        </div>
      )}

      {/* Étape 2 : Occasion */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Pour quelle occasion ?</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10, marginBottom:24 }}>
            {OCCASION_OPTIONS.map(o => (
              <button key={o.id} onClick={() => toggle('occasion', o.id)} style={{
                ...selected(sel.occasion === o.id),
                display:'flex', alignItems:'center', gap:10, padding:'13px 14px',
              }}>
                <span style={{ fontSize:22 }}>{o.icon}</span>
                <span style={{ fontSize:12, fontWeight:600 }}>{o.label}</span>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(1)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={() => setStep(3)} style={{ flex:3, padding:'12px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:11, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700 }}>Continuer →</button>
          </div>
        </div>
      )}

      {/* Étape 3 : Budget */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Quel est votre budget ?</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:24 }}>
            {BUDGET_RANGES.map(b => (
              <button key={b.id} onClick={() => toggle('budget', b.id)} style={{
                ...selected(sel.budget === b.id),
                display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:18 }}>{b.icon}</span>
                  <span style={{ fontSize:14, fontWeight:600 }}>{b.label}</span>
                </div>
                {sel.budget === b.id && <span style={{ fontSize:16 }}>✓</span>}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(2)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={compute} disabled={!sel.budget}
              style={{ flex:3, padding:'12px', background: sel.budget ? 'linear-gradient(135deg,#8c2030,#ca2e43)' : 'rgba(255,255,255,0.05)', border:'none', borderRadius:11, color: sel.budget ? '#fff' : '#4b5563', cursor: sel.budget ? 'pointer' : 'default', fontSize:14, fontWeight:700 }}>
              Voir mes recommandations 🍷
            </button>
          </div>
        </div>
      )}

      {/* Résultats */}
      {step === 4 && results && (
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
            <div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif' }}>
                {results.length} vin{results.length > 1 ? 's' : ''} recommandé{results.length > 1 ? 's' : ''}
              </h3>
              <p style={{ fontSize:12, color:'#6b7280', marginTop:3 }}>
                {sel.type && sel.type !== 'all' ? typeLabel[sel.type] : 'Tous types'} · {sel.budget ? BUDGET_RANGES.find(b=>b.id===sel.budget)?.label : 'Tous budgets'}
                {sel.occasion ? ` · ${OCCASION_OPTIONS.find(o=>o.id===sel.occasion)?.label}` : ''}
              </p>
            </div>
            <button onClick={reset} style={{ padding:'8px 16px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>
              ↺ Recommencer
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {results.map((w, i) => (
              <div key={w.name} style={{
                padding:18, borderRadius:15,
                background: i === 0 ? 'linear-gradient(145deg,#1e1620,#160e14)' : 'linear-gradient(145deg,#1a1a24,#111118)',
                border: i === 0 ? '1px solid rgba(139,26,48,0.5)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: i === 0 ? '0 4px 20px rgba(139,26,48,0.12)' : 'none',
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  {/* Rang */}
                  <div style={{ width:34, height:34, borderRadius:10, background: i===0 ? 'linear-gradient(135deg,#d4a017,#f5c842)' : 'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, fontSize:14, color: i===0 ? '#000' : '#6b7280' }}>
                    {i+1}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:7, marginBottom:5, flexWrap:'wrap', alignItems:'center' }}>
                      <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, background:`rgba(${typeColor[w.type]==='#ca2e43'?'202,46,67':typeColor[w.type]==='#d97706'?'217,119,6':typeColor[w.type]==='#f43f5e'?'244,63,94':typeColor[w.type]==='#06b6d4'?'6,182,212':'245,158,11'},0.18)`, color:typeColor[w.type], fontWeight:600 }}>
                        {typeLabel[w.type]}
                      </span>
                      <span style={{ fontSize:10, color:'#6b7280' }}>{w.appellation}</span>
                      {i === 0 && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, background:'rgba(212,160,23,0.15)', color:'#d4a017', fontWeight:700 }}>★ Meilleur choix</span>}
                    </div>
                    <div style={{ fontSize:15, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif', marginBottom:3 }}>{w.name}</div>
                    <div style={{ fontSize:12, color:'#9ca3af', marginBottom:8, lineHeight:1.5 }}>{w.desc}</div>

                    {/* Détails */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:8 }}>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Budget</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#d97706' }}>{w.budget[0]}€ – {w.budget[1]}€</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Garde</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#60a5fa' }}>{w.garde}</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Note critique</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#f59e0b' }}>{w.score} / 100</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Cépage</div>
                        <div style={{ fontSize:12, fontWeight:600, color:'#f9a8b8' }}>{w.cepages.join(', ')}</div>
                      </div>
                    </div>

                    {/* Accords */}
                    <div style={{ marginTop:10 }}>
                      <div style={{ fontSize:10, color:'#6b7280', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Accords mets & vins</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {w.foods.map(f=>(
                          <span key={f} style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'rgba(20,50,20,0.5)', border:'1px solid rgba(34,100,34,0.3)', color:'#86efac' }}>{f}</span>
                        ))}
                      </div>
                    </div>

                    {/* Style tags */}
                    <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:5 }}>
                      {w.taste.map(t=>(
                        <span key={t} style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'rgba(120,53,15,0.2)', border:'1px solid rgba(180,83,9,0.3)', color:'#fcd34d' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Carte des Vignobles ───────────────────────────────────────────────────────
const CARTE_REGIONS = [
  { id:'Champagne',  label:'Champagne',        x:308, y:108, color:'#c9a84c', oeno:['Champagne'] },
  { id:'Alsace',     label:'Alsace',            x:422, y:150, color:'#d4a040', oeno:['Alsace'] },
  { id:'Bourgogne',  label:'Bourgogne',         x:320, y:262, color:'#8c2030', oeno:['Bourgogne'] },
  { id:'Jura',       label:'Jura',              x:368, y:248, color:'#b09050', oeno:['Jura'] },
  { id:'Beaujolais', label:'Beaujolais',        x:302, y:312, color:'#a02838', oeno:['Beaujolais'] },
  { id:'Loire',      label:'Loire',             x:178, y:232, color:'#c9a84c', oeno:['Loire'] },
  { id:'Bordeaux',   label:'Bordeaux',          x:138, y:378, color:'#8c2030', oeno:['Bordeaux'] },
  { id:'SudOuest',   label:'Sud-Ouest',         x:185, y:445, color:'#a02838', oeno:['Sud-Ouest'] },
  { id:'Languedoc',  label:'Languedoc',         x:272, y:455, color:'#8c2030', oeno:['Languedoc'] },
  { id:'Rhone',      label:'Vallée du Rhône',   x:342, y:342, color:'#8c2030', oeno:['Rhône Nord','Rhône Sud'] },
  { id:'Provence',   label:'Provence',          x:375, y:428, color:'#d4406a', oeno:['Provence'] },
  { id:'Corse',      label:'Corse',             x:448, y:482, color:'#d4406a', oeno:['Corse'] },
]

const CARTE_WINE_ALIASES = {
  Champagne:  ['champagne'],
  Alsace:     ['alsace'],
  Bourgogne:  ['bourgogne', 'burgundy'],
  Jura:       ['jura'],
  Beaujolais: ['beaujolais'],
  Loire:      ['loire', 'val de loire'],
  Bordeaux:   ['bordeaux'],
  SudOuest:   ['sud-ouest', 'cahors', 'madiran', 'jurançon'],
  Languedoc:  ['languedoc', 'roussillon', 'minervois', 'faugères'],
  Rhone:      ['rhône', 'rhone', 'vallée du rhône'],
  Provence:   ['provence', 'bandol'],
  Corse:      ['corse'],
}

function getCarteRegionWines(regionId, wines) {
  const terms = CARTE_WINE_ALIASES[regionId] || [regionId.toLowerCase()]
  return wines.filter(w => terms.some(t => (w.region||'').toLowerCase().includes(t)))
}

function CarteView({ wines, onSelectWine, onDelete }) {
  const [sel, setSel] = useState(null)

  const selReg   = CARTE_REGIONS.find(r => r.id === sel)
  const selWines = sel ? getCarteRegionWines(sel, wines) : []
  const selOeno  = sel ? OENO_DB.filter(r => selReg.oeno.some(o => r[2].toLowerCase().includes(o.toLowerCase()))).slice(0, 10) : []

  const bottleCount = id => getCarteRegionWines(id, wines).reduce((s,w)=>s+w.quantity, 0)

  return (
    <div>
      {/* En-tête */}
      <div style={{ marginBottom:18, padding:'16px 20px', borderRadius:16, background:`linear-gradient(135deg, #3e1420 0%, #1c0c10 55%, ${BG} 100%)`, border:`1px solid rgba(201,168,76,0.22)`, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'35%', background:'radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ fontSize:10, color:GOLD, textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:700, marginBottom:5 }}>Vignobles de France</div>
        <div style={{ fontSize:14, fontWeight:700, color:TEXT, fontFamily:'Georgia,serif', marginBottom:4 }}>Carte des régions viticoles</div>
        <div style={{ fontSize:12, color:SUB, lineHeight:1.6 }}>
          Sélectionnez un vignoble pour explorer vos bouteilles et les conseils de dégustation par région.
        </div>
      </div>

      <div style={{ display:'flex', gap:18, flexWrap:'wrap', alignItems:'flex-start' }}>

        {/* ── SVG Map ── */}
        <div style={{ flex:'0 0 auto', width:'100%', maxWidth:480 }}>
          <svg viewBox="0 0 480 520" style={{ width:'100%', display:'block', filter:'drop-shadow(0 6px 28px rgba(140,32,48,0.18))' }}>
            {/* Fond léger */}
            <rect width="480" height="520" fill="transparent" />

            {/* Silhouette France */}
            <path
              d="M 235,25 L 292,18 L 352,35 L 400,62 L 432,108 L 448,162 L 442,222 L 428,268 L 415,322 L 398,370 L 378,422 L 348,462 L 300,485 L 252,490 L 188,472 L 122,445 L 88,408 L 72,352 L 78,292 L 68,238 L 58,196 L 35,178 L 58,148 L 112,112 L 148,78 L 180,50 L 218,30 Z"
              fill="rgba(28,12,16,0.88)"
              stroke="rgba(201,168,76,0.28)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Contours internes subtils (rivières / axes viticoles) */}
            <path d="M 250,260 Q 310,310 340,342 Q 360,380 378,422" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1"/>
            <path d="M 178,232 Q 220,260 258,268" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1"/>

            {/* Marqueurs régions */}
            {CARTE_REGIONS.map(r => {
              const count = bottleCount(r.id)
              const active = sel === r.id
              const hasWine = count > 0
              return (
                <g key={r.id} onClick={() => setSel(active ? null : r.id)} style={{ cursor:'pointer' }}>
                  {/* Halo sélection */}
                  {active && (
                    <>
                      <circle cx={r.x} cy={r.y} r={22} fill={`${r.color}14`} />
                      <circle cx={r.x} cy={r.y} r={17} fill={`${r.color}20`} stroke={`${r.color}55`} strokeWidth="1"/>
                    </>
                  )}
                  {/* Cercle principal */}
                  <circle
                    cx={r.x} cy={r.y}
                    r={active ? 13 : hasWine ? 11 : 7}
                    fill={active ? r.color : hasWine ? `${r.color}cc` : 'rgba(255,255,255,0.1)'}
                    stroke={active ? 'rgba(255,255,255,0.8)' : hasWine ? r.color : 'rgba(255,255,255,0.18)'}
                    strokeWidth={active ? 1.8 : 1.2}
                  />
                  {/* Contenu marqueur */}
                  {hasWine ? (
                    <text x={r.x} y={r.y+4.5} textAnchor="middle" fontSize={active?9:8}
                      fill={active?'#0f0508':'#fff'} fontWeight="800" fontFamily="sans-serif">
                      {count}
                    </text>
                  ) : (
                    <circle cx={r.x} cy={r.y} r={2} fill="rgba(255,255,255,0.35)" />
                  )}
                  {/* Label région */}
                  <text x={r.x} y={r.y + (active?27:22)} textAnchor="middle"
                    fontSize={active ? 8.5 : 7.5}
                    fill={active ? r.color : hasWine ? 'rgba(245,237,224,0.75)' : 'rgba(168,144,128,0.55)'}
                    fontWeight={active ? 700 : hasWine ? 600 : 400}
                    fontFamily="Georgia, serif"
                    style={{ pointerEvents:'none' }}
                  >
                    {r.label}
                  </text>
                </g>
              )
            })}

            {/* Légende */}
            <g>
              <circle cx={16} cy={492} r={5} fill="rgba(201,168,76,0.7)" />
              <text x={26} y={496} fontSize={7.5} fill="rgba(201,168,76,0.55)" fontFamily="sans-serif">bouteilles dans la cave</text>
              <circle cx={16} cy={507} r={5} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
              <text x={26} y={511} fontSize={7.5} fill="rgba(168,144,128,0.45)" fontFamily="sans-serif">aucune référence</text>
            </g>
          </svg>
        </div>

        {/* ── Panneau détail ── */}
        <div style={{ flex:'1 1 260px', minWidth:250 }}>

          {!sel ? (
            /* Vue par défaut : liste des régions avec bouteilles */
            <div>
              <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:700, marginBottom:12 }}>Vos vignobles</div>
              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                {CARTE_REGIONS.map(r => {
                  const count = bottleCount(r.id)
                  const refs = getCarteRegionWines(r.id, wines).length
                  return (
                    <div key={r.id} onClick={()=>setSel(r.id)} style={{
                      display:'flex', alignItems:'center', gap:12, padding:'11px 14px',
                      background: count > 0 ? `linear-gradient(145deg,${CARD},${SURF})` : 'rgba(255,255,255,0.02)',
                      border:`1px solid ${count > 0 ? BORD : 'rgba(255,255,255,0.04)'}`,
                      borderRadius:12, cursor:'pointer', transition:'all 0.15s',
                    }}
                      onMouseEnter={e=>{ if(count>0) e.currentTarget.style.borderColor=`${r.color}55` }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor=count>0?BORD:'rgba(255,255,255,0.04)' }}
                    >
                      <div style={{ width:8, height:8, borderRadius:'50%', background: count > 0 ? r.color : 'rgba(255,255,255,0.12)', flexShrink:0 }} />
                      <span style={{ fontSize:13, color: count > 0 ? TEXT : MUTED, fontFamily:'Georgia,serif', flex:1 }}>{r.label}</span>
                      {count > 0 ? (
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontSize:13, fontWeight:800, color:GOLD }}>{count}</div>
                          <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>{refs} réf.</div>
                        </div>
                      ) : (
                        <span style={{ fontSize:10, color:MUTED, fontStyle:'italic' }}>vide</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Détail région sélectionnée */
            <div>
              {/* Header région */}
              <div style={{ padding:'16px 18px', borderRadius:14, background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${selReg?.color || BORD}55`, marginBottom:14 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
                  <div>
                    <div style={{ fontSize:10, color:selReg?.color, textTransform:'uppercase', letterSpacing:'0.12em', fontWeight:700, marginBottom:4 }}>Vignoble</div>
                    <div style={{ fontSize:20, fontWeight:800, color:TEXT, fontFamily:'Georgia,serif', lineHeight:1.2 }}>{selReg?.label}</div>
                  </div>
                  <button onClick={()=>setSel(null)} style={{ padding:'6px 12px', background:'rgba(255,255,255,0.05)', border:`1px solid ${BORD}`, borderRadius:9, color:MUTED, cursor:'pointer', fontSize:11, flexShrink:0, marginTop:2 }}>
                    ✕
                  </button>
                </div>
                {selWines.length > 0 && (
                  <div style={{ display:'flex', gap:16, marginTop:14, paddingTop:12, borderTop:`1px solid ${BORD}` }}>
                    <div>
                      <div style={{ fontSize:22, fontWeight:900, color:GOLD }}>{selWines.reduce((s,w)=>s+w.quantity,0)}</div>
                      <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>bouteilles</div>
                    </div>
                    <div>
                      <div style={{ fontSize:22, fontWeight:900, color:SUB }}>{selWines.length}</div>
                      <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>références</div>
                    </div>
                    {selWines.filter(w=>w.rating>0).length>0 && (
                      <div>
                        <div style={{ fontSize:22, fontWeight:900, color:'#fbbf24' }}>
                          {Math.round(selWines.filter(w=>w.rating>0).reduce((s,w)=>s+w.rating,0)/selWines.filter(w=>w.rating>0).length)}
                        </div>
                        <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>note moy.</div>
                      </div>
                    )}
                    {selWines.reduce((s,w)=>s+(w.price||0)*w.quantity,0) > 0 && (
                      <div>
                        <div style={{ fontSize:22, fontWeight:900, background:'linear-gradient(135deg,#c9a84c,#e8c96a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                          {selWines.reduce((s,w)=>s+(w.price||0)*w.quantity,0).toLocaleString('fr')}€
                        </div>
                        <div style={{ fontSize:9, color:MUTED, textTransform:'uppercase' }}>valeur</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Vins de la cave */}
              {selWines.length > 0 ? (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.09em', fontWeight:700, marginBottom:10 }}>Dans votre cave</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {selWines.map(w => {
                      const ts = getTypeStyle(w.type)
                      const st = getDrinkStatus(w)
                      return (
                        <div key={w.id} style={{ borderRadius:13, overflow:'hidden', background:`linear-gradient(145deg,${CARD},${SURF})`, border:`1px solid ${BORD}` }}>
                          <div onClick={()=>onSelectWine(w)} style={{ display:'flex', gap:0, cursor:'pointer' }}>
                            <div style={{ width:56, minHeight:70, background:ts.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, borderRight:`1px solid ${BORD}`, overflow:'hidden' }}>
                              {w.photo
                                ? <img src={w.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                                : <span style={{ fontSize:22 }}>{TYPE_EMOJI[w.type]||'🍷'}</span>
                              }
                            </div>
                            <div style={{ flex:1, padding:'10px 13px', minWidth:0 }}>
                              <div style={{ display:'flex', gap:5, marginBottom:4 }}>
                                <span style={{ fontSize:9, padding:'1px 7px', borderRadius:10, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, fontWeight:700 }}>{TYPE_LABELS[w.type]}</span>
                                <span style={{ fontSize:9, padding:'1px 7px', borderRadius:10, background:st.bg, color:st.color, fontWeight:700 }}>{st.label}</span>
                              </div>
                              <div style={{ fontSize:13, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'Georgia,serif' }}>{w.name}</div>
                              <div style={{ fontSize:11, color:SUB, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.domain}</div>
                              <div style={{ display:'flex', gap:10, marginTop:5, alignItems:'center' }}>
                                <span style={{ fontSize:13, fontWeight:800, color:GOLD }}>{w.quantity} btl</span>
                                {w.price>0 && <span style={{ fontSize:11, color:MUTED }}>{w.price}€/btl</span>}
                                <span style={{ fontSize:10, color:SUB }}>{w.vintage}</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ display:'flex', borderTop:`1px solid ${BORD}` }}>
                            <button onClick={()=>onSelectWine(w)} style={{ flex:1, padding:'8px', background:'none', border:'none', color:SUB, cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'inherit' }}>
                              Fiche détaillée →
                            </button>
                            <div style={{ width:'1px', background:BORD }} />
                            <button onClick={()=>onDelete(w.id)} style={{ flex:1, padding:'8px', background:'none', border:'none', color:'#f87171', cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'inherit' }}>
                              🗑️ Supprimer
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ padding:'22px 18px', textAlign:'center', borderRadius:13, background:'rgba(255,255,255,0.02)', border:`1px solid ${BORD}`, marginBottom:14 }}>
                  <div style={{ fontSize:24, marginBottom:8, opacity:0.4 }}>🍾</div>
                  <div style={{ fontSize:13, color:SUB, fontFamily:'Georgia,serif' }}>Aucun vin de cette région</div>
                  <div style={{ fontSize:11, color:MUTED, marginTop:4 }}>Ajoutez une bouteille pour commencer</div>
                </div>
              )}

              {/* Données OENO */}
              {selOeno.length > 0 && (
                <div>
                  <div style={{ fontSize:10, color:MUTED, textTransform:'uppercase', letterSpacing:'0.09em', fontWeight:700, marginBottom:10 }}>📚 Conseils & millésimes</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {selOeno.map((r,i) => (
                      <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 13px', background:'rgba(255,255,255,0.02)', borderRadius:11, border:`1px solid ${BORD}` }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{TYPE_EMOJI[{Rouge:'red',Blanc:'white',Rosé:'rosé',Effervescent:'sparkling',Liquoreux:'sweet'}[r[1]]]||'🍷'}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight:700, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r[3]}</div>
                          <div style={{ fontSize:10, color:SUB }}>{r[0]} · garde {r[5]} ans · boire avant {r[0]+r[5]}</div>
                          {r[6] && <div style={{ fontSize:10, color:MUTED, fontStyle:'italic', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r[6]}</div>}
                        </div>
                        <span style={{ fontSize:9, padding:'2px 8px', borderRadius:9, fontWeight:700, whiteSpace:'nowrap', flexShrink:0,
                          background: r[7]==='Privilégier'?'rgba(74,222,128,0.12)':r[7]==='Bon choix'?'rgba(251,191,36,0.12)':r[7]==='À éviter'?'rgba(107,114,128,0.1)':'rgba(248,113,113,0.1)',
                          color: r[7]==='Privilégier'?'#4ade80':r[7]==='Bon choix'?'#fbbf24':r[7]==='À éviter'?'#9ca3af':'#f87171',
                        }}>{r[7]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
const TABS = [
  { id:'dashboard', label:'Tableau de bord', icon:<ChartBar/> },
  { id:'cave', label:'Ma Cave', icon:<CellarIcon/> },
  { id:'accords', label:'Accords', icon:<ForkKnifeIcon/> },
  { id:'choisir', label:'Choisir un Vin', icon:<span style={{fontSize:16}}>🔍</span> },
]

const BOTTOM_TABS = [
  { id:'dashboard', label:'Accueil',  icon:'🏠' },
  { id:'cave',      label:'Cave',     icon:'🍾' },
  { id:'carte',     label:'Carte',    icon:'🗺️' },
  { id:'accords',   label:'Accords',  icon:'🍽️' },
  { id:'choisir',   label:'Choisir',  icon:'🔍' },
]

export default function App() {
  const [wines, setWines] = useState([])
  const [tab, setTab] = useState('dashboard')
  const [showAdd, setShowAdd] = useState(false)
  const [editW, setEditW] = useState(null)
  const [detailW, setDetailW] = useState(null)
  const [ready, setReady] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  useEffect(()=>{
    const s = localStorage.getItem('cave-a-vin-v1')
    setWines(s ? JSON.parse(s) : DEMO_WINES)
    setReady(true)
  },[])

  useEffect(()=>{ if(ready) localStorage.setItem('cave-a-vin-v1', JSON.stringify(wines)) },[wines,ready])

  const save = useCallback(w=>{
    setWines(prev=>prev.find(x=>x.id===w.id)?prev.map(x=>x.id===w.id?w:x):[...prev,w])
    setShowAdd(false); setEditW(null)
  },[])

  const del = useCallback(id=>{
    if(!confirm('Supprimer ce vin de la cave ?')) return
    setWines(p=>p.filter(w=>w.id!==id))
    if(detailW?.id===id) setDetailW(null)
  },[detailW])

  const edit = useCallback(w=>{ setDetailW(null); setEditW(w) },[])

  const updateWine = useCallback(w=>{
    setWines(prev=>prev.map(x=>x.id===w.id?w:x))
    setDetailW(w)
  },[])

  const total = wines.reduce((s,w)=>s+w.quantity,0)

  if(!ready) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:BG }}>
      <div style={{ textAlign:'center' }}>
        <span style={{ fontSize:48 }}>🍷</span>
        <div style={{ marginTop:12, fontSize:12, color:MUTED, letterSpacing:'0.1em', textTransform:'uppercase' }}>Cave à Vin</div>
      </div>
    </div>
  )

  const tabLabel = { dashboard:'Accueil', cave:'Ma Cave', carte:'Carte', accords:'Accords', choisir:'Choisir un Vin' }

  return (
    <div style={{ minHeight:'100vh', background:BG, paddingBottom:72 }}>

      {/* ── Header ── */}
      <header style={{ position:'sticky', top:0, zIndex:40, background:`rgba(15,5,8,0.95)`, backdropFilter:'blur(20px)', borderBottom:`1px solid ${BORD}` }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:58, padding:'0 18px' }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${WINE},#3e0c17)`, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid rgba(201,168,76,0.2)` }}>
              <span style={{ fontSize:18 }}>🍷</span>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:TEXT, fontFamily:'Georgia,serif', letterSpacing:'0.04em', textTransform:'uppercase' }}>Cave à Vin</div>
              <div style={{ fontSize:8, color:MUTED, textTransform:'uppercase', letterSpacing:'0.12em' }}>{total} bouteilles</div>
            </div>
          </div>

          {/* Page title */}
          <div style={{ fontSize:13, fontWeight:700, color:GOLD, textTransform:'uppercase', letterSpacing:'0.1em' }}>{tabLabel[tab]||''}</div>

          {/* Add button */}
          <button onClick={()=>setShowAdd(true)} style={{ width:36, height:36, background:`linear-gradient(135deg,${WINE},${WINE2})`, border:'none', borderRadius:10, color:'#fff', cursor:'pointer', fontSize:20, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 14px rgba(140,32,48,0.4)` }}>
            +
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ maxWidth:960, margin:'0 auto', padding:'20px 16px' }}>
        {tab==='dashboard' && <Dashboard wines={wines} searchQ={searchQ} setSearchQ={setSearchQ} onSelectWine={setDetailW} onGoToCave={()=>setTab('cave')}/>}
        {tab==='cave'      && <CaveView wines={wines} onAdd={()=>setShowAdd(true)} onEdit={edit} onDelete={del} onSelect={setDetailW}/>}
        {tab==='carte'     && <CarteView wines={wines} onSelectWine={setDetailW} onDelete={del}/>}
        {tab==='accords'   && <AccordsView wines={wines}/>}
        {tab==='choisir'   && <ChoisirView/>}
      </main>

      {/* ── Bottom navigation ── */}
      <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:40, background:`rgba(15,5,8,0.97)`, backdropFilter:'blur(20px)', borderTop:`1px solid ${BORD}`, paddingBottom:'env(safe-area-inset-bottom)' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex', height:60 }}>
          {BOTTOM_TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3,
              background:'none', border:'none', cursor:'pointer', transition:'all 0.15s',
              color: tab===t.id ? GOLD : MUTED,
            }}>
              <span style={{ fontSize:18, lineHeight:1 }}>{t.icon}</span>
              <span style={{ fontSize:8, fontWeight: tab===t.id ? 700 : 400, textTransform:'uppercase', letterSpacing:'0.04em' }}>{t.label}</span>
              {tab===t.id && <div style={{ position:'absolute', bottom:0, width:28, height:2, background:GOLD, borderRadius:1 }}/>}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Modals ── */}
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Ajouter un vin à la cave">
        <WineForm onSave={save} onClose={()=>setShowAdd(false)} wines={wines}/>
      </Modal>
      <Modal open={!!editW} onClose={()=>setEditW(null)} title="Modifier le vin">
        {editW && <WineForm initial={editW} onSave={save} onClose={()=>setEditW(null)} wines={wines}/>}
      </Modal>
      <Modal open={!!detailW} onClose={()=>setDetailW(null)} title="Fiche du vin">
        {detailW && <WineDetail wine={detailW} onEdit={edit} onUpdate={updateWine} onDelete={del}/>}
      </Modal>
    </div>
  )
}
