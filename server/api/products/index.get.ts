import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  //Sanitize and validate params
  const name = typeof query.name === "string" ? query.name : "";
  const category = typeof query.category === "string" ? query.category : null;

  //Pagination
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  //filter construction
  const where: Prisma.productsWhereInput = {
    deletedAt: null,
  };

  if (name) {
    where.name = {
      contains: name,
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
    await prisma.product.findMany({
      where,
      include: {
        variants:{
          where: {isDefault: true},
          include:{
            skus: true
          }
        },
        categories: {
          select:{
            category: {
              select:{
            name:true,
                slug:true,
                parent:{
                  select:{
                    name: true, slug: true
                  }
                }

              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.product.count({where}),
  ]);
  // console.log(rawData);
const data = rawData.map((prod)=>{
  let obj ={...prod, variant : prod.variants[0]||0}
  // delete obj.variants;
  return obj;
})
// delete data.variants;
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
