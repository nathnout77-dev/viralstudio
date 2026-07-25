import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useSwipeNav — navigation par glissement horizontal entre onglets (mobile).
// Retour utilisateur : pouvoir swiper gauche/droite pour passer d'un onglet à
// l'autre. Déclenché uniquement sur un VRAI swipe horizontal : jamais pendant
// un scroll vertical, ni depuis la carte Leaflet, un carrousel/scroller
// horizontal, ou toute zone marquée [data-noswipe]. Désactivé dès qu'un
// overlay est ouvert (voir `enabled`).
// ─────────────────────────────────────────────────────────────────────────────
export default function useSwipeNav({ order, current, onNavigate, enabled = true }) {
  const start = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const SEUIL = 64    // distance horizontale minimale (px)
    const RATIO = 1.4   // l'horizontal doit dominer le vertical pour valider

    // Un geste qui démarre dans une zone qui « mange » l'horizontal (carte,
    // scroller, slider) ne doit jamais faire changer d'onglet.
    const bloque = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        if (n.classList?.contains?.('leaflet-container')) return true
        if (n.getAttribute?.('data-noswipe') !== null && n.hasAttribute?.('data-noswipe')) return true
        if (n.scrollWidth - n.clientWidth > 8) {
          const ox = getComputedStyle(n).overflowX
          if (ox === 'auto' || ox === 'scroll') return true
        }
      }
      return false
    }

    const onStart = (e) => {
      if (e.touches.length !== 1) { start.current = null; return }
      const t = e.touches[0]
      start.current = bloque(e.target) ? null : { x: t.clientX, y: t.clientY }
    }
    const onEnd = (e) => {
      const s = start.current
      start.current = null
      if (!s) return
      const t = e.changedTouches[0]
      const dx = t.clientX - s.x
      const dy = t.clientY - s.y
      if (Math.abs(dx) < SEUIL) return
      if (Math.abs(dx) < Math.abs(dy) * RATIO) return
      const i = order.indexOf(current)
      if (i === -1) return
      // Sens « carrousel » : le doigt pousse le contenu. Glisser vers la gauche
      // fait entrer l'onglet de DROITE, glisser vers la droite ramène celui de
      // GAUCHE — le geste des galeries photo et des applis natives.
      const j = dx < 0 ? i + 1 : i - 1
      if (j < 0 || j >= order.length) return
      onNavigate(order[j])
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [order, current, onNavigate, enabled])
}
