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
      nom: user.lastName.trim(),
      prenom: user.firstName.trim(),
      email: user.email.trim(),
      username: user.username ? user.username.trim() : null,
      roleId: user.roleId,
      inscriptionDate: user.inscriptionDate,
    });

    // Hacher le mot de passe fourni pour la comparaison
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    console.log("Comparaison des mots de passe:");
    console.log("Mot de passe haché:  ", hashedPassword);
    console.log("Mot de passe stocké: ", user.password);
    console.log(
      "Longueurs:",
      hashedPassword.length,
      "vs",
      user.password.length
    );

    // Vérifier si les mots de passe correspondent (même après avoir supprimé les espaces)
    if (hashedPassword === user.password.trim()) {
      console.log(
        "✅ Connexion réussie: Le mot de passe est correct après trim"
      );
    } else if (hashedPassword === user.password) {
      console.log("✅ Connexion réussie: Le mot de passe est correct");
    } else {
      console.log("❌ Échec de la connexion: Le mot de passe est incorrect");
      // Afficher des caractères hexadécimaux pour débogage
      console.log(
        "Caractères du haché: ",
        Array.from(hashedPassword)
          .map((c) => c.charCodeAt(0).toString(16))
          .join(" ")
      );
      console.log(
        "Caractères du stocké:",
        Array.from(user.password)
          .map((c) => c.charCodeAt(0).toString(16))
          .join(" ")
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
