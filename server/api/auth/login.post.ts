import prisma from "~~/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{


  const body = await readBody<{email: string, password: string}>(event)

  const user = await prisma.users.findUnique({
    where:{email:body.email}
  })
  if(!user){
    throw createError({statusCode:401,statusMessage:'Invalid email'})

  }

  const valid = await bcrypt.compare(body.password,user.password)
  if(!valid){
    throw createError({statusCode: 401, statusMessage:'Invalid password'})
  }
  //Generate JWT
  const token = jwt.sign({sub:user.id,email:user.email},process.env.JWT_SECRET!,{expiresIn:'7d'})
//save on cookie
    setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: true,//process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  return { message: 'Logged in successfully' }
})