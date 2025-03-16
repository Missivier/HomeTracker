import { FastifyInstance, FastifyPluginAsync } from "fastify";
import UserController from "../controllers/UserController.js";

// Schémas pour la validation et la documentation
const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const createUserSchema = {
  type: "object",
  required: ["name", "email"],
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
};

const updateUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
};

const apiResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      oneOf: [
        { type: "array", items: userSchema },
        userSchema,
        { type: "null" },
      ],
    },
    error: { type: "string" },
    message: { type: "string" },
  },
};

// Plugin pour les routes d'utilisateurs
const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  // GET all users
  fastify.get("/", {
    schema: {
      response: {
        200: apiResponseSchema,
      },
    },
    handler: UserController.getAll,
  });

  // GET user by id
  fastify.get("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", pattern: "^\\d+$" },
        },
      },
      response: {
        200: apiResponseSchema,
        404: apiResponseSchema,
      },
    },
    handler: UserController.getById,
  });

  // POST create user
  fastify.post("/", {
    schema: {
      body: createUserSchema,
      response: {
        201: apiResponseSchema,
      },
    },
    handler: UserController.create,
  });

  // PUT update user
  fastify.put("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", pattern: "^\\d+$" },
        },
      },
      body: updateUserSchema,
      response: {
        200: apiResponseSchema,
        404: apiResponseSchema,
      },
    },
    handler: UserController.update,
  });

  // DELETE user
  fastify.delete("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string", pattern: "^\\d+$" },
        },
      },
      response: {
        200: apiResponseSchema,
        404: apiResponseSchema,
      },
    },
    handler: UserController.delete,
  });
};

export default userRoutes;
