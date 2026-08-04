import { describe, it, expect, beforeEach } from 'vitest'
import {
  DECOUVERTES_KEY, loadDecouvertes, addDecouverte, updateDecouverte, removeDecouverte,
  matchDecouverte, decouverteFromVision, decouverteToWine, getDecouvertesAsWines,
} from '../lib/decouvertes'
import { bouteilleDepuisVin } from '../lib/ajoutCave'

// ═══════════════════════════════════════════════════════════════════════════
// Les vins scannés — la bibliothèque personnelle qui s'écrit toute seule.
//
// Zone jusqu'ici sans filet, alors qu'elle **écrit des données** : chaque
// étiquette photographiée d'un vin inconnu atterrit ici, et de là dans la
// recherche globale puis dans la cave. Un dédoublonnage qui rate transforme
// dix scans de la même bouteille en dix vins ; un enrichissement web qui
// écrase l'appellation lue rend la bouteille introuvable au re-scan.
// ═══════════════════════════════════════════════════════════════════════════

const lecture = (extra = {}) => decouverteFromVision({
  appellation: 'Anjou', domaine: 'Château Essai', millesime: 2022,
  region: 'Loire', type: 'red', ...extra,
})

beforeEach(() => localStorage.clear())

describe('ce qu’on garde d’une étiquette', () => {
  it('accepte une lecture partielle sans rien inventer', () => {
    // La vision rend souvent un domaine seul, ou une appellation seule.
    const d = decouverteFromVision({ domaine: 'Château Essai' })
    expect(d.domaine).toBe('Château Essai')
    expect(d.appellation).toBe('')
    expect(d.millesime).toBeNull()
    expect(d.cepages).toEqual([])
  })

  it('ne se laisse pas troubler par un millésime illisible', () => {
    expect(decouverteFromVision({ millesime: 'MM' }).millesime).toBeNull()
    expect(decouverteFromVision({ millesime: '2019' }).millesime).toBe(2019)
  })

  it('survit à un stockage illisible plutôt que de tout perdre', () => {
    localStorage.setItem(DECOUVERTES_KEY, '{ ceci nest pas du json')
    expect(loadDecouvertes()).toEqual([])
    localStorage.setItem(DECOUVERTES_KEY, '"une chaîne"')
    expect(loadDecouvertes()).toEqual([])
  })
})

describe('le dédoublonnage', () => {
  it('reconnaît la même bouteille rescannée', () => {
    const a = addDecouverte(lecture())
    const b = addDecouverte(lecture())
    expect(b.id).toBe(a.id)
    expect(loadDecouvertes()).toHaveLength(1)
  })

  it('distingue deux millésimes du même vin', () => {
    addDecouverte(lecture())
    addDecouverte(lecture({ millesime: 2023 }))
    expect(loadDecouvertes()).toHaveLength(2)
  })

  it('ignore casse et accents', () => {
    addDecouverte(lecture())
    expect(matchDecouverte(loadDecouvertes(), {
      appellation: 'ANJOU', domaine: 'chateau essai', millesime: 2022,
    })).not.toBeNull()
  })

  it('retrouve la bouteille même après correction par le web', () => {
    // Le cœur du sujet : la recherche web corrige « Anjou » en « Anjou
    // Villages ». Le scan suivant relit l'étiquette telle quelle et doit
    // retomber sur l'enregistrement corrigé, pas en créer un second.
    const d = addDecouverte(lecture())
    updateDecouverte(d.id, { appellation: 'Anjou Villages', appellationLue: 'Anjou', verifie: true })
    addDecouverte(lecture())
    expect(loadDecouvertes()).toHaveLength(1)
    expect(loadDecouvertes()[0].appellation).toBe('Anjou Villages')
  })

  it('ne rapproche pas deux vins dont on ne sait rien', () => {
    expect(matchDecouverte([lecture()], {})).toBeNull()
  })
})

describe('la vie d’une découverte', () => {
  it('se met à jour sans toucher aux autres', () => {
    const a = addDecouverte(lecture())
    addDecouverte(lecture({ appellation: 'Chinon' }))
    updateDecouverte(a.id, { histoire: 'Un domaine familial.' })
    const list = loadDecouvertes()
    expect(list.find(x => x.id === a.id).histoire).toBe('Un domaine familial.')
    expect(list.find(x => x.id !== a.id).histoire).toBe('')
  })

  it('se supprime sans emporter les voisines', () => {
    const a = addDecouverte(lecture())
    addDecouverte(lecture({ appellation: 'Chinon' }))
    expect(removeDecouverte(a.id)).toHaveLength(1)
    expect(loadDecouvertes()).toHaveLength(1)
  })
})

describe('un vin scanné devient un vin d’Œno', () => {
  it('se range dans la recherche globale comme les autres', () => {
    addDecouverte(lecture())
    const [vin] = getDecouvertesAsWines()
    expect(vin.appellation).toBe('Anjou')
    expect(vin.region).toBe('Loire')
    expect(vin.decouverte).toBe(true)
  })

  it('prend le milieu de la fourchette de prix comme ordre de grandeur', () => {
    const vin = decouverteToWine(lecture({ fourchettePrixHabituelle: { min: 12, max: 18 } }))
    expect(vin.prixMoyen).toBe(15)
  })

  it('reste présentable quand l’étiquette n’a presque rien donné', () => {
    const vin = decouverteToWine(decouverteFromVision({ domaine: 'Château Essai' }))
    expect(vin.appellation).toBe('Château Essai')   // à défaut d'appellation
    expect(vin.region).toBe('Autre')
    expect(vin.enUneMot).toBeTruthy()
    expect(vin.typeLabel).toBeTruthy()
  })

  it('n’invente pas de millésime, et ne le perd pas non plus', () => {
    // Une étiquette sur deux ne livre pas son millésime. La fiche affichait
    // alors « Ajouter à ma cave () » et la bouteille arrivait en cave avec un
    // millésime `undefined` — un champ qui disparaît au passage par JSON,
    // donc sans même la trace qu'on ne le connaissait pas.
    const vin = decouverteToWine(decouverteFromVision({ appellation: 'Clos Essai' }))
    expect(vin.bonsMilsimes).toEqual([])

    const bouteille = bouteilleDepuisVin(vin, undefined, { prix: 15 })
    expect(bouteille.vintage).toBeNull()
    expect(JSON.parse(JSON.stringify(bouteille))).toHaveProperty('vintage', null)
  })
})
