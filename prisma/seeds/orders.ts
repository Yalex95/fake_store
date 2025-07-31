import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.orders.create({
      data: {
        user: {
          connect: { id: "" },
        },
        total_amount: parseFloat(faker.commerce.price()),
        status: "Delivered",
        shipping_address: faker.location.streetAddress(),
        billing_address: faker.location.direction(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
