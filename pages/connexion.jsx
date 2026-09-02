import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// ═══════════════════════════════════════════════════════════════════════════
// Le lien de connexion atterrit ici — et c'est tout l'intérêt.
//
// Le lien d'origine pointait vers `<projet>.supabase.co`, un domaine
// étranger à Œno. Or Android ne confie à une application installée que les
// adresses de SON périmètre : un lien vers supabase.co ne pouvait, par
// construction, que s'ouvrir dans le navigateur. La session se déposait
// donc à côté de l'application, jamais dedans.
//
// En faisant pointer le lien vers `{{ .SiteURL }}/connexion`, il redevient
// une adresse d'Œno : le système peut l'ouvrir dans l'application installée,
// et la cave se débloque là où l'utilisateur l'attend. Sur un poste sans
// application installée, la même page fonctionne dans le navigateur.
//
// C'est le pendant du code à 6 chiffres, pas son remplaçant : le code sert
// quand le lien n'aboutit pas là où il faut (iOS, où l'app installée ne
// partage pas le stockage du navigateur, ou email lu sur un autre appareil).
// ═══════════════════════════════════════════════════════════════════════════

const RETOUR = '/'

export default function Connexion() {
  const [etat, setEtat] = useState('verification') // verification | echec
  const [motif, setMotif] = useState('')

  useEffect(() => {
    if (!supabase) { setEtat('echec'); setMotif('indisponible'); return }

    const params = new URLSearchParams(window.location.search)
    const tokenHash = params.get('token_hash')
    // Le type dépend du gabarit qui a produit le lien (première connexion ou
    // retour) : on le laisse voyager dans l'adresse plutôt que de le deviner.
    const type = params.get('type') || 'email'

    // Pas de jeton : soit le lien est tronqué (certains clients mail coupent
    // les longues adresses), soit la page a été ouverte à la main.
    if (!tokenHash) { setEtat('echec'); setMotif('sans-jeton'); return }

    let vivant = true
    ;(async () => {
      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      if (!vivant) return
      if (error) { setEtat('echec'); setMotif('refuse'); return }
      // La session est posée : on entre dans l'app, sans laisser le jeton
      // dans l'historique du navigateur.
      window.location.replace(RETOUR)
    })()
    return () => { vivant = false }
  }, [])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: 'var(--fond, #faf9f7)' }}
    >
      {etat === 'verification' ? (
        <>
          <div className="text-3xl" aria-hidden="true">🍷</div>
          <p className="font-serif text-lg text-anthracite-900">Ouverture de votre cave…</p>
          <p className="text-xs text-anthracite-500" role="status">Un instant, on vérifie votre lien.</p>
        </>
      ) : (
        <>
          <div className="text-3xl" aria-hidden="true">🍷</div>
          <h1 className="font-serif text-lg text-anthracite-900">Ce lien n’a pas fonctionné</h1>
          <p className="text-xs text-anthracite-500 leading-relaxed max-w-xs">
            {motif === 'indisponible'
              ? 'La sauvegarde en ligne n’est pas configurée sur cette installation d’Œno.'
              : motif === 'sans-jeton'
                ? 'Cette adresse ne contient pas de jeton de connexion. Certains logiciels de messagerie coupent les liens trop longs : le code à 6 chiffres du même email fonctionne toujours.'
                : 'Il a peut-être expiré, ou déjà servi. Demandez-en un nouveau depuis Œno — le code à 6 chiffres du même email fonctionne aussi.'}
          </p>
          <a href={RETOUR} className="btn-primary text-xs mt-2">Revenir dans Œno</a>
        </>
      )}
    </main>
  )
}
