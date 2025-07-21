import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 3; i++) {
    await prisma.categories.create({

       data: {
        // Replace 'name' and 'image' with actual fields from your 'Category' model
        name: faker.lorem.words(2),
        image: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })}}

    main()
  .then(() => {
    console.log('✅ Fake categories inserted.')
    return prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })