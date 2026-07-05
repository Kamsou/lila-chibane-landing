// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
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
    exclude: ['/preview'],
  },
  prismic: {
    endpoint: 'lila-chibane',
    clientConfig: {
      defaultParams: { lang: 'fr-fr' },
      routes: [
        {
          type: 'blog_post',
          path: '/blog/:uid',
        }
      ]
    }
  },
})
