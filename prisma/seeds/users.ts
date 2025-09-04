import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // for (let i = 0; i < 5; i++) {
    await prisma.users.create({
      data: {
        name: 'admin',
        username: faker.internet.username(),
        password: bcrypt.hashSync('123456'),
        isActive: true,
        role: "user",
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  // }
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
