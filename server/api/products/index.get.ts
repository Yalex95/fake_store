import prisma from "~~/lib/prisma"
import { getQuery } from "h3"


export default defineEventHandler(async(event)=>{
  const {query} = getQuery(event)
  const title=query?.title.toString()
  const result = await prisma.products.findMany({
    where:{
      deletedAt: null,
      title:{
        contains: title,
        mode: 'insensitive' // Esto permite una búsqueda sin distinción entre mayúsculas y minúsculas
      }

    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return {
    data: result
  }
})