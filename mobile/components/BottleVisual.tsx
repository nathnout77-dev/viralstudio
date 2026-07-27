import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path, Rect, G, Text as SvgText } from 'react-native-svg'
import { colors, type WineColor } from '../theme/colors'

// Bouteille dessinée en SVG — aucune image à charger (offline, toujours net,
// look intentionnel). La robe teinte le verre ; l'étiquette porte les initiales.
type Props = {
  color: WineColor
  height?: number
  initials?: string
  region?: string
}

const glassFor: Record<WineColor, [string, string]> = {
  red: ['#4A0E1C', '#210610'],
  white: ['#5A5326', '#2E2A12'],
  rose: ['#6E2A38', '#3A121C'],
  sparkling: ['#5C5326', '#2E2A12'],
  sweet: ['#5A3E14', '#2E2008'],
}

export default function BottleVisual({ color, height = 150, initials = 'Œ', region }: Props) {
  const width = height * 0.3
  const [g0, g1] = glassFor[color]
  const uid = React.useId()

  return (
    <Svg width={width} height={height} viewBox="0 0 60 200">
      <Defs>
        <LinearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={g0} />
          <Stop offset="0.5" stopColor={g1} />
          <Stop offset="1" stopColor={g0} />
        </LinearGradient>
        <LinearGradient id={`cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors.goldDeep} />
          <Stop offset="0.5" stopColor={colors.goldBright} />
          <Stop offset="1" stopColor={colors.goldDeep} />
        </LinearGradient>
      </Defs>

      {/* Silhouette */}
      <Path
        d="M30 6 C33 6 35 8 35 12 L35 46 C35 54 50 60 50 82 L50 186 C50 194 46 196 40 196 L20 196 C14 196 10 194 10 186 L10 82 C10 60 25 54 25 46 L25 12 C25 8 27 6 30 6 Z"
        fill={`url(#glass-${uid})`}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth={0.5}
      />

      {/* Reflet vertical */}
      <Rect x={16} y={72} width={3} height={112} rx={1.5} fill="rgba(255,255,255,0.10)" />

      {/* Capsule dorée */}
      <Path d="M25 12 L35 12 L35 30 L25 30 Z" fill={`url(#cap-${uid})`} />

      {/* Étiquette */}
      <G>
        <Rect x={13} y={104} width={34} height={60} rx={3} fill={colors.cream} />
        <Rect x={13} y={104} width={34} height={60} rx={3} fill="none" stroke={colors.goldDeep} strokeWidth={0.6} />
        <Rect x={17} y={110} width={26} height={0.8} fill={colors.goldDeep} />
        <SvgText
          x={30}
          y={140}
          fontSize={16}
          fontWeight="bold"
          fill={colors.wine}
          textAnchor="middle"
        >
          {initials}
        </SvgText>
        {region ? (
          <SvgText x={30} y={154} fontSize={5.2} fill={colors.textDim} textAnchor="middle">
            {region.toUpperCase().slice(0, 12)}
          </SvgText>
        ) : null}
      </G>
    </Svg>
  )
}

export function initialsOf(name: string): string {
  const words = name.replace(/^(Château|Domaine|Maison|Clos)\s+/i, '').split(/\s+/)
  const a = words[0]?.[0] ?? 'Œ'
  const b = words[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}
