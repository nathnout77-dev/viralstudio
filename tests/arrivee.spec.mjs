import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// La marche d'entrée d'un grand débutant.
//
// Ce parcours-là ne pardonne pas : c'est la première minute d'usage, celle
// où l'on décide de rester. Trois choses s'y étaient cassées sans bruit :
// un titre affichant son code (`Voici $🎉 {results.length}`), cinq vins
// recommandés qui s'évaporaient en cul-de-sac, et Échap qui fermait les
// deux fenêtres d'une pile au lieu de celle du dessus.
// ═══════════════════════════════════════════════════════════════════════════

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

async function repondreAuQuestionnaire(page) {
  await page.getByText('Je débute').click()
  await page.getByText('Aucune idée').click()
  await page.getByText('Fruits rouges').click()
  await page.getByText('Léger et facile').click()
  await page.getByText('Moins de 10').click()
  await expect(page.getByText('vins pour démarrer').first()).toBeVisible()
}

test('le questionnaire d’arrivée laisse cinq vins en envies, pas un cul-de-sac', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await page.goto('/')
  await repondreAuQuestionnaire(page)

  // Le titre parle français, pas JavaScript.
  const titre = await page.locator('[role="dialog"]').first().innerText()
  expect(titre).not.toContain('{results')
  expect(titre).not.toContain('$')

  // Une carte s'ouvre en fiche complète, avec le bouton d'ajout ambiant —
  // au-dessus du questionnaire, pas derrière.
  await page.getByRole('dialog').locator('button.card').first().click()
  await expect(page.getByRole('dialog', { name: 'Fiche du vin' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Ajouter à ma cave/ }).first()).toBeVisible()

  // Échap ne ferme que la fenêtre du dessus : le questionnaire reste là.
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Fiche du vin' })).toHaveCount(0)
  await expect(page.getByRole('dialog', { name: /Bienvenue/ })).toBeVisible()

  // À la sortie, les cinq vins attendent dans les envies, fiche comprise.
  await page.getByRole('dialog').getByText('Découvrir Œno').click()
  const envies = await page.evaluate(() => JSON.parse(localStorage.getItem('oeno-envies') || '[]'))
  expect(envies).toHaveLength(5)
  expect(envies.every(e => e.vin && e.vin.region)).toBe(true)
  expect(incidents).toEqual([])
})

test('la cave d’exemple se présente, et s’écarte pour laisser commencer', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await page.addInitScript(() => {
    sessionStorage.setItem('landing-seen', '1')
    localStorage.setItem('oeno-tour-v1', '1')
    localStorage.setItem('oeno-hub-tour', '1')
    localStorage.setItem('oeno-profil', JSON.stringify({ niveau: 'debutant', gouts: {} }))
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Ma Cave', exact: true }).click()

  // Le décor se dit décor, au lieu d'un libellé de neuf pixels.
  await expect(page.getByText('Ces bouteilles sont un décor')).toBeVisible()

  // Et la sortie mène à un accueil qui guide, pas à quatre zéros.
  await page.getByRole('button', { name: 'Commencer ma cave' }).click()
  await expect(page.getByText('Votre cave démarre ici')).toBeVisible()
  await expect(page.locator('main').getByRole('button', { name: /Scanner une étiquette/ })).toBeVisible()
  await expect(page.getByText('Essayez d’autres critères')).toHaveCount(0)
  expect(incidents).toEqual([])
})
