import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";
// import { select } from "#build/ui";
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
      product: true,
    },
  });
  return { data: product };
});
