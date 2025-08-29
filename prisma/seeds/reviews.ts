import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let index = 0; index < 5; index++) {
    await prisma.reviews.create({
      data: {
        user: {
          connect: {
            id: "",
          },
        },
        product: {
          connect: { id: "" },
        },
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        comment: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
