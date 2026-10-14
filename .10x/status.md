# Status Œno
Phase: Discovery Complete (2026-10-14) — brainstorming Phase 0 en cours

## Acquis [DISCOVERED]
- Next.js 15 Pages Router, PWA, JS (pas TS), 69 composants, localStorage first + Supabase sync optionnel
- Supabase : 6 migrations (comptes/sync, amis, découvertes, avatar, push web, suppression compte)
- Routes IA gardées (lib/serveur/garde.js) : claude, gemini, groq, scan, tavily, push
- TWA Play Store prêt (twa/), porte 18 ans, pages /confidentialite + /suppression-compte
- mobile/ = maquette Expo séparée (ne partage pas de code)
- Tests : Vitest + Playwright, audits clavier/contraste

## Absent
- Paywall / abonnement / Stripe : aucun
- Pages SEO publiques /vin/[slug], sitemap, robots : absentes (écrites dans un ancien chat, jamais mergées)
- Analytics (Plausible) : aucun
- Affiliation : lib/achatLiens.js seul, à vérifier
- Cache scan IA : à vérifier

## Choix utilisateur (2026-10-14)
- Techno : PWA Next.js (1 codebase)
- Revenu : Freemium abonnement + données anonymisées (secondaire)
- Priorité annoncée : backend Supabase → DÉJÀ FAIT en grande partie, à recadrer
