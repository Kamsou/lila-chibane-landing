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
const articleImage = computed(() => article.value?.data.featured_image?.url || 'https://lilachibane.com/test-2.jpeg')

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
        inLanguage: 'fr',
        articleSection: 'Sport-santé & bien-être',
        datePublished: article.value.data.publication_date || '',
        dateModified: article.value.last_publication_date || article.value.data.publication_date || '',
        author: {
          '@type': 'Person',
          '@id': 'https://lilachibane.com/#lila',
          name: 'Lila Chibane',
          url: 'https://lilachibane.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Lila Chibane',
          url: 'https://lilachibane.com',
          logo: { '@type': 'ImageObject', url: 'https://lilachibane.com/apple-touch-icon.png' },
        },
        isPartOf: { '@type': 'Blog', name: 'Blog Lila Chibane', url: 'https://lilachibane.com/blog' },
        mainEntityOfPage: articleUrl.value,
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
          { '@type': 'ListItem', position: 3, name: article.value.data.title, item: articleUrl.value },
        ],
      }),
    },
  ] : [],
})
</script>

<template>
  <div class="min-h-screen text-encre">
    <!-- Header -->
    <ActivityHeader />

    <!-- Article Content -->
    <article v-if="article" class="pt-28 md:pt-36 pb-20 md:pb-32">
      <!-- Back to blog -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mb-8 md:mb-10">
        <NuxtLink to="/blog" class="group inline-flex items-center gap-1.5 font-titre text-sm text-ardoise hover:text-encre transition-colors duration-300">
          <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Retour aux articles
        </NuxtLink>
      </div>

      <!-- Featured Image -->
      <div v-if="article.data.featured_image?.url" class="w-full max-w-3xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <img
          :src="article.data.featured_image.url"
          :alt="article.data.featured_image.alt || article.data.title"
          class="block max-h-[26rem] md:max-h-[36rem] max-w-full w-auto"
        />
      </div>

      <!-- Article Header -->
      <div class="max-w-3xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div class="flex items-center gap-4 mb-5 md:mb-6">
          <span v-if="article.data.publication_date" class="text-sm font-titre font-semibold text-corail">
            {{ formatDate(article.data.publication_date) }}
          </span>
          <span v-if="article.data.reading_time" class="text-sm font-titre text-ardoise">
            {{ article.data.reading_time }} min de lecture
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-titre font-bold text-encre mb-6 md:mb-8 leading-[1.1]">
          {{ article.data.title }}
        </h1>

        <p v-if="article.data.excerpt" class="font-plume italic text-2xl md:text-[1.9rem] text-encre/80 leading-snug">
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
          <div v-else class="text-ardoise font-titre italic">
            Le contenu de cet article sera bientôt disponible...
          </div>
        </div>
      </div>

      <section class="max-w-3xl mx-auto px-6 md:px-10 mt-20 md:mt-28">
        <div class="flex items-center gap-5 mb-6">
          <img src="/lila-rire.jpg" alt="Lila Chibane" class="teinte w-20 h-20 rounded-full object-cover ring-4 ring-white/70 shrink-0" loading="lazy" />
          <div>
            <p class="font-titre font-bold text-encre text-xl">Lila Chibane</p>
            <p class="font-titre text-ardoise">Coach sportive, autrice de Corps de rêves.</p>
          </div>
        </div>
        <p class="font-plume italic text-3xl md:text-[2.4rem] leading-[1.08] text-encre mb-8">Cet article t'a parlé ? <span class="text-corail">On peut aller plus loin ensemble.</span></p>
        <div class="flex flex-wrap items-center gap-x-7 gap-y-4">
          <NuxtLink to="/#accompagnements" class="btn-azur">Voir les accompagnements</NuxtLink>
          <a href="https://corpsdereves.substack.com/" target="_blank" rel="noopener" class="text-link">Recevoir la newsletter</a>
          <NuxtLink to="/blog" class="text-link">Tous les articles</NuxtLink>
        </div>
      </section>
    </article>

    <AppFooter simple blue />
  </div>
</template>

<style scoped lang="postcss">
:deep(.article-content) {
  @apply text-ardoise leading-relaxed font-titre;
}

:deep(.article-content p) {
  @apply mb-6 text-base md:text-lg leading-relaxed;
}

:deep(.article-content h2) {
  @apply text-2xl md:text-3xl font-bold text-encre mt-12 mb-6 font-titre;
}

:deep(.article-content h3) {
  @apply text-xl md:text-2xl font-bold text-encre mt-10 mb-4 font-titre;
}

:deep(.article-content h4) {
  @apply text-lg md:text-xl font-bold text-encre mt-8 mb-3 font-titre;
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
  @apply text-base md:text-lg leading-relaxed;
}

:deep(.article-content a) {
  @apply text-azur hover:text-encre underline underline-offset-4 transition-colors duration-300;
}

:deep(.article-content strong) {
  @apply font-bold text-encre;
}

:deep(.article-content em) {
  @apply italic;
}

:deep(.article-content blockquote) {
  @apply py-2 my-8 italic text-encre font-plume text-2xl md:text-[1.75rem] leading-snug;
}

:deep(.article-content img) {
  @apply my-8 w-full h-auto object-contain;
}

:deep(.article-content code) {
  @apply bg-white text-encre px-2 py-1 rounded text-sm font-mono;
}

:deep(.article-content pre) {
  @apply bg-encre text-white p-6 rounded-xl overflow-x-auto my-6;
}

:deep(.article-content pre code) {
  @apply bg-transparent px-0 py-0;
}
</style>
