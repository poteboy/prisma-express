import { PrismaClient } from "@prisma/client";
import * as seeds from "./seeds";

export const prisma = new PrismaClient();

async function main() {
  await seeds.seedUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
