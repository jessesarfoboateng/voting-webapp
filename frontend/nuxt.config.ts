// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:5000/api' // backend URL
    }
  }
})
