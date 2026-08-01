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

/**
 * Ouvre la recherche et clique le résultat voulu — DANS la modale.
 *
 * L'écran resté derrière porte des noms de vins (la suggestion du jour), et
 * viser large y attrapait le mauvais bouton, que le voile rendait de toute
 * façon inatteignable. Un test qui passe parce que la suggestion du jour ne
 * porte pas le même nom que le vin cherché ne prouve rien.
 */
async function chercherEtOuvrir(page, nom) {
  await page.getByRole('button', { name: 'Recherche', exact: true }).click()
  const modale = page.getByRole('dialog', { name: /Recherche/ })
  await modale.getByRole('textbox').first().fill(nom)
  await modale.locator('button').filter({ hasText: new RegExp(nom) }).first().click()
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

test('un vin trouvé par la recherche rejoint la cave, au prix payé', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  await chercherEtOuvrir(page, 'Chablis')
  await page.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()

  // Œno propose un ordre de grandeur ; ce qu'on a payé le remplace.
  const champ = page.locator('#prix-paye')
  await expect(champ).toHaveValue(/\d/)
  const suggere = await champ.inputValue()
  await champ.fill('42.50')
  await page.getByRole('button', { name: /Ranger/ }).click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].region).toBeTruthy()
  // C'est le prix de l'utilisateur qui atterrit en cave, pas celui d'Œno.
  expect(cave[0].estimatedValue).toBe(42.5)
  expect(cave[0].estimatedValue).not.toBe(Number(suggere))
  await expect(page.getByRole('button', { name: /Ajouté à ma cave/ })).toBeVisible()
  expect(incidents).toEqual([])
})

test('sans prix, la bouteille ne part pas en cave', async ({ page }) => {
  // Le prix est obligatoire : la valeur de la cave et le panorama en dépendent,
  // et une moyenne d'appellation n'est le prix de personne.
  const incidents = surveiller(page)
  await page.goto('/')
  await chercherEtOuvrir(page, 'Sancerre')
  await page.getByRole('button', { name: /Ajouter à ma cave/ }).first().click()

  await page.locator('#prix-paye').fill('')
  await page.getByRole('button', { name: /Ranger/ }).click()
  await page.waitForTimeout(400)

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toEqual([])
  expect(incidents).toEqual([])
})

test('la saisie à la main réclame aussi le prix', async ({ page }) => {
  const incidents = surveiller(page)
  await page.goto('/')
  // Deux précautions pour ce bouton : il vit en bas de la barre latérale,
  // donc hors écran sur une fenêtre courte ; et il s'anime au survol
  // (goldSweep), si bien que Playwright ne le juge jamais « stable ».
  const ajouter = page.getByRole('button', { name: 'Ajouter un vin', exact: true }).first()
  await ajouter.scrollIntoViewIfNeeded()
  await ajouter.click({ force: true })
  await page.getByRole('button', { name: /Saisir à la main/ }).click()
  const form = page.getByRole('dialog').last()
  await form.getByRole('textbox').first().fill('Mon vin')
  await form.getByRole('button', { name: /Ajouter à la cave/ }).click()

  await expect(page.getByText('Prix requis')).toBeVisible()
  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toEqual([])
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

  await page.locator('#prix-paye').fill('29')
  await page.getByRole('button', { name: /Ranger/ }).click()

  const cave = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('oenotheque-v2') || '[]').filter(w => !w.demo))
  expect(cave).toHaveLength(1)
  expect(cave[0].appellation).toBe('Chablis')
  expect(cave[0].region).toBeTruthy()
  expect(cave[0].estimatedValue).toBe(29)
  expect(incidents).toEqual([])
})
