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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

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
        <NuxtLink to="/blog" class="md:hidden font-body text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Blog
        </NuxtLink>
      </div>
    </header>

    <!-- Article Content -->
    <article v-if="article" class="pt-28 md:pt-36 pb-20 md:pb-32">
      <!-- Back to blog -->
      <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 mb-8 md:mb-10">
        <NuxtLink to="/blog" class="inline-flex items-center font-body text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </NuxtLink>
      </div>

      <!-- Featured Image -->
      <div v-if="article.data.featured_image?.url" class="w-full max-w-5xl mx-auto px-5 sm:px-6 md:px-8 mb-10 md:mb-14">
        <div class="aspect-video rounded-2xl overflow-hidden">
          <img
            :src="article.data.featured_image.url"
            :alt="article.data.featured_image.alt || article.data.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Article Header -->
      <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 mb-10 md:mb-14">
        <!-- Date & Reading Time -->
        <div class="flex items-center gap-4 mb-5 md:mb-6">
          <span v-if="article.data.publication_date" class="flex items-center gap-2 text-xs font-body font-medium text-sage-dark tracking-wide">
            <svg class="w-4 h-4 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.data.publication_date) }}
          </span>
          <span v-if="article.data.reading_time" class="flex items-center gap-2 text-xs font-body font-medium text-sage-dark tracking-wide">
            <svg class="w-4 h-4 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ article.data.reading_time }} min de lecture
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-stone-900 mb-6 md:mb-8 leading-[1.15]">
          {{ article.data.title }}
        </h1>

        <!-- Excerpt -->
        <p v-if="article.data.excerpt" class="text-lg md:text-xl font-display font-light italic text-stone-600 leading-relaxed border-l-2 border-sage/40 pl-6">
          {{ article.data.excerpt }}
        </p>
      </div>

      <!-- Article Body -->
      <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <div class="prose prose-lg max-w-none overflow-hidden article-content break-words">
          <PrismicRichText
            v-if="article.data.content"
            :field="article.data.content"
          />
          <div v-else class="text-stone-500 font-body font-light italic">
            Le contenu de cet article sera bientot disponible...
          </div>
        </div>
      </div>

      <!-- Share Section -->
      <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 mt-16 md:mt-20 pt-8 border-t border-stone-400/20">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-center sm:text-left">
            <p class="font-body font-medium text-stone-900 mb-1">Cet article t'a plu ?</p>
            <p class="text-sm font-body font-light text-stone-600">Partage-le avec tes amies !</p>
          </div>
          <NuxtLink to="/blog" class="bg-stone-900 hover:bg-stone-800 text-white text-sm font-body font-medium tracking-wide py-3 px-6 rounded-full transition-all duration-300">
            Voir tous les articles
          </NuxtLink>
        </div>
      </div>

      <!-- Author Section -->
      <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 mt-14 md:mt-20">
        <div class="bg-sand rounded-2xl p-8 md:p-10">
          <div class="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
            <img src="/lila-portrait.png" alt="Lila Chibane" class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover object-top flex-shrink-0" loading="lazy" />
            <div class="text-center sm:text-left">
              <h3 class="text-xl md:text-2xl font-display font-light text-stone-900 mb-2">Lila Chibane</h3>
              <p class="text-sm font-body font-light text-stone-600 leading-relaxed mb-4">
                Coach sport-sante, specialisee dans la reconnexion corps/mental et la sortie de la sedentarite.
                J'aide les femmes a retrouver energie, bien-etre et confiance en elles, sans violence envers leur corps.
              </p>
              <NuxtLink to="/#contact" class="inline-block font-body text-sm font-medium text-stone-900 hover:text-sage-dark transition-colors duration-200">
                Me contacter →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </article>

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

<style scoped lang="postcss">
:deep(.article-content) {
  @apply text-stone-800 leading-relaxed font-body;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

:deep(.article-content *) {
  max-width: 100%;
}

:deep(.article-content p) {
  @apply mb-6 text-base md:text-lg leading-relaxed font-light;
}

:deep(.article-content h2) {
  @apply text-2xl md:text-3xl font-light text-stone-900 mt-12 mb-6 font-display;
}

:deep(.article-content h3) {
  @apply text-xl md:text-2xl font-light text-stone-900 mt-10 mb-4 font-display;
}

:deep(.article-content h4) {
  @apply text-lg md:text-xl font-semibold text-stone-900 mt-8 mb-3 font-display;
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
  @apply text-base md:text-lg leading-relaxed font-light;
}

:deep(.article-content a) {
  @apply text-sage-dark hover:text-stone-900 underline underline-offset-4 transition-colors duration-200;
}

:deep(.article-content strong) {
  @apply font-semibold text-stone-900;
}

:deep(.article-content em) {
  @apply italic;
}

:deep(.article-content blockquote) {
  @apply border-l-2 border-sage/40 pl-6 py-2 my-6 italic text-stone-600 font-display text-lg;
}

:deep(.article-content img) {
  @apply rounded-2xl my-8 w-full max-w-full h-auto object-contain;
}

:deep(.article-content code) {
  @apply bg-sand px-2 py-1 rounded text-sm font-mono;
}

:deep(.article-content pre) {
  @apply bg-stone-900 text-white p-6 rounded-2xl overflow-x-auto my-6;
}

:deep(.article-content pre code) {
  @apply bg-transparent px-0 py-0;
}
</style>
