import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { fastify, FastifyInstance, FastifyServerOptions } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
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
  await server.register(cors, {
    origin: "*",
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
