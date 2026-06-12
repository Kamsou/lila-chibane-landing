<script setup>
const { content, faqFor } = await useSiteContent()

const coaching = computed(() => content.value.coaching)
const faq = computed(() => faqFor('coaching'))
const panels = computed(() => {
  const list = ['Présentation', 'Approche']
  if (faq.value.length) list.push('Questions')
  list.push('Contact')
  return list
})

useSeoMeta({
  title: 'Coach sportive sport-santé · visio & Médoc · Lila Chibane',
  description: "Coach sportive pour femmes : activité physique adaptée, régulation nerveuse, alimentation soutenante. En visio partout en France et en présentiel dans le Médoc. Bilan gratuit.",
  ogTitle: 'Coach sportive sport-santé · Lila Chibane',
  ogDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  ogImage: 'https://lilachibane.com/IMG_2553.jpg',
  ogUrl: 'https://lilachibane.com/coaching',
  ogType: 'website',
  twitterTitle: 'Coach sportive sport-santé · Lila Chibane',
  twitterDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  twitterImage: 'https://lilachibane.com/IMG_2553.jpg',
})

useHead({
  script: [
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
          { '@type': 'ServiceChannel', name: 'Coaching en visio', serviceUrl: 'https://lilachibane.com/coaching' },
          { '@type': 'ServiceChannel', name: 'Coaching en présentiel (Médoc)', serviceUrl: 'https://lilachibane.com/coaching' },
        ],
        offers: {
          '@type': 'Offer',
          name: 'Bilan personnalisé gratuit',
          price: '0',
          priceCurrency: 'EUR',
          url: 'https://calendly.com/lilacoach/bilanpersonnalise',
        },
        url: 'https://lilachibane.com/coaching',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lilachibane.com' },
          { '@type': 'ListItem', position: 2, name: 'Coaching sportif', item: 'https://lilachibane.com/coaching' },
        ],
      }),
    },
  ],
})

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

    <PanelDeck :labels="panels">
      <template #default="{ active }">
        <!-- Présentation -->
        <section v-show="active === 0" class="panel">
          <div class="max-w-2xl mx-auto w-full">
            <span class="text-xs font-body font-normal tracking-wider text-white/50 mb-4 block">{{ content.coaching.kicker }}</span>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white leading-[1.1] mb-6 md:mb-8">
              {{ coaching.title }}
            </h1>
            <p class="text-base sm:text-lg font-body font-light text-white/75 leading-relaxed mb-10">
              {{ coaching.intro }}
            </p>
            <a :href="coaching.ctaUrl" target="_blank" rel="noopener" class="btn-light inline-block">{{ coaching.ctaLabel }}</a>
            <p class="text-xs font-body text-white/50 mt-4 tracking-wide">{{ coaching.ctaCaption }}</p>
          </div>
        </section>

        <!-- Approche -->
        <section v-show="active === 1" class="panel">
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

        <!-- FAQ -->
        <section v-if="faq.length" v-show="active === 2" class="panel">
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

        <!-- Contact -->
        <section v-show="active === panels.length - 1" class="panel">
          <div class="max-w-lg mx-auto w-full">
            <h2 class="text-2xl sm:text-3xl font-display font-normal text-white leading-[1.1] mb-2 text-center">{{ content.contact.title }}</h2>
            <p class="text-sm font-body font-light text-white/75 mb-6 text-center leading-relaxed max-w-md mx-auto">{{ content.contact.intro }}</p>
            <ContactForm :contact="content.contact" />
          </div>
        </section>
      </template>
    </PanelDeck>
  </div>
</template>

<style scoped lang="postcss">
.panel {
  @apply flex-1 flex flex-col justify-center px-6 md:px-10 py-8 md:py-12;
}
.faq-item summary::-webkit-details-marker { display: none; }

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
