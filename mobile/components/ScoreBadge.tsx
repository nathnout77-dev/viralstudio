import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, scoreColor } from '../theme/colors'
import { fonts } from '../theme/typography'

// Pastille de score /100, teintée selon le niveau (vert / or / cuivre).
type Props = { score: number; size?: number }

export default function ScoreBadge({ score, size = 46 }: Props) {
  const c = scoreColor(score)
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: c,
          shadowColor: c,
        },
      ]}
    >
      <Text style={[styles.score, { color: c, fontSize: size * 0.4 }]}>{score}</Text>
      <Text style={styles.max}>/100</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(12,10,9,0.82)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  score: {
    fontFamily: fonts.serifBold,
    includeFontPadding: false,
    lineHeight: undefined,
  },
  max: {
    color: colors.textDim,
    fontSize: 7,
    letterSpacing: 0.5,
    marginTop: -1,
  },
})
