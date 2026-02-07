// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: 'lila-chibane', // Remplacez par le nom de votre repository Prismic
    clientConfig: {
      routes: [
        {
          type: 'blog_post',
          path: '/blog/:uid',
        }
      ]
    }
  },
})
