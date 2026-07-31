// ═══════════════════════════════════════════════════════════════════════════
// Décision de fusion, au moment où un compte se connecte sur un appareil.
//
// Extrait de CompteSync pour une raison précise : c'est le seul endroit de
// l'app où une erreur fait **perdre la cave de quelqu'un**. Tant que la
// décision vivait dans un `useEffect`, elle ne pouvait être vérifiée qu'en
// montant React et en simulant Supabase — autant dire jamais. Ici, c'est une
// fonction pure : on peut lui présenter les quatre situations et vérifier
// qu'elle ne se trompe pas.
//
// Le parti pris tient en une phrase : **on n'écrase jamais des données sans
// que l'utilisateur l'ait demandé**. Quand les deux côtés ont du contenu et
// qu'ils diffèrent, l'app ne tranche pas — elle demande.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Une valeur « vide » au sens de la synchronisation : rien à perdre si elle
 * est remplacée. `0` et `false` n'apparaissent pas ici — les snapshots ne
 * contiennent que des tableaux et des objets.
 */
export function estVide(v) {
  return (
    v === null || v === undefined ||
    (Array.isArray(v) && v.length === 0) ||
    (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)
  )
}

/** Un snapshot est vide si *toutes* ses rubriques le sont. */
export function toutVide(snap) {
  if (!snap) return true
  return Object.values(snap).every(estVide)
}

/**
 * Quoi faire, sachant ce qu'il y a des deux côtés.
 *
 *   'pousser'    le cloud n'a rien → le local fait foi
 *   'recuperer'  le local n'a rien → le cloud fait foi
 *   'identique'  rien à faire
 *   'conflit'    les deux ont du contenu, et il diffère → demander
 *
 * L'ordre des tests compte : deux côtés vides donnent 'pousser', ce qui est
 * sans effet et évite de poser une question sur un choix qui n'en est pas un.
 */
export function decisionFusion(local, cloud) {
  if (toutVide(cloud)) return 'pousser'
  if (toutVide(local)) return 'recuperer'
  return memeContenu(local, cloud) ? 'identique' : 'conflit'
}

/**
 * Comparaison de deux snapshots. `JSON.stringify` direct ne suffirait pas :
 * les rubriques absentes d'un côté et nulles de l'autre décrivent le même
 * néant, et l'ordre des clés d'un objet venu de la base n'a aucune raison de
 * coïncider avec celui du local. Les faire diverger déclencherait un conflit
 * fantôme — l'utilisateur à qui on demande de choisir entre deux caves
 * identiques.
 */
export function memeContenu(a, b) {
  const cles = new Set([...Object.keys(a || {}), ...Object.keys(b || {})])
  for (const c of cles) {
    const va = a?.[c], vb = b?.[c]
    if (estVide(va) && estVide(vb)) continue
    if (stable(va) !== stable(vb)) return false
  }
  return true
}

/** Sérialisation indépendante de l'ordre des clés. */
function stable(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v ?? null)
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`
  return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`
}
