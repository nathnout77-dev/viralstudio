import React from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../theme/colors'
import { fonts, type } from '../../theme/typography'
import { radius, spacing } from '../../theme/theme'
import SectionHeader from '../../components/SectionHeader'
import WineCard from '../../components/WineCard'
import { cellar, user } from '../../data/wines'

const STATS = [
  { label: 'Bouteilles', value: String(user.cellarCount), icon: 'archive' as const },
  { label: 'Dégustations', value: String(user.tastingCount), icon: 'book-open' as const },
  { label: 'Régions', value: String(user.regionsCount), icon: 'map-pin' as const },
  { label: 'Note moy.', value: `${user.avgScore}`, icon: 'star' as const },
]

const SETTINGS = [
  { label: 'Mon profil de goût', icon: 'sliders' as const },
  { label: 'Mes envies & alertes', icon: 'bell' as const },
  { label: 'Réalité augmentée', icon: 'maximize' as const },
  { label: 'Paramètres', icon: 'settings' as const },
]

export default function ProfilScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingBottom: 120 }}
      >
        {/* En-tête profil */}
        <View style={styles.head}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name[0]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.sub}>Amateur éclairé · Membre depuis 2024</Text>
          </View>
          <Pressable style={styles.editBtn} hitSlop={8}>
            <Feather name="edit-2" size={16} color={colors.goldBright} />
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Feather name={s.icon} size={16} color={colors.goldSoft} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Cave complète */}
        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Ma cave complète" />
          <View style={{ paddingHorizontal: spacing.xl }}>
            {cellar.map((w) => (
              <WineCard key={w.id} wine={w} onPress={(x) => router.push(`/wine/${x.id}`)} />
            ))}
          </View>
        </View>

        {/* Réglages */}
        <View style={{ marginTop: spacing.md, paddingHorizontal: spacing.xl }}>
          <Text style={styles.settingsTitle}>Réglages</Text>
          <View style={styles.settingsCard}>
            {SETTINGS.map((s, i) => (
              <Pressable key={s.label} style={[styles.settingRow, i < SETTINGS.length - 1 && styles.settingBorder]}>
                <Feather name={s.icon} size={18} color={colors.goldSoft} />
                <Text style={styles.settingLabel}>{s.label}</Text>
                <Feather name="chevron-right" size={18} color={colors.textDim} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.wine,
    borderWidth: 1.5,
    borderColor: colors.goldBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.serifBold, fontSize: 26, color: colors.cream },
  name: { ...type.h1, color: colors.cream },
  sub: { ...type.bodySm, color: colors.textMuted, marginTop: 2 },
  editBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    gap: 3,
  },
  statValue: { fontFamily: fonts.serifBold, fontSize: 20, color: colors.cream },
  statLabel: { ...type.label, fontSize: 10, color: colors.textMuted },
  settingsTitle: { ...type.h2, color: colors.cream, marginBottom: spacing.md },
  settingsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: colors.hairline },
  settingLabel: { ...type.body, color: colors.cream, flex: 1 },
})
