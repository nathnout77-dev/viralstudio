import { describe, it, expect, beforeEach } from 'vitest'
import { loadEnvies, toggleEnvie, removeEnvie } from '../components/Envies'
import { CATALOGUE, VINS_REFERENTIEL } from '../lib/vinsReferentiel'

// ═══════════════════════════════════════════════════════════════════════════
// Les envies, côté stockage. Le scénario central est celui du bug : ajouter
// un vin depuis « Découvrir », puis vérifier qu'on récupère sa fiche entière
// — pas seulement son nom.
// ═══════════════════════════════════════════════════════════════════════════

beforeEach(() => localStorage.clear())

describe('toggleEnvie', () => {
  it('ajoute puis retire le même vin', () => {
    toggleEnvie('Chablis')
    expect(loadEnvies()).toHaveLength(1)
    toggleEnvie('Chablis')
    expect(loadEnvies()).toHaveLength(0)
  })

  it('garde la fiche complète du vin, pas seulement son nom', () => {
    const vin = CATALOGUE.find(w => w.region)
    toggleEnvie(vin.appellation, vin)
    const [envie] = loadEnvies()
    expect(envie.appellation).toBe(vin.appellation)
    expect(envie.vin).toEqual(vin)
    expect(envie.vin.region).toBe(vin.region)
  })

  // La régression, telle qu'elle se produisait pour l'utilisateur.
  it('un vin du référentiel garde sa fiche — il était irrécupérable avant', () => {
    const vin = VINS_REFERENTIEL[0]
    toggleEnvie(vin.appellation, vin)
    const [envie] = loadEnvies()
    expect(envie.vin).not.toBeNull()
    expect(envie.vin.appellation).toBe(vin.appellation)
  })

  it('accepte un vin sans fiche — une étiquette scannée, inconnue des bases', () => {
    toggleEnvie('Un vin de vigneron inconnu')
    expect(loadEnvies()[0].vin).toBeNull()
  })

  it('le plus récent arrive en tête', () => {
    toggleEnvie('Chablis')
    toggleEnvie('Sancerre')
    expect(loadEnvies().map(e => e.appellation)).toEqual(['Sancerre', 'Chablis'])
  })

  it('ne crée pas de doublon', () => {
    toggleEnvie('Chablis', { appellation: 'Chablis' })
    toggleEnvie('Chablis', { appellation: 'Chablis' })
    toggleEnvie('Chablis', { appellation: 'Chablis' })
    expect(loadEnvies()).toHaveLength(1)
  })
})

describe('loadEnvies', () => {
  it('rend une liste vide plutôt que de faire tomber l’app sur une donnée illisible', () => {
    localStorage.setItem('oeno-envies', '{ ceci n’est pas du JSON')
    expect(loadEnvies()).toEqual([])
  })

  it('lit les envies d’avant le correctif sans broncher', () => {
    // Ancien format : le nom seul, sans fiche. Ces envies existent chez les
    // utilisateurs installés ; les casser serait pire que le bug d'origine.
    localStorage.setItem('oeno-envies', JSON.stringify([{ id: 'e1', appellation: 'Chablis', addedAt: 1 }]))
    const [envie] = loadEnvies()
    expect(envie.appellation).toBe('Chablis')
    expect(envie.vin).toBeUndefined()
  })
})

describe('removeEnvie', () => {
  // Ce test a trouvé un vrai défaut : l'identifiant valait `e${Date.now()}`,
  // si bien que deux envies ajoutées dans la même milliseconde le partageaient
  // — et en supprimer une effaçait l'autre, sans un mot.
  it('des envies ajoutées d’affilée reçoivent des identifiants distincts', () => {
    for (const nom of ['Chablis', 'Sancerre', 'Vouvray', 'Chinon']) toggleEnvie(nom)
    const ids = loadEnvies().map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('retire par identifiant, et laisse le reste intact', () => {
    toggleEnvie('Chablis')
    toggleEnvie('Sancerre')
    const cible = loadEnvies().find(e => e.appellation === 'Chablis')
    removeEnvie(cible.id)
    expect(loadEnvies().map(e => e.appellation)).toEqual(['Sancerre'])
  })
})
