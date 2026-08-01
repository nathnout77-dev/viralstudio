// ═══════════════════════════════════════════════════════════════════════════
// Identifiants locaux.
//
// `Date.now()` seul ne suffit pas : deux objets créés dans la même
// milliseconde reçoivent le même identifiant. Ça n'a rien de théorique — le
// défaut s'est produit deux fois dans ce dépôt :
//
//   – dans les envies, supprimer l'une effaçait sa jumelle ;
//   – dans la cave, un second ajout du même vin REMPLACE le premier, parce
//     que l'enregistrement traite un identifiant connu comme une
//     modification. Deux bouteilles achetées le même jour, une seule
//     conservée, sans un mot.
//
// Le compteur garantit l'unicité à cette échelle. Pas de `crypto.randomUUID` :
// il manque aux vieux WebView Android, où l'app tourne aussi.
// ═══════════════════════════════════════════════════════════════════════════

let compteur = 0

/** @param prefixe court, pour rester lisible dans le stockage (`e`, `w1-2021`…) */
export function identifiantUnique(prefixe = '') {
  compteur += 1
  return `${prefixe}${prefixe ? '-' : ''}${Date.now()}-${compteur}-${Math.random().toString(36).slice(2, 7)}`
}
