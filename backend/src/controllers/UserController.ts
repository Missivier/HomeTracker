import { FastifyReply, FastifyRequest } from "fastify";
import {
  ApiResponse,
  CreateUserDto,
  UpdateUserDto,
  User,
} from "../types/index.js";

// Données simulées pour l'exemple
const users: User[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean@exemple.fr",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie@exemple.fr",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class UserController {
  // Obtenir tous les utilisateurs
  public async getAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ApiResponse<User[]>> {
    return {
      success: true,
      data: users,
    };
  }

  // Obtenir un utilisateur par ID
  public async getById(
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<ApiResponse<User | null>> {
    const id = parseInt(request.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (!user) {
      reply.code(404);
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  }

  // Créer un nouvel utilisateur
  public async create(
    request: FastifyRequest<{
      Body: CreateUserDto;
    }>,
    reply: FastifyReply
  ): Promise<ApiResponse<User>> {
    const { name, email } = request.body;
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    reply.code(201);

    return {
      success: true,
      data: newUser,
      message: "User created successfully",
    };
  }

  // Mettre à jour un utilisateur
  public async update(
    request: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: UpdateUserDto;
    }>,
    reply: FastifyReply
  ): Promise<ApiResponse<User | null>> {
    const id = parseInt(request.params.id, 10);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      reply.code(404);
      return {
        success: false,
        error: "User not found",
      };
    }

    const updatedUser = {
      ...users[index],
      ...request.body,
      updatedAt: new Date(),
    };

    users[index] = updatedUser;

    return {
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    };
  }

  // Supprimer un utilisateur
  public async delete(
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<ApiResponse<null>> {
    const id = parseInt(request.params.id, 10);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      reply.code(404);
      return {
        success: false,
        error: "User not found",
      };
    }

    users.splice(index, 1);

    return {
      success: true,
      message: "User deleted successfully",
    };
  }
}

export default new UserController();
