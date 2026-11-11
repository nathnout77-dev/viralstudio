import { describe, it, expect } from 'vitest'
import { caveVersCsv, csvVersCave } from '../lib/tableur'

// ═══════════════════════════════════════════════════════════════════════════
// La cave en tableur. Ce qu'on protège : un aller-retour ne perd rien, un
// fichier tenu par quelqu'un d'autre (autres titres, autre séparateur) se lit
// quand même, et rien n'est inventé pour combler un vide.
// ═══════════════════════════════════════════════════════════════════════════

const CAVE = [
  { id: '1', name: 'Morgon "Côte du Py"', domain: 'Foillard; père', appellation: 'Morgon', region: 'Beaujolais',
    type: 'red', cepages: ['Gamay'], vintage: 2022, quantity: 6, estimatedValue: 22.5, notes: 'Deux\nlignes', ouvertes: 2 },
  { id: '2', name: 'Sancerre', type: 'white', vintage: 2023, quantity: 3 },
  { id: 'd', name: 'Exemple', demo: true, vintage: 2020, quantity: 12 },
]

describe('l’export', () => {
  it('s’ouvre d’un double-clic dans un Excel français', () => {
    const csv = caveVersCsv(CAVE)
    expect(csv.startsWith('﻿')).toBe(true)          // accents lus correctement
    expect(csv.split('\r\n')[0]).toContain('Nom;Domaine') // point-virgule
    expect(csv).toContain('22,5')                         // virgule décimale
  })

  it('laisse les bouteilles d’exemple à la porte', () => {
    expect(caveVersCsv(CAVE)).not.toContain('Exemple')
  })
})

describe('l’aller-retour', () => {
  it('ne perd rien, guillemets, points-virgules et retours à la ligne compris', () => {
    const { bouteilles, ignorees } = csvVersCave(caveVersCsv(CAVE))
    expect(ignorees).toBe(0)
    expect(bouteilles).toHaveLength(2)
    const [m, s] = bouteilles
    expect(m).toMatchObject({ name: 'Morgon "Côte du Py"', domain: 'Foillard; père', region: 'Beaujolais',
      type: 'red', cepages: ['Gamay'], vintage: 2022, quantity: 6, estimatedValue: 22.5, notes: 'Deux\nlignes', ouvertes: 2 })
    expect(s).toMatchObject({ name: 'Sancerre', type: 'white', vintage: 2023, quantity: 3 })
  })
})

describe('l’import d’une cave tenue ailleurs', () => {
  it('lit d’autres titres, un autre ordre et des virgules', () => {
    const { bouteilles, reconnues } = csvVersCave('Year,Wine,Producer,Qty,Price,Color\n2019,Chablis,Dauvissat,2,35.00,White\n')
    expect(reconnues).toEqual(expect.arrayContaining(['name', 'vintage', 'quantity', 'estimatedValue']))
    expect(bouteilles[0]).toMatchObject({ name: 'Chablis', domain: 'Dauvissat', vintage: 2019, quantity: 2, estimatedValue: 35, type: 'white' })
  })

  it('n’invente ni prix ni millésime', () => {
    const { bouteilles } = csvVersCave('Nom;Millésime;Prix\nBandol;;\nCahors;3024;abc\n')
    expect(bouteilles[0].estimatedValue).toBeUndefined()
    expect(bouteilles[0].vintage).toBeUndefined()
    expect(bouteilles[1].vintage).toBeUndefined()   // 3024 n'est pas un millésime
    expect(bouteilles[0].quantity).toBe(1)          // une ligne = au moins une bouteille
  })

  it('reconnaît les couleurs comme on les écrit', () => {
    const { bouteilles } = csvVersCave('Nom;Couleur\nA;rosé\nB;Champagne brut\nC;Moelleux\nD;\n')
    expect(bouteilles.map(b => b.type)).toEqual(['rosé', 'sparkling', 'sweet', 'red'])
  })

  it('écarte les lignes sans nom, et le dit', () => {
    const { bouteilles, ignorees } = csvVersCave('Nom;Quantité\nChinon;2\n;4\n')
    expect(bouteilles).toHaveLength(1)
    expect(ignorees).toBe(1)
  })

  it('refuse poliment un fichier qui n’est pas une cave', () => {
    expect(csvVersCave('a;b;c\n1;2;3\n').bouteilles).toEqual([])
    expect(csvVersCave('').bouteilles).toEqual([])
    expect(csvVersCave(null).bouteilles).toEqual([])
  })

  it('donne à chaque bouteille un identifiant distinct', () => {
    const { bouteilles } = csvVersCave('Nom\nA\nB\nC\n')
    expect(new Set(bouteilles.map(b => b.id)).size).toBe(3)
  })
})
