import { describe, it, expect } from 'vitest'
import { vinsCites } from '../lib/mentions'

// Le conseil d'Œno n'était cliquable que pour WINE_DB. Or CATALOGUE et WINE_DB
// sont disjoints par construction (piège nº 1) : les ~580 appellations du
// référentiel ne donnaient jamais de carte, donc jamais d'ajout à la cave.
describe('les vins nommés par Œno', () => {
  it('reconnaît une appellation écrite à la main', () => {
    const r = vinsCites('Je vous conseille un Chablis, vif et minéral.')
    expect(r.map(w => w.appellation)).toContain('Chablis')
  })

  it('reconnaît aussi une appellation du référentiel national', () => {
    const r = vinsCites('Sur ce plat, un Cahors ferait merveille.')
    expect(r).toHaveLength(1)
    expect(r[0].appellation).toMatch(/Cahors/i)
  })

  it('ne mord pas à l’intérieur d’un mot', () => {
    expect(vinsCites('un bœuf bourguignon bien mijoté')).toEqual([])
  })

  it('garde le nom le plus long plutôt que sa racine', () => {
    const r = vinsCites('un Chablis Grand Cru pour les grands jours')
    expect(r).toHaveLength(1)
    expect(r[0].appellation).toBe('Chablis Grand Cru')
  })

  it('cite les vins dans l’ordre du texte, trois au plus', () => {
    const r = vinsCites('Au choix : un Sancerre, un Chablis, un Cahors ou un Vouvray.')
    expect(r).toHaveLength(3)
    expect(r[0].appellation).toBe('Sancerre')
  })
})

describe('les mots qui ne sont pas des vins', () => {
  it('« des notes de cassis » décrit un parfum, pas une appellation', () => {
    expect(vinsCites('Un rouge aux notes de cassis et de mûre.')).toEqual([])
    expect(vinsCites('Des arômes de cassis très nets.')).toEqual([])
  })

  it('mais un vin de Cassis reste un vin', () => {
    const r = vinsCites('Essayez un Cassis blanc sur des coquillages.')
    expect(r.map(w => w.appellation)).toContain('Cassis')
  })
})
