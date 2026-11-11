import { originePublique } from '../lib/serveur/origine'

// Le plan du site, servi à la demande. Un fichier statique ne pouvait porter
// que des adresses relatives — que les moteurs refusent — faute de connaître
// le domaine. Ici il se lit dans la requête.
const PAGES = ['/', '/confidentialite', '/suppression-compte']

export async function getServerSideProps({ req, res }) {
  const base = originePublique(req)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url><loc>${base}${p}</loc><changefreq>${p === '/' ? 'weekly' : 'yearly'}</changefreq></url>`).join('\n')}
</urlset>
`
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Sitemap() { return null }
