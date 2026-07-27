// Familles de police. Les titres utilisent Playfair Display (serif élégante),
// chargée via @expo-google-fonts/playfair-display dans app/_layout.tsx.
// Le corps de texte reste sur la police système (lisibilité, poids léger).
export const fonts = {
  serif: 'PlayfairDisplay_600SemiBold',
  serifMedium: 'PlayfairDisplay_500Medium',
  serifBold: 'PlayfairDisplay_700Bold',
} as const

export const type = {
  // Titres serif
  display: { fontFamily: fonts.serifBold, fontSize: 34, lineHeight: 40 },
  h1: { fontFamily: fonts.serifBold, fontSize: 26, lineHeight: 32 },
  h2: { fontFamily: fonts.serif, fontSize: 20, lineHeight: 26 },
  h3: { fontFamily: fonts.serif, fontSize: 17, lineHeight: 22 },

  // Corps (système)
  body: { fontSize: 15, lineHeight: 21 },
  bodySm: { fontSize: 13, lineHeight: 18 },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  overline: { fontSize: 11, lineHeight: 14, letterSpacing: 1.6, textTransform: 'uppercase' as const },
} as const
