import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../theme/colors'
import { type } from '../../theme/typography'
import { radius, spacing, shadow } from '../../theme/theme'
import ScreenHeader from '../../components/ScreenHeader'
import AmbientBackground from '../../components/AmbientBackground'
import BottleCarousel from '../../components/BottleCarousel'
import SectionHeader from '../../components/SectionHeader'
import WineCard from '../../components/WineCard'
import TastingRow from '../../components/TastingRow'
import { cellar, recommendations, tastings, user } from '../../data/wines'
import type { Wine } from '../../data/types'

export default function MaCaveScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [search, setSearch] = useState('')

  const openWine = (w: Wine) => router.push(`/wine/${w.id}`)

  return (
    <View style={styles.root}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingBottom: 120 }}
      >
        <ScreenHeader
          greeting={`Bonsoir ${user.name}, votre cave compte ${user.cellarCount} bouteilles.`}
          search={search}
          onSearch={setSearch}
          onPressAR={() => router.navigate('/scan')}
        />

        {/* Cave perso */}
        <View style={styles.caveTitleRow}>
          <Text style={styles.caveTitle}>Ma Cave</Text>
          <Text style={styles.caveCount}>{cellar.length} références</Text>
        </View>
        <BottleCarousel wines={cellar} onPress={openWine} />

        {/* CTA Scanner */}
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }]}
          onPress={() => router.navigate('/scan')}
        >
          <Ionicons name="scan" size={22} color={colors.cream} />
          <Text style={styles.ctaText}>Scanner une bouteille</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.goldBright} />
        </Pressable>

        {/* Recommandations */}
        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Recommandations pour vous" onSeeAll={() => router.navigate('/decouvrir')} />
          <View style={styles.list}>
            {recommendations.slice(0, 4).map((w) => (
              <WineCard key={w.id} wine={w} onPress={openWine} />
            ))}
          </View>
        </View>

        {/* Dégustations (aperçu) */}
        <View style={{ marginTop: spacing.md }}>
          <SectionHeader title="Dégustations" onSeeAll={() => router.navigate('/degustations')} />
          <View style={styles.list}>
            {tastings.slice(0, 3).map((t) => (
              <TastingRow key={t.id} tasting={t} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  caveTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  caveTitle: { ...type.h1, color: colors.cream },
  caveCount: { ...type.label, color: colors.goldSoft },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    borderWidth: 1,
    borderColor: colors.goldBright,
    ...shadow.wine,
  },
  ctaText: { ...type.h3, color: colors.cream },
  list: { paddingHorizontal: spacing.xl },
})
