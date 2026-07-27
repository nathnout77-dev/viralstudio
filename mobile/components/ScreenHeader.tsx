import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { fonts, type } from '../theme/typography'
import { spacing } from '../theme/theme'
import SearchBar from './SearchBar'

type Props = {
  greeting?: string
  showSearch?: boolean
  search?: string
  onSearch?: (t: string) => void
  onPressAR?: () => void
}

// En-tête : logo ŒNO + accès Réalité augmentée, salutation, barre de recherche.
export default function ScreenHeader({ greeting, showSearch = true, search, onSearch, onPressAR }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>ŒNO</Text>
          <View style={styles.dot} />
        </View>
        <Pressable style={styles.arBtn} onPress={onPressAR} hitSlop={8}>
          <Ionicons name="scan-outline" size={20} color={colors.goldBright} />
        </Pressable>
      </View>

      {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}

      {showSearch ? (
        <View style={{ marginTop: spacing.md }}>
          <SearchBar value={search} onChangeText={onSearch} />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brand: {
    fontFamily: fonts.serifBold,
    fontSize: 26,
    color: colors.goldBright,
    letterSpacing: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.wineBright,
    marginLeft: 4,
    marginTop: 10,
  },
  arBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.noir900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: { ...type.body, color: colors.textMuted, marginTop: spacing.md },
})
