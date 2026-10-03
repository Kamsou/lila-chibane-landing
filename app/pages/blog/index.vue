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

const covers = ['bg-terra', 'bg-mat', 'bg-bleu']
const featured = computed(() => filtered.value[0])
const rest = computed(() => filtered.value.slice(1))

const { content } = await useSiteContent()
const navLinks = [
  { label: 'Coaching', to: '/' },
  { label: 'Blog', to: '/blog' },
]

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
  <div class="min-h-screen bg-paper text-ink">
    <HomeNav :links="navLinks" />

    <main class="max-w-6xl mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
      <header class="grid md:grid-cols-[1fr_auto] gap-6 md:gap-16 items-end mb-12 md:mb-16">
        <h1 v-reveal class="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tight">
          Conseils et réflexions
        </h1>
        <p v-reveal="{ delay: 120 }" class="max-w-sm text-base font-body font-light text-ink/65 leading-relaxed">
          Retrouve mes conseils, réflexions et astuces pour retrouver énergie, forme et confiance en douceur.
        </p>
      </header>

      <template v-if="featured">
        <!-- À la une : le dernier article -->
        <NuxtLink v-reveal :to="`/blog/${featured.uid}`" class="group featured">
          <div class="relative overflow-hidden min-h-[16rem] md:min-h-[26rem]">
            <img
              v-if="featured.data.featured_image?.url"
              :src="featured.data.featured_image.url"
              :alt="featured.data.featured_image.alt || featured.data.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="eager"
            />
            <div v-else class="absolute inset-0 bg-terra"></div>
          </div>
          <div class="p-7 md:p-10 lg:p-12 flex flex-col">
            <p class="text-[13px] font-body text-paper/60 mb-4">
              À la une · {{ formatDate(featured.data.publication_date) }}<template v-if="featured.data.reading_time"> · {{ featured.data.reading_time }} min</template>
            </p>
            <h2 class="font-display text-3xl lg:text-4xl font-medium leading-[1.05] tracking-tight mb-5">{{ featured.data.title }}</h2>
            <p v-if="featured.data.excerpt" class="text-base font-body font-light text-paper/80 leading-relaxed">{{ featured.data.excerpt }}</p>
            <span class="read-link mt-8 md:mt-auto pt-0 md:pt-8">
              Lire l'article
              <span class="read-link-arrow">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </span>
          </div>
        </NuxtLink>

        <!-- Les autres articles -->
        <div v-if="rest.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-14 md:mt-16">
          <NuxtLink
            v-for="(article, i) in rest"
            :key="article.id"
            v-reveal="{ delay: (i % 3) * 100 }"
            :to="`/blog/${article.uid}`"
            class="group block"
          >
            <div class="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5" :class="covers[i % covers.length]">
              <img
                v-if="article.data.featured_image?.url"
                :src="article.data.featured_image.url"
                :alt="article.data.featured_image.alt || article.data.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <!-- Sans image : la grande initiale du titre, aux couleurs du site -->
              <span v-else class="absolute -right-4 -bottom-16 font-display font-medium leading-none text-paper/90 select-none transition-transform duration-700 group-hover:-translate-y-2" style="font-size: 16rem" aria-hidden="true">
                {{ article.data.title.charAt(0) }}
              </span>
            </div>
            <p class="text-[13px] font-body text-ink/50 mb-2">
              {{ formatDate(article.data.publication_date) }}<template v-if="article.data.reading_time"> · {{ article.data.reading_time }} min</template>
            </p>
            <h2 class="font-display text-xl lg:text-2xl font-medium leading-[1.12] tracking-tight mb-3 group-hover:text-bleu transition-colors duration-300">
              {{ article.data.title }}
            </h2>
            <p v-if="article.data.excerpt" class="text-[15px] font-body font-light text-ink/65 leading-relaxed line-clamp-3">{{ article.data.excerpt }}</p>
          </NuxtLink>
        </div>
      </template>

      <div v-else class="py-16">
        <h2 class="font-display text-3xl font-medium mb-3">Aucun article pour le moment</h2>
        <p class="text-base font-body font-light text-ink/65 mb-8">Les premiers articles arrivent bientôt.</p>
        <NuxtLink to="/" class="btn-big pr-7">Retour à l'accueil</NuxtLink>
      </div>
    </main>

    <!-- Appel final -->
    <section class="bg-bleu text-paper">
      <div class="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center">
        <div>
          <h2 v-reveal class="font-display text-4xl sm:text-5xl font-medium leading-[0.98] tracking-tight mb-4">Envie d'aller plus loin ?</h2>
          <p v-reveal="{ delay: 100 }" class="text-base md:text-lg font-body font-light text-paper/80 leading-relaxed max-w-xl">
            Les articles donnent des pistes. Un accompagnement les transforme en habitudes, adaptées à ton corps et à ta vie.
          </p>
        </div>
        <div v-reveal="{ delay: 180 }" class="flex flex-col items-start gap-4">
          <NuxtLink v-magnetic to="/feuille-de-route" class="btn-big group">
            Remplir la feuille de route
            <span class="btn-big-arrow">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </NuxtLink>
          <a :href="content.hero.ctaUrl" target="_blank" rel="noopener" class="text-sm font-body text-paper/75 hover:text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper transition-colors">
            ou {{ content.hero.ctaLabel.charAt(0).toLowerCase() + content.hero.ctaLabel.slice(1) }}
          </a>
        </div>
      </div>
    </section>

    <HomeFooter />
  </div>
</template>

<style scoped lang="postcss">
.featured {
  @apply grid md:grid-cols-[1.1fr_0.9fr] rounded-[2rem] overflow-hidden bg-bleu text-paper;
  box-shadow: 0 40px 80px -40px rgba(27, 63, 160, 0.55);
}
.read-link {
  @apply inline-flex items-center gap-3 text-[15px] font-body font-medium;
}
.read-link-arrow {
  @apply w-11 h-11 rounded-full bg-paper text-ink grid place-items-center transition-transform duration-500;
}
.group:hover .read-link-arrow { transform: rotate(-45deg); }
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
