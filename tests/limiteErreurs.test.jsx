import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import LimiteErreurs from '../components/LimiteErreurs'

// ═══════════════════════════════════════════════════════════════════════════
// Le filet sous l'application : un plantage d'affichage doit montrer l'écran
// de secours — jamais un écran noir. Un filet qu'on ne teste pas est un filet
// qu'on découvre percé le jour du plantage.
// ═══════════════════════════════════════════════════════════════════════════

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function Bombe() {
  throw new Error('boum')
}

let conteneur, root
beforeEach(() => {
  conteneur = document.createElement('div')
  document.body.appendChild(conteneur)
  root = createRoot(conteneur)
})
afterEach(() => {
  act(() => root.unmount())
  conteneur.remove()
})

describe('la limite d’erreur', () => {
  it('laisse passer l’application quand tout va bien', () => {
    act(() => root.render(<LimiteErreurs><p>ma cave</p></LimiteErreurs>))
    expect(conteneur.textContent).toContain('ma cave')
    expect(conteneur.textContent).not.toContain('trébuché')
  })

  it('montre l’écran de secours au lieu d’un écran noir', () => {
    // React répète l'erreur en console pendant le rattrapage : c'est attendu.
    const silence = vi.spyOn(console, 'error').mockImplementation(() => {})
    act(() => root.render(<LimiteErreurs><Bombe /></LimiteErreurs>))
    silence.mockRestore()

    // L'essentiel du message : rien n'est perdu, et on peut repartir.
    expect(conteneur.textContent).toContain('intacts')
    expect(conteneur.querySelector('[role="alert"]')).toBeTruthy()
    expect(conteneur.querySelector('button')?.textContent).toContain('Recharger')
  })
})
