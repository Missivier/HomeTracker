import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        email: "test@example.com",
      },
    });

    if (existingUser) {
      console.log(
        "L'utilisateur de test existe déjà avec l'ID:",
        existingUser.id
      );
      return;
    }

    // Hacher le mot de passe
    const password = "password123";
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        lastName: "Utilisateur",
        firstName: "Test",
        email: "test@example.com",
        password: hashedPassword,
        roleId: 1, // No roles
        username: "testuser",
        inscriptionDate: new Date(),
      },
    });

    console.log("Utilisateur de test créé avec succès:");
    console.log({
      id: user.id,
      nom: user.lastName,
      prenom: user.firstName,
      email: user.email,
      username: user.username,
      role: user.roleId,
      password: password,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur de test:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
