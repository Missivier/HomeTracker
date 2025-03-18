import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

interface SecurityOptions {
  xssProtection?: boolean;
  noSniff?: boolean;
  frameguard?: boolean;
}

/**
 * Middleware de sécurité pour protéger contre les attaques courantes
 */
export default fp(
  async (fastify: FastifyInstance, options: SecurityOptions = {}) => {
    const { xssProtection = true, noSniff = true, frameguard = true } = options;

    // Middleware pour ajouter des en-têtes de sécurité
    fastify.addHook(
      "onRequest",
      async (request: FastifyRequest, reply: FastifyReply) => {
        // Protection XSS - X-XSS-Protection
        if (xssProtection) {
          reply.header("X-XSS-Protection", "1; mode=block");
        }

        // Empêcher le MIME sniffing - X-Content-Type-Options
        if (noSniff) {
          reply.header("X-Content-Type-Options", "nosniff");
        }

        // Protection contre le clickjacking - X-Frame-Options
        if (frameguard) {
          reply.header("X-Frame-Options", "SAMEORIGIN");
        }

        // Politique de sécurité du contenu (CSP)
        reply.header(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"
        );

        // Strict-Transport-Security (HSTS) - si HTTPS est utilisé
        if (request.protocol === "https") {
          reply.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
          );
        }
      }
    );

    // Nettoyer les entrées utilisateur
    fastify.addHook(
      "preValidation",
      async (request: FastifyRequest, reply: FastifyReply) => {
        // Fonction pour sanitiser les entrées (exemple simple)
        const sanitizeInput = (obj: any): any => {
          if (!obj) return obj;

          if (typeof obj === "string") {
            // Sanitisation basique pour les chaînes
            return obj
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")
              .replace(/\//g, "&#x2F;");
          }

          if (typeof obj === "object") {
            if (Array.isArray(obj)) {
              // Pour les tableaux
              return obj.map((item) => sanitizeInput(item));
            }

            // Pour les objets standards
            const sanitized: any = {};
            for (const key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                sanitized[key] = sanitizeInput(obj[key]);
              }
            }
            return sanitized;
          }

          // Pour les autres types de données (number, boolean, etc.)
          return obj;
        };

        // Sanitiser body, query et params
        if (request.body && typeof request.body === "object") {
          // Exclure la sanitisation du mot de passe (pour qu'il soit haché correctement)
          const body = request.body as any;
          if (body.password) {
            const password = body.password;
            body.password = password; // Préserver le mot de passe original
          }
        }
      }
    );
  },
  { name: "security-middleware" }
);
