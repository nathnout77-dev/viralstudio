import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { FournisseurCave } from '../lib/cave'
import { FicheVin } from '../components/BibliothequeView'
import { WINE_DB } from '../data/wineDatabase'

// ═══════════════════════════════════════════════════════════════════════════
// Ce que la fiche d'un vin doit toujours proposer.
//
// Pourquoi ici et pas dans un parcours navigateur : la fiche s'ouvre depuis
// dix-huit endroits, mais la plupart sont au bout d'un questionnaire (« ce
// soir ? » pose trois questions, les accords deux, le sommelier remplit un
// formulaire). Dix-huit navigations testeraient surtout ces questionnaires,
// se casseraient à la première retouche de libellé, et laisseraient quand
// même passer le dix-neuvième écran.
//
// Ce qu'on veut protéger est plus simple et se dit en une phrase : **la fiche
// tient ses actions de son contexte, pas de qui l'ouvre**. Le vérifier ici
// couvre les dix-huit chemins d'un coup, et tous ceux à venir.
//
// L'autre moitié compte autant : hors application, pas de bouton du tout.
// Un bouton présent mais sans effet serait pire que son absence.
// ═══════════════════════════════════════════════════════════════════════════

// Sans ce drapeau, React prévient à chaque rendu que act() n'est pas gréé.
globalThis.IS_REACT_ACT_ENVIRONMENT = true

const VIN = WINE_DB[0]
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

/** Rend la fiche telle qu'un écran l'ouvrirait, et rend son texte. */
function ouvrirFiche(capacites) {
  act(() => {
    root.render(
      capacites
        ? <FournisseurCave value={capacites}><FicheVin wine={VIN} onClose={() => {}} /></FournisseurCave>
        : <FicheVin wine={VIN} onClose={() => {}} />,
    )
  })
  return [...conteneur.querySelectorAll('button')].map(b => b.textContent)
}

const contient = (boutons, motif) => boutons.some(t => motif.test(t))

describe('les actions d’une fiche de vin', () => {
  it('sont là sans que l’écran appelant ait rien câblé', () => {
    // Le cas des onze écrans muets : les envies, les accords, la roue des
    // arômes… ouvrent la fiche sans lui passer la moindre fonction.
    const boutons = ouvrirFiche({ ranger: () => {}, noter: () => {} })
    expect(contient(boutons, /Ajouter à ma cave/)).toBe(true)
    expect(contient(boutons, /Noter cette dégustation/)).toBe(true)
  })

  it('disparaissent hors de l’application plutôt que de ne rien faire', () => {
    const boutons = ouvrirFiche(null)
    expect(contient(boutons, /Ajouter à ma cave/)).toBe(false)
    expect(contient(boutons, /Noter cette dégustation/)).toBe(false)
  })

  it('suivent chacune la capacité réellement offerte', () => {
    // Une application qui saurait ranger mais pas encore noter ne doit pas
    // afficher un bouton « Noter » inerte.
    const sansNote = ouvrirFiche({ ranger: () => {} })
    expect(contient(sansNote, /Ajouter à ma cave/)).toBe(true)
    expect(contient(sansNote, /Noter cette dégustation/)).toBe(false)
  })

  it('laissent l’écran appelant l’emporter quand il en fournit une', () => {
    // C'est ce que font les écrans qui marquent la provenance (le scan, les
    // petits prix, le comparateur) : leur fonction doit primer sur l'ambiante.
    let choisi = null
    const boutons = ouvrirFiche({ ranger: () => { choisi = 'ambiant' }, noter: () => {} })
    expect(contient(boutons, /Ajouter à ma cave/)).toBe(true)
    expect(choisi).toBeNull()
  })
})
