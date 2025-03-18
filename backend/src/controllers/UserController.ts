import { FastifyReply, FastifyRequest } from "fastify";
import jwtService from "../services/jwtService.js";
import passwordService from "../services/passwordService.js";
import prisma from "../services/prisma.js";
import { ApiResponse } from "../types/index.js";

interface UserParams {
  id: string;
}

interface CreateUserBody {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  roleId: number;
  username?: string;
  phone?: string;
  birthDate?: string;
  description?: string;
}

interface UpdateUserBody {
  lastName?: string;
  firstName?: string;
  email?: string;
  username?: string;
  phone?: string;
  birthDate?: string;
  description?: string;
  houseId?: number;
}

interface LoginUserBody {
  email: string;
  password: string;
}

const UserController = {
  // Récupérer tous les utilisateurs
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          username: true,
          phone: true,
          birthDate: true,
          inscriptionDate: true,
          description: true,
          roleId: true,
          houseId: true,
        },
      });

      const response: ApiResponse<typeof users> = {
        success: true,
        data: users,
        message: "Utilisateurs récupérés avec succès",
      };

      return reply.code(200).send(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la récupération des utilisateurs",
      };

      return reply.code(500).send(response);
    }
  },

  // Récupérer un utilisateur par son ID
  async getById(
    request: FastifyRequest<{ Params: UserParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          username: true,
          phone: true,
          birthDate: true,
          inscriptionDate: true,
          description: true,
          roleId: true,
          houseId: true,
        },
      });

      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Utilisateur non trouvé",
        };
        return reply.code(404).send(response);
      }

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
        message: "Utilisateur récupéré avec succès",
      };

      return reply.code(200).send(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la récupération de l'utilisateur",
      };

      return reply.code(500).send(response);
    }
  },

  // Créer un nouvel utilisateur
  async create(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply
  ) {
    try {
      const {
        lastName,
        firstName,
        email,
        password,
        roleId,
        username,
        phone,
        birthDate,
        description,
      } = request.body;

      // Vérifier si l'email existe déjà
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Cet email est déjà utilisé par un autre compte.",
        };
        return reply.code(400).send(response);
      }

      // Création du nouvel utilisateur
      const newUser = await prisma.user.create({
        data: {
          lastName,
          firstName,
          email,
          password, // Idéalement, hashé avant stockage
          roleId,
          username,
          phone,
          birthDate: birthDate ? new Date(birthDate) : undefined,
          description,
          inscriptionDate: new Date(),
        },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          username: true,
          phone: true,
          birthDate: true,
          inscriptionDate: true,
          description: true,
          roleId: true,
        },
      });

      const response: ApiResponse<typeof newUser> = {
        success: true,
        data: newUser,
        message: "Utilisateur créé avec succès",
      };

      return reply.code(201).send(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la création de l'utilisateur",
      };

      return reply.code(500).send(response);
    }
  },

  // Mettre à jour un utilisateur
  async update(
    request: FastifyRequest<{ Params: UserParams; Body: UpdateUserBody }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Utilisateur non trouvé",
        };
        return reply.code(404).send(response);
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          ...updateData,
          birthDate: updateData.birthDate
            ? new Date(updateData.birthDate)
            : undefined,
        },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          username: true,
          phone: true,
          birthDate: true,
          description: true,
          houseId: true,
        },
      });

      const response: ApiResponse<typeof updatedUser> = {
        success: true,
        data: updatedUser,
        message: "Utilisateur mis à jour avec succès",
      };

      return reply.code(200).send(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la mise à jour de l'utilisateur",
      };

      return reply.code(500).send(response);
    }
  },

  // Supprimer un utilisateur
  async delete(
    request: FastifyRequest<{ Params: UserParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Utilisateur non trouvé",
        };
        return reply.code(404).send(response);
      }

      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      const response: ApiResponse<null> = {
        success: true,
        message: "Utilisateur supprimé avec succès",
      };

      return reply.code(200).send(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la suppression de l'utilisateur",
      };

      return reply.code(500).send(response);
    }
  },

  // Authentifier un utilisateur
  async login(
    request: FastifyRequest<{ Body: LoginUserBody }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = request.body;
      console.log("Tentative de connexion pour l'email:", email);

      // Rechercher l'utilisateur par email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          password: true, // Pour la vérification
          username: true,
          phone: true,
          birthDate: true,
          description: true,
          roleId: true,
          houseId: true,
        },
      });

      // Vérifier si l'utilisateur existe
      if (!user) {
        console.log("Utilisateur non trouvé pour l'email:", email);
        const response: ApiResponse<null> = {
          success: false,
          message: "Email ou mot de passe incorrect",
        };
        return reply.code(401).send(response);
      }

      console.log("Utilisateur trouvé, ID:", user.id, "Rôle:", user.roleId);

      // Vérifier si le mot de passe correspond
      const passwordMatches = await passwordService.verifyPassword(
        password,
        user.password
      );

      if (!passwordMatches) {
        console.log("Mot de passe incorrect pour l'utilisateur ID:", user.id);
        const response: ApiResponse<null> = {
          success: false,
          message: "Email ou mot de passe incorrect",
        };
        return reply.code(401).send(response);
      }

      console.log("Mot de passe validé pour l'utilisateur ID:", user.id);

      // Utilisateur authentifié avec succès
      // Ne pas renvoyer le mot de passe
      const { password: _, ...userWithoutPassword } = user;

      // Nettoyer les espaces dans les champs de type string
      const cleanedUser = Object.fromEntries(
        Object.entries(userWithoutPassword).map(([key, value]) => {
          // Si la valeur est une chaîne, supprimer les espaces
          if (typeof value === "string") {
            return [key, value.trim()];
          }
          // Sinon, conserver la valeur telle quelle
          return [key, value];
        })
      );

      // Générer un token JWT
      const token = jwtService.generateToken({
        userId: user.id,
        roleId: user.roleId,
        email: user.email.trim(),
      });

      console.log("Authentification réussie pour l'utilisateur ID:", user.id);

      const response: ApiResponse<typeof cleanedUser & { token: string }> = {
        success: true,
        data: { ...cleanedUser, token },
        message: "Authentification réussie",
      };

      return reply.code(200).send(response);
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de l'authentification",
      };

      return reply.code(500).send(response);
    }
  },

  // Enregistrer un nouvel utilisateur (avec authentification)
  async register(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply
  ) {
    try {
      const {
        lastName,
        firstName,
        email,
        password,
        roleId = 1, // Valeur par défaut à 1 (No roles) si non fournie
        username,
        phone,
        birthDate,
        description,
      } = request.body;

      // Vérifier si l'email existe déjà
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Cet email est déjà utilisé par un autre compte.",
        };
        return reply.code(400).send(response);
      }

      // Hacher le mot de passe avec la nouvelle méthode sécurisée
      const hashedPassword = await passwordService.hashPassword(password);

      // Création du nouvel utilisateur
      const newUser = await prisma.user.create({
        data: {
          lastName,
          firstName,
          email,
          password: hashedPassword, // Mot de passe haché avec PBKDF2
          roleId: roleId || 1, // Assurer qu'un rôle est toujours assigné (No roles = 1)
          username,
          phone,
          birthDate: birthDate ? new Date(birthDate) : undefined,
          description,
          inscriptionDate: new Date(),
        },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          username: true,
          phone: true,
          birthDate: true,
          inscriptionDate: true,
          description: true,
          roleId: true,
        },
      });

      // Générer un token JWT
      const token = jwtService.generateToken({
        userId: newUser.id,
        roleId: newUser.roleId,
        email: newUser.email,
      });

      const userData = {
        ...newUser,
        token,
      };

      const response: ApiResponse<typeof userData> = {
        success: true,
        data: userData,
        message: "Utilisateur créé et authentifié avec succès",
      };

      return reply.code(201).send(response);
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        message: "Erreur lors de la création de l'utilisateur",
      };

      return reply.code(500).send(response);
    }
  },
};

export default UserController;
