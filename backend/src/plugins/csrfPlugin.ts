import crypto from "crypto";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

interface CsrfPluginOptions {
  cookieName?: string;
  headerName?: string;
  skipMethods?: string[];
  cookieOpts?: {
    path?: string;
    httpOnly?: boolean;
    sameSite?: boolean | "lax" | "strict" | "none";
    secure?: boolean;
    maxAge?: number;
  };
}

// Déclarations pour augmenter FastifyRequest et FastifyReply
declare module "fastify" {
  interface FastifyRequest {
    verifyCsrfToken(): boolean;
  }

  interface FastifyReply {
    generateCsrfToken(): string;
  }
}

const defaultOptions: Required<CsrfPluginOptions> = {
  cookieName: "csrf-token",
  headerName: "X-CSRF-Token",
  skipMethods: ["GET", "HEAD", "OPTIONS"],
  cookieOpts: {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400, // 24 heures en secondes
  },
};

// Génère un token CSRF aléatoire
function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

const csrfPlugin: FastifyPluginAsync<CsrfPluginOptions> = async (
  fastify: FastifyInstance,
  options
) => {
  const opts = { ...defaultOptions, ...options };

  // Fonction pour générer un token CSRF et le stocker dans un cookie
  fastify.decorateReply("generateCsrfToken", function (this: FastifyReply) {
    const token = generateCsrfToken();
    this.setCookie(opts.cookieName, token, opts.cookieOpts);
    return token;
  });

  // Fonction pour vérifier un token CSRF
  fastify.decorateRequest("verifyCsrfToken", function (this: FastifyRequest) {
    const token = this.headers[opts.headerName.toLowerCase()] as string;
    const cookieToken = this.cookies[opts.cookieName];

    if (!token || !cookieToken) {
      return false;
    }

    // Comparaison en temps constant pour éviter les attaques par timing
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(cookieToken));
  });

  // Middleware pour vérifier le token CSRF pour les méthodes sensibles
  fastify.addHook("onRequest", (request, reply, done) => {
    const { method } = request;

    // Ignorer les méthodes sécurisées (GET, HEAD, OPTIONS par défaut)
    if (opts.skipMethods.includes(method)) {
      return done();
    }

    // Vérifier le token CSRF pour les méthodes sensibles
    if (!request.verifyCsrfToken()) {
      reply.code(403).send({
        success: false,
        message: "CSRF token invalide ou manquant",
      });
      return;
    }

    done();
  });

  // Endpoint pour obtenir un nouveau token CSRF
  fastify.get("/csrf-token", (request, reply) => {
    const token = reply.generateCsrfToken();
    reply.send({ token });
  });
};

export default fp(csrfPlugin, {
  name: "csrf-protection",
  fastify: "5.x",
});
