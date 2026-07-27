import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'
import { spacing } from '../theme/theme'

type Props = { title: string; onSeeAll?: () => void }

export default function SectionHeader({ title, onSeeAll }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll ? (
        <Pressable style={styles.link} onPress={onSeeAll} hitSlop={8}>
          <Text style={styles.linkText}>Voir tout</Text>
          <Feather name="chevron-right" size={15} color={colors.goldSoft} />
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  title: { ...type.h2, color: colors.cream },
  link: { flexDirection: 'row', alignItems: 'center' },
  linkText: { ...type.bodySm, color: colors.goldSoft, marginRight: 1 },
})
