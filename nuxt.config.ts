// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", ["@prisma/nuxt", { client: false }]],
  css: ["~/assets/css/index.css", "~/assets/css/main.css"],
  ui: {
    fonts: false,
    colorMode: false,
  },

  vite: {
    server: {
      watch: { usePolling: true},
      hmr: { overlay: false,timeout: 30000, },
    },
    build: {
      rollupOptions: {},
    },
    ssr: {
      external: ["@prisma/client", "oxc-parser", "jsonwebtoken", "bcryptjs"],
    },
    resolve: {
      alias: {
        "@prisma/client/index-browser":
          "/app/node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  nitro: {
    watchOptions: {
      usePolling: true,
      interval: 100,
    },
  },
});
