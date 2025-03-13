import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false, // Disable server-side rendering for this page
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css', // Tailwind CSS
    '@/assets/css/custom.css',   // Your custom styles
  ],
  plugins: ["~/plugins/aos.client.ts"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@kevinmarrec/nuxt-pwa'],
  pwa: {
    workbox: {
      enabled: true
    },
    meta: {
      title: "Bank-OS",
      author: "Marquis",
      mobileAppIOS: false,
      mobileApp: true,
      description:
        "Build wealth, diversifying your investments.",
      theme_color: "#27396B",
      background_color: "#27396B",
      display: "standalone",
      start_url: "/",
      nativeUI: true,
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: "Achilles Drill",
      lang: "fa",
      useWebmanifestExtension: false,
    },
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://cdn.snipcart.com/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern:
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },
  generate: {
    exclude: [/^\/dashboard/],  // Exclude all dashboard routes
  },
  nitro: {
    prerender: {
      routes: ['/']  // Specify the routes you want to prerender
    }
  }
});
