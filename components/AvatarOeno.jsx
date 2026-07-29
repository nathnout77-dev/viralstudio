import { useState, useEffect } from 'react'
import { lireAvatar, lirePseudo, initiale, AVATAR_EVENT } from '../lib/avatar'
import LogoOeno from './LogoOeno'

// ═══════════════════════════════════════════════════════════════════════════
// L'avatar du compte — il remplace l'emblème Œno en tête de l'app.
//
// Trois états, dans cet ordre : la photo si l'utilisateur en a choisi une,
// sinon l'initiale de son pseudo, sinon l'emblème Œno (installation neuve,
// sans nom ni compte : mieux vaut la marque qu'un rond vide).
//
// Ce fichier est chargé au premier rendu : il ne lit que le stockage local et
// n'entraîne aucune dépendance réseau. Tout ce qui touche au compte distant
// vit dans l'éditeur (AvatarProfil), chargé seulement à l'ouverture.
// ═══════════════════════════════════════════════════════════════════════════

export const FOND_AVATAR = 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)'

/**
 * Photo et pseudo courants, tenus à jour d'un composant à l'autre : changer
 * sa photo dans l'éditeur rafraîchit la barre du haut et la colonne de
 * gauche sans recharger la page.
 */
export function useIdentite() {
  const [identite, setIdentite] = useState({ avatar: null, pseudo: null })

  useEffect(() => {
    const relire = () => setIdentite({ avatar: lireAvatar(), pseudo: lirePseudo() })
    relire()
    const surStockage = e => {
      if (e.key === 'oeno-avatar' || e.key === 'oeno-pseudo') relire()
    }
    window.addEventListener(AVATAR_EVENT, relire)
    window.addEventListener('storage', surStockage)   // autre onglet
    return () => {
      window.removeEventListener(AVATAR_EVENT, relire)
      window.removeEventListener('storage', surStockage)
    }
  }, [])

  return identite
}

/** L'avatar affiché. `prenom` sert de repli quand aucun compte n'est connecté. */
export default function AvatarOeno({ size = 36, prenom = null, onClick = null, className = '' }) {
  const { avatar, pseudo } = useIdentite()
  const lettre = initiale(pseudo || prenom)

  const visuel = avatar ? (
    <img
      src={avatar} alt="Ma photo de profil"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : lettre ? (
    <span
      className="rounded-full flex items-center justify-center text-cream font-serif font-bold"
      style={{ width: size, height: size, background: FOND_AVATAR, fontSize: Math.round(size * 0.44) }}
      aria-hidden="true"
    >
      {lettre}
    </span>
  ) : (
    <LogoOeno size={size} />
  )

  if (!onClick) {
    return <span className={`inline-flex flex-shrink-0 ${className}`}>{visuel}</span>
  }
  return (
    <button
      onClick={onClick}
      aria-label="Ma photo de profil — modifier"
      title="Ma photo de profil"
      className={`inline-flex flex-shrink-0 rounded-full cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 ring-1 ring-gold-500/40 hover:ring-gold-500 ${className}`}
    >
      {visuel}
    </button>
  )
}
