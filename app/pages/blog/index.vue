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

useSeoMeta({
  title: 'Blog | Lila Chibane',
  description: 'Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur.',
  ogTitle: 'Blog | Lila Chibane',
  ogDescription: 'Conseils sport-santé, bien-être et confiance en soi.',
  ogUrl: 'https://lilachibane.com/blog',
  ogType: 'website',
  ogImage: 'https://lilachibane.com/IMG_2553.jpg',
  twitterTitle: 'Blog | Lila Chibane',
  twitterDescription: 'Conseils sport-santé, bien-être et confiance en soi.',
  twitterImage: 'https://lilachibane.com/IMG_2553.jpg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog | Lila Chibane',
        description: 'Conseils sport-santé, bien-être et confiance en soi par Lila Chibane.',
        url: 'https://lilachibane.com/blog',
        inLanguage: 'fr',
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
  <div class="min-h-screen bg-cream">
    <AppHeader active-page="blog" />

    <!-- Blog Content -->
    <main class="pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="mb-14 md:mb-20">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block">Blog</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-5 md:mb-6">
            Conseils et réflexions
          </h1>
          <p class="text-base sm:text-lg font-body font-light text-gray max-w-2xl leading-relaxed">
            Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur.
          </p>
        </div>

        <!-- Articles Grid -->
        <div v-if="articles && articles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="`/blog/${article.uid}`"
            class="group"
          >
            <!-- Image -->
            <div v-if="article.data.featured_image?.url" class="aspect-video overflow-hidden bg-sand mb-5">
              <img
                :src="article.data.featured_image.url"
                :alt="article.data.featured_image.alt || article.data.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div v-else class="aspect-video bg-sand flex items-center justify-center mb-5">
              <svg class="w-10 h-10 text-gray-light" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Content -->
            <p v-if="article.data.publication_date" class="text-xs font-body text-gray-light mb-2">
              {{ formatDate(article.data.publication_date) }}
            </p>
            <h2 class="text-lg md:text-xl font-display font-normal text-warm mb-2 group-hover:text-bleu transition-colors duration-300 leading-snug">
              {{ article.data.title }}
            </h2>
            <p v-if="article.data.excerpt" class="text-sm font-body font-light text-gray leading-relaxed line-clamp-3">
              {{ article.data.excerpt }}
            </p>
            <span class="inline-block mt-3 text-sm font-body text-gray-light group-hover:text-bleu transition-colors duration-300">
              Lire →
            </span>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="py-20">
          <h2 class="text-2xl font-display font-normal text-warm mb-3">Aucun article pour le moment</h2>
          <p class="text-base font-body font-light text-gray mb-8">Les premiers articles arrivent bientôt !</p>
          <NuxtLink to="/" class="inline-block bg-bleu hover:opacity-90 text-white text-sm font-body font-normal tracking-wide py-4 px-10 transition-all duration-300">
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter simple />
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
