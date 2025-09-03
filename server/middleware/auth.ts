import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) return

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    
    event.context.user = decoded
  } catch {
    deleteCookie(event, 'auth_token')
  }
})
