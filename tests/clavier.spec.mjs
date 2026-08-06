import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// Naviguer Œno au clavier.
//
// Une fenêtre ouverte était un cul-de-sac : tabuler s'en échappait vers la
// navigation et l'écran masqués derrière, sans jamais pouvoir revenir aux
// boutons de la fenêtre. Pour qui n'utilise pas de souris — clavier seul,
// lecteur d'écran, commande vocale — l'application devenait inutilisable dès
// la première modale.
//
// Le piège vit dans `lib/focusModale.js`, posé une seule fois pour toutes les
// fenêtres : dix-sept dialogues et dix-neuf appels au hook des modales ne se
// recouvraient pas, et cinq calques n'étaient même pas déclarés comme
// dialogues. Câbler modale par modale aurait laissé la prochaine repartir
// sans rien — c'est la leçon du bouton « ajouter à ma cave ».
// ═══════════════════════════════════════════════════════════════════════════

const FENETRES = ['Recherche', 'Compte', 'Réglages', 'Assistant', 'Tout Œno']

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('landing-seen', '1')
    localStorage.setItem('oeno-tour-v1', '1')
    localStorage.setItem('oeno-profil', JSON.stringify({ mode: 'amateur', gouts: {} }))
  })
})

/** Le focus est-il dans la fenêtre du dessus ? `null` = aucune fenêtre. */
const dansLaFenetre = page => page.evaluate(() => {
  const d = [...document.querySelectorAll('[role="dialog"]')].pop()
  return d ? d.contains(document.activeElement) : null
})

for (const nom of FENETRES) {
  test(`« ${nom} » : le clavier ne s’échappe pas de la fenêtre`, async ({ page }) => {
    await page.goto('/')
    const ouvrir = page.getByRole('button', { name: nom, exact: true })
    await ouvrir.focus()
    const avant = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 24))
    await page.keyboard.press('Enter')

    // La fenêtre doit se déclarer comme telle : sans `role="dialog"`, un
    // lecteur d'écran ne dit pas qu'on vient d'entrer quelque part.
    await expect
      .poll(() => page.locator('[role="dialog"]').count())
      .toBeGreaterThan(0)

    // Le focus entre.
    expect(await dansLaFenetre(page)).toBe(true)

    // Et il y reste, dans les deux sens.
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab')
      expect(await dansLaFenetre(page)).toBe(true)
    }
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Shift+Tab')
      expect(await dansLaFenetre(page)).toBe(true)
    }

    // À la fermeture, le focus revient d'où il venait : sinon il repart au
    // début de la page et il faut tout retraverser.
    await page.keyboard.press('Escape')
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 24)))
      .toBe(avant)
  })
}

test('toute fenêtre ouverte porte un nom annonçable', async ({ page }) => {
  // Une page neuve par fenêtre : certaines ne se ferment pas par Échap, et
  // l'on testerait alors le nom de la précédente restée ouverte.
  for (const nom of FENETRES) {
    await page.goto('/')
    await page.getByRole('button', { name: nom, exact: true }).click()
    await expect.poll(() => page.locator('[role="dialog"]').count()).toBeGreaterThan(0)
    const sansNom = await page.evaluate(() =>
      [...document.querySelectorAll('[role="dialog"]')]
        .filter(d => !d.getAttribute('aria-label') && !d.getAttribute('aria-labelledby')).length)
    expect(sansNom, `« ${nom} » ouvre un dialogue sans nom accessible`).toBe(0)
  }
})
