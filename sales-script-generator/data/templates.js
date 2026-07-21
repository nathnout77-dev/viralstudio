// ============================================================================
//  Bibliothèque de scripts de vente — cœur du produit.
//  100 % templates + variables : aucun appel d'API, coût variable nul.
//  Chaque script s'adapte au SECTEUR, à l'ÉTAPE de vente, au TON et au prospect.
// ============================================================================

// --- Secteurs : profil de vocabulaire, douleurs types, preuves, rôles --------
export const SECTORS = [
  {
    id: "generic",
    label: "Généraliste",
    pains: [
      "perdre du temps sur des tâches à faible valeur",
      "un pipeline qui manque de prévisibilité",
      "des coûts qui grimpent sans retour clair",
    ],
    values: [
      "gagner du temps sur ce qui compte vraiment",
      "rendre les résultats plus prévisibles",
      "réduire les coûts sans sacrifier la qualité",
    ],
    proofs: [
      "des équipes comme la vôtre ont gagné plusieurs heures par semaine",
      "en moyenne +18 % de résultats dès le premier trimestre",
    ],
    roles: ["Directeur", "Responsable", "Gérant"],
  },
  {
    id: "saas",
    label: "SaaS / Tech B2B",
    pains: [
      "un cycle de vente trop long qui fait dériver les prévisions",
      "des SDR qui passent plus de temps à chercher qu'à vendre",
      "un onboarding client qui traîne et fait grimper le churn",
    ],
    values: [
      "raccourcir le cycle de vente de plusieurs semaines",
      "libérer vos commerciaux pour la vente à forte valeur",
      "faire baisser le churn dès les premiers mois",
    ],
    proofs: [
      "des scale-ups SaaS ont réduit leur cycle de 30 %",
      "+22 % de démos qualifiées en un trimestre",
    ],
    roles: ["VP Sales", "Head of Growth", "SDR Manager", "CEO"],
  },
  {
    id: "immobilier",
    label: "Immobilier",
    pains: [
      "des mandats qui dorment faute de bons acquéreurs",
      "trop de visites sans acheteurs réellement qualifiés",
      "une estimation contestée qui bloque la signature",
    ],
    values: [
      "vendre plus vite au bon prix",
      "ne recevoir que des acquéreurs sérieux et solvables",
      "sécuriser l'estimation et rassurer le vendeur",
    ],
    proofs: [
      "des agences ont réduit leur délai de vente de 3 semaines",
      "un taux de transformation visite → offre nettement supérieur",
    ],
    roles: ["Propriétaire", "Vendeur", "Investisseur", "Acquéreur"],
  },
  {
    id: "assurance",
    label: "Assurance / Finance",
    pains: [
      "des contrats mal adaptés qui laissent des trous de couverture",
      "des cotisations qui augmentent sans explication",
      "une épargne qui dort et perd du pouvoir d'achat",
    ],
    values: [
      "une couverture réellement alignée sur votre situation",
      "des cotisations optimisées à garanties égales",
      "faire travailler votre épargne sereinement",
    ],
    proofs: [
      "des clients ont économisé plusieurs centaines d'euros par an",
      "un bilan gratuit qui révèle souvent 2 à 3 optimisations",
    ],
    roles: ["Client", "Chef d'entreprise", "Particulier", "Épargnant"],
  },
  {
    id: "agence",
    label: "Agence / Services marketing",
    pains: [
      "des campagnes qui coûtent cher sans ROI mesurable",
      "un site qui attire des visiteurs mais peu de clients",
      "une marque peu visible face à la concurrence",
    ],
    values: [
      "un budget marketing qui génère enfin des clients mesurables",
      "transformer votre trafic en rendez-vous qualifiés",
      "prendre une longueur d'avance sur vos concurrents",
    ],
    proofs: [
      "des clients ont doublé leur nombre de leads en 90 jours",
      "un coût par lead réduit de moitié en moyenne",
    ],
    roles: ["Fondateur", "Directeur marketing", "Gérant", "Responsable com"],
  },
  {
    id: "industrie",
    label: "Industrie / B2B équipement",
    pains: [
      "des arrêts machine qui plombent la productivité",
      "des coûts de maintenance imprévisibles",
      "des délais d'appro qui bloquent la production",
    ],
    values: [
      "réduire les arrêts non planifiés",
      "maîtriser et lisser vos coûts de maintenance",
      "sécuriser vos approvisionnements",
    ],
    proofs: [
      "des sites ont réduit leurs arrêts de 25 %",
      "un ROI atteint en moins de 12 mois",
    ],
    roles: ["Directeur de site", "Responsable achats", "Directeur technique"],
  },
  {
    id: "sante",
    label: "Santé / Bien-être",
    pains: [
      "une gestion administrative qui mange le temps de soin",
      "des patients qui ne reviennent pas",
      "un planning sous-optimisé qui laisse des créneaux vides",
    ],
    values: [
      "rendre du temps au soin plutôt qu'à l'administratif",
      "fidéliser vos patients dans la durée",
      "remplir votre planning intelligemment",
    ],
    proofs: [
      "des cabinets ont récupéré plusieurs heures par semaine",
      "un taux de retour patient en nette hausse",
    ],
    roles: ["Praticien", "Directeur de cabinet", "Gérant"],
  },
  {
    id: "formation",
    label: "Formation / Coaching",
    pains: [
      "des prospects intéressés qui ne passent jamais à l'achat",
      "un taux de complétion faible qui nuit à la réputation",
      "une offre difficile à différencier des gratuits en ligne",
    ],
    values: [
      "transformer l'intérêt en inscriptions payantes",
      "faire aller vos apprenants au bout du parcours",
      "justifier clairement votre valeur face au gratuit",
    ],
    proofs: [
      "des organismes ont augmenté leurs inscriptions de 40 %",
      "un taux de complétion largement au-dessus de la moyenne",
    ],
    roles: ["Formateur", "Directeur pédagogique", "Coach", "Responsable RH"],
  },
];

// --- Étapes de vente ---------------------------------------------------------
export const STAGES = [
  { id: "cold_call", label: "Appel à froid", channel: "Téléphone" },
  { id: "voicemail", label: "Message vocal", channel: "Répondeur" },
  { id: "discovery", label: "Découverte des besoins", channel: "RDV / Visio" },
  { id: "objection", label: "Traitement d'objection", channel: "Tous canaux" },
  { id: "closing", label: "Closing", channel: "RDV / Visio" },
  { id: "follow_up_email", label: "E-mail de relance", channel: "E-mail" },
  { id: "linkedin_dm", label: "Message LinkedIn", channel: "LinkedIn" },
];

// --- Tons : modulent ouvertures, transitions et appels à l'action ------------
export const TONES = [
  {
    id: "consultatif",
    label: "Consultatif",
    open: "J'espère ne pas vous déranger",
    bridge: "Si vous me permettez une question",
    soft: "Est-ce que cela résonne avec ce que vous vivez",
    cta: "Seriez-vous ouvert à en échanger 15 minutes cette semaine",
  },
  {
    id: "direct",
    label: "Direct",
    open: "Je vais être bref",
    bridge: "Concrètement",
    soft: "Dites-moi si je me trompe",
    cta: "On bloque 15 minutes mardi ou jeudi",
  },
  {
    id: "chaleureux",
    label: "Chaleureux",
    open: "Ravi de vous joindre",
    bridge: "Ce qui m'amène vers vous",
    soft: "Est-ce que ça vous parle",
    cta: "Ça vous dirait qu'on en discute autour d'un café virtuel cette semaine",
  },
  {
    id: "expert",
    label: "Expert / Data",
    open: "Merci de me prendre quelques secondes",
    bridge: "Les chiffres que nous observons",
    soft: "Est-ce cohérent avec vos propres constats",
    cta: "Je vous propose un audit de 20 minutes, sans engagement",
  },
];

// --- Objections courantes (pour l'étape « objection ») -----------------------
export const OBJECTIONS = [
  { id: "prix", label: "« C'est trop cher »" },
  { id: "temps", label: "« Je n'ai pas le temps »" },
  { id: "concurrent", label: "« On a déjà un prestataire »" },
  { id: "reflechir", label: "« Je vais réfléchir »" },
  { id: "budget", label: "« Pas de budget cette année »" },
  { id: "envoyer", label: "« Envoyez-moi un e-mail »" },
];

// --- Modèles de script. {{var}} remplacés par le moteur. ---------------------
// Variables : prospect, company, role, product, sender, senderCompany,
//             pain, value, proof, open, bridge, soft, cta
export const TEMPLATES = {
  cold_call: [
    "Bonjour {{prospect}}, {{sender}} de {{senderCompany}}. {{open}}.",
    "",
    "{{bridge}} : nous aidons {{role}} comme vous à éviter {{pain}}.",
    "",
    "La raison de mon appel est simple — beaucoup de nos clients nous disaient {{pain}}. Nous les aidons désormais à {{value}}. {{proof}}.",
    "",
    "{{soft}}, {{prospect}} ?",
    "",
    "[Écoute active — laisser répondre]",
    "",
    "{{cta}} ?",
  ],
  voicemail: [
    "Bonjour {{prospect}}, c'est {{sender}} de {{senderCompany}}.",
    "",
    "Je vous appelle car nous aidons {{role}} à {{value}}. {{proof}}.",
    "",
    "Je vous laisse mon numéro, rappelez-moi quand vous avez deux minutes — ou répondez simplement à l'e-mail que je vous envoie juste après. Belle journée, {{prospect}} !",
  ],
  discovery: [
    "Merci pour votre temps, {{prospect}}. Pour que cet échange vous soit utile, j'aimerais d'abord comprendre votre contexte plutôt que dérouler une présentation.",
    "",
    "1. Aujourd'hui, comment gérez-vous {{painShort}} chez {{company}} ?",
    "2. Qu'est-ce qui, dans la situation actuelle, vous coûte le plus (temps, argent, énergie) ?",
    "3. Si vous pouviez changer une seule chose demain, ce serait quoi ?",
    "4. Qu'avez-vous déjà essayé, et pourquoi ça n'a pas suffi ?",
    "5. Qui d'autre est impacté ou décisionnaire sur ce sujet ?",
    "",
    "[Reformuler ce que dit le prospect avant de proposer quoi que ce soit]",
    "",
    "Si je résume, votre priorité c'est de {{value}}. C'est bien ça ? Alors laissez-moi vous montrer précisément comment nous adressons ce point.",
  ],
  objection: [
    "[Objection : {{objectionLabel}}]",
    "",
    "Je comprends, {{prospect}} — c'est une remarque légitime, et vous n'êtes pas le premier à la soulever.",
    "",
    "{{objectionResponse}}",
    "",
    "{{soft}} ? Si oui, {{cta}} ?",
  ],
  closing: [
    "{{prospect}}, on a vu ensemble que votre enjeu principal, c'est {{pain}}, et que le fait de {{value}} aurait un vrai impact chez {{company}}.",
    "",
    "Voici ce que je propose concrètement : nous démarrons, vous constatez les premiers effets, et vous jugez sur pièces. {{proof}}.",
    "",
    "Il ne reste qu'à décider du point de départ. On lance {{product}} dès cette semaine, ou vous préférez la semaine prochaine ?",
    "",
    "[Se taire après la question. Laisser le prospect trancher.]",
  ],
  follow_up_email: [
    "Objet : {{company}} — {{value}} ?",
    "",
    "Bonjour {{prospect}},",
    "",
    "Suite à notre échange, je reviens vers vous car le point qui vous concernait — {{pain}} — est exactement ce sur quoi nous aidons les {{role}}.",
    "",
    "En une phrase : nous permettons de {{value}}. {{proof}}.",
    "",
    "{{cta}} ? Répondez-moi simplement par oui, et je vous propose deux créneaux.",
    "",
    "Bien à vous,",
    "{{sender}} — {{senderCompany}}",
  ],
  linkedin_dm: [
    "Bonjour {{prospect}},",
    "",
    "Je suis votre travail chez {{company}} avec intérêt. Je contacte des {{role}} car nous les aidons à {{value}}.",
    "",
    "Beaucoup nous confiaient {{pain}} — {{proof}}.",
    "",
    "Pas de discours commercial : {{cta}} ? Au pire vous repartez avec une ou deux idées actionnables.",
  ],
};

// --- Réponses aux objections (par type) --------------------------------------
export const OBJECTION_RESPONSES = {
  prix:
    "Parlons-en franchement. La vraie question n'est pas le prix, mais le coût de ne rien changer : tant que {{painShort}} persiste, cela vous coûte déjà — en temps et en résultats. Notre approche vise justement à ce que l'investissement se rembourse de lui-même.",
  temps:
    "Je respecte totalement votre agenda — c'est justement le temps perdu sur {{painShort}} que nous cherchons à vous rendre. Donnez-moi 15 minutes maintenant pour vous en faire gagner bien plus ensuite.",
  concurrent:
    "Parfait, c'est bon signe : cela veut dire que le sujet compte pour vous. Je ne cherche pas à remplacer ce qui marche — juste à voir s'il reste un angle mort sur {{painShort}}. Beaucoup de clients nous ont gardés en complément.",
  reflechir:
    "Bien sûr, c'est une décision qui se réfléchit. Pour vous aider, qu'est-ce qui reste flou : le fonctionnement, le budget, ou le bon moment ? Répondons-y maintenant pendant qu'on est ensemble.",
  budget:
    "Compris. Beaucoup de nos clients étaient dans ce cas — c'est pour ça que nous démarrons petit et prouvons la valeur avant tout engagement lourd. Regardons le retour attendu : souvent, le sujet n'est plus le budget mais le calendrier.",
  envoyer:
    "Avec plaisir, je vous envoie tout de suite un e-mail. Pour qu'il soit vraiment utile et pas noyé dans votre boîte : quel est LE point sur {{painShort}} que vous voulez que je détaille en priorité ?",
};
