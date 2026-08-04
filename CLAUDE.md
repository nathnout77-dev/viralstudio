# Œno — repères pour travailler sur ce dépôt

Application web de cave à vin : gérer ses bouteilles, tenir un journal de
dégustation, découvrir des vins, apprendre, partager avec des amis.

> Le dépôt s'appelle `viralstudio` pour des raisons historiques. Le produit
> s'appelle **Œno**, partout, sans exception : c'est ce nom qui va à
> l'utilisateur.

---

## Commandes

```bash
npm run dev            # développement
npm test               # tests unitaires (Vitest) — rapides, à lancer souvent
npm run test:parcours  # parcours navigateur (Playwright) — lance le serveur seul
npm run verifier       # garde-fou imports (voir plus bas)
npm run build          # verifier + next build + génération du précache SW
```

Le filet est **mince et volontairement ciblé** : il couvre la fusion des
données au login, les invariants du catalogue, les envies et les réglages,
plus l'ouverture de chaque écran. Il ne couvre pas le reste. Une suite verte
ne dispense donc pas de regarder à l'écran ce qu'on vient de changer.

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
components/         65 composants. Un fichier = un écran ou un bloc.
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

## Quatre pièges qui ont déjà coûté des bugs

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
C'est aussi ce qui privait l'assistant de deux tiers de ses cartes : il ne
rendait cliquables que les appellations de `WINE_DB`, donc jamais celles du
référentiel (voir `lib/mentions.js`).
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

### 3. Une fiche de vin n'est jamais un cul-de-sac

`FicheVin` s'ouvre depuis dix-huit endroits. Onze d'entre eux — les envies, le
guide des accords, les millésimes, la roue des arômes, « ce soir ? », le budget
caviste, le mode dîner, le profil de goût… — vivent sous des écrans qui ne
reçoivent pas la cave et n'ont aucune raison de la recevoir. Ils ouvraient donc
la fiche **sans bouton « Ajouter à ma cave »** : pas grisé, absent.

D'où `lib/cave.js` : ranger une bouteille et noter une dégustation sont des
capacités **ambiantes**, lues par contexte. Les boutons existent par défaut, et
un nouvel écran qui ouvre une fiche les a sans rien câbler. Passer
`onAddToCave` reste possible et l'emporte — c'est ce que font les écrans qui
veulent marquer la provenance.

La notation avait exactement la même histoire : présente sur 2 fiches sur 18.
Chercher `onQuelqueChose` qui descend en prop à travers un écran qui n'a aucune
raison de la porter est le bon réflexe pour trouver le suivant.

Corollaire : **ne jamais reconstruire une bouteille à la main.** Le chemin de
« Découvrir » composait son propre objet et recopiait `prixMoyen` en ignorant
le prix saisi. Passer par `bouteilleDepuisVin`, toujours.

### 4. Un seul questionnaire, une seule porte

« Ce soir ? », le Goût-o-mètre, le budget caviste et le mode dîner étaient
quatre questionnaires distincts, atteignables par trois portes différentes.
Le budget était demandé trois fois, avec trois formulations. Surtout, aucun ne
savait ce que l'autre avait appris : répondre aux six questions de goût ne
changeait rien à la recommandation du soir.

Tout passe désormais par `components/GuideVin.jsx`, adossé à `lib/guide/` :

| Fichier | Rôle |
|---|---|
| `parcours.js` | Les questions, en **données**. Chacune porte un `quand` (se pose-t-elle ?) et un `garde` (où ranger la réponse). |
| `moteur.js` | Un seul score. Chaque critère ne pèse que si sa réponse existe — c'est ce qui fait que les directions **se composent**. |
| `memoire.js` | Ce qui resservira (le palais, pas le plat du soir), rangé dans `oeno-profil`, donc synchronisé. |

Deux directions gardent leur écran, parce que leur résultat n'est pas une
liste de bouteilles : le **budget** compose un panier, le **repas complet** un
menu par service. Elles ont perdu leur porte d'entrée, pas leur spécialité.

Ajouter une question = une entrée dans `QUESTIONS`. Ne pas rouvrir un
questionnaire parallèle : c'est exactement ce qu'on vient de défaire.

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

Trois rôles, trois familles — les confondre est le piège nº 5 :

| Rôle | Quoi employer |
|---|---|
| Texte courant, bordures | `anthracite-*` (s'inverse) |
| Texte bordeaux | `text-wine-texte` — **jamais** `text-wine-800` |
| Fond bordeaux | `bg-wine-*` (la gamme numérique) |
| Sens (qualité/prix, difficulté, garde) | jetons `--vert`, `--ambre`, `--rouge`, `--bleu`, `--diff-*` via `tonJeton()` |

Le bordeaux a **deux rôles opposés** : un fond bordeaux doit rester sombre,
un texte bordeaux doit s'éclaircir en thème sombre. D'où deux jetons séparés.
Les avoir confondus rendait 112 textes illisibles.

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

```
tests/*.test.js    Vitest — logique pure, jsdom. `npm test`
tests/*.spec.mjs   Playwright — parcours réel. `npm run test:parcours`
```

Ce que couvre le filet, et pourquoi :

| Fichier | Ce qu'il protège |
|---|---|
| `fusion.test.js` | La fusion au login — **le seul endroit où un bug fait perdre une cave**. Ne jamais écraser sans demander. |
| `catalogue.test.js` | L'invariant `WINE_DB` ⊥ `VINS_REFERENTIEL` (piège nº 1). |
| `envies.test.js` | La fiche voyage avec l'envie ; les anciens formats restent lisibles. |
| `reglages.test.js` | Les défauts, la tolérance aux données illisibles, et la frontière avec `SYNC_KEYS` (piège nº 2). |
| `ajoutCave.test.js` | La traduction fiche de catalogue → bouteille de cave, et le fait qu'**Œno n'impose jamais son prix** : celui de l'utilisateur seul compte. |
| `parcours.spec.mjs` | Chaque écran s'ouvre, **zéro exception JS**, thème posé avant le premier rendu, et l'ajout à la cave depuis la recherche et depuis Œno. |
| `mentions.test.js` | Les vins qu'Œno nomme deviennent cliquables — dans **tout** le catalogue, sans mordre dans un mot ni confondre une appellation avec un arôme. |
| `ajoutPartout.spec.mjs` | Une fiche de vin ouverte propose **toujours** de la ranger (piège nº 3). |
| `guide.test.js` | Le guide unifié : les questions ne se posent que si elles servent, et **les directions se composent** (le palais affine le conseil du soir). |
| `ficheActions.test.jsx` | La fiche tient ses actions du **contexte**, pas de qui l'ouvre — les dix-huit chemins d'un coup, et ceux à venir. |
| `askIA.test.js` | La chaîne de repli Groq → Gemini → Claude, et le fait qu'**une clé absente ne bloque rien**. |
| `decouvertes.test.js` | Les vins scannés : dédoublonnage au re-scan, tolérance à une étiquette à moitié lue. |
| `social.test.js` | **Aucune** fonction du social ne jette sans compte — la liste est parcourue en entier, y compris les fonctions à venir. |

Ce que le filet **ne** couvre pas : la carte et l'école. Y toucher demande
toujours un passage au navigateur, à la main. Le scan, l'IA et le social sont
couverts côté logique seulement — leurs écrans, eux, restent à regarder.

Trois pièges connus :

- Chromium sans tête refuse les notifications quoi qu'on autorise — d'où
  `channel: 'chromium'` dans `playwright.config.mjs`.
- Le navigateur est **déjà installé** (`/opt/pw-browsers`). `@playwright/test`
  est épinglé à la version qui correspond à ce build ; ne pas lancer
  `playwright install`, ne pas relever la version à la légère.
- Compiler ne prouve rien. Le bug des envies compilait parfaitement.

### L'audit de contraste

```bash
npx next start -p 3216 &        # sur un build de production
node scripts/audit-contraste.mjs sombre 3216
node scripts/audit-contraste.mjs clair  3216
```

Il ouvre **22 vues** — les huit parcours, les sous-onglets de Ma Cave, et les
modales (réglages, compte, recherche, assistant, ce soir, formulaire, grille,
sommelier, guide, carte) — et mesure le contraste réel de **chaque texte
affiché**, puis le confirme au pixel près sur une capture de l'élément : sans
cela, un texte posé sur un calque frère est dénoncé à tort. Il regroupe par
couleur fautive : c'est la cause qu'on veut voir, pas 2 300 occurrences.

Une vue qu'il ne sait plus ouvrir est **signalée**, jamais passée sous
silence — sinon un écran disparaîtrait de la surveillance sans qu'on le sache.
Ajouter une vue : une ligne dans `VUES`.

Référence actuelle : **6 restants dans chaque thème, tous l'attribution
Leaflet** (tierce, 4,49:1 pour un seuil à 4,5). Aucun texte d'Œno n'est
sous le seuil. Toute nouvelle entrée est une régression.

Vérifier aussi **dans les deux thèmes** dès qu'on touche à l'apparence, et
**sur les deux mises en page** : barre latérale au-delà de `lg`, barre du bas
en-dessous. Un bouton câblé d'un seul côté ne se voit pas autrement — c'est
exactement ce qui est arrivé à « Réglages » dans la barre latérale.

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
