// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui',"@prisma/nuxt"],
  css: [
    "~/assets/css/index.css",'~/assets/css/main.css'
  ],
  ui: {
    // prefix: 'Nuxt',
    fonts: false,
    colorMode: false
  }
})