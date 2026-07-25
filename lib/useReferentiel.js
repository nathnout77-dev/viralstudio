import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// useReferentiel — accès différé à la base viticole nationale.
//
// Le référentiel pèse ~230 Ko : on ne le charge JAMAIS au démarrage. Les
// écrans qui l'affichent (fiche vin, carte, millésimes) l'importent à la
// volée, une seule fois par session — le module reste ensuite en cache.
// ═══════════════════════════════════════════════════════════════════════════

let cache = null
let enVol = null

function charger() {
  if (cache) return Promise.resolve(cache)
  if (!enVol) {
    enVol = import('./referentiel').then(m => { cache = m; return m })
  }
  return enVol
}

// Enrichissement d'une appellation : sol, garde, hiérarchie, crus classés,
// millésimes de la région. `null` tant que le module n'est pas chargé.
export function useAppellationRef(appellation, region) {
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!appellation) { setRef(null); return }
    let vivant = true
    charger().then(R => {
      if (!vivant) return
      const detail = R.detailAppellation(appellation)
      const crus = R.classementsAppellation(appellation)
      const millesimes = region ? R.millesimesRegion(region).slice(0, 5) : []
      const fiche = R.appellationInfo(appellation)
      setRef((detail || crus.length || millesimes.length || fiche)
        ? { detail, crus, millesimes, fiche }
        : null)
    })
    return () => { vivant = false }
  }, [appellation, region])

  return ref
}

// Cépage : arômes, structure, garde, accords — pour les fiches et l'école.
export function useCepageRef(nom) {
  const [ref, setRef] = useState(null)
  useEffect(() => {
    if (!nom) { setRef(null); return }
    let vivant = true
    charger().then(R => { if (vivant) setRef(R.cepageInfo(nom)) })
    return () => { vivant = false }
  }, [nom])
  return ref
}

// Module complet, pour les écrans qui en exploitent plusieurs tables.
export function useReferentiel() {
  const [R, setR] = useState(cache)
  useEffect(() => {
    if (cache) { setR(cache); return }
    let vivant = true
    charger().then(m => { if (vivant) setR(m) })
    return () => { vivant = false }
  }, [])
  return R
}

export default useReferentiel
