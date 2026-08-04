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

  // Les deux boutons qui manquaient. Les vérifier ICI, et pas seulement en
  // test unitaire, est le vrai garde-fou : le test unitaire fournit lui-même
  // le contexte — il prouve que la fiche l'honore, jamais que l'application le
  // fournit.
  await expect(fiche.getByRole('button', { name: /Noter cette dégustation/ })).toBeVisible()
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

test('le guide conduit d’une envie à une bouteille rangée', async ({ page }) => {
  // Le parcours complet de la refonte : une seule porte, des questions qui
  // s'enchaînent, et des vins qu'on range sans changer d'écran.
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await page.goto('/')

  // Le raccourci « Ce soir ? » entre dans le guide au lieu d'ouvrir sa propre
  // modale : c'est ce qui centralise les quatre questionnaires d'avant.
  await page.getByRole('button', { name: 'Ce soir ?', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Vous mangez quoi ce soir/ })).toBeVisible()

  // Répondre jusqu'au bout, quelle que soit la longueur du chemin : la
  // question « laquelle, précisément ? » ne s'insère que sur une viande.
  for (let i = 0; i < 8; i++) {
    if (await page.getByRole('heading', { name: /conseille|Rien ne correspond/ }).count()) break
    await page.locator('main .card').first().click()
  }
  await expect(page.getByRole('heading', { name: /Voilà ce qu’on vous conseille/ })).toBeVisible()

  await page.locator('main').getByRole('button').filter({ hasText: /~/ }).first().click()
  const fiche = page.getByRole('dialog')
  await expect(fiche.getByRole('button', { name: /Noter cette dégustation/ })).toBeVisible()
  await fiche.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()
  await page.locator('#prix-paye').fill('23')
  await page.getByRole('button', { name: /Ranger/ }).click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].estimatedValue).toBe(23)
  expect(incidents).toEqual([])
})
