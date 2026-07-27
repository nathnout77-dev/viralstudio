import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme/colors'

// Note /5 en étoiles dorées (demi-étoile gérée).
type Props = { rating: number; size?: number }

export default function RatingStars({ rating, size = 13 }: Props) {
  return (
    <View style={styles.row}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = rating >= i + 1
        const half = !filled && rating >= i + 0.5
        return (
          <Ionicons
            key={i}
            name={filled ? 'star' : half ? 'star-half' : 'star-outline'}
            size={size}
            color={filled || half ? colors.goldBright : colors.textDim}
            style={{ marginRight: 1.5 }}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
})
