import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.products.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({min:1,max:100}),
        category: {
          connect:{id:'31f91529-4697-4180-8ae1-4b9e6d96f7f0'}
        },
        image_url: faker.image.urlPicsumPhotos(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        itemCode: faker.string.alphanumeric(10),
        color: faker.color.rgb(),
        size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
        brand: faker.company.name(),
        createdAt: new Date(),
        updatedAt: new Date(),
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
