import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//TODO: create a fucntion to assign sku (brand-cat-model-color-size)
async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.variants.create({
      data: {
        product: { connect: { id: "5bae5821-4635-4618-8acf-4e903fd999c1" } },
        sku: `NI-CL-A9F2${i}-BL-M`,
        color: faker.color.rgb(),
        size: faker.helpers.arrayElement(["S", "M", "L", "XL"]),
        price: parseFloat(faker.commerce.price()),
        image_url: faker.image.urlPicsumPhotos(),
        stock: faker.number.int({ min: 1, max: 100 }),
        percentageOff: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
main()
  .then(() => {
    console.log("Fake product variants inserted.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
