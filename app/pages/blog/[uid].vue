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

const articleUrl = computed(() => `https://lilachibane.com/blog/${route.params.uid}`)
const articleImage = computed(() => article.value?.data.featured_image?.url || 'https://lilachibane.com/IMG_2553.jpg')

useSeoMeta({
  title: () => article.value ? `${article.value.data.title} | Lila Chibane` : 'Blog | Lila Chibane',
  description: () => article.value?.data.excerpt || '',
  ogTitle: () => article.value?.data.title || 'Blog | Lila Chibane',
  ogDescription: () => article.value?.data.excerpt || '',
  ogImage: () => articleImage.value,
  ogUrl: () => articleUrl.value,
  ogType: 'article',
  twitterTitle: () => article.value?.data.title || 'Blog | Lila Chibane',
  twitterDescription: () => article.value?.data.excerpt || '',
  twitterImage: () => articleImage.value,
})

useHead({
  script: article.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.value.data.title,
        description: article.value.data.excerpt || '',
        image: articleImage.value,
        datePublished: article.value.data.publication_date || '',
        dateModified: article.value.last_publication_date || article.value.data.publication_date || '',
        author: {
          '@type': 'Person',
          name: 'Lila Chibane',
          url: 'https://lilachibane.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Lila Chibane',
        },
        mainEntityOfPage: articleUrl.value,
      }),
    },
  ] : [],
})
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-gray-faint">
      <div class="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <NuxtLink to="/" class="font-display text-lg md:text-xl font-normal tracking-tight text-warm">
          Lila Chibane
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-10">
          <NuxtLink to="/#coaching" class="font-body text-sm font-normal tracking-wide text-gray hover:text-warm transition-colors duration-300">Coaching</NuxtLink>
          <NuxtLink to="/#peinture" class="font-body text-sm font-normal tracking-wide text-gray hover:text-warm transition-colors duration-300">Peinture</NuxtLink>
          <NuxtLink to="/#creation-sonore" class="font-body text-sm font-normal tracking-wide text-gray hover:text-warm transition-colors duration-300">Son</NuxtLink>
          <NuxtLink to="/blog" class="font-body text-sm font-normal tracking-wide text-warm">Blog</NuxtLink>
          <NuxtLink to="/#contact" class="font-body text-sm font-normal tracking-wide text-gray hover:text-warm transition-colors duration-300">Contact</NuxtLink>
        </nav>
        <NuxtLink to="/blog" class="md:hidden font-body text-sm text-gray hover:text-warm transition-colors duration-300">
          ← Blog
        </NuxtLink>
      </div>
    </header>

    <!-- Article Content -->
    <article v-if="article" class="pt-28 md:pt-36 pb-20 md:pb-32">
      <!-- Back to blog -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mb-8 md:mb-10">
        <NuxtLink to="/blog" class="inline-flex items-center font-body text-sm text-gray hover:text-warm transition-colors duration-300">
          ← Retour aux articles
        </NuxtLink>
      </div>

      <!-- Featured Image -->
      <div v-if="article.data.featured_image?.url" class="w-full max-w-5xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div class="aspect-video overflow-hidden">
          <img
            :src="article.data.featured_image.url"
            :alt="article.data.featured_image.alt || article.data.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Article Header -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div class="flex items-center gap-4 mb-5 md:mb-6">
          <span v-if="article.data.publication_date" class="text-xs font-body text-gray-light">
            {{ formatDate(article.data.publication_date) }}
          </span>
          <span v-if="article.data.reading_time" class="text-xs font-body text-gray-light">
            {{ article.data.reading_time }} min de lecture
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-warm mb-6 md:mb-8 leading-[1.1]">
          {{ article.data.title }}
        </h1>

        <p v-if="article.data.excerpt" class="text-lg md:text-xl font-body font-light italic text-gray leading-relaxed">
          {{ article.data.excerpt }}
        </p>
      </div>

      <!-- Article Body -->
      <div class="max-w-3xl mx-auto px-6 md:px-10">
        <div class="article-content">
          <PrismicRichText
            v-if="article.data.content"
            :field="article.data.content"
          />
          <div v-else class="text-gray font-body font-light italic">
            Le contenu de cet article sera bientôt disponible...
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mt-16 md:mt-20 pt-8 border-t border-gray-faint">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-center sm:text-left">
            <p class="font-body font-normal text-warm mb-1">Cet article t'a plu ?</p>
            <p class="text-sm font-body font-light text-gray">Partage-le avec tes amies !</p>
          </div>
          <NuxtLink to="/blog" class="bg-warm hover:opacity-90 text-white text-sm font-body font-normal tracking-wide py-3.5 px-8 transition-all duration-300">
            Voir tous les articles
          </NuxtLink>
        </div>
      </div>

      <!-- Author Section -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mt-14 md:mt-20">
        <div class="bg-sand p-8 md:p-10">
          <div class="text-center sm:text-left">
            <h3 class="text-xl md:text-2xl font-display font-normal text-warm mb-2">Lila Chibane</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed mb-4">
              Coach sportive, peintre et créatrice sonore. Trois pratiques, un même fil : prendre soin du corps, des sens et de ce qui nous relie au monde.
            </p>
            <NuxtLink to="/#contact" class="inline-block font-body text-sm text-gray-light hover:text-warm transition-colors duration-300">
              Me contacter →
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>

    <!-- Footer -->
    <footer class="bg-warm py-14 md:py-16 px-6 md:px-10">
      <div class="max-w-5xl mx-auto flex flex-col items-center gap-3">
        <p class="font-display text-lg text-white font-normal">Lila Chibane</p>
        <p class="text-xs font-body text-white/30">&copy; {{ new Date().getFullYear() }} Lila Chibane</p>
        <NuxtLink to="/" class="text-xs font-body text-white/40 hover:text-white transition-colors duration-300 mt-1">
          Retour à l'accueil
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="postcss">
:deep(.article-content) {
  @apply text-warm leading-relaxed font-body;
}

:deep(.article-content p) {
  @apply mb-6 text-base md:text-lg leading-relaxed font-light;
}

:deep(.article-content h2) {
  @apply text-2xl md:text-3xl font-normal text-warm mt-12 mb-6 font-display;
}

:deep(.article-content h3) {
  @apply text-xl md:text-2xl font-normal text-warm mt-10 mb-4 font-display;
}

:deep(.article-content h4) {
  @apply text-lg md:text-xl font-medium text-warm mt-8 mb-3 font-display;
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
  @apply text-bronze hover:text-warm underline underline-offset-4 transition-colors duration-300;
}

:deep(.article-content strong) {
  @apply font-medium text-warm;
}

:deep(.article-content em) {
  @apply italic;
}

:deep(.article-content blockquote) {
  @apply pl-6 py-2 my-8 italic text-gray font-display text-lg md:text-xl;
}

:deep(.article-content img) {
  @apply my-8 w-full h-auto object-contain;
}

:deep(.article-content code) {
  @apply bg-sand px-2 py-1 text-sm font-mono;
}

:deep(.article-content pre) {
  @apply bg-warm text-white p-6 overflow-x-auto my-6;
}

:deep(.article-content pre code) {
  @apply bg-transparent px-0 py-0;
}
</style>
