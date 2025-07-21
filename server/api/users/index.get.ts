import prisma  from '@@/lib/prisma'

export default defineEventHandler(async () => {
  const users= await prisma.users.findMany()
  return {
    statusCode: 200,
    data: users
  }
})
