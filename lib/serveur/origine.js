// L'adresse publique d'Œno, telle que le visiteur l'a demandée. Sert aux
// fichiers qui exigent des adresses absolues (sitemap, robots) sans graver un
// domaine dans le dépôt : ils suivent celui sur lequel l'app est servie.
export function originePublique(req) {
  const hote = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'
  const proto = req.headers['x-forwarded-proto'] || (String(hote).startsWith('localhost') ? 'http' : 'https')
  return `${String(proto).split(',')[0]}://${hote}`
}
