// ── Partage d'un vin (Web Share API, repli presse-papier) ────────────────────
// Sur mobile : feuille de partage native (WhatsApp, SMS, etc.).
// Sur PC / navigateurs sans partage : copie d'un petit texte dans le presse-papier.
export async function partagerVin(wine) {
  if (!wine) return 'rien'
  const nom = wine.appellation || wine.name || 'Ce vin'
  const bits = [
    `🍷 Coup de cœur : ${nom}`,
    wine.region ? `(${wine.region}${wine.typeLabel ? ', ' + wine.typeLabel.toLowerCase() : ''})` : '',
    wine.enUneMot ? `« ${wine.enUneMot} »` : '',
    wine.prixMoyen ? `~${wine.prixMoyen} €` : '',
    '— découvert avec Œno',
  ].filter(Boolean)
  const text = bits.join(' ')
  const url = typeof window !== 'undefined' ? window.location.origin : ''

  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: `Œno — ${nom}`, text, url })
      return 'partage'
    }
  } catch (e) {
    if (e?.name === 'AbortError') return 'annule' // l'utilisateur a fermé la feuille
    /* partage indisponible : on tente la copie */
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`)
    return 'copie'
  } catch { return 'rien' }
}
