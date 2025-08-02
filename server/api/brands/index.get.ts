import prisma from '~~/lib/prisma';
import {Prisma} from '@prisma/client';
import {getQuery} from "h3"

export default defineEventHandler(async(event)=>{
  const query = getQuery(event);
  //TODO: add filter options to filter products by brand
  //sanitize and validate params
  const data= await prisma.brands.findMany({
    select:{
      name: true,
      logo: true
    },
    orderBy:{
      name: "desc"
    }
  })
  return {data}
});
