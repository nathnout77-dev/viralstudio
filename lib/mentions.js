import { CATALOGUE } from './vinsReferentiel'
import { normaliser } from '../data/aromes'

// ═══════════════════════════════════════════════════════════════════════════
// Les vins qu'Œno nomme dans sa réponse, rendus cliquables.
//
// La réponse de l'assistant est du texte libre : c'est le modèle qui choisit
// les mots, pas une liste. On y repêche donc les appellations pour en faire
// des cartes — et sans carte, il n'y a ni fiche ni « ajouter à ma cave ».
//
// Cherché dans le CATALOGUE et non dans WINE_DB : les deux ensembles sont
// disjoints par construction (piège nº 1), si bien que les ~580 appellations
// du référentiel n'ont **jamais** donné de carte. Œno conseillait un Cahors,
// et il n'y avait rien à ouvrir. Deux appellations sur trois étaient des
// culs-de-sac.
//
// Deux précautions que la version WINE_DB n'avait pas et qui deviennent
// indispensables à 864 noms :
//   • frontières de mot — sinon « Bourgogne » mord dans « bourguignon » ;
//   • le nom le plus long l'emporte — sinon « Chablis Grand Cru » est réduit
//     à « Chablis », et on ouvre la mauvaise fiche.
// ═══════════════════════════════════════════════════════════════════════════

// Trié une fois pour toutes, du nom le plus long au plus court.
const APPELLATIONS = CATALOGUE
  .map(w => ({ w, cle: normaliser(w.appellation) }))
  .filter(x => x.cle.length >= 4)
  .sort((a, b) => b.cle.length - a.cle.length)

// Le rendu rappelle cette fonction pour chaque message à chaque frappe :
// sans mémo, c'est 864 recherches par message et par caractère tapé.
const memo = new Map()

const MOT = /[a-z0-9]/

// Quelques appellations portent le nom d'un fruit — Cassis en tête. « Des
// notes de cassis » parle du parfum du vin, pas d'un vin de Cassis, et Œno
// décrit des arômes à chaque réponse. On refuse donc la carte quand le nom
// arrive juste après une tournure de dégustation.
const AVANT_UN_AROME = /(?:notes?|aromes?|parfums?|senteurs?|gouts?|nuances?|touches?)\s+(?:de\s+|d')$/

/** Jusqu'à trois vins du catalogue nommés dans `texte`, dans l'ordre du texte. */
export function vinsCites(texte) {
  if (memo.has(texte)) return memo.get(texte)
  const t = normaliser(texte)
  const pris = []
  const trouves = []

  for (const { w, cle } of APPELLATIONS) {
    let i = -1
    while ((i = t.indexOf(cle, i + 1)) !== -1) {
      const fin = i + cle.length
      const isole = (i === 0 || !MOT.test(t[i - 1])) &&
                    (fin >= t.length || !MOT.test(t[fin]))
      if (!isole) continue
      if (AVANT_UN_AROME.test(t.slice(Math.max(0, i - 24), i))) continue
      // Déjà couvert par une appellation plus longue : on ne double pas.
      if (pris.some(([a, b]) => i < b && fin > a)) break
      pris.push([i, fin])
      trouves.push({ w, i })
      break
    }
  }

  const res = trouves.sort((a, b) => a.i - b.i).slice(0, 3).map(x => x.w)
  if (memo.size > 200) memo.clear()
  memo.set(texte, res)
  return res
}
