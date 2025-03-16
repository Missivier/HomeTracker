# Étape de build
FROM node:18-alpine AS builder

# Installer pnpm
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de définition des dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install

# Copier les fichiers source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Compiler le TypeScript
RUN pnpm build

# Étape de production
FROM node:18-alpine AS production

# Installer pnpm
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Créer un utilisateur non-root pour plus de sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Installer uniquement les dépendances de production
RUN pnpm install --prod

# Changer le propriétaire des fichiers
RUN chown -R appuser:appgroup /app

# Utiliser l'utilisateur non-root
USER appuser

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Script pour attendre que la base de données soit prête et démarrer l'application
COPY --from=builder /app/prisma/wait-for-it.sh ./prisma/
RUN chmod +x ./prisma/wait-for-it.sh

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["./prisma/wait-for-it.sh", "postgres:5432", "--", "npx", "prisma", "migrate", "deploy", "&&", "node", "dist/server.js"]