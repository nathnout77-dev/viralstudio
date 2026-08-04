// ═══════════════════════════════════════════════════════════════════════════
// Les questions du guide — une seule banque, pour toutes les directions.
//
// Avant, quatre questionnaires posaient leurs questions chacun de son côté.
// Le budget était demandé trois fois, dans trois écrans différents, avec trois
// formulations et trois échelles. Un utilisateur qui passait de « ce soir ? »
// au Goût-o-mètre repartait de zéro.
//
// Ici les questions vivent au même endroit et se déclenchent sur condition.
// Une même question — le budget, la couleur — est posée avec les mêmes mots
// quelle que soit la direction prise, et n'est **jamais reposée** si la
// réponse est déjà connue.
//
// Les questions ne connaissent pas l'interface : ce sont des données. C'est ce
// qui permet de les éprouver sans navigateur, et d'en ajouter une sans
// toucher à l'écran qui les affiche.
// ═══════════════════════════════════════════════════════════════════════════

/** Les directions proposées d'entrée. `sortie` marque celles qui délèguent. */
export const DIRECTIONS = [
  {
    id: 'ce-soir',
    titre: 'Je bois ce soir',
    texte: 'Dites le plat, on donne les bouteilles. Trois questions.',
    ic: 'viande_rouge',
  },
  {
    id: 'gout',
    titre: 'Trouvez ce que j’aime',
    texte: 'Six questions sur votre quotidien — jamais sur le vin — et Œno retient.',
    ic: 'the',
  },
  {
    id: 'budget',
    titre: 'J’ai un budget à dépenser',
    texte: 'On compose la sélection comme un bon caviste, à l’euro près.',
    ic: 'budget',
    sortie: 'budget',   // panier de bouteilles : sort du questionnaire commun
  },
  {
    id: 'repas',
    titre: 'Je compose un repas complet',
    texte: 'Entrée, plat, dessert — le menu des vins comme au restaurant.',
    ic: 'diner_amis',
    sortie: 'repas',    // menu par service : sort du questionnaire commun
  },
]

// `quand` : la question ne se pose que si elle rend service. `garde` : ce
// qu'elle renseigne, pour ne jamais la reposer quand c'est déjà connu.
export const QUESTIONS = [
  // ── Direction « ce soir » ───────────────────────────────────────────────
  {
    id: 'plat',
    garde: 'plat',
    quand: r => r.direction === 'ce-soir',
    q: 'Vous mangez quoi ce soir ?',
    options: [
      { ic: 'viande_rouge',   label: 'Viande rouge',          v: 'viande_rouge' },
      { ic: 'viande_blanche', label: 'Viande blanche',        v: 'viande_blanche' },
      { ic: 'poisson',        label: 'Poisson / fruits de mer', v: 'poisson' },
      { ic: 'pates',          label: 'Pâtes / pizza',         v: 'pates' },
      { ic: 'fromage',        label: 'Fromage / raclette',    v: 'fromage' },
      { ic: 'vege',           label: 'Végétarien / léger',    v: 'vege' },
      { ic: 'grillades',      label: 'Grillades / barbecue',  v: 'grillades' },
      { ic: 'apero',          label: 'Juste l’apéro',         v: 'apero' },
    ],
  },
  {
    id: 'viande-rouge',
    garde: 'viande',
    quand: r => r.plat === 'viande_rouge',
    q: 'Laquelle, précisément ?',
    options: [
      { ic: 'boeuf',       label: 'Bœuf',            v: 'boeuf' },
      { ic: 'agneau',      label: 'Agneau',          v: 'agneau' },
      { ic: 'gibier',      label: 'Gibier',          v: 'gibier' },
      { ic: 'canard',      label: 'Canard / magret', v: 'canard' },
      { ic: 'viande_tout', label: 'Un peu de tout',  v: 'tout' },
    ],
  },
  {
    id: 'viande-blanche',
    garde: 'viande',
    quand: r => r.plat === 'viande_blanche',
    q: 'Laquelle, précisément ?',
    options: [
      { ic: 'poulet',      label: 'Poulet / volaille', v: 'poulet' },
      { ic: 'veau',        label: 'Veau',              v: 'veau' },
      { ic: 'porc',        label: 'Porc',              v: 'porc' },
      { ic: 'lapin',       label: 'Lapin',             v: 'lapin' },
      { ic: 'viande_tout', label: 'Un peu de tout',    v: 'tout' },
    ],
  },
  {
    id: 'style',
    garde: 'style',
    quand: r => r.direction === 'ce-soir',
    q: 'Ce soir, vous avez envie de quelque chose de…',
    options: [
      { ic: 'leger',     label: 'Léger et frais',        v: 'leger' },
      { ic: 'equilibre', label: 'Équilibré',             v: 'equilibre' },
      { ic: 'puissant',  label: 'Puissant, du caractère', v: 'puissant' },
      { ic: 'doux',      label: 'Doux et gourmand',      v: 'doux' },
    ],
  },

  // ── Direction « goût » : six questions qui ne parlent jamais de vin ──────
  {
    id: 'boisson',
    garde: 'gout.boisson',
    quand: r => r.direction === 'gout',
    q: 'Au petit-déjeuner, vous êtes plutôt…',
    options: [
      { ic: 'cafe',            label: 'Café serré',     v: { puissance: 2, tanins: 1 } },
      { ic: 'the',             label: 'Thé vert',       v: { puissance: -1, fraicheur: 2 } },
      { ic: 'chocolat_chaud',  label: 'Chocolat chaud', v: { douceur: 2, rondeur: 1 } },
      { ic: 'jus_fruits',      label: 'Jus de fruits',  v: { fruit: 2, douceur: 1 } },
    ],
  },
  {
    id: 'tartine',
    garde: 'gout.tartine',
    quand: r => r.direction === 'gout',
    q: 'Sur une tartine, vous mettez…',
    options: [
      { ic: 'confiture',     label: 'De la confiture', v: { douceur: 2, fruit: 1 } },
      { ic: 'beurre_sale',   label: 'Du beurre salé',  v: { rondeur: 2 } },
      { ic: 'citron_miel',   label: 'Citron & miel',   v: { fraicheur: 2 } },
      { ic: 'avocat_piment', label: 'Avocat & piment', v: { puissance: 1, fraicheur: 1 } },
    ],
  },
  {
    id: 'dessert',
    garde: 'gout.dessert',
    quand: r => r.direction === 'gout',
    q: 'Le dessert de vos rêves…',
    options: [
      { ic: 'tarte_citron',     label: 'Tarte au citron',     v: { fraicheur: 2 } },
      { ic: 'creme_brulee',     label: 'Crème brûlée',        v: { rondeur: 2, douceur: 1 } },
      { ic: 'fondant_chocolat', label: 'Fondant au chocolat', v: { puissance: 2, tanins: 1 } },
      { ic: 'salade_fruits',    label: 'Salade de fruits',    v: { fruit: 2, fraicheur: 1 } },
    ],
  },
  {
    id: 'reconfort',
    garde: 'gout.reconfort',
    quand: r => r.direction === 'gout',
    q: 'Votre plat réconfort ?',
    options: [
      { ic: 'cote_de_boeuf', label: 'Une belle côte de bœuf', v: { puissance: 2, tanins: 2 } },
      { ic: 'ramen',         label: 'Ramen, cuisine asiatique', v: { fraicheur: 1, douceur: 1 } },
      { ic: 'raclette',      label: 'Raclette entre amis',    v: { rondeur: 2 } },
      { ic: 'pates_tomate',  label: 'Des pâtes à la tomate',  v: { fruit: 1, fraicheur: 1 } },
    ],
  },
  {
    id: 'aventure',
    garde: 'aventure',
    quand: r => r.direction === 'gout',
    q: 'Côté découvertes, vous êtes…',
    options: [
      { ic: 'valeurs_sures', label: 'Valeurs sûres',   v: 'facile' },
      { ic: 'curieux',       label: 'Curieux modéré',  v: 'explorer' },
      { ic: 'aventurier',    label: 'Toujours à fond', v: 'pointu' },
    ],
  },

  // ── Communes aux deux directions, posées une seule fois ─────────────────
  {
    id: 'couleur',
    garde: 'couleur',
    quand: r => r.direction === 'ce-soir',
    q: 'Une envie de couleur ?',
    options: [
      { ic: 'rouge',  label: 'Rouge', v: 'red' },
      { ic: 'blanc',  label: 'Blanc', v: 'white' },
      { ic: 'rose',   label: 'Rosé',  v: 'rosé' },
      { ic: 'hasard', label: 'Peu importe, surprenez-moi', v: 'any' },
    ],
  },
  {
    id: 'budget',
    garde: 'budget',
    // Posée dans les deux directions — mais une seule fois, et avec les mêmes
    // mots. C'est la question qui existait en triple.
    quand: r => r.direction === 'ce-soir' || r.direction === 'gout',
    q: 'Pour cette bouteille, on part sur…',
    options: [
      { ic: 'petit_prix', label: '3 à 10 €',      v: 10 },
      { ic: 'budget',     label: '10 à 20 €',     v: 20 },
      { ic: 'prestige',   label: '20 à 50 €',     v: 50 },
      { ic: 'illimite',   label: 'Pas de limite', v: 9999 },
    ],
  },
]

/** Écrit une réponse, en respectant les clés imbriquées (`gout.boisson`). */
export function repondre(reponses, question, valeur) {
  const [racine, feuille] = question.garde.split('.')
  if (!feuille) return { ...reponses, [racine]: valeur }
  return { ...reponses, [racine]: { ...(reponses[racine] || {}), [feuille]: valeur } }
}

/** Cette question a-t-elle déjà sa réponse ? */
export function dejaRepondu(reponses, question) {
  const [racine, feuille] = question.garde.split('.')
  const v = feuille ? reponses[racine]?.[feuille] : reponses[racine]
  return v !== undefined && v !== null
}

/** Les questions qui s'appliquent à ces réponses, dans l'ordre. */
export function questionsPour(reponses) {
  return QUESTIONS.filter(q => q.quand(reponses))
}

/**
 * La prochaine question à poser, ou `null` quand il n'en reste aucune.
 *
 * Sauter ce qui est déjà connu est ce qui rend le guide agréable au deuxième
 * passage : quelqu'un dont le palais est déjà enregistré n'a plus que le plat
 * et le budget à donner.
 */
export function prochaineQuestion(reponses) {
  return questionsPour(reponses).find(q => !dejaRepondu(reponses, q)) || null
}

/** Où en est-on — pour la barre de progression. */
export function avancement(reponses) {
  const total = questionsPour(reponses).length
  const faites = questionsPour(reponses).filter(q => dejaRepondu(reponses, q)).length
  return { faites, total }
}
