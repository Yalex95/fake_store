import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";
// import { select } from "#build/ui";
export default defineEventHandler(async (event) => {
  const identifier = getRouterParam(event, "product");
  const product = await prisma.product_variants.findUnique({
    where:{
      slug: identifier
    },
    select:{
      gallery: true,
      skus: true,
      product:true
      // categories:{include:{category:{include:{parent: true}}}}},
  }});
  // console.log(product);
   return {type: "product", data: product}
// const variant = await prisma.product_variants.findUnique({

// })
// return productDetails

});
