import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const role = await prisma.role.create({
      data: {
        name: "user",
      },
    });
    console.log("Rôle créé avec succès:", role);
  } catch (error) {
    console.error("Erreur lors de la création du rôle:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
