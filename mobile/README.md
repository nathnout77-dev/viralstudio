# Œno — app mobile (React Native + Expo)

Version native premium de Œno : cave personnelle, scan d'étiquette, découverte
et profil. Thème sombre bordeaux/or, typo serif (Playfair Display). Données
100 % mock local (`data/wines.ts`), aucun backend requis.

## Lancer

```bash
cd mobile
npm install
npx expo start
```

Puis :
- **téléphone** : scanner le QR code avec l'app **Expo Go** (iOS / Android)
- **iOS simulator** : appuyer sur `i`
- **Android emulator** : appuyer sur `a`
- **web** : appuyer sur `w`

> Le scan utilise la caméra : sur simulateur, l'aperçu peut être noir — tester
> sur un vrai appareil via Expo Go pour la caméra.

## Structure

```
mobile/
├── app/                     # Expo Router (navigation par fichiers)
│   ├── _layout.tsx          # racine : polices, splash, stack
│   ├── (tabs)/
│   │   ├── _layout.tsx      # barre d'onglets custom (Scan central surélevé)
│   │   ├── index.tsx        # Ma Cave
│   │   ├── degustations.tsx # Carnet de dégustations
│   │   ├── scan.tsx         # Caméra + cadre + reco temps réel
│   │   ├── decouvrir.tsx    # Exploration + filtres
│   │   └── profil.tsx       # Profil, stats, cave, réglages
│   └── wine/[id].tsx        # Fiche vin (modale)
├── components/              # WineCard, BottleCarousel, ScoreBadge, RatingStars,
│                            #   BottleVisual (SVG), SearchBar, ScreenHeader, …
├── data/                    # types + jeu de données mock (vins, dégustations)
└── theme/                   # couleurs, typographie, espacements/ombres
```

## Choix techniques

- **Styling** : `StyleSheet` + tokens de thème centralisés (pas de NativeWind
  ni Paper) — zéro config supplémentaire, lancement garanti, contrôle total du
  rendu premium.
- **Bouteilles** : dessinées en SVG (`react-native-svg`) plutôt que des images
  — offline, toujours nettes, teintées selon la robe du vin.
- **Palette** : reprise exacte des tokens de l'app web pour l'unité de marque.
