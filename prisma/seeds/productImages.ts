import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';


const prisma = new PrismaClient();

async function main(){
  for(let i=0; i< 3; i++){
    await prisma.product_images.create({
      data:{
        variant: {
          connect:{ id:'f10f8ee7-ba1d-4c31-bfae-3c644430430b'}
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