import {
  APPELLATIONS_FR, APPELLATIONS_DETAIL, CEPAGES_FR, DOMAINES_FR,
  CLASSEMENTS_BORDEAUX, CRUS_FR, MILLESIMES_FR,
} from '../data/referentielFrance'

// ═══════════════════════════════════════════════════════════════════════════
// quizReferentiel — questions tirées au sort dans la base viticole nationale.
//
// Contrairement aux leçons (questions écrites à la main), ce quiz se renouvelle
// à chaque partie : 1248 fiches réelles, donc des milliers de questions
// possibles. Même format que les leçons : { q, options, bonne, explication }.
// ═══════════════════════════════════════════════════════════════════════════

const melange = (arr) => [...arr].sort(() => Math.random() - 0.5)
const piocher = (arr, n) => melange(arr).slice(0, n)
const auHasard = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Construit une question à 3 options : la bonne + 2 leurres distincts.
function question(q, bonneValeur, leurres, explication) {
  const distincts = [...new Set(leurres.filter(x => x && x !== bonneValeur))]
  if (distincts.length < 2) return null
  const options = melange([bonneValeur, ...piocher(distincts, 2)])
  return { q, options, bonne: options.indexOf(bonneValeur), explication }
}

// ── Générateurs, un par type de connaissance ────────────────────────────────

// « Dans quelle région se trouve l'appellation X ? »
function qRegion() {
  const a = auHasard(APPELLATIONS_FR.filter(x => x.type === 'AOC' && x.region))
  const autres = APPELLATIONS_FR.map(x => x.region)
  return question(
    `Dans quelle région se trouve l'appellation « ${a.nom} » ?`,
    a.region, autres,
    `${a.nom} est une ${a.type} de ${a.region}${a.sousRegion ? ` (${a.sousRegion})` : ''}.`
  )
}

// « Quel cépage domine à X ? »
function qCepage() {
  const d = auHasard(APPELLATIONS_DETAIL.filter(x => x.cepages?.length))
  const bon = d.cepages[0]
  const autres = CEPAGES_FR.map(c => c.nom)
  return question(
    `Quel cépage domine à ${d.nom} ?`,
    bon, autres,
    `${d.nom} (${d.region}) repose principalement sur ${d.cepages.join(', ')}.`
  )
}

// « Quel arôme est typique du cépage X ? »
function qArome() {
  const c = auHasard(CEPAGES_FR.filter(x => x.aromes?.length >= 2))
  const bon = auHasard(c.aromes)
  const autres = CEPAGES_FR.flatMap(x => x.aromes || []).filter(a => !c.aromes.includes(a))
  return question(
    `Quel arôme est typique du ${c.nom} ?`,
    bon, autres,
    `Le ${c.nom} développe des notes de ${c.aromes.slice(0, 4).join(', ')}.`
  )
}

// « À quelle appellation appartient le château X ? »
function qDomaine() {
  const d = auHasard(DOMAINES_FR.filter(x => x.appellation))
  const autres = DOMAINES_FR.map(x => x.appellation)
  return question(
    `De quelle appellation vient « ${d.nom} » ?`,
    d.appellation, autres,
    `${d.nom} produit en ${d.appellation} (${d.region})${d.statut ? ` — ${d.statut}` : ''}.`
  )
}

// « Quel est le rang de ce cru classé ? »
function qClassement() {
  const c = auHasard(CLASSEMENTS_BORDEAUX.filter(x => x.rang))
  const autres = CLASSEMENTS_BORDEAUX.map(x => x.rang)
  return question(
    `Quel est le rang de ${c.chateau} ?`,
    c.rang, autres,
    `${c.chateau} (${c.appellation}) est ${c.rang} au ${c.classement}.`
  )
}

// « Sur quelle commune se trouve ce grand cru ? »
function qCru() {
  const c = auHasard(CRUS_FR.filter(x => x.commune && x.zone))
  const autres = CRUS_FR.map(x => x.commune)
  return question(
    `Où se situe le cru « ${c.nom} » ?`,
    c.commune, autres,
    `${c.nom} se trouve à ${c.commune}${c.zone ? ` (${c.zone})` : ''}${c.sol ? `, sur un sol ${c.sol.toLowerCase()}` : ''}.`
  )
}

// « Quelle note ce millésime a-t-il obtenue ? »
function qMillesime() {
  const m = auHasard(MILLESIMES_FR)
  const autres = MILLESIMES_FR.map(x => `${x.note}/20`)
  return question(
    `Quelle note pour le millésime ${m.annee} en ${m.region} ?`,
    `${m.note}/20`, autres,
    `${m.annee} en ${m.region} : ${m.note}/20 — ${m.style}${m.apogee ? `, apogée ${m.apogee}` : ''}.`
  )
}

// « Quelle température de service pour ce cépage ? »
function qService() {
  const c = auHasard(CEPAGES_FR.filter(x => x.tempService))
  const autres = CEPAGES_FR.map(x => x.tempService)
  return question(
    `À quelle température servir un vin de ${c.nom} ?`,
    c.tempService, autres,
    `Le ${c.nom} s'apprécie à ${c.tempService}${c.garde ? `, avec un potentiel de garde de ${c.garde}` : ''}.`
  )
}

const GENERATEURS = [qRegion, qCepage, qArome, qDomaine, qClassement, qCru, qMillesime, qService]

// Tire `n` questions variées, sans doublon d'énoncé.
export function genererQuiz(n = 8) {
  const out = []
  const vus = new Set()
  // Plafond d'essais : certains tirages peuvent échouer (leurres insuffisants)
  for (let essais = 0; essais < n * 25 && out.length < n; essais++) {
    const g = GENERATEURS[essais % GENERATEURS.length]
    let q = null
    try { q = g() } catch { q = null }
    if (!q || vus.has(q.q)) continue
    vus.add(q.q)
    out.push(q)
  }
  return melange(out)
}

export default genererQuiz
