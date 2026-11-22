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

// Blog recentré coaching : on masque les articles catégorisés "dog"
// (ils restent dans Prismic pour le futur site dog sitting dédié).
const filtered = computed(() => (articles.value || []).filter((a) => (a.data.category || 'les deux') !== 'dog'))

useSeoMeta({
  title: 'Blog sport-santé & bien-être · Lila Chibane',
  description: 'Conseils de coach sportive pour reprendre une activité physique en douceur : forme, énergie, régulation du stress et bien-être au féminin. Par Lila Chibane, dans le Médoc.',
  ogTitle: 'Blog sport-santé & bien-être · Lila Chibane',
  ogDescription: 'Conseils sport-santé, forme et confiance en soi, en douceur.',
  ogUrl: 'https://lilachibane.com/blog',
  ogType: 'website',
  ogImage: 'https://lilachibane.com/og-lila.jpg',
  twitterTitle: 'Blog sport-santé & bien-être · Lila Chibane',
  twitterDescription: 'Conseils sport-santé, forme et confiance en soi, en douceur.',
  twitterImage: 'https://lilachibane.com/og-lila.jpg',
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
  <div class="min-h-screen text-encre">
    <ActivityHeader />

    <!-- Blog Content -->
    <main class="pt-24 md:pt-32 pb-20 md:pb-32">
      <div class="max-w-5xl mx-auto px-6 md:px-10">
        <h1 class="font-plume italic text-5xl md:text-[5.5rem] leading-[0.98] mb-4">Conseils et réflexions</h1>
        <p class="text-base sm:text-lg font-titre text-ardoise max-w-xl leading-relaxed mb-12 md:mb-16">
          Le corps des femmes, le sport, la santé. Sans régime, sans pression.
        </p>

        <template v-if="filtered.length > 0">
          <NuxtLink :to="`/blog/${filtered[0].uid}`" class="group grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-x-12 gap-y-6 items-end mb-16 md:mb-24">
            <div class="overflow-hidden">
              <img
                v-if="filtered[0].data.featured_image?.url"
                :src="filtered[0].data.featured_image.url"
                :alt="filtered[0].data.featured_image.alt || filtered[0].data.title"
                class="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div v-else class="w-full aspect-[4/3] bg-white/60"></div>
            </div>
            <div>
              <p v-if="filtered[0].data.publication_date" class="text-sm font-titre text-corail font-semibold mb-3">{{ formatDate(filtered[0].data.publication_date) }}</p>
              <h2 class="font-titre font-bold text-encre text-3xl md:text-[2.4rem] leading-[1.08] tracking-tight mb-4 group-hover:text-azur transition-colors duration-300">{{ filtered[0].data.title }}</h2>
              <p v-if="filtered[0].data.excerpt" class="text-base font-titre text-ardoise leading-relaxed mb-6 line-clamp-4">{{ filtered[0].data.excerpt }}</p>
              <span class="btn-azur">Lire l'article</span>
            </div>
          </NuxtLink>

          <ul v-if="filtered.length > 1" class="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <li v-for="article in filtered.slice(1)" :key="article.id">
              <NuxtLink :to="`/blog/${article.uid}`" class="group grid grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[10rem_minmax(0,1fr)] gap-5 items-start">
                <div class="overflow-hidden aspect-[4/5]">
                  <img
                    v-if="article.data.featured_image?.url"
                    :src="article.data.featured_image.url"
                    :alt="article.data.featured_image.alt || article.data.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full bg-white/60 flex items-center justify-center">
                    <img src="/tortue.svg" alt="" class="w-2/3 opacity-80" />
                  </div>
                </div>
                <div>
                  <p v-if="article.data.publication_date" class="text-sm font-titre text-corail font-semibold mb-2">{{ formatDate(article.data.publication_date) }}</p>
                  <h2 class="font-plume italic text-encre text-2xl md:text-[1.75rem] leading-[1.1] mb-2 group-hover:text-azur transition-colors duration-300">{{ article.data.title }}</h2>
                  <p v-if="article.data.excerpt" class="text-sm font-titre text-ardoise leading-relaxed line-clamp-3">{{ article.data.excerpt }}</p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </template>

        <div v-else class="py-20">
          <h2 class="text-2xl font-titre font-bold text-encre mb-3">Aucun article pour le moment</h2>
          <p class="text-base font-titre text-ardoise mb-8">Les premiers articles arrivent bientôt !</p>
          <NuxtLink to="/" class="btn-azur">Retour à l'accueil</NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter simple blue />
  </div>
</template>

<style scoped lang="postcss">
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
