import { describe, it, expect } from 'vitest'
import { MILLESIMES_DB, WINE_DB } from '../data/wineDatabase'

// ═══════════════════════════════════════════════════════════════════════════
// Les données ont une date de péremption.
//
// Le guide des millésimes s'était arrêté en pratique à 2022 : trois lignes
// pour 2023, une pour 2024, aucune pour 2025. En août 2026, Œno proposait donc
// par défaut un millésime de quatre ans — sur la fiche, au scan, sur la carte,
// partout où `bonsMilsimes` sert de valeur par défaut.
//
// Personne ne s'en était aperçu parce que rien ne le disait : le code
// compilait, les tests passaient, et la péremption ne se voyait qu'à l'écran,
// pour qui connaît les millésimes. Ce test la rend visible au build.
//
// Le seuil est à deux ans, pas un : les vendanges de l'année en cours ne sont
// pas encore en bouteille, et celles de l'an dernier n'arrivent en rayon qu'au
// printemps. Un an de battement évite de crier au loup chaque janvier.
// ═══════════════════════════════════════════════════════════════════════════

const ANNEE = new Date().getFullYear()
const SEUIL = ANNEE - 2

// Les vins étrangers ne sont pas suivis : leurs millésimes n'ont jamais été
// documentés ici, et prétendre le contraire serait pire que l'aveu.
const REGIONS_SUIVIES = new Set([
  'Alsace', 'Beaujolais', 'Bordeaux', 'Bourgogne', 'Corse', 'Jura', 'Languedoc',
  'Loire', 'Provence', 'Rhône Nord', 'Rhône Sud', 'Roussillon', 'Savoie', 'Sud-Ouest',
])

describe('le guide des millésimes reste d’actualité', () => {
  it(`couvre au moins jusqu’à ${SEUIL}`, () => {
    const derniere = Math.max(...MILLESIMES_DB.map(r => r[0]))
    expect(derniere, `Le guide s’arrête en ${derniere}. Il faut y ajouter les millésimes récents (data/wineDatabase.js).`)
      .toBeGreaterThanOrEqual(SEUIL)
  })

  it('documente chaque millésime récent, sans trou', () => {
    const annees = new Set(MILLESIMES_DB.map(r => r[0]))
    for (let a = SEUIL; a <= Math.max(...annees); a++) {
      expect(annees.has(a), `Aucune ligne pour le millésime ${a}.`).toBe(true)
    }
  })
})

describe('les fiches ne conseillent pas un millésime dépassé', () => {
  it(`propose par défaut un millésime d’au plus ${ANNEE - SEUIL} ans`, () => {
    // C'est le dernier de `bonsMilsimes` qui fait office de valeur par défaut
    // dans la fiche, le scan, la carte et « Découvrir ».
    const perimes = WINE_DB
      .filter(w => REGIONS_SUIVIES.has(w.region))
      .filter(w => {
        const dernier = w.bonsMilsimes?.[w.bonsMilsimes.length - 1]
        return !dernier || dernier < SEUIL
      })
      .map(w => `${w.appellation} (${w.region})`)

    expect(perimes, `${perimes.length} vin(s) proposent encore un millésime antérieur à ${SEUIL} : ${perimes.slice(0, 5).join(', ')}`)
      .toEqual([])
  })

  it('n’annonce jamais un millésime qui n’existe pas encore', () => {
    // L'inverse du même soin : les vendanges de l'année en cours ne sont pas
    // en bouteille avant la fin de l'automne.
    const futurs = WINE_DB.flatMap(w => (w.bonsMilsimes || []).filter(y => y > ANNEE))
    expect(futurs).toEqual([])
  })
})
