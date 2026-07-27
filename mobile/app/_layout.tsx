import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display'
import { colors } from '../theme/colors'

// Garde le splash tant que les polices serif ne sont pas prêtes.
SplashScreen.preventAutoHideAsync().catch(() => {})

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {})
  }, [loaded, error])

  // On rend l'app même si le chargement des polices échoue (fallback système),
  // pour ne jamais bloquer sur un écran vide.
  if (!loaded && !error) return null

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.noir },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="wine/[id]" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  )
}
