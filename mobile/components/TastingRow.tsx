import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'
import { radius, spacing } from '../theme/theme'
import RatingStars from './RatingStars'
import type { Tasting } from '../data/types'

// Ligne d'historique de dégustation : vin, région, date, note, commentaire.
export default function TastingRow({ tasting }: { tasting: Tasting }) {
  return (
    <View style={styles.row}>
      <View style={styles.dateChip}>
        <Text style={styles.date}>{tasting.date}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{tasting.wineName}</Text>
        <Text style={styles.region}>{tasting.region}</Text>
        {tasting.note ? <Text style={styles.note} numberOfLines={2}>{tasting.note}</Text> : null}
        <View style={{ marginTop: spacing.xs }}>
          <RatingStars rating={tasting.rating} size={12} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  dateChip: {
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.hairline,
    marginRight: spacing.md,
  },
  date: { ...type.label, color: colors.goldSoft, textAlign: 'center' },
  body: { flex: 1 },
  name: { ...type.h3, fontSize: 15, color: colors.cream },
  region: { ...type.label, color: colors.textMuted, marginTop: 1 },
  note: { ...type.bodySm, color: colors.textMuted, marginTop: spacing.xs, fontStyle: 'italic' },
})
