// ═══════════════════════════════════════════════════════════════════════════
// routesDesVins — 6 itinéraires œnotouristiques racontés à la façon Œno.
// Chaque étape référence des appellations de WINE_DB (ids) et porte ses
// coordonnées pour le tracé sur la carte Leaflet.
// ═══════════════════════════════════════════════════════════════════════════

export const ROUTES_DES_VINS = [
  {
    id: 'bourgogne-3-jours',
    titre: '3 jours en Bourgogne, de Chablis à Beaune',
    region: 'Bourgogne',
    duree: '3 jours',
    intro: "La route la plus mythique du vin français : des collines blondes de Chablis aux clos médiévaux de la Côte d'Or. Trois jours à rouler entre des murets de pierre, où chaque panneau de village est une étiquette que vous avez déjà croisée.",
    etapes: [
      {
        jour: 1,
        titre: 'Chablis, la pureté du nord',
        texte: "Départ dans le vignoble le plus septentrional de Bourgogne. Baladez-vous au pied des sept Grands Crus qui dominent le village, puis dégustez cette minéralité de pierre à fusil qui a rendu Chablis célèbre dans le monde entier.",
        appellations: ['chablis', 'petit-chablis'],
        lat: 47.813, lng: 3.798,
      },
      {
        jour: 2,
        titre: 'La Côte de Nuits, le royaume du Pinot Noir',
        texte: "Deux heures de route et vous voilà sur la route des Grands Crus. Gevrey-Chambertin, Vosne-Romanée, Nuits-Saint-Georges : des villages minuscules aux vins immenses. Arrêtez-vous devant le clos de la Romanée-Conti — la vigne la plus chère du monde tient dans un mouchoir de poche.",
        appellations: ['gevrey-chambertin', 'vosne-romanee', 'nuits-saint-georges', 'marsannay'],
        lat: 47.226, lng: 4.955,
      },
      {
        jour: 3,
        titre: 'Beaune et la Côte des Blancs... rouges et blancs',
        texte: "Finale en apothéose : les Hospices de Beaune et leurs toits vernissés, puis la trilogie des grands blancs — Meursault, Puligny, Chassagne — entrecoupée des rouges veloutés de Pommard et Volnay. Le déjeuner dans les vignes est obligatoire.",
        appellations: ['pommard', 'volnay', 'meursault', 'puligny-montrachet', 'chassagne-montrachet'],
        lat: 47.024, lng: 4.839,
      },
    ],
    conseils: [
      'Meilleure saison : septembre-octobre, pendant ou juste après les vendanges — les couleurs sont irréelles.',
      'Réservez les visites de domaines 2 à 3 semaines à l\'avance : les caves bourguignonnes sont petites et très demandées.',
      'La Route des Grands Crus se fait aussi à vélo : 60 km balisés de Dijon à Santenay.',
    ],
  },
  {
    id: 'beaujolais-crus',
    titre: 'La route des crus du Beaujolais',
    region: 'Beaujolais',
    duree: '2 jours',
    intro: "Oubliez le Beaujolais nouveau : ici, dix crus sérieux s'accrochent à des collines granitiques qui sentent le sud. Des villages perchés, des vignerons accessibles, et les meilleurs rapports plaisir-prix de France.",
    etapes: [
      {
        jour: 1,
        titre: 'Brouilly et le mont éponyme',
        texte: "Montez au sommet du mont Brouilly : la vue embrasse tout le vignoble, jusqu'aux Alpes par temps clair. En bas, les caves du cru le plus gourmand du Beaujolais vous attendent — fruité, rond, à boire entre copains.",
        appellations: ['brouilly'],
        lat: 46.088, lng: 4.643,
      },
      {
        jour: 1,
        titre: 'Fleurie et Chiroubles, les dentelles',
        texte: "Deux villages haut perchés, deux crus tout en finesse. Chiroubles est le plus haut vignoble du Beaujolais — son gamay a une fraîcheur d'altitude. À Fleurie, la chapelle de la Madone veille sur des vins qui portent bien leur nom.",
        appellations: ['fleurie', 'chiroubles'],
        lat: 46.192, lng: 4.664,
      },
      {
        jour: 2,
        titre: 'Morgon, la puissance du granit',
        texte: "Le cru qui « morgonne » : avec l'âge, ses vins prennent des airs de Bourgogne. La côte du Py, colline de roche bleue, donne les bouteilles les plus profondes. C'est aussi le fief des vignerons nature historiques.",
        appellations: ['morgon'],
        lat: 46.157, lng: 4.681,
      },
      {
        jour: 2,
        titre: 'Moulin-à-Vent et Juliénas, la garde',
        texte: "Face au moulin sans ailes qui lui donne son nom, le « seigneur du Beaujolais » produit des vins de garde qui bluffent les dégustateurs à l'aveugle. Finissez à Juliénas, dont la cave est installée... dans une église déconsacrée.",
        appellations: ['moulin-a-vent', 'julienas'],
        lat: 46.205, lng: 4.706,
      },
    ],
    conseils: [
      'Meilleure saison : mai-juin (vignes vert tendre) ou fin août avant les vendanges.',
      'Les caveaux des crus sont ouverts sans rendez-vous — le Beaujolais est la région la plus facile pour débuter l\'œnotourisme.',
      'Le troisième jeudi de novembre, tout le vignoble fait la fête pour le nouveau : ambiance garantie, routes chargées.',
    ],
  },
  {
    id: 'rhone-nord',
    titre: 'Escapade en Rhône Nord',
    region: 'Rhône Nord',
    duree: '2 jours',
    intro: "Quarante kilomètres de vignes en terrasses vertigineuses au-dessus du fleuve. Ici, la Syrah et le Viognier donnent leurs plus grands vins du monde, sur des pentes si raides qu'on y travaille encore tout à la main.",
    etapes: [
      {
        jour: 1,
        titre: 'Côte-Rôtie, la pente brûlée',
        texte: "Depuis Ampuis, levez les yeux : les terrasses de la « côte rôtie » grimpent à 60 % de pente. La Syrah y mûrit face au soleil couchant et donne des rouges de velours aux notes de violette. Quelques caveaux au pied des coteaux permettent de goûter sans se ruiner.",
        appellations: ['cote-rotie'],
        lat: 45.489, lng: 4.812,
      },
      {
        jour: 1,
        titre: 'Condrieu, le trésor du Viognier',
        texte: "Dix minutes au sud, changement total : Condrieu est un blanc opulent, tout en abricot et fleurs blanches, issu d'un cépage sauvé de l'extinction dans les années 60. Il ne reste que 200 hectares — goûtez-le ici, à la source.",
        appellations: ['condrieu'],
        lat: 45.464, lng: 4.766,
      },
      {
        jour: 2,
        titre: 'Hermitage, la colline sacrée',
        texte: "Tain-l'Hermitage, sa passerelle sur le Rhône et SA colline : 136 hectares de légende. Montez à pied jusqu'à la chapelle — la vue sur le fleuve vaut tous les guides. En bas, les grandes maisons ouvrent leurs caves de dégustation.",
        appellations: ['hermitage', 'crozes-hermitage'],
        lat: 45.070, lng: 4.834,
      },
      {
        jour: 2,
        titre: 'Cornas et Saint-Péray, la finale confidentielle',
        texte: "Face à Valence, Cornas produit la Syrah la plus sombre et sauvage du Rhône, longtemps secret de connaisseurs. Juste à côté, Saint-Péray pétille discrètement — une bulle de méthode traditionnelle pour trinquer à la fin du voyage.",
        appellations: ['cornas', 'saint-peray', 'saint-joseph'],
        lat: 44.962, lng: 4.888,
      },
    ],
    conseils: [
      'Meilleure saison : septembre, quand les terrasses dorent au soleil et que les vendanges animent les villages.',
      'Réservez les visites chez les grands noms (surtout à Ampuis et Tain) plusieurs semaines à l\'avance.',
      'La ViaRhôna longe tout le vignoble à vélo, au ras du fleuve — une alternative superbe à la voiture.',
    ],
  },
  {
    id: 'bordeaux-deux-rives',
    titre: 'Bordeaux rive gauche, rive droite',
    region: 'Bordeaux',
    duree: '3 jours',
    intro: "Un fleuve, deux mondes. Rive gauche : les châteaux majestueux du Médoc et le règne du Cabernet. Rive droite : les villages intimes de Saint-Émilion et la rondeur du Merlot. Trois jours pour comprendre — et choisir votre camp.",
    etapes: [
      {
        jour: 1,
        titre: 'Le Médoc, la route des châteaux',
        texte: "La D2, dite « route des châteaux », aligne les façades les plus célèbres du vin : Margaux, Saint-Julien, Pauillac. Les grands crus classés se visitent (sur réservation), mais les crus bourgeois voisins offrent des accueils plus simples et des bouteilles abordables.",
        appellations: ['margaux', 'saint-julien', 'pauillac', 'saint-estephe', 'haut-medoc'],
        lat: 45.198, lng: -0.752,
      },
      {
        jour: 2,
        titre: 'Pessac-Léognan et Sauternes, le sud méconnu',
        texte: "Au sud de la ville, les Graves cachent les plus vieux vignobles bordelais et de superbes blancs secs. Poussez jusqu'à Sauternes : le brouillard matinal du Ciron y fabrique l'or liquide le plus célèbre du monde. Dégustation au château obligatoire.",
        appellations: ['pessac-leognan', 'sauternes'],
        lat: 44.65, lng: -0.4,
      },
      {
        jour: 3,
        titre: 'Saint-Émilion et Pomerol, la rive droite',
        texte: "Village médiéval classé à l'UNESCO, église monolithe creusée dans le roc, ruelles pavées entre les vignes : Saint-Émilion est la plus belle étape œnotouristique de France. À dix minutes, le hameau de Pomerol cultive le Merlot le plus cher de la planète, sans un seul panneau tape-à-l'œil.",
        appellations: ['saint-emilion', 'pomerol', 'lalande-de-pomerol'],
        lat: 44.894, lng: -0.155,
      },
    ],
    conseils: [
      'Meilleure saison : juin (vignes en fleur) ou septembre-octobre (vendanges, lumière dorée).',
      'Les grands crus classés exigent une réservation, parfois payante — les crus bourgeois et les satellites de Saint-Émilion accueillent plus librement.',
      'Basez-vous à Bordeaux même : la Cité du Vin est une parfaite introduction avant de partir sur les routes.',
    ],
  },
  {
    id: 'loire-a-velo',
    titre: 'La Loire à vélo, de Sancerre à Saumur',
    region: 'Loire',
    duree: '5 jours',
    intro: "Le dernier fleuve sauvage d'Europe, des châteaux à chaque méandre, et un vignoble qui change de visage tous les 50 kilomètres. À vélo sur les digues, on passe du Sauvignon au Chenin puis au Cabernet Franc — un cours d'œnologie à pédales.",
    etapes: [
      {
        jour: 1,
        titre: 'Sancerre, le piton du Sauvignon',
        texte: "Le village domine la Loire du haut de son piton. Autour, les collines de silex donnent le Sauvignon le plus célèbre du monde — vif, fumé, cristallin. Face à lui, Pouilly-Fumé répond de l'autre rive : dégustez les deux et cherchez la différence.",
        appellations: ['sancerre', 'pouilly-fume', 'menetou-salon'],
        lat: 47.329, lng: 2.834,
      },
      {
        jour: 2,
        titre: 'Vouvray et Montlouis, le Chenin dans le tuffeau',
        texte: "Deux jours de digues plus loin, Tours et ses caves creusées dans la falaise de tuffeau. Le Chenin y fait tout : sec tendu, demi-sec, moelleux, bulles fines. Les caves troglodytes se visitent à la fraîche — 12 °C toute l'année.",
        appellations: ['vouvray', 'montlouis', 'touraine-sauvignon'],
        lat: 47.411, lng: 0.798,
      },
      {
        jour: 4,
        titre: 'Chinon et Bourgueil, les rouges de casse-croûte royal',
        texte: "Le pays de Rabelais, et ça se sent : ici le Cabernet Franc donne des rouges de copains, framboise et poivron doux, parfaits légèrement rafraîchis. La forteresse de Chinon et les caves de Bourgueil rythment une journée gourmande.",
        appellations: ['chinon', 'bourgueil'],
        lat: 47.167, lng: 0.240,
      },
      {
        jour: 5,
        titre: 'Saumur, bulles et tuffeau',
        texte: "Arrivée au château de conte de fées de Saumur. Sous la ville, des kilomètres de galeries abritent les grandes maisons de fines bulles. Terminez par un Saumur-Champigny frais sur une terrasse face à la Loire : le voyage est complet.",
        appellations: ['saumur-champigny', 'coteaux-du-layon', 'savennieres'],
        lat: 47.260, lng: -0.077,
      },
    ],
    conseils: [
      'Meilleure saison : mai-juin ou septembre — l\'été est superbe mais les pistes de la Loire à Vélo sont très fréquentées.',
      'L\'itinéraire suit « La Loire à Vélo » (balisage EV6) : locations et retours de vélos possibles dans chaque grande ville.',
      'Les caves troglodytes sont fraîches même en canicule : prévoyez une petite laine pour les dégustations.',
    ],
  },
  {
    id: 'alsace-grands-crus',
    titre: "L'Alsace, villages et grands crus",
    region: 'Alsace',
    duree: '2-3 jours',
    intro: "170 kilomètres de route officielle, la plus ancienne de France, entre les Vosges et la plaine du Rhin. Des villages à colombages fleuris de géraniums, 51 grands crus, et des blancs qui vont du sec ciselé au moelleux d'or.",
    etapes: [
      {
        jour: 1,
        titre: 'Ribeauvillé et Riquewihr, la carte postale',
        texte: "Deux villages parmi les plus beaux de France, cernés de grands crus. Montez dans les vignes du Schoenenbourg au-dessus de Riquewihr : le Riesling y devient un vin de garde minéral et racé. Les winstubs du village servent la choucroute qui va avec.",
        appellations: ['riesling-alsace', 'muscat-alsace'],
        lat: 48.166, lng: 7.298,
      },
      {
        jour: 2,
        titre: 'Kaysersberg et la vallée de Colmar',
        texte: "La patrie d'Albert Schweitzer est aussi celle du Pinot Gris opulent, fumé, unique. À Colmar, la « petite Venise » mérite la flânerie entre deux caves. Ne manquez pas les vieilles maisons de vignerons de la rue des Marchands.",
        appellations: ['pinot-gris-alsace', 'pinot-blanc-alsace', 'pinot-noir-alsace'],
        lat: 48.139, lng: 7.263,
      },
      {
        jour: 3,
        titre: 'Eguisheim et le sud, le Gewurz en majesté',
        texte: "Village circulaire enroulé autour de son château, Eguisheim est le berceau du vignoble alsacien. Sur les coteaux du Eichberg et du Pfersigberg, le Gewurztraminer donne le plus exubérant des blancs — litchi, rose, épices. L'accord avec un munster fermier est un rite de passage.",
        appellations: ['gewurztraminer', 'alsace-sylvaner'],
        lat: 48.043, lng: 7.306,
      },
    ],
    conseils: [
      'Meilleure saison : fin septembre-octobre pour les vendanges et les couleurs, ou décembre pour les marchés de Noël (avec vin chaud… au Gewurz).',
      'Les caveaux alsaciens sont très accueillants et la dégustation y est souvent gratuite : poussez les portes sans complexe.',
      'La Véloroute du Vignoble double la route des vins à vélo, presque à plat, de Marlenheim à Thann.',
    ],
  },
]
