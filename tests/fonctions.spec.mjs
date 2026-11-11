import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// Les fonctions que personne ne surveillait.
//
// Le filet ouvrait chaque écran mais n'y faisait rien : le journal, l'école et
// les portes de la landing pouvaient casser sans qu'un test bronche — et deux
// portes de la landing étaient bel et bien cassées (elles passaient par une
// clé de session que plus rien ne lisait depuis la fusion des questionnaires).
// Ici on va au bout du geste : une note s'écrit et se retrouve, une leçon se
// termine et compte, une promesse de la landing mène où elle le dit.
// ═══════════════════════════════════════════════════════════════════════════

const amorce = async page => {
  await page.addInitScript(() => {
    sessionStorage.setItem('landing-seen', '1')
    localStorage.setItem('oeno-tour-v1', '1')
    localStorage.setItem('oeno-hub-tour', '1')
    localStorage.setItem('oeno-profil', JSON.stringify({ niveau: 'debutant', gouts: {} }))
  })
}

test('une dégustation s’écrit dans le journal et s’y retrouve', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await amorce(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Ma Cave', exact: true }).click()
  await page.locator('main button').filter({ hasText: 'Mémoires de Vin' }).first().click()
  await page.getByRole('button', { name: /Écrire ma première note/ }).click()

  const fiche = page.getByRole('dialog', { name: 'Noter une dégustation' })
  await fiche.getByPlaceholder(/Nom du vin/).fill('Chinon Les Picasses')
  await fiche.getByPlaceholder('Envoûtant').fill('Gourmand')
  await fiche.getByRole('button', { name: 'Fruits rouges' }).click()
  await fiche.getByRole('button', { name: /Consigner ce souvenir/ }).click()

  await expect(fiche).toHaveCount(0)
  await expect(page.locator('main').getByText('Chinon Les Picasses').first()).toBeVisible()
  const journal = await page.evaluate(() => JSON.parse(localStorage.getItem('oeno-journal') || '[]'))
  expect(journal).toHaveLength(1)
  expect(incidents).toEqual([])
})

test('une leçon se termine et fait avancer le parcours', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await amorce(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Apprendre', exact: true }).click()
  await page.locator('main button').filter({ hasText: /Les tanins, c'est quoi/ }).first().click()

  // Lecture, puis les trois questions : peu importe la réponse, la leçon
  // compte comme faite — c'est le score qui varie, pas l'accès.
  await page.getByRole('button', { name: /Vérifier ce que j'ai retenu/ }).click()
  for (let i = 0; i < 3; i++) {
    await page.locator('main button.choice-btn').first().click()
    await page.getByRole('button', { name: /Question suivante|Voir mon score/ }).click()
  }
  await expect(page.getByText(/bonnes? réponses? sur 3/)).toBeVisible()

  const ecole = await page.evaluate(() => JSON.parse(localStorage.getItem('oeno-ecole') || '{}'))
  expect(Object.values(ecole).filter(l => l.done)).toHaveLength(1)
  expect(incidents).toEqual([])
})

test.describe('les portes de la landing', () => {
  test('« Faire le test » mène droit aux questions de goût', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Faire le test' }).first().click()
    // Pas le choix général « Qu'est-ce qu'on cherche ? » : la première question.
    await expect(page.getByText('1 / 6')).toBeVisible()
    await expect(page.getByRole('heading', { name: /Qu’est-ce qu’on cherche/ })).toHaveCount(0)
  })
})

test('Découvrir ne range plus rien au prix d’Œno', async ({ page }) => {
  // Le bouton « + » fabriquait une bouteille à la main, au prix moyen pris
  // pour le prix payé. Les trois gestes restants portent leur nom.
  await amorce(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Découvrir', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Garder ce vin dans mes envies' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Ajouter directement/ })).toHaveCount(0)
  for (const nom of ['Passer', 'La fiche', 'Garder']) await expect(page.locator('main button').getByText(nom, { exact: true }).last()).toBeVisible()
})
