import React from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../theme/colors'
import { fonts, type } from '../../theme/typography'
import { radius, spacing, shadow } from '../../theme/theme'
import BottleVisual, { initialsOf } from '../../components/BottleVisual'
import ScoreBadge from '../../components/ScoreBadge'
import RatingStars from '../../components/RatingStars'
import Tag from '../../components/Tag'
import AmbientBackground from '../../components/AmbientBackground'
import { cellar, recommendations, discover } from '../../data/wines'

const ALL = [...cellar, ...recommendations, ...discover]
const COLOR_LABEL: Record<string, string> = {
  red: 'Rouge', white: 'Blanc', rose: 'Rosé', sparkling: 'Effervescent', sweet: 'Moelleux',
}

export default function WineDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const wine = ALL.find((w) => w.id === id)

  if (!wine) {
    return (
      <View style={[styles.root, styles.center]}>
        <Text style={styles.missing}>Vin introuvable.</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>Retour</Text></Pressable>
      </View>
    )
  }

  const facts = [
    ['Millésime', wine.year ? String(wine.year) : '—'],
    ['Cépage', wine.grape ?? '—'],
    ['Région', wine.region],
    ['Prix indicatif', wine.price ? `${wine.price} €` : '—'],
  ]

  return (
    <View style={styles.root}>
      <AmbientBackground />
      <Pressable style={[styles.close, { top: insets.top + spacing.sm }]} onPress={() => router.back()} hitSlop={8}>
        <Feather name="x" size={22} color={colors.cream} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingBottom: 48 }}>
        <View style={styles.hero}>
          <BottleVisual color={wine.color} height={220} initials={initialsOf(wine.name)} region={wine.region} />
          {wine.score ? (
            <View style={styles.scoreFloat}>
              <ScoreBadge score={wine.score} size={58} />
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          <Text style={styles.type}>{COLOR_LABEL[wine.color]} · {wine.country}</Text>
          <Text style={styles.name}>{wine.name}</Text>
          {wine.domaine ? <Text style={styles.domaine}>{wine.domaine}</Text> : null}

          <View style={styles.ratingRow}>
            {wine.rating ? <RatingStars rating={wine.rating} size={17} /> : null}
            {wine.price ? <Text style={styles.price}>{wine.price} €</Text> : null}
          </View>

          <View style={styles.tags}>
            {wine.tags.map((t) => <Tag key={t} label={t} />)}
          </View>

          {/* Fiche */}
          <View style={styles.facts}>
            {facts.map(([k, v], i) => (
              <View key={k} style={[styles.factRow, i < facts.length - 1 && styles.factBorder]}>
                <Text style={styles.factKey}>{k}</Text>
                <Text style={styles.factVal}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Notes de dégustation</Text>
          <Text style={styles.desc}>
            {wine.name} se distingue par un profil {wine.tags[0]?.toLowerCase() ?? 'harmonieux'}.
            Un {COLOR_LABEL[wine.color].toLowerCase()} de {wine.region} porté par le {wine.grape ?? 'terroir local'},
            à savourer autour de {wine.price ? `${wine.price} €` : 'son juste prix'}.
          </Text>

          <Pressable style={styles.addBtn}>
            <Feather name="plus" size={18} color={colors.cream} />
            <Text style={styles.addText}>Ajouter à ma cave</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  center: { alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  missing: { ...type.h2, color: colors.cream },
  back: { ...type.body, color: colors.goldBright },
  close: {
    position: 'absolute',
    right: spacing.xl,
    zIndex: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(12,10,9,0.6)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { alignItems: 'center', justifyContent: 'center', height: 240 },
  scoreFloat: { position: 'absolute', right: spacing.xxxl, top: 40 },
  body: { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  type: { ...type.overline, color: colors.goldSoft },
  name: { ...type.display, fontSize: 30, color: colors.cream, marginTop: spacing.xs },
  domaine: { ...type.body, color: colors.textMuted, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  price: { fontFamily: fonts.serifBold, fontSize: 22, color: colors.goldBright },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  facts: {
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  factBorder: { borderBottomWidth: 1, borderBottomColor: colors.hairline },
  factKey: { ...type.body, color: colors.textMuted },
  factVal: { ...type.body, color: colors.cream, fontFamily: fonts.serifMedium },
  sectionTitle: { ...type.h2, color: colors.cream, marginTop: spacing.xl },
  desc: { ...type.body, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 22 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    borderWidth: 1,
    borderColor: colors.goldBright,
    ...shadow.wine,
  },
  addText: { ...type.h3, color: colors.cream },
})
