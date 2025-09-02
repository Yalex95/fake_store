import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';


const prisma = new PrismaClient();

async function main(){
  for(let i=0; i< 3; i++){
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'8fb2a3d0-8d0a-4f2b-92ed-982cd1dde300'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'92aab165-8578-4c2a-8ae4-57bb264ba4a0'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'2542a02a-689b-4205-bec5-946e305acf0d'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'d93a4ccb-6fe8-4eac-9e00-b7fcfbfc991e'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'304107d1-f431-49ce-b77e-e55eddea527c'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
  }
}

main().then(()=>{
  console.log('Fake images inserted');
  return prisma.$disconnect()
}).catch(async(e)=>{
  console.log(e);
  await prisma.$disconnect()
  process.exit(1)
})