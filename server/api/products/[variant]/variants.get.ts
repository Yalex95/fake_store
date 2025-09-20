import prisma from "~~/lib/prisma";
import { getRouterParam } from "h3";

export default defineEventHandler(async(event)=>{
  const variantId =getRouterParam(event,"variant");
  const productVariantId = await prisma.product_variants.findUnique({
    where: {identifier: variantId},
    select:{
      productId:true
    }
  })
  const variants = await prisma.product_variants.findMany({
    where:{productId:productVariantId?.productId},
    select:{
      id:true,
      name:true,
      image:true,
      slug:true,
      identifier:true
    }
  })
  return{data:variants}
})
