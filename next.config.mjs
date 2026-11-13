/** @type {import('next').NextConfig} */
const nextConfig = {
  // Le badge d'outils de Next (développement seulement) se pose en bas à
  // gauche, pile sur « Découvrir » de la barre du téléphone : il interceptait
  // les clics des parcours de test.
  devIndicators: false,
  // Android lit /.well-known/assetlinks.json pour lier le domaine à
  // l'application Play Store (scripts/assetlinks.mjs). Il l'exige servi en
  // JSON ; sans cet en-tête, l'extension inconnue du dossier ne le garantit pas.
  async headers() {
    return [{
      source: '/.well-known/assetlinks.json',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
    }]
  },
}
export default nextConfig
