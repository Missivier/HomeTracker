import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwtService from "../services/jwtService.js";
import { ApiResponse } from "../types/index.js";

/**
 * Ajoute l'utilisateur à la requête pour qu'il soit disponible dans les contrôleurs
 */
declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: number;
      roleId: number;
      email: string;
    };
  }
}

/**
 * Middleware d'authentification pour vérifier les tokens JWT
 */
export default fp(
  async (fastify: FastifyInstance) => {
    // Middleware pour vérifier le token JWT
    fastify.decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          // Extraire le token de l'en-tête Authorization
          const authHeader = request.headers.authorization;

          if (!authHeader) {
            const response: ApiResponse<null> = {
              success: false,
              message: "Authentification requise",
            };
            return reply.code(401).send(response);
          }

          // Format attendu: "Bearer <token>"
          const parts = authHeader.split(" ");
          if (parts.length !== 2 || parts[0] !== "Bearer") {
            const response: ApiResponse<null> = {
              success: false,
              message: "Format de token invalide",
            };
            return reply.code(401).send(response);
          }

          const token = parts[1];

          // Vérifier et décoder le token
          const decoded = jwtService.verifyToken(token);

          if (!decoded) {
            const response: ApiResponse<null> = {
              success: false,
              message: "Token invalide ou expiré",
            };
            return reply.code(401).send(response);
          }

          // Ajouter l'utilisateur à la requête
          request.user = {
            userId: decoded.userId,
            roleId: decoded.roleId,
            email: decoded.email,
          };
        } catch (error) {
          const response: ApiResponse<null> = {
            success: false,
            message: "Erreur d'authentification",
            error: error instanceof Error ? error.message : "Erreur inconnue",
          };
          return reply.code(500).send(response);
        }
      }
    );

    // Middleware pour vérifier les droits d'un rôle spécifique
    fastify.decorate("requireRole", (requiredRoleId: number) => {
      return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          // Vérifier d'abord si l'utilisateur est authentifié
          if (!request.user) {
            const response: ApiResponse<null> = {
              success: false,
              message: "Authentification requise",
            };
            return reply.code(401).send(response);
          }

          // Vérifier les droits
          if (request.user.roleId < requiredRoleId) {
            const response: ApiResponse<null> = {
              success: false,
              message: "Droits insuffisants pour accéder à cette ressource",
            };
            return reply.code(403).send(response);
          }
        } catch (error) {
          const response: ApiResponse<null> = {
            success: false,
            message: "Erreur d'autorisation",
            error: error instanceof Error ? error.message : "Erreur inconnue",
          };
          return reply.code(500).send(response);
        }
      };
    });
  },
  { name: "auth-middleware" }
);
