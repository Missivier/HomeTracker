# HomeTracker

Une application de gestion domestique permettant de suivre les tâches, les événements et le budget du foyer.

## Authentification

Le système d'authentification est maintenant opérationnel. Les utilisateurs peuvent s'inscrire et se connecter.

### Inscription d'un compte

Pour s'inscrire, utilisez le formulaire d'inscription avec les informations suivantes :

- Prénom
- Nom
- Email
- Mot de passe (minimum 8 caractères)

Une fois inscrit, vous serez redirigé vers la page de connexion pour vous connecter avec vos identifiants.

### Connexion à un compte existant

Pour vous connecter, utilisez l'email et le mot de passe que vous avez utilisés lors de l'inscription.

### Système de rôles

L'application utilise un système de rôles pour gérer les autorisations :

| ID  | Nom        | Description                                   |
| --- | ---------- | --------------------------------------------- |
| 1   | No roles   | Aucun rôle assigné                            |
| 2   | SuperAdmin | Administrateur avec tous les droits           |
| 3   | Admin      | Administrateur avec droits limités            |
| 4   | User       | Utilisateur standard (défaut à l'inscription) |
| 5   | Invite     | Utilisateur invité avec accès limité          |

Par défaut, les nouveaux utilisateurs reçoivent le rôle "User" (ID: 4).

## Développement

### Démarrer le backend

```bash
cd backend
pnpm install
pnpm run dev
```

### Démarrer le frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

### Accès entre différentes machines

Si vous développez avec le frontend sur une machine et le backend sur une autre, consultez le fichier `CORS_CONFIG.md` pour les instructions de configuration.

### Scripts de test

Plusieurs scripts sont disponibles pour tester différentes fonctionnalités :

- Lister les utilisateurs :

```bash
cd backend
npx tsx src/scripts/list-users.ts
```

- Lister les rôles :

```bash
cd backend
npx tsx src/scripts/list-roles.ts
```

- Réinitialiser la base de données (supprimer tous les utilisateurs et recréer les rôles) :

```bash
cd backend
npx tsx src/scripts/reset-database.ts
```
