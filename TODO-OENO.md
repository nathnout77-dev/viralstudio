# TODO Œno — reprise de session

> Fichier de handoff. À la prochaine session : « reprends TODO-OENO.md » et exécuter les tâches dans l'ordre. Supprimer ce fichier une fois tout terminé.

## État au moment de la pause
- Branche de travail : `claude/install-ui-ux-pro-max-bcozsk` (production = push vers `main`, déjà autorisé par l'utilisateur)
- Production : https://viralstudio-seven.vercel.app
- FAIT (commité) : suppression Champagne + Crémant de `WINE_DB` (→ 61 vins, build OK)

## Tâches restantes (demande utilisateur du dernier message)

### 1. Enrichir la base à 100 vins (EN COURS)
- `data/wineDatabase.js` : 61 entrées actuelles → ajouter ~39 appellations via le helper `vin({...})` juste avant le `]` de fermeture de `WINE_DB` (ligne ~1207)
- AUCUN champagne ni mousseux (`type: 'sparkling'` interdit)
- Pistes : Bourgogne (Chassagne, Corton-Charlemagne, Mercurey, Givry, Rully, Pouilly-Fuissé, Saint-Aubin, Marsannay), Rhône (Saint-Joseph, Cornas, Saint-Péray, Lirac, Rasteau, Cairanne, Tavel), Loire (Menetou-Salon, Quincy, Saumur-Champigny, Coteaux du Layon, Montlouis, Cheverny), Bordeaux (Haut-Médoc, Moulis, Entre-Deux-Mers, Lalande-de-Pomerol, Fronsac), Alsace (Muscat, Sylvaner, Pinot Noir), Beaujolais (Juliénas, Chiroubles, Saint-Amour), Languedoc/Roussillon (Corbières, Fitou, Terrasses du Larzac, Collioure, Banyuls, Maury), Sud-Ouest (Bergerac, Monbazillac, Fronton, Marcillac), Jura/Savoie (Côtes du Jura, Apremont, Mondeuse), International (Ribera del Duero, Priorat, Brunello, Barbaresco, Amarone, Douro, Mosel Riesling, Malbec Mendoza, Rioja déjà présent…)
- Champs obligatoires par entrée : id, region, appellation, type, cepages, aromes, emoji, enUneMot, pourQui, jauges {puissance,douceur,tanins}, difficulte, prixMoyen, bonsMilsimes, garde, drinkFrom, drinkUntil, temperature, serviceTemp, accords, domaines (2 suffisent), lat/lng, description
- Compléter aussi `MILLESIMES_DB` pour les nouvelles régions si absentes

### 2. Guide → Accords mets-vins : vins cliquables
- `components/AccordsView.jsx` : les vins recommandés doivent ouvrir la fiche détaillée (prix, jauges, domaines…)
- Exporter `FicheVin` depuis `components/BibliothequeView.jsx` (`export function FicheVin`) et matcher le nom du vin de l'accord avec `WINE_DB` (par appellation, insensible casse/inclusion)

### 3. Quiz « Ce soir » : toujours 3 vins
- `components/CeSoirMode.jsx` : le filtre `x.s > -5` peut donner < 3 résultats → fallback : compléter avec le top non filtré pour garantir 3 vins

### 3bis. Onboarding : 3 vins « pour démarrer »
- `components/OnboardingProfil.jsx` : après la dernière réponse, afficher un écran « 3 vins pour démarrer » scorés sur les réponses (niveau + goûts + budget) avant le bouton final qui appelle `onComplete`

### 4. Garde adaptée au millésime
- Helper dans `data/wineDatabase.js` :
  `gardeForMillesime(wine, year)` → cherche dans MILLESIMES_DB (année+région+type) le gardeMax (col 5), sinon fallback `wine.drinkUntil` → retourne `{from: year+drinkFrom, until: year+gardeMax}`
- Afficher « À boire entre X et Y » dynamiquement sous le sélecteur de millésime dans `FicheVin` (BibliothequeView) et `WinePanel` (InteractiveMap)

### 5. « Ajouter un vin » : appellations en menu déroulant
- `components/WineForm.jsx` : remplacer l'input autocomplete par un `<select>` listant TOUTES les appellations de `WINE_DB_APPELLATIONS` (triées, éventuellement groupées par région via `<optgroup>`) + option « Autre (saisie libre) » qui réaffiche l'input texte
- À la sélection : appliquer `applyAppellation` (pré-remplissage type/cépages/temp/garde/accords)

## Finalisation
- `npm run build` → commit → push branche + `git push origin claude/install-ui-ux-pro-max-bcozsk:main` (production, déjà autorisé)
- Supprimer ce fichier TODO-OENO.md dans le commit final
