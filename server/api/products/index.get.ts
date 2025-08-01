import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  //Sanitize and validate params
  const title = typeof query.title === "string" ? query.title : "";
  const category = typeof query.category === "string" ? query.category : null;

  //Pagination
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  //filter construction
  const where: Prisma.productsWhereInput = {
    deletedAt: null,
  };

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (category) {
    where.category = {
      name: {
        equals: category,
        mode: "insensitive",
      },
    };
  }
  //Get data and count products
  const [rawData, total] = await Promise.all([
    await prisma.products.findMany({
      where,
      include: {
        variants: {
          select: {
            id: true,
            image_url: true,
            color: true,
            size: true,
            price: true,
            stock: true,
            percentageOff: true,
            sku: true,
          },
          where: { deletedAt: null },
          // take: 1,
        },
        category: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.products.count({ where }),
  ]);
  function getfinalPrice(
    productPrice: number | null,
    percentageOff: number | null
  ): number {
    if (!productPrice) return 0;
    if (!percentageOff) return 0;
    return productPrice * (1 - percentageOff / 100);
  }
  //Clean result and return default variant
  const data = rawData.map((product) => {
    const { variants, ...rest } = product;
    return {
      ...rest,
      availableColors: variants.map((v) => ({
        color: v.color,
        variantID: v.id,
      })),
      defaultVariant: {
        ...(variants[0] ?? null),
        finalPrice: getfinalPrice(
          variants[0]?.price,
          variants[0]?.percentageOff
        ),//TODO: it will ned to be a col if the db will grow, for best practices it shoud be a col in product variants
      },
    };
  });

  //generate pagination meta
  const pages = Math.ceil(total / limit);
  const first_page = 1;
  const last_page = pages;

  //genrate pages
  const first_page_url = `?page=1`;
  const last_page_url = `?page=${pages}`;
  const next_page_url = page < pages ? `?page=${page + 1}` : null;
  const previous_page_url = page > 1 ? `?page=${page - 1}` : null;
  return {
    data,
    meta: {
      current_page: page,
      last_page,
      first_page,
      first_page_url,
      last_page_url,
      next_page_url,
      previous_page_url,
      limit,
      total,
      pages,
    },
  };
});
