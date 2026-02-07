<script setup>
const route = useRoute();
const prismic = usePrismic();

const { data: article } = await useAsyncData(`blog-post-${route.params.uid}`, async () => {
  try {
    const response = await prismic.client.getByUID('blog_post', route.params.uid);
    return response;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw createError({ statusCode: 404, statusMessage: 'Article non trouvé' });
  }
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

// SEO Meta
if (article.value) {
  const articleUrl = `https://lilachibane.com/blog/${route.params.uid}`
  const articleImage = article.value.data.featured_image?.url || 'https://lilachibane.com/lila-portrait.png'

  useSeoMeta({
    title: `${article.value.data.title} — Lila Chibane`,
    description: article.value.data.excerpt || '',
    ogTitle: article.value.data.title,
    ogDescription: article.value.data.excerpt || '',
    ogImage: articleImage,
    ogUrl: articleUrl,
    ogType: 'article',
    twitterTitle: article.value.data.title,
    twitterDescription: article.value.data.excerpt || '',
    twitterImage: articleImage,
  })

  // JSON-LD BlogPosting
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.value.data.title,
          description: article.value.data.excerpt || '',
          image: articleImage,
          datePublished: article.value.data.publication_date || '',
          author: {
            '@type': 'Person',
            name: 'Lila Chibane',
            url: 'https://lilachibane.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Lila Chibane',
            logo: {
              '@type': 'ImageObject',
              url: 'https://lilachibane.com/lila-portrait.png',
            },
          },
          mainEntityOfPage: articleUrl,
        }),
      },
    ],
  })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50 font-display">
      <NuxtLink to="/" class="text-md md:text-2xl xl:text-3xl text-gray-900 hover:text-yellow-600 transition">
        Lila Chibane
      </NuxtLink>
      <nav class="hidden md:flex gap-6 md:gap-10 text-sm md:text-base tracking-widest items-center">
        <NuxtLink to="/#about" class="hover:text-yellow-600 transition">À propos</NuxtLink>
        <NuxtLink to="/#services" class="hover:text-yellow-600 transition">L'Accompagnement</NuxtLink>
        <NuxtLink to="/blog" class="text-yellow-600 font-semibold">Blog</NuxtLink>
        <NuxtLink to="/#contact" class="hover:text-yellow-600 transition">Contact</NuxtLink>
      </nav>
      <!-- Mobile menu button -->
      <NuxtLink to="/blog" class="md:hidden text-sm text-yellow-600 font-semibold">
        ← Blog
      </NuxtLink>
    </header>

    <!-- Article Content -->
    <article v-if="article" class="pt-24 pb-20">
      <!-- Back to blog -->
      <div class="max-w-4xl mx-auto px-6 mb-8">
        <NuxtLink to="/blog" class="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </NuxtLink>
      </div>

      <!-- Featured Image -->
      <div v-if="article.data.featured_image?.url" class="w-full max-w-5xl mx-auto px-6 mb-12">
        <div class="aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <img
            :src="article.data.featured_image.url"
            :alt="article.data.featured_image.alt || article.data.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Article Header -->
      <div class="max-w-4xl mx-auto px-6 mb-12">
        <!-- Date & Reading Time -->
        <div class="flex items-center gap-4 mb-6 text-sm text-gray-600">
          <span v-if="article.data.publication_date" class="flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.data.publication_date) }}
          </span>
          <span v-if="article.data.reading_time" class="flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ article.data.reading_time }} min de lecture
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display leading-tight">
          {{ article.data.title }}
        </h1>

        <!-- Excerpt -->
        <p v-if="article.data.excerpt" class="text-xl text-gray-600 leading-relaxed border-l-4 border-yellow-400 pl-6 italic">
          {{ article.data.excerpt }}
        </p>
      </div>

      <!-- Article Body -->
      <div class="max-w-4xl mx-auto px-6">
        <div class="prose prose-lg prose-yellow max-w-none overflow-hidden article-content break-words">
          <!-- Rich Text Content from Prismic -->
          <PrismicRichText
            v-if="article.data.content"
            :field="article.data.content"
          />
          <div v-else class="text-gray-600 italic">
            Le contenu de cet article sera bientôt disponible...
          </div>
        </div>
      </div>

      <!-- Share Section -->
      <div class="max-w-4xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p class="text-gray-700 font-semibold mb-2">Cet article t'a plu ?</p>
            <p class="text-gray-600">Partage-le avec tes amies !</p>
          </div>
          <div class="flex gap-4">
            <!-- Share buttons could be added here -->
            <NuxtLink to="/blog" class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition">
              Voir tous les articles
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Author Section -->
      <div class="max-w-4xl mx-auto px-6 mt-16">
        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 md:p-12">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <img src="/lila-portrait.png" alt="Lila Chibane" class="w-32 h-32 rounded-full shadow-lg" />
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2 font-display">Lila Chibane</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                Coach sport-santé, spécialisée dans la reconnexion corps/mental et la sortie de la sédentarité.
                J'aide les femmes à retrouver énergie, bien-être et confiance en elles, sans violence envers leur corps.
              </p>
              <NuxtLink to="/#contact" class="inline-block text-yellow-600 hover:text-yellow-700 font-semibold">
                Me contacter →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Footer -->
    <footer class="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center text-sm">
      <div class="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2">
        <span class="tracking-wide">© 2025 Lila Chibane — Tous droits réservés.</span>
        <NuxtLink to="/" class="text-yellow-400 hover:underline text-xs mt-1">Retour à l'accueil</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="postcss">
:deep(.article-content) {
  @apply text-gray-800 leading-relaxed;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

:deep(.article-content *) {
  max-width: 100%;
}

:deep(.article-content p) {
  @apply mb-6 text-lg leading-relaxed;
}

:deep(.article-content h2) {
  @apply text-3xl font-bold text-gray-900 mt-12 mb-6 font-display;
}

:deep(.article-content h3) {
  @apply text-2xl font-bold text-gray-900 mt-10 mb-4 font-display;
}

:deep(.article-content h4) {
  @apply text-xl font-bold text-gray-900 mt-8 mb-3 font-display;
}

:deep(.article-content ul),
:deep(.article-content ol) {
  @apply mb-6 ml-6 space-y-2;
}

:deep(.article-content ul) {
  @apply list-disc;
}

:deep(.article-content ol) {
  @apply list-decimal;
}

:deep(.article-content li) {
  @apply text-lg leading-relaxed;
}

:deep(.article-content a) {
  @apply text-yellow-600 hover:text-yellow-700 underline transition;
}

:deep(.article-content strong) {
  @apply font-bold text-gray-900;
}

:deep(.article-content em) {
  @apply italic;
}

:deep(.article-content blockquote) {
  @apply border-l-4 border-yellow-400 pl-6 py-2 my-6 italic text-gray-700 bg-yellow-50 rounded-r-lg;
}

:deep(.article-content img) {
  @apply rounded-2xl shadow-lg my-8 w-full max-w-full h-auto object-contain;
}

:deep(.article-content code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

:deep(.article-content pre) {
  @apply bg-gray-900 text-white p-6 rounded-2xl overflow-x-auto my-6;
}

:deep(.article-content pre code) {
  @apply bg-transparent px-0 py-0;
}
</style>
