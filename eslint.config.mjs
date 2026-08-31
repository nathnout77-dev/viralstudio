// Lint volontairement étroit : uniquement les règles qui attrapent de vrais
// plantages. Les règles des hooks React dénoncent deux familles de bugs
// réels — un hook appelé sous condition (plantage à l'exécution) et une
// dépendance d'effet oubliée (état figé, rafraîchissement fantôme). Pas de
// règles de style : le style, c'est le voisinage qui le donne.
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['components/**/*.jsx', 'pages/**/*.jsx', 'lib/**/*.js'],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]
