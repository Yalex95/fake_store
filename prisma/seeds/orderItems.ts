import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 3; i++) {
    await prisma.order_items.create({
      data: {
        order: {
          connect: { id: "" },
        },
        variant: {
          connect: { id: "" },
        },
        quantity: faker.number.int(),
        price: parseFloat(faker.commerce.price()),
      },
    });
  }
}

main()
  .then(() => {
    console.log("Fake Order Items inserted.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
