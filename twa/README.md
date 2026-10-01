# Œno sur le Play Store

Œno est une PWA. Sur le Play Store, elle devient une **TWA** (Trusted Web
Activity) : une coque Android qui ouvre le site d'Œno en plein écran, sans
barre d'adresse. Le code reste celui du site — une mise à jour du site met à
jour l'application, sans repasser par la Play Console.

`twa-manifest.json` décrit cette coque (paquet `app.oeno`, couleurs, icônes,
raccourcis — repris du manifeste PWA). Bubblewrap en tire le projet Android.

## Avant de commencer : le domaine

L'application pointe vers **`viralstudio-seven.vercel.app`**, le seul domaine
du projet Vercel. Il faut le remplacer **avant la première publication** :

- le nom historique du dépôt apparaîtrait dans les liens de connexion et dans
  la fiche ;
- le domaine est gravé dans l'application : en changer ensuite oblige à
  publier une nouvelle version et casse les liens déjà envoyés.

Acheter un domaine (ex. `oeno.app` s'il est libre), l'ajouter au projet Vercel,
puis remplacer l'hôte dans `twa-manifest.json` (champs `host`, `iconUrl`,
`maskableIconUrl`, `webManifestUrl`, `fullScopeUrl`, `shortcuts`) et dans
Supabase → URL Configuration → Site URL.

L'adresse de contact de `components/PageLegale.jsx` (`contact@oeno.app`)
doit aussi exister réellement : Google l'affiche dans la fiche.

## Construire

Prérequis : Node, Java 17, et Bubblewrap (`npm i -g @bubblewrap/cli`), qui
télécharge lui-même le SDK Android au premier lancement.

```bash
cd twa
bubblewrap update      # génère le projet Android depuis twa-manifest.json
bubblewrap build       # produit app-release-bundle.aab (+ un APK de test)
```

Au premier `build`, Bubblewrap crée la clé `android.keystore` et demande deux
mots de passe. **Sauvegardez la clé et ses mots de passe hors du dépôt**
(gestionnaire de mots de passe) : le `.gitignore` les exclut exprès. Avec
« Signature d'application Play », Google conserve la clé de distribution ;
celle-ci n'est que la clé d'importation, remplaçable — mais pas sans démarche.

## Lier le site et l'application

Sans cette étape, l'application s'ouvre **avec une barre d'adresse**, et le
lien de connexion reçu par email s'ouvre dans le navigateur.

1. Play Console → Intégrité de l'application → Signature de l'application :
   copier l'empreinte **SHA-256** du certificat de signature.
2. `node scripts/assetlinks.mjs <empreinte>` (ajouter en second argument celle
   de `keytool -list -v -keystore twa/android.keystore` pour tester l'APK local).
3. Committer `public/.well-known/assetlinks.json` et déployer.
4. Vérifier : `https://<domaine>/.well-known/assetlinks.json` répond en JSON.

## La fiche Play Console

| Rubrique | Quoi mettre |
|---|---|
| Politique de confidentialité | `https://<domaine>/confidentialite` |
| Suppression de compte | `https://<domaine>/suppression-compte` — et « oui, dans l'application » |
| Catégorie | Style de vie (ou Cuisine et boissons) |
| Classification du contenu | Questionnaire IARC : **référence à l'alcool** → public adulte. L'app pose la question des 18 ans à l'ouverture (`components/PorteAge.jsx`). |
| Public cible | 18 ans et plus uniquement |
| Publicités | Non |

### Sécurité des données (d'après `pages/confidentialite.jsx`)

| Donnée | Collectée ? | Pourquoi | Facultative |
|---|---|---|---|
| Adresse email | Oui, si compte | Gestion du compte | Oui |
| Pseudo, photo de profil | Oui, si compte | Fonctions sociales | Oui |
| Contenu (cave, journal, messages) | Oui, si compte | Sauvegarde, social | Oui |
| Photos (étiquettes, plats) | Transmises, non stockées par Œno | Fonctions IA | Oui |
| Identifiants appareil (push) | Oui, si notifications | Notifications | Oui |

Chiffrement en transit : oui (HTTPS). Suppression sur demande : oui, dans
l'application et via la page web. Aucune donnée partagée à des fins
publicitaires ; aucune vente.

### Ce qu'il faut encore produire soi-même

- Captures d'écran téléphone (au moins 2, idéalement 4 à 8).
- Une image de présentation 1024 × 500.
- Une icône 512 × 512 — `public/icons/icon-512.png` convient.
- Description courte (80 caractères) et longue.
- Un compte de test pour l'examen Google si une fonction exige un compte —
  le social en exige un.

### Le test fermé obligatoire

Un compte développeur **personnel** créé après novembre 2023 doit faire tourner
un **test fermé avec au moins 12 testeurs pendant 14 jours** avant de pouvoir
demander la production. À lancer dès que l'AAB existe : c'est le délai le plus
long de toute la démarche.
