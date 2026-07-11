// ═══════════════════════════════════════════════════════════════════════════
// goutsAppris — le profil qui apprend de vos dégustations.
// Croise les notes du journal (oeno-journal, 1-5) et de la cave
// (oenotheque-v2, rating /20) avec WINE_DB pour dégager les tendances
// réelles de l'utilisateur : jauges aimées, types, régions, arômes, prix.
// ═══════════════════════════════════════════════════════════════════════════

import { WINE_DB } from './wineDatabase'
import { AROME_FAMILLES, normaliser } from './aromes'

const JOURNAL_KEY = 'oeno-journal'
const CAVE_KEY = 'oenotheque-v2'

function safeParse(key) {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    const v = raw ? JSON.parse(raw) : []
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

// Retrouve le vin de WINE_DB correspondant à une entrée (journal ou cave).
function matchDbWine(name, appellation) {
  const n = normaliser(appellation || name)
  if (!n) return null
  return (
    WINE_DB.find(w => normaliser(w.appellation) === n) ||
    WINE_DB.find(w => n.includes(normaliser(w.appellation))) ||
    null
  )
}

const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Familles d'arômes évoquées par un texte (champ aromes du vin, ou nez du journal)
function famillesPourTexte(texte) {
  const t = normaliser(texte)
  if (!t) return []
  return AROME_FAMILLES.filter(f =>
    f.motsCles.some(k => new RegExp(`\\b${escapeRegex(normaliser(k))}`).test(t))
  )
}

// ── Cœur : calcule le profil appris ──────────────────────────────────────────
// Retourne null si moins de 3 dégustations notées (pas assez de signal).
export function computeProfilAppris() {
  const journal = safeParse(JOURNAL_KEY)
  const cave = safeParse(CAVE_KEY)

  // Dégustations notées : journal (note 1-5) + cave (rating /20 → /5)
  const notees = []
  journal.forEach(e => {
    if (!e || !e.note) return
    notees.push({ name: e.name, appellation: e.name, note: e.note, nez: e.nez || '' })
  })
  cave.forEach(w => {
    if (!w || !w.rating) return
    notees.push({ name: w.name, appellation: w.appellation, note: w.rating / 4, nez: '' })
  })

  if (notees.length < 3) return null

  const aimes = []   // note >= 4
  const boudes = []  // note <= 2
  const famillesCount = {}
  const typesCount = {}
  const regionsCount = {}
  const prix = []
  const jaugesSum = { puissance: 0, douceur: 0, tanins: 0 }
  let jaugesWeight = 0

  notees.forEach(d => {
    const vin = matchDbWine(d.name, d.appellation)
    const bien = d.note >= 4
    const mal = d.note <= 2
    if (bien) aimes.push(d)
    if (mal) boudes.push(d)

    // Familles d'arômes aimées : depuis le nez décrit + le profil du vin
    if (bien) {
      const textes = [d.nez, vin?.aromes].filter(Boolean)
      const vues = new Set()
      textes.forEach(t => famillesPourTexte(t).forEach(f => {
        if (vues.has(f.id)) return
        vues.add(f.id)
        famillesCount[f.id] = (famillesCount[f.id] || 0) + 1
      }))
    }

    if (!vin) return
    if (bien) {
      typesCount[vin.type] = (typesCount[vin.type] || 0) + 1
      regionsCount[vin.region] = (regionsCount[vin.region] || 0) + 1
      if (vin.prixMoyen) prix.push(vin.prixMoyen)
    }
    // Moyenne pondérée des jauges : les vins aimés pèsent positivement,
    // les vins boudés tirent la moyenne à l'opposé (poids note-3).
    const w = d.note - 3
    if (w > 0) {
      jaugesSum.puissance += vin.jauges.puissance * w
      jaugesSum.douceur += vin.jauges.douceur * w
      jaugesSum.tanins += vin.jauges.tanins * w
      jaugesWeight += w
    }
  })

  if (!aimes.length) return null

  const jauges = jaugesWeight > 0
    ? {
        puissance: +(jaugesSum.puissance / jaugesWeight).toFixed(1),
        douceur: +(jaugesSum.douceur / jaugesWeight).toFixed(1),
        tanins: +(jaugesSum.tanins / jaugesWeight).toFixed(1),
      }
    : null

  const typesPreferes = Object.entries(typesCount).sort((a, b) => b[1] - a[1]).map(([t]) => t)
  const regionsFavorites = Object.entries(regionsCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([r]) => r)
  const famillesAromes = Object.entries(famillesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => AROME_FAMILLES.find(f => f.id === id))
    .filter(Boolean)

  const prixProfil = prix.length
    ? {
        min: Math.min(...prix),
        max: Math.max(...prix),
        moyen: Math.round(prix.reduce((s, p) => s + p, 0) / prix.length),
      }
    : null

  // Types boudés (notés <=2 et jamais aimés)
  const typesBoudes = [...new Set(
    boudes.map(d => matchDbWine(d.name, d.appellation)?.type).filter(t => t && !typesCount[t])
  )]

  return {
    nbDegustations: notees.length,
    nbAimes: aimes.length,
    jauges,
    typesPreferes,
    typesBoudes,
    regionsFavorites,
    famillesAromes,
    prix: prixProfil,
  }
}

// ── Bonus de scoring : pondération douce (~30 %) sur un vin candidat ─────────
// À AJOUTER au score existant d'un quiz — n'écrase jamais les réponses.
export function bonusProfilAppris(wine, profil, poids = 1) {
  if (!profil) return 0
  let b = 0
  if (profil.jauges) {
    // Proximité des jauges aimées : 0 (loin) à +3 (identiques)
    const d =
      Math.abs(wine.jauges.puissance - profil.jauges.puissance) +
      Math.abs(wine.jauges.douceur - profil.jauges.douceur) +
      Math.abs(wine.jauges.tanins - profil.jauges.tanins)
    b += Math.max(0, 3 - d * 0.5)
  }
  if (profil.typesPreferes[0] === wine.type) b += 1.5
  else if (profil.typesPreferes.includes(wine.type)) b += 0.8
  if (profil.typesBoudes.includes(wine.type)) b -= 2
  if (profil.regionsFavorites.includes(wine.region)) b += 1
  if (profil.famillesAromes.length) {
    const fams = famillesPourTexte(wine.aromes)
    if (fams.some(f => profil.famillesAromes.some(pf => pf.id === f.id))) b += 1
  }
  if (profil.prix && wine.prixMoyen >= profil.prix.min * 0.5 && wine.prixMoyen <= profil.prix.max * 1.5) b += 0.5
  return b * poids
}

// Résumé compact pour le contexte système de l'assistant.
export function profilApprisPourAssistant() {
  const p = computeProfilAppris()
  if (!p) return null
  const noms = { red: 'rouge', white: 'blanc', 'rosé': 'rosé', sweet: 'liquoreux', sparkling: 'effervescent' }
  return {
    degustationsNotees: p.nbDegustations,
    jaugesAimees: p.jauges,
    typesPreferes: p.typesPreferes.map(t => noms[t] || t),
    typesMoinsAimes: p.typesBoudes.map(t => noms[t] || t),
    regionsFavorites: p.regionsFavorites,
    famillesAromesAimees: p.famillesAromes.map(f => f.label),
    fourchettePrixReelle: p.prix ? `${p.prix.min}-${p.prix.max}€ (moyenne ${p.prix.moyen}€)` : null,
  }
}
