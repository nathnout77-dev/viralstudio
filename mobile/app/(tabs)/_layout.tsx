import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../theme/colors'
import { type } from '../../theme/typography'
import { shadow } from '../../theme/theme'

// Métadonnées par onglet (ordre = ordre des <Tabs.Screen>).
const META: Record<string, { label: string; icon: keyof typeof Feather.glyphMap }> = {
  index: { label: 'Cave', icon: 'grid' },
  degustations: { label: 'Dégustations', icon: 'book-open' },
  scan: { label: 'Scan', icon: 'maximize' },
  decouvrir: { label: 'Découvrir', icon: 'compass' },
  profil: { label: 'Profil', icon: 'user' },
}

function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const meta = META[route.name]
        if (!meta) return null
        const focused = state.index === index
        const isScan = route.name === 'scan'

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name)
        }

        // Bouton central surélevé
        if (isScan) {
          return (
            <Pressable key={route.key} style={styles.scanWrap} onPress={onPress} hitSlop={8}>
              <View style={[styles.scanBtn, focused && styles.scanBtnActive]}>
                <Ionicons name="scan" size={26} color={colors.cream} />
              </View>
              <Text style={[styles.label, styles.scanLabel, focused && styles.labelActive]}>{meta.label}</Text>
            </Pressable>
          )
        }

        return (
          <Pressable key={route.key} style={styles.item} onPress={onPress} hitSlop={6}>
            <Feather name={meta.icon} size={21} color={focused ? colors.goldBright : colors.textDim} />
            <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>
              {meta.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.noir } }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="degustations" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="decouvrir" />
      <Tabs.Screen name="profil" />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(22,19,17,0.98)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  label: { ...type.label, fontSize: 10, color: colors.textDim },
  labelActive: { color: colors.goldBright },
  scanWrap: { flex: 1, alignItems: 'center' },
  scanBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginTop: -30,
    backgroundColor: colors.wine,
    borderWidth: 2,
    borderColor: colors.goldBright,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.wine,
  },
  scanBtnActive: { backgroundColor: colors.wineBright },
  scanLabel: { marginTop: 3 },
})
