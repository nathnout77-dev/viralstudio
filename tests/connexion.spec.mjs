import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// La page où atterrit le lien de connexion.
//
// Elle existe pour une raison précise : le lien pointait vers
// `<projet>.supabase.co`, un domaine étranger à Œno. Android ne confie à une
// application installée que les adresses de SON périmètre — ce lien-là ne
// pouvait donc, par construction, aboutir que dans le navigateur, et la
// session se déposait à côté de l'application au lieu d'y entrer.
//
// Ce que ce test protège n'est pas l'échange du jeton (il faudrait un vrai
// serveur d'authentification) mais quelque chose de plus fondamental : cette
// page est le point d'arrivée d'un email, atteint par des gens perdus, hors
// de tout contexte applicatif. Elle ne doit JAMAIS être un écran mort —
// toujours dire ce qui se passe, et toujours offrir une porte de sortie.
// ═══════════════════════════════════════════════════════════════════════════

const ADRESSES = [
  ['sans jeton',       '/connexion'],
  ['jeton illisible',  '/connexion?token_hash=nimporte-quoi&type=magiclink'],
  ['type inattendu',   '/connexion?token_hash=abc&type=fantaisie'],
]

for (const [nom, adresse] of ADRESSES) {
  test(`« ${nom} » : la page dit ce qui se passe et laisse repartir`, async ({ page }) => {
    const incidents = []
    page.on('pageerror', e => incidents.push(e.message))
    await page.goto(adresse)

    // Jamais un écran blanc : une explication, et un chemin de retour.
    await expect(page.getByRole('heading', { name: /Ce lien n’a pas fonctionné/ })).toBeVisible()
    const retour = page.getByRole('link', { name: /Revenir dans Œno/ })
    await expect(retour).toBeVisible()

    // Et ce chemin ramène vraiment dans l'application.
    await retour.click()
    await expect(page).toHaveURL(/\/$/)
    expect(incidents).toEqual([])
  })
}
