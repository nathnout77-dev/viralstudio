// ═══════════════════════════════════════════════════════════════════════════
// Capsules « 1 minute pour comprendre » — micro-formats façon stories.
// Chaque capsule : 5-7 écrans { texte (1-2 phrases percutantes), visuel }.
// `visuel` = clé d'illustration SVG animée dessinée dans Capsules.jsx.
// ═══════════════════════════════════════════════════════════════════════════

export const CAPSULES = [
  {
    id: 'carafage',
    titre: 'Le carafage en 1 minute',
    vignette: 'carafe',
    ecrans: [
      { texte: 'Un vin qui vient d\'être ouvert est comme quelqu\'un qu\'on réveille : il a besoin d\'un moment.', visuel: 'bouteille' },
      { texte: 'Carafer, c\'est simplement verser le vin dans un grand récipient pour le mettre au contact de l\'air.', visuel: 'carafe' },
      { texte: 'L\'oxygène assouplit les tanins et libère les arômes enfermés dans la bouteille.', visuel: 'aromes' },
      { texte: 'Les rouges jeunes et puissants adorent : 1 à 2 heures avant le repas.', visuel: 'sablier' },
      { texte: 'Les vins très vieux, eux, sont fragiles : on les carafe peu, ou pas du tout.', visuel: 'goutte' },
      { texte: 'Pas de carafe ? Ouvrez la bouteille en avance et servez de grands verres. Ça aide déjà.', visuel: 'verre' },
    ],
  },
  {
    id: 'tanins',
    titre: 'Les tanins',
    vignette: 'tanin',
    ecrans: [
      { texte: 'Cette sensation qui assèche la bouche quand vous buvez un rouge ? Ce sont les tanins.', visuel: 'tanin' },
      { texte: 'Ils viennent de la peau et des pépins du raisin, infusés pendant la fermentation.', visuel: 'grappe' },
      { texte: 'Comme un thé trop infusé : plus la macération est longue, plus le vin est tannique.', visuel: 'sablier' },
      { texte: 'Les tanins sont l\'ossature du vin : ce sont eux qui lui permettent de vieillir des années.', visuel: 'bouteille' },
      { texte: 'Avec le temps, ils s\'assouplissent et deviennent soyeux. C\'est toute la magie de la garde.', visuel: 'aromes' },
      { texte: 'Vin trop tannique ? Servez-le avec une viande : les protéines adoucissent tout.', visuel: 'accord' },
    ],
  },
  {
    id: 'temperature',
    titre: 'Pourquoi le rouge se sert moins froid',
    vignette: 'thermometre',
    ecrans: [
      { texte: '« Le rouge à température ambiante » : ce conseil date d\'une époque où les maisons étaient à 16 °C.', visuel: 'thermometre' },
      { texte: 'Trop chaud, un rouge devient lourd : l\'alcool domine et écrase les arômes.', visuel: 'chaleur' },
      { texte: 'Trop froid, ses tanins durcissent et il paraît sévère, fermé.', visuel: 'froid' },
      { texte: 'La bonne zone : 14 à 18 °C pour les rouges. Une demi-heure au frigo avant de servir, c\'est parfait.', visuel: 'thermometre' },
      { texte: 'Les blancs, eux, aiment 8 à 13 °C : le froid soutient leur fraîcheur.', visuel: 'verre' },
      { texte: 'Retenez ceci : mieux vaut servir trop frais que trop chaud. Le verre se réchauffe tout seul.', visuel: 'goutte' },
    ],
  },
  {
    id: 'millesime',
    titre: 'Lire un millésime',
    vignette: 'millesime',
    ecrans: [
      { texte: 'Le millésime, c\'est l\'année de récolte du raisin. Rien de plus, rien de moins.', visuel: 'millesime' },
      { texte: 'Chaque année, la météo écrit une histoire différente : soleil, pluie, gel, canicule.', visuel: 'soleil' },
      { texte: 'Une grande année donne des raisins mûrs et équilibrés : le vin pourra vieillir longtemps.', visuel: 'grappe' },
      { texte: 'Une petite année n\'est pas une mauvaise année : les vins sont souvent plus légers, à boire plus tôt.', visuel: 'verre' },
      { texte: 'Le millésime compte surtout pour les vins de garde. Pour un rosé d\'été, prenez le plus récent.', visuel: 'sablier' },
    ],
  },
  {
    id: 'sucrosite',
    titre: 'Sec, moelleux, liquoreux',
    vignette: 'goutte',
    ecrans: [
      { texte: 'Ces trois mots ne parlent que d\'une chose : la quantité de sucre restée dans le vin.', visuel: 'goutte' },
      { texte: 'Sec : presque tout le sucre a été transformé en alcool. La grande majorité des vins.', visuel: 'verre' },
      { texte: 'Moelleux : une douceur ronde et discrète. Pensez à un Jurançon avec un fromage de brebis.', visuel: 'accord' },
      { texte: 'Liquoreux : le sucre roi. Sauternes, Monbazillac… des vins d\'or, riches et complexes.', visuel: 'soleil' },
      { texte: 'Attention : fruité ne veut pas dire sucré ! Un vin peut sentir la pêche et être parfaitement sec.', visuel: 'aromes' },
      { texte: 'Astuce dégustation : le sucré se sent sur le bout de la langue, dès la première seconde.', visuel: 'nez' },
    ],
  },
  {
    id: 'robe',
    titre: 'La robe du vin',
    vignette: 'robe',
    ecrans: [
      { texte: 'La « robe », c\'est simplement la couleur du vin. Et elle raconte beaucoup de choses.', visuel: 'robe' },
      { texte: 'Penchez votre verre au-dessus d\'un fond blanc : c\'est sur le bord que tout se lit.', visuel: 'verre' },
      { texte: 'Un rouge jeune tire sur le violet. En vieillissant, il glisse vers la tuile et l\'orangé.', visuel: 'robe' },
      { texte: 'Les blancs font l\'inverse : pâles et verts dans leur jeunesse, dorés puis ambrés avec l\'âge.', visuel: 'soleil' },
      { texte: 'Une robe intense annonce souvent un vin concentré ; une robe claire, un vin plus délicat.', visuel: 'goutte' },
      { texte: 'Les « larmes » qui coulent sur le verre ? Elles parlent d\'alcool et de richesse, pas de qualité.', visuel: 'larmes' },
    ],
  },
  {
    id: 'nez',
    titre: 'Sentir avant de goûter',
    vignette: 'nez',
    ecrans: [
      { texte: '80 % de ce que vous « goûtez » passe en réalité par le nez. Sentir n\'est pas une pose : c\'est l\'essentiel.', visuel: 'nez' },
      { texte: 'Premier nez : sans toucher le verre, humez. Ce sont les arômes les plus volatils.', visuel: 'verre' },
      { texte: 'Faites tourner le vin dans le verre : l\'air réveille une deuxième vague d\'arômes.', visuel: 'tourbillon' },
      { texte: 'Ne cherchez pas LE bon mot. Fruits ? Fleurs ? Épices ? Sous-bois ? Votre impression est la bonne.', visuel: 'aromes' },
      { texte: 'Un souvenir surgit — la confiture de votre grand-mère, un feu de bois ? C\'est ça, déguster.', visuel: 'coeur' },
    ],
  },
  {
    id: 'garde',
    titre: 'Garde ou pas garde ?',
    vignette: 'sablier',
    ecrans: [
      { texte: 'Idée reçue n°1 : « le vin, plus c\'est vieux, meilleur c\'est ». C\'est faux pour 90 % des bouteilles.', visuel: 'bouteille' },
      { texte: 'La plupart des vins sont faits pour être bus dans les 2 à 5 ans. Frais, fruités, joyeux.', visuel: 'verre' },
      { texte: 'Pour vieillir, un vin a besoin d\'une colonne vertébrale : tanins, acidité, ou sucre.', visuel: 'tanin' },
      { texte: 'Un vin de garde évolue comme une personne : fougueux jeune, complexe et apaisé plus tard.', visuel: 'sablier' },
      { texte: 'Chaque vin a son apogée : la période où tout est en équilibre. Après, il redescend doucement.', visuel: 'apogee' },
      { texte: 'Le vrai luxe n\'est pas d\'attendre : c\'est d\'ouvrir la bonne bouteille au bon moment.', visuel: 'coeur' },
    ],
  },
]
