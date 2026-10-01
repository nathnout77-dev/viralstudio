import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { autoriser, _oublier, _limites } from '../lib/serveur/garde'

// ═══════════════════════════════════════════════════════════════════════════
// La garde des routes IA. Sans elle, une fois Œno publiée, n'importe quel
// script du web aurait pu se servir des clés d'Œno comme d'une IA gratuite.
// ═══════════════════════════════════════════════════════════════════════════

function requete(entetes = {}) {
  return { headers: { host: 'oeno.app', 'x-forwarded-proto': 'https', 'x-forwarded-for': '1.2.3.4', ...entetes } }
}
function reponse() {
  const r = { code: null, corps: null, entetes: {} }
  r.status = c => { r.code = c; return r }
  r.json = j => { r.corps = j; return r }
  r.setHeader = (k, v) => { r.entetes[k] = v }
  return r
}

beforeEach(() => _oublier())
afterEach(() => { delete process.env.ORIGINES_AUTORISEES })

describe('la garde des routes IA', () => {
  it('laisse passer une page d’Œno', () => {
    const res = reponse()
    expect(autoriser(requete({ origin: 'https://oeno.app' }), res)).toBe(true)
    expect(res.code).toBeNull()
  })

  it('reconnaît aussi Œno par le Referer quand Origin manque', () => {
    expect(autoriser(requete({ referer: 'https://oeno.app/connexion' }), reponse())).toBe(true)
  })

  it('refuse un site étranger', () => {
    const res = reponse()
    expect(autoriser(requete({ origin: 'https://ailleurs.example' }), res)).toBe(false)
    expect(res.code).toBe(403)
  })

  it('refuse un appel sans aucune origine (script, curl)', () => {
    const res = reponse()
    expect(autoriser(requete(), res)).toBe(false)
    expect(res.code).toBe(403)
  })

  it('admet les origines déclarées en plus de l’hôte', () => {
    process.env.ORIGINES_AUTORISEES = 'https://www.oeno.app, https://oeno.vercel.app/'
    expect(autoriser(requete({ origin: 'https://oeno.vercel.app' }), reponse())).toBe(true)
  })

  it('freine une rafale, sans gêner un usage humain', () => {
    const r = () => requete({ origin: 'https://oeno.app' })
    const t = 1_000_000
    for (let i = 0; i < _limites.APPELS_MAX; i++) expect(autoriser(r(), reponse(), t)).toBe(true)
    const res = reponse()
    expect(autoriser(r(), res, t)).toBe(false)
    // Le mot que le client sait déjà afficher (« reprendre mon souffle »).
    expect(res.code).toBe(429)
    expect(res.corps.error).toBe('rate_limited')
    // Et la fenêtre suivante repart de zéro.
    expect(autoriser(r(), reponse(), t + _limites.FENETRE_MS + 1)).toBe(true)
  })

  it('compte chaque adresse à part', () => {
    const t = 5
    for (let i = 0; i < _limites.APPELS_MAX; i++) autoriser(requete({ origin: 'https://oeno.app' }), reponse(), t)
    const autre = requete({ origin: 'https://oeno.app', 'x-forwarded-for': '9.9.9.9' })
    expect(autoriser(autre, reponse(), t)).toBe(true)
  })
})
