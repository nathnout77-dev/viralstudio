import { useEffect } from 'react'
import '../styles/globals.css'
import { Toaster } from '../components/Toast'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}
