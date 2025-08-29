import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';


const prisma = new PrismaClient();

async function main(){
  for(let i=0; i< 3; i++){
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'25d6724a-f36d-4f0d-8350-22bb5df8830f'}
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