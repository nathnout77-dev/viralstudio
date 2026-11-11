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

test('une bouteille finie passe dans « Bues », et une bouteille pressée s’annonce', async ({ page }) => {
  // Avant : la bouteille restait dans la liste à zéro, ou s'effaçait pour de
  // bon. Et rien ne disait qu'un vin arrivait au bout de sa meilleure période.
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await amorce(page)
  await page.addInitScript(() => {
    const an = new Date().getFullYear()
    localStorage.setItem('oenotheque-v2', JSON.stringify([
      // Fenêtre qui se referme cette année : doit s'annoncer.
      { id: 'a', name: 'Muscadet Sèvre', vintage: an - 4, drinkFrom: 1, drinkUntil: 4, quantity: 1, type: 'white', region: 'Loire', estimatedValue: 9 },
      { id: 'b', name: 'Cornas Granit', vintage: an - 2, drinkFrom: 5, drinkUntil: 20, quantity: 3, type: 'red', region: 'Rhône Nord', estimatedValue: 40 },
    ]))
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Ma Cave', exact: true }).click()

  const alerte = page.getByRole('region', { name: 'À ouvrir sans tarder' })
  await expect(alerte.getByText(/Muscadet Sèvre/)).toBeVisible()
  await expect(alerte.getByText(/Cornas/)).toHaveCount(0)

  // On ouvre la dernière : elle quitte la cave sans disparaître.
  // Tri par nom : Cornas d'abord, Muscadet ensuite.
  await page.locator('main').getByRole('button', { name: 'Retirer une bouteille' }).nth(1).click()
  await expect(alerte).toHaveCount(0)
  await page.getByRole('button', { name: 'Bues (1)' }).click()
  await expect(page.locator('main').getByText(/1 ouverte/)).toBeVisible()

  // Rachetée : elle revient en cave, et l'historique garde la trace.
  await page.getByRole('button', { name: /Racheter Muscadet/ }).click()
  const cave = await page.evaluate(() => JSON.parse(localStorage.getItem('oenotheque-v2')))
  const muscadet = cave.find(w => w.id === 'a')
  expect(muscadet.quantity).toBe(1)
  expect(muscadet.ouvertes).toBe(1)
  expect(incidents).toEqual([])
})

test('une cave tenue dans un tableur entre dans Œno sans rien remplacer', async ({ page }) => {
  const incidents = []
  page.on('pageerror', e => incidents.push(e.message))
  await amorce(page)
  await page.addInitScript(() => {
    if (!localStorage.getItem('oenotheque-v2')) {
      localStorage.setItem('oenotheque-v2', JSON.stringify([{ id: 'z', name: 'Déjà là', vintage: 2021, quantity: 1, type: 'red' }]))
    }
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Compte', exact: true }).click()
  const compte = page.getByRole('dialog', { name: /Mon compte/ })
  // Windows-1252, comme Excel l'enregistre : « Rosé » doit rester « Rosé ».
  const csv = Buffer.from('Nom;Couleur;Mill\xe9sime;Quantit\xe9;Prix\r\nTavel;Ros\xe9;2024;6;12,50\r\n;Rouge;2020;1;\r\n', 'latin1')
  await compte.locator('input[type="file"][accept*="csv"]').setInputFiles({ name: 'cave.csv', mimeType: 'text/csv', buffer: csv })

  await expect(page.getByText(/1 bouteille importée · 1 ligne sans nom ignorée/)).toBeVisible()
  const cave = await page.evaluate(() => JSON.parse(localStorage.getItem('oenotheque-v2')))
  expect(cave.map(w => w.name)).toEqual(['Déjà là', 'Tavel'])
  expect(cave[1]).toMatchObject({ type: 'rosé', vintage: 2024, quantity: 6, estimatedValue: 12.5 })
  expect(incidents).toEqual([])
})

test('sans son cerveau distant, l’assistant répond quand même aux questions simples', async ({ page }) => {
  // Les routes IA répondent « pas de clé » en test : c'est exactement le cas
  // d'un utilisateur hors-ligne ou d'un quota dépassé.
  await page.setViewportSize({ width: 390, height: 844 })
  await amorce(page)
  await page.goto('/')
  // L'assistant vit dans la barre du haut : plus de bulle par-dessus le contenu.
  await page.getByRole('button', { name: 'Ouvrir l\'assistant Œno' }).click()
  const fenetre = page.getByRole('dialog').last()
  await fenetre.getByPlaceholder(/Posez votre question/).fill('Quel vin avec une raclette ?')
  await fenetre.getByRole('button', { name: 'Envoyer' }).click()
  await expect(fenetre.getByText(/Trois pistes qui marchent bien/)).toBeVisible({ timeout: 20000 })
  await expect(fenetre.getByText(/sans connexion à mon cerveau distant/)).toBeVisible()
})
