<script setup>
const prismic = usePrismic();

const { data: articles } = await useAsyncData('blog-posts', async () => {
  const response = await prismic.client.getAllByType('blog_post', {
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' }
    ]
  });
  return response;
});

const route = useRoute()
const theme = computed(() => {
  const t = route.query.theme
  return t === 'coaching' || t === 'dog' ? t : null
})
const filtered = computed(() => {
  const list = articles.value || []
  if (!theme.value) return list
  return list.filter((a) => {
    const c = a.data.category || 'les deux'
    return c === 'les deux' || c === theme.value
  })
})
const themeLabel = computed(() => (theme.value === 'coaching' ? 'coaching sportif' : theme.value === 'dog' ? 'dog sitting' : ''))

useSeoMeta({
  title: 'Blog sport-santé & bien-être · Lila Chibane',
  description: 'Conseils de coach sportive pour reprendre une activité physique en douceur : forme, énergie, régulation du stress et bien-être au féminin. Par Lila Chibane, dans le Médoc.',
  ogTitle: 'Blog sport-santé & bien-être · Lila Chibane',
  ogDescription: 'Conseils sport-santé, forme et confiance en soi, en douceur.',
  ogUrl: 'https://lilachibane.com/blog',
  ogType: 'website',
  ogImage: 'https://lilachibane.com/test-2.jpeg',
  twitterTitle: 'Blog sport-santé & bien-être · Lila Chibane',
  twitterDescription: 'Conseils sport-santé, forme et confiance en soi, en douceur.',
  twitterImage: 'https://lilachibane.com/test-2.jpeg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog sport-santé & bien-être · Lila Chibane',
        description: 'Conseils de coach sportive : forme, énergie, régulation du stress et bien-être au féminin, par Lila Chibane.',
        url: 'https://lilachibane.com/blog',
        inLanguage: 'fr',
        isPartOf: { '@type': 'WebSite', name: 'Lila Chibane', url: 'https://lilachibane.com' },
        publisher: { '@type': 'Person', '@id': 'https://lilachibane.com/#lila', name: 'Lila Chibane' },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lilachibane.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lilachibane.com/blog' },
        ],
      }),
    },
  ],
})

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>

<template>
  <div class="min-h-screen bg-bleu text-white">
    <ActivityHeader />

    <!-- Blog Content -->
    <main class="pt-28 md:pt-36 pb-20 md:pb-32">
      <div class="max-w-5xl mx-auto px-6 md:px-10">
        <!-- Header -->
        <div class="mb-8 md:mb-10">
          <span class="text-xs font-body font-normal tracking-wider text-white/50 mb-4 block">Blog</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-white leading-[1.1] mb-5 md:mb-6">
            Conseils et réflexions
          </h1>
          <p class="text-base sm:text-lg font-body font-light text-white/70 max-w-2xl leading-relaxed">
            Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur.
          </p>
        </div>

        <!-- Filtres -->
        <div class="flex flex-wrap gap-2 mb-10 md:mb-14">
          <NuxtLink to="/blog" class="blog-tab" :class="{ 'blog-tab--active': !theme }">Tout</NuxtLink>
          <NuxtLink :to="{ path: '/blog', query: { theme: 'coaching' } }" class="blog-tab" :class="{ 'blog-tab--active': theme === 'coaching' }">Coaching</NuxtLink>
          <NuxtLink :to="{ path: '/blog', query: { theme: 'dog' } }" class="blog-tab" :class="{ 'blog-tab--active': theme === 'dog' }">Dog sitting</NuxtLink>
        </div>

        <!-- Articles (masonry: images entières, hauteurs variables) -->
        <div v-if="filtered.length > 0" class="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="article in filtered"
            :key="article.id"
            :to="`/blog/${article.uid}`"
            class="group block break-inside-avoid mb-8 md:mb-10"
          >
            <!-- Image -->
            <div v-if="article.data.featured_image?.url" class="overflow-hidden rounded-xl bg-white/[0.06] mb-4">
              <img
                :src="article.data.featured_image.url"
                :alt="article.data.featured_image.alt || article.data.title"
                class="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div v-else class="aspect-video rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Content -->
            <p v-if="article.data.publication_date" class="text-xs font-body text-white/50 mb-2">
              {{ formatDate(article.data.publication_date) }}
            </p>
            <h2 class="text-lg md:text-xl font-display font-normal text-white mb-2 leading-snug group-hover:underline underline-offset-4 decoration-white/40">
              {{ article.data.title }}
            </h2>
            <p v-if="article.data.excerpt" class="text-sm font-body font-light text-white/65 leading-relaxed line-clamp-3">
              {{ article.data.excerpt }}
            </p>
            <span class="inline-flex items-center gap-1.5 mt-3 text-sm font-body text-white/50 group-hover:text-white transition-colors duration-300">
              Lire
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="py-20">
          <template v-if="theme">
            <h2 class="text-2xl font-display font-normal text-white mb-3">Pas encore d'article {{ themeLabel }}</h2>
            <p class="text-base font-body font-light text-white/70 mb-8">Les premiers arrivent bientôt.</p>
            <NuxtLink to="/blog" class="btn-light inline-block">Voir tous les articles</NuxtLink>
          </template>
          <template v-else>
            <h2 class="text-2xl font-display font-normal text-white mb-3">Aucun article pour le moment</h2>
            <p class="text-base font-body font-light text-white/70 mb-8">Les premiers articles arrivent bientôt !</p>
            <NuxtLink to="/" class="btn-light inline-block">Retour à l'accueil</NuxtLink>
          </template>
        </div>
      </div>
    </main>

    <AppFooter simple blue />
  </div>
</template>

<style scoped lang="postcss">
.blog-tab {
  @apply rounded-full border border-white/20 bg-white/[0.04] px-4 py-2
         text-sm font-body font-light text-white/70
         hover:bg-white/10 hover:text-white transition-colors duration-200;
}
.blog-tab--active {
  @apply bg-white text-bleu border-white font-normal hover:bg-white hover:text-bleu;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
