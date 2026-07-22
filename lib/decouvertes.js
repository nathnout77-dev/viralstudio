// ── Mes découvertes ──────────────────────────────────────────────────────────
// Bibliothèque personnelle auto-apprenante : chaque scan d'étiquette d'un vin
// inconnu (absent de WINE_DB et des découvertes existantes) est mémorisé ici,
// puis enrichi par une recherche web. Clé localStorage : 'oeno-decouvertes'.

import { normaliser } from '../data/aromes'

export const DECOUVERTES_KEY = 'oeno-decouvertes'

export function loadDecouvertes() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DECOUVERTES_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveDecouvertes(list) {
  try {
    localStorage.setItem(DECOUVERTES_KEY, JSON.stringify(list))
  } catch { /* quota / mode privé : on ignore proprement */ }
}

// Dédoublonnage : même appellation + domaine + millésime = même vin.
// `appellationLue` : lecture d'étiquette d'origine, conservée quand la
// vérification web a corrigé l'appellation — un re-scan de la même bouteille
// relit l'étiquette telle quelle et doit retrouver l'enregistrement corrigé.
export function matchDecouverte(list, ref) {
  const a = normaliser(ref?.appellation)
  const d = normaliser(ref?.domaine)
  const m = ref?.millesime ?? null
  if (!a && !d) return null
  return list.find(x =>
    (normaliser(x.appellation) === a || (x.appellationLue && normaliser(x.appellationLue) === a)) &&
    normaliser(x.domaine) === d &&
    (x.millesime ?? null) === m
  ) || null
}

// Construit une découverte à partir de la seule lecture vision (avant enrichissement).
export function decouverteFromVision(json) {
  return {
    id: `dec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    scannedAt: Date.now(),
    appellation: json?.appellation || '',
    domaine: json?.domaine || '',
    millesime: Number(json?.millesime) || null,
    region: json?.region || '',
    type: json?.type || null,
    cepages: Array.isArray(json?.cepages) ? json.cepages : [],
    aromes: '',
    description: json?.styleEtQualite || '',
    accords: Array.isArray(json?.accordsSuggeres) ? json.accordsSuggeres : [],
    fourchettePrix: json?.fourchettePrixHabituelle || null,
    styleEtQualite: json?.styleEtQualite || '',
    pourQui: json?.pourQui || '',
    confiance: json?.confiance || null,
    histoire: '',
    sourceWeb: false,
    siteWeb: null,
    verifie: false,
    appellationLue: '',
  }
}

// Ajoute une découverte (dédoublonnée) et renvoie l'enregistrement effectivement stocké.
export function addDecouverte(rec) {
  const list = loadDecouvertes()
  const existing = matchDecouverte(list, rec)
  if (existing) return existing
  const next = [rec, ...list]
  saveDecouvertes(next)
  return rec
}

// Met à jour une découverte par id (fusion), renvoie l'enregistrement fusionné.
export function updateDecouverte(id, patch) {
  const list = loadDecouvertes()
  let updated = null
  const next = list.map(x => {
    if (x.id !== id) return x
    updated = { ...x, ...patch }
    return updated
  })
  saveDecouvertes(next)
  return updated
}

export function removeDecouverte(id) {
  const next = loadDecouvertes().filter(x => x.id !== id)
  saveDecouvertes(next)
  return next
}

// Numérotation « D° 01 » pour l'affichage des découvertes.
export const decouverteNumero = (index) => `D° ${String(index + 1).padStart(2, '0')}`

// ── Découverte → vin « façon WINE_DB » ───────────────────────────────────────
// Pour que les vins scannés inconnus deviennent de vrais vins d'Œno : trouvables
// dans la recherche globale et à l'ajout en cave, au même titre que la collection.
const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }
const TYPE_COLORS = { red: '#8c2f39', white: '#c9a84c', 'rosé': '#e58f8f', sweet: '#b8860b', sparkling: '#5b8db8' }

export function decouverteToWine(dec) {
  if (!dec) return null
  const type = dec.type || 'red'
  const prix = dec.fourchettePrix && dec.fourchettePrix.min != null
    ? Math.round(((dec.fourchettePrix.min || 0) + (dec.fourchettePrix.max || dec.fourchettePrix.min || 0)) / 2)
    : null
  const enUneMot = (dec.styleEtQualite || dec.description || '').split(/[.!?]/)[0].trim().slice(0, 60)
  return {
    id: `dec-wine-${dec.id}`,
    decouverteId: dec.id,
    perso: true,
    decouverte: true,
    appellation: dec.appellation || dec.domaine || 'Vin scanné',
    domaine: dec.domaine || '',
    domaines: dec.domaine ? [{ name: dec.domaine, note: 'Vin scanné', url: dec.siteWeb || undefined }] : [],
    region: dec.region || 'Autre',
    type,
    typeLabel: TYPE_LABELS[type] || 'Rouge',
    color: TYPE_COLORS[type] || TYPE_COLORS.red,
    cepages: Array.isArray(dec.cepages) ? dec.cepages : [],
    aromes: dec.aromes || '',
    enUneMot: enUneMot || 'Votre découverte',
    pourQui: dec.pourQui || '',
    prixMoyen: prix,
    difficulte: 'explorer',
    jauges: { puissance: 3, douceur: type === 'sweet' ? 4 : 1, tanins: type === 'red' ? 3 : 1 },
    drinkFrom: 1,
    drinkUntil: 6,
    serviceTemp: type === 'white' || type === 'rosé' || type === 'sparkling' ? 10 : 16,
    carafage: null,
    bonsMilsimes: dec.millesime ? [dec.millesime] : [],
    accords: Array.isArray(dec.accords) ? dec.accords : [],
    description: dec.styleEtQualite || dec.description || '',
    histoire: dec.histoire || '',
    siteWeb: dec.siteWeb || null,
  }
}

// Toutes les découvertes converties en vins Œno (pour la recherche globale).
export function getDecouvertesAsWines() {
  return loadDecouvertes().map(decouverteToWine).filter(Boolean)
}
