import React from 'react'
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'
import { radius, spacing, shadow } from '../theme/theme'
import BottleVisual, { initialsOf } from './BottleVisual'
import ScoreBadge from './ScoreBadge'
import type { Wine } from '../data/types'

// Carousel horizontal de la cave perso : grande bouteille + score + provenance.
type Props = { wines: Wine[]; onPress?: (w: Wine) => void }

export default function BottleCarousel({ wines, onPress }: Props) {
  return (
    <FlatList
      data={wines}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(w) => w.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
          onPress={() => onPress?.(item)}
        >
          {item.score ? (
            <View style={styles.badge}>
              <ScoreBadge score={item.score} size={42} />
            </View>
          ) : null}

          <View style={styles.bottle}>
            <BottleVisual color={item.color} height={150} initials={initialsOf(item.name)} region={item.region} />
          </View>

          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.region} · {item.country}
          </Text>

          <View style={styles.footer}>
            {item.year ? <Text style={styles.year}>{item.year}</Text> : <View />}
            {item.inCellar ? <Text style={styles.count}>×{item.inCellar}</Text> : null}
          </View>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: spacing.xl, paddingVertical: spacing.xs },
  card: {
    width: 158,
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    ...shadow.card,
  },
  badge: { position: 'absolute', top: spacing.md, right: spacing.md, zIndex: 2 },
  bottle: { alignItems: 'center', height: 158, justifyContent: 'center' },
  name: { ...type.h3, fontSize: 15, color: colors.cream, marginTop: spacing.sm },
  meta: { ...type.label, color: colors.textMuted, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  year: { ...type.label, color: colors.goldSoft },
  count: {
    ...type.label,
    color: colors.cream,
    backgroundColor: colors.wine,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
})
