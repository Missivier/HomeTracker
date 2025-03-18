import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Utilisateurs dans la base de données:", users);
    console.log("Nombre total d'utilisateurs:", users.length);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
