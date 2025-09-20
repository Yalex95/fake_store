import prisma from "~~/lib/prisma";
import {getRouterParam} from "h3"

export default defineEventHandler(async(event)=>{
  const variantId = getRouterParam(event,"variant");
  const productVariantId = await prisma.product_variants.findUnique({
    where: {identifier: variantId},
    select:{
      id:true
    }
  })
  const stock = await prisma.variant_items.findMany({
    where: {
      productVariantId: productVariantId.id
    },
    select:{
      size: true,
      stock:true,
      sku: true
    }
  });
  return {data:stock}
})