// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", ["@prisma/nuxt", { client: false }]],
  css: ["~/assets/css/index.css", "~/assets/css/main.css"],
  ui: {
    // prefix: 'Nuxt',
    fonts: false,
    colorMode: false,
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
        // interval: 300 // puedes probar entre 100–300ms
      },

      hmr: { overlay: false },
    },
    build: {
      // si usas SSR
      rollupOptions: {},
    },
    ssr: {
      // No externaliza Prisma, deja que se use solo Node
      external: ["@prisma/client"],
    },
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
    // build: {
    //   transpile: []
    // }
  },
  nitro: {
    watchOptions: {
      usePolling: true,
      interval: 100,
    },
  },
});
