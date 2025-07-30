import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.products.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({min:1,max:100}),
        category: {
          connect:{id:'a4635bdb-f5db-498e-aef5-d26889f1dd2b'}
        },
        image_url: faker.image.urlPicsumPhotos(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        itemCode: faker.string.alphanumeric(10),
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
