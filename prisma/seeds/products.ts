import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.products.create({
    data: {
      brand:{
        connect:{id:'48b68b0a-8994-41f6-9945-ccdfeb213f0b'}
      },
      category: {
        connect:{id:'c9b0bce8-cfbc-415b-a6c3-d6da01fc379c'}
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
