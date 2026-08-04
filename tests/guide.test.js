import { describe, it, expect } from 'vitest'
import {
  DIRECTIONS, QUESTIONS, prochaineQuestion, repondre, avancement, questionsPour,
} from '../lib/guide/parcours'
import { recommander, scoreVin, profilDepuisGout } from '../lib/guide/moteur'
import { CATALOGUE } from '../lib/vinsReferentiel'

// ═══════════════════════════════════════════════════════════════════════════
// Le guide unifié : un questionnaire, un moteur.
//
// Ce que ces tests protègent avant tout, c'est la raison d'être de la fusion —
// **les directions se composent**. Quatre questionnaires séparés ne pouvaient
// pas le faire : le Goût-o-mètre apprenait un palais que « ce soir ? »
// n'utilisait jamais.
// ═══════════════════════════════════════════════════════════════════════════

/** Déroule le questionnaire en choisissant à chaque fois l'option demandée. */
function derouler(depart, choix = {}) {
  let r = depart
  const posees = []
  for (let garde = 0; garde < 20; garde++) {
    const q = prochaineQuestion(r)
    if (!q) break
    posees.push(q.id)
    const option = choix[q.id]
      ? q.options.find(o => o.label === choix[q.id] || o.v === choix[q.id])
      : q.options[0]
    r = repondre(r, q, option.v)
  }
  return { reponses: r, posees }
}

describe('l’enchaînement des questions', () => {
  it('ne pose que ce qui sert à la direction choisie', () => {
    const { posees } = derouler({ direction: 'ce-soir' })
    expect(posees).toContain('plat')
    expect(posees).not.toContain('boisson')   // question du profil de goût
  })

  it('précise la viande seulement quand une viande est annoncée', () => {
    const sansViande = derouler({ direction: 'ce-soir' }, { plat: 'poisson' })
    expect(sansViande.posees).not.toContain('viande-rouge')

    const avecViande = derouler({ direction: 'ce-soir' }, { plat: 'viande_rouge' })
    expect(avecViande.posees).toContain('viande-rouge')
    expect(avecViande.posees).not.toContain('viande-blanche')
  })

  it('finit par ne plus rien avoir à demander', () => {
    const { reponses } = derouler({ direction: 'ce-soir' })
    expect(prochaineQuestion(reponses)).toBeNull()
  })

  it('ne repose jamais une question déjà renseignée', () => {
    // Le cœur du confort au deuxième passage : un budget déjà donné ne
    // revient pas, quelle que soit la direction reprise ensuite.
    const { reponses } = derouler({ direction: 'ce-soir' })
    const repris = { ...reponses, direction: 'ce-soir' }
    expect(prochaineQuestion(repris)).toBeNull()
  })

  it('demande le budget avec les mêmes mots dans les deux directions', () => {
    // Il existait en trois exemplaires, dans trois écrans, avec trois
    // formulations. Une seule question, désormais.
    const budgets = QUESTIONS.filter(q => q.garde === 'budget')
    expect(budgets).toHaveLength(1)
    expect(budgets[0].quand({ direction: 'ce-soir' })).toBe(true)
    expect(budgets[0].quand({ direction: 'gout' })).toBe(true)
  })

  it('sait dire où on en est', () => {
    const depart = { direction: 'ce-soir' }
    expect(avancement(depart).faites).toBe(0)
    expect(avancement(depart).total).toBeGreaterThan(2)
    const { reponses } = derouler(depart)
    const fin = avancement(reponses)
    expect(fin.faites).toBe(fin.total)
  })

  it('propose une direction pour chaque intention, sans doublon', () => {
    const ids = DIRECTIONS.map(d => d.id)
    expect(new Set(ids).size).toBe(ids.length)
    // Deux directions délèguent à un écran spécialisé : leur résultat n'est
    // pas une liste de bouteilles mais un panier ou un menu.
    expect(DIRECTIONS.filter(d => d.sortie).map(d => d.id)).toEqual(['budget', 'repas'])
  })
})

describe('ce que le guide conseille', () => {
  const cinq = r => recommander(r, { catalogue: CATALOGUE })

  it('rend des vins, jamais un écran vide', () => {
    expect(cinq({ direction: 'ce-soir', plat: 'poisson', style: 'leger', budget: 20 })).toHaveLength(5)
  })

  it('sert la couleur demandée, sans exception', () => {
    // Filtre dur : même si l'accord théorique dit l'inverse, la couleur
    // choisie est celle servie. C'est un choix fait en connaissance de cause.
    const vins = cinq({ direction: 'ce-soir', plat: 'viande_rouge', couleur: 'white', budget: 9999 })
    expect(vins.length).toBeGreaterThan(0)
    expect(vins.every(v => v.type === 'white')).toBe(true)
  })

  it('respecte le budget annoncé', () => {
    const vins = cinq({ direction: 'ce-soir', plat: 'apero', budget: 10 })
    expect(vins.every(v => v.prixMoyen <= 10)).toBe(true)
  })

  it('ne propose pas deux fois la même région', () => {
    const vins = cinq({ direction: 'ce-soir', plat: 'fromage', budget: 9999 })
    expect(new Set(vins.map(v => v.region)).size).toBe(vins.length)
  })

  it('oriente vraiment selon l’envie du soir', () => {
    const base = { direction: 'ce-soir', plat: 'viande_rouge', couleur: 'red', budget: 9999 }
    const moyenne = vins => vins.reduce((s, v) => s + v.jauges.puissance, 0) / vins.length
    expect(moyenne(cinq({ ...base, style: 'puissant' })))
      .toBeGreaterThan(moyenne(cinq({ ...base, style: 'leger' })))
  })
})

describe('les directions se composent', () => {
  // La raison d'être de la fusion. Quatre questionnaires séparés ne pouvaient
  // pas le faire : le palais appris d'un côté était ignoré de l'autre.
  const goutFrais = { boisson: { puissance: -1, fraicheur: 2 }, tartine: { fraicheur: 2 } }
  const goutCorse = { boisson: { puissance: 2, tanins: 1 }, dessert: { puissance: 2, tanins: 1 } }

  it('déduit un palais des réponses du quotidien', () => {
    const p = profilDepuisGout(goutFrais)
    expect(p.fraicheur).toBe(4)
    expect(p.puissance).toBe(-1)
    expect(profilDepuisGout({})).toBeNull()
    expect(profilDepuisGout(null)).toBeNull()
  })

  it('le palais connu change la recommandation du soir', () => {
    const soir = { direction: 'ce-soir', plat: 'fromage', couleur: 'any', budget: 9999 }
    const sans  = recommander(soir, { catalogue: CATALOGUE })
    const frais = recommander(soir, { catalogue: CATALOGUE, profilGout: profilDepuisGout(goutFrais) })
    const corse = recommander(soir, { catalogue: CATALOGUE, profilGout: profilDepuisGout(goutCorse) })

    expect(frais.map(v => v.id)).not.toEqual(sans.map(v => v.id))
    expect(frais.map(v => v.id)).not.toEqual(corse.map(v => v.id))
  })

  it('mais l’envie du soir garde le dernier mot sur le palais général', () => {
    // Aimer le café serré ne doit pas imposer un vin puissant le soir où l'on
    // a envie de léger. Ce qui se vérifie est un classement, pas un score : le
    // profil pèse à demi dès que l'envie du soir s'exprime.
    const profilGout = profilDepuisGout(goutCorse)   // palais porté sur le corsé
    const costaud = CATALOGUE.find(w => w.type === 'red' && w.jauges.puissance >= 4 && w.jauges.tanins >= 4)
    const leger   = CATALOGUE.find(w => w.type === 'red' && w.jauges.puissance <= 2 && w.jauges.tanins <= 2)

    // Sans envie exprimée, le palais décide : le corsé passe devant.
    const sansEnvie = { direction: 'ce-soir' }
    expect(scoreVin(costaud, sansEnvie, { profilGout }))
      .toBeGreaterThan(scoreVin(leger, sansEnvie, { profilGout }))

    // L'envie du soir renverse le classement, malgré le palais.
    const envieLegere = { direction: 'ce-soir', style: 'leger' }
    expect(scoreVin(leger, envieLegere, { profilGout }))
      .toBeGreaterThan(scoreVin(costaud, envieLegere, { profilGout }))
  })

  it('tient compte de l’appétit de découverte', () => {
    const pointu = CATALOGUE.find(w => w.difficulte === 'pointu')
    expect(scoreVin(pointu, { aventure: 'pointu' })).toBeGreaterThan(scoreVin(pointu, { aventure: 'facile' }))
  })
})

describe('les garde-fous du moteur', () => {
  it('ne jette pas sur des réponses vides', () => {
    expect(() => recommander({}, { catalogue: CATALOGUE })).not.toThrow()
    expect(recommander({}, { catalogue: CATALOGUE }).length).toBeGreaterThan(0)
  })

  it('rend une liste vide plutôt que d’inventer, si le catalogue est vide', () => {
    expect(recommander({ plat: 'apero' }, { catalogue: [] })).toEqual([])
  })

  it('relâche les régions plutôt que la couleur demandée', () => {
    // Une préférence régionale ne doit jamais faire servir un rouge à qui a
    // demandé un blanc : on préfère sortir de la région.
    const vins = recommander(
      { couleur: 'white' },
      { catalogue: CATALOGUE, regions: ['Région Inexistante'] },
    )
    expect(vins.length).toBeGreaterThan(0)
    expect(vins.every(v => v.type === 'white')).toBe(true)
  })

  it('chaque question offre au moins deux options, toutes distinctes', () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBeGreaterThan(1)
      const labels = q.options.map(o => o.label)
      expect(new Set(labels).size).toBe(labels.length)
    }
  })

  it('toute question posée sait où ranger sa réponse', () => {
    for (const q of questionsPour({ direction: 'ce-soir' })) expect(q.garde).toBeTruthy()
    for (const q of questionsPour({ direction: 'gout' })) expect(q.garde).toBeTruthy()
  })
})
