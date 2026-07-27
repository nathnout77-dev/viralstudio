import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'
import { colors } from '../theme/colors'

// Halo bordeaux diffus en haut d'écran — profondeur « cave » sans image.
export default function AmbientBackground() {
  return (
    <View style={styles.fill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="8%" r="70%">
            <Stop offset="0" stopColor={colors.wine} stopOpacity={0.42} />
            <Stop offset="0.45" stopColor={colors.wineDeep} stopOpacity={0.18} />
            <Stop offset="1" stopColor={colors.noir} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject },
})
