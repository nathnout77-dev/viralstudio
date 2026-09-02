# Les emails de connexion

Deux problèmes se cachaient dans un seul email.

**Le code n'existait pas.** Œno réclame un code à 6 chiffres (`verifyOtp`,
dans `components/CompteSync.jsx`), mais les gabarits Supabase par défaut
n'envoient que `{{ .ConfirmationURL }}` — jamais `{{ .Token }}`. L'écran
demandait de recopier quelque chose que l'email ne contenait pas.

**Le lien ouvrait le navigateur, jamais l'application.** `{{ .ConfirmationURL }}`
pointe vers `<projet>.supabase.co`, un domaine étranger à Œno. Android ne
confie à une application installée que les adresses de **son** périmètre :
un lien vers supabase.co ne pouvait donc, par construction, aboutir que dans
le navigateur — la session se déposant à côté de l'app, jamais dedans.

Ces gabarits corrigent les deux : le lien pointe vers `/connexion` **sur le
domaine d'Œno** (voir `pages/connexion.jsx`, qui échange le jeton), et le
code reste dessous.

## Les poser

### 1. Les gabarits

Tableau de bord Supabase → **Authentication → Emails** :

| Fichier | Gabarit à remplacer | Objet suggéré |
|---|---|---|
| `magic_link.html` | **Magic Link** | `Votre cave Œno vous attend` |
| `confirmation.html` | **Confirm signup** | `Bienvenue sur Œno` |

**Les deux, pas un seul.** `signInWithOtp` choisit *Magic Link* pour une
adresse déjà connue et *Confirm signup* pour une adresse nouvelle. N'en
réparer qu'un prive la moitié des utilisateurs — et en oubliant le second,
précisément ceux qui découvrent Œno.

### 2. Les adresses

**Authentication → URL Configuration** :

- **Site URL** : l'adresse de production d'Œno (`https://…`). C'est elle que
  `{{ .SiteURL }}` remplace dans le lien — mal réglée, le lien mène ailleurs.
- **Redirect URLs** : y ajouter `https://<domaine>/**`.

### 3. Pour que le lien ouvre vraiment l'application

Le lien est désormais une adresse d'Œno, condition nécessaire mais pas
suffisante. Android n'ouvre l'application installée que s'il a la preuve que
le domaine et l'application vont ensemble — c'est le rôle de
`/.well-known/assetlinks.json`, qui réclame l'empreinte SHA-256 de la clé de
signature (Play Console → *Signature d'application*). Sans ce fichier, le
lien s'ouvre dans le navigateur : le compte est bien connecté, mais dans
l'onglet plutôt que dans l'app.

Le manifeste, lui, est prêt : `scope` délimite le périmètre et
`launch_handler` fait reprendre la fenêtre déjà ouverte.

## Pourquoi le code reste, malgré le lien

Il n'est pas un ornement. Sur **iOS**, une application ajoutée à l'écran
d'accueil ne partage pas le stockage du navigateur : le lien connecte Safari,
jamais l'app. Et un email lu depuis **un autre appareil** n'ouvrira jamais la
bonne application. Six chiffres se recopient de partout.

## Vérifier

Demander un email depuis Œno (Compte & sauvegarde). Le message doit porter un
bouton **et** six chiffres. Contrôler les deux chemins : le bouton connecte,
et le code aussi. Un email qui n'affiche qu'un lien vers `supabase.co`
signifie qu'un des deux gabarits est resté par défaut.
