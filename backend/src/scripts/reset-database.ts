import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Suppression de tous les utilisateurs...");
    await prisma.user.deleteMany({});
    console.log("Tous les utilisateurs ont été supprimés avec succès.");

    console.log("Suppression de tous les rôles...");
    await prisma.role.deleteMany({});
    console.log("Tous les rôles ont été supprimés avec succès.");

    console.log("Création des nouveaux rôles...");
    const roles = await prisma.role.createMany({
      data: [
        { id: 1, name: "No roles" },
        { id: 2, name: "SuperAdmin" },
        { id: 3, name: "Admin" },
        { id: 4, name: "User" },
        { id: 5, name: "Invite" },
      ],
      skipDuplicates: true,
    });
    console.log(`${roles.count} rôles ont été créés.`);

    console.log("Base de données réinitialisée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation de la base de données:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main();
