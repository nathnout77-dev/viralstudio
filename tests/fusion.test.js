import { describe, it, expect } from 'vitest'
import { estVide, toutVide, memeContenu, decisionFusion } from '../lib/fusion'

// ═══════════════════════════════════════════════════════════════════════════
// La fusion au login est le seul endroit de l'app où une erreur fait perdre
// la cave de quelqu'un. Ces tests décrivent surtout ce qui ne doit JAMAIS
// arriver : écraser du contenu sans que l'utilisateur l'ait demandé.
// ═══════════════════════════════════════════════════════════════════════════

const cave = [{ id: 1, appellation: 'Chablis' }]
const snap = (o = {}) => ({ cave: null, journal: null, envies: null, profil: null, ecole: null, decouvertes: null, ...o })

describe('estVide', () => {
  it('tient pour vides le néant, le tableau vide et l’objet sans clé', () => {
    for (const v of [null, undefined, [], {}]) expect(estVide(v)).toBe(true)
  })

  it('ne tient pas pour vide un contenu réel', () => {
    for (const v of [cave, { a: 1 }, [0]]) expect(estVide(v)).toBe(false)
  })
})

describe('toutVide', () => {
  it('un snapshot sans aucune rubrique remplie est vide', () => {
    expect(toutVide(snap())).toBe(true)
    expect(toutVide(null)).toBe(true)
  })

  it('une seule rubrique remplie suffit à ne plus l’être', () => {
    expect(toutVide(snap({ ecole: { lecon: 3 } }))).toBe(false)
  })
})

describe('decisionFusion', () => {
  it('cloud vierge : le local fait foi', () => {
    expect(decisionFusion(snap({ cave }), snap())).toBe('pousser')
    expect(decisionFusion(snap({ cave }), null)).toBe('pousser')
  })

  it('appareil neuf : le cloud fait foi', () => {
    expect(decisionFusion(snap(), snap({ cave }))).toBe('recuperer')
  })

  it('rien nulle part : pousser, et surtout ne rien demander', () => {
    // Deux côtés vides ne constituent pas un choix. Poser la question ici
    // serait une modale d'accueil pour un utilisateur qui n'a encore rien.
    expect(decisionFusion(snap(), snap())).toBe('pousser')
  })

  it('contenus identiques : rien à faire', () => {
    expect(decisionFusion(snap({ cave }), snap({ cave }))).toBe('identique')
  })

  // Le test qui compte : deux caves différentes ne doivent jamais être
  // départagées automatiquement. Chaque autre issue perd des bouteilles.
  it('deux contenus différents : demander, jamais trancher', () => {
    const local = snap({ cave })
    const cloud = snap({ cave: [{ id: 2, appellation: 'Sancerre' }] })
    expect(decisionFusion(local, cloud)).toBe('conflit')
  })

  it('même une différence minime déclenche le conflit', () => {
    const local = snap({ cave: [{ id: 1, appellation: 'Chablis', note: 4 }] })
    const cloud = snap({ cave: [{ id: 1, appellation: 'Chablis', note: 5 }] })
    expect(decisionFusion(local, cloud)).toBe('conflit')
  })
})

describe('memeContenu — pas de conflit fantôme', () => {
  // Postgres ne conserve pas l'ordre des clés d'un jsonb. Une comparaison par
  // JSON.stringify brut ferait donc croire à un conflit là où les deux côtés
  // portent exactement la même cave — et demanderait à l'utilisateur de
  // choisir entre deux choses identiques, au risque qu'il se trompe.
  it('l’ordre des clés ne crée pas de différence', () => {
    const local = snap({ cave: [{ id: 1, appellation: 'Chablis', region: 'Bourgogne' }] })
    const cloud = snap({ cave: [{ region: 'Bourgogne', appellation: 'Chablis', id: 1 }] })
    expect(memeContenu(local, cloud)).toBe(true)
    expect(decisionFusion(local, cloud)).toBe('identique')
  })

  it('une rubrique absente et une rubrique nulle décrivent le même néant', () => {
    const local = { cave, journal: [] }
    const cloud = { cave }
    expect(memeContenu(local, cloud)).toBe(true)
  })

  it('l’ordre d’un tableau, lui, reste significatif', () => {
    const a = { cave: [{ id: 1 }, { id: 2 }] }
    const b = { cave: [{ id: 2 }, { id: 1 }] }
    expect(memeContenu(a, b)).toBe(false)
  })
})
