// ═══════════════════════════════════════════════════════════════════════════
// Les bouteilles de démonstration, et la frontière avec les vraies.
//
// Œno amorce la cave d'un nouveau venu avec quelques bouteilles : un écran
// vide n'apprend rien et fait une première impression triste. Mais ces vins
// sont écrits dans le même stockage que les vrais, et c'est là qu'était le
// danger — ils entraient dans la synchronisation.
//
// Le chemin exact : on installe Œno sur un deuxième appareil, la démo s'y
// dépose, on se connecte. Le local n'étant plus vide, la fusion n'y voyait
// pas un appareil neuf et rendait « conflit » — puis proposait de choisir
// entre « cet appareil » et « le cloud ». Choisir « cet appareil », en
// comprenant « mon application », remplaçait une vraie cave par cinq vins
// de démonstration.
//
// D'où la règle : **une bouteille de démonstration n'est jamais une donnée
// personnelle**. Elle s'affiche, mais elle ne se synchronise pas, ne se
// sauvegarde pas, et ne compte pas quand il s'agit de décider qui, du local
// ou du cloud, fait foi.
// ═══════════════════════════════════════════════════════════════════════════

export function estVinDemo(v) {
  return Boolean(v && v.demo)
}

/**
 * La cave sans sa part de démonstration — c'est-à-dire ce que l'utilisateur
 * possède vraiment. Rend un tableau, même sur une entrée illisible : les
 * appelants s'en servent pour décider, ils ne doivent pas avoir à se méfier.
 */
export function sansDemo(cave) {
  return Array.isArray(cave) ? cave.filter(v => !estVinDemo(v)) : []
}

/** Vrai tant que l'utilisateur n'a pas ajouté une seule bouteille à lui. */
export function caveEncoreDemo(cave) {
  return Array.isArray(cave) && cave.length > 0 && cave.every(estVinDemo)
}

/**
 * Une bouteille touchée par l'utilisateur cesse d'être une démonstration.
 * Renommer un vin, le noter ou en boire un verre, c'est se l'approprier —
 * le garder marqué le ferait disparaître au premier ajout suivant.
 */
export function approprier(v) {
  if (!estVinDemo(v)) return v
  const { demo, ...reste } = v
  return reste
}
