import React, { useMemo, useState } from 'react'
import { View, Text, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../theme/colors'
import { type } from '../../theme/typography'
import { radius, spacing } from '../../theme/theme'
import SearchBar from '../../components/SearchBar'
import WineCard from '../../components/WineCard'
import { discover, recommendations, filters } from '../../data/wines'
import type { Wine } from '../../data/types'

const ALL: Wine[] = [...discover, ...recommendations]
const COLOR_OF: Record<string, string> = {
  'f-red': 'red', 'f-white': 'white', 'f-rose': 'rose', 'f-sparkling': 'sparkling', 'f-sweet': 'sweet',
}

export default function DecouvrirScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [active, setActive] = useState('f-all')
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ALL.filter((w) => {
      const colorOk = active === 'f-all' || w.color === COLOR_OF[active]
      const textOk =
        !needle ||
        [w.name, w.region, w.grape, w.country, ...w.tags]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(needle))
      return colorOk && textOk
    })
  }, [active, q])

  return (
    <View style={styles.root}>
      <FlatList
        data={results}
        keyExtractor={(w) => w.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingBottom: 120, paddingHorizontal: spacing.xl }}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <Text style={styles.title}>Découvrir</Text>
            <Text style={styles.sub}>{results.length} vins à explorer</Text>

            <View style={{ marginTop: spacing.md }}>
              <SearchBar value={q} onChangeText={setQ} placeholder="Région, cépage, arôme…" />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: spacing.md, marginHorizontal: -spacing.xl }}
              contentContainerStyle={{ paddingHorizontal: spacing.xl, gap: spacing.sm }}
            >
              {filters.map((f) => {
                const on = active === f.id
                return (
                  <Pressable key={f.id} onPress={() => setActive(f.id)} style={[styles.chip, on && styles.chipOn]}>
                    <Text style={[styles.chipText, on && styles.chipTextOn]}>{f.label}</Text>
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => <WineCard wine={item} onPress={(w) => router.push(`/wine/${w.id}`)} />}
        ListEmptyComponent={<Text style={styles.empty}>Aucun vin ne correspond à votre recherche.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  title: { ...type.h1, color: colors.cream },
  sub: { ...type.bodySm, color: colors.textMuted, marginTop: 2 },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.noir900,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chipOn: { backgroundColor: colors.wine, borderColor: colors.goldBright },
  chipText: { ...type.bodySm, color: colors.textMuted },
  chipTextOn: { color: colors.cream },
  empty: { ...type.body, color: colors.textDim, textAlign: 'center', marginTop: spacing.xxxl },
})
