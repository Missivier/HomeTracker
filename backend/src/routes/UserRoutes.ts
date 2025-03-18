import { FastifyInstance, FastifyPluginAsync } from "fastify";
import UserController from "../controllers/UserController.js";

// Schémas pour la validation et la documentation
const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    lastName: { type: "string" },
    firstName: { type: "string" },
    username: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", format: "email" },
    birthDate: { type: "string", format: "date-time" },
    inscriptionDate: { type: "string", format: "date-time" },
    description: { type: "string" },
    roleId: { type: "integer" },
    houseId: { type: "integer" },
  },
};

const createUserSchema = {
  type: "object",
  required: ["lastName", "firstName", "email", "password", "roleId"],
  properties: {
    lastName: { type: "string" },
    firstName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    username: { type: "string" },
    phone: { type: "string" },
    birthDate: { type: "string", format: "date-time" },
    description: { type: "string" },
    roleId: { type: "integer" },
  },
};

const updateUserSchema = {
  type: "object",
  properties: {
    lastName: { type: "string" },
    firstName: { type: "string" },
    email: { type: "string", format: "email" },
    username: { type: "string" },
    phone: { type: "string" },
    birthDate: { type: "string", format: "date-time" },
    description: { type: "string" },
    houseId: { type: "integer" },
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

  // LOGIN route
  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      response: {
        200: apiResponseSchema,
        401: apiResponseSchema,
      },
    },
    handler: UserController.login,
  });

  // REGISTER route
  fastify.post("/register", {
    schema: {
      body: createUserSchema,
      response: {
        201: apiResponseSchema,
        400: apiResponseSchema,
      },
    },
    handler: UserController.register,
  });
};

export default userRoutes;
