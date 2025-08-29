import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.products.create({
      data: {
        brand:{
          connect:{id:'7f415574-7da9-4a1a-bc87-6e7d7eff49bb'}
        },
        category: {
          connect:{id:'30b7a08b-b809-44ed-b7f8-3ddba58747f4'}
        },
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),

        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await prisma.products.create({
      data: {
        brand:{
          connect:{id:'89477d66-baa3-4faf-8fcb-61c20819e80c'}
        },
        category: {
          connect:{id:'9c007bca-13ce-486c-9e5d-43a578d9aa11'}
        },
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),

        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await prisma.products.create({
      data: {
        brand:{
          connect:{id:'d99bde68-e06d-4eea-97e5-c7a315648323'}
        },
        category: {
          connect:{id:'a1185ff2-6e04-491a-a4f2-06a2144fab59'}
        },
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        rating: parseFloat((Math.random() * 5).toFixed(1)),

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
