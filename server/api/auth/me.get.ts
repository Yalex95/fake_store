import jwt from "jsonwebtoken";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; email: string };
    const user = await prisma.users.findUnique({ where: { id: decoded.sub },select:{
      name:true,
      username:true,
      role:true,
      email:true,
      avatar: true
    } });
    return user;
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
});
