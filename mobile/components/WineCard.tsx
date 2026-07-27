import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'
import { radius, spacing, shadow } from '../theme/theme'
import BottleVisual, { initialsOf } from './BottleVisual'
import RatingStars from './RatingStars'
import Tag from './Tag'
import type { Wine } from '../data/types'

// Carte horizontale de vin : bouteille + cuvée, provenance, note, prix, tags.
type Props = { wine: Wine; onPress?: (w: Wine) => void }

export default function WineCard({ wine, onPress }: Props) {
  const meta = [wine.region, wine.grape, wine.country].filter(Boolean).join(' · ')
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress?.(wine)}
    >
      <View style={styles.bottleWrap}>
        <BottleVisual color={wine.color} height={104} initials={initialsOf(wine.name)} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{wine.name}</Text>
        <Text style={styles.meta} numberOfLines={1}>{meta}</Text>

        <View style={styles.ratingRow}>
          {wine.rating ? <RatingStars rating={wine.rating} /> : null}
          {wine.price ? <Text style={styles.price}>{wine.price} €</Text> : null}
        </View>

        <View style={styles.tags}>
          {wine.tags.slice(0, 2).map((t) => <Tag key={t} label={t} />)}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  bottleWrap: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1, justifyContent: 'center' },
  name: { ...type.h3, color: colors.cream },
  meta: { ...type.bodySm, color: colors.textMuted, marginTop: 2 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  price: { ...type.body, color: colors.goldBright, fontWeight: '700' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 2 },
})
