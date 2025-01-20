// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-tiptap-editor',
    '@nuxtjs/device',
    '@nuxtjs/turnstile',
  ],
  css: ['@/assets/css/font.css', '@/assets/css/tailwind.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,
    },
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    }
  },
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },
  ui: {
    global: true,
  },
})