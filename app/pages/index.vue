<script setup>
const { content } = await useSiteContent()

useSeoMeta({
  title: 'Lila Chibane · Coach sportive & dog sitter · Médoc, Le Bouscat',
  description: 'Coach sportive sport-santé (en visio et en présentiel dans le Médoc) et dog sitter à Avensan et Le Bouscat. Choisis ton espace : coaching ou dog sitting.',
  ogTitle: 'Lila Chibane · Coach sportive & dog sitter · Médoc et Le Bouscat',
  ogDescription: 'Coaching sport-santé et dog sitting, dans le Médoc et à Le Bouscat.',
  ogImage: 'https://lilachibane.com/test-2.jpeg',
  ogImageAlt: 'Lila Chibane, coach sportive et dog sitter',
  ogImageWidth: 1200,
  ogImageHeight: 1800,
  ogUrl: 'https://lilachibane.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Lila Chibane · Coach sportive & dog sitter · Médoc et Le Bouscat',
  twitterDescription: 'Coaching sport-santé et dog sitting, dans le Médoc et à Le Bouscat.',
  twitterImage: 'https://lilachibane.com/test-2.jpeg',
  twitterImageAlt: 'Lila Chibane, coach sportive et dog sitter',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        '@id': 'https://lilachibane.com/#business',
        name: 'Lila Chibane',
        description: 'Coach sportive sport-santé et dog sitter basée à Avensan, dans le Médoc. Coaching en visio et en présentiel dans le Médoc ; garde de chien, promenades et visites à Avensan, dans le Médoc, et à Le Bouscat.',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/test-2.jpeg',
        email: 'lila.chibane@outlook.com',
        areaServed: [
          { '@type': 'City', name: 'Avensan' },
          { '@type': 'AdministrativeArea', name: 'Médoc' },
          { '@type': 'City', name: 'Le Bouscat' },
          { '@type': 'Country', name: 'France' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Avensan',
          postalCode: '33480',
          addressRegion: 'Nouvelle-Aquitaine',
          addressCountry: 'FR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 45.0167, longitude: -0.7833 },
        priceRange: '€€',
        serviceType: ['Coach sportif', 'Coach santé', 'Coaching en visio', 'Coaching en présentiel', 'Dog sitting', 'Garde de chien à domicile', 'Promenade de chien'],
        sameAs: ['https://jamaistroptard.substack.com/'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Lila Chibane',
        description: 'Coach sportive et dog sitter.',
        url: 'https://lilachibane.com',
        inLanguage: 'fr',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://lilachibane.com/#lila',
        name: 'Lila Chibane',
        jobTitle: 'Coach sportive et dog sitter',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/test-2.jpeg',
        email: 'lila.chibane@outlook.com',
        knowsAbout: ['Activité physique adaptée', 'Régulation nerveuse', 'Coaching santé', 'Dog sitting', 'Garde de chien', 'Bien-être animal'],
        sameAs: ['https://jamaistroptard.substack.com/'],
      }),
    },
  ],
})
</script>

<template>
  <main class="h-[100dvh] overflow-hidden bg-bleu text-white flex flex-col md:grid md:grid-rows-1 md:grid-cols-2">
    <div class="relative overflow-hidden flex-1 min-h-0 md:flex-none">
      <img
        src="/test-2.jpeg"
        alt="Lila Chibane"
        width="1200"
        height="1800"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        class="portal-photo w-full h-full object-cover object-[center_25%]"
      />
    </div>

    <div class="flex flex-col min-h-0 shrink-0 md:shrink">
      <header class="px-6 md:px-10 pt-5 md:pt-10 shrink-0">
        <p class="font-display text-lg md:text-xl font-normal portal-fade" style="animation-delay: 0.05s">
          {{ content.brand }}
        </p>
      </header>

      <div class="flex-1 min-h-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-10 lg:px-16 py-5 md:py-0">
        <h1 class="font-display font-normal text-3xl md:text-4xl lg:text-6xl leading-[1.1] mb-4 md:mb-5 max-w-xl portal-fade" style="animation-delay: 0.2s">
          {{ content.hero.name }}
        </h1>
        <p class="hidden sm:block text-sm md:text-base font-body font-light text-white/70 max-w-md mb-8 md:mb-12 leading-relaxed portal-fade" style="animation-delay: 0.35s">
          {{ content.hero.intro1 }}
        </p>

        <p class="text-xs font-body font-normal tracking-wider text-white/40 mb-4 portal-fade" style="animation-delay: 0.45s">
          {{ content.portal.choiceLabel }}
        </p>
        <div class="w-full max-w-md md:max-w-lg space-y-3 md:space-y-4">
          <NuxtLink
            v-if="content.coaching.visible"
            to="/coaching"
            class="door group portal-fade"
            style="animation-delay: 0.55s"
          >
            <div class="flex items-center gap-3 md:gap-4 min-w-0">
              <svg class="door-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M3.22 12H9.5l.7-1.5 2 4.5 2-6 1.3 3H20.8" />
              </svg>
              <div class="text-left min-w-0">
                <h2 class="font-display text-lg md:text-xl font-normal mb-0.5">{{ content.coaching.kicker }}</h2>
                <p class="text-xs text-white/55 group-hover:text-bleu/60 transition-colors duration-300">{{ content.coaching.doorText }}</p>
              </div>
            </div>
            <svg class="door-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </NuxtLink>

          <NuxtLink
            v-if="content.dog.visible"
            to="/dog-sitting"
            class="door group portal-fade"
            style="animation-delay: 0.65s"
          >
            <div class="flex items-center gap-3 md:gap-4 min-w-0">
              <svg class="door-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                <ellipse cx="5.5" cy="11" rx="1.8" ry="2.4" />
                <ellipse cx="9.5" cy="7.3" rx="1.8" ry="2.6" />
                <ellipse cx="14.5" cy="7.3" rx="1.8" ry="2.6" />
                <ellipse cx="18.5" cy="11" rx="1.8" ry="2.4" />
                <path d="M12 12.5c-2.8 0-5 1.9-5 4.3 0 1.6 1.1 2.7 2.6 2.7 1 0 1.6-.5 2.4-.5s1.4.5 2.4.5c1.5 0 2.6-1.1 2.6-2.7 0-2.4-2.2-4.3-5-4.3z" />
              </svg>
              <div class="text-left min-w-0">
                <h2 class="font-display text-lg md:text-xl font-normal mb-0.5">{{ content.dog.kicker }}</h2>
                <p class="text-xs text-white/55 group-hover:text-bleu/60 transition-colors duration-300">{{ content.dog.doorText }}</p>
              </div>
            </div>
            <svg class="door-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <footer class="px-6 md:px-10 pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-10 shrink-0 flex flex-col sm:flex-row items-center md:items-start md:justify-between gap-1 sm:gap-3">
        <a :href="content.hero.ctaUrl" target="_blank" rel="noopener" class="inline-flex items-center text-sm md:text-xs font-body font-light text-white/60 hover:text-white transition-colors duration-300 py-2.5 md:py-0">
          <span class="sparkle">✦</span> {{ content.hero.ctaLabel }}
        </a>
        <div class="flex items-center gap-7 sm:gap-6">
          <NuxtLink to="/blog" class="text-sm md:text-xs font-body font-light text-white/60 hover:text-white transition-colors duration-300 py-2.5 md:py-0">Blog</NuxtLink>
          <a href="mailto:lila.chibane@outlook.com" class="text-sm md:text-xs font-body font-light text-white/60 hover:text-white transition-colors duration-300 py-2.5 md:py-0">lila.chibane@outlook.com</a>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped lang="postcss">
.door {
  @apply flex items-center justify-between gap-4 rounded-2xl px-5 py-4 md:px-7 md:py-6
         border border-white/20 bg-white/[0.03]
         hover:bg-white hover:text-bleu hover:border-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10
         transition-all duration-300 active:translate-y-0 active:scale-[0.99];
}
.door-arrow {
  @apply w-5 h-5 shrink-0 text-white/40 group-hover:text-bleu transition-all duration-300 group-hover:translate-x-1;
}
.door-icon {
  @apply w-7 h-7 md:w-8 md:h-8 shrink-0 text-white/80 group-hover:text-bleu transition-colors duration-300;
}

.portal-photo {
  animation: kenburns 26s ease-in-out infinite alternate;
}
@keyframes kenburns {
  from { transform: scale(1); }
  to { transform: scale(1.06); }
}
@media (prefers-reduced-motion: reduce) {
  .portal-photo { animation: none; }
}

.portal-fade {
  opacity: 0;
  transform: translateY(14px);
  animation: portalFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes portalFade {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .portal-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
