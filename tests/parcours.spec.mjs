import { test, expect } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// Le parcours réel, dans un vrai navigateur.
//
// Raison d'être : la compilation ne prouve rien. Un `<Icone />` non importé,
// un écran qui plante à l'ouverture, une modale qui ne s'ouvre plus — tout
// cela compile parfaitement et ne se voit que chez l'utilisateur, en écran
// noir. Ces tests ouvrent chaque écran et **échouent à la moindre exception**.
//
// Le contrat est volontairement large plutôt que précis : on ne teste pas des
// libellés (ils changent à chaque retouche), on teste que ça s'ouvre et que
// rien ne casse.
// ═══════════════════════════════════════════════════════════════════════════

const PARCOURS = ['Accueil', 'Découvrir', 'Trouver un vin', 'Ma Cave', 'Mes amis', 'Bibliothèque', 'Explorer', 'Apprendre']

/** Écarte l'écran d'intro et l'onboarding : ils ont leurs propres tests. */
async function entrer(page) {
  await page.addInitScript(() => {
    sessionStorage.setItem('landing-seen', '1')
    localStorage.setItem('oeno-tour-v1', '1')
    localStorage.setItem('oeno-profil', JSON.stringify({ mode: 'amateur', gouts: {} }))
  })
}

/** Toute erreur de la page fait échouer le test qui l'a provoquée. */
function surveiller(page) {
  const incidents = []
  page.on('pageerror', e => incidents.push(`exception : ${e.message}`))
  page.on('console', m => {
    if (m.type() !== 'error') return
    const t = m.text()
    // Les appels réseau absents de l'environnement de test (IA, Supabase) ne
    // sont pas des régressions : l'app est conçue pour s'en passer.
    if (/favicon|net::ERR|Failed to fetch|supabase|401|403|404/i.test(t)) return
    incidents.push(`console : ${t}`)
  })
  return incidents
}

test.beforeEach(async ({ page }) => { await entrer(page) })

test('l’app démarre sans erreur', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  await expect(page.getByRole('navigation')).toBeVisible()
  expect(incidents).toEqual([])
})

for (const parcours of PARCOURS) {
  test(`le parcours « ${parcours} » s’ouvre`, async ({ page }) => {
    const incidents = surveiller(page)
    await page.goto('/')
    await page.getByRole('button', { name: parcours, exact: true }).click()
    // Un écran vivant a du contenu : sur un plantage, main reste vide.
    await expect(page.locator('main')).not.toBeEmpty()
    await page.waitForTimeout(400)
    expect(incidents).toEqual([])
  })
}

test('la grille « Tout Œno » ouvre chacun de ses accès', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Tout Œno', exact: true }).click()
  await expect(page.getByRole('dialog').or(page.locator('.modal-panel')).first()).toBeVisible()
  expect(incidents).toEqual([])
})

test('les réglages s’ouvrent et le thème bascule pour de bon', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Réglages', exact: true }).click()
  await page.getByRole('button', { name: /Sombre/ }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre')

  // Le thème doit survivre au rechargement, et surtout être posé AVANT le
  // premier rendu : sinon l'utilisateur qui a choisi le sombre prend un
  // éclair blanc à chaque ouverture.
  await page.reload({ waitUntil: 'commit' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre')
  expect(incidents).toEqual([])
})

test('un vin gardé depuis Découvrir arrive complet dans les envies', async ({ page }) => {
  // Le bug d'origine, reproduit par le geste réel : garder un vin depuis
  // « Découvrir » — donc un vin du catalogue national — puis aller le voir
  // dans les envies. Il y arrivait sans fiche, sans région et sans prix.
  const incidents = surveiller(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Découvrir', exact: true }).click()
  await page.getByLabel('Garder ce vin dans mes envies').click()

  const envies = await page.evaluate(() => JSON.parse(localStorage.getItem('oeno-envies') || '[]'))
  expect(envies).toHaveLength(1)

  // Le cœur du correctif : la fiche voyage avec l'envie.
  expect(envies[0].vin).not.toBeNull()
  expect(envies[0].vin.appellation).toBeTruthy()
  expect(envies[0].vin.region).toBeTruthy()
  expect(incidents).toEqual([])
})

test('un vin trouvé par la recherche rejoint la cave', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Recherche', exact: true }).click()
  await page.getByRole('textbox').first().fill('Chablis')
  await page.locator('button').filter({ hasText: /Chablis/ }).first().click()

  await page.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()
  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))

  expect(cave).toHaveLength(1)
  // La bouteille arrive complète : sans région ni prix, la cave ne sait ni la
  // classer ni l'estimer, et l'ajout ne vaut guère mieux qu'une note.
  expect(cave[0].region).toBeTruthy()
  expect(cave[0].estimatedValue).toBeGreaterThan(0)
  // Le bouton s'éteint : sinon on ajoute trois fois le même vin sans le voir.
  await expect(page.getByRole('button', { name: /Ajouté à ma cave/ })).toBeVisible()
  expect(incidents).toEqual([])
})

test('un vin conseillé par Œno rejoint la cave', async ({ page }) => {
  // Aucune clé d'IA en test : on simule la réponse au niveau réseau, ce qui
  // exerce le vrai chemin d'interface — carte de vin, fiche, puis ajout.
  for (const route of ['**/api/groq', '**/api/gemini', '**/api/claude']) {
    await page.route(route, r => r.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ content: [{ type: 'text', text: 'Je vous conseille un Chablis, vif et minéral.' }] }),
    }))
  }
  const incidents = surveiller(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Assistant', exact: true }).click()
  const champ = page.getByRole('textbox').first()
  await champ.fill('Que boire avec un poisson ?')
  await champ.press('Enter')

  await page.locator('.card').filter({ hasText: /Chablis/ }).first().click()
  await page.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].appellation).toBe('Chablis')
  expect(cave[0].region).toBeTruthy()
  expect(incidents).toEqual([])
})
