import { useEffect, useState } from 'react'
import { MiniVerre } from './WineGlassAnim'

// ═══════════════════════════════════════════════════════════════════════════
// Toasts œnologiques — feedback global unifié.
// API : toast('Ajouté à votre cave') depuis n'importe quel composant.
// Transport par événement window custom (cohérent avec le pattern Envies) :
// aucun contexte à câbler, fonctionne aussi depuis les overlays dynamiques.
// <Toaster /> est monté une fois dans _app.jsx.
// ═══════════════════════════════════════════════════════════════════════════

const EVENT = 'oeno-toast'
const DURATION = 3000
const LEAVE = 300 // durée de l'animation de sortie (toastOut)

export function toast(message) {
  if (typeof window === 'undefined' || !message) return
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { message } }))
}

let seq = 0

export function Toaster() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const timers = []
    const onToast = e => {
      const id = ++seq
      // Empilement max 2 : le plus ancien cède sa place immédiatement.
      setItems(prev => [...prev.filter(t => !t.leaving).slice(-1), { id, message: e.detail.message, leaving: false }])
      timers.push(
        setTimeout(() => setItems(prev => prev.map(t => (t.id === id ? { ...t, leaving: true } : t))), DURATION),
        setTimeout(() => setItems(prev => prev.filter(t => t.id !== id)), DURATION + LEAVE)
      )
    }
    window.addEventListener(EVENT, onToast)
    return () => {
      window.removeEventListener(EVENT, onToast)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      aria-live="polite"
      className="fixed z-[130] bottom-24 md:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 flex flex-col items-center sm:items-end gap-2 pointer-events-none"
    >
      {items.map(t => (
        <div key={t.id} className={`toast-oeno ${t.leaving ? 'toast-leaving' : ''}`} role="status">
          <MiniVerre color="#c9a84c" fillLevel={0.7} size={14} stroke="rgba(250,250,249,0.5)" />
          <span className="font-serif text-sm text-cream">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
