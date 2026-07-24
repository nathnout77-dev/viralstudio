import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { X, Camera, Image as ImageIcon, RefreshCw, Sparkles, Plus, Check, MapPin, BookOpen, Tag, Pencil, UtensilsCrossed, Heart, Globe, Library, Zap, ZapOff, ShoppingCart, Share2, ChevronRight } from 'lucide-react'
import { WINE_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import { regionInfo } from '../data/regionsInfo'
import { normaliser } from '../data/aromes'
import JaugesGout from './JaugesGout'
import WineVisuel from './WineVisuel'
import { FicheVin } from './BibliothequeView'
import { toggleEnvie, useEnvies } from './Envies'
import useModalBehavior from '../lib/useModal'
import { loadDecouvertes, matchDecouverte, decouverteFromVision, addDecouverte, updateDecouverte, decouverteToWine } from '../lib/decouvertes'
import { askIA } from '../lib/askIA'
import { cepagesOfficiels } from '../data/appellationsCepages'
import { supabase } from '../lib/supabase'
import { logAchat } from '../lib/achats'
import { partagerVin } from '../lib/partage'
import BadgeGrandPublic from './BadgeGrandPublic'

const DegustationSimulateur = dynamic(() => import('./DegustationSimulateur'), { ssr: false })

// ═══════════════════════════════════════════════════════════════════════════
// ScanEtiquette — photographiez une étiquette, Œno la décode.
// idle → preview → analyse (Claude vision via /api/claude) → résultat / erreur.
// Si l'appellation est dans WINE_DB : fiche simplifiée + fiche complète.
// Sinon : fiche générique construite depuis la lecture, ton simple et rassurant.
// ═══════════════════════════════════════════════════════════════════════════

const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux', sparkling: 'Effervescent' }

// Cépages expliqués simplement (une phrase, ton Œno)
const CEPAGES_SIMPLE = {
  'pinot noir': 'délicat — cerise, sous-bois',
  'cabernet sauvignon': 'puissant — cassis, belle structure',
  'cabernet franc': 'frais — framboise, poivron',
  'merlot': 'rond et velouté — fruits mûrs',
  'syrah': 'épicé — poivre, fruits noirs',
  'grenache': 'chaleureux et gourmand',
  'mourvedre': 'sombre et sauvage, fait pour la garde',
  'gamay': 'léger et croquant — fruits rouges',
  'malbec': 'dense — violette, mûre',
  'tannat': 'costaud, taillé pour la garde',
  'nebbiolo': 'tanins fins — rose, goudron',
  'sangiovese': 'cerise acidulée, très italien',
  'tempranillo': "l'âme de l'Espagne — cuir, fruits noirs",
  'chardonnay': 'blanc caméléon — du beurré au minéral',
  'sauvignon blanc': 'vif — agrumes, buis',
  'riesling': 'tendu — citron, minéralité',
  'chenin': 'du sec au moelleux — pomme, miel',
  'viognier': 'opulent — abricot, fleurs',
  'semillon': 'gras et miellé',
  'gewurztraminer': 'exubérant — litchi, rose',
  'pinot gris': 'riche et légèrement fumé',
  'carignan': 'vieilles vignes — garrigue',
  'cinsault': 'souple et frais',
}
const noteCepage = c => CEPAGES_SIMPLE[normaliser(c)] || null

const SYSTEM_PROMPT = `Tu es un sommelier expert qui lit des étiquettes de vin françaises et internationales, pour aider quelqu'un à évaluer une bouteille EN RAYON, en magasin, avant de l'acheter.
On te montre la photo d'une étiquette de bouteille. Réponds STRICTEMENT avec un objet JSON valide, sans aucun texte autour, sans balises markdown :
{"appellation": string|null, "region": string|null, "cepages": string[], "type": "red"|"white"|"rosé"|"sweet"|null, "millesime": number|null, "domaine": string|null, "confiance": "haute"|"moyenne"|"basse", "styleEtQualite": string, "pourQui": string, "accordsSuggeres": string[], "fourchettePrixHabituelle": {"min": number, "max": number}}
Règles :
- "appellation" : l'appellation d'origine (ex. "Gevrey-Chambertin", "Chianti Classico"), pas le nom de cuvée.
- "region" : la région viticole, si possible parmi "Bordeaux", "Bourgogne", "Rhône Nord", "Rhône Sud", "Loire", "Alsace", "Beaujolais", "Provence", "Languedoc", "Roussillon", "Sud-Ouest", "Jura", "Savoie", "Corse", "Champagne", "Italie", "Espagne", "Portugal".
- "cepages" : les cépages probables, même s'ils ne figurent pas sur l'étiquette — déduis-les de l'appellation en respectant STRICTEMENT son cahier des charges (ex. un Anjou blanc = Chenin blanc, un Cahors = Malbec ; JAMAIS un cépage étranger à l'appellation).
- "type" : la couleur du vin ("red", "white", "rosé", ou "sweet" pour un liquoreux).
- "confiance" : ton niveau de certitude global sur la lecture.
- "styleEtQualite" : 2 à 3 phrases, ton simple et sans jargon, décrivant le style et les qualités attendues de ce type de vin (ex. structure, texture, ce qui le caractérise). Comme un ami connaisseur qui te dit honnêtement à quoi t'attendre.
- "pourQui" : une courte phrase disant à qui ce vin va plaire (ex. "Idéal si vous aimez les rouges souples et fruités, à boire sans attendre.").
- "accordsSuggeres" : 3 à 4 plats concrets et courants (ex. "Entrecôte", "Fromages affinés", "Poulet rôti"), cohérents avec le style du vin.
- "fourchettePrixHabituelle" : estimation réaliste et honnête de la fourchette de prix en euros que cette appellation / ce style / ce niveau de qualité perçu coûte habituellement en France, {min, max}. Ne mentionne JAMAIS un magasin, une enseigne ou un point de vente précis — tu évalues uniquement le vin, jamais où l'acheter.
Si l'image n'est pas une étiquette de vin ou est illisible, réponds exactement : {"appellation":null,"region":null,"cepages":[],"type":null,"millesime":null,"domaine":null,"confiance":"basse","styleEtQualite":"","pourQui":"","accordsSuggeres":[],"fourchettePrixHabituelle":null}`

// Prompt d'enrichissement : recherche web sur le domaine, une fois le vin identifié.
function enrichPrompt(json) {
  return `Tu es le documentaliste d'Œno, une application française dédiée au vin. On vient d'identifier un vin par sa photo d'étiquette :
- Domaine : ${json.domaine || 'inconnu'}
- Appellation : ${json.appellation || 'inconnue'}
- Millésime : ${json.millesime || 'inconnu'}
- Région : ${json.region || 'inconnue'}
Recherche sur le web des informations fiables et récentes sur ce domaine et ce vin, VÉRIFIE la lecture d'étiquette ci-dessus, puis réponds STRICTEMENT avec un objet JSON valide, sans aucun texte autour, sans balises markdown :
{"verifie": boolean, "histoireDomaine": string, "styleVin": string, "cepages": string[], "accords": string[], "fourchettePrix": {"min": number, "max": number}|null, "siteWeb": string|null, "correctionAppellation": string|null, "correctionRegion": string|null}
Règles :
- "verifie" : true UNIQUEMENT si tu as réellement trouvé sur le web des informations sur CE domaine ou CE vin précis. Si tes recherches ne donnent rien de spécifique, mets false et ne remplis que ce que tu sais avec certitude.
- Tout ce que tu écris doit venir des résultats de recherche, pas de suppositions. Une information introuvable = null (ou [] pour "accords"). N'invente RIEN : mieux vaut un champ vide qu'une erreur présentée avec assurance.
- "histoireDomaine" : 2 à 3 phrases sur l'histoire, la taille et l'esprit du domaine, ton chaleureux et précis, en français.
- "styleVin" : 1 à 2 phrases sur le style de ce vin en particulier, d'après les sources trouvées.
- "cepages" : les cépages RÉELS de ce vin d'après les sources ou le cahier des charges de l'appellation (ex. un Anjou blanc = ["Chenin blanc"], jamais du Chardonnay) ; [] si introuvable.
- "accords" : 3 à 4 plats concrets qui l'accompagnent bien.
- "fourchettePrix" : fourchette de prix habituelle constatée en euros {min, max}, ou null si introuvable.
- "siteWeb" : URL du site officiel du domaine si tu la trouves, sinon null.
- "correctionAppellation" / "correctionRegion" : si le web contredit la lecture d'étiquette (mauvaise appellation ou région), donne la bonne valeur ; sinon null.
- Ne mentionne JAMAIS de supermarché, de grande distribution ni aucune enseigne commerciale de distribution ; tu documentes le vin, jamais où l'acheter.`
}

// Enrichissement web : renvoie les champs fusionnables, ou null si échec/pas de données.
async function rechercheWeb(json) {
  try {
    // Requête de recherche courte et ciblée (le prompt complet, lui, sert
    // d'instruction au modèle — jamais de requête à un moteur de recherche).
    const webQuery = [json.domaine, json.appellation, json.millesime, 'vin domaine']
      .filter(Boolean).join(' ')
    const { ok, data } = await askIA({
      model: 'claude-sonnet-5',
      max_tokens: 1200,
      webQuery,
      messages: [{ role: 'user', content: enrichPrompt(json) }],
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
    })
    if (!ok) return null
    const raw = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n')
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    if (start === -1 || end <= start) return null
    const obj = JSON.parse(raw.slice(start, end + 1))
    const usedWeb = (data.content || []).some(b => b.type === 'web_search_tool_result' || b.type === 'server_tool_use')
    return {
      verifie: obj.verifie === true,
      histoire: typeof obj.histoireDomaine === 'string' ? obj.histoireDomaine.trim() : '',
      styleWeb: typeof obj.styleVin === 'string' ? obj.styleVin.trim() : '',
      cepagesWeb: Array.isArray(obj.cepages) ? obj.cepages.filter(c => typeof c === 'string' && c.trim()) : [],
      accordsWeb: Array.isArray(obj.accords) ? obj.accords.filter(a => typeof a === 'string') : [],
      fourchettePrixWeb: obj.fourchettePrix && obj.fourchettePrix.min != null ? obj.fourchettePrix : null,
      siteWeb: typeof obj.siteWeb === 'string' && obj.siteWeb.startsWith('http') ? obj.siteWeb : null,
      correctionAppellation: typeof obj.correctionAppellation === 'string' && obj.correctionAppellation.trim() ? obj.correctionAppellation.trim() : null,
      correctionRegion: typeof obj.correctionRegion === 'string' && obj.correctionRegion.trim() ? obj.correctionRegion.trim() : null,
      usedWeb,
    }
  } catch {
    return null
  }
}

// Redimensionnement côté client : max 1024px de large, JPEG qualité 0.8 —
// les réglages éprouvés pour une lecture OCR fiable des étiquettes.
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      try {
        const scale = Math.min(1, 1024 / img.width, 1536 / img.height)
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        URL.revokeObjectURL(url)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      } catch (e) {
        URL.revokeObjectURL(url)
        reject(e)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('image_error'))
    }
    img.src = url
  })
}

// ── Cache des lectures ───────────────────────────────────────────────────────
// Chaque étiquette déjà lue est mémorisée (hash de l'image → JSON décodé) :
// re-scanner la même photo ne consomme AUCUN quota, réponse instantanée.
const SCAN_CACHE_KEY = 'oeno-scan-cache'
const SCAN_CACHE_MAX = 25

function hashBase64(b64) {
  // djb2 sur un échantillonnage de la chaîne : rapide même sur 200 Ko
  let h = 5381
  const step = Math.max(1, Math.floor(b64.length / 4096))
  for (let i = 0; i < b64.length; i += step) h = ((h * 33) ^ b64.charCodeAt(i)) >>> 0
  return `${h.toString(36)}-${b64.length}`
}

function lireCacheScan(hash) {
  try {
    const cache = JSON.parse(localStorage.getItem(SCAN_CACHE_KEY)) || {}
    return cache[hash]?.json || null
  } catch { return null }
}

function ecrireCacheScan(hash, json) {
  try {
    const cache = JSON.parse(localStorage.getItem(SCAN_CACHE_KEY)) || {}
    cache[hash] = { json, t: Date.now() }
    // Éviction des plus anciennes entrées au-delà de la limite
    const keys = Object.keys(cache)
    if (keys.length > SCAN_CACHE_MAX) {
      keys.sort((a, b) => (cache[a].t || 0) - (cache[b].t || 0))
        .slice(0, keys.length - SCAN_CACHE_MAX)
        .forEach(k => delete cache[k])
    }
    localStorage.setItem(SCAN_CACHE_KEY, JSON.stringify(cache))
  } catch { /* stockage plein : le cache est un bonus, jamais bloquant */ }
}

// Extraction JSON tolérante : les modèles vision entourent parfois le JSON
// de bavardage ou le tronquent en fin de réponse (limite de tokens). On
// isole le premier bloc {...}, et s'il est tronqué on le répare en coupant
// à la dernière valeur complète puis en refermant les accolades.
function parseJSONRobuste(text) {
  const cleaned = String(text || '').replace(/```json|```/g, '').trim()
  const start = cleaned.indexOf('{')
  if (start === -1) return null
  const end = cleaned.lastIndexOf('}')
  if (end > start) {
    try { return JSON.parse(cleaned.slice(start, end + 1)) } catch { /* on tente la réparation */ }
  }
  // Réparation d'un JSON tronqué : on retire la dernière propriété
  // incomplète et on referme ce qui doit l'être.
  let brut = cleaned.slice(start)
  for (let i = 0; i < 24; i++) {
    const coupe = Math.max(brut.lastIndexOf(','), brut.lastIndexOf('['), brut.lastIndexOf('{'))
    if (coupe <= 0) return null
    brut = brut.slice(0, coupe)
    // Referme les crochets/accolades encore ouverts (hors chaînes)
    let fermetures = ''
    let dansChaine = false
    const pile = []
    for (let j = 0; j < brut.length; j++) {
      const c = brut[j]
      if (c === '"' && brut[j - 1] !== '\\') dansChaine = !dansChaine
      if (dansChaine) continue
      if (c === '{' || c === '[') pile.push(c)
      if (c === '}' || c === ']') pile.pop()
    }
    if (dansChaine) continue // coupé au milieu d'une chaîne : on recoupe plus tôt
    for (let j = pile.length - 1; j >= 0; j--) fermetures += pile[j] === '{' ? '}' : ']'
    try { return JSON.parse(brut + fermetures) } catch { /* on recoupe plus tôt */ }
  }
  return null
}

// Cache PARTAGÉ (Supabase, optionnel) : une étiquette lue par n'importe quel
// utilisateur est resservie à tous — zéro quota IA consommé sur les
// bouteilles déjà connues de la communauté. Silencieux si Supabase est
// absent ou si la table n'existe pas encore : le scan fonctionne sans.
async function lireCachePartage(hash) {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from('scan_cache').select('json').eq('hash', hash).maybeSingle()
    if (error || !data?.json) return null
    return data.json
  } catch { return null }
}

function ecrireCachePartage(hash, json) {
  if (!supabase) return
  // Fire-and-forget : l'écriture ne doit jamais ralentir ni casser le scan
  supabase.from('scan_cache').upsert({ hash, json }).then(() => {}, () => {})
}

// Matching insensible à la casse/accents, inclusion partielle, contre WINE_DB
function matchWine(parsed) {
  const napp = normaliser(parsed?.appellation)
  if (!napp || napp.length < 4) return null
  // Respecte la couleur lue : sinon "Menetou-Salon" rouge tomberait sur la fiche
  // blanche (première correspondance par sous-chaîne). Priorité couleur, dans
  // l'ordre exact → variante de couleur → approximatif.
  const memeCouleur = w => !parsed?.type || w.type === parsed.type
  const exacts = WINE_DB.filter(w => normaliser(w.appellation) === napp)
  const variantes = WINE_DB.filter(w => {
    const na = normaliser(w.appellation)
    return na === napp || na.startsWith(napp + ' ') || napp.startsWith(na + ' ')
  })
  const flous = WINE_DB.filter(w => {
    const na = normaliser(w.appellation)
    return na.includes(napp) || napp.includes(na)
  })
  return (
    exacts.find(memeCouleur) ||
    variantes.find(memeCouleur) ||
    flous.find(memeCouleur) ||
    exacts[0] || variantes[0] || flous[0] || null
  )
}

// Vins de la bibliothèque « proches » de la lecture (même région, ou cépage commun)
function vinsProches(parsed, max = 3) {
  const nreg = normaliser(parsed?.region)
  const ncepages = (parsed?.cepages || []).map(normaliser).filter(Boolean)
  const scored = WINE_DB
    .map(w => {
      let s = 0
      const nwr = normaliser(w.region)
      if (nreg && (nwr === nreg || nwr.includes(nreg) || nreg.includes(nwr))) s += 3
      if (parsed?.type && w.type === parsed.type) s += 1
      if (ncepages.length && w.cepages.some(c => ncepages.includes(normaliser(c)))) s += 2
      return { w, s }
    })
    .filter(x => x.s >= 2)
    .sort((a, b) => b.s - a.s)
  return scored.slice(0, max).map(x => x.w)
}

// Millésime à proposer pour l'ajout en cave
function pickMillesime(wine, parsed) {
  const lu = Number(parsed?.millesime)
  if (lu && wine.bonsMilsimes?.includes(lu)) return lu
  if (lu && lu > 1950 && lu < 2100) return lu
  return wine.bonsMilsimes?.[wine.bonsMilsimes.length - 1] || new Date().getFullYear() - 2
}

const CONFIANCE_LABEL = {
  haute: null,
  moyenne: 'Lecture à confirmer',
  basse: 'Lecture incertaine',
}

// Bloc de décision post-scan : « J'achète » ajoute à la cave, « Je n'achète
// pas » mémorise quand même — dans les deux cas le vin reste retrouvable.
function AchatBloc({ achat, onDecision, millesime }) {
  return (
    <div className="rounded-2xl border border-anthracite-900/[0.08] bg-white p-4">
      <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2.5">
        Verdict en rayon ?
      </div>
      {achat === null && (
        <div className="flex gap-2">
          <button
            onClick={() => onDecision('oui')}
            className="flex-1 min-h-[46px] flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #3f6b4c, #2c4d36)' }}
          >
            <ShoppingCart size={14} /> J'achète
          </button>
          <button
            onClick={() => onDecision('non')}
            className="flex-1 min-h-[46px] flex items-center justify-center gap-2 rounded-full text-sm font-semibold border border-anthracite-900/15 text-anthracite-600 hover:border-anthracite-900/40 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Je n'achète pas
          </button>
        </div>
      )}
      {achat === 'oui' && (
        <p className="flex items-start gap-2 text-xs text-emerald-700 font-medium leading-relaxed">
          <Check size={14} className="flex-shrink-0 mt-0.5" />
          Ajouté à votre cave{millesime ? ` (millésime ${millesime})` : ''} — retrouvez-le dans Ma cave pour le noter après dégustation.
        </p>
      )}
      {achat === 'non' && (
        <p className="flex items-start gap-2 text-xs text-anthracite-500 leading-relaxed">
          <BookOpen size={14} className="flex-shrink-0 mt-0.5" />
          Noté ! Mémorisé dans Mes découvertes — retrouvable en deux secondes si vous changez d'avis.
        </p>
      )}
    </div>
  )
}

// Verdict qualité/prix calculé côté front à partir du prix saisi en rayon
// et de la fourchette de prix habituelle estimée par l'IA.
// `dot` : pastille feu tricolore (vert / orange / rouge) lisible d'un coup d'œil.
function verdictPrix(prix, fourchette) {
  const p = Number(prix)
  if (!p || p <= 0 || !fourchette || fourchette.min == null || fourchette.max == null) return null
  if (p < fourchette.min) {
    return { label: 'Bonne affaire', dot: '#16a34a', bg: 'rgba(74,124,89,0.12)', color: '#3f6b4c' }
  }
  if (p > fourchette.max) {
    return { label: 'Plutôt cher pour ce type de vin', dot: '#dc2626', bg: 'rgba(140,47,57,0.10)', color: '#8c2f39' }
  }
  return { label: 'Prix correct', dot: '#f59e0b', bg: 'rgba(199,161,90,0.16)', color: '#8a6a1f' }
}

// Bloc verdict qualité/prix + édition du prix, affiché en tête de la fiche résultat.
function PrixRayonBloc({ verdict, prixRayon, editingPrix, prixDraft, setPrixDraft, setEditingPrix, confirmerPrix }) {
  if (editingPrix) {
    return (
      <div className="rounded-2xl p-4 border border-anthracite-900/[0.08] bg-white space-y-2.5">
        <label htmlFor="scan-prix-edit" className="text-xs font-semibold text-anthracite-600">Prix affiché en rayon (€)</label>
        <div className="flex gap-2">
          <input
            id="scan-prix-edit"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder="ex. 14,90"
            value={prixDraft}
            onChange={e => setPrixDraft(e.target.value)}
            className="input-field flex-1"
            autoFocus
          />
          <button
            onClick={confirmerPrix}
            className="min-h-[44px] px-4 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
          >
            OK
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between gap-2">
      {verdict ? (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: verdict.bg, color: verdict.color }}>
          <span
            className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm"
            style={{ background: verdict.dot }}
            aria-hidden="true"
          />
          {verdict.label} <span className="font-normal opacity-70">— {prixRayon} €</span>
        </span>
      ) : (
        <span className="text-xs text-anthracite-400">Prix non renseigné</span>
      )}
      <button
        onClick={() => { setPrixDraft(prixRayon || ''); setEditingPrix(true) }}
        className="inline-flex items-center gap-1 text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
      >
        <Pencil size={11} /> {verdict ? 'Modifier' : 'Ajouter le prix'}
      </button>
    </div>
  )
}

// Bloc "Notre avis" (style/qualité, pour qui) + "À table avec" (accords), réutilisé dans les deux fiches.
// `fiabilite` (vins hors bibliothèque) : la description a-t-elle été confirmée
// par une recherche web, ou reste-t-elle une estimation d'après l'appellation ?
function AvisEtAccords({ parsed, fiabilite = null, enrichState = 'idle' }) {
  if (!parsed?.styleEtQualite && !parsed?.accordsSuggeres?.length) return null
  return (
    <>
      {(parsed.styleEtQualite || parsed.pourQui) && (
        <div className="rounded-xl p-3.5 border border-gold-500/20" style={{ background: 'rgba(199,161,90,0.06)' }}>
          <div className="text-[10px] uppercase tracking-wider font-bold text-gold-700 mb-1.5">Notre avis</div>
          {parsed.styleEtQualite && <p className="text-xs text-anthracite-700 leading-relaxed">{parsed.styleEtQualite}</p>}
          {parsed.pourQui && <p className="text-xs text-anthracite-500 italic mt-1.5">{parsed.pourQui}</p>}
          {enrichState === 'loading' && (
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-anthracite-400" aria-live="polite">
              <span className="w-2.5 h-2.5 rounded-full border border-gold-500/40 border-t-gold-600 animate-spin flex-shrink-0" />
              Vérification en ligne de cette description…
            </div>
          )}
          {enrichState === 'done' && fiabilite === 'verifiee' && (
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-semibold text-emerald-700">
              <Globe size={10} className="flex-shrink-0" /> Description vérifiée en ligne
            </div>
          )}
          {enrichState === 'done' && fiabilite === 'estimation' && (
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-anthracite-400">
              <Globe size={10} className="flex-shrink-0 opacity-50" /> Estimation d'après l'appellation — vin introuvable en ligne
            </div>
          )}
        </div>
      )}
      {parsed.accordsSuggeres?.length > 0 && (
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2 flex items-center gap-1.5">
            <UtensilsCrossed size={11} className="text-gold-600" /> À table avec
          </div>
          <div className="flex flex-wrap gap-2">
            {parsed.accordsSuggeres.map(plat => (
              <span key={plat} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-cream border border-anthracite-900/10 text-anthracite-700">
                {plat}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// Bouton pleine largeur, cohérent avec le reste des actions, pour ajouter/retirer des envies.
function EnvieAction({ appellation }) {
  const envies = useEnvies()
  const active = envies.some(e => e.appellation === appellation)
  return (
    <button
      onClick={() => toggleEnvie(appellation)}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
        active
          ? 'bg-wine-50 text-wine-700 border border-wine-200'
          : 'border border-anthracite-900/15 text-anthracite-700 hover:border-anthracite-900/40 active:scale-[0.98]'
      }`}
    >
      <Heart size={15} className={active ? 'fill-wine-600 text-wine-600' : ''} />
      {active ? 'Dans mes envies' : 'Ajouter à mes envies'}
    </button>
  )
}

// Bandeau « Mes découvertes » : état d'enrichissement web ou mention « déjà connu ».
function DecouverteBanner({ dejaConnu, enrichState, decouverte }) {
  if (dejaConnu) {
    return (
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-anthracite-50 border border-anthracite-900/[0.06]">
        <Library size={13} className="text-anthracite-400 flex-shrink-0" />
        <span className="text-xs text-anthracite-500">Déjà dans votre bibliothèque</span>
      </div>
    )
  }
  if (enrichState === 'loading') {
    return (
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gold-500/25" style={{ background: 'rgba(199,161,90,0.07)' }} aria-live="polite">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-gold-500/30 border-t-gold-600 animate-spin flex-shrink-0" />
        <span className="text-xs text-anthracite-600">Recherche d'informations sur ce domaine…</span>
      </div>
    )
  }
  if (enrichState === 'done' && decouverte) {
    return (
      <div className="rounded-xl px-3.5 py-3 border border-gold-500/25" style={{ background: 'rgba(199,161,90,0.07)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <Globe size={13} className="text-gold-700 flex-shrink-0" />
          <span className="text-[11px] uppercase tracking-wider font-bold text-gold-700">
            {decouverte.sourceWeb ? 'Ajouté à Mes découvertes, enrichi par le web' : 'Ajouté à Mes découvertes'}
          </span>
        </div>
        {decouverte.histoire && (
          <p className="text-xs text-anthracite-700 leading-relaxed">{decouverte.histoire}</p>
        )}
        {decouverte.siteWeb && (
          <a href={decouverte.siteWeb} target="_blank" rel="noopener noreferrer"
             onClick={e => e.stopPropagation()}
             className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-wine-700 hover:text-wine-800">
            <Globe size={10} /> Site officiel
          </a>
        )}
      </div>
    )
  }
  return null
}

// Fusionne le résultat d'une recherche web dans un enregistrement « découverte »
// (partagé par le scan d'une étiquette seule et le scan de rayon).
function fusionnerWeb(record, web) {
  return updateDecouverte(record.id, {
    appellationLue: record.appellationLue || record.appellation,
    appellation: web.correctionAppellation || record.appellation,
    region: web.correctionRegion || record.region,
    cepages: web.cepagesWeb.length ? web.cepagesWeb : record.cepages,
    histoire: web.histoire || record.histoire,
    description: web.styleWeb || record.description,
    styleEtQualite: web.styleWeb || record.styleEtQualite,
    accords: [...new Set([...(record.accords || []), ...web.accordsWeb])],
    fourchettePrix: web.fourchettePrixWeb || record.fourchettePrix,
    siteWeb: web.siteWeb || record.siteWeb,
    sourceWeb: !!web.usedWeb || !!record.sourceWeb,
    verifie: !!web.verifie,
  })
}

export default function ScanEtiquette({ onClose, onAddWine }) {
  useModalBehavior(onClose)
  // step : 'idle' | 'preview' | 'prix' | 'loading' | 'result' | 'error'
  const [step, setStep] = useState('idle')
  const [photo, setPhoto] = useState(null)        // dataURL JPEG redimensionné
  const [parsed, setParsed] = useState(null)      // réponse JSON de Claude
  const [matched, setMatched] = useState(null)    // vin WINE_DB correspondant
  const [errType, setErrType] = useState(null)    // 'unreadable' | 'api' | 'quota' | 'config'
  const [manuel, setManuel] = useState('')        // mode secours : nom du vin tapé à la main
  const [manuelIntrouvable, setManuelIntrouvable] = useState(false)
  const [retryIn, setRetryIn] = useState(0)       // quota : compte à rebours avant relance auto
  const [errDetail, setErrDetail] = useState(null) // trace technique de /api/scan (diagnostic)
  const autoRetriesRef = useRef(0)                // relances auto déjà tentées sur cette photo
  const [ficheWine, setFicheWine] = useState(null)
  const [added, setAdded] = useState(false)
  const [achat, setAchat] = useState(null) // décision en rayon : null | 'oui' | 'non'
  const [partageCopie, setPartageCopie] = useState(false)
  const [modeRayon, setModeRayon] = useState(false) // photo d'un rayon entier (multi-bouteilles)
  const [rayonVins, setRayonVins] = useState(null)  // bouteilles identifiées sur le rayon
  const [rayonEnrich, setRayonEnrich] = useState({}) // index → { state:'loading'|'done', wine, decouverte }
  const enrichRef = useRef({})                       // promesses d'enrichissement en cours (anti-doublon)
  const [prixRayon, setPrixRayon] = useState('')  // prix saisi en rayon (string du champ)
  const [prixDraft, setPrixDraft] = useState('')  // brouillon pour l'édition post-résultat
  const [editingPrix, setEditingPrix] = useState(false)
  // Bibliothèque personnelle « Mes découvertes »
  const [dejaConnu, setDejaConnu] = useState(false)     // vin déjà en WINE_DB ou en découvertes
  const [enrichState, setEnrichState] = useState('idle') // 'idle' | 'loading' | 'done'
  const [fiabilite, setFiabilite] = useState(null) // null | 'verifiee' | 'estimation' — vins hors bibliothèque uniquement
  const [decouverte, setDecouverte] = useState(null)     // enregistrement sauvegardé
  const [showSimulateur, setShowSimulateur] = useState(false)
  const cameraRef = useRef(null)
  const galleryRef = useRef(null)
  // Caméra intégrée (flux live) — repli sur la caméra système si indisponible/refusée
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [torchDispo, setTorchDispo] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const [camStalled, setCamStalled] = useState(false) // flux caméra figé/noir après ouverture

  const fermerCamera = () => {
    const s = streamRef.current
    if (s) { s.getTracks().forEach(t => t.stop()); streamRef.current = null }
    if (videoRef.current) videoRef.current.srcObject = null
    setTorchDispo(false)
    setTorchOn(false)
  }

  const ouvrirCamera = async () => {
    // Pas de caméra live possible (navigateur ancien, contexte non sécurisé) → caméra système
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      cameraRef.current?.click()
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      })
      streamRef.current = stream
      const track = stream.getVideoTracks()[0]
      setTorchDispo(!!track?.getCapabilities?.().torch)
      setTorchOn(false)
      setStep('camera') // le flux est rattaché à la balise <video> par l'effet ci-dessous
    } catch {
      // Permission refusée ou aucune caméra → repli transparent sur la caméra système
      fermerCamera()
      cameraRef.current?.click()
    }
  }

  const basculerTorche = async () => {
    const track = streamRef.current?.getVideoTracks?.()[0]
    if (!track) return
    try {
      const next = !torchOn
      await track.applyConstraints({ advanced: [{ torch: next }] })
      setTorchOn(next)
    } catch { /* torche non pilotable : on ignore */ }
  }

  const capturerDepuisVideo = async () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    try {
      // Même cadrage que resizeImage : max 1024×1536, JPEG 0.8
      const scale = Math.min(1, 1024 / video.videoWidth, 1536 / video.videoHeight)
      const w = Math.max(1, Math.round(video.videoWidth * scale))
      const h = Math.max(1, Math.round(video.videoHeight * scale))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(video, 0, 0, w, h)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      fermerCamera()
      autoRetriesRef.current = 0
      setPhoto(dataUrl)
      setStep('preview')
    } catch {
      fermerCamera()
      setErrType('unreadable')
      setStep('error')
    }
  }

  // Rattache le flux à la vidéo dès que l'écran caméra est monté (évite la course
  // entre getUserMedia et le rendu React). Coupe la caméra au démontage du composant.
  useEffect(() => {
    if (step !== 'camera') return
    setCamStalled(false)
    if (streamRef.current && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
    // Filet de sécurité : certains appareils rattachent un flux « noir » (pas de
    // frames) sans jamais rejeter getUserMedia. Si la vidéo n'a toujours aucune
    // dimension après 4 s, on propose un repli galerie plutôt qu'un écran noir.
    const t = setTimeout(() => {
      if (!videoRef.current?.videoWidth) setCamStalled(true)
    }, 4000)
    return () => clearTimeout(t)
  }, [step])

  useEffect(() => () => fermerCamera(), []) // eslint-disable-line react-hooks/exhaustive-deps

  // Après identification vision : mémoriser et enrichir si le vin est inconnu.
  const traiterDecouverte = async (json, matchedWine) => {
    if (matchedWine) {
      setDejaConnu(true)
      return
    }
    const existante = matchDecouverte(loadDecouvertes(), json)
    // Déjà scanné ET vérifié en ligne : la base a appris ce vin — on affiche
    // les données vérifiées stockées, pas la lecture vision brute.
    if (existante?.verifie) {
      setDecouverte(existante)
      setDejaConnu(true)
      setParsed(prev => prev ? {
        ...prev,
        appellation: existante.appellation || prev.appellation,
        region: existante.region || prev.region,
        cepages: existante.cepages?.length ? existante.cepages : prev.cepages,
        styleEtQualite: existante.styleEtQualite || prev.styleEtQualite,
        accordsSuggeres: existante.accords?.length ? existante.accords : prev.accordsSuggeres,
        fourchettePrixHabituelle: existante.fourchettePrix || prev.fourchettePrixHabituelle,
      } : prev)
      setFiabilite('verifiee')
      setEnrichState('done')
      return
    }
    // Vin inconnu (ou déjà scanné mais jamais vérifié : on retente à chaque
    // scan jusqu'à ce que la base soit instruite). Mémorisation d'abord…
    const record = existante || addDecouverte(decouverteFromVision(json))
    setDecouverte(record)
    // …puis vérification web, non bloquante. Pour un vin hors bibliothèque,
    // la lecture vision seule est sujette aux approximations : quand le web
    // confirme, ses données remplacent l'estimation DANS LA FICHE AFFICHÉE
    // (style, cépages, accords, prix, voire correction d'appellation) ;
    // sinon la fiche est marquée honnêtement comme estimation non vérifiée.
    setEnrichState('loading')
    const web = await rechercheWeb(json)
    if (web) {
      // garde la lecture d'origine pour reconnaître ce vin au prochain scan,
      // même si l'appellation affichée a été corrigée par le web
      const merged = fusionnerWeb(record, web)
      if (merged) setDecouverte(merged)
      if (web.verifie) {
        setParsed(prev => prev ? {
          ...prev,
          appellation: web.correctionAppellation || prev.appellation,
          region: web.correctionRegion || prev.region,
          cepages: web.cepagesWeb.length ? web.cepagesWeb : prev.cepages,
          styleEtQualite: web.styleWeb || prev.styleEtQualite,
          accordsSuggeres: web.accordsWeb.length ? web.accordsWeb : prev.accordsSuggeres,
          fourchettePrixHabituelle: web.fourchettePrixWeb || prev.fourchettePrixHabituelle,
        } : prev)
        setFiabilite('verifiee')
      } else {
        setFiabilite('estimation')
      }
    } else {
      setFiabilite('estimation')
    }
    setEnrichState('done')
  }

  const onFile = async e => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const dataUrl = await resizeImage(file)
      autoRetriesRef.current = 0
      setPhoto(dataUrl)
      setStep('preview')
    } catch {
      setErrType('unreadable')
      setStep('error')
    }
  }

  // Compte à rebours quota : à zéro, on relance la lecture automatiquement
  // (les quotas gratuits sont par minute — la fenêtre se rouvre d'elle-même).
  useEffect(() => {
    if (step !== 'error' || errType !== 'quota' || retryIn <= 0) return
    const t = setTimeout(() => {
      setRetryIn(v => {
        if (v <= 1) { (modeRayon ? analyserRayon : analyser)(); return 0 }
        return v - 1
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [retryIn, step, errType]) // eslint-disable-line react-hooks/exhaustive-deps

  // Succès de lecture (IA ou cache) → écran résultat
  const afficherLecture = (json) => {
    // Garde-fou factuel : le modèle vision devine parfois des cépages
    // étrangers à l'appellation (ex. Chardonnay pour un Anjou blanc).
    // Quand l'encépagement officiel de l'appellation est connu, il remplace
    // la supposition — vrai même sans connexion ni vérification web.
    const officiels = cepagesOfficiels(json.appellation, json.type, json.region)
    if (officiels) json.cepages = officiels
    const matchedWine = matchWine(json)
    setParsed(json)
    setMatched(matchedWine)
    setAdded(false)
    setStep('result')
    // Bibliothèque personnelle : mémorisation + enrichissement web (non bloquant)
    traiterDecouverte(json, matchedWine)
  }

  const analyser = async () => {
    if (!photo) return
    setRetryIn(0)
    const base64 = photo.split(',')[1]
    // Étiquette déjà lue sur CET appareil ? Réponse instantanée, zéro quota.
    const hash = hashBase64(base64)
    const enCache = lireCacheScan(hash)
    if (enCache) { afficherLecture({ ...enCache }); return }

    setStep('loading')
    // Étiquette déjà lue par la communauté ? (cache partagé Supabase)
    const partage = await lireCachePartage(hash)
    if (partage) {
      ecrireCacheScan(hash, partage)
      afficherLecture({ ...partage })
      return
    }
    try {
      // Un seul appel : /api/scan exécute TOUTE la chaîne côté serveur
      // (Groq multi-modèles + découverte catalogue → Gemini → Claude) et
      // renvoie soit le JSON lu, soit un verdict précis avec le détail de
      // chaque tentative — affiché à l'écran pour un diagnostic immédiat.
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.json) {
        setErrDetail(data.detail || `HTTP ${res.status}`)
        const type = ['quota', 'config', 'api'].includes(data.error) ? data.error : 'api'
        setErrType(type)
        // Quota par minute : nouvelle tentative automatique quand la fenêtre
        // se rouvre. Après 2 relances toujours bloquées (quota journalier
        // probable), on arrête de boucler → saisie manuelle.
        if (type === 'quota' && autoRetriesRef.current < 2) {
          autoRetriesRef.current += 1
          setRetryIn(35)
        }
        setStep('error')
        return
      }

      const json = data.json
      if (!json.appellation && !json.region && !json.domaine) {
        setErrDetail(null)
        setErrType('unreadable')
        setStep('error')
        return
      }
      ecrireCacheScan(hash, json)
      ecrireCachePartage(hash, json)
      afficherLecture(json)
    } catch (e) {
      setErrDetail(`réseau : ${e?.message || 'inconnu'}`)
      setErrType('api')
      setStep('error')
    }
  }

  // ── Mode rayon : une photo, plusieurs bouteilles identifiées d'un coup ────
  const analyserRayon = async () => {
    if (!photo) return
    setRetryIn(0)
    setStep('loading')
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: photo.split(',')[1], mode: 'rayon' }),
      })
      const data = await res.json().catch(() => ({}))
      const vins = data?.json?.vins
      if (!res.ok || !Array.isArray(vins)) {
        setErrDetail(data.detail || `HTTP ${res.status}`)
        const type = ['quota', 'config', 'api'].includes(data.error) ? data.error : 'api'
        setErrType(type)
        if (type === 'quota' && autoRetriesRef.current < 2) {
          autoRetriesRef.current += 1
          setRetryIn(35)
        }
        setStep('error')
        return
      }
      if (!vins.length) {
        setErrDetail(null)
        setErrType('unreadable')
        setStep('error')
        return
      }
      // Chaque bouteille lue est rapprochée de la bibliothèque, puis les plus
      // intéressantes remontent en tête (le « surlignage » du rayon).
      const enrichis = vins.map(v => {
        const m = matchWine({ appellation: v.appellation || v.nom, type: v.type })
        const raisons = []
        if (m) {
          if (v.millesime && m.bonsMilsimes?.includes(Number(v.millesime))) raisons.push(`bon millésime (${v.millesime})`)
          if (v.prixEtiquette && m.prixMoyen && v.prixEtiquette <= m.prixMoyen * 0.85) raisons.push('prix sous le marché')
          if (m.difficulte === 'facile') raisons.push('facile à aimer')
        }
        return { ...v, matched: m, raisons, interessant: raisons.length > 0 }
      })
      enrichis.sort((a, b) => (b.interessant - a.interessant) || (!!b.matched - !!a.matched))
      setRayonVins(enrichis)
      setStep('rayon')
    } catch (e) {
      setErrDetail(`réseau : ${e?.message || 'inconnu'}`)
      setErrType('api')
      setStep('error')
    }
  }

  // ── Rayon : rendre chaque bouteille inconnue « ouvrable » ─────────────────
  // Une bouteille du rayon absente de la bibliothèque n'est plus un cul-de-sac :
  // on la mémorise dans « Mes découvertes » et on la complète par une recherche
  // web (histoire, cépages, accords, prix), exactement comme le scan d'une
  // étiquette seule — puis on la présente comme une vraie fiche Œno. Anti-doublon
  // via enrichRef : une même bouteille ne déclenche qu'une seule recherche.
  const enrichirBouteille = (v, key) => {
    if (enrichRef.current[key]) return enrichRef.current[key]
    const p = (async () => {
      setRayonEnrich(s => ({ ...s, [key]: { state: 'loading' } }))
      const vision = {
        appellation: v.appellation || v.nom || null,
        domaine: v.appellation && v.nom && v.nom !== v.appellation ? v.nom : '',
        region: null,
        type: v.type || null,
        millesime: Number(v.millesime) || null,
        cepages: [],
        styleEtQualite: '',
      }
      let record = matchDecouverte(loadDecouvertes(), vision) || addDecouverte(decouverteFromVision(vision))
      if (record && !record.verifie) {
        const web = await rechercheWeb(vision)
        if (web) { const merged = fusionnerWeb(record, web); if (merged) record = merged }
      }
      const wine = record ? decouverteToWine(record) : null
      setRayonEnrich(s => ({ ...s, [key]: { state: 'done', wine, decouverte: record } }))
      return wine
    })()
    enrichRef.current[key] = p
    return p
  }

  // Tap sur une bouteille du rayon → sa fiche complète (connue = fiche direct,
  // inconnue = enrichissement web puis fiche).
  const ouvrirBouteille = async (v, key) => {
    if (v.matched) { setFicheWine(v.matched); return }
    const cur = rayonEnrich[key]
    if (cur?.state === 'done' && cur.wine) { setFicheWine(cur.wine); return }
    const wine = await enrichirBouteille(v, key)
    if (wine) setFicheWine(wine)
  }

  // Enrichissement web automatique, en tâche de fond, des bouteilles inconnues
  // du rayon (séquentiel + plafonné pour ménager le quota ; le reste s'enrichit
  // au tap). Se relance à chaque nouveau rayon analysé.
  useEffect(() => {
    if (step !== 'rayon' || !rayonVins) return
    let annule = false
    const inconnues = rayonVins.map((v, i) => ({ v, i })).filter(x => !x.v.matched)
    ;(async () => {
      for (const { v, i } of inconnues.slice(0, 6)) {
        if (annule) break
        await enrichirBouteille(v, i)
      }
    })()
    return () => { annule = true }
  }, [step, rayonVins]) // eslint-disable-line react-hooks/exhaustive-deps

  // Mode secours : identifier le vin par son nom quand la lecture IA échoue.
  // Réutilise matchWine → même écran résultat que le scan (fiche, prix, cave).
  const chercherManuel = () => {
    const q = manuel.trim()
    if (q.length < 3) return
    const m = matchWine({ appellation: q })
    if (!m) { setManuelIntrouvable(true); return }
    setParsed({ appellation: m.appellation, region: m.region, type: m.type, millesime: null })
    setMatched(m)
    setAdded(false)
    setDejaConnu(true)
    setManuelIntrouvable(false)
    setStep('result')
  }

  const recommencer = () => {
    fermerCamera()
    setStep('idle')
    setPhoto(null)
    setParsed(null)
    setMatched(null)
    setErrType(null)
    setManuel('')
    setManuelIntrouvable(false)
    setRetryIn(0)
    setErrDetail(null)
    autoRetriesRef.current = 0
    setAdded(false)
    setAchat(null)
    setModeRayon(false)
    setRayonVins(null)
    setRayonEnrich({})
    enrichRef.current = {}
    setCamStalled(false)
    setPrixRayon('')
    setPrixDraft('')
    setEditingPrix(false)
    setDejaConnu(false)
    setEnrichState('idle')
    setDecouverte(null)
    setFiabilite(null)
  }

  const confirmerPrix = () => {
    setEditingPrix(false)
    if (prixDraft) setPrixRayon(prixDraft)
  }

  // Ajout direct à la cave (vin de la bibliothèque ou lecture générique)
  const ajouterCave = () => {
    if (!onAddWine || added) return
    if (matched) {
      const millesime = pickMillesime(matched, parsed)
      onAddWine({
        id: `${matched.id}-${millesime}-${Date.now()}`,
        name: matched.appellation,
        domain: parsed?.domaine || '',
        appellation: matched.appellation,
        region: matched.region,
        type: matched.type,
        cepages: matched.cepages,
        vintage: millesime,
        quantity: 1,
        drinkFrom: matched.drinkFrom,
        drinkUntil: matched.drinkUntil,
        serviceTemp: matched.serviceTemp,
        carafage: matched.carafage,
        estimatedValue: matched.prixMoyen,
        foodPairings: matched.accords,
        notes: `${matched.enUneMot} — ajouté via le scan d'étiquette`,
      })
    } else if (parsed) {
      const vintage = Number(parsed.millesime) || new Date().getFullYear() - 2
      onAddWine({
        id: `scan-${Date.now()}`,
        name: parsed.appellation || parsed.domaine || 'Vin scanné',
        domain: parsed.domaine || '',
        appellation: parsed.appellation || '',
        region: parsed.region || '',
        type: parsed.type || 'red',
        cepages: parsed.cepages || [],
        vintage,
        quantity: 1,
        drinkFrom: 1,
        drinkUntil: 8,
        serviceTemp: parsed.type === 'white' || parsed.type === 'rosé' ? 10 : 16,
        carafage: null,
        estimatedValue: 0,
        foodPairings: [],
        notes: 'Ajouté via le scan d\'étiquette',
      })
    }
    setAdded(true)
  }

  // Décision d'achat : journalisée pour le profil de goûts, cave si « oui »
  const deciderAchat = (decision) => {
    if (achat) return
    setAchat(decision)
    logAchat({
      appellation: matched?.appellation || parsed?.appellation || parsed?.domaine || 'Vin scanné',
      region: matched?.region || parsed?.region || '',
      type: matched?.type || parsed?.type || '',
      prix: Number(prixRayon) || null,
      achete: decision === 'oui',
    })
    if (decouverte) {
      const m = updateDecouverte(decouverte.id, { achete: decision === 'oui' })
      if (m) setDecouverte(m)
    }
    if (decision === 'oui') ajouterCave()
  }

  const proches = step === 'result' && !matched && parsed ? vinsProches(parsed) : []
  const region = parsed?.region ? regionInfo(parsed.region) : null
  const confiance = parsed ? CONFIANCE_LABEL[parsed.confiance] : null
  const verdict = parsed ? verdictPrix(prixRayon, parsed.fourchettePrixHabituelle) : null
  const nomEnvie = matched?.appellation || parsed?.appellation || parsed?.domaine || null

  const sousTitre = {
    idle: "Photographiez l'étiquette.",
    preview: 'Photo prête.',
    prix: 'Optionnel.',
    loading: 'Lecture en cours…',
    result: matched ? 'On connaît ce vin.' : "Voici ce qu'on en sait.",
    error: 'Petit contretemps…',
  }[step]

  return (
    <div
      className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Scanner une étiquette de vin"
    >
      <div
        className="modal-panel sm:max-w-lg max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header sombre luxe */}
        <div className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="absolute -top-5 -right-3 opacity-10 select-none pointer-events-none" aria-hidden="true">
            <Camera size={110} strokeWidth={1} />
          </div>
          <div className="relative flex items-start justify-between">
            <div>
              <span className="eyebrow-dark mb-2">Sommelier de poche</span>
              <h3 className="font-serif text-2xl font-medium">Scannez une étiquette</h3>
              <p className="text-cream/70 text-sm mt-1">{sousTitre}</p>
            </div>
            <button onClick={onClose}
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all duration-300 cursor-pointer"
                    aria-label="Fermer">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">

          {/* ── IDLE : prendre / choisir une photo ─────────────────────── */}
          {step === 'idle' && (
            <div className="space-y-3 animate-fade-in">
              <button
                onClick={ouvrirCamera}
                className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-2xl text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.99] shadow-wine"
                style={{ background: 'linear-gradient(150deg, #8c2f39 0%, #5c0d22 100%)' }}
              >
                <span className="w-14 h-14 rounded-full border border-gold-500/50 flex items-center justify-center">
                  <Camera size={24} className="text-gold-400" strokeWidth={1.75} />
                </span>
                <span className="font-serif text-lg font-medium">Photographier l'étiquette</span>
                <span className="text-cream/60 text-xs">Au restaurant, chez le caviste, dans votre cave…</span>
              </button>

              <button
                onClick={() => { setModeRayon(true); ouvrirCamera() }}
                className="w-full min-h-[52px] flex items-center justify-center gap-2.5 rounded-2xl border border-gold-500/40 text-sm font-semibold text-anthracite-800 hover:border-gold-500/80 hover:bg-white active:scale-[0.99] transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(199,161,90,0.07)' }}
              >
                <Library size={16} className="text-gold-600" />
                Photographier un rayon entier
                <span className="text-[9px] uppercase tracking-wider font-bold text-gold-700 bg-gold-500/15 px-1.5 py-0.5 rounded-full">Nouveau</span>
              </button>

              <button
                onClick={() => galleryRef.current?.click()}
                className="w-full min-h-[52px] flex items-center justify-center gap-2.5 rounded-2xl border border-anthracite-900/15 text-sm font-medium text-anthracite-700 hover:border-anthracite-900/40 hover:bg-white active:scale-[0.99] transition-all duration-300 cursor-pointer"
              >
                <ImageIcon size={16} className="text-gold-600" />
                Choisir une photo dans la galerie
              </button>

              <p className="text-[11px] text-anthracite-400 text-center pt-1 leading-relaxed">
                Cadrez l'étiquette bien en face, avec un maximum de lumière.
                <br />La photo est analysée puis oubliée — rien n'est conservé.
              </p>

              {/* Inputs cachés : caméra (mobile) + galerie */}
              <input ref={cameraRef} type="file" accept="image/*" capture="environment"
                     className="hidden" onChange={onFile} aria-hidden="true" tabIndex={-1} />
              <input ref={galleryRef} type="file" accept="image/*"
                     className="hidden" onChange={onFile} aria-hidden="true" tabIndex={-1} />
            </div>
          )}

          {/* ── CAMERA : flux live intégré ──────────────────────────────── */}
          {step === 'camera' && (
            <div className="animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '3 / 4' }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  autoPlay
                  onLoadedMetadata={() => { setCamStalled(false); videoRef.current?.play().catch(() => {}) }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Cadre de visée */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[80%] h-[62%] rounded-lg border-2 border-gold-400/85"
                       style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.34)' }} />
                </div>
                <div className="absolute top-3 inset-x-0 text-center">
                  <span className="text-cream/90 text-xs font-medium px-3 py-1 rounded-full bg-black/35 backdrop-blur">
                    {modeRayon ? 'Cadrez le rayon — plusieurs bouteilles à la fois' : "Alignez l'étiquette dans le cadre"}
                  </span>
                </div>
                {torchDispo && (
                  <button
                    onClick={basculerTorche}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-cream cursor-pointer"
                    aria-label={torchOn ? 'Éteindre la torche' : 'Allumer la torche'}
                  >
                    {torchOn ? <Zap size={18} className="text-gold-400" /> : <ZapOff size={18} />}
                  </button>
                )}
                {/* Caméra figée / noire : repli galerie plutôt qu'un écran noir */}
                {camStalled && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <Camera size={30} className="text-gold-400/80" strokeWidth={1.5} />
                    <p className="text-cream/90 text-sm leading-relaxed max-w-[16rem]">
                      La caméra tarde à démarrer. Vérifiez l'autorisation caméra, ou choisissez une photo depuis la galerie.
                    </p>
                    <div className="flex flex-col gap-2 w-full max-w-[15rem]">
                      <button
                        onClick={() => { fermerCamera(); galleryRef.current?.click() }}
                        className="min-h-[46px] flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-cream cursor-pointer active:scale-[0.98]"
                        style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                      >
                        <ImageIcon size={15} className="text-gold-400" /> Choisir dans la galerie
                      </button>
                      <button
                        onClick={() => { fermerCamera(); ouvrirCamera() }}
                        className="min-h-[44px] flex items-center justify-center gap-2 rounded-full text-sm font-medium text-cream/80 border border-white/25 hover:bg-white/10 cursor-pointer active:scale-[0.98]"
                      >
                        <RefreshCw size={14} /> Réessayer la caméra
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-5 px-2">
                <button
                  onClick={() => { fermerCamera(); setStep('idle') }}
                  className="text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors cursor-pointer w-20 text-left"
                >
                  Annuler
                </button>
                <button
                  onClick={capturerDepuisVideo}
                  aria-label="Prendre la photo"
                  className="w-16 h-16 rounded-full border-4 border-wine-800 flex items-center justify-center bg-white active:scale-95 transition-transform cursor-pointer shadow-wine"
                >
                  <span className="w-12 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }} />
                </button>
                <button
                  onClick={() => { fermerCamera(); galleryRef.current?.click() }}
                  className="text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors cursor-pointer w-20 text-right"
                >
                  Galerie
                </button>
              </div>
            </div>
          )}

          {/* ── PREVIEW : photo prête ───────────────────────────────────── */}
          {step === 'preview' && photo && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: '#1C1917' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="Aperçu de l'étiquette photographiée" className="max-h-72 w-auto max-w-full object-contain" />
              </div>
              <button
                onClick={() => (modeRayon ? analyserRayon() : setStep('prix'))}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-wine"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              >
                <Sparkles size={15} className="text-gold-400" />
                {modeRayon ? 'Analyser le rayon' : "Lire l'étiquette"}
              </button>
              <button
                onClick={recommencer}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                <RefreshCw size={12} /> Changer de photo
              </button>
            </div>
          )}

          {/* ── PRIX : saisie optionnelle du prix en rayon ──────────────── */}
          {step === 'prix' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col items-center text-center gap-2 pb-1">
                <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#f0e9dd' }}>
                  <Tag size={18} className="text-gold-700" />
                </span>
                <div className="font-serif text-lg text-anthracite-900">Prix affiché en rayon ?</div>
                <p className="text-xs text-anthracite-500 max-w-[19rem] leading-relaxed">
                  Renseignez-le pour savoir tout de suite si c'est une bonne affaire. Vous pourrez le modifier plus tard.
                </p>
              </div>
              <div>
                <label htmlFor="scan-prix" className="block text-xs font-semibold text-anthracite-600 mb-1.5">Prix (€)</label>
                <input
                  id="scan-prix"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  placeholder="ex. 14,90"
                  value={prixRayon}
                  onChange={e => setPrixRayon(e.target.value)}
                  className="input-field"
                  autoFocus
                />
              </div>
              <button
                onClick={analyser}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-wine"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              >
                <Sparkles size={15} className="text-gold-400" />
                Analyser l'étiquette
              </button>
              <button
                onClick={() => { setPrixRayon(''); analyser() }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                Passer, je ne connais pas le prix
              </button>
            </div>
          )}

          {/* ── LOADING : lecture en cours ──────────────────────────────── */}
          {step === 'loading' && (
            <div className="py-12 flex flex-col items-center text-center animate-fade-in" aria-live="polite">
              <div className="relative w-16 h-16 mb-6">
                <span className="absolute inset-0 rounded-full border-2 border-gold-500/20" />
                <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-500 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center"><WineVisuel type="red" size={22} /></span>
              </div>
              <div className="font-serif text-lg text-anthracite-900">
                {modeRayon ? 'Lecture du rayon…' : "Lecture de l'étiquette…"}
              </div>
              <p className="text-xs text-anthracite-400 mt-2 max-w-[16rem] leading-relaxed">
                {modeRayon
                  ? 'Notre sommelier identifie chaque bouteille lisible du rayon.'
                  : "Notre sommelier déchiffre l'appellation, le millésime et les cépages."}
              </p>
            </div>
          )}

          {/* ── ERROR : douce, avec retry ───────────────────────────────── */}
          {step === 'error' && (
            <div className="py-8 flex flex-col items-center text-center animate-fade-in">
              <div className="font-serif text-lg text-anthracite-900">
                {errType === 'quota' ? 'Trop de lectures en peu de temps'
                  : errType === 'config' ? 'Lecture automatique indisponible'
                  : errType === 'api' ? 'Notre sommelier fait une courte pause'
                  : 'Étiquette illisible'}
              </div>
              <p className="text-sm text-anthracite-500 mt-2 max-w-[19rem] leading-relaxed">
                {errType === 'quota'
                  ? (retryIn > 0
                      ? `Le quota gratuit du service de lecture est atteint pour l'instant. Nouvelle tentative automatique dans ${retryIn} s — vous n'avez rien à faire.`
                      : "Le quota du service de lecture semble durablement atteint pour aujourd'hui. Identifiez votre vin par son nom ci-dessous — même résultat, sans attendre.")
                  : errType === 'config'
                  ? "Le service de lecture d'étiquettes n'est pas encore activé sur ce déploiement. En attendant, identifiez votre vin par son nom ci-dessous."
                  : errType === 'api'
                  ? "Le service de lecture est momentanément indisponible. Toutes nos excuses — réessayez dans un instant."
                  : "Réessayez avec plus de lumière, l'étiquette bien à plat et cadrée en entier."}
              </p>
              {errDetail && (
                <p className="text-[10px] text-anthracite-400 mt-3 max-w-[19rem] leading-relaxed break-words font-mono">
                  Détail technique : {errDetail}
                </p>
              )}
              {errType !== 'config' && (
                <button
                  onClick={recommencer}
                  className="mt-6 min-h-[48px] inline-flex items-center gap-2 px-8 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                >
                  <RefreshCw size={14} /> Réessayer
                </button>
              )}

              {/* Mode secours : identifier le vin par son nom — le parcours aboutit toujours */}
              <div className="mt-7 pt-6 border-t border-anthracite-100 w-full max-w-[19rem]">
                <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-anthracite-400 mb-2.5">
                  {errType === 'config' ? 'Identifier mon vin' : 'Ou identifiez-le à la main'}
                </div>
                <div className="flex gap-2">
                  <input
                    value={manuel}
                    onChange={e => { setManuel(e.target.value); setManuelIntrouvable(false) }}
                    onKeyDown={e => e.key === 'Enter' && chercherManuel()}
                    placeholder="Ex. Chinon, Pauillac, Sancerre…"
                    className="input-field flex-1 !text-sm"
                    aria-label="Nom du vin"
                  />
                  <button
                    onClick={chercherManuel}
                    disabled={manuel.trim().length < 3}
                    className="min-h-[44px] px-4 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                  >
                    Chercher
                  </button>
                </div>
                {manuelIntrouvable && (
                  <p className="text-[11px] text-wine-700 mt-2 text-left">
                    Introuvable dans la bibliothèque — essayez le nom de l'appellation (ex. « Saint-Émilion » plutôt que le château).
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── RESULT : vin reconnu dans la bibliothèque ───────────────── */}
          {/* ── RAYON : liste des bouteilles identifiées sur la photo ────── */}
          {step === 'rayon' && rayonVins && (
            <div className="space-y-3 animate-slide-up">
              <div className="text-center pb-1">
                <div className="font-serif text-lg text-anthracite-900">
                  {rayonVins.length} bouteille{rayonVins.length > 1 ? 's' : ''} identifiée{rayonVins.length > 1 ? 's' : ''}
                </div>
                <p className="text-xs text-anthracite-500 mt-1">
                  Les plus intéressantes d'abord — touchez un vin pour sa fiche complète.
                </p>
              </div>
              {rayonVins.map((v, i) => {
                const enr = rayonEnrich[i]
                const wine = v.matched || (enr?.state === 'done' ? enr.wine : null)
                const enCours = enr?.state === 'loading'
                return (
                <div
                  key={`${v.nom}-${i}`}
                  onClick={() => ouvrirBouteille(v, i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ouvrirBouteille(v, i) } }}
                  className={`rounded-2xl border p-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                    v.interessant
                      ? 'border-gold-500/50 shadow-card hover:-translate-y-0.5'
                      : v.matched
                        ? 'border-anthracite-900/[0.08] bg-white hover:border-anthracite-900/25'
                        : 'border-anthracite-900/[0.06] bg-white hover:border-gold-500/40'
                  }`}
                  style={v.interessant ? { background: 'rgba(199,161,90,0.08)' } : {}}
                >
                  <div className="flex items-start gap-3">
                    <WineVisuel type={wine?.type || v.type || 'red'} size={20} className="mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-wine-name text-xl text-anthracite-900 leading-tight">
                          {wine?.appellation || v.nom}
                        </span>
                        {v.interessant && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-700">
                            <Sparkles size={9} /> À prendre
                          </span>
                        )}
                        {v.matched?.grandPublic && <BadgeGrandPublic compact />}
                      </div>
                      <div className="text-[11px] text-anthracite-400 mt-0.5">
                        {[
                          wine?.region,
                          v.millesime,
                          v.prixEtiquette ? `${v.prixEtiquette} € en rayon` : (v.matched ? `~${v.matched.prixMoyen} € habituellement` : null),
                        ].filter(Boolean).join(' · ')}
                      </div>
                      {v.raisons.length > 0 && (
                        <p className="text-[11px] text-gold-700 font-medium mt-1">
                          {v.raisons.join(' · ')}
                        </p>
                      )}
                      {!v.matched && (
                        enCours ? (
                          <p className="flex items-center gap-1.5 text-[11px] text-anthracite-400 mt-1" aria-live="polite">
                            <span className="w-3 h-3 rounded-full border border-gold-500/40 border-t-gold-600 animate-spin flex-shrink-0" />
                            Recherche en ligne…
                          </p>
                        ) : enr?.state === 'done' && enr.wine ? (
                          <p className="flex items-center gap-1.5 text-[11px] font-medium text-gold-700 mt-1">
                            <Globe size={10} className="flex-shrink-0" /> Fiche prête — touchez pour l'ouvrir
                          </p>
                        ) : (
                          <p className="flex items-center gap-1.5 text-[11px] text-anthracite-400 mt-1">
                            <Globe size={10} className="flex-shrink-0 opacity-60" /> Touchez pour l'analyser en ligne
                          </p>
                        )
                      )}
                    </div>
                    <ChevronRight size={16} className="text-anthracite-300 flex-shrink-0 mt-1" />
                  </div>
                </div>
              )})}
              <button
                onClick={recommencer}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                <Camera size={12} /> Photographier un autre rayon
              </button>
            </div>
          )}

          {step === 'result' && matched && (
            <div className="space-y-4 animate-slide-up">
              <PrixRayonBloc
                verdict={verdict}
                prixRayon={prixRayon}
                editingPrix={editingPrix}
                prixDraft={prixDraft}
                setPrixDraft={setPrixDraft}
                setEditingPrix={setEditingPrix}
                confirmerPrix={confirmerPrix}
              />
              <DecouverteBanner dejaConnu={dejaConnu} enrichState={enrichState} decouverte={decouverte} />
              {/* Fiche simplifiée */}
              <div className="rounded-2xl overflow-hidden border border-anthracite-900/[0.07] shadow-card">
                <div className="p-5 relative overflow-hidden"
                     style={{ background: `linear-gradient(150deg, ${matched.color} 0%, ${matched.color}cc 60%, #1e2426 150%)` }}>
                  <div className="absolute -top-2 -right-3 opacity-20 select-none pointer-events-none" aria-hidden="true">
                    <WineVisuel type={matched.type} size={75} />
                  </div>
                  <div className="relative">
                    <WineVisuel type={matched.type} size={20} className="mb-1" />
                    <div className="font-wine-name text-4xl text-cream">{matched.appellation}</div>
                    {matched.grandPublic && (
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-cream">
                        <ShoppingCart size={10} /> Produit grand public
                      </span>
                    )}
                    <p className="text-cream/70 text-xs mt-1 flex items-center gap-1.5">
                      <MapPin size={10} /> {matched.region} · {matched.typeLabel}
                      {parsed?.millesime ? ` · millésime lu : ${parsed.millesime}` : ''}
                    </p>
                    <p className="text-cream/90 italic text-sm mt-2.5">« {matched.enUneMot} »</p>
                  </div>
                </div>

                <div className="p-5 space-y-4 bg-white">
                  {confiance && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-700">
                      {confiance}
                    </span>
                  )}

                  {parsed?.domaine && (
                    <p className="text-sm text-anthracite-600">
                      <span className="font-semibold text-anthracite-800">Domaine lu : </span>
                      <span className="font-wine-name text-xl align-middle">{parsed.domaine}</span>
                    </p>
                  )}

                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2.5">Profil de goût</div>
                    <JaugesGout jauges={matched.jauges} />
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Les cépages, simplement</div>
                    <div className="space-y-1">
                      {matched.cepages.map(c => (
                        <div key={c} className="text-sm text-anthracite-700">
                          <span className="font-semibold">{c}</span>
                          {noteCepage(c) && <span className="text-anthracite-500"> — {noteCepage(c)}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {matched.region && (
                    <div className="rounded-xl p-3.5" style={{ background: '#f0e9dd' }}>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1">
                        <Icone nom={regionInfo(matched.region).ic} size={12} className="inline-block text-gold-700 mr-1 -mt-0.5" /> {matched.region}
                      </div>
                      <p className="text-xs text-anthracite-600 leading-relaxed">{regionInfo(matched.region).blurb}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-anthracite-100 text-anthracite-700">
                      ~ {matched.prixMoyen} € la bouteille
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{ background: DIFFICULTE_CONFIG[matched.difficulte].bg, color: DIFFICULTE_CONFIG[matched.difficulte].color }}>
                      {DIFFICULTE_CONFIG[matched.difficulte].label}
                    </span>
                  </div>

                  <AvisEtAccords parsed={parsed} />
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => setFicheWine(matched)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-cream cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-wine"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
              >
                <BookOpen size={15} />
                Voir la fiche complète
              </button>
              <button
                onClick={() => setShowSimulateur(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-gold-700 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 active:scale-[0.98] transition-all cursor-pointer"
                title="L'avis d'Œno avant d'ouvrir, votre ressenti après"
              >
                <Sparkles size={14} /> Simuler la dégustation
              </button>
              {nomEnvie && <EnvieAction appellation={nomEnvie} />}
              <button
                onClick={async () => {
                  const r = await partagerVin(matched)
                  if (r === 'copie') { setPartageCopie(true); setTimeout(() => setPartageCopie(false), 2000) }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold border border-anthracite-900/15 text-anthracite-600 hover:border-anthracite-900/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                {partageCopie ? <><Check size={14} /> Copié dans le presse-papier</> : <><Share2 size={14} /> Partager ce coup de cœur</>}
              </button>
              {onAddWine && (
                <AchatBloc achat={achat} onDecision={deciderAchat} millesime={pickMillesime(matched, parsed)} />
              )}
              <button
                onClick={recommencer}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                <Camera size={12} /> Scanner une autre étiquette
              </button>
            </div>
          )}

          {/* ── RESULT : fiche générique (pas dans la bibliothèque) ─────── */}
          {step === 'result' && !matched && parsed && (
            <div className="space-y-4 animate-slide-up">
              <PrixRayonBloc
                verdict={verdict}
                prixRayon={prixRayon}
                editingPrix={editingPrix}
                prixDraft={prixDraft}
                setPrixDraft={setPrixDraft}
                setEditingPrix={setEditingPrix}
                confirmerPrix={confirmerPrix}
              />
              <DecouverteBanner dejaConnu={dejaConnu} enrichState={enrichState} decouverte={decouverte} />
              <div className="rounded-2xl overflow-hidden border border-anthracite-900/[0.07] shadow-card">
                <div className="p-5 relative overflow-hidden text-cream"
                     style={{ background: 'linear-gradient(150deg, #1C1917 0%, #3a0616 80%, #5c0d22 140%)' }}>
                  <div className="absolute -top-4 -right-4 opacity-10 select-none pointer-events-none" aria-hidden="true"><WineVisuel type="red" size={90} /></div>
                  <div className="relative">
                    {parsed.domaine && <div className="font-wine-name text-4xl text-cream">{parsed.domaine}</div>}
                    <div className={parsed.domaine ? 'text-cream/80 text-sm mt-1' : 'font-wine-name text-4xl text-cream'}>
                      {parsed.appellation || 'Appellation non identifiée'}
                    </div>
                    <p className="text-cream/70 text-xs mt-2 flex items-center gap-1.5 flex-wrap">
                      {parsed.region && <span className="inline-flex items-center gap-1"><MapPin size={10} /> {parsed.region}</span>}
                      {parsed.type && <span>· {TYPE_LABELS[parsed.type] || parsed.type}</span>}
                      {parsed.millesime && <span>· {parsed.millesime}</span>}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4 bg-white">
                  {confiance && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-700">
                      {confiance}
                    </span>
                  )}

                  <p className="text-sm text-anthracite-600 leading-relaxed">
                    Cette bouteille n'est pas encore dans notre bibliothèque —
                    mais pas d'inquiétude, voici ce que l'étiquette nous apprend.
                  </p>

                  {parsed.cepages?.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1.5">Les cépages probables, simplement</div>
                      <div className="space-y-1">
                        {parsed.cepages.map(c => (
                          <div key={c} className="text-sm text-anthracite-700">
                            <span className="font-semibold">{c}</span>
                            {noteCepage(c) && <span className="text-anthracite-500"> — {noteCepage(c)}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {region && parsed.region && (
                    <div className="rounded-xl p-3.5" style={{ background: '#f0e9dd' }}>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-1">
                        <Icone nom={region.ic} size={12} className="inline-block text-gold-700 mr-1 -mt-0.5" /> {parsed.region}
                      </div>
                      <p className="text-xs text-anthracite-600 leading-relaxed">{region.blurb}</p>
                    </div>
                  )}

                  {proches.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-2">Dans le même esprit, chez nous</div>
                      <div className="flex flex-wrap gap-2">
                        {proches.map(w => (
                          <button
                            key={w.id}
                            onClick={() => setFicheWine(w)}
                            className="min-h-[44px] inline-flex items-center gap-2 pl-3 pr-3.5 rounded-full bg-cream border border-anthracite-900/10 hover:border-gold-500/60 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                            title={`Ouvrir la fiche ${w.appellation}`}
                          >
                            <WineVisuel type={w.type} size={13} />
                            <span className="text-xs font-semibold text-anthracite-800">{w.appellation}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <AvisEtAccords parsed={parsed} fiabilite={fiabilite} enrichState={enrichState} />
                </div>
              </div>

              {(parsed.appellation || parsed.domaine) && (
                <button
                  onClick={() => setShowSimulateur(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-gold-700 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 active:scale-[0.98] transition-all cursor-pointer"
                  title="L'avis d'Œno avant d'ouvrir, votre ressenti après"
                >
                  <Sparkles size={14} /> Simuler la dégustation
                </button>
              )}
              {nomEnvie && <EnvieAction appellation={nomEnvie} />}
              {onAddWine && (parsed.appellation || parsed.domaine) && (
                <AchatBloc achat={achat} onDecision={deciderAchat} millesime={Number(parsed.millesime) || null} />
              )}
              <button
                onClick={recommencer}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full text-xs font-medium text-anthracite-500 hover:text-anthracite-800 transition-colors duration-300 cursor-pointer"
              >
                <Camera size={12} /> Scanner une autre étiquette
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fiche complète (z-[70], passe au-dessus du scan) */}
      {ficheWine && (
        <FicheVin
          wine={ficheWine}
          onClose={() => setFicheWine(null)}
          onAddToCave={onAddWine ? (w, m) => {
            onAddWine({
              id: `${w.id}-${m}-${Date.now()}`,
              name: w.appellation,
              domain: '',
              appellation: w.appellation,
              region: w.region,
              type: w.type,
              cepages: w.cepages,
              vintage: m,
              quantity: 1,
              drinkFrom: w.drinkFrom,
              drinkUntil: w.drinkUntil,
              serviceTemp: w.serviceTemp,
              carafage: w.carafage,
              estimatedValue: w.prixMoyen,
              foodPairings: w.accords,
              notes: `${w.enUneMot} — Arômes : ${w.aromes}`,
            })
          } : undefined}
        />
      )}

      {/* Simulateur de dégustation (z-[85], passe au-dessus du scan) */}
      {showSimulateur && (
        <DegustationSimulateur
          vin={matched
            ? { ...matched, nom: matched.appellation, domaine: parsed?.domaine || '', millesime: Number(parsed?.millesime) || null }
            : {
                nom: parsed?.appellation || parsed?.domaine || 'Vin scanné',
                appellation: parsed?.appellation || '',
                domaine: parsed?.domaine || '',
                millesime: Number(parsed?.millesime) || null,
                region: parsed?.region || '',
                type: parsed?.type || 'red',
                cepages: parsed?.cepages || [],
                pourQui: decouverte?.pourQui || parsed?.pourQui || null,
                aromes: decouverte?.aromes || null,
              }}
          onClose={() => setShowSimulateur(false)}
        />
      )}
    </div>
  )
}
