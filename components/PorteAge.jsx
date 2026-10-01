import { useState } from 'react'
import useModalBehavior from '../lib/useModal'
import { ecrireReglage } from '../lib/reglages'

// ═══════════════════════════════════════════════════════════════════════════
// La porte d'entrée : Œno parle d'alcool, et Google Play l'exige pour une
// application de ce genre — public adulte, question posée à l'ouverture.
//
// Une seule fois par appareil, rangée dans les réglages et non dans
// SYNC_KEYS : c'est l'appareil qu'on ouvre, pas le compte (et la plupart des
// usagers n'en ont pas). Elle passe avant le questionnaire d'arrivée — on ne
// demande pas ses goûts en vin à quelqu'un qu'on va ensuite éconduire.
//
// Portée honnête : c'est une déclaration, pas une vérification. Rien ne
// prouve un âge depuis une PWA ; ce qui compte ici est que la question soit
// posée clairement, et que la réponse « non » ferme vraiment la porte.
// Échap ne la ferme pas : il n'y a pas de « plus tard » à cette question.
// ═══════════════════════════════════════════════════════════════════════════

export default function PorteAge({ onMajeur }) {
  useModalBehavior() // verrou du défilement, sans fermeture par Échap
  const [refuse, setRefuse] = useState(false)

  const confirmer = () => {
    try { ecrireReglage('majeur', true) } catch { /* stockage indisponible : on redemandera */ }
    onMajeur()
  }

  return (
    <div
      role="dialog" aria-modal="true" aria-label="Avez-vous 18 ans ?"
      className="fixed inset-0 z-[120] flex items-center justify-center p-6"
      style={{ background: 'rgb(var(--fond))' }}
    >
      <div className="max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-wine-800 flex items-center justify-center mx-auto mb-5 shadow-wine">
          <span className="text-2xl" aria-hidden="true">🍷</span>
        </div>
        {refuse ? (
          <>
            <h1 className="font-serif text-xl text-anthracite-900 mb-2">À bientôt</h1>
            <p className="text-sm text-anthracite-600 leading-relaxed">
              Œno est réservé aux personnes majeures. Revenez nous voir le jour de vos 18 ans.
            </p>
            <button onClick={() => setRefuse(false)} className="mt-6 text-xs text-anthracite-400 underline cursor-pointer">
              Je me suis trompé
            </button>
          </>
        ) : (
          <>
            <h1 className="font-serif text-xl text-anthracite-900 mb-2">Avez-vous 18 ans ou plus ?</h1>
            <p className="text-sm text-anthracite-600 leading-relaxed mb-6">
              Œno parle de vin. Pour l’ouvrir, vous devez avoir l’âge légal de
              consommer de l’alcool.
            </p>
            <div className="flex flex-col gap-2.5">
              <button onClick={confirmer} className="btn-primary justify-center">Oui, j’ai 18 ans ou plus</button>
              <button onClick={() => setRefuse(true)} className="btn-ghost justify-center">Non</button>
            </div>
          </>
        )}
        <p className="text-[11px] text-anthracite-400 mt-8 leading-relaxed">
          L’abus d’alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </div>
  )
}
