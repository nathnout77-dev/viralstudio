// Audit de contraste — parcourt les écrans dans un thème donné et mesure le
// rapport de contraste réel de chaque texte affiché, tel que le navigateur le
// calcule après cascade. Aucun jugement à l'œil : un chiffre, un seuil.
//
//   node scripts/audit-contraste.mjs [clair|sombre] [port]
//
// Seuil WCAG AA : 4.5:1 pour un texte courant, 3:1 pour un grand texte
// (≥ 24px, ou ≥ 18.66px en gras).

import { chromium } from '@playwright/test'

const THEME = process.argv[2] || 'sombre'
const PORT  = process.argv[3] || '3216'
const BASE  = `http://127.0.0.1:${PORT}`

const ECRANS = ['Accueil', 'Découvrir', 'Trouver un vin', 'Ma Cave', 'Mes amis', 'Bibliothèque', 'Explorer', 'Apprendre']

const MESURE = () => {
  const lum = s => {
    const m = (s || '').match(/[\d.]+/g)
    if (!m) return null
    const [r, g, b] = m.slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  // Fond effectif : on remonte les ancêtres jusqu'à trouver une surface opaque.
  //
  // Un élément peut peindre son fond avec un dégradé (background-image) sans
  // rien mettre dans backgroundColor. Continuer à remonter dans ce cas donnait
  // des verdicts absurdes — un bouton doré mesuré contre le noir de la barre,
  // à 1:1. On s'arrête donc sur le dégradé et on renonce à mesurer : mieux
  // vaut ne rien dire que dénoncer un défaut inexistant.
  const fondDe = el => {
    let n = el
    while (n) {
      const s = getComputedStyle(n)
      if (s.backgroundImage && s.backgroundImage !== 'none') return null
      const m = s.backgroundColor.match(/[\d.]+/g)
      if (m && (m.length < 4 || Number(m[3]) > 0.85)) return s.backgroundColor
      n = n.parentElement
    }
    return 'rgb(255,255,255)'
  }
  const out = []
  for (const el of document.querySelectorAll('body *')) {
    const texte = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim()
    if (!texte || texte.length < 2) continue
    // Un emoji peint ses propres couleurs : la propriété `color` ne
    // l'atteint pas, la mesurer n'a aucun sens.
    if (!/[\p{L}\p{N}]/u.test(texte)) continue
    const s = getComputedStyle(el)
    if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.5) continue
    const r = el.getBoundingClientRect()
    if (r.width < 4 || r.height < 4) continue
    const fond = fondDe(el)
    if (fond === null) continue   // surface en dégradé : non mesurable de façon fiable
    const L1 = lum(s.color), L2 = lum(fond)
    if (L1 === null || L2 === null) continue
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    const px = parseFloat(s.fontSize), gras = Number(s.fontWeight) >= 700
    const seuil = (px >= 24 || (px >= 18.66 && gras)) ? 3 : 4.5
    if (ratio < seuil) {
      el.setAttribute('data-audit', String(out.length))
      out.push({
        texte: texte.slice(0, 42), ratio: +ratio.toFixed(2), seuil,
        couleur: s.color, fond,
        classe: (el.className || '').toString().slice(0, 70),
      })
    }
  }
  return out
}

/**
 * Contre-épreuve au pixel près.
 *
 * Remonter les ancêtres ne suffit pas : une carte peut être peinte par un
 * calque frère en position absolue, que le parcours des ancêtres ne voit pas.
 * Le texte blanc de « Découvrir », posé sur un fond bordeaux bien réel, était
 * ainsi dénoncé à 1:1. On photographie donc l'élément et on prend la couleur
 * la plus fréquente de sa boîte : les glyphes sont minoritaires, la teinte
 * dominante est le fond réellement affiché.
 */
async function fondReel(page, index) {
  const el = page.locator('[data-audit="' + index + '"]').first()
  try {
    const png = await el.screenshot({ timeout: 2000 })
    return await page.evaluate(async data => {
      const img = new Image()
      img.src = 'data:image/png;base64,' + data
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const g = c.getContext('2d')
      g.drawImage(img, 0, 0)
      const d = g.getImageData(0, 0, c.width, c.height).data
      const compte = new Map()
      for (let i = 0; i < d.length; i += 4) {
        // Quantifié : l'anticrénelage crée des milliers de teintes voisines.
        const k = `${d[i] >> 3},${d[i + 1] >> 3},${d[i + 2] >> 3}`
        compte.set(k, (compte.get(k) || 0) + 1)
      }
      let best = null, n = 0
      for (const [k, v] of compte) if (v > n) { n = v; best = k }
      const [r, g2, b2] = best.split(',').map(x => (Number(x) << 3) + 4)
      return `rgb(${r}, ${g2}, ${b2})`
    }, png.toString('base64'))
  } catch { return null }
}

const b = await chromium.launch({ channel: 'chromium' })
const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 } })
const p = await ctx.newPage()
await p.addInitScript(t => {
  sessionStorage.setItem('landing-seen', '1')
  localStorage.setItem('oeno-tour-v1', '1')
  localStorage.setItem('oeno-profil', JSON.stringify({ mode: 'amateur', gouts: {} }))
  localStorage.setItem('oeno-reglages', JSON.stringify({ theme: t }))
}, THEME)

const parEcran = new Map()
await p.goto(BASE, { waitUntil: 'networkidle' })
for (const ecran of ECRANS) {
  await p.getByRole('button', { name: ecran, exact: true }).click()
  await p.waitForTimeout(700)
  const bruts = await p.evaluate(MESURE)
  // Contre-épreuve au pixel : on ne garde que ce qui échoue encore.
  const confirmes = []
  for (let i = 0; i < bruts.length; i++) {
    const vrai = await fondReel(p, i)
    if (!vrai) { confirmes.push(bruts[i]); continue }
    const r = await p.evaluate(([c, f]) => {
      const lum = s => { const m = s.match(/[\d.]+/g); const [r, g, b] = m.slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
      const L1 = lum(c), L2 = lum(f)
      return +(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2))
    }, [bruts[i].couleur, vrai])
    if (r < bruts[i].seuil) confirmes.push({ ...bruts[i], ratio: r, fond: vrai })
  }
  parEcran.set(ecran, confirmes)
}
await b.close()

// Regroupé par couleur fautive : c'est la cause, pas chaque occurrence.
const parCouleur = new Map()
let total = 0
for (const [ecran, defauts] of parEcran) {
  for (const d of defauts) {
    total++
    const cle = `${d.couleur} sur ${d.fond}`
    if (!parCouleur.has(cle)) parCouleur.set(cle, { n: 0, pire: 99, ecrans: new Set(), exemple: d.texte, classe: d.classe })
    const e = parCouleur.get(cle)
    e.n++; e.pire = Math.min(e.pire, d.ratio); e.ecrans.add(ecran)
  }
}

console.log(`\nThème « ${THEME} » — ${total} texte(s) sous le seuil, ${parCouleur.size} cause(s) distincte(s)\n`)
for (const [cle, e] of [...parCouleur].sort((a, b) => b[1].n - a[1].n)) {
  console.log(`  ${String(e.n).padStart(3)}×  ${e.pire}:1   ${cle}`)
  console.log(`        « ${e.exemple} »  [${[...e.ecrans].join(', ')}]`)
  if (e.classe) console.log(`        ${e.classe}`)
}
if (!total) console.log('  Aucun défaut de contraste.')
process.exit(total ? 1 : 0)
