import { describe, it, expect } from 'vitest'
import { repondreLocalement } from '../lib/assistantLocal'

// ═══════════════════════════════════════════════════════════════════════════
// L'assistant sans réseau. Deux choses comptent autant l'une que l'autre :
// qu'il réponde aux questions simples au lieu de se dire injoignable, et
// qu'il se TAISE sur le reste — une réponse à côté, dite avec aplomb, serait
// pire que l'aveu.
// ═══════════════════════════════════════════════════════════════════════════

describe('ce que la base sait dire seule', () => {
  it('conseille des vins sur un plat nommé', () => {
    const r = repondreLocalement('Quel vin avec une raclette ?')
    expect(r).toMatch(/Trois pistes/)
    expect(r.match(/^- \*\*/gm)).toHaveLength(3)
  })

  it('donne la température de service d’un vin nommé', () => {
    expect(repondreLocalement('À quelle température servir un Chablis ?')).toMatch(/Chablis\*\* se sert autour de \*\*\d+ °C/)
  })

  it('dit combien de temps garder un vin, et que ce n’est qu’un repère', () => {
    const r = repondreLocalement('Combien de temps garder un Morgon ?')
    expect(r).toMatch(/entre \*\*\d+ et \d+ ans/)
    expect(r).toMatch(/repère/)
  })

  it('présente un vin simplement nommé', () => {
    expect(repondreLocalement('Parle-moi du Sancerre')).toMatch(/\*\*Sancerre\*\* — Loire/)
  })

  it('explique un mot du vin', () => {
    expect(repondreLocalement('C’est quoi les tanins ?')).toMatch(/\*\*Tanins\*\* — /)
  })

  it('dit toujours d’où vient la réponse', () => {
    for (const q of ['Quel vin avec du saumon ?', 'Servir un Chablis', 'c’est quoi le carafage']) {
      expect(repondreLocalement(q)).toMatch(/sans connexion/)
    }
  })
})

describe('ce sur quoi elle se tait', () => {
  it('rend la main plutôt que de répondre à côté', () => {
    for (const q of [
      'Raconte-moi l’histoire du phylloxéra',
      'Quel est le meilleur vigneron du monde ?',
      'Bonjour',
      '',
      null,
    ]) expect(repondreLocalement(q)).toBeNull()
  })

  it('ne prend pas un arôme pour une appellation', () => {
    // « notes de cassis » parle d'un parfum, pas d'un vin de Cassis.
    expect(repondreLocalement('Pourquoi ce vin a des notes de cassis ?')).toBeNull()
  })
})
