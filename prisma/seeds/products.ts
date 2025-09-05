import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.products.create({
    data: {
      brand:{
        connect:{id:'9e31a30e-cb8a-4040-a964-fc00a180964f'}
      },
      category: {
        connect:{id:'ea632b7a-e8af-4866-b487-d9d8c3f89e9b'}
      },
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      rating: parseFloat((Math.random() * 5).toFixed(1)),

      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
  // for (let i = 0; i < 1; i++) {
  // }
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
