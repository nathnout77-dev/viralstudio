import { useEffect, useState } from 'react'
import '../styles/globals.css'
import 'leaflet/dist/leaflet.css'
import { Toaster } from '../components/Toast'
import { inter, fraunces, tangerine } from '../lib/fonts'
import { WifiOff } from 'lucide-react'

export default function App({ Component, pageProps }) {
  const [horsLigne, setHorsLigne] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    // Indicateur hors-ligne : l'app reste utilisable (bibliothèque, cave,
    // quiz, recherche pré-cachés) — seules les fonctions IA sont coupées.
    setHorsLigne(!navigator.onLine)
    const on = () => setHorsLigne(false)
    const off = () => setHorsLigne(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  return (
    <div className={`${inter.variable} ${fraunces.variable} ${tangerine.variable}`}>
      <Component {...pageProps} />
      <Toaster />
      {horsLigne && (
        <div
          className="fixed left-0 right-0 z-[100] flex items-center justify-center gap-2 py-1.5 px-4 text-[11px] font-semibold text-cream animate-fade-in pointer-events-none bottom-[calc(64px+env(safe-area-inset-bottom))] md:bottom-0"
          style={{ background: 'rgba(28,25,23,0.92)' }}
          role="status"
        >
          <WifiOff size={12} className="text-gold-500 flex-shrink-0" />
          Hors-ligne — bibliothèque, cave et quiz restent disponibles. Scan et assistant reviendront avec le réseau.
        </div>
      )}
    </div>
  )
}
