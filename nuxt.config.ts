// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/prismic',
    '@nuxtjs/sitemap',
    '@nuxthub/core',
  ],
  site: {
    url: 'https://lilachibane.com',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  prismic: {
    endpoint: 'lila-chibane',
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
