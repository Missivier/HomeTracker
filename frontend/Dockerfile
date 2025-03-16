# Utilise une image Node.js légère
FROM node:16-alpine

WORKDIR /app

# Copier les fichiers package.json et pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm && pnpm install

# Copier le code source
COPY . .

# Build l'application pour la production
RUN pnpm build

# Exposer le port de Vite (par défaut 5173, ou configure selon tes besoins)
EXPOSE 5173

# Démarrer l'application statique avec un serveur léger (par exemple, serve)
RUN pnpm add -g serve

CMD ["serve", "dist"]
