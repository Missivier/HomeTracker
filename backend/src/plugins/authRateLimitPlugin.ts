import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

interface AuthRateLimitOptions {
  windowMs?: number; // Fenêtre de temps en ms
  maxAttempts?: number; // Nombre maximum de tentatives par fenêtre
  blockDuration?: number; // Durée de blocage en ms après trop de tentatives
}

interface RateLimitStore {
  [key: string]: {
    attempts: number;
    lastAttempt: number;
    blockedUntil: number;
  };
}

const defaultOptions: Required<AuthRateLimitOptions> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 5, // 5 tentatives maximum
  blockDuration: 30 * 60 * 1000, // Blocage de 30 minutes
};

const authPaths = ["/api/users/login", "/api/users/register"];

const authRateLimitPlugin: FastifyPluginAsync<AuthRateLimitOptions> = async (
  fastify: FastifyInstance,
  options
) => {
  const opts = { ...defaultOptions, ...options };
  const store: RateLimitStore = {};

  // Nettoyer les entrées expirées périodiquement
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (
        store[key].lastAttempt + opts.windowMs < now &&
        store[key].blockedUntil < now
      ) {
        delete store[key];
      }
    }
  }, opts.windowMs);

  // S'assurer que l'intervalle est nettoyé lors de la fermeture du serveur
  fastify.addHook("onClose", (instance, done) => {
    clearInterval(cleanupInterval);
    done();
  });

  // Middleware pour la limitation de débit des routes d'authentification
  fastify.addHook(
    "onRequest",
    (request: FastifyRequest, reply: FastifyReply, done) => {
      const path = request.url.split("?")[0]; // Supprimer les paramètres de requête

      // Ne s'applique qu'aux routes d'authentification et aux méthodes POST
      if (!authPaths.includes(path) || request.method !== "POST") {
        return done();
      }

      // Utiliser l'IP comme clé
      const key = request.ip;
      const now = Date.now();

      // Initialiser l'entrée si elle n'existe pas
      if (!store[key]) {
        store[key] = {
          attempts: 0,
          lastAttempt: now,
          blockedUntil: 0,
        };
      }

      // Vérifier si l'IP est bloquée
      if (store[key].blockedUntil > now) {
        const timeLeft = Math.ceil((store[key].blockedUntil - now) / 1000);
        reply.code(429).send({
          success: false,
          message: `Trop de tentatives de connexion. Réessayez dans ${timeLeft} secondes.`,
          timeLeft,
        });
        return;
      }

      // Réinitialiser le compteur si la fenêtre est dépassée
      if (store[key].lastAttempt + opts.windowMs < now) {
        store[key].attempts = 0;
      }

      // Mettre à jour l'heure de la dernière tentative
      store[key].lastAttempt = now;

      // Incrémenter le compteur de tentatives
      store[key].attempts++;

      // Vérifier si le nombre maximum de tentatives est dépassé
      if (store[key].attempts > opts.maxAttempts) {
        // Bloquer l'IP pour la durée spécifiée
        store[key].blockedUntil = now + opts.blockDuration;

        // Enregistrer l'événement dans les logs pour la détection d'intrusion
        fastify.log.warn(`Tentative de force brute détectée de l'IP ${key}`);

        reply.code(429).send({
          success: false,
          message: `Trop de tentatives de connexion. Réessayez dans ${opts.blockDuration / 1000} secondes.`,
          timeLeft: opts.blockDuration / 1000,
        });
        return;
      }

      // Ajouter des en-têtes pour informer du nombre de tentatives restantes
      const remaining = opts.maxAttempts - store[key].attempts;
      reply.header("X-RateLimit-Limit", opts.maxAttempts);
      reply.header("X-RateLimit-Remaining", remaining);
      reply.header(
        "X-RateLimit-Reset",
        Math.ceil((store[key].lastAttempt + opts.windowMs) / 1000)
      );

      done();
    }
  );
};

export default fp(authRateLimitPlugin, {
  name: "auth-rate-limit",
  fastify: "5.x",
});
