import { defineStore } from "pinia";


interface User {
  id: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  /**
   * You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.
   */
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),
  persist: true,
  getters: {},
  actions: {
    //methods
    async login(email: string, password: string) {
      try {
        // El token se guarda automáticamente en la cookie
        await $fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });

        // Obtener el usuario actual usando el token en cookie
        await this.getCurrentUser();
      } catch (err: any) {
        this.isLoggedIn = false;
        throw new Error(err?.message || "Login failed");
      }
    },
    async getCurrentUser() {
      try {
        // Este endpoint debe leer la cookie HttpOnly y verificar JWT
        const user = await $fetch<User | null>("/api/auth/me");
        this.user = user;
        this.isLoggedIn = true;
      } catch (err) {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
    async logout(){
      await $fetch("/api/auth/logout",{method:"POST"});
      this.user=null;
      this.isLoggedIn=false;
    }
  },
});
