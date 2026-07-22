// ─────────────────────────────────────────────────────────────────────────────
// Millésimes à privilégier — logique unique pour toute l'app.
// Croise le guide des millésimes (MILLESIMES_DB) avec la région et la couleur
// du vin : seules les années notées « Privilégier » remontent. Si le guide ne
// couvre pas l'appellation, on se replie sur ses derniers bons millésimes.
// ─────────────────────────────────────────────────────────────────────────────
import { MILLESIMES_DB } from '../data/wineDatabase'

const TYPE_LABEL = { red: 'Rouge', white: 'Blanc', 'rosé': 'Rosé', sweet: 'Liquoreux' }

export function millesimesAPrivilegier(wine, n = 3) {
  if (!wine) return []
  // Vins grand public : pas de logique de garde/terroir — on privilégie
  // simplement le plus récent (ils se boivent jeunes, sur le fruit).
  if (wine.grandPublic) return (wine.bonsMilsimes || []).slice(-n).reverse()
  const label = TYPE_LABEL[wine.type]
  const hits = MILLESIMES_DB
    .filter(m => m[2] === wine.region && m[1] === label && m[7] === 'Privilégier')
    .map(m => m[0])
  const uniq = [...new Set(hits)].sort((a, b) => b - a).slice(0, n)
  if (uniq.length) return uniq
  return (wine.bonsMilsimes || []).slice(-n).reverse()
}

// Le choix n°1 : l'année à demander en priorité chez le caviste.
export const meilleurMillesime = (wine) => millesimesAPrivilegier(wine, 3)[0] ?? null
