import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const roles = await prisma.role.findMany();
    console.log("Rôles dans la base de données:", roles);
    console.log("Nombre total de rôles:", roles.length);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
