// ═══════════════════════════════════════════════════════════════════════════
// lecons — L'École du Vin d'Œno.
// 12 leçons courtes (5 min max), ton ami-caviste, zéro jargon non expliqué.
// 3 niveaux : decouverte / curieux / confirme.
// Chaque leçon : sections courtes, un renvoi vers une fonctionnalité de
// l'app, et un mini-quiz de 3 QCM avec explications.
// ═══════════════════════════════════════════════════════════════════════════

export const NIVEAUX = [
  { id: 'decouverte', label: 'Découverte', sousTitre: 'Les bases, sans pression', badge: 'Première Gorgée' },
  { id: 'curieux',    label: 'Curieux',    sousTitre: 'Un cran plus loin',        badge: 'Palais Éveillé' },
  { id: 'confirme',   label: 'Confirmé',   sousTitre: 'Presque caviste',          badge: 'Fin Connaisseur' },
]

export const LECONS = [
  // ═══ NIVEAU DÉCOUVERTE ═════════════════════════════════════════════════
  {
    id: 'rouge-ou-blanc',
    niveau: 'decouverte',
    titre: 'Pourquoi le vin est rouge (ou blanc)',
    duree: '4 min',
    sections: [
      {
        titre: 'Tout se joue dans la peau',
        texte: "Surprise : la chair de presque tous les raisins est… incolore. La couleur du vin vient de la peau du raisin. Pour un rouge, on laisse le jus macérer avec les peaux — elles teintent le vin, comme un sachet de thé dans l'eau chaude.",
      },
      {
        titre: 'Le blanc, c\'est du jus pressé vite',
        texte: "Pour un blanc, on presse les raisins et on écarte les peaux tout de suite. Résultat : un jus clair. On peut d'ailleurs faire du vin blanc avec des raisins noirs — c'est le cas de beaucoup de Champagnes !",
      },
      {
        titre: 'Et le rosé, alors ?',
        texte: "Non, ce n'est pas un mélange de rouge et de blanc (c'est même interdit en France, sauf en Champagne). Le rosé, c'est un rouge dont les peaux n'ont infusé que quelques heures : juste le temps de rosir le jus.",
      },
      {
        titre: 'Ce que ça change dans le verre',
        texte: "Les peaux apportent aussi les tanins, cette sensation qui assèche un peu la bouche. Voilà pourquoi les rouges ont du « grip » et les blancs presque jamais : tout vient de ce temps passé avec la peau.",
      },
    ],
    essayez: { texte: 'Essayez : la carte des vignobles, filtrez par couleur pour voir où naissent rouges et blancs.', cible: 'carte' },
    quiz: [
      {
        q: 'D\'où vient la couleur du vin rouge ?',
        options: ['De la chair du raisin', 'De la peau du raisin', 'D\'un colorant ajouté'],
        bonne: 1,
        explication: 'La chair est incolore : c\'est la macération du jus avec les peaux qui teinte le vin.',
      },
      {
        q: 'Peut-on faire du vin blanc avec des raisins noirs ?',
        options: ['Non, impossible', 'Oui, en pressant vite sans les peaux', 'Seulement en Italie'],
        bonne: 1,
        explication: 'Si on écarte les peaux immédiatement, le jus reste clair. Beaucoup de Champagnes sont faits ainsi.',
      },
      {
        q: 'Le rosé, c\'est…',
        options: ['Un mélange de rouge et de blanc', 'Un rouge dilué à l\'eau', 'Un rouge dont les peaux ont infusé très peu de temps'],
        bonne: 2,
        explication: 'Quelques heures de macération suffisent à rosir le jus. Le mélange rouge + blanc est interdit en France (hors Champagne).',
      },
    ],
  },
  {
    id: 'lire-etiquette',
    niveau: 'decouverte',
    titre: 'Lire une étiquette sans paniquer',
    duree: '5 min',
    sections: [
      {
        titre: 'Trois infos suffisent',
        texte: "Une étiquette française peut être intimidante. Retenez trois choses : l'appellation (d'où vient le vin), le millésime (l'année de récolte) et le producteur (qui l'a fait). Le reste, c'est du décor.",
      },
      {
        titre: 'L\'appellation, c\'est la carte d\'identité',
        texte: "« Chablis », « Côtes-du-Rhône », « Margaux »… L'appellation vous dit la région, et souvent le style : un Chablis sera toujours un blanc sec et vif, un Margaux toujours un rouge élégant. Connaître 10 appellations, c'est déjà savoir choisir.",
      },
      {
        titre: 'Méfiez-vous des mots qui brillent',
        texte: "« Grande Réserve », « Vieilles Vignes », « Cuvée Prestige » : souvent, ces mentions ne sont pas réglementées. En revanche, « Grand Cru » et « Premier Cru » sont officiels en Bourgogne et en Alsace — là, ça veut vraiment dire quelque chose.",
      },
      {
        titre: 'Le nom du producteur, votre meilleur repère',
        texte: "Un bon vigneron fait de bons vins, même dans les petites années. Quand vous aimez une bouteille, notez le nom du domaine : c'est le fil à tirer pour retrouver ce que vous aimez.",
      },
    ],
    essayez: { texte: 'Essayez : le Scan d\'étiquette — photographiez une bouteille, Œno la décode pour vous.', cible: 'scan' },
    quiz: [
      {
        q: 'Quelle mention est officiellement réglementée ?',
        options: ['« Grande Réserve »', '« Grand Cru » en Bourgogne', '« Cuvée Prestige »'],
        bonne: 1,
        explication: '« Grand Cru » et « Premier Cru » sont encadrés par la loi en Bourgogne et en Alsace. Les autres mentions relèvent souvent du marketing.',
      },
      {
        q: 'Le millésime, c\'est…',
        options: ['L\'année de mise en bouteille', 'L\'année de récolte des raisins', 'L\'âge du domaine'],
        bonne: 1,
        explication: 'C\'est l\'année où les raisins ont été vendangés — elle raconte la météo qu\'a connue le vin.',
      },
      {
        q: 'Quel est le meilleur repère pour retrouver un vin qu\'on a aimé ?',
        options: ['La forme de la bouteille', 'Le nom du producteur', 'La couleur de l\'étiquette'],
        bonne: 1,
        explication: 'Un bon vigneron est régulier : son nom est le fil rouge de vos futures belles bouteilles.',
      },
    ],
  },
  {
    id: 'tanins',
    niveau: 'decouverte',
    titre: 'Les tanins, c\'est quoi au juste',
    duree: '4 min',
    sections: [
      {
        titre: 'Cette sensation de bouche sèche',
        texte: "Buvez un thé noir trop infusé : la langue râpe, les gencives s'assèchent. Ça, ce sont les tanins. Dans le vin, ils viennent des peaux et des pépins du raisin — et parfois du fût de chêne.",
      },
      {
        titre: 'Ni bon ni mauvais : une question de dosage',
        texte: "Les tanins donnent de la structure, de la mâche, de la longueur. Trop jeunes, ils peuvent être durs ; avec le temps, ils se fondent et deviennent soyeux. C'est pour eux que certains rouges gagnent à vieillir.",
      },
      {
        titre: 'Les repères simples',
        texte: "Peu de tanins : Beaujolais, Pinot Noir — des rouges souples, faciles. Beaucoup de tanins : Madiran, jeunes Bordeaux — des rouges costauds qui réclament un plat. Le gras d'une viande adoucit les tanins : voilà le secret de l'accord côte de bœuf + rouge puissant.",
      },
    ],
    essayez: { texte: 'Essayez : les jauges de goût des fiches vins — la troisième, c\'est justement les tanins.', cible: 'vins' },
    quiz: [
      {
        q: 'Les tanins donnent une sensation de…',
        options: ['Sucre en bouche', 'Bouche qui s\'assèche', 'Picotement de bulles'],
        bonne: 1,
        explication: 'Comme un thé trop infusé : ils accrochent la langue et les gencives. C\'est la « mâche » du vin.',
      },
      {
        q: 'D\'où viennent principalement les tanins ?',
        options: ['Des peaux et pépins du raisin', 'Du sucre résiduel', 'De l\'eau de pluie'],
        bonne: 0,
        explication: 'Peaux, pépins, rafles — et parfois le fût de chêne pendant l\'élevage.',
      },
      {
        q: 'Pourquoi une côte de bœuf va-t-elle si bien avec un rouge tannique ?',
        options: ['Le gras de la viande adoucit les tanins', 'La viande colore le vin', 'C\'est juste une tradition'],
        bonne: 0,
        explication: 'Le gras enrobe les tanins et les rend soyeux : chacun rend l\'autre meilleur.',
      },
    ],
  },
  {
    id: 'temperature-service',
    niveau: 'decouverte',
    titre: 'Servir à la bonne température',
    duree: '4 min',
    sections: [
      {
        titre: 'L\'erreur la plus courante',
        texte: "« Le rouge se sert chambré » : oui, mais dans les chambres du XIXe siècle, il faisait 16 °C ! Un rouge servi à 22 °C paraît lourd et alcooleux. Un quart d'heure au frigo avant de servir, et il retrouve tout son fruit.",
      },
      {
        titre: 'Les repères à retenir',
        texte: "Effervescents et liquoreux : 6-8 °C, bien frais. Blancs secs et rosés : 8-12 °C. Rouges légers (Beaujolais, Loire) : 13-15 °C, légèrement rafraîchis. Grands rouges puissants : 16-18 °C, jamais plus.",
      },
      {
        titre: 'Le truc du quart d\'heure',
        texte: "Facile à mémoriser : sortez les blancs du frigo 15 minutes avant de servir, et mettez les rouges au frigo 15 minutes avant. Chacun arrive à bonne température au moment de trinquer.",
      },
      {
        titre: 'Trop froid vaut mieux que trop chaud',
        texte: "Un vin trop froid se réchauffe dans le verre ; un vin trop chaud est fichu pour la soirée. Dans le doute, servez plus frais.",
      },
    ],
    essayez: { texte: 'Essayez : chaque fiche vin de la Bibliothèque indique sa température de service idéale.', cible: 'vins' },
    quiz: [
      {
        q: 'Un grand rouge puissant se sert idéalement à…',
        options: ['20-22 °C', '16-18 °C', '10-12 °C'],
        bonne: 1,
        explication: '« Chambré » date d\'une époque où les pièces étaient à 16 °C. Au-delà de 18 °C, l\'alcool domine.',
      },
      {
        q: 'Quel est le truc du quart d\'heure ?',
        options: ['Carafer 15 min tous les vins', 'Blancs sortis du frigo 15 min avant, rouges mis au frigo 15 min avant', 'Attendre 15 min avant de resservir'],
        bonne: 1,
        explication: 'Un aller-retour de 15 minutes et chaque vin arrive pile à sa température.',
      },
      {
        q: 'Dans le doute, mieux vaut servir…',
        options: ['Plus chaud', 'Plus froid', 'À température ambiante'],
        bonne: 1,
        explication: 'Un vin trop froid se réchauffe dans le verre ; un vin trop chaud ne redescend jamais.',
      },
    ],
  },
  // ═══ NIVEAU CURIEUX ════════════════════════════════════════════════════
  {
    id: 'bordeaux-vs-bourgogne',
    niveau: 'curieux',
    titre: 'Bordeaux vs Bourgogne',
    duree: '5 min',
    sections: [
      {
        titre: 'Deux philosophies',
        texte: "Bordeaux assemble : Cabernet Sauvignon + Merlot, parfois d'autres, pour composer un vin équilibré comme un chef compose un plat. La Bourgogne, elle, joue un seul cépage — Pinot Noir en rouge, Chardonnay en blanc — et laisse parler le terroir.",
      },
      {
        titre: 'Châteaux contre climats',
        texte: "À Bordeaux, on classe des châteaux (des marques, presque). En Bourgogne, on classe des parcelles, les fameux « climats » : deux vignes séparées par un chemin peuvent donner un vin ordinaire et un Grand Cru.",
      },
      {
        titre: 'Dans le verre',
        texte: "Bordeaux rouge : fruits noirs, structure, tanins présents, fait pour la garde. Bourgogne rouge : fruits rouges, finesse, tanins soyeux, plus immédiat. Les blancs suivent la même logique : puissance à Bordeaux (rare), pureté en Bourgogne.",
      },
      {
        titre: 'Lequel pour vous ?',
        texte: "Vous aimez les vins charpentés qui accompagnent une belle viande ? Bordeaux. Vous préférez la délicatesse, les vins qui se boivent presque seuls ? Bourgogne. La bonne nouvelle : personne ne vous oblige à choisir.",
      },
    ],
    essayez: { texte: 'Essayez : sur la carte, comparez les appellations de Bordeaux et de Bourgogne côte à côte.', cible: 'carte' },
    quiz: [
      {
        q: 'Le rouge de Bourgogne est fait avec…',
        options: ['Un assemblage de cépages', 'Uniquement du Pinot Noir', 'Du Merlot principalement'],
        bonne: 1,
        explication: 'La Bourgogne joue la carte du cépage unique : Pinot Noir en rouge, Chardonnay en blanc.',
      },
      {
        q: 'En Bourgogne, un « climat », c\'est…',
        options: ['La météo de l\'année', 'Une parcelle de vigne précisément délimitée', 'Une cave climatisée'],
        bonne: 1,
        explication: 'Les climats sont des parcelles classées, parfois minuscules — ils sont même inscrits à l\'UNESCO.',
      },
      {
        q: 'Quel profil correspond plutôt à Bordeaux ?',
        options: ['Fruits rouges et tanins soyeux', 'Fruits noirs, structure et garde', 'Blanc vif et minéral'],
        bonne: 1,
        explication: 'Cabernet et Merlot donnent des vins charpentés, taillés pour vieillir et accompagner les viandes.',
      },
    ],
  },
  {
    id: 'millesime',
    niveau: 'curieux',
    titre: 'Le millésime, ça change quoi',
    duree: '4 min',
    sections: [
      {
        titre: 'La météo mise en bouteille',
        texte: "Le millésime, c'est l'année de récolte — donc la météo qu'ont vécue les raisins. Été chaud et sec : vins riches, mûrs, généreux. Année fraîche et pluvieuse : vins plus légers, plus vifs, parfois plus durs.",
      },
      {
        titre: 'Grande année ne veut pas dire meilleure pour vous',
        texte: "Les « grands millésimes » (2005, 2010, 2015…) donnent des vins de garde, souvent fermés dans leur jeunesse. Une « petite » année peut offrir des vins délicieux jeunes, et moins chers. Pour un dîner cette semaine, la petite année est souvent le bon choix !",
      },
      {
        titre: 'Où le millésime compte le plus',
        texte: "Plus le climat est capricieux, plus le millésime compte : Bourgogne et Loire y sont très sensibles. Dans le sud (Rhône Sud, Languedoc), le soleil est plus fiable, les années se ressemblent davantage.",
      },
    ],
    essayez: { texte: 'Essayez : l\'onglet Millésimes du Guide note chaque année, région par région.', cible: 'millesimes' },
    quiz: [
      {
        q: 'Un été chaud et sec donne plutôt des vins…',
        options: ['Légers et acides', 'Riches et généreux', 'Imbuvables'],
        bonne: 1,
        explication: 'Le soleil mûrit les raisins : plus de sucre, plus de rondeur, plus d\'alcool.',
      },
      {
        q: 'Pourquoi une « petite » année peut être un bon achat ?',
        options: ['Les vins sont prêts plus tôt et moins chers', 'Ils vieillissent mieux', 'Il n\'y en a pas plus'],
        bonne: 0,
        explication: 'Les petites années donnent des vins accessibles jeunes, à prix plus doux. Parfaits pour tous les soirs.',
      },
      {
        q: 'Dans quelle région le millésime compte-t-il le plus ?',
        options: ['Languedoc', 'Bourgogne', 'Rhône Sud'],
        bonne: 1,
        explication: 'Climat frais et capricieux : en Bourgogne, deux années consécutives peuvent donner des vins très différents.',
      },
    ],
  },
  {
    id: 'carafer',
    niveau: 'curieux',
    titre: 'Carafer ou pas',
    duree: '4 min',
    sections: [
      {
        titre: 'Pourquoi donner de l\'air au vin',
        texte: "Ouvrir la bouteille ne suffit pas : le goulot est trop étroit pour que le vin respire. En carafe, le vin s'étale, l'oxygène le réveille : les arômes s'ouvrent, les tanins s'assouplissent. C'est un accélérateur de plaisir.",
      },
      {
        titre: 'Qui carafer ?',
        texte: "Les rouges jeunes et puissants (Bordeaux, Rhône, Madiran) : 1 à 2 heures, ils y gagnent beaucoup. Les grands blancs de Bourgogne : 30 minutes, ça les épanouit. Les rouges légers et fruités : inutile, ils sont déjà prêts.",
      },
      {
        titre: 'Le piège des vieux vins',
        texte: "Attention : un vin de 20 ans est fragile. Trop d'air peut le « casser » en quelques minutes. Pour les vieilles bouteilles, on décante doucement juste pour écarter le dépôt, et on sert aussitôt.",
      },
      {
        titre: 'Pas de carafe ? Pas de panique',
        texte: "Ouvrez la bouteille, servez un premier verre (le niveau baisse, l'air entre), et laissez faire le temps. Une carafe improvisée — un pichet propre — marche aussi très bien.",
      },
    ],
    essayez: { texte: 'Essayez : les fiches vins indiquent le temps de carafage conseillé quand il y en a un.', cible: 'vins' },
    quiz: [
      {
        q: 'Pourquoi carafe-t-on un vin jeune et puissant ?',
        options: ['Pour le refroidir', 'Pour que l\'oxygène ouvre ses arômes et assouplisse ses tanins', 'Pour enlever l\'alcool'],
        bonne: 1,
        explication: 'L\'air agit comme un accélérateur : le vin « s\'ouvre » en 1-2 h au lieu de plusieurs années.',
      },
      {
        q: 'Un vin de 20 ans, on…',
        options: ['Le carafe 3 heures', 'Le décante doucement et on sert vite', 'Le secoue pour le réveiller'],
        bonne: 1,
        explication: 'Les vieux vins sont fragiles : trop d\'air les fane. On écarte juste le dépôt, en douceur.',
      },
      {
        q: 'Quel vin n\'a pas besoin de carafe ?',
        options: ['Un Madiran jeune', 'Un Beaujolais fruité', 'Un grand Bordeaux de 5 ans'],
        bonne: 1,
        explication: 'Les rouges légers et fruités sont prêts dès l\'ouverture : la carafe ne leur apporte rien.',
      },
    ],
  },
  {
    id: 'aromes-nez-bouche',
    niveau: 'curieux',
    titre: 'Les arômes : nez et bouche',
    duree: '5 min',
    sections: [
      {
        titre: 'Personne ne met de fraise dans le vin',
        texte: "Quand on dit qu'un vin « sent la fraise », c'est que la fermentation crée des molécules identiques à celles… de la fraise. Votre nez ne ment pas : ces arômes sont chimiquement réels, juste nés du raisin.",
      },
      {
        titre: 'Les grandes familles',
        texte: "Pour s'y retrouver, on regroupe : fruits rouges, fruits noirs, agrumes, fleurs, épices, boisé-vanillé, beurré-brioché, minéral. Reconnaître la famille suffit largement — inutile de distinguer la framboise de la groseille.",
      },
      {
        titre: 'Le nez, puis la bouche',
        texte: "Sentez d'abord sans agiter, puis faites tourner le verre et sentez à nouveau : de nouveaux arômes apparaissent. En bouche, la « rétro-olfaction » (les arômes qui remontent par l'arrière du nez) complète le tableau. C'est là qu'on perçoit le plus.",
      },
      {
        titre: 'Entraînez-vous partout',
        texte: "Le meilleur exercice ne se fait pas avec du vin : sentez consciemment votre café, une pêche, le poivre. Plus votre bibliothèque d'odeurs est riche, plus vous en retrouverez dans le verre.",
      },
    ],
    essayez: { texte: 'Essayez : la Roue des arômes explore les 8 familles avec des exemples concrets.', cible: 'aromes' },
    quiz: [
      {
        q: 'Pourquoi un vin peut-il sentir la fraise ?',
        options: ['On y ajoute des arômes', 'La fermentation crée les mêmes molécules que la fraise', 'C\'est une illusion collective'],
        bonne: 1,
        explication: 'Les molécules aromatiques nées de la fermentation sont identiques à celles des fruits : votre nez a raison.',
      },
      {
        q: 'La rétro-olfaction, c\'est…',
        options: ['Sentir le bouchon', 'Les arômes perçus par l\'arrière du nez quand le vin est en bouche', 'Sentir le verre vide'],
        bonne: 1,
        explication: 'C\'est le canal le plus riche : la majorité de ce qu\'on « goûte » passe en réalité par le nez.',
      },
      {
        q: 'Le meilleur entraînement pour reconnaître les arômes ?',
        options: ['Boire plus de vin', 'Sentir consciemment les aliments du quotidien', 'Apprendre les étiquettes par cœur'],
        bonne: 1,
        explication: 'Café, fruits, épices : chaque odeur mémorisée est un arôme que vous saurez retrouver dans le verre.',
      },
    ],
  },
  // ═══ NIVEAU CONFIRMÉ ═══════════════════════════════════════════════════
  {
    id: 'accorder',
    niveau: 'confirme',
    titre: 'Accorder sans se tromper',
    duree: '5 min',
    sections: [
      {
        titre: 'La règle d\'or : l\'équilibre des forces',
        texte: "Un plat délicat avec un vin délicat, un plat puissant avec un vin puissant. Un Muscadet disparaîtrait face à un bœuf bourguignon ; un Châteauneuf écraserait des huîtres. Accordez d'abord les intensités, le reste suivra.",
      },
      {
        titre: 'Deux stratégies : accord ou contraste',
        texte: "L'accord de ressemblance : un plat crémeux avec un blanc rond et beurré. L'accord de contraste : le gras du saumon tranché par la vivacité d'un Sancerre, ou le sucré-salé d'un Roquefort avec un Sauternes. Les deux marchent — le contraste surprend davantage.",
      },
      {
        titre: 'Les pièges connus',
        texte: "L'artichaut, l'asperge et la vinaigrette maltraitent le vin (privilégiez un blanc vif et simple). Le chocolat écrase presque tout, sauf les vins doux naturels comme Banyuls ou Maury. Et les tanins + le poisson = goût métallique : gardez les grands rouges pour la viande.",
      },
      {
        titre: 'La botte secrète : l\'accord régional',
        texte: "Quand vous hésitez, mariez le plat et le vin de la même région : chèvre chaud + Sancerre, cassoulet + Cahors, choucroute + Riesling. Des siècles de repas ont validé ces mariages avant vous.",
      },
    ],
    essayez: { texte: 'Essayez : l\'onglet Accords du Guide, ou « Que cuisiner avec ? » sur chaque fiche vin.', cible: 'accords' },
    quiz: [
      {
        q: 'La première règle d\'un bon accord ?',
        options: ['Toujours du rouge avec le fromage', 'Équilibrer l\'intensité du plat et du vin', 'Le vin le plus cher possible'],
        bonne: 1,
        explication: 'Plat délicat, vin délicat ; plat costaud, vin costaud. Aucun des deux ne doit écraser l\'autre.',
      },
      {
        q: 'Roquefort + Sauternes, c\'est un accord de…',
        options: ['Ressemblance', 'Contraste', 'Région'],
        bonne: 1,
        explication: 'Le sel puissant du bleu contre la douceur du liquoreux : un contraste devenu un classique absolu.',
      },
      {
        q: 'Pourquoi éviter un grand rouge tannique avec le poisson ?',
        options: ['Question de couleur', 'Les tanins donnent un goût métallique avec le poisson', 'Le poisson tache le vin'],
        bonne: 1,
        explication: 'Tanins + chair iodée = sensation métallique désagréable. Un blanc ou un rouge très léger, et tout va bien.',
      },
    ],
  },
  {
    id: 'chez-le-caviste',
    niveau: 'confirme',
    titre: 'Choisir chez le caviste',
    duree: '4 min',
    sections: [
      {
        titre: 'Le caviste est votre allié, pas un examinateur',
        texte: "Personne ne vous juge. Un bon caviste adore trois informations : le plat prévu, le budget, et ce que vous avez aimé récemment. Avec ça, il trouve en deux minutes ce que vous chercheriez des heures.",
      },
      {
        titre: 'Donnez un budget sans complexe',
        texte: "« Autour de 12 € » est une phrase parfaitement noble. Entre 8 et 15 €, on trouve des merveilles — souvent mieux qu'une bouteille de supermarché à prix égal, car le caviste a goûté ce qu'il vend.",
      },
      {
        titre: 'Les phrases magiques',
        texte: "« Qu'est-ce que vous buvez en ce moment ? » — le caviste sort ses coups de cœur. « Quelque chose que je ne connais pas, dans ce style » — la porte des pépites. « C'est pour offrir à quelqu'un qui aime X » — mission claire, résultat garanti.",
      },
      {
        titre: 'Fidélité récompensée',
        texte: "Revenez dire ce que vous avez pensé de la bouteille, même (surtout !) si elle ne vous a pas plu. Le caviste affine son idée de vos goûts — c'est le Goût-o-mètre, version humaine.",
      },
    ],
    essayez: { texte: 'Essayez : le Budget caviste de l\'onglet Sommelier compose une sélection à votre budget.', cible: 'sommelier' },
    quiz: [
      {
        q: 'Les trois infos en or pour un caviste ?',
        options: ['Plat, budget, goûts récents', 'Âge, métier, région d\'origine', 'La marque de votre tire-bouchon'],
        bonne: 0,
        explication: 'Avec le plat, le budget et vos derniers coups de cœur, un caviste vise juste du premier coup.',
      },
      {
        q: 'Annoncer un budget de 12 €, c\'est…',
        options: ['Gênant', 'Parfaitement normal et efficace', 'Trop peu pour un caviste'],
        bonne: 1,
        explication: 'Entre 8 et 15 €, les cavistes regorgent de pépites goûtées et choisies. Le budget aide, il ne disqualifie pas.',
      },
      {
        q: 'Pourquoi revenir donner son avis sur une bouteille ?',
        options: ['Pour obtenir un remboursement', 'Pour que le caviste affine sa connaissance de vos goûts', 'Par politesse uniquement'],
        bonne: 1,
        explication: 'Chaque retour, bon ou mauvais, aide le caviste à mieux viser la prochaine fois.',
      },
    ],
  },
  {
    id: 'la-garde',
    niveau: 'confirme',
    titre: 'La garde : quand ouvrir',
    duree: '5 min',
    sections: [
      {
        titre: 'Non, le vin ne s\'améliore pas toujours',
        texte: "90 % des vins sont faits pour être bus dans les 3 ans. Garder dix ans un rosé de l'été, c'est le condamner. Seuls les vins avec de la structure — tanins, acidité, concentration — gagnent à attendre.",
      },
      {
        titre: 'La courbe de vie d\'un vin de garde',
        texte: "Jeunesse fringante (fruit éclatant), puis parfois une « phase de fermeture » où le vin semble muet, puis l'apogée — le plateau magique où tout est fondu — et enfin le déclin. Tout l'art est d'ouvrir sur le plateau.",
      },
      {
        titre: 'Les repères par style',
        texte: "Rouges légers : 1-3 ans. Bourgognes rouges de village : 3-8 ans. Grands Bordeaux et Rhône Nord : 8-20 ans et plus. Blancs secs : 1-5 ans, sauf grands Bourgognes et Rieslings (10+). Liquoreux : quasi immortels.",
      },
      {
        titre: 'Le conseil des sages',
        texte: "Si vous avez plusieurs bouteilles du même vin, ouvrez-en une de temps en temps : c'est le seul moyen fiable de suivre son évolution. Une cave, ça se déguste en feuilleton.",
      },
    ],
    essayez: { texte: 'Essayez : Ma Cave affiche la fenêtre de garde de chaque bouteille — et le Panorama compte celles prêtes à boire.', cible: 'cave' },
    quiz: [
      {
        q: 'Quelle proportion des vins est faite pour être bue jeune ?',
        options: ['Environ 10 %', 'Environ la moitié', 'Environ 90 %'],
        bonne: 2,
        explication: 'L\'immense majorité des vins donne son meilleur dans les 3 ans. La garde est l\'exception, pas la règle.',
      },
      {
        q: 'La « phase de fermeture », c\'est…',
        options: ['Quand le bouchon gonfle', 'Une période où un vin de garde semble muet avant son apogée', 'La fin de vie du vin'],
        bonne: 1,
        explication: 'Entre la jeunesse et l\'apogée, certains vins traversent un tunnel discret. Patience : ils en ressortent grandis.',
      },
      {
        q: 'Avec 6 bouteilles du même vin de garde, le mieux est de…',
        options: ['Tout ouvrir à 10 ans pile', 'En ouvrir une régulièrement pour suivre l\'évolution', 'Attendre le déclin'],
        bonne: 1,
        explication: 'Déguster en feuilleton est le seul moyen fiable de cueillir le vin à son apogée.',
      },
    ],
  },
  {
    id: 'deguster-pro',
    niveau: 'confirme',
    titre: 'Déguster comme un pro (simplement)',
    duree: '5 min',
    sections: [
      {
        titre: 'L\'œil : 10 secondes suffisent',
        texte: "Inclinez le verre sur un fond blanc. Un rouge violacé est jeune ; des reflets tuilés (orangés) trahissent l'âge. Un blanc doré a souvent vu du fût ou des années. C'est tout — inutile d'y passer des heures.",
      },
      {
        titre: 'Le nez : deux passages',
        texte: "Premier nez sans agiter : les arômes les plus volatils. Puis faites tourner le verre et sentez à nouveau : le vin aéré livre sa deuxième couche. Nommez simplement la famille : fruits rouges ? boisé ? floral ?",
      },
      {
        titre: 'La bouche : attaque, milieu, finale',
        texte: "L'attaque (première impression), le milieu (le vin s'installe : rond ? vif ? tannique ?), et la finale — comptez les secondes où le goût persiste. Une finale longue, c'est presque toujours la marque d'un grand vin.",
      },
      {
        titre: 'Le geste qui change tout : noter',
        texte: "Trois lignes suffisent : ce que ça sentait, ce que ça goûtait, si vous avez aimé. Dans six mois, vos notes vaudront tous les guides — parce qu'elles parlent de VOS goûts.",
      },
    ],
    essayez: { texte: 'Essayez : les Mémoires de Vin — votre journal de dégustation vous attend dans Ma Cave.', cible: 'journal' },
    quiz: [
      {
        q: 'Des reflets tuilés (orangés) dans un rouge indiquent…',
        options: ['Un défaut', 'Un vin qui a de l\'âge', 'Un vin trop froid'],
        bonne: 1,
        explication: 'Le rouge violacé de jeunesse évolue vers le grenat puis le tuilé avec les années. L\'œil lit l\'âge.',
      },
      {
        q: 'Pourquoi sentir le vin avant ET après avoir agité le verre ?',
        options: ['Par superstition', 'L\'aération libère une deuxième couche d\'arômes', 'Pour vérifier le bouchon'],
        bonne: 1,
        explication: 'Le premier nez capte les arômes volatils, le second ceux que l\'oxygène réveille. Deux photos du même vin.',
      },
      {
        q: 'Le signe le plus fiable d\'un grand vin en bouche ?',
        options: ['Une couleur foncée', 'Une finale qui persiste longtemps', 'Beaucoup d\'alcool'],
        bonne: 1,
        explication: 'La longueur en bouche — ces secondes où le goût reste après avoir avalé — est le marqueur des grands.',
      },
    ],
  },
]

export const LECONS_PAR_NIVEAU = NIVEAUX.map(n => ({
  ...n,
  lecons: LECONS.filter(l => l.niveau === n.id),
}))
