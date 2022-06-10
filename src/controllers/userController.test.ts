import { resetDB } from "../utils/resetDB";
import supertest from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("userController", () => {
  beforeEach(async () => {
    await resetDB();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /users", () => {
    test("response with success", async () => {
      for (let i = 0; i < 3; i++) {
        await prisma.user.create({ data: { name: `user${i}`, email: `user${i}@example.com` } });
      }
      const users = await prisma.user.findMany();

      const response = await supertest(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body.users).toEqual(users);
    });
  });

  describe("GET /users/:id", () => {
    test("returns 200", async () => {
      const user = await prisma.user.create({ data: { name: "test", email: "test@example.com" } });
      const response = await supertest(app).get(`/users/${user.id}`);
      expect(response.status).toBe(200);
    });
  });
});
