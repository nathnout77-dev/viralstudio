import { describe, it, expect } from 'vitest'
import { WINE_DB } from '../data/wineDatabase'
import { CATALOGUE, VINS_REFERENTIEL } from '../lib/vinsReferentiel'

// ═══════════════════════════════════════════════════════════════════════════
// Le piège nº 1 du dépôt, transformé en test.
//
// WINE_DB et VINS_REFERENTIEL sont disjoints par construction : le second
// exclut toute appellation déjà présente dans le premier. Chercher un vin
// dans WINE_DB seul échoue donc *toujours* pour les vins du référentiel —
// c'est ce qui rendait les envies incomplètes.
//
// Ces tests ne vérifient pas du code : ils verrouillent l'invariant qui rend
// le raccourci dangereux, pour qu'on ne puisse plus l'oublier en silence.
// ═══════════════════════════════════════════════════════════════════════════

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()

describe('CATALOGUE', () => {
  it('réunit bien les deux ensembles', () => {
    expect(CATALOGUE.length).toBe(WINE_DB.length + VINS_REFERENTIEL.length)
  })

  it('les deux ensembles sont disjoints — WINE_DB ne peut pas suffire', () => {
    const dansWineDb = new Set(WINE_DB.map(w => norm(w.appellation)))
    const chevauchement = VINS_REFERENTIEL.filter(v => dansWineDb.has(norm(v.appellation)))
    expect(chevauchement).toEqual([])
  })

  it('le référentiel apporte une part majeure du catalogue', () => {
    // Si ce nombre tombait à zéro, les tests ci-dessous passeraient sans rien
    // prouver : la garantie viendrait du vide, pas du code.
    expect(VINS_REFERENTIEL.length).toBeGreaterThan(100)
  })
})

describe('la régression des envies', () => {
  // Reproduit exactement le geste qui échouait : prendre un vin tel que
  // « Découvrir » le propose, puis tenter de le retrouver par son nom.
  const vinDuReferentiel = VINS_REFERENTIEL[0]

  it('un vin de Découvrir est introuvable dans WINE_DB — c’était le bug', () => {
    const trouve = WINE_DB.find(w => w.appellation === vinDuReferentiel.appellation)
    expect(trouve).toBeUndefined()
  })

  it('le même vin se retrouve dans CATALOGUE — c’est le correctif', () => {
    const trouve = CATALOGUE.find(w => w.appellation === vinDuReferentiel.appellation)
    expect(trouve).toBeDefined()
  })

  it('chercher dans WINE_DB rate une large part du catalogue', () => {
    // Chiffre le rayon d'action du raccourci : ce n'est pas un cas limite,
    // c'est une fiche sur deux. Le jour où ce test échoue, c'est que les deux
    // ensembles ont fusionné — et le piège aura disparu avec lui.
    const dansWineDb = new Set(WINE_DB.map(w => w.appellation))
    const manques = CATALOGUE.filter(w => !dansWineDb.has(w.appellation))
    expect(manques.length).toBeGreaterThan(CATALOGUE.length * 0.25)
  })
})

describe('les fiches du catalogue sont exploitables', () => {
  it('chaque vin porte au minimum une appellation non vide', () => {
    const sansNom = CATALOGUE.filter(w => !w.appellation || !String(w.appellation).trim())
    expect(sansNom).toEqual([])
  })

  it('une fiche reste assez légère pour être gardée avec une envie', () => {
    // Le correctif stocke la fiche entière dans localStorage. Si une fiche
    // devenait volumineuse, la liste d'envies ferait sauter le quota.
    const max = Math.max(...CATALOGUE.map(w => JSON.stringify(w).length))
    expect(max).toBeLessThan(4000)
  })
})
