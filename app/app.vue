<script setup>
const route = useRoute()
const canonicalUrl = computed(() => `https://lilachibane.com${route.path}`)

useHead({
  htmlAttrs: { lang: 'fr' },
  link: [
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  meta: [
    { name: 'theme-color', content: '#FAF8F5' },
    { name: 'geo.region', content: 'FR-NAQ' },
    { name: 'geo.placename', content: 'Bordeaux' },
    { name: 'geo.position', content: '44.8378;-0.5792' },
    { name: 'ICBM', content: '44.8378, -0.5792' },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:site_name', content: 'Lila Chibane' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
