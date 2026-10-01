import PageLegale, { CONTACT } from '../components/PageLegale'

// La politique de confidentialité, exigée par Google Play et par le formulaire
// « Sécurité des données ». Elle décrit ce que fait réellement le code — à
// tenir à jour à chaque nouveau service tiers, sans quoi elle ment.

export default function Confidentialite() {
  return (
    <PageLegale titre="Confidentialité" majLe="1er octobre 2026">
      <section>
        <h2>L’essentiel</h2>
        <p>
          Œno fonctionne sans compte. Votre cave, votre journal, vos envies et votre
          profil de goût sont enregistrés <strong>sur votre appareil</strong>, et n’en
          sortent que si vous le demandez. Œno ne contient ni publicité, ni outil de
          mesure d’audience, ni traceur. Rien n’est vendu ni cédé.
        </p>
      </section>

      <section>
        <h2>Si vous créez un compte</h2>
        <p>
          Le compte sert à sauvegarder vos données et à les retrouver sur un autre
          appareil, ainsi qu’à partager votre cave avec des amis. Il contient votre
          adresse email, une copie de vos données Œno, votre pseudo et votre photo de
          profil si vous en choisissez une, vos amitiés et vos messages.
        </p>
        <p>
          Ces données sont hébergées par Supabase, dans l’Union européenne
          (Francfort). Votre adresse ne sert qu’à vous envoyer le lien et le code de
          connexion.
        </p>
      </section>

      <section>
        <h2>Les fonctions d’intelligence artificielle</h2>
        <p>
          Quand vous scannez une étiquette, posez une question au sommelier ou
          demandez un accord pour un plat photographié, la photo ou le texte concerné
          est transmis à un fournisseur d’IA pour obtenir la réponse : Anthropic,
          Groq ou Google (Gemini), et Tavily pour une recherche web. Seul ce contenu
          est envoyé — jamais votre cave entière, ni votre adresse email. Ces
          fonctions sont facultatives ; le reste d’Œno marche sans elles.
        </p>
      </section>

      <section>
        <h2>Notifications et carte</h2>
        <ul>
          <li>
            Si vous autorisez les notifications, une adresse d’envoi fournie par votre
            navigateur est enregistrée pour vous prévenir quand un ami vous écrit.
          </li>
          <li>
            La carte des vignobles charge ses fonds de carte chez CARTO et
            OpenStreetMap, qui reçoivent donc votre adresse IP comme pour toute
            image chargée sur le web.
          </li>
        </ul>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez à tout moment exporter vos données (Compte → Exporter mes
          données), les effacer de l’appareil, ou{' '}
          <a href="/suppression-compte">supprimer votre compte</a> et tout ce qu’il
          contient. Pour toute question, ou pour exercer vos droits d’accès et de
          rectification : <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </section>

      <section>
        <h2>Âge</h2>
        <p>
          Œno parle de vin : l’application est réservée aux personnes majeures.
          L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
        </p>
      </section>
    </PageLegale>
  )
}
