import { createContext, useContext } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Ranger une bouteille, depuis n'importe où.
//
// Pourquoi un contexte plutôt qu'une prop. La fiche d'un vin s'ouvre depuis
// dix-huit endroits : la bibliothèque, la recherche, l'assistant, le scan, la
// carte, les envies, les accords, les millésimes, la roue des arômes, « ce
// soir ? », le budget caviste, le mode dîner, le profil de goût, la cave d'un
// ami… Onze d'entre eux vivent sous des écrans qui ne reçoivent pas la cave et
// n'ont aucune raison de la recevoir — un guide des accords n'a pas à savoir
// enregistrer une bouteille.
//
// Résultat : la fiche s'y ouvrait sans bouton « Ajouter à ma cave ». Pas
// désactivé, pas grisé — absent. Le vin était décrit en détail et il n'y avait
// rien à en faire. Faire descendre la prop à travers GuideView, CaveView,
// ParcoursVin, LandingPage… aurait rétabli les onze cas d'aujourd'hui et
// laissé le dix-neuvième repartir sans bouton, en silence, exactement comme
// les autres.
//
// D'où la règle inverse : la capacité de ranger une bouteille est ambiante.
// `FicheVin` la lit ici quand personne ne lui en donne, et le bouton existe
// donc par défaut. Un écran qui veut autre chose — marquer la provenance,
// retirer une envie — passe toujours sa propre fonction, qui l'emporte.
// ═══════════════════════════════════════════════════════════════════════════

const CaveContext = createContext(null)

/** Attend `{ ranger, noter }`. */
export const FournisseurCave = CaveContext.Provider

/**
 * La fonction qui range une bouteille, ou `null` hors de l'application (la
 * landing, une story de composant). L'appelant doit supporter ce `null` : sans
 * cave, on n'affiche pas un bouton qui ne mène nulle part.
 */
export function useAjoutCave() {
  return useContext(CaveContext)?.ranger ?? null
}

/**
 * Ouvrir le journal de dégustation pré-rempli pour ce vin. Même histoire que
 * l'ajout : « Noter cette dégustation » n'existait que sur deux fiches sur
 * dix-huit. On pouvait boire un vin conseillé par Œno sans pouvoir dire ce
 * qu'on en avait pensé — alors que le journal est une des raisons d'être
 * d'Œno.
 */
export function useNoterDegustation() {
  return useContext(CaveContext)?.noter ?? null
}
