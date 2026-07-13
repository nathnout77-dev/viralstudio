// ═══════════════════════════════════════════════════════════════════════════
// Polices auto-hébergées via next/font/google.
// Remplace les <link> Google Fonts de pages/_document.jsx : les fichiers de
// police sont téléchargés au build et servis depuis notre propre domaine
// (plus de dépendance réseau à fonts.googleapis.com au runtime, zéro layout
// shift grâce au fallback automatique de next/font).
// Chaque police expose une variable CSS consommée par styles/globals.css et
// tailwind.config.js à la place des `font-family` en dur.
// ═══════════════════════════════════════════════════════════════════════════
import { Inter, Fraunces, Tangerine } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

// Fraunces variable : on garde l'axe optique (opsz) et l'italique, comme
// dans le <link> Google Fonts d'origine (ital,opsz,wght@0,9..144,300..700;1,9..144,300..500).
export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tangerine',
  display: 'swap',
})
