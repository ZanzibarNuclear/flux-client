// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/supabase', '@nuxt/image'],
  ui: {
    global: true,
  },
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiRootUrl: process.env.API_ROOT_URL,
    },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/join',
      callback: '/confirm-auth',
      cookieRedirect: true,
      include: ['/explore', '/messages', '/notifications'],
    },
    cookieName: 'won-token',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    }
  },
})
