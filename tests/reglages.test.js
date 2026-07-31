import { describe, it, expect, beforeEach } from 'vitest'
import { lireReglages, ecrireReglage, DEFAUTS } from '../lib/reglages'
import { themeEffectif } from '../lib/theme'
import { SYNC_KEYS } from '../components/CompteSync'

beforeEach(() => localStorage.clear())

describe('lireReglages', () => {
  it('sans rien d’enregistré, rend les valeurs par défaut', () => {
    expect(lireReglages()).toEqual(DEFAUTS)
  })

  it('un réglage inconnu de la version installée reprend sa valeur par défaut', () => {
    // Cas réel : l'app gagne un réglage, les appareils déjà installés ont un
    // enregistrement plus ancien. Il ne doit pas en manquer un seul.
    localStorage.setItem('oeno-reglages', JSON.stringify({ theme: 'sombre' }))
    const r = lireReglages()
    expect(r.theme).toBe('sombre')
    expect(r.taille).toBe(DEFAUTS.taille)
    expect(r.son).toBe(DEFAUTS.son)
  })

  it('une donnée illisible ne prive pas l’utilisateur de son app', () => {
    localStorage.setItem('oeno-reglages', 'nawak')
    expect(lireReglages()).toEqual(DEFAUTS)
  })
})

describe('ecrireReglage', () => {
  it('enregistre et relit', () => {
    ecrireReglage('theme', 'sombre')
    expect(lireReglages().theme).toBe('sombre')
  })

  it('ne touche pas aux autres réglages', () => {
    ecrireReglage('theme', 'sombre')
    ecrireReglage('taille', 'confort')
    const r = lireReglages()
    expect(r.theme).toBe('sombre')
    expect(r.taille).toBe('confort')
  })
})

describe('themeEffectif', () => {
  it('un choix explicite s’impose', () => {
    expect(themeEffectif('sombre')).toBe('sombre')
    expect(themeEffectif('clair')).toBe('clair')
  })

  it('« système » se résout selon la préférence du navigateur', () => {
    const dire = sombre => {
      window.matchMedia = q => ({
        matches: sombre && q.includes('dark'),
        addEventListener() {}, removeEventListener() {},
        addListener() {}, removeListener() {},
      })
    }
    dire(true)
    expect(themeEffectif('systeme')).toBe('sombre')
    dire(false)
    expect(themeEffectif('systeme')).toBe('clair')
  })
})

describe('la frontière entre les deux familles de données', () => {
  // Piège nº 2 du dépôt. Les réglages sont propres à l'appareil : une taille
  // confortable sur téléphone ne l'est pas sur grand écran, et le thème suit
  // souvent celui du système. Les synchroniser serait une régression — ce
  // test est là pour qu'elle ne passe pas inaperçue.
  it('les réglages ne sont pas synchronisés dans le cloud', () => {
    expect(Object.values(SYNC_KEYS)).not.toContain('oeno-reglages')
  })

  it('les données personnelles, elles, le sont toutes', () => {
    expect(Object.keys(SYNC_KEYS).sort())
      .toEqual(['cave', 'decouvertes', 'ecole', 'envies', 'journal', 'profil'])
  })
})
