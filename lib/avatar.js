// ═══════════════════════════════════════════════════════════════════════════
// La photo de profil — compressée sur l'appareil, stockée en local d'abord.
//
// L'image ne quitte jamais l'appareil telle quelle : elle est recadrée en
// carré et réduite à 256 px avant d'être gardée, ce qui la ramène à quelques
// dizaines de kilo-octets. Aucun espace de stockage distant n'est donc
// nécessaire — la photo tient dans le profil, comme une donnée ordinaire.
//
// Ce module est volontairement sans dépendance : il est lu par la barre du
// haut, donc au tout premier rendu. Supabase n'y est chargé qu'à la demande,
// pour ne pas alourdir le démarrage de l'app d'un client réseau dont
// l'écrasante majorité des écrans n'a pas besoin.
// ═══════════════════════════════════════════════════════════════════════════

const CLE_PHOTO  = 'oeno-avatar'
const CLE_PSEUDO = 'oeno-pseudo'   // copie locale du pseudo, pour l'initiale
export const AVATAR_EVENT = 'oeno-avatar-change'

const COTE    = 256   // px — net sur écran à forte densité, léger en stockage
const QUALITE = 0.72

function lire(cle) {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(cle) || null } catch { return null }
}

function ecrire(cle, valeur) {
  try {
    if (valeur) localStorage.setItem(cle, valeur)
    else localStorage.removeItem(cle)
  } catch { /* stockage plein ou refusé : l'affichage suit quand même */ }
}

function diffuser() {
  try { window.dispatchEvent(new Event(AVATAR_EVENT)) } catch { /* ignore */ }
}

export function lireAvatar() { return lire(CLE_PHOTO) }
export function lirePseudo() { return lire(CLE_PSEUDO) }

/** Mémorise le pseudo du compte pour que l'initiale s'affiche hors ligne. */
export function ecrirePseudo(pseudo) {
  if (lire(CLE_PSEUDO) === (pseudo || null)) return
  ecrire(CLE_PSEUDO, pseudo)
  diffuser()
}

/**
 * Enregistre (ou efface, avec `null`) la photo de profil et prévient toute
 * l'app — barre du haut, colonne de gauche, éditeur — dans le même geste.
 */
export function ecrireAvatar(dataUrl, { cloud = true } = {}) {
  ecrire(CLE_PHOTO, dataUrl)
  diffuser()
  if (cloud) deposerAuCloud(dataUrl)
}

// Le client Supabase n'est tiré qu'ici, à l'usage.
async function client() {
  try { return (await import('./supabase')).supabase } catch { return null }
}

async function deposerAuCloud(dataUrl) {
  try {
    const supabase = await client()
    if (!supabase) return
    const { data } = await supabase.auth.getUser()
    const id = data?.user?.id
    if (!id) return
    await supabase.from('profiles').update({ avatar_url: dataUrl }).eq('id', id)
  } catch { /* colonne absente (migration 004 non appliquée) ou hors ligne */ }
}

/** La photo déposée depuis un autre appareil, s'il y en a une. */
export async function recupererAvatarCloud() {
  try {
    const supabase = await client()
    if (!supabase) return null
    const { data: session } = await supabase.auth.getUser()
    const id = session?.user?.id
    if (!id) return null
    const { data, error } = await supabase.from('profiles')
      .select('avatar_url').eq('id', id).maybeSingle()
    if (error) return null
    return data?.avatar_url || null
  } catch { return null }
}

/**
 * Photo → carré compressé. Le recadrage se fait au centre du plus petit côté :
 * jamais de déformation, et le visage d'un portrait reste dans le cadre.
 */
export function compresserImage(fichier) {
  return new Promise((resolve, reject) => {
    if (!fichier || !String(fichier.type || '').startsWith('image/')) {
      reject(new Error('Ce fichier n’est pas une image.'))
      return
    }
    const lecteur = new FileReader()
    lecteur.onerror = () => reject(new Error('Impossible de lire ce fichier.'))
    lecteur.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Format d’image non reconnu par le navigateur.'))
      image.onload = () => {
        try {
          const cote = Math.min(image.width, image.height)
          if (!cote) throw new Error('vide')
          const toile = document.createElement('canvas')
          toile.width = COTE
          toile.height = COTE
          const ctx = toile.getContext('2d')
          ctx.drawImage(
            image,
            (image.width - cote) / 2, (image.height - cote) / 2, cote, cote,
            0, 0, COTE, COTE,
          )
          resolve(toile.toDataURL('image/jpeg', QUALITE))
        } catch {
          reject(new Error('Cette image n’a pas pu être préparée.'))
        }
      }
      image.src = lecteur.result
    }
    lecteur.readAsDataURL(fichier)
  })
}

/** La lettre affichée à défaut de photo — `null` s'il n'y a aucun nom. */
export function initiale(pseudo) {
  const propre = (pseudo || '').trim()
  return propre ? propre.charAt(0).toUpperCase() : null
}
