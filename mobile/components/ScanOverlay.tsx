import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { fonts, type } from '../theme/typography'
import { radius, spacing } from '../theme/theme'

// Cadre de visée par-dessus la caméra : 4 coins dorés + consigne + pastille
// de reconnaissance temps réel (statut passé par le parent).
type Props = { hint: string; detection?: string | null }

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = {
    tl: { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: radius.md },
    tr: { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: radius.md },
    bl: { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: radius.md },
    br: { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: radius.md },
  }[pos]
  return <View style={[styles.corner, base]} />
}

export default function ScanOverlay({ hint, detection }: Props) {
  return (
    <View style={styles.fill} pointerEvents="none">
      <View style={styles.frame}>
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {detection ? (
          <View style={styles.pill}>
            <View style={styles.live} />
            <Text style={styles.pillText} numberOfLines={1}>{detection}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.hint}>{hint}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: '68%',
    aspectRatio: 0.62,
    maxHeight: '58%',
  },
  corner: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderColor: colors.goldBright,
  },
  pill: {
    position: 'absolute',
    bottom: -18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(12,10,9,0.92)',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxWidth: 260,
  },
  live: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.scoreHigh, marginRight: 7 },
  pillText: { ...type.bodySm, color: colors.cream, fontFamily: fonts.serifMedium },
  hint: {
    position: 'absolute',
    bottom: spacing.xxxl + spacing.xl,
    ...type.body,
    color: colors.cream,
    textAlign: 'center',
    paddingHorizontal: spacing.xxl,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 6,
  },
})
