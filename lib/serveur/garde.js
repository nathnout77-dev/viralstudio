// ═══════════════════════════════════════════════════════════════════════════
// La garde des routes IA.
//
// Ces routes relaient vers Anthropic, Groq, Gemini et Tavily avec les clés
// d'Œno. Tant que l'app restait confidentielle, n'importe quel appel était
// accepté — et une fois publiée sur le Play Store, n'importe qui aurait pu
// s'en servir comme d'une IA gratuite, aux frais de la clé.
//
// Deux barrières, volontairement simples :
//   1. l'origine : l'appel doit venir d'une page d'Œno (en-tête Origin ou
//      Referer). Un script ailleurs sur le web est refusé.
//   2. le débit : quelques dizaines d'appels par adresse IP et par fenêtre
//      de dix minutes, de quoi ne jamais gêner un humain.
//
// Portée honnête : un en-tête se forge depuis un serveur, et la mémoire du
// compteur ne survit pas à une instance serverless qui redémarre. Ce n'est
// pas un mur ; c'est ce qui sépare l'abus occasionnel de l'usage normal. Un
// vrai quota par compte demanderait une base, et la plupart des usagers
// d'Œno n'ont pas de compte — par principe (le local d'abord).
//
// Sans ORIGINES_AUTORISEES, seule l'origine de l'hôte lui-même est admise :
// le développement local et un premier déploiement marchent sans réglage.
// ═══════════════════════════════════════════════════════════════════════════

const FENETRE_MS = 10 * 60 * 1000
const APPELS_MAX = 40

const compteurs = new Map() // ip → { debut, n }

function originesAdmises(req) {
  const liste = (process.env.ORIGINES_AUTORISEES || '')
    .split(',').map(s => s.trim().replace(/\/$/, '')).filter(Boolean)
  const hote = req.headers['x-forwarded-host'] || req.headers.host
  const proto = req.headers['x-forwarded-proto'] || (String(hote).startsWith('localhost') ? 'http' : 'https')
  if (hote) liste.push(`${proto}://${hote}`)
  return liste
}

function origineDe(req) {
  const o = req.headers.origin
  if (o) return o.replace(/\/$/, '')
  try { return new URL(req.headers.referer).origin } catch { return null }
}

function ipDe(req) {
  const f = String(req.headers['x-forwarded-for'] || '')
  return f.split(',')[0].trim() || req.socket?.remoteAddress || 'inconnue'
}

/**
 * Rend `true` si l'appel peut passer ; sinon répond lui-même (403 / 429)
 * et rend `false`. S'appelle en tête de route : `if (!autoriser(req, res)) return`.
 */
export function autoriser(req, res, maintenant = Date.now()) {
  const origine = origineDe(req)
  if (!origine || !originesAdmises(req).includes(origine)) {
    res.status(403).json({ error: 'origine_refusee' })
    return false
  }

  const ip = ipDe(req)
  let c = compteurs.get(ip)
  if (!c || maintenant - c.debut > FENETRE_MS) {
    c = { debut: maintenant, n: 0 }
    compteurs.set(ip, c)
  }
  c.n += 1
  if (c.n > APPELS_MAX) {
    // Même mot que les fournisseurs : le client affiche déjà son message
    // « reprendre mon souffle » sur `rate_limited`.
    res.setHeader('Retry-After', String(Math.ceil((c.debut + FENETRE_MS - maintenant) / 1000)))
    res.status(429).json({ error: 'rate_limited' })
    return false
  }
  // Ménage : la carte ne doit pas grossir sans fin sur une instance longue.
  if (compteurs.size > 5000) {
    for (const [k, v] of compteurs) if (maintenant - v.debut > FENETRE_MS) compteurs.delete(k)
  }
  return true
}

/** Pour les tests uniquement : repartir d'une mémoire vide. */
export function _oublier() { compteurs.clear() }

export const _limites = { FENETRE_MS, APPELS_MAX }
