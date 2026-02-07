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

// Format date helper
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
  <div class="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
    <!-- Header with back to home -->
    <header class="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50 font-tuffy">
      <NuxtLink to="/" class="text-md md:text-2xl xl:text-3xl text-gray-900 hover:text-yellow-600 transition">
        Lila Chibane
      </NuxtLink>
      <nav class="flex gap-6 md:gap-10 text-sm md:text-base tracking-widest items-center">
        <NuxtLink to="/#about" class="hover:text-yellow-600 transition">À propos</NuxtLink>
        <NuxtLink to="/#services" class="hover:text-yellow-600 transition">L'Accompagnement</NuxtLink>
        <NuxtLink to="/blog" class="text-yellow-600 font-semibold">Blog</NuxtLink>
        <NuxtLink to="/#contact" class="hover:text-yellow-600 transition">Contact</NuxtLink>
      </nav>
    </header>

    <!-- Blog Content -->
    <main class="pt-32 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-tuffy tracking-tighter">
            Blog
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur
          </p>
        </div>

        <!-- Articles Grid -->
        <div v-if="articles && articles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="`/blog/${article.uid}`"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <!-- Image -->
            <div v-if="article.data.featured_image?.url" class="aspect-video overflow-hidden bg-yellow-100">
              <img
                :src="article.data.featured_image.url"
                :alt="article.data.featured_image.alt || article.data.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div v-else class="aspect-video bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Content -->
            <div class="p-6">
              <!-- Date -->
              <p v-if="article.data.publication_date" class="text-sm text-yellow-600 font-semibold mb-2">
                {{ formatDate(article.data.publication_date) }}
              </p>

              <!-- Title -->
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition">
                {{ article.data.title }}
              </h2>

              <!-- Excerpt -->
              <p v-if="article.data.excerpt" class="text-gray-600 line-clamp-3">
                {{ article.data.excerpt }}
              </p>

              <!-- Read more -->
              <div class="mt-4 flex items-center text-yellow-600 font-semibold">
                <span>Lire l'article</span>
                <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="inline-block bg-yellow-100 rounded-full p-6 mb-6">
            <svg class="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Aucun article pour le moment</h2>
          <p class="text-gray-600 mb-8">Les premiers articles arrivent bientôt !</p>
          <NuxtLink to="/" class="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition">
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center text-sm">
      <div class="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2">
        <span class="tracking-wide">© 2025 Lila Chibane — Tous droits réservés.</span>
        <NuxtLink to="/" class="text-yellow-400 hover:underline text-xs mt-1">Retour à l'accueil</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
