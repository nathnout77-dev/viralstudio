import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { type } from '../theme/typography'

// Petite étiquette de descripteur (« Complexe & Fruité »).
export default function Tag({ label }: { label: string }) {
  return <Text style={styles.tag}>{label}</Text>
}

const styles = StyleSheet.create({
  tag: {
    ...type.label,
    color: colors.goldSoft,
    backgroundColor: 'rgba(201,168,76,0.10)',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginRight: 6,
    marginTop: 6,
    overflow: 'hidden',
  },
})
