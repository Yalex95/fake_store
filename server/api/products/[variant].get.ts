import prisma from "~~/lib/prisma";
import { getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const identifier = getRouterParam(event, "variant");
  const product = await prisma.product_variants.findUnique({
    where: {
      identifier: identifier,
    },
    select: {
      productId: true,
      name: true,
      image: true,
      standardPrice: true,
      salePrice: true,
      color: true,
      slug: true,
      gallery: true,
      skus: true,
      product: {
        include:{
          variants:true
        }
      },
    },
  });
  return { data: product };
});
