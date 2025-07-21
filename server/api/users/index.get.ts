import prisma  from '@@/lib/prisma'

export default defineEventHandler(async () => {
  const users= await prisma.users.findMany({
    select:{
      name: true,
      username: true,
      email: true,
      avatar: true
    }
  })
  return {
    data: users
  }
})
