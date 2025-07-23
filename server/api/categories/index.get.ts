import prisma from "~~/lib/prisma"



export default defineEventHandler(async()=>{

  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return categories;
})