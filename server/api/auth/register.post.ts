import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    username: string;
    email: string;
    password: string;
  }>(event);
  //TODO: validate data before submitting
  //check uniqueness if user name or email already exist in the database to prevent duplicate accounts
  
  const validateUser = await prisma.users.findUnique({
    where:{email:body.email}
  })
  if(validateUser){
    throw createError({statusCode:409,statusMessage:'Email already taken'})
  }
  //crete user if theres no email registerd
    const user = await prisma.users.create({
    data: {
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password),
      isActive: true,
      role: "user",
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  //TODO: add email confirmation on bd to send llink to the users email qaddress
  //generate session or token for the user to logthem into the application
  //Generate JWT
  const token = jwt.sign({sub:user.id,email:user.email},process.env.JWT_SECRET!,{expiresIn:'7d'})
    setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  
  return { message: "User created successfully" };
});
