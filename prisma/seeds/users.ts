import { prisma } from "../seed";

export const seedUsers = async () => {
  const keita = prisma.user.upsert({
    where: { email: "keita@example.com" },
    update: {},
    create: { name: "keita", email: "keita@example.com" },
  });
  console.log("-- users created --");
};
