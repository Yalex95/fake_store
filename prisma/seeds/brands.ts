import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 3; i++) {
    await prisma.brands.create({
      data: {
        name: faker.company.name(),
        logo: faker.image.urlLoremFlickr({ category: "logo" }),
      },
    });
  }
}

main()
  .then(() => {
    console.log("Fake Brands Inserted");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
