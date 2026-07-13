import { useEffect } from 'react'
import '../styles/globals.css'
import { Toaster } from '../components/Toast'
import { inter, fraunces, tangerine } from '../lib/fonts'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <div className={`${inter.variable} ${fraunces.variable} ${tangerine.variable}`}>
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}
