import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    await prisma.users.create({
      data: {
        name: 'user',
        username: "user123",
        password: bcrypt.hashSync('123456'),
        isActive: true,
        role: "USER",
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
}
main()
  .then(() => {
    console.log("✅ Fake user inserted.");
    return prisma.$disconnect();
  })
  .catch(async () => {
    console.error("Error inserting fake users");
    await prisma.$disconnect();
    process.exit(1);
  });
