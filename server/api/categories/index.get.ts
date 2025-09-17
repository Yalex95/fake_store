import prisma from "~~/lib/prisma"



export default defineEventHandler(async()=>{
//TODO: add filter query opt to filter products by cat
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      // image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return categories;
})