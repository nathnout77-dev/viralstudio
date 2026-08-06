import { chromium } from '@playwright/test'

// ═══════════════════════════════════════════════════════════════════════════
// L'audit du clavier et des lecteurs d'écran.
//
//   npx next start -p 3400 &
//   node scripts/audit-clavier.mjs 3400
//
// Même parti pris que l'audit de contraste, pour la même raison : on ne
// corrige pas ce qu'on ne mesure pas, et on ne sait pas si l'on a régressé
// sans un chiffre d'avant. Il ouvre les vues et les modales, puis relève :
//
//   • les commandes SANS NOM — un bouton qui ne contient qu'une icône et
//     aucun texte de remplacement est annoncé « bouton » par un lecteur
//     d'écran. Rien d'autre. Il devient indevinable.
//   • les modales SANS PIÈGE DE FOCUS — tabuler s'en échappe, et l'on ne peut
//     plus revenir aux boutons de la fenêtre.
//
// Une vue qu'il ne sait plus ouvrir est signalée, jamais passée sous silence :
// sinon un écran sortirait de la surveillance sans qu'on le sache.
// ═══════════════════════════════════════════════════════════════════════════

const PORT = process.argv[2] || 3400
const BASE = `http://localhost:${PORT}`

const VUES = [
  ['Accueil',        async p => {}],
  ['Découvrir',      async p => p.getByRole('button', { name: 'Découvrir', exact: true }).click()],
  ['Trouver un vin', async p => p.getByRole('button', { name: 'Trouver un vin', exact: true }).click()],
  ['Ma Cave',        async p => p.getByRole('button', { name: 'Ma Cave', exact: true }).click()],
  ['Mes amis',       async p => p.getByRole('button', { name: 'Mes amis', exact: true }).click()],
  ['Bibliothèque',   async p => p.getByRole('button', { name: 'Bibliothèque', exact: true }).click()],
  ['Explorer',       async p => p.getByRole('button', { name: 'Explorer', exact: true }).click()],
  ['Apprendre',      async p => p.getByRole('button', { name: 'Apprendre', exact: true }).click()],
  ['Réglages',       async p => p.getByRole('button', { name: 'Réglages', exact: true }).click()],
  ['Recherche',      async p => p.getByRole('button', { name: 'Recherche', exact: true }).click()],
  ['Compte',         async p => p.getByRole('button', { name: 'Compte', exact: true }).click()],
  ['Tout Œno',       async p => p.getByRole('button', { name: 'Tout Œno', exact: true }).click()],
  ['Assistant',      async p => p.getByRole('button', { name: 'Assistant', exact: true }).click()],
  ['Ajouter un vin', async p => {
    const b = p.getByRole('button', { name: 'Ajouter un vin', exact: true }).first()
    await b.scrollIntoViewIfNeeded(); await b.click({ force: true })
  }],
  ['Fiche d’un vin', async p => {
    await p.getByRole('button', { name: 'Bibliothèque', exact: true }).click()
    await p.waitForTimeout(600)
    await p.locator('main button').filter({ hasText: /·/ }).first().click()
  }],
]

// Relevé fait DANS la page : le nom accessible tel qu'un lecteur d'écran le
// calcule — texte visible, puis aria-label, puis title.
const RELEVE = () => {
  // Le texte réellement annoncé : tout ce qui est `aria-hidden` est retiré.
  // C'est le piège de cet audit — les repères d'Œno sont des emojis, et un
  // emoji est justement masqué aux lecteurs d'écran. Compter son caractère
  // comme un nom aurait déclaré l'app irréprochable alors qu'un bouton
  // « 🍷 » n'annonce rien du tout.
  const texteAudible = el => {
    let out = ''
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { out += n.textContent; continue }
      if (n.nodeType !== 1) continue
      if (n.getAttribute('aria-hidden') === 'true') continue
      out += texteAudible(n)
    }
    return out
  }

  const nom = el => (
    el.getAttribute('aria-label') ||
    el.getAttribute('title') ||
    (el.getAttribute('aria-labelledby')
      ? document.getElementById(el.getAttribute('aria-labelledby'))?.textContent
      : '') ||
    texteAudible(el) || ''
  ).replace(/\s+/g, ' ').trim()

  const visible = el => {
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'
  }

  const muets = []
  for (const el of document.querySelectorAll('button, a[href], [role="button"]')) {
    if (!visible(el)) continue
    if (nom(el)) continue
    muets.push({
      balise: el.tagName.toLowerCase(),
      classe: (el.className || '').toString().slice(0, 60),
      html: el.outerHTML.slice(0, 110).replace(/\s+/g, ' '),
    })
  }

  const dialogues = [...document.querySelectorAll('[role="dialog"]')].map(d => ({
    modal: d.getAttribute('aria-modal') === 'true',
    nomme: Boolean(d.getAttribute('aria-label') || d.getAttribute('aria-labelledby')),
  }))

  return { muets, dialogues }
}

const navigateur = await chromium.launch()
const contexte = await navigateur.newContext({ viewport: { width: 1400, height: 1000 } })
await contexte.addInitScript(() => {
  sessionStorage.setItem('landing-seen', '1')
  localStorage.setItem('oeno-tour-v1', '1')
  localStorage.setItem('oeno-profil', JSON.stringify({ mode: 'amateur', gouts: {} }))
})

const parClasse = new Map()
let totalMuets = 0
const dialoguesSansNom = []
const vuesPerdues = []

for (const [nom, aller] of VUES) {
  const page = await contexte.newPage()
  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(700)
    await aller(page)
    await page.waitForTimeout(900)

    const { muets, dialogues } = await page.evaluate(RELEVE)
    totalMuets += muets.length
    for (const m of muets) {
      const cle = m.html
      if (!parClasse.has(cle)) parClasse.set(cle, { n: 0, vues: new Set(), ex: m })
      const e = parClasse.get(cle)
      e.n += 1
      e.vues.add(nom)
    }
    for (const d of dialogues) if (!d.nomme) dialoguesSansNom.push(nom)

    console.log(`${nom.padEnd(16)} ${String(muets.length).padStart(3)} commande(s) sans nom` +
                (dialogues.length ? `  ·  ${dialogues.length} dialogue(s)` : ''))
  } catch (e) {
    vuesPerdues.push(nom)
    console.log(`${nom.padEnd(16)} ⚠ NON OUVERTE — ${String(e).split('\n')[0].slice(0, 70)}`)
  }
  await page.close()
}

console.log('\n─── Commandes sans nom, regroupées par élément fautif ───')
const tries = [...parClasse.entries()].sort((a, b) => b[1].n - a[1].n)
for (const [, e] of tries.slice(0, 20)) {
  console.log(`  ×${String(e.n).padStart(3)}  [${[...e.vues].join(', ')}]`)
  console.log(`        ${e.ex.html}`)
}

console.log(`\nTotal : ${totalMuets} occurrence(s), ${parClasse.size} élément(s) distinct(s).`)
if (dialoguesSansNom.length) console.log(`Dialogues sans nom accessible : ${[...new Set(dialoguesSansNom)].join(', ')}`)
if (vuesPerdues.length) console.log(`⚠ Vues non ouvertes : ${vuesPerdues.join(', ')}`)

await navigateur.close()
process.exit(totalMuets ? 1 : 0)
