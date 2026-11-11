import { originePublique } from '../lib/serveur/origine'

// Même raison que le sitemap : la ligne « Sitemap: » exige une adresse absolue.
export async function getServerSideProps({ req, res }) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.write(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /connexion\n\nSitemap: ${originePublique(req)}/sitemap.xml\n`)
  res.end()
  return { props: {} }
}

export default function Robots() { return null }
