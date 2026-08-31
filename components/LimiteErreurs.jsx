import { Component } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Le filet sous l'application entière.
//
// Sans limite d'erreur, une exception dans n'importe quel composant démonte
// tout l'arbre React : écran noir, sans un mot, et l'utilisateur croit ses
// données perdues. C'est déjà arrivé en production (l'import manquant du
// scan). Le garde-fou des imports attrape cette famille-là à la build ;
// cette limite attrape tout le reste — à l'exécution, chez l'utilisateur.
//
// Le message dit l'essentiel : rien n'est perdu. Les données vivent dans
// localStorage, qu'un plantage d'affichage ne touche pas. Recharger suffit
// presque toujours ; c'est le seul bouton proposé.
//
// Les styles sont posés en ligne, à dessein : si c'est la chaîne CSS
// elle-même qui a cassé, l'écran de secours doit rester lisible.
// ═══════════════════════════════════════════════════════════════════════════

export default class LimiteErreurs extends Component {
  state = { erreur: null }

  static getDerivedStateFromError(erreur) {
    return { erreur }
  }

  componentDidCatch(erreur, infos) {
    // La console, pas un serveur : Œno ne téléphone pas à la maison.
    console.error('Œno — plantage attrapé :', erreur, infos?.componentStack)
  }

  render() {
    if (!this.state.erreur) return this.props.children
    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 16,
          padding: 24, textAlign: 'center', background: '#faf9f7',
          color: '#292524', fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 40 }} aria-hidden="true">🍷</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          Œno a trébuché
        </h1>
        <p style={{ maxWidth: 420, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Une erreur d’affichage a interrompu l’application. Votre cave, votre
          journal et vos envies sont intacts : ils sont enregistrés sur cet
          appareil, pas dans l’écran. Recharger suffit en général.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 24px', borderRadius: 12, border: 'none',
            background: '#5c0d22', color: '#f7f3ee', fontSize: 14,
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          Recharger Œno
        </button>
      </div>
    )
  }
}
