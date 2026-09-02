# Les emails de connexion

Œno demande un **code à 6 chiffres** pour retrouver sa cave (`verifyOtp`,
dans `components/CompteSync.jsx`). Les gabarits d'email de Supabase, eux,
n'envoient par défaut qu'un lien : `{{ .ConfirmationURL }}`, jamais
`{{ .Token }}`. L'écran réclamait donc un code que l'email ne contenait pas.

Ces deux fichiers réparent cela. Ils ne s'appliquent pas tout seuls : les
gabarits vivent dans la configuration du projet Supabase, pas dans le dépôt.
Ils sont versionnés ici pour être relus, corrigés, et recopiés à l'identique.

## Les poser (2 minutes)

Tableau de bord Supabase → **Authentication → Emails**, puis, pour chacun :

| Fichier | Gabarit à remplacer | Objet suggéré |
|---|---|---|
| `magic_link.html` | **Magic Link** | `{{ .Token }} — votre code Œno` |
| `confirmation.html` | **Confirm signup** | `{{ .Token }} — bienvenue sur Œno` |

**Les deux, pas un seul.** `signInWithOtp` choisit le gabarit selon que
l'adresse est déjà connue : *Magic Link* pour un retour, *Confirm signup*
pour une première fois. N'en corriger qu'un prive de code la moitié des
utilisateurs — et si c'est *Confirm signup* qu'on oublie, précisément ceux
qui découvrent Œno.

Mettre `{{ .Token }}` **dans l'objet** rend le code lisible depuis la liste
des messages, sans même ouvrir l'email.

## Pourquoi le code avant le lien

Œno s'installe comme une application. Un lien magique ouvre le navigateur du
système : la session se dépose là, pas dans l'application installée — celle
où l'utilisateur attend justement sa cave. Le code, lui, se recopie sans
jamais sortir d'Œno. Le lien reste proposé, en second, pour qui lit ses
emails sur le même appareil.

## Vérifier

Demander un email depuis Œno (Compte & sauvegarde), puis contrôler que le
message reçu porte bien six chiffres, et que les saisir connecte. Un email
qui n'affiche qu'un lien signifie qu'un des deux gabarits est resté par défaut.
