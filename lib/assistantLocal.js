import { vinsCites } from './mentions'
import { millesimesAPrivilegier } from './millesimes'
import { recommander } from './guide/moteur'
import { GLOSSAIRE_LIST } from '../data/glossaire'

// ═══════════════════════════════════════════════════════════════════════════
// Ce que l'assistant sait répondre sans son cerveau distant.
//
// Hors-ligne, sans clé ou quota dépassé, il répondait la même chose à toute
// question : « je n'arrive pas à joindre mon cerveau ». Or la plupart des
// questions qu'on pose à un sommelier sont simples — que boire avec une
// raclette, à quelle température servir un Chablis, c'est quoi un tanin — et
// Œno porte déjà la réponse dans ses fiches, son guide et son glossaire.
//
// Portée honnête : ce n'est pas une conversation. On reconnaît trois formes
// de question par leurs mots (un vin nommé, un plat, un terme) et l'on rend
// ce que la base en dit, mot pour mot. Tout ce qui sort de là rend `null`, et
// l'assistant dit alors qu'il est injoignable — plutôt que de répondre à
// côté avec aplomb. Chaque réponse annonce d'où elle vient.
// ═══════════════════════════════════════════════════════════════════════════

const propre = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const SOURCE = '\n\n_Réponse tirée de la base d’Œno, sans connexion à mon cerveau distant._'

// Les plats tels qu'on les nomme, vers les familles que le guide connaît.
const PLATS = [
  ['fromage',        /raclette|fondue|tartiflette|fromage|camembert|comte|chevre|roquefort|mont d or/],
  ['poisson',        /poisson|saumon|cabillaud|thon|sole|bar\b|dorade|huitre|moule|crevette|crustace|fruits? de mer|sushi|coquille|homard/],
  ['grillades',      /barbecue|grillade|merguez|saucisse|brochette|plancha/],
  ['viande_rouge',   /boeuf|steak|entrecote|bavette|cote de|agneau|gigot|gibier|magret|canard|daube|bourguignon|pot au feu|burger/],
  ['viande_blanche', /poulet|volaille|dinde|porc|veau|lapin|blanquette|roti/],
  ['pates',          /pates|pizza|lasagne|risotto|spaghetti|carbonara|bolognaise|ravioli|gnocchi/],
  ['apero',          /apero|aperitif|tapas|charcuterie|saucisson|planche/],
  ['vege',           /salade|legume|vegetarien|vegan|quiche|ratatouille|soupe|tofu/],
]

const euros = v => (v.prixMoyen ? ` (~${v.prixMoyen} €)` : '')

function surUnVin(v, q) {
  const nom = `**${v.appellation}**`
  if (/temperature|servir|service|degre|frais|frigo|chambre/.test(q) && v.serviceTemp) {
    return `${nom} se sert autour de **${v.serviceTemp} °C**.` +
      (v.type === 'red' ? ' Un rouge servi trop chaud paraît lourd : un quart d’heure au frais avant de l’ouvrir suffit souvent.' : '')
  }
  if (/caraf|aerer|decant|ouvrir a l avance/.test(q)) {
    return v.carafage
      ? `${nom} gagne à être carafé : **${v.carafage}** avant de servir.`
      : `${nom} n’a pas besoin de carafe : ouvrez et servez.`
  }
  if (/garde|garder|conserv|vieill|attendre|quand (le |la |l )?(boire|ouvrir)|apogee/.test(q) && v.drinkUntil) {
    const annees = millesimesAPrivilegier(v, 3)
    return `${nom} se boit en général entre **${v.drinkFrom || 1} et ${v.drinkUntil} ans** après son millésime.` +
      (annees.length ? ` Millésimes à privilégier : ${annees.join(', ')}.` : '') +
      ' C’est un repère d’appellation : une grande cuvée tient plus longtemps.'
  }
  if (/millesime|quelle annee|bonne annee|bonnes annees/.test(q)) {
    const annees = millesimesAPrivilegier(v, 3)
    if (annees.length) return `Pour ${nom}, demandez en priorité : **${annees.join(', ')}**.`
  }
  if (/avec quoi|accompagn|manger|plat|accord|servir avec|cuisin/.test(q) && v.accords?.length) {
    return `${nom} s’accorde bien avec : ${v.accords.slice(0, 5).join(', ')}.`
  }
  // Un vin nommé, sans question précise reconnue : sa fiche en trois lignes.
  const lignes = [`${nom} — ${v.region}${euros(v)}.`]
  if (v.enUneMot) lignes.push(`En un mot : « ${v.enUneMot} ».`)
  if (v.accords?.length) lignes.push(`À table : ${v.accords.slice(0, 3).join(', ')}.`)
  if (v.serviceTemp) lignes.push(`Service : ${v.serviceTemp} °C${v.carafage ? `, carafe ${v.carafage}` : ''}.`)
  return lignes.join('\n')
}

/**
 * Une réponse en markdown, ou `null` si la question dépasse ce que la base
 * sait dire. `options.profilGout` affine le conseil d'accord, s'il est connu.
 */
export function repondreLocalement(question, options = {}) {
  const q = propre(question).replace(/['’]/g, ' ')
  if (q.trim().length < 3) return null

  // 1. Un vin est nommé : on parle de lui.
  const [vin] = vinsCites(question)
  if (vin) return surUnVin(vin, q) + SOURCE

  // 2. Un plat est nommé : que boire avec.
  const plat = PLATS.find(([, motif]) => motif.test(q))
  if (plat) {
    const vins = recommander({ direction: 'ce-soir', plat: plat[0] }, { profilGout: options.profilGout || null }).slice(0, 3)
    if (vins.length) {
      return 'Trois pistes qui marchent bien :\n' +
        vins.map(v => `- **${v.appellation}** (${v.region}${v.prixMoyen ? `, ~${v.prixMoyen} €` : ''})${v.enUneMot ? ` — ${v.enUneMot}` : ''}`).join('\n') +
        '\n\nPour affiner selon votre budget et vos goûts, l’onglet **Trouver** pose trois questions.' + SOURCE
    }
  }

  // 3. Un mot du vin : sa définition, celle du glossaire.
  const terme = GLOSSAIRE_LIST.find(g => {
    const t = propre(g.terme).replace(/s$/, '')
    return t.length > 3 && new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(q)
  })
  if (terme) return `**${terme.terme}** — ${terme.simple}` + SOURCE

  return null
}
