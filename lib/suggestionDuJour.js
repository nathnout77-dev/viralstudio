// ─────────────────────────────────────────────────────────────────────────────
// Suggestion du jour — le cerveau contextuel du hub d'accueil.
// Regarde la cave, le journal et la progression pour proposer LA prochaine
// action pertinente, avec repli saisonnier si l'utilisateur démarre à vide.
// Priorités : bouteille dans sa fenêtre idéale > leçon en cours > saison.
// ─────────────────────────────────────────────────────────────────────────────
import { WINE_DB } from '../data/wineDatabase'
import { LECONS } from '../data/lecons'

const lireJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed ?? fallback
  } catch { return fallback }
}

// Bouteilles de la cave actuellement dans leur fenêtre de dégustation,
// les plus « urgentes » (proches de la fin de fenêtre) d'abord.
export function bouteillesAFenetre(wines = []) {
  const annee = new Date().getFullYear()
  return wines
    .filter(w => w.quantity > 0 && w.vintage)
    .map(w => {
      const debut = w.vintage + (w.drinkFrom || 2)
      const fin   = w.vintage + (w.drinkUntil || 8)
      return { ...w, _debut: debut, _fin: fin, _restant: fin - annee }
    })
    .filter(w => annee >= w._debut && annee <= w._fin)
    .sort((a, b) => a._restant - b._restant)
}

export function computeSuggestionDuJour(wines = []) {
  // 1. Une bouteille de la cave entre (ou est) dans sa fenêtre idéale
  const fenetre = bouteillesAFenetre(wines)
  if (fenetre.length > 0) {
    const w = fenetre[0]
    const urgent = w._restant <= 1
    return {
      type: 'cave',
      eyebrow: 'Dans votre cave',
      titre: `${w.name} ${w.vintage}`,
      texte: urgent
        ? `Dernière ligne droite : sa fenêtre idéale se referme ${w._restant === 0 ? 'cette année' : 'l’an prochain'}. C’est le moment de l’ouvrir.`
        : `Ce vin est aujourd’hui dans sa fenêtre idéale (${w._debut}–${w._fin}). Une belle occasion s’annonce ?`,
      action: 'cave',
      actionLabel: 'Voir ma cave',
    }
  }

  // 2. Un parcours d'apprentissage est en cours
  const ecole = lireJSON('oeno-ecole', {})
  const faites = Object.values(ecole).filter(l => l?.done).length
  if (faites > 0 && faites < LECONS.length) {
    const prochaine = LECONS.find(l => !ecole[l.id]?.done)
    return {
      type: 'apprendre',
      eyebrow: 'Votre progression',
      titre: prochaine ? `Leçon suivante : ${prochaine.titre}` : 'Continuez votre parcours',
      texte: `${faites} leçon${faites > 1 ? 's' : ''} sur ${LECONS.length} déjà validée${faites > 1 ? 's' : ''}. Encore un petit pas ce soir ?`,
      action: 'apprendre',
      actionLabel: 'Reprendre',
    }
  }

  // 3. Repli saisonnier : un vin de la bibliothèque adapté au moment de l'année
  const mois = new Date().getMonth() // 0-11
  const ete = mois >= 4 && mois <= 8
  const pool = ete
    ? WINE_DB.filter(w => ['rosé', 'white'].includes(w.type) && w.difficulte === 'facile' && w.prixMoyen <= 20)
    : WINE_DB.filter(w => w.type === 'red' && w.difficulte === 'facile' && w.prixMoyen <= 20)
  // Choix stable sur la journée : même suggestion du matin au soir
  const jour = Math.floor(Date.now() / 86400000)
  const w = pool.length ? pool[jour % pool.length] : WINE_DB[jour % WINE_DB.length]
  return {
    type: 'decouverte',
    eyebrow: ete ? 'L’idée de la saison' : 'La découverte du jour',
    titre: w.appellation,
    texte: `« ${w.enUneMot} » — ${w.region}, environ ${w.prixMoyen} €. ${ete ? 'Parfait servi bien frais en ce moment.' : 'Parfait pour la saison.'}`,
    action: 'vins',
    actionSearch: w.appellation,
    actionLabel: 'Découvrir ce vin',
  }
}
