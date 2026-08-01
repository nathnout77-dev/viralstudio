import { describe, it, expect } from 'vitest'
import { bouteilleDepuisVin } from '../lib/ajoutCave'
import { CATALOGUE } from '../lib/vinsReferentiel'

// ═══════════════════════════════════════════════════════════════════════════
// Passer une fiche de catalogue en bouteille de cave. Les deux ne parlent pas
// la même langue — `prixMoyen` d'un côté, `estimatedValue` de l'autre — et
// c'est en recopiant ce passage six fois que des écarts sont apparus : la
// carte perdait le prix estimé. Ces tests fixent le contrat.
// ═══════════════════════════════════════════════════════════════════════════

const vin = {
  id: 'v1', appellation: 'Chablis', region: 'Bourgogne', type: 'white',
  cepages: ['Chardonnay'], drinkFrom: 2, drinkUntil: 8, serviceTemp: 10,
  carafage: null, prixMoyen: 18, accords: ['Poisson'],
  enUneMot: 'Vif et minéral', aromes: 'citron, pierre à fusil',
}

describe('bouteilleDepuisVin', () => {
  it('traduit les noms du catalogue vers ceux de la cave', () => {
    const b = bouteilleDepuisVin(vin, 2021)
    expect(b.estimatedValue).toBe(18)      // prixMoyen
    expect(b.foodPairings).toEqual(['Poisson'])  // accords
    expect(b.name).toBe('Chablis')          // appellation
    expect(b.vintage).toBe(2021)
  })

  it('reporte tout ce qui sert à savoir quand l’ouvrir', () => {
    const b = bouteilleDepuisVin(vin, 2021)
    expect(b.drinkFrom).toBe(2)
    expect(b.drinkUntil).toBe(8)
    expect(b.serviceTemp).toBe(10)
  })

  it('une bouteille par défaut', () => {
    expect(bouteilleDepuisVin(vin, 2021).quantity).toBe(1)
    expect(bouteilleDepuisVin(vin, 2021, { quantite: 6 }).quantity).toBe(6)
  })

  it('deux ajouts du même vin ne se confondent pas', () => {
    // On peut posséder deux lots du même millésime, achetés séparément.
    const a = bouteilleDepuisVin(vin, 2021)
    const b = bouteilleDepuisVin({ ...vin }, 2021)
    expect(a.id).not.toBe(b.id)
  })

  it('note les arômes, ou la provenance quand on la donne', () => {
    expect(bouteilleDepuisVin(vin, 2021).notes).toContain('citron')
    const scan = bouteilleDepuisVin(vin, 2021, { provenance: 'ajouté via le scan' })
    expect(scan.notes).toContain('ajouté via le scan')
    expect(scan.notes).toContain('Vif et minéral')
  })

  it('le domaine ne s’invente pas, mais se garde quand le scan l’a lu', () => {
    expect(bouteilleDepuisVin(vin, 2021).domain).toBe('')
    expect(bouteilleDepuisVin(vin, 2021, { domaine: 'Domaine Untel' }).domain).toBe('Domaine Untel')
  })

  it('ne tombe pas sur un vin absent', () => {
    expect(bouteilleDepuisVin(null, 2021)).toBeNull()
  })
})

describe('sur de vrais vins du catalogue', () => {
  // Le piège nº 1 du dépôt s'applique ici : les vins du référentiel n'ont pas
  // toujours les mêmes champs que ceux écrits à la main. La conversion doit
  // marcher sur les deux, sinon l'ajout échoue précisément pour les vins que
  // « Découvrir » propose.
  it('produit une bouteille exploitable pour n’importe quel vin', () => {
    const echantillon = [CATALOGUE[0], CATALOGUE[Math.floor(CATALOGUE.length / 2)], CATALOGUE.at(-1)]
    for (const v of echantillon) {
      const b = bouteilleDepuisVin(v, 2020)
      expect(b.name).toBeTruthy()
      expect(b.vintage).toBe(2020)
      expect(b.quantity).toBe(1)
      expect(typeof b.id).toBe('string')
    }
  })
})
