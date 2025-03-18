import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

interface ValidationPluginOptions {
  stripHtml?: boolean;
  maxStringLength?: number;
}

const defaultOptions: Required<ValidationPluginOptions> = {
  stripHtml: true,
  maxStringLength: 500, // Longueur maximale par défaut pour les chaînes
};

/**
 * Nettoie une chaîne de caractères des balises HTML
 * @param str La chaîne à nettoyer
 * @returns La chaîne nettoyée
 */
function stripHtmlTags(str: string): string {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Fonction de validation et nettoyage des entrées
 */
function sanitizeInput(
  value: any,
  options: Required<ValidationPluginOptions>
): any {
  if (value === null || value === undefined) {
    return value;
  }

  // Pour les chaînes de caractères
  if (typeof value === "string") {
    // Nettoyer le HTML si nécessaire
    let sanitized = options.stripHtml ? stripHtmlTags(value) : value;

    // Limiter la longueur si nécessaire
    if (sanitized.length > options.maxStringLength) {
      sanitized = sanitized.substring(0, options.maxStringLength);
    }

    return sanitized;
  }

  // Pour les tableaux
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeInput(item, options));
  }

  // Pour les objets
  if (typeof value === "object") {
    const result: any = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = sanitizeInput(value[key], options);
      }
    }
    return result;
  }

  // Pour les autres types (nombres, booléens, etc.)
  return value;
}

const validationPlugin: FastifyPluginAsync<ValidationPluginOptions> = async (
  fastify: FastifyInstance,
  options
) => {
  const opts = { ...defaultOptions, ...options };

  // Middleware pour nettoyer toutes les entrées
  fastify.addHook("preValidation", (request, reply, done) => {
    // Sanitize body
    if (request.body) {
      request.body = sanitizeInput(request.body, opts);
    }

    // Sanitize query parameters
    if (request.query) {
      request.query = sanitizeInput(request.query, opts);
    }

    // Sanitize params
    if (request.params) {
      request.params = sanitizeInput(request.params, opts);
    }

    done();
  });
};

export default fp(validationPlugin, {
  name: "input-validation",
  fastify: "5.x",
});
