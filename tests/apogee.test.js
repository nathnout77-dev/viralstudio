import { describe, it, expect } from 'vitest'
import { fenetreDeGarde, etatDeGarde, estAPoint, aOuvrirSansTarder, libelleDeGarde } from '../lib/apogee'

// ═══════════════════════════════════════════════════════════════════════════
// Une cave n'est pas un coffre : un vin oublié s'y abîme. Ces tests protègent
// la seule alerte qui évite de perdre une bouteille — et le fait qu'on
// n'alerte jamais à tort (bouteille d'exemple, bouteille déjà finie).
// ═══════════════════════════════════════════════════════════════════════════

const vin = (extra = {}) => ({ id: 'v', name: 'Chinon', vintage: 2020, drinkFrom: 2, drinkUntil: 6, quantity: 2, ...extra })

describe('la fenêtre de garde', () => {
  it('se compte en années depuis le millésime', () => {
    expect(fenetreDeGarde(vin())).toEqual({ debut: 2022, fin: 2026 })
  })

  it('retombe sur un repère prudent quand la fiche ne dit rien', () => {
    expect(fenetreDeGarde({ vintage: 2020 })).toEqual({ debut: 2022, fin: 2028 })
  })

  it('ne dit rien d’une bouteille sans millésime, plutôt que d’inventer', () => {
    expect(fenetreDeGarde({ name: 'Mystère' })).toBeNull()
    expect(etatDeGarde({ name: 'Mystère' }, 2026)).toBeNull()
    expect(libelleDeGarde({ name: 'Mystère' }, 2026)).toBe('')
  })

  it('distingue les quatre moments de la vie d’une bouteille', () => {
    expect(etatDeGarde(vin(), 2021)).toBe('trop-tot')
    expect(etatDeGarde(vin(), 2024)).toBe('a-point')
    expect(etatDeGarde(vin(), 2026)).toBe('derniere-annee')
    expect(etatDeGarde(vin(), 2027)).toBe('passee')
  })

  it('compte la dernière année comme « à point »', () => {
    expect(estAPoint(vin(), 2026)).toBe(true)
    expect(estAPoint(vin(), 2027)).toBe(false)
  })
})

describe('les bouteilles à ouvrir sans tarder', () => {
  it('remonte la dernière année avant ce qui est déjà dépassé', () => {
    const cave = [
      vin({ id: 'passee', drinkUntil: 4 }),         // fin 2024
      vin({ id: 'cette-annee', drinkUntil: 6 }),    // fin 2026
      vin({ id: 'tranquille', drinkUntil: 12 }),    // fin 2032
    ]
    expect(aOuvrirSansTarder(cave, 2026).map(x => x.vin.id)).toEqual(['cette-annee', 'passee'])
  })

  it('n’alerte ni sur une bouteille d’exemple, ni sur une bouteille finie', () => {
    const cave = [vin({ id: 'demo', demo: true }), vin({ id: 'vide', quantity: 0 })]
    expect(aOuvrirSansTarder(cave, 2026)).toEqual([])
  })

  it('tolère une cave illisible', () => {
    expect(aOuvrirSansTarder([null, undefined, {}], 2026)).toEqual([])
    expect(aOuvrirSansTarder(undefined, 2026)).toEqual([])
  })
})
