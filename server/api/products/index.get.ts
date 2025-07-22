import prisma from "~~/lib/prisma"
import { getQuery } from "h3"


export default defineEventHandler(async(event)=>{
  const query = getQuery(event);
  const title =
    typeof query === "object" && query !== null && "title" in query && query.title != null
      ? query.title.toString()
      : '';
      const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit
  const result = await prisma.products.findMany({
    select:{
      title:true,
      price:true,
      description:true,
      image:true,
      rating:true,
      itemCode:true,
      stock:true,
      color:true,
      size:true,
      brand:true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      deletedAt: null,
      ...(title && {
        title: {
          contains: title,
          mode: "insensitive", // Esto permite una búsqueda sin distinción entre mayúsculas y minúsculas
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });
  return {
    data: result,
     meta: {
      page,
      per_page:5,
      current_page: page,
      last_page:,
      first_page:,
      first_page_url,
      last_page_url,
      next_page_url:,
      previous_page_url:,
      limit,
      total: result.length,
      pages: Math.ceil(result.length / limit),
    },
  };
})