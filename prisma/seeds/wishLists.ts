import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.wishlists.create({
      data: {
        user: {
          connect: { id: "" },
        },
        product: { connect: { id: "" } },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

main()
  .then(() => {
    console.log("Fake wishlists inserted");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
