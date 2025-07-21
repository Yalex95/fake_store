import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.products.create({
      data: {
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: {
          connect:{id:'16d90697-f576-4caf-8100-5aacceb5fe37'}
        },
        image: faker.image.url(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        itemCode: faker.string.uuid(),
        stock: faker.number.int({ min: 0, max: 100 }),
        color: faker.color.human(),
        size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
        brand: faker.company.name()
      }
    })
  }
}

main()
  .then(() => {
    console.log('✅ Fake products inserted.')
    return prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
