import prisma from "~~/lib/prisma";
import { Prisma } from "@prisma/client";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  const title = typeof query.title === "string" ? query.title : "";
  const category = typeof query.category === "string" ? query.category : null;
  const inStock = query.inStock === "true" ? true : query.inStock === "false" ? false : null;

  //Pagination
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;
const where: Prisma.productsWhereInput =  {
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

  // if (inStock !== null) {
  //   where.stock = inStock ? { gt: 0 } : 0;
  // }

  const [rawData, total] = await Promise.all([
    await prisma.products.findMany({
      // relationLoadStrategy:'join',
    where,
    include:{
      variants:{
        select:{
          image_url: true,
          color: true,
          size: true,
          price: true,
          stock: true,
          percentageOff: true
        },
        where:{ deletedAt:null},
        take: 1
      },
      category: {
        select:{name:true}
      }
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  }),
  prisma.products.count({  where
  })
  ])

const data = rawData.map((product,index)=>{
  const {variants,...rest}= product;
  return {
    ...rest,
    defaultProduct: variants[0] ??null
  }
})


  const pages = Math.ceil(total / limit);
  
  const first_page = 1;
  const last_page = pages;
  const first_page_url =`?page=1`
  const last_page_url = `?page=${pages}`;
  const next_page_url = page <pages ? `?page=${page+1}` : null;
  const previous_page_url = page>1 ?`?page=${page-1}`:null;
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
      pages
    },
  };
});
