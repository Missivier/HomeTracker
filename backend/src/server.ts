import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { fastify, FastifyInstance, FastifyServerOptions } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import authRateLimitPlugin from "./plugins/authRateLimitPlugin.js";
import csrfPlugin from "./plugins/csrfPlugin.js";
import rateLimitPlugin from "./plugins/rateLimitPlugin.js";
import validationPlugin from "./plugins/validationPlugin.js";
import userRoutes from "./routes/UserRoutes.js";

// Type pour l'environnement
interface IEnvironmentVars {
  PORT: string | number;
  NODE_ENV: string;
}

// Options serveur Fastify
const serverOptions: FastifyServerOptions = {
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
};

// Instancier Fastify
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify(serverOptions);

// Configuration des plugins
async function setupPlugins(): Promise<void> {
  // Support des cookies (nécessaire pour CSRF)
  await server.register(cookie);

  // Protection CSRF
  await server.register(csrfPlugin, {
    // Options personnalisées si nécessaire
  });

  // Validation et nettoyage des entrées
  await server.register(validationPlugin, {
    stripHtml: true,
    maxStringLength: 1000,
  });

  // Limitation de débit globale
  await server.register(rateLimitPlugin, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par fenêtre
  });

  // Limitation de débit pour l'authentification
  await server.register(authRateLimitPlugin, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 5, // 5 tentatives maximum
    blockDuration: 30 * 60 * 1000, // Blocage de 30 minutes
  });

  // Helmet pour sécuriser les en-têtes HTTP
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: {
      maxAge: 15552000,
      includeSubDomains: true,
    },
    xContentTypeOptions: true,
    xDownloadOptions: true,
    xFrameOptions: { action: "sameorigin" },
    xPermittedCrossDomainPolicies: { permittedPolicies: "none" },
    xXssProtection: true,
    global: true,
  });

  await server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    credentials: true,
  });

  await server.register(swagger, {
    swagger: {
      info: {
        title: "Fastify TypeScript API",
        description: "API documentation",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/documentation",
  });
}

// Configuration des routes
async function setupRoutes(): Promise<void> {
  // Routes de base pour tester
  server.get("/", async () => {
    return { message: "Bienvenue sur l'API Fastify avec TypeScript!" };
  });

  // Importer et enregistrer les routes d'utilisateurs
  await server.register(userRoutes, { prefix: "/api/users" });
}

// Fonction principale de démarrage
async function start(): Promise<void> {
  try {
    // Configurer les plugins et les routes
    await setupPlugins();
    await setupRoutes();

    // Définir le port
    const env = process.env as unknown as IEnvironmentVars;
    const port = env.PORT || 3000;

    // Démarrer le serveur
    await server.listen({ port: Number(port), host: "0.0.0.0" });

    // Log d'information
    const serverAddress = server.server.address();
    const addressInfo =
      typeof serverAddress === "string"
        ? serverAddress
        : `${serverAddress?.address}:${serverAddress?.port}`;

    server.log.info(`Server listening on ${addressInfo}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Démarrer l'application immédiatement
start();

// Exporter le serveur pour les tests et d'autres usages
export { server };
