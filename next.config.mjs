/** @type {import('next').NextConfig} */
const nextConfig = {
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
