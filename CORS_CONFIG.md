# Configuration pour accéder au backend depuis votre PC

## Adresses IP de la VM

Les adresses IP suivantes sont disponibles sur la VM :

```
10.0.2.15 172.20.0.1 172.21.0.1 172.17.0.1 172.18.0.1 172.19.0.1
```

## Configuration du frontend sur votre PC

Pour que votre frontend sur votre PC puisse se connecter au backend sur la VM, vous devez modifier le fichier `.env` de votre frontend :

1. Sur votre PC, créez ou modifiez le fichier `.env` dans le dossier `frontend` :

```
VITE_API_BASE_URL=http://<adresse-ip-vm>:3000/api
```

Remplacez `<adresse-ip-vm>` par l'adresse IP que vous pouvez joindre depuis votre PC.

2. Redémarrez votre serveur de développement frontend :

```bash
cd frontend
pnpm run dev
```

## Vérification de la connectivité

Pour vérifier que la connexion fonctionne, vous pouvez essayer de faire une requête vers le backend depuis votre navigateur :

```
http://<adresse-ip-vm>:3000/api/users
```

## Problèmes possibles et solutions

### 1. Problème de CORS

Si vous rencontrez des erreurs CORS, assurez-vous que le backend est configuré pour accepter les requêtes de votre PC :

```typescript
// Dans src/server.ts
await server.register(cors, {
  origin: "*", // Ou spécifiez l'URL de votre frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
```

### 2. Problème de pare-feu ou de réseau

Si vous ne pouvez pas accéder à la VM depuis votre PC, vérifiez :

- Les paramètres du pare-feu de la VM
- La configuration réseau de la VM (NAT, bridge, etc.)
- La connectivité réseau entre votre PC et la VM

### 3. Port utilisé

Si le port 3000 est déjà utilisé ou bloqué, vous pouvez changer le port dans le fichier `.env` du backend :

```
PORT=3001
```

N'oubliez pas de mettre à jour l'URL dans le fichier `.env` du frontend également.
