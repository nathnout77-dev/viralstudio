import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Inclinaison 3D subtile façon carte physique — desktop uniquement.
// Écrit directement style.transform via ref (throttlé par rAF) : aucun
// re-render React pendant le survol. Désactivé sur pointeur grossier
// (tactile) et si l'utilisateur préfère les mouvements réduits.
// ═══════════════════════════════════════════════════════════════════════════

export default function useTilt({ max = 2.5, lift = '-4px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return undefined
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return undefined

    let raf = 0
    let point = null

    const apply = () => {
      raf = 0
      if (!point) return
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      const px = (point.x - r.left) / r.width - 0.5   // -0.5 → 0.5
      const py = (point.y - r.top) / r.height - 0.5
      const rx = (-py * 2 * max).toFixed(2)
      const ry = (px * 2 * max).toFixed(2)
      el.style.transform = `perspective(800px) translateY(${lift}) rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    const onEnter = () => {
      // L'animation d'entrée (fill-mode both) gèlerait le transform : on la coupe.
      el.style.animation = 'none'
      el.style.transition = 'transform 0.18s ease-out, box-shadow 0.5s var(--ease-luxe), border-color 0.5s var(--ease-luxe)'
    }
    const onMove = e => {
      point = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      point = null
      if (raf) { cancelAnimationFrame(raf); raf = 0 }
      // Retour doux à plat, avec l'easing signature.
      el.style.transition = 'transform 0.6s var(--ease-luxe), box-shadow 0.5s var(--ease-luxe), border-color 0.5s var(--ease-luxe)'
      el.style.transform = ''
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [max, lift])

  return ref
}
