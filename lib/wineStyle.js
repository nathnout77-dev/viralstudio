// ── Langage visuel des vins ──────────────────────────────────────────────────
// Ombres colorées, pastilles et monogrammes partagés par toutes les cartes.

/* Ombre teintée selon le type de vin (chantier « matière et lumière »).
   S'utilise avec la classe CSS .card-tinted qui lit la variable --tint. */
export const TYPE_SHADOW = {
  red:       'rgba(92,13,34,0.12)',
  white:     'rgba(161,98,7,0.14)',
  'rosé':    'rgba(194,95,112,0.16)',
  sparkling: 'rgba(59,90,130,0.14)',
  sweet:     'rgba(146,100,14,0.16)',
}

export const tintStyle = (type) => ({ '--tint': TYPE_SHADOW[type] || TYPE_SHADOW.red })

/* Pastille « robe du vin » : dégradé radial riche, remplace les badges texte. */
export const TYPE_PASTILLE = {
  red:       'radial-gradient(circle at 35% 30%, #a63d52 0%, #72102a 55%, #3a0616 100%)',
  white:     'radial-gradient(circle at 35% 30%, #f3e3ae 0%, #d4b45f 55%, #a9862f 100%)',
  'rosé':    'radial-gradient(circle at 35% 30%, #f6c6cf 0%, #e58f8f 55%, #c25f70 100%)',
  sparkling: 'radial-gradient(circle at 35% 30%, #dce9f5 0%, #a8c4dc 55%, #5b8db8 100%)',
  sweet:     'radial-gradient(circle at 35% 30%, #ecc987 0%, #c99a3c 55%, #8a5f14 100%)',
}

export const pastilleStyle = (type) => ({ background: TYPE_PASTILLE[type] || TYPE_PASTILLE.red })

/* Monogramme de région : initiales des mots significatifs (max 2).
   « Bourgogne » → B · « Vallée du Rhône » → VR */
const STOPWORDS = new Set(['du', 'de', 'des', 'la', 'le', 'les', 'et', "d'"])
export function regionMonogram(region = '') {
  const parts = region
    .split(/[\s\-–]+/)
    .map(p => p.replace(/^d'/i, ''))
    .filter(p => p && !STOPWORDS.has(p.toLowerCase()))
  if (parts.length === 0) return '·'
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('')
}

/* Numérotation de collection : « N° 07 » (index stable + 1, padded). */
export const collectionNumero = (index) => `N° ${String(index + 1).padStart(2, '0')}`
