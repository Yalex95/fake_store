// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    ["@prisma/nuxt", { client: false }],
    "nuxt-headlessui",
    "@nuxt/icon",
      "@pinia/nuxt",
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ["~/assets/css/index.css", "~/assets/css/main.css"],

  vite: {
    server: {
      watch: { usePolling: true },

      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
      },
    },
  },
  //   build: {
  //     rollupOptions: {},
  //   },
  //   ssr: {
  //     external: ["@prisma/client", "oxc-parser", "jsonwebtoken", "bcryptjs"],
  //   },
  //   resolve: {
  //     alias: {
  //       "@prisma/client/index-browser":
  //         "/app/node_modules/.prisma/client/index-browser.js",
  //     },
  //   },
  // },
  // nitro: {
  //   watchOptions: {
  //     usePolling: true,
  //     interval: 100,
  //   },
  // },
});
