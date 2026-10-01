import PageLegale, { CONTACT } from '../components/PageLegale'

// L'adresse que Google Play exige dans la fiche : comment supprimer son compte
// et ce que cela efface. La suppression elle-même se fait dans l'application
// (components/CompteSync.jsx → SupprimerCompte), sans écrire à personne.

export default function SuppressionCompte() {
  return (
    <PageLegale titre="Supprimer votre compte Œno" majLe="1er octobre 2026">
      <section>
        <h2>Depuis l’application</h2>
        <ul>
          <li>Ouvrez Œno, puis <strong>Ma cave → Mon compte &amp; sauvegarde</strong>.</li>
          <li>Touchez <strong>Supprimer mon compte</strong>, tout en bas.</li>
          <li>Confirmez. La suppression est immédiate.</li>
        </ul>
      </section>

      <section>
        <h2>Ce qui est effacé</h2>
        <p>
          Votre compte et votre adresse email, la sauvegarde en ligne de votre cave,
          de votre journal, de vos envies et de votre profil, votre pseudo et votre
          photo, vos amitiés, vos messages envoyés et reçus, et vos abonnements aux
          notifications. Rien n’est conservé.
        </p>
        <p>
          Ce qui est enregistré <strong>sur votre appareil</strong> n’est pas touché,
          sauf si vous cochez « Effacer aussi ma cave et mon journal de cet
          appareil ». Désinstaller l’application l’efface aussi.
        </p>
      </section>

      <section>
        <h2>Sans accès à l’application</h2>
        <p>
          Écrivez à <a href={`mailto:${CONTACT}`}>{CONTACT}</a> depuis l’adresse du
          compte. Nous le supprimons sous 30 jours et vous le confirmons par email.
        </p>
      </section>
    </PageLegale>
  )
}
