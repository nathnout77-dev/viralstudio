import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// « Une fiche de vin ouverte propose toujours de la ranger. »
//
// Ce ne l'était pas : onze écrans ouvraient FicheVin sans lui passer de
// fonction d'ajout, et le bouton disparaissait purement et simplement — pas
// grisé, absent. Le vin était décrit en détail sans aucun moyen de le garder.
//
// Le test passe par les envies, le cas le plus parlant : un vin qu'on a
// explicitement mis de côté pour l'acheter était justement celui qu'on ne
// pouvait pas ranger. Cet écran ne reçoit pas la cave et n'a pas à la
// recevoir ; c'est le contexte de lib/cave.js qui fournit le bouton.
// ═══════════════════════════════════════════════════════════════════════════

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('landing-seen', '1')
    localStorage.setItem('oeno-tour-v1', '1')
    localStorage.setItem('oeno-profil', JSON.stringify({ mode: 'amateur', gouts: {} }))
  })
})

test('un vin mis en envie se range en cave depuis sa fiche', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await page.goto('/')

  await page.getByRole('button', { name: 'Découvrir', exact: true }).click()
  await page.getByLabel('Garder ce vin dans mes envies').click()

  await page.getByRole('button', { name: 'Ma Cave', exact: true }).click()
  await page.locator('button').filter({ hasText: /Envies/ }).first().click()

  // La vignette de l'envie ouvre la fiche complète du vin.
  await page.locator('main').locator('button').filter({ hasText: /mill\./ }).first().click()
  const fiche = page.getByRole('dialog')
  await expect(fiche).toBeVisible()

  // Le bouton qui manquait.
  await fiche.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()

  // Et le prix reste celui de l'utilisateur, pas la suggestion d'Œno.
  const champ = page.locator('#prix-paye')
  const suggere = await champ.inputValue()
  await champ.fill('37.50')
  await page.getByRole('button', { name: /Ranger/ }).click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].estimatedValue).toBe(37.5)
  expect(cave[0].estimatedValue).not.toBe(Number(suggere))
  expect(cave[0].region).toBeTruthy()
  expect(incidents).toEqual([])
})

test('la fiche ouverte depuis Découvrir range au prix saisi', async ({ page }) => {
  // Ce chemin-là avait un bouton, mais il court-circuitait bouteilleDepuisVin
  // et recopiait le prix moyen d'Œno en ignorant la saisie.
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await page.goto('/')

  await page.getByRole('button', { name: 'Découvrir', exact: true }).click()
  // Attendre que la carte soit là : Entrée n'ouvre la fiche qu'une fois le
  // vin tiré, sinon la touche part dans le vide.
  await expect(page.getByLabel('Garder ce vin dans mes envies')).toBeVisible()
  await page.keyboard.press('Enter')          // ouvre la fiche complète
  await expect(page.getByRole('dialog')).toBeVisible()

  await page.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()
  const champ = page.locator('#prix-paye')
  const suggere = await champ.inputValue()
  await champ.fill('61')
  await page.getByRole('button', { name: /Ranger/ }).click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].estimatedValue).toBe(61)
  expect(cave[0].estimatedValue).not.toBe(Number(suggere))
  expect(incidents).toEqual([])
})
