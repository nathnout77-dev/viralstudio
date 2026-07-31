import { describe, it, expect, beforeEach } from 'vitest'
import { estVinDemo, sansDemo, caveEncoreDemo, approprier } from '../lib/demo'
import { decisionFusion } from '../lib/fusion'
import { snapshotLocal } from '../components/CompteSync'

// ═══════════════════════════════════════════════════════════════════════════
// Les bouteilles de démonstration ne doivent jamais se faire passer pour la
// cave de quelqu'un. Le test central est celui du deuxième appareil : c'est
// par là qu'on perdait une vraie cave.
// ═══════════════════════════════════════════════════════════════════════════

const demo = n => Array.from({ length: n }, (_, i) => ({ id: `w${i}`, appellation: 'Exemple', quantity: 6, demo: true }))
const vraies = [{ id: 'r1', appellation: 'Ma vraie bouteille', quantity: 1 }]
const vide = { cave: null, journal: null, envies: null, profil: null, ecole: null, decouvertes: null }

beforeEach(() => localStorage.clear())

describe('reconnaître une bouteille de démonstration', () => {
  it('distingue la démo d’une vraie bouteille', () => {
    expect(estVinDemo(demo(1)[0])).toBe(true)
    expect(estVinDemo(vraies[0])).toBe(false)
  })

  it('sansDemo ne garde que ce qui appartient à l’utilisateur', () => {
    expect(sansDemo([...demo(5), ...vraies])).toEqual(vraies)
    expect(sansDemo(demo(5))).toEqual([])
  })

  it('sansDemo rend un tableau même sur une donnée illisible', () => {
    for (const v of [null, undefined, 'nawak', 42]) expect(sansDemo(v)).toEqual([])
  })

  it('une cave entièrement d’exemple est reconnue comme telle', () => {
    expect(caveEncoreDemo(demo(5))).toBe(true)
    expect(caveEncoreDemo([...demo(5), ...vraies])).toBe(false)
    // Une cave vide n'est pas une cave de démonstration : plus rien à annoncer.
    expect(caveEncoreDemo([])).toBe(false)
  })

  it('une bouteille qu’on modifie devient la sienne', () => {
    const mien = approprier(demo(1)[0])
    expect(estVinDemo(mien)).toBe(false)
    expect(mien.appellation).toBe('Exemple')
  })
})

describe('le deuxième appareil — le chemin qui faisait perdre une cave', () => {
  // Scénario : la cave est sauvegardée dans le cloud depuis le téléphone.
  // On installe Œno sur un second appareil, où la démo se dépose, puis on se
  // connecte. Avant le correctif, la fusion rendait « conflit » et proposait
  // de choisir — et choisir « cet appareil » écrasait la vraie cave.
  it('un appareil neuf récupère le cloud, sans rien demander', () => {
    const local = { ...vide, cave: demo(5) }
    const cloud = { ...vide, cave: vraies }
    expect(decisionFusion(local, cloud)).toBe('recuperer')
  })

  it('mais une vraie bouteille sur cet appareil redevient un conflit légitime', () => {
    // Là, il y a vraiment deux contenus à départager : la question se pose.
    const local = { ...vide, cave: [...demo(5), { id: 'r2', appellation: 'Ajoutée ici' }] }
    const cloud = { ...vide, cave: vraies }
    expect(decisionFusion(local, cloud)).toBe('conflit')
  })
})

describe('snapshotLocal — la seule porte vers le cloud', () => {
  it('n’emporte jamais les bouteilles de démonstration', () => {
    localStorage.setItem('oenotheque-v2', JSON.stringify([...demo(5), ...vraies]))
    expect(snapshotLocal().cave).toEqual(vraies)
  })

  it('une cave encore vierge part vide, pas peuplée d’exemples', () => {
    localStorage.setItem('oenotheque-v2', JSON.stringify(demo(5)))
    const snap = snapshotLocal()
    expect(snap.cave).toEqual([])
    // Conséquence directe : cet appareil est vu comme neuf.
    expect(decisionFusion(snap, { ...vide, cave: vraies })).toBe('recuperer')
  })

  it('une cave illisible ne fait pas tomber la synchronisation', () => {
    localStorage.setItem('oenotheque-v2', '{{{')
    expect(snapshotLocal().cave).toEqual([])
  })
})
