import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { askIA } from '../lib/askIA'

// ═══════════════════════════════════════════════════════════════════════════
// La chaîne de repli de l'IA — Groq, puis Gemini, puis Claude.
//
// Zone longtemps sans filet, alors qu'elle porte le principe central d'Œno :
// **sans clé, l'application continue de marcher**. Un bug ici ne se voit pas
// à l'écran, il se voit chez quelqu'un dont la clé Groq est en quota et qui
// n'obtient plus rien du tout au lieu de basculer sur Gemini.
//
// Tout se joue sur `fetch` : on le remplace par un standard téléphonique qui
// note qui a été appelé et répond ce qu'on lui dit de répondre.
// ═══════════════════════════════════════════════════════════════════════════

let appels

/** @param reponses  { '/api/groq': {status, body}, … } — absent = injoignable. */
function brancher(reponses) {
  appels = []
  global.fetch = vi.fn(async (url, init) => {
    appels.push({ url, corps: JSON.parse(init.body) })
    const r = reponses[url]
    if (!r) throw new Error('réseau injoignable')
    return {
      ok: r.status === undefined ? true : r.status < 400,
      json: async () => r.body,
    }
  })
}

const REPONSE = { content: [{ type: 'text', text: 'Un Chablis.' }] }
const SANS_CLE = { status: 500, body: { error: 'missing_api_key' } }
const QUOTA = { status: 429, body: { error: 'rate limit exceeded' } }

const urls = () => appels.map(a => a.url)
const question = { messages: [{ role: 'user', content: 'Que boire ?' }] }

beforeEach(() => { appels = [] })
afterEach(() => { vi.restoreAllMocks() })

describe('quand un fournisseur répond', () => {
  it('s’arrête au premier qui répond, sans déranger les suivants', async () => {
    brancher({ '/api/groq': { body: REPONSE } })
    const r = await askIA(question)
    expect(r.ok).toBe(true)
    expect(urls()).toEqual(['/api/groq'])
  })

  it('passe au suivant quand la clé manque', async () => {
    brancher({ '/api/groq': SANS_CLE, '/api/gemini': { body: REPONSE } })
    const r = await askIA(question)
    expect(r.ok).toBe(true)
    expect(urls()).toEqual(['/api/groq', '/api/gemini'])
  })

  it('va jusqu’à Claude si les deux premiers manquent', async () => {
    brancher({ '/api/groq': SANS_CLE, '/api/gemini': SANS_CLE, '/api/claude': { body: REPONSE } })
    expect((await askIA(question)).ok).toBe(true)
    expect(urls()).toEqual(['/api/groq', '/api/gemini', '/api/claude'])
  })

  it('survit à une coupure réseau au milieu de la chaîne', async () => {
    // Groq injoignable : une exception ne doit pas emporter la chaîne entière.
    brancher({ '/api/gemini': { body: REPONSE } })
    expect((await askIA(question)).ok).toBe(true)
  })
})

describe('quand personne ne répond', () => {
  it('rend la main proprement pour que l’écran affiche son repli local', async () => {
    brancher({ '/api/groq': SANS_CLE, '/api/gemini': SANS_CLE, '/api/claude': SANS_CLE })
    const r = await askIA(question)
    expect(r.ok).toBe(false)
    // C'est ce que teste l'appelant pour basculer en mode hors-ligne soigné.
  })

  it('ne jette jamais, même sans réseau du tout', async () => {
    brancher({})
    const r = await askIA(question)
    expect(r.ok).toBe(false)
    expect(r.data.error).toBe('all_failed')
  })

  it('distingue un quota dépassé d’une vraie indisponibilité', async () => {
    // La nuance porte à l'écran : « patientez une minute » plutôt que
    // « Œno est hors ligne ». Confondre les deux fait croire à une panne.
    brancher({ '/api/groq': QUOTA, '/api/gemini': SANS_CLE, '/api/claude': SANS_CLE })
    const r = await askIA(question)
    expect(r.ok).toBe(false)
    expect(r.data.error).toBe('rate_limited')
  })
})

describe('les précautions propres à Groq', () => {
  it('saute Groq quand le prompt dépasse son palier gratuit', async () => {
    brancher({ '/api/groq': { body: REPONSE }, '/api/gemini': { body: REPONSE } })
    await askIA({ ...question, system: 'x'.repeat(25000) })
    expect(urls()).toEqual(['/api/gemini'])
  })

  it('ne compte pas les images dans ce poids', async () => {
    // Un base64 pèse des centaines de milliers de caractères mais coûte
    // ~2000 tokens : l'exclure est ce qui laisse le scanner passer par Groq.
    brancher({ '/api/groq': { body: REPONSE } })
    await askIA({
      messages: [{ role: 'user', content: [
        { type: 'image', source: { data: 'A'.repeat(400000) } },
        { type: 'text', text: 'Quel vin ?' },
      ] }],
    })
    expect(urls()).toEqual(['/api/groq'])
  })
})

describe('la recherche web', () => {
  const avecWeb = { ...question, tools: [{ type: 'web_search_20250305', name: 'web_search' }] }

  it('interroge Tavily puis injecte ce qu’elle a trouvé dans le prompt', async () => {
    brancher({
      '/api/tavily': { body: { answer: 'Les vendanges 2025 ont été précoces.', results: [] } },
      '/api/groq': { body: REPONSE },
    })
    await askIA(avecWeb)
    expect(urls()).toEqual(['/api/tavily', '/api/groq'])
    expect(appels[1].corps.system).toContain('vendanges 2025')
  })

  it('laisse Gemini et Claude chercher eux-mêmes quand Tavily ne trouve rien', async () => {
    // Groq n'a pas de recherche native : l'envoyer sans contexte donnerait
    // une réponse d'actualité inventée.
    brancher({ '/api/tavily': { body: {} }, '/api/gemini': { body: REPONSE } })
    await askIA(avecWeb)
    expect(urls()).toEqual(['/api/tavily', '/api/gemini'])
  })

  it('cherche avec la requête courte de l’appelant, pas avec le prompt entier', async () => {
    // Le scanner envoie 1800 caractères de règles JSON comme message : les
    // passer à Tavily ne trouve rien. D'où `webQuery`.
    brancher({ '/api/tavily': { body: { answer: 'a' } }, '/api/groq': { body: REPONSE } })
    await askIA({ ...avecWeb, webQuery: 'Château Margaux 2015' })
    expect(appels[0].corps.query).toBe('Château Margaux 2015')
  })

  it('tronque la requête : au-delà de ~400 signes Tavily refuse', async () => {
    brancher({ '/api/tavily': { body: { answer: 'a' } }, '/api/groq': { body: REPONSE } })
    await askIA({ ...avecWeb, webQuery: 'z'.repeat(900) })
    expect(appels[0].corps.query.length).toBeLessThanOrEqual(380)
  })

  it('ne laisse pas fuiter webQuery vers les fournisseurs', async () => {
    brancher({ '/api/tavily': { body: { answer: 'a' } }, '/api/groq': { body: REPONSE } })
    await askIA({ ...avecWeb, webQuery: 'Chablis' })
    expect(appels[1].corps.webQuery).toBeUndefined()
  })
})
