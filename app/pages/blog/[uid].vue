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

const navLinks = [
  { label: 'Coaching', to: '/' },
  { label: 'Blog', to: '/blog' },
]

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
  <div class="min-h-screen bg-paper text-ink">
    <HomeNav :links="navLinks" />

    <article v-if="article" class="pt-32 md:pt-40 pb-24 md:pb-32">
      <header class="max-w-3xl mx-auto px-5 md:px-10 mb-10 md:mb-14">
        <NuxtLink to="/blog" class="group inline-flex items-center gap-2 text-sm font-body text-ink/60 hover:text-ink transition-colors duration-300 mb-8 md:mb-10">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Tous les articles
        </NuxtLink>

        <p class="text-[13px] font-body text-ink/50 mb-5">
          {{ formatDate(article.data.publication_date) }}<template v-if="article.data.reading_time"> · {{ article.data.reading_time }} min de lecture</template>
        </p>

        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-tight mb-6 md:mb-8">
          {{ article.data.title }}
        </h1>

        <p v-if="article.data.excerpt" class="text-lg md:text-xl font-body font-light text-ink/70 leading-relaxed">
          {{ article.data.excerpt }}
        </p>
      </header>

      <!-- Image à la une : nette, alignée sur la colonne de texte, jamais recadrée -->
      <div v-if="article.data.featured_image?.url" class="max-w-3xl mx-auto px-5 md:px-10 mb-12 md:mb-16">
        <img
          :src="article.data.featured_image.url"
          :alt="article.data.featured_image.alt || article.data.title"
          class="block max-h-[26rem] md:max-h-[36rem] max-w-full w-auto"
        />
      </div>

      <div class="max-w-3xl mx-auto px-5 md:px-10">
        <div class="article-content">
          <PrismicRichText v-if="article.data.content" :field="article.data.content" />
          <p v-else class="text-ink/60 font-body font-light">Le contenu de cet article sera bientôt disponible.</p>
        </div>
      </div>

      <!-- Autrice + suite -->
      <div class="max-w-3xl mx-auto px-5 md:px-10 mt-16 md:mt-20">
        <div class="author">
          <img src="/coaching-sportif.jpeg" alt="Lila Chibane" class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-[50%_25%] shrink-0" loading="lazy" />
          <div>
            <p class="font-display text-2xl font-medium tracking-tight mb-2">Lila Chibane</p>
            <p class="text-[15px] font-body font-light text-paper/80 leading-relaxed mb-6">
              Coach sportive sport-santé pour femmes, en visio partout en France et en présentiel dans le Médoc. Reprendre une activité physique en douceur, à ton rythme, sans pression.
            </p>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
              <NuxtLink to="/feuille-de-route" class="btn-big group">
                Remplir la feuille de route
                <span class="btn-big-arrow">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </NuxtLink>
              <NuxtLink to="/" class="text-sm font-body text-paper/75 hover:text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper transition-colors">
                Découvrir le coaching
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 text-sm font-body text-ink/60">
          <p>Cet article t'a plu ? Partage-le avec tes amies.</p>
          <NuxtLink to="/blog" class="group inline-flex items-center gap-2 text-ink hover:text-bleu transition-colors">
            Voir tous les articles
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>
        </div>
      </div>
    </article>

    <HomeFooter />
  </div>
</template>

<style scoped lang="postcss">
.author {
  @apply flex flex-col sm:flex-row gap-6 sm:gap-8 rounded-[2rem] bg-bleu text-paper p-7 md:p-10;
}

:deep(.article-content) {
  @apply text-ink/85 leading-relaxed font-body;
}
:deep(.article-content p) {
  @apply mb-6 text-base md:text-[1.075rem] leading-[1.75] font-light;
}
:deep(.article-content h2) {
  @apply font-display text-2xl md:text-3xl font-medium tracking-tight text-ink mt-14 mb-5;
}
:deep(.article-content h3) {
  @apply font-display text-xl md:text-2xl font-medium tracking-tight text-ink mt-10 mb-4;
}
:deep(.article-content h4) {
  @apply font-display text-lg md:text-xl font-medium text-ink mt-8 mb-3;
}
:deep(.article-content ul),
:deep(.article-content ol) {
  @apply mb-6 ml-6 space-y-2;
}
:deep(.article-content ul) { @apply list-disc; }
:deep(.article-content ol) { @apply list-decimal; }
:deep(.article-content li) {
  @apply text-base md:text-[1.075rem] leading-[1.75] font-light marker:text-terra;
}
:deep(.article-content a) {
  @apply text-bleu underline underline-offset-4 decoration-bleu/30 hover:decoration-bleu transition-colors duration-300;
}
:deep(.article-content strong) {
  @apply font-medium text-ink;
}
:deep(.article-content em) {
  @apply italic;
}
:deep(.article-content blockquote) {
  @apply my-10 rounded-[1.5rem] bg-bleu/[0.06] px-7 py-6 font-display text-xl md:text-2xl font-medium tracking-tight text-bleu leading-snug;
}
:deep(.article-content img) {
  @apply my-8 w-full h-auto object-contain;
}
:deep(.article-content code) {
  @apply bg-ink/[0.06] text-ink px-2 py-1 rounded text-sm font-mono;
}
:deep(.article-content pre) {
  @apply bg-ink text-paper p-6 rounded-xl overflow-x-auto my-6;
}
:deep(.article-content pre code) {
  @apply bg-transparent text-paper px-0 py-0;
}
</style>
