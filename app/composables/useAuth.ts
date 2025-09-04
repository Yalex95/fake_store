import { email } from "zod/v4";

export const useAuth = () => {
  const user = useState<any | null>('auth_user', () => null)

  // Registro de usuario
  const register = async (payload: { name?: string; email: string; password: string }) => {
    return await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload,
    })
  }

  // Login de usuario
  const login = async (payload: { email: string; password: string }) => {
    console.log(email)
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload,
    })
    // después del login cargamos el perfil
    await getUser()
  }

  // Logout de usuario
  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  // Obtener perfil del usuario
  const getUser = async () => {
    try {
      const data = await $fetch('/api/auth/me')
      user.value = data
      return data
    } catch (err) {
      user.value = null
    }
  }

  return {
    user,
    register,
    login,
    logout,
    getUser,
  }
}
