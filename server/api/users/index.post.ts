import prisma from '@@/lib/prisma'
import bcrypt from "bcryptjs"

// const prismaClient = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.password || !body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Email y password son requeridos' })
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await prisma.users.create({
    data: {
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashedPassword,
      avatar: body.avatar,
    },
  })

  return {
    message: 'Usuario registrado exitosamente',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
})
