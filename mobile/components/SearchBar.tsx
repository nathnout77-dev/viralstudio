import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'
import { radius, spacing } from '../theme/theme'

type Props = {
  value?: string
  onChangeText?: (t: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChangeText, placeholder = 'Vin, domaine, cépage…' }: Props) {
  return (
    <View style={styles.wrap}>
      <Feather name="search" size={18} color={colors.goldSoft} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        returnKeyType="search"
        autoCorrect={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.noir900,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    color: colors.cream,
    ...type.body,
    padding: 0,
  },
})
