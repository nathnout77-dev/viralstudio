// ═══════════════════════════════════════════════════════════════════════════
// Le glouglou d'Œno — le son d'un message qui arrive.
//
// Synthétisé, pas enregistré : rien à télécharger, rien à mettre en cache,
// il fonctionne hors-ligne et pèse le poids de ce fichier.
//
// Ce qu'on imite : une bulle d'air qui remonte dans le goulot. En se
// contractant, elle monte en fréquence — c'est cette montée qui fait entendre
// « glou » plutôt qu'un bip. Trois bulles, de plus en plus graves à mesure
// que la bouteille se vide.
//
// Portée : ce son ne peut jouer que si l'app est ouverte. Les navigateurs
// ignorent le son personnalisé d'une notification système ; application
// fermée, c'est la sonnerie de l'appareil qui se fait entendre.
// ═══════════════════════════════════════════════════════════════════════════

let contexte = null

function audio() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  try {
    if (!contexte) contexte = new AC()
    // Les navigateurs suspendent le son tant que l'utilisateur n'a rien
    // touché : on relance à chaque fois, sans bloquer si c'est refusé.
    if (contexte.state === 'suspended') contexte.resume().catch(() => {})
    return contexte
  } catch { return null }
}

const BULLES = [
  { retard: 0.000, grave: 190, aigu: 560, duree: 0.085 },
  { retard: 0.135, grave: 165, aigu: 495, duree: 0.090 },
  { retard: 0.275, grave: 140, aigu: 430, duree: 0.100 },
]

/** Joue le glouglou. Renvoie `false` si le navigateur n'a pas voulu. */
export function glouglou({ volume = 0.28 } = {}) {
  const ac = audio()
  if (!ac) return false
  try {
    const depart = ac.currentTime + 0.02

    const sortie = ac.createGain()
    sortie.gain.value = volume
    // Passe-bas : arrondit le timbre, sans quoi la sinusoïde sonne électronique.
    const rondeur = ac.createBiquadFilter()
    rondeur.type = 'lowpass'
    rondeur.frequency.value = 1400
    rondeur.Q.value = 0.7
    sortie.connect(rondeur)
    rondeur.connect(ac.destination)

    for (const b of BULLES) {
      const t = depart + b.retard
      const osc = ac.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(b.grave, t)
      osc.frequency.exponentialRampToValueAtTime(b.aigu, t + b.duree * 0.75)
      // Léger retombé en fin de bulle : c'est ce qui la fait « claquer ».
      osc.frequency.exponentialRampToValueAtTime(b.aigu * 0.82, t + b.duree)

      const enveloppe = ac.createGain()
      enveloppe.gain.setValueAtTime(0.0001, t)
      enveloppe.gain.exponentialRampToValueAtTime(1, t + 0.012)
      enveloppe.gain.exponentialRampToValueAtTime(0.0001, t + b.duree)

      osc.connect(enveloppe)
      enveloppe.connect(sortie)
      osc.start(t)
      osc.stop(t + b.duree + 0.02)
    }
    return true
  } catch { return false }
}

/**
 * Débloque le son au premier geste de l'utilisateur. Sans cela, le tout
 * premier message reçu resterait muet : un navigateur refuse de jouer quoi
 * que ce soit avant une interaction.
 */
export function amorcerSon() {
  if (typeof window === 'undefined') return
  const amorce = () => { audio() }
  window.addEventListener('pointerdown', amorce, { once: true, passive: true })
  window.addEventListener('keydown', amorce, { once: true })
}
