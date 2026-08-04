import { describe, it, expect } from 'vitest'
import * as social from '../lib/social'
import { supabase } from '../lib/supabase'

// ═══════════════════════════════════════════════════════════════════════════
// Le social sans compte — la promesse centrale d'Œno, vérifiée.
//
// `lib/social.js` s'ouvre sur une règle de survie : « aucune de ces fonctions
// ne jette ». C'est ce qui permet à l'app de marcher sans Supabase configuré,
// sans compte et sans réseau. Une seule exception non rattrapée dans le lot,
// et l'onglet Social passe en écran noir.
//
// Le test ne choisit pas trois fonctions : il les parcourt **toutes**, y
// compris celles qui n'existent pas encore. Une fonction ajoutée demain qui
// oublierait la règle est dénoncée sans que personne ait à y penser.
// ═══════════════════════════════════════════════════════════════════════════

// Un argument plausible pour chaque forme attendue — l'idée est d'appeler,
// pas de simuler un vrai échange.
const ARGUMENTS = {
  definirPseudo: ['Camille'],
  demanderAmi: ['ABC123'],
  accepterAmi: ['id-amitie'],
  retirerAmi: ['id-amitie'],
  envoyerMessage: ['id-ami', 'Bonjour'],
  marquerLus: ['id-ami'],
  ecouterSession: [() => {}],
  ecouterMessages: [() => {}],
  monPseudo: ['id-utilisateur'],
  lireFil: ['id-ami'],
  messagesNonLus: ['id-moi'],
  avatarsDesAmis: [['id-ami']],
  caveDeLAmi: ['id-ami'],
  caveParCode: ['ABC1234'],
}

const exportes = Object.entries(social).filter(([, v]) => typeof v === 'function')

describe('sans Supabase configuré', () => {
  it('l’environnement de test est bien celui d’un utilisateur sans compte', () => {
    expect(supabase).toBeNull()
  })

  it('expose bien des fonctions à éprouver', () => {
    expect(exportes.length).toBeGreaterThan(5)
  })

  for (const [nom, fn] of exportes) {
    it(`\`${nom}\` rend la main au lieu de jeter`, async () => {
      const args = ARGUMENTS[nom] || []
      let resultat
      // Le contrat porte aussi bien sur l'appel que sur la promesse : une
      // fonction qui ne jette pas mais dont la promesse est rejetée casse
      // l'écran tout autant.
      await expect((async () => { resultat = await fn(...args) })()).resolves.toBeUndefined()

      // Et la forme rendue doit rester exploitable : `undefined` obligerait
      // chaque appelant à se protéger, ce qu'aucun ne fait.
      if (resultat && typeof resultat === 'object') {
        expect(resultat).not.toBeInstanceOf(Error)
      }
    })
  }
})

describe('ce que le social rend quand il ne peut rien faire', () => {
  it('annonce l’absence de cloud plutôt que de faire semblant', async () => {
    const r = await social.mesAmis()
    expect(r.ok).toBe(false)
    expect(r.horsLigne).toBe(true)
    // Trois listes vides mais bien présentes : l'écran les parcourt sans se
    // protéger, et `undefined` le ferait tomber.
    expect(r.amis).toEqual([])
    expect(r.demandes).toEqual([])
    expect(r.envoyees).toEqual([])
  })

  it('n’invente pas d’utilisateur courant', async () => {
    expect(await social.utilisateurCourant()).toBeNull()
  })

  it('rend un désabonnement appelable même sans abonnement', () => {
    // L'écran appelle ce retour dans son nettoyage : s'il n'est pas une
    // fonction, démonter l'onglet Social jette.
    const stop = social.ecouterSession(() => {})
    expect(typeof stop).toBe('function')
    expect(() => stop()).not.toThrow()
  })
})
