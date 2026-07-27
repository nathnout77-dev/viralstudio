import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter, useFocusEffect } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../theme/colors'
import { fonts, type } from '../../theme/typography'
import { radius, spacing, shadow } from '../../theme/theme'
import ScanOverlay from '../../components/ScanOverlay'
import ScoreBadge from '../../components/ScoreBadge'
import { recommendations } from '../../data/wines'

type Phase = 'scanning' | 'found'
// Vin « reconnu » (démo) — dans l'app réelle, viendrait de l'analyse vision.
const DETECTED = recommendations[2] // Barolo — Pio Cesare

export default function ScanScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [permission, requestPermission] = useCameraPermissions()
  const [phase, setPhase] = useState<Phase>('scanning')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Relance la « détection » à chaque fois que l'onglet reprend le focus.
  useFocusEffect(
    React.useCallback(() => {
      setPhase('scanning')
      timer.current = setTimeout(() => setPhase('found'), 2600)
      return () => { if (timer.current) clearTimeout(timer.current) }
    }, [])
  )

  const rescan = () => {
    if (timer.current) clearTimeout(timer.current)
    setPhase('scanning')
    timer.current = setTimeout(() => setPhase('found'), 2400)
  }

  // Permission en cours de chargement
  if (!permission) {
    return (
      <View style={[styles.root, styles.center]}>
        <ActivityIndicator color={colors.gold} />
      </View>
    )
  }

  // Permission refusée / non demandée
  if (!permission.granted) {
    return (
      <View style={[styles.root, styles.center, { padding: spacing.xxl }]}>
        <Feather name="camera-off" size={40} color={colors.goldSoft} />
        <Text style={styles.permTitle}>Accès caméra requis</Text>
        <Text style={styles.permText}>
          Œno a besoin de la caméra pour lire vos étiquettes et vous donner un avis instantané.
        </Text>
        <Pressable style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Autoriser la caméra</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <CameraView style={StyleSheet.absoluteFill} facing="back" />
      <View style={styles.scrim} pointerEvents="none" />

      <ScanOverlay
        hint={phase === 'scanning' ? "Cadrez l'étiquette dans le cadre" : 'Bouteille identifiée'}
        detection={phase === 'scanning' ? 'Analyse de l’étiquette…' : DETECTED.name}
      />

      {/* Fermer */}
      <Pressable style={[styles.close, { top: insets.top + spacing.sm }]} onPress={() => router.navigate('/')} hitSlop={8}>
        <Feather name="x" size={22} color={colors.cream} />
      </Pressable>

      {/* Résultat */}
      {phase === 'found' ? (
        <View style={[styles.result, { paddingBottom: insets.bottom + 96 }]}>
          <Pressable
            style={({ pressed }) => [styles.resultCard, pressed && { opacity: 0.9 }]}
            onPress={() => router.push(`/wine/${DETECTED.id}`)}
          >
            {DETECTED.score ? <ScoreBadge score={DETECTED.score} size={48} /> : null}
            <View style={styles.resultInfo}>
              <Text style={styles.resultName} numberOfLines={1}>{DETECTED.name}</Text>
              <Text style={styles.resultMeta} numberOfLines={1}>
                {DETECTED.region} · {DETECTED.grape} · {DETECTED.price} €
              </Text>
              <Text style={styles.resultCta}>Voir la fiche complète →</Text>
            </View>
          </Pressable>
          <Pressable style={styles.rescan} onPress={rescan} hitSlop={8}>
            <Feather name="refresh-cw" size={14} color={colors.goldSoft} />
            <Text style={styles.rescanText}>Scanner une autre bouteille</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.noir },
  center: { alignItems: 'center', justifyContent: 'center' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(12,10,9,0.28)' },
  close: {
    position: 'absolute',
    left: spacing.xl,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(12,10,9,0.6)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.xl },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: 'rgba(22,19,17,0.97)',
    borderColor: colors.goldBright,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.gold,
  },
  resultInfo: { flex: 1 },
  resultName: { ...type.h2, color: colors.cream },
  resultMeta: { ...type.bodySm, color: colors.textMuted, marginTop: 2 },
  resultCta: { ...type.label, color: colors.goldBright, marginTop: spacing.sm },
  rescan: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.md },
  rescanText: { ...type.bodySm, color: colors.goldSoft },
  permTitle: { ...type.h2, color: colors.cream, marginTop: spacing.lg },
  permText: { ...type.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm },
  permBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.wine,
    borderColor: colors.goldBright,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  permBtnText: { ...type.h3, color: colors.cream, fontFamily: fonts.serif },
})
