// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/supabase'],
  ui: {
    global: true,
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  supabase: {
    redirect: false,
  },
})
