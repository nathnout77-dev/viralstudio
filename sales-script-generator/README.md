# ScriptVente — Générateur de scripts de vente personnalisés

SaaS pour commerciaux : génère des scripts d'appel, d'e-mail et de LinkedIn
adaptés au **secteur** et au **prospect**. Moteur 100 % templates + variables →
**coût variable nul**, marge maximale, revente propre (aucune facture API à
transférer).

## Stack
- **Next.js 14** (Pages Router) + **React 18**
- **Tailwind CSS**
- **Supabase** (optionnel : auth, sync, abonnements)
- Persistance locale : `localStorage` (historique + quota freemium)

## Démarrer
```bash
cd sales-script-generator
npm install
npm run dev        # http://localhost:3001
```
Fonctionne sans aucune clé. Pour activer le cloud, copier `.env.example` en
`.env.local` et renseigner Supabase.

## Structure
```
data/templates.js   ← Bibliothèque de scripts (LE cœur / l'actif du produit)
lib/engine.js       ← Moteur : remplit les templates avec les données prospect
lib/store.js        ← Historique + quota freemium (localStorage)
lib/supabase.js     ← Client Supabase optionnel
pages/index.jsx     ← Landing
pages/generateur.jsx← Outil principal
pages/tarifs.jsx    ← Pricing + upgrade (démo)
```

## Modèle éco
- **Freemium** : 5 scripts/jour gratuit → Pro 15€/mois illimité → Équipe 49€/mois.
- Coût serveur ≈ hébergement statique. Marge ~100 % sur l'abonnement.
- **La valeur = la bibliothèque de templates + la base d'abonnés**, pas le code.

### Feuille de route revente (maximiser la valorisation)
1. **Grossir la bibliothèque** : + de secteurs, + de scripts par étape, + de
   variantes. C'est l'actif différenciant, facile à copier sinon.
2. **Packs secteur payants** (SaaS, immo, assurance) en upsell → ARPU + rétention.
3. **Brancher Stripe** (`pages/tarifs.jsx`) + **auth Supabase** pour un vrai
   paywall serveur (le gating actuel est côté client, à durcir avant scale).
4. **Prouver la traction** (MRR + faible churn) : un micro-SaaS se revend
   ~3–4× ARR. Sans abonnés, le code seul vaut peu.

### À durcir avant mise en prod
- Paywall serveur (le quota localStorage est contournable — OK pour MVP/démo).
- Auth réelle + table `subscriptions` côté Supabase.
- Webhook Stripe pour synchroniser le statut d'abonnement.
