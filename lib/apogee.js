// ═══════════════════════════════════════════════════════════════════════════
// La fenêtre de garde d'une bouteille, et ce qu'on en dit.
//
// Le calcul existait en deux exemplaires (le compteur de la cave, la
// suggestion du jour), chacun avec ses défauts de repli recopiés. Aucun ne
// savait dire la chose qui compte le plus pour une cave : « celle-ci, il faut
// l'ouvrir maintenant, après il sera trop tard ».
//
// Une cave n'est pas un coffre : un vin oublié s'y abîme. D'où quatre états,
// et une liste « à ouvrir sans tarder » qui remonte en tête de cave.
//
// Portée honnête : la fenêtre vient de l'appellation et du millésime, pas de
// la bouteille. Un grand domaine tient plus longtemps que la moyenne de son
// appellation, une cave trop chaude raccourcit tout. C'est un repère, écrit
// comme tel à l'écran — jamais un verdict.
// ═══════════════════════════════════════════════════════════════════════════

// Replis quand la fiche ne dit rien : un vin courant se boit entre deux et
// huit ans. Les mêmes valeurs servaient déjà aux deux anciens calculs.
const DEBUT_PAR_DEFAUT = 2
const FIN_PAR_DEFAUT = 8

/** Les bornes de la fenêtre, en années civiles. `null` sans millésime. */
export function fenetreDeGarde(vin) {
  const millesime = Number(vin?.vintage)
  if (!millesime) return null
  return {
    debut: millesime + (Number(vin.drinkFrom) || DEBUT_PAR_DEFAUT),
    fin:   millesime + (Number(vin.drinkUntil) || FIN_PAR_DEFAUT),
  }
}

/**
 * Où en est la bouteille : 'trop-tot' | 'a-point' | 'derniere-annee' |
 * 'passee', ou `null` si l'on ne peut rien en dire (pas de millésime).
 */
export function etatDeGarde(vin, annee = new Date().getFullYear()) {
  const f = fenetreDeGarde(vin)
  if (!f) return null
  if (annee < f.debut) return 'trop-tot'
  if (annee > f.fin) return 'passee'
  if (annee === f.fin) return 'derniere-annee'
  return 'a-point'
}

/** Vrai dans la fenêtre, dernière année comprise. */
export function estAPoint(vin, annee) {
  const e = etatDeGarde(vin, annee)
  return e === 'a-point' || e === 'derniere-annee'
}

/**
 * Les bouteilles qu'il ne faut plus faire attendre : celles dont la fenêtre
 * se referme cette année, puis celles qui l'ont dépassée — de la plus
 * pressante à la moins pressante. Les bouteilles vides et les bouteilles
 * d'exemple n'y figurent pas : on n'alerte pas sur ce qu'on ne possède pas.
 */
export function aOuvrirSansTarder(cave = [], annee = new Date().getFullYear()) {
  return cave
    .filter(v => v && !v.demo && (v.quantity || 0) > 0)
    .map(v => ({ vin: v, etat: etatDeGarde(v, annee), fin: fenetreDeGarde(v)?.fin }))
    .filter(x => x.etat === 'derniere-annee' || x.etat === 'passee')
    // La dernière année d'abord (il est encore temps), puis les dépassées,
    // les plus récemment dépassées en premier (les plus sauvables).
    .sort((a, b) => (a.etat === b.etat ? b.fin - a.fin : a.etat === 'derniere-annee' ? -1 : 1))
}

/** Ce qu'on écrit à côté de la bouteille. Une phrase, sans jargon. */
export function libelleDeGarde(vin, annee = new Date().getFullYear()) {
  const f = fenetreDeGarde(vin)
  const etat = etatDeGarde(vin, annee)
  if (!f || !etat) return ''
  if (etat === 'trop-tot') return `À attendre jusqu’en ${f.debut}`
  if (etat === 'a-point') return `À boire jusqu’en ${f.fin}`
  if (etat === 'derniere-annee') return 'À ouvrir cette année'
  return `Fenêtre dépassée depuis ${f.fin}`
}
