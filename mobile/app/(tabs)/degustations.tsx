import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../theme/colors'
import { type } from '../../theme/typography'
import { spacing } from '../../theme/theme'
import TastingRow from '../../components/TastingRow'
import RatingStars from '../../components/RatingStars'
import { tastings } from '../../data/wines'

export default function DegustationsScreen() {
  const insets = useSafeAreaInsets()
  const avg = tastings.reduce((s, t) => s + t.rating, 0) / tastings.length

  return (
    <View style={styles.root}>
      <FlatList
        data={tastings}
        keyExtractor={(t) => t.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingBottom: 120, paddingHorizontal: spacing.xl }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Dégustations</Text>
            <Text style={styles.sub}>Votre carnet — {tastings.length} notes récentes</Text>
            <View style={styles.avgRow}>
              <Text style={styles.avgNum}>{avg.toFixed(1)}</Text>
              <View>
                <RatingStars rating={avg} size={16} />
                <Text style={styles.avgLabel}>Note moyenne</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => <TastingRow tasting={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  header: { marginBottom: spacing.lg },
  title: { ...type.h1, color: colors.cream },
  sub: { ...type.bodySm, color: colors.textMuted, marginTop: 2 },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.lg,
  },
  avgNum: { ...type.display, color: colors.goldBright },
  avgLabel: { ...type.label, color: colors.textMuted, marginTop: 3 },
})
