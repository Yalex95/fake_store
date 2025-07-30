import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';


const prisma = new PrismaClient();

async function main(){
  for(let i=0; i< 3; i++){
    await prisma.product_images.create({
      data:{
        product: {
          connect:{ id:'1b105ecb-b35a-4b70-a813-396427440d31'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        product: {
          connect:{ id:'15ed92c9-8b8a-44a4-b07a-a5829efb2c44'}
        } ,
        image_url: faker.image.urlLoremFlickr({category:'technology'})
      }
    })
    await prisma.product_images.create({
      data:{
        product: {
          connect:{ id:'1056570b-5d92-48e1-a2e9-ad46859a3f18'}
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