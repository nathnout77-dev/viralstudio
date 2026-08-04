// ═══════════════════════════════════════════════════════════════════════════
// Du vin de catalogue à la bouteille de cave.
//
// La conversion existait en six exemplaires — bibliothèque, carte, domaines,
// petits prix, comparateur, scan — et elle avait divergé : la version de la
// carte oubliait le prix estimé et la moitié des notes. Un même vin ajouté
// depuis deux écrans n'arrivait donc pas identique dans la cave.
//
// Ce qui est une fiche de catalogue (une appellation, décrite) devient ici un
// objet de cave (une bouteille, possédée). Les deux ne portent pas les mêmes
// mots — `prixMoyen` devient `estimatedValue`, `accords` devient
// `foodPairings` — et c'est le seul endroit qui doit connaître ce passage.
// ═══════════════════════════════════════════════════════════════════════════
import { identifiantUnique } from './identifiant'

/**
 * @param vin       fiche du catalogue (WINE_DB ou référentiel)
 * @param millesime année choisie
 * @param quantite  nombre de bouteilles (1 par défaut)
 * @param prix      **le prix de l'utilisateur**, en euros par bouteille. Il
 *   fait foi : `prixMoyen` du catalogue n'est qu'un ordre de grandeur pour
 *   une appellation, pas ce qu'on a payé cette bouteille-là. Le recopier en
 *   silence remplissait la cave de prix qui n'étaient ceux de personne.
 * @param domaine    producteur, quand on le connaît — le scan le lit sur
 *   l'étiquette. Une fiche de catalogue, elle, décrit une appellation et
 *   n'en sait rien.
 * @param provenance d'où vient l'ajout (« ajouté via le scan d'étiquette »…).
 *   Chaque écran a le sien : six mois plus tard, c'est ce qui rappelle
 *   pourquoi cette bouteille est là. À défaut, on note les arômes.
 */
export function bouteilleDepuisVin(vin, millesime, { quantite = 1, prix = null, provenance = null, domaine = '' } = {}) {
  if (!vin) return null
  const notes = [vin.enUneMot, provenance || (vin.aromes && `Arômes : ${vin.aromes}`)]
    .filter(Boolean)
    .join(' — ')
  return {
    // Deux lots du même vin et du même millésime, achetés séparément, sont
    // deux entrées distinctes. Un identifiant qui se répéterait ferait passer
    // le second ajout pour une modification du premier — et l'effacerait.
    id: identifiantUnique(`${vin.id}-${millesime}`),
    name: vin.appellation,
    // Vide par défaut : une fiche de catalogue décrit une appellation, pas un
    // producteur. Seul le scan peut le renseigner, en le lisant sur l'étiquette.
    domain: domaine || '',
    appellation: vin.appellation,
    region: vin.region,
    type: vin.type,
    cepages: vin.cepages,
    // `?? null` plutôt que le laisser filer en `undefined` : l'étiquette d'un
    // vin scanné ne livre pas toujours son millésime, et un champ absent se
    // perd au passage par JSON.stringify — la bouteille arrivait en cave sans
    // millésime *et* sans trace du fait qu'on ne le connaissait pas.
    vintage: millesime ?? null,
    quantity: quantite,
    drinkFrom: vin.drinkFrom,
    drinkUntil: vin.drinkUntil,
    serviceTemp: vin.serviceTemp,
    carafage: vin.carafage,
    estimatedValue: prix == null || prix === '' ? undefined : Number(prix),
    foodPairings: vin.accords,
    notes,
  }
}

/**
 * Ce qu'Œno propose comme point de départ, à confirmer ou corriger. C'est un
 * prix moyen d'appellation : il situe, il ne remplace pas ce qu'on a payé.
 */
export function prixSuggere(vin) {
  return vin?.prixMoyen ?? ''
}

/** Millésime raisonnable par défaut : le dernier qui ait pu être mis en vente. */
export function millesimeParDefaut() {
  return new Date().getFullYear() - 2
}
