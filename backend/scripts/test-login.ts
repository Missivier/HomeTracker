import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  try {
    // Informations de connexion pour le test
    const email = "test@example.com";
    const password = "password123";

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
        roleId: true,
        inscriptionDate: true,
      },
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      console.log(`Utilisateur avec l'email '${email}' non trouvé`);
      return;
    }

    console.log("Utilisateur trouvé:", {
      id: user.id,
      nom: user.lastName,
      prenom: user.firstName,
      email: user.email,
      username: user.username,
      roleId: user.roleId,
      inscriptionDate: user.inscriptionDate,
    });

    // Hacher le mot de passe fourni pour la comparaison
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Vérifier si les mots de passe correspondent
    if (user.password === hashedPassword) {
      console.log("✅ Connexion réussie: Le mot de passe est correct");
      console.log(
        `   Mot de passe haché: ${hashedPassword.substring(0, 10)}...`
      );
      console.log(
        `   Mot de passe stocké: ${user.password.substring(0, 10)}...`
      );
    } else {
      console.log("❌ Échec de la connexion: Le mot de passe est incorrect");
      console.log(
        `   Mot de passe haché: ${hashedPassword.substring(0, 10)}...`
      );
      console.log(
        `   Mot de passe stocké: ${user.password.substring(0, 10)}...`
      );
    }
  } catch (error) {
    console.error("Erreur lors du test de connexion:", error);
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
