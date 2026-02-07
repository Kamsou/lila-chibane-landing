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
  title: 'Blog — Lila Chibane · Coach sport-santé',
  description: 'Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur.',
  ogTitle: 'Blog — Lila Chibane',
  ogDescription: 'Conseils sport-santé, bien-être et confiance en soi.',
  ogUrl: 'https://lilachibane.com/blog',
  ogType: 'website',
  ogImage: 'https://lilachibane.com/lila-portrait.png',
  twitterTitle: 'Blog — Lila Chibane',
  twitterDescription: 'Conseils sport-santé, bien-être et confiance en soi.',
  twitterImage: 'https://lilachibane.com/lila-portrait.png',
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
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-400/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
        <NuxtLink to="/" class="font-display text-lg md:text-xl font-light tracking-tight text-stone-900">
          Lila Chibane
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8 lg:gap-10">
          <NuxtLink to="/#a-propos" class="font-body text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-200">A propos</NuxtLink>
          <NuxtLink to="/#methode" class="font-body text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-200">Methode</NuxtLink>
          <NuxtLink to="/blog" class="font-body text-sm font-medium tracking-wide text-stone-900">Blog</NuxtLink>
          <NuxtLink to="/#contact" class="font-body text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-200">Contact</NuxtLink>
        </nav>
        <NuxtLink to="/" class="md:hidden font-body text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200">
          Accueil
        </NuxtLink>
      </div>
    </header>

    <!-- Blog Content -->
    <main class="pt-32 md:pt-40 pb-20 md:pb-32 px-5 sm:px-6 md:px-8">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-14 md:mb-20">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6">Blog</p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-stone-900 leading-[1.15] mb-5 md:mb-6">
            Conseils et reflexions
          </h1>
          <p class="text-base sm:text-lg font-body font-light text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Retrouve mes conseils, reflexions et astuces pour retrouver energie, forme et confiance en douceur
          </p>
        </div>

        <!-- Articles Grid -->
        <div v-if="articles && articles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="`/blog/${article.uid}`"
            class="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 border border-stone-400/10 hover:shadow-lg"
          >
            <!-- Image -->
            <div v-if="article.data.featured_image?.url" class="aspect-video overflow-hidden bg-sand">
              <img
                :src="article.data.featured_image.url"
                :alt="article.data.featured_image.alt || article.data.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div v-else class="aspect-video bg-sand flex items-center justify-center">
              <svg class="w-12 h-12 text-sage/40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Content -->
            <div class="p-5 md:p-6">
              <p v-if="article.data.publication_date" class="text-xs font-body font-medium text-sage-dark tracking-wide mb-3">
                {{ formatDate(article.data.publication_date) }}
              </p>
              <h2 class="text-lg md:text-xl font-display font-semibold text-stone-900 mb-3 group-hover:text-sage-dark transition-colors duration-200 leading-snug">
                {{ article.data.title }}
              </h2>
              <p v-if="article.data.excerpt" class="text-sm font-body font-light text-stone-600 leading-relaxed line-clamp-3">
                {{ article.data.excerpt }}
              </p>
              <div class="mt-4 flex items-center text-sm font-body font-medium text-stone-900">
                <span>Lire l'article</span>
                <svg class="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="inline-block bg-sand rounded-full p-6 mb-6">
            <svg class="w-12 h-12 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 class="text-2xl font-display font-light text-stone-900 mb-3">Aucun article pour le moment</h2>
          <p class="text-base font-body font-light text-stone-600 mb-8">Les premiers articles arrivent bientot !</p>
          <NuxtLink to="/" class="inline-block bg-stone-900 hover:bg-stone-800 text-white text-sm font-body font-medium tracking-wide py-3.5 px-8 rounded-full transition-all duration-300">
            Retour a l'accueil
          </NuxtLink>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-stone-900 py-10 md:py-12 px-5 sm:px-6 md:px-8">
      <div class="max-w-6xl mx-auto flex flex-col items-center gap-3">
        <p class="font-display text-lg text-white font-light">Lila Chibane</p>
        <p class="text-xs font-body text-white/30">&copy; {{ new Date().getFullYear() }} Lila Chibane · Tous droits reserves.</p>
        <NuxtLink to="/" class="text-xs font-body text-white/50 hover:text-white transition-colors duration-200 mt-1">
          Retour a l'accueil
        </NuxtLink>
      </div>
    </footer>
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
