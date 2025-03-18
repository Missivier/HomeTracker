import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

interface RateLimitOptions {
  windowMs?: number; // Fenêtre de temps en ms
  max?: number; // Nombre maximum de requêtes par fenêtre
  standardHeaders?: boolean; // Ajouter des en-têtes standards de limite de débit
  skipMethods?: string[]; // Méthodes HTTP à ignorer
  skipUrls?: string[]; // URLs à ignorer
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const defaultOptions: Required<RateLimitOptions> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par fenêtre
  standardHeaders: true,
  skipMethods: ["GET", "HEAD", "OPTIONS"],
  skipUrls: ["/csrf-token", "/documentation"], // Ignorer ces URLs
};

const rateLimitPlugin: FastifyPluginAsync<RateLimitOptions> = async (
  fastify: FastifyInstance,
  options
) => {
  const opts = { ...defaultOptions, ...options };
  const store: RateLimitStore = {};

  // Nettoyer les entrées expirées périodiquement
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime <= now) {
        delete store[key];
      }
    }
  }, opts.windowMs);

  // S'assurer que l'intervalle est nettoyé lors de la fermeture du serveur
  fastify.addHook("onClose", (instance, done) => {
    clearInterval(cleanupInterval);
    done();
  });

  // Middleware pour la limitation de débit
  fastify.addHook(
    "onRequest",
    (request: FastifyRequest, reply: FastifyReply, done) => {
      // Ignorer certaines méthodes
      if (opts.skipMethods.includes(request.method)) {
        return done();
      }

      // Ignorer certaines URLs
      const url = request.url.split("?")[0]; // Supprimer les paramètres de requête
      if (opts.skipUrls.some((skipUrl) => url.startsWith(skipUrl))) {
        return done();
      }

      // Utiliser l'IP comme clé (considérez d'utiliser une combinaison IP + chemin pour des limites par route)
      const key = request.ip;
      const now = Date.now();

      // Initialiser ou réinitialiser l'entrée si nécessaire
      if (!store[key] || store[key].resetTime <= now) {
        store[key] = {
          count: 0,
          resetTime: now + opts.windowMs,
        };
      }

      // Incrémenter le compteur
      store[key].count++;

      // Vérifier si la limite est dépassée
      if (store[key].count > opts.max) {
        // Calculer le temps restant avant réinitialisation
        const resetTime = store[key].resetTime;
        const timeLeft = Math.max(0, resetTime - now);

        // Ajouter les en-têtes de limite de débit si activés
        if (opts.standardHeaders) {
          reply.header("Retry-After", Math.ceil(timeLeft / 1000));
          reply.header("X-RateLimit-Limit", opts.max);
          reply.header("X-RateLimit-Remaining", 0);
          reply.header("X-RateLimit-Reset", Math.ceil(resetTime / 1000));
        }

        // Renvoyer une erreur 429 (Too Many Requests)
        reply.code(429).send({
          success: false,
          message: "Trop de requêtes, veuillez réessayer plus tard",
          timeLeft,
        });
        return;
      }

      // Ajouter les en-têtes de limite de débit si activés
      if (opts.standardHeaders) {
        const remaining = Math.max(0, opts.max - store[key].count);
        reply.header("X-RateLimit-Limit", opts.max);
        reply.header("X-RateLimit-Remaining", remaining);
        reply.header(
          "X-RateLimit-Reset",
          Math.ceil(store[key].resetTime / 1000)
        );
      }

      done();
    }
  );
};

export default fp(rateLimitPlugin, {
  name: "rate-limit",
  fastify: "5.x",
});
