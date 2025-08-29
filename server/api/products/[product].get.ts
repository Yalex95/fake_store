import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";
import { select } from "#build/ui";
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "product");
  const productDetails = await prisma.variants.findUnique({
    where: {
      deletedAt: null,
      id: productId,
    },
    include:{
      product:{
        select:{
          brand: {
            select: {
              name: true
            }
          },
          title:true,
          description: true,
          rating:true,
          variants:true
          // reviews:true
        }
      },
      product_images:true
    }
  });
  function getfinalPrice(
    productPrice: number | null,
    percentageOff: number | null
  ): number {
    if (!productPrice) return 0;
    if (!percentageOff) return 0;
    let finalPrice = productPrice * (1 - percentageOff / 100);
    let decimals = finalPrice.toFixed(2)
    return parseFloat(decimals);
  }

  const { variants,...rest } = productDetails.product;
  const { price,percentageOff} = productDetails;
  productDetails.product = {
    ...rest,
    availableVariants: variants.map((v:any) => ({
      ...v,
      finalPrice: getfinalPrice(v.price,v.percentageOff)
    })),
  };
  productDetails.finalPrice= getfinalPrice(price,percentageOff)
return productDetails

  // return product;
});
