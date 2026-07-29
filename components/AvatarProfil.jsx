import { useState, useEffect, useCallback } from 'react'
import { Camera, Trash2, X, Loader2, Check } from 'lucide-react'
import { ecrireAvatar, ecrirePseudo, compresserImage, initiale } from '../lib/avatar'
import { utilisateurCourant, definirPseudo, cloudDisponible } from '../lib/social'
import AvatarOeno, { useIdentite, FOND_AVATAR } from './AvatarOeno'
import useModalBehavior from '../lib/useModal'
import LogoOeno from './LogoOeno'
import { toast } from './Toast'

// ═══════════════════════════════════════════════════════════════════════════
// Éditeur de la photo de profil — ouvert en cliquant son propre avatar.
//
// Chargé à la demande seulement : c'est ici que vivent le client Supabase et
// la mécanique de compression, dont la barre du haut n'a pas besoin.
// ═══════════════════════════════════════════════════════════════════════════

export default function AvatarEditeur({ onClose, prenom = null }) {
  useModalBehavior(onClose)
  const { avatar, pseudo } = useIdentite()

  const [occupe, setOccupe]     = useState(false)
  const [erreur, setErreur]     = useState(null)
  const [connecte, setConnecte] = useState(false)
  const [nom, setNom]           = useState('')
  const [nomEnregistre, setNomEnregistre] = useState(false)

  useEffect(() => {
    let vivant = true
    utilisateurCourant().then(u => { if (vivant) setConnecte(Boolean(u)) })
    return () => { vivant = false }
  }, [])

  useEffect(() => { setNom(pseudo || '') }, [pseudo])

  const choisir = useCallback(async e => {
    const fichier = e.target.files?.[0]
    e.target.value = '' // permet de re-choisir le même fichier ensuite
    if (!fichier) return
    setErreur(null)
    setOccupe(true)
    try {
      ecrireAvatar(await compresserImage(fichier))
      toast('Photo de profil mise à jour')
    } catch (err) {
      setErreur(err?.message || 'Cette photo n’a pas pu être enregistrée.')
    } finally {
      setOccupe(false)
    }
  }, [])

  const retirer = useCallback(() => {
    ecrireAvatar(null)
    setErreur(null)
    toast('Photo retirée')
  }, [])

  const enregistrerNom = useCallback(async e => {
    e.preventDefault()
    const propre = nom.trim()
    if (!propre || propre === pseudo) return
    setOccupe(true)
    const r = await definirPseudo(propre)
    setOccupe(false)
    if (r.ok) {
      ecrirePseudo(propre)
      setNomEnregistre(true)
      setTimeout(() => setNomEnregistre(false), 2000)
      toast('Pseudo mis à jour')
    } else {
      setErreur('Ce pseudo n’a pas pu être enregistré.')
    }
  }, [nom, pseudo])

  const lettre = initiale(pseudo || prenom)

  return (
    <div className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center scrim animate-fade-in" onClick={onClose}>
      <div className="modal-panel max-w-sm sm:mx-4 max-h-[90dvh]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-anthracite-900/[0.07]">
          <div>
            <span className="eyebrow">Mon profil</span>
            <h2 className="font-serif text-lg font-bold text-anthracite-900 leading-tight">Ma photo</h2>
          </div>
          <button onClick={onClose} aria-label="Fermer"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-anthracite-400 hover:text-anthracite-800 hover:bg-anthracite-900/5 transition-all cursor-pointer">
            <X size={17} />
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          {/* Aperçu */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {avatar ? (
                <img src={avatar} alt="Ma photo de profil"
                     className="w-24 h-24 rounded-full object-cover shadow-wine ring-2 ring-gold-500/40" />
              ) : lettre ? (
                <span className="w-24 h-24 rounded-full flex items-center justify-center text-cream font-serif font-bold text-4xl shadow-wine"
                      style={{ background: FOND_AVATAR }} aria-hidden="true">
                  {lettre}
                </span>
              ) : (
                <LogoOeno size={96} />
              )}
              {occupe && (
                <span className="absolute inset-0 rounded-full flex items-center justify-center bg-nuit/50">
                  <Loader2 size={22} className="text-gold-400 animate-spin" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-anthracite-400 text-center leading-relaxed mt-3 max-w-[16rem]">
              {avatar
                ? 'Vos amis voient cette photo dans vos conversations.'
                : lettre
                  ? 'À défaut de photo, c’est l’initiale de votre pseudo qui s’affiche.'
                  : 'Choisissez une photo, ou donnez-vous un pseudo : son initiale servira d’avatar.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="avatar-fichier" className="btn-gold w-full justify-center text-xs cursor-pointer">
              <Camera size={14} />
              {avatar ? 'Changer de photo' : 'Choisir une photo'}
              <input
                id="avatar-fichier" type="file" accept="image/*"
                onChange={choisir} disabled={occupe} className="hidden"
              />
            </label>
            {avatar && (
              <button onClick={retirer} disabled={occupe} className="btn-ghost w-full justify-center text-xs disabled:opacity-50">
                <Trash2 size={12} /> Retirer la photo
              </button>
            )}
          </div>

          {erreur && <p className="text-xs text-red-700 mt-3">{erreur}</p>}

          {/* Le pseudo que les amis voient */}
          {cloudDisponible && connecte && (
            <form onSubmit={enregistrerNom} className="mt-5 pt-5 border-t border-anthracite-900/[0.07]">
              <label className="label" htmlFor="avatar-pseudo">Mon pseudo</label>
              <div className="flex gap-2">
                <input
                  id="avatar-pseudo" type="text" value={nom}
                  onChange={e => setNom(e.target.value)} maxLength={24}
                  placeholder="Comment vos amis vous voient" className="input-field flex-1"
                />
                <button type="submit" disabled={occupe || !nom.trim() || nom.trim() === pseudo}
                        className="btn-primary text-xs px-4 flex-shrink-0 disabled:opacity-40">
                  {nomEnregistre ? <Check size={13} /> : 'Changer'}
                </button>
              </div>
            </form>
          )}

          <p className="text-[11px] text-anthracite-400 leading-relaxed mt-5">
            La photo est réduite puis gardée sur cet appareil. Connecté, Œno en dépose une
            copie dans votre profil pour vos amis — elle ne sert à rien d’autre.
          </p>
        </div>
      </div>
    </div>
  )
}

export { AvatarOeno }
