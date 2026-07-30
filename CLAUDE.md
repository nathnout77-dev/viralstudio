# Œno — repères pour travailler sur ce dépôt

Application web de cave à vin : gérer ses bouteilles, tenir un journal de
dégustation, découvrir des vins, apprendre, partager avec des amis.

> Le dépôt s'appelle `viralstudio` pour des raisons historiques. Le produit
> s'appelle **Œno**, partout, sans exception : c'est ce nom qui va à
> l'utilisateur.

---

## Commandes

```bash
npm run dev        # développement
npm run verifier   # garde-fou imports (voir plus bas)
npm run build      # verifier + next build + génération du précache SW
```

**Il n'existe aucun test automatisé.** `npm run build` vérifie les imports et
compile — c'est tout. Rien ne vérifie qu'une fonctionnalité *marche*.
Conséquence directe : toute modification doit être vérifiée **dans un vrai
navigateur** avant d'être annoncée comme faite. Voir « Vérifier » plus bas.

---

## Architecture

Next.js 14, **Pages Router**, PWA. Pas de TypeScript côté web.

```
pages/index.jsx     Écran unique. Un état `view` commute entre les vues. Huit
                    d'entre elles sont les parcours affichés dans la barre
                    (hub, cave, decouvrir, trouver, social, vins, explorer,
                    apprendre) ; s'y ajoutent carte, guide et sommelier,
                    atteintes autrement. Les modales sont des états booléens.
pages/api/          Routes serveur : IA (claude, gemini, groq), scan,
                    recherche web (tavily), push.
components/         67 composants. Un fichier = un écran ou un bloc.
lib/                Logique sans JSX : stockage, synchro, réglages, thème…
data/               Données statiques volumineuses (base de vins, leçons…).
supabase/migrations Schéma SQL, numéroté, jamais réécrit.
mobile/             Application Expo / React Native — maquette séparée,
                    ne partage pas de code avec le web.
```

### Le principe qui structure tout : le local d'abord

Œno **fonctionne entièrement sans compte et sans réseau**. Les données vivent
dans `localStorage` ; Supabase n'est qu'une sauvegarde optionnelle par-dessus.

Même règle pour les clés d'API : sans clé, les fonctions concernées affichent
une indisponibilité soignée et **le reste de l'app continue de marcher**. Ne
jamais écrire de code qui suppose une clé, un compte ou une connexion présents
(`lib/supabase.js` peut exporter `null` — le code appelant doit le supporter).

---

## Deux pièges qui ont déjà coûté des bugs

### 1. `WINE_DB` n'est **pas** le catalogue

```js
CATALOGUE = [...WINE_DB, ...VINS_REFERENTIEL]
```

`VINS_REFERENTIEL` est construit en **excluant** toute appellation déjà
présente dans `WINE_DB`. Les deux ensembles sont donc **disjoints par
construction**.

Chercher un vin dans `WINE_DB` seul échoue donc *systématiquement* pour les
~580 appellations venues du référentiel — pas « parfois », toujours. C'est
exactement le bug qu'ont connu les envies : les vins de « Découvrir »
(qui puise dans `CATALOGUE`) étaient introuvables au moment de les réafficher.

**Règle : pour retrouver un vin par son nom, chercher dans `CATALOGUE`.**
27 fichiers importent `WINE_DB`, 7 seulement `CATALOGUE` — la disproportion
est suspecte, méfiance à chaque nouvelle recherche par appellation.

Mieux encore : quand on enregistre une référence à un vin, **stocker l'objet
complet** plutôt que le seul nom. C'est le correctif retenu pour les envies.

### 2. Deux familles de données, à ne pas confondre

| | Où | Synchronisé ? |
|---|---|---|
| Cave, journal, envies, profil, école, découvertes | `SYNC_KEYS` dans `components/CompteSync.jsx` | **Oui**, cloud |
| Réglages (thème, taille, son, écran d'ouverture) | `oeno-reglages` via `lib/reglages.js` | **Non**, volontairement |

Les réglages restent propres à l'appareil : une taille confortable sur
téléphone ne l'est pas sur grand écran, et le thème suit souvent celui du
système. Ajouter un réglage à `SYNC_KEYS` serait une régression.

---

## Langue et style d'écriture

**Tout est en français** — l'interface, mais aussi les noms de variables, de
fonctions et les commentaires (`lireReglages`, `notifier`, `vivant`,
`amorce`). Un identifiant anglais détonne ; s'aligner sur le voisinage.

Les commentaires expliquent **pourquoi**, jamais quoi. Chaque fichier non
trivial s'ouvre sur un bloc en bandeau qui pose l'intention et les partis pris,
y compris leurs limites assumées. Exemple, `lib/notifications.js` :

```js
// Portée honnête : ces notifications partent de l'appareil, pas d'un serveur.
```

Cette honnêteté sur les limites vaut aussi **dans l'interface** : quand une
fonctionnalité ne peut pas tout faire, on l'écrit à l'utilisateur au lieu de le
laisser le découvrir (le son personnalisé ne peut sonner que l'app ouverte —
c'est dit dans le panneau des réglages).

---

## Design

Palette « pierre chaude » : `anthracite` (texte, bordures), `wine` (accent
principal), `gold` (accent précieux), `cream` (texte sur fond sombre).

**Le thème sombre repose sur des variables CSS**, pas sur les variantes `dark:`
de Tailwind. Les couleurs de `tailwind.config.js` pointent vers des variables
définies dans `styles/globals.css` (`:root` et `:root[data-theme='sombre']`).
Une classe existante comme `bg-anthracite-900` s'adapte donc toute seule.

Ce qui en découle :

- **Ne jamais écrire une couleur en dur** dans un composant : elle ne
  s'inversera pas. Utiliser les classes Tailwind.
- Les surfaces qui doivent **rester sombres dans les deux thèmes** (bulles
  d'aide, voiles, boutons noirs) utilisent les jetons `nuit` / `nuit-doux`.
  Y mettre `anthracite-950` donnerait du crème sur blanc en thème sombre.
- Le thème est posé **avant le premier rendu** par un script en ligne dans
  `pages/_document.jsx`. Toute nouvelle préférence qui touche l'apparence doit
  y être ajoutée, sinon un éclair blanc apparaît à l'ouverture.

Classes utilitaires prêtes dans `globals.css` : `.card`, `.card-dark`,
`.btn-primary`, `.btn-ghost`, `.btn-gold`, `.input-field`, `.modal-panel`,
`.eyebrow`, `.scrim`. Les réutiliser plutôt que de recomposer.

---

## Le garde-fou des imports

`npm run verifier` détecte les composants JSX utilisés sans être importés.
Webpack compile sans broncher un `<Icone />` non importé — l'app plante alors
*chez l'utilisateur*, en écran noir. Ce script fait échouer le build à la
place. Il tourne automatiquement avant chaque `next build`. Cette erreur est
déjà arrivée en production (« Réparer le scan : import manquant »).

---

## Vérifier

Sans test automatisé, la vérification se fait au navigateur, avec Playwright :
lancer `npm run dev`, piloter Chromium, **reproduire le geste réel** de
l'utilisateur, et regarder les captures.

Deux pièges connus :

- Chromium sans tête refuse les notifications quoi qu'on autorise — lancer avec
  `channel: 'chromium'`.
- Compiler ne prouve rien. Le bug des envies compilait parfaitement.

Vérifier aussi **dans les deux thèmes** dès qu'on touche à l'apparence.

---

## Git

Branches de travail : `claude/*`. Les commits sont en français, sous la forme
`Sujet : ce que ça change pour l'utilisateur` — l'effet, pas l'implémentation :

```
Envies : garder la fiche du vin avec l'envie
Web Push : prévenir aussi quand l'application est fermée
```

Ne jamais utiliser `git add -A` sans lire `git status` d'abord : le dépôt
contient souvent des travaux en cours sans rapport, qui se retrouvent absorbés
dans le mauvais commit.

Secrets : `.env.local` est ignoré, `.env.local.example` documente les variables
sans valeur. Rien de sensible ne doit entrer dans un commit.
