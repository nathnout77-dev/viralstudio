// Palette Œno — reprise exacte des tokens de l'app web (tailwind.config.js)
// pour une identité de marque unifiée entre le PWA et le natif.
export const colors = {
  // Fonds « pierre chaude » — noir profond luxe → surfaces
  noir: '#0C0A09',
  noir900: '#1C1917',
  noir800: '#292524',
  surface: '#161311',
  surfaceRaised: '#211B18',

  // Bordeaux
  wine: '#5C0D22',
  wineDeep: '#3A0616',
  wine700: '#72102A',
  wineBright: '#9A1633',
  wineGlow: 'rgba(114,16,42,0.55)',

  // Or
  gold: '#C9A84C',
  goldBright: '#E8C96B',
  goldSoft: '#D4A847',
  goldDeep: '#A16207',
  goldGlow: 'rgba(201,168,76,0.28)',

  // Texte
  cream: '#FAFAF9',
  textMuted: '#A8A29E',
  textDim: '#78716C',

  // Traits
  border: 'rgba(201,168,76,0.16)',
  borderSoft: 'rgba(250,250,249,0.08)',
  hairline: 'rgba(250,250,249,0.06)',

  // Score /100 — vert / or / cuivre
  scoreHigh: '#7FB069',
  scoreMid: '#D4A847',
  scoreLow: '#C2603E',

  // Couleurs de robe (pastille par type de vin)
  robe: {
    red: '#7A1226',
    white: '#D9C879',
    rose: '#E4859B',
    sparkling: '#E8D9A0',
    sweet: '#C79A3E',
  },
} as const

// Note de score → couleur (vert ≥ 90, or ≥ 85, cuivre en dessous)
export function scoreColor(score: number): string {
  if (score >= 90) return colors.scoreHigh
  if (score >= 85) return colors.scoreMid
  return colors.scoreLow
}

export type WineColor = keyof typeof colors.robe
