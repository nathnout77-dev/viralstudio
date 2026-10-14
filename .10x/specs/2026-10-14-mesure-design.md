# Spec — Mesure (slice 1, phase 1)

## But
Mesurer rétention J7/J30 et usages clés avant toute décision de prix (paywall 2,99 €/mois ou 24 €/an, repoussé à J60 si rétention J30 > 20 %).

## Décisions utilisateur
- PWA Next.js, 1 codebase ; web + TWA Play Store ; iOS via PWA
- Freemium abonnement (+ données anonymisées en revenu secondaire, RGPD à cadrer plus tard)
- Domaine : aucun pour l'instant, URL Vercel. SEO (`/vin/[slug]`, sitemap) reporté à l'achat d'un domaine
- Analytics : Umami Cloud gratuit (VPS écarté : exige HTTPS donc un domaine)

## Périmètre
- `lib/mesure.js` : `mesurer(nom, props)`, no-op si `NEXT_PUBLIC_UMAMI_SITE_ID` absent ou Do-Not-Track actif. Jamais d'exception, jamais de donnée perso.
- Script Umami injecté dans `pages/_document.jsx` seulement si variable présente.
- Événements : `scan`, `ajout_cave`, `degustation`, `clic_achat`, `inscription`, `quota_ia_atteint`.
- `/confidentialite` : déclarer Umami (règle CLAUDE.md : nouveau tiers).
- `.env.local.example` : variables documentées, sans valeur.
- Tests Vitest : no-op sans config, DNT respecté, aucune exception.

## Hors périmètre
Quotas IA et cache scan (slice 2, migration 007), paywall Stripe, SEO, affiliation.

## Limites assumées
- Free tier : 100k événements/mois, 3 sites, rétention 6 mois (à revérifier sur umami.is).
- Rétention J30 mesurée par visiteur anonyme, non fiable entre appareils.
