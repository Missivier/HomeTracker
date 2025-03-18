import * as crypto from "crypto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

interface CsrfOptions {
  cookieName?: string;
  headerName?: string;
  cookieOptions?: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    path?: string;
    maxAge?: number;
  };
}

/**
 * Middleware pour la protection CSRF (Cross-Site Request Forgery)
 * Utilise la méthode du double cookie (double submit cookie)
 */
export default fp(
  async (fastify: FastifyInstance, options: CsrfOptions = {}) => {
    const {
      cookieName = "csrf_token",
      headerName = "X-CSRF-Token",
      cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60, // 24 heures
      },
    } = options;

    // Génère un token CSRF aléatoire
    function generateCsrfToken(): string {
      return crypto.randomBytes(32).toString("hex");
    }

    // Méthode pour fournir un nouveau token CSRF
    fastify.decorate(
      "setCsrfToken",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const token = generateCsrfToken();

        // Définir le cookie avec le token CSRF
        reply.setCookie(cookieName, token, cookieOptions);

        return token;
      }
    );

    // Méthode pour vérifier le token CSRF
    fastify.decorate(
      "verifyCsrfToken",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          // GET et HEAD sont considérés comme des requêtes sûres
          const safeMethod = ["GET", "HEAD"].includes(request.method);
          if (safeMethod) {
            return;
          }

          // Obtenir le token depuis le cookie
          const cookieToken = request.cookies[cookieName];

          // Obtenir le token depuis l'en-tête ou le corps de la requête
          const headerToken = request.headers[
            headerName.toLowerCase()
          ] as string;
          const bodyToken =
            request.body && typeof request.body === "object"
              ? (request.body as any)._csrf
              : undefined;

          // Le token à vérifier (priorité à l'en-tête)
          const csrfToken = headerToken || bodyToken;

          // Vérifier que les tokens correspondent
          if (!cookieToken || !csrfToken || cookieToken !== csrfToken) {
            return reply.code(403).send({
              success: false,
              message: "CSRF vérification échouée",
            });
          }
        } catch (error) {
          console.error("Erreur CSRF:", error);
          return reply.code(500).send({
            success: false,
            message: "Erreur de sécurité CSRF",
          });
        }
      }
    );

    // Ajouter le middleware de vérification CSRF sur toutes les routes
    fastify.addHook("preHandler", async (request, reply) => {
      // On vérifie seulement pour les requêtes non sûres (POST, PUT, DELETE)
      if (!["GET", "HEAD"].includes(request.method)) {
        await (fastify as any).verifyCsrfToken(request, reply);
      }

      // Générer un nouveau token pour toutes les réponses
      const newToken = await (fastify as any).setCsrfToken(request, reply);

      // Exposer le token dans un en-tête pour le client
      reply.header("X-CSRF-Token", newToken);
    });
  },
  { name: "csrf-middleware" }
);
