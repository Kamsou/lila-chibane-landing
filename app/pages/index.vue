<script setup>
const { content, faqFor } = await useSiteContent()

const coaching = computed(() => content.value.coaching)
const faq = computed(() => faqFor('coaching'))
const testimonials = computed(() => coaching.value.testimonials || [])
const socials = computed(() => content.value.socials.filter((s) => s.key !== 'instagram-dog'))
const openTestimonials = reactive(new Set())
const toggleTestimonial = (i) => {
  if (openTestimonials.has(i)) openTestimonials.delete(i)
  else openTestimonials.add(i)
}

const panelDefs = computed(() => {
  const list = [
    { key: 'intro', label: 'Présentation' },
    { key: 'approche', label: 'Approche' },
  ]
  if (testimonials.value.length) list.push({ key: 'temoignages', label: 'Témoignages' })
  if (content.value.faq.visible && faq.value.length) list.push({ key: 'faq', label: 'Questions' })
  list.push({ key: 'contact', label: 'Contact' })
  return list
})
const labels = computed(() => panelDefs.value.map((p) => p.label))
const idx = (key) => panelDefs.value.findIndex((p) => p.key === key)

useSeoMeta({
  title: 'Lila Chibane · Coach sportive sport-santé · visio & Médoc',
  description: "Coach sportive pour femmes : activité physique adaptée, régulation nerveuse, alimentation soutenante. En visio partout en France et en présentiel dans le Médoc. Bilan gratuit.",
  ogTitle: 'Lila Chibane · Coach sportive sport-santé',
  ogDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  ogImage: 'https://lilachibane.com/test-2.jpeg',
  ogImageAlt: 'Lila Chibane, coach sportive',
  ogImageWidth: 1200,
  ogImageHeight: 1800,
  ogUrl: 'https://lilachibane.com/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Lila Chibane · Coach sportive sport-santé',
  twitterDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  twitterImage: 'https://lilachibane.com/test-2.jpeg',
  twitterImageAlt: 'Lila Chibane, coach sportive',
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        '@id': 'https://lilachibane.com/#business',
        name: 'Lila Chibane · Coach sportive',
        description: "Coach sportive sport-santé pour femmes, basée à Avensan dans le Médoc. En visio partout en France et en présentiel dans le Médoc.",
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/test-2.jpeg',
        email: 'lila.chibane.pro@outlook.com',
        areaServed: [
          { '@type': 'City', name: 'Avensan' },
          { '@type': 'AdministrativeArea', name: 'Médoc' },
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
        serviceType: ['Coach sportif', 'Coach santé', 'Coaching sport-santé', 'Coaching en visio', 'Coaching en présentiel'],
        sameAs: [
          'https://jamaistroptard.substack.com/',
          'https://www.instagram.com/lila_chibane/',
          'https://www.linkedin.com/in/lila-chibane-61704864/',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Lila Chibane',
        description: 'Coach sportive sport-santé pour femmes, en visio et dans le Médoc.',
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
        jobTitle: 'Coach sportive sport-santé',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/test-2.jpeg',
        email: 'lila.chibane.pro@outlook.com',
        knowsAbout: ['Activité physique adaptée', 'Régulation nerveuse', 'Coaching santé', 'Sport-santé', 'Accompagnement des femmes'],
        sameAs: [
          'https://jamaistroptard.substack.com/',
          'https://www.instagram.com/lila_chibane/',
          'https://www.linkedin.com/in/lila-chibane-61704864/',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Coaching sportif',
        name: 'Coaching sportif et sport-santé',
        description: 'Coach sportive pour femmes : activité physique adaptée, régulation nerveuse, alimentation soutenante. En visio partout en France et en présentiel dans le Médoc.',
        provider: { '@type': 'Person', '@id': 'https://lilachibane.com/#lila', name: 'Lila Chibane', url: 'https://lilachibane.com' },
        areaServed: [
          { '@type': 'Country', name: 'France' },
          { '@type': 'AdministrativeArea', name: 'Médoc' },
          { '@type': 'City', name: 'Avensan' },
        ],
        availableChannel: [
          { '@type': 'ServiceChannel', name: 'Coaching en visio', serviceUrl: 'https://lilachibane.com/' },
          { '@type': 'ServiceChannel', name: 'Coaching en présentiel (Médoc)', serviceUrl: 'https://lilachibane.com/' },
        ],
        offers: {
          '@type': 'Offer',
          name: 'Bilan personnalisé gratuit',
          price: '0',
          priceCurrency: 'EUR',
          url: 'https://calendly.com/lilacoach/bilanpersonnalise',
        },
        ...(testimonials.value.length
          ? {
              review: testimonials.value.map((t) => ({
                '@type': 'Review',
                author: { '@type': 'Person', name: t.author },
                reviewBody: t.quote.join(' '),
              })),
            }
          : {}),
        url: 'https://lilachibane.com/',
      }),
    },
  ],
}))

useHead(() => {
  if (!faq.value.length) return {}
  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.value.map((it) => ({
            '@type': 'Question',
            name: it.question,
            acceptedAnswer: { '@type': 'Answer', text: it.answer },
          })),
        }),
      },
    ],
  }
})
</script>

<template>
  <div class="bg-bleu text-white">
    <ActivityHeader />

    <PanelDeck :labels="labels">
      <template #default="{ active }">
        <ActivityIntro
          v-show="active === idx('intro')"
          :title="coaching.title"
          :intro="coaching.intro"
          caption="2 minutes · gratuit · sans engagement"
          cta-label="Remplir la feuille de route"
          cta-url="/feuille-de-route"
          image-src="/coaching-sportif.jpeg"
          image-alt="Lila Chibane, coach sportive"
          image-position="object-center"
        />

        <section v-show="active === idx('approche')" class="panel">
          <div class="max-w-4xl mx-auto w-full">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1] mb-8 md:mb-12">{{ content.coaching.approachTitle }}</h2>
            <div class="grid sm:grid-cols-3 gap-5 md:gap-6">
              <div
                v-for="(card, i) in coaching.cards"
                :key="`c-${i}`"
                class="card-in bg-white/[0.06] border border-white/10 rounded-xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/10 hover:shadow-black/20"
                :style="{ animationDelay: `${i * 90}ms` }"
              >
                <h3 class="text-lg font-display font-normal text-white mb-3">{{ card.title }}</h3>
                <p class="text-sm font-body font-light text-white/75 leading-relaxed">{{ card.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="testimonials.length" v-show="active === idx('temoignages')" class="panel">
          <div class="max-w-4xl mx-auto w-full flex-1 min-h-0 flex flex-col">
            <h2 class="shrink-0 text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1] mb-8 md:mb-10">Ce qu'elles en disent</h2>
            <div class="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1">
              <div class="columns-1 lg:columns-2 gap-5">
                <figure
                  v-for="(t, i) in testimonials"
                  :key="`t-${i}`"
                  class="card-in break-inside-avoid mb-5 bg-white/[0.06] border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-black/20"
                  :style="{ animationDelay: `${i * 100}ms` }"
                >
                  <blockquote>
                    <p class="font-display text-lg md:text-xl font-normal text-white leading-snug">« {{ t.highlight }} »</p>
                  </blockquote>
                  <figcaption class="mt-5 flex items-center gap-3">
                    <span class="testi-avatar">{{ t.author.charAt(0) }}</span>
                    <span class="leading-tight">
                      <span class="block text-sm font-body font-normal text-white">{{ t.author }}</span>
                      <span v-if="t.detail" class="block text-xs font-body text-white/45">{{ t.detail }}</span>
                    </span>
                  </figcaption>
                  <div v-if="t.quote.length" class="mt-4">
                    <button
                      type="button"
                      class="inline-flex items-center gap-1.5 text-sm font-body text-white/60 hover:text-white transition-colors duration-300"
                      :aria-expanded="openTestimonials.has(i)"
                      @click="toggleTestimonial(i)"
                    >
                      {{ openTestimonials.has(i) ? 'Réduire' : 'Lire le témoignage' }}
                      <svg class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': openTestimonials.has(i) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <div
                      class="grid transition-all duration-300 ease-out motion-reduce:transition-none"
                      :class="openTestimonials.has(i) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                    >
                      <div class="overflow-hidden">
                        <div class="pt-3 space-y-3">
                          <p v-for="(para, j) in t.quote" :key="j" class="text-sm font-body font-light text-white/80 leading-relaxed">{{ para }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>

            <div class="shrink-0 border-t border-white/10 pt-5 text-center">
              <NuxtLink to="/feuille-de-route" class="group inline-flex items-center gap-1.5 text-sm font-body text-white/70 hover:text-white transition-colors duration-300">
                Toi aussi, prête à t'y mettre&nbsp;?
                <span class="underline underline-offset-2">Remplir la feuille de route</span>
                <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section v-if="faq.length" v-show="active === idx('faq')" class="panel">
          <div class="max-w-2xl mx-auto w-full">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1] mb-8 md:mb-10">{{ content.faq.title }}</h2>
            <div class="divide-y divide-white/15 max-h-[55vh] overflow-y-auto">
              <details v-for="(item, i) in faq" :key="`f-${i}`" class="faq-item group py-5">
                <summary class="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden">
                  <h3 class="text-base md:text-lg font-display font-normal text-white">{{ item.question }}</h3>
                  <svg class="w-4 h-4 text-white/50 shrink-0 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p class="text-sm md:text-base font-body font-light text-white/75 leading-relaxed mt-3">{{ item.answer }}</p>
              </details>
            </div>
          </div>
        </section>

        <section v-show="active === idx('contact')" class="panel">
          <div class="max-w-md mx-auto w-full text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1] mb-3">{{ content.contact.title }}</h2>
            <p class="text-sm md:text-base font-body font-light text-white/75 mb-8 leading-relaxed">
              Réponds à quelques questions pour préparer un premier échange vraiment utile pour toi.
            </p>

            <NuxtLink to="/feuille-de-route" class="btn-light inline-flex items-center justify-center gap-2 group">
              Remplir la feuille de route
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </NuxtLink>

            <p class="text-sm font-body font-light text-white/55 mt-7">
              ou écris-moi à
              <a href="mailto:lila.chibane.pro@outlook.com" class="text-white/80 hover:text-white underline underline-offset-2 transition-colors duration-300">lila.chibane.pro@outlook.com</a>
            </p>

            <div class="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
              <a :href="content.hero.ctaUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-300">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                {{ content.hero.ctaLabel }}
              </a>
              <div v-if="socials.length" class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <a
                  v-for="s in socials"
                  :key="s.key"
                  :href="s.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="s.label"
                  :title="s.label"
                  class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-body font-light text-white/60 hover:text-white transition-colors duration-300"
                >
                  <svg v-if="s.type === 'instagram'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" /></svg>
                  <svg v-else class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.93V21H10z" /></svg>
                  <span v-if="s.short">{{ s.short }}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </template>
    </PanelDeck>
  </div>
</template>

<style scoped lang="postcss">
.panel {
  @apply flex-1 flex flex-col justify-start md:justify-center px-6 md:px-10 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:py-12;
}
.faq-item summary::-webkit-details-marker { display: none; }

.testi-avatar {
  @apply w-9 h-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center
         font-display text-white text-sm select-none;
}

.card-in {
  opacity: 0;
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .card-in { animation: none; opacity: 1; }
}
</style>
