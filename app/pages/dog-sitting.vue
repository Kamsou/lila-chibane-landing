<script setup>
import PricingCategory from '~~/slices/PricingCategory/index.vue'

const { content, faqFor } = await useSiteContent()

const dog = computed(() => content.value.dog)
const faq = computed(() => faqFor('dog'))
const selectedPrice = ref(null)

const panelDefs = computed(() => {
  const list = [
    { key: 'intro', label: 'Présentation' },
    { key: 'prestations', label: 'Prestations' },
  ]
  if (dog.value.pricingSlices.length) list.push({ key: 'tarifs', label: 'Tarifs' })
  if (faq.value.length) list.push({ key: 'faq', label: 'Questions' })
  list.push({ key: 'contact', label: 'Contact' })
  return list
})
const labels = computed(() => panelDefs.value.map((p) => p.label))
const idx = (key) => panelDefs.value.findIndex((p) => p.key === key)

useSeoMeta({
  title: 'Dog sitter Avensan, Médoc & Le Bouscat · garde de chien · Lila Chibane',
  description: "Garde de chien à domicile, promenades et visites à Avensan, dans le Médoc, et à Le Bouscat. À chaque chien son rythme, à chaque humain sa tranquillité.",
  ogTitle: 'Dog sitter · Médoc et Le Bouscat · Lila Chibane',
  ogDescription: 'Garde de chien à domicile, promenades et visites, dans le Médoc et à Le Bouscat.',
  ogImage: 'https://lilachibane.com/dog-sitting.jpg',
  ogUrl: 'https://lilachibane.com/dog-sitting',
  ogType: 'website',
  twitterTitle: 'Dog sitter · Médoc et Le Bouscat · Lila Chibane',
  twitterDescription: 'Garde de chien à domicile, promenades et visites, dans le Médoc et à Le Bouscat.',
  twitterImage: 'https://lilachibane.com/dog-sitting.jpg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Dog sitting',
        name: 'Dog sitting et garde de chien',
        description: 'Garde de chien à domicile, promenades et visites, à Avensan, dans le Médoc, et à Le Bouscat.',
        provider: { '@type': 'Person', '@id': 'https://lilachibane.com/#lila', name: 'Lila Chibane', url: 'https://lilachibane.com' },
        areaServed: [
          { '@type': 'City', name: 'Avensan' },
          { '@type': 'AdministrativeArea', name: 'Médoc' },
          { '@type': 'City', name: 'Le Bouscat' },
        ],
        offers: { '@type': 'Offer', priceCurrency: 'EUR', url: 'https://lilachibane.com/dog-sitting' },
        url: 'https://lilachibane.com/dog-sitting',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lilachibane.com' },
          { '@type': 'ListItem', position: 2, name: 'Dog sitting', item: 'https://lilachibane.com/dog-sitting' },
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

    <PanelDeck :labels="labels">
      <template #default="{ active }">
        <!-- Présentation -->
        <ActivityIntro
          v-show="active === idx('intro')"
          :title="dog.title"
          :intro="dog.intro"
          :caption="dog.ctaCaption"
          image-src="/dog-sitting.jpg"
          image-alt="Lila Chibane, dog sitter dans le Médoc"
          image-position="object-bottom md:object-center"
        />

        <!-- Prestations -->
        <section v-show="active === idx('prestations')" class="panel">
          <div class="max-w-4xl mx-auto w-full">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1] mb-8 md:mb-12">{{ content.dog.servicesTitle }}</h2>
            <div class="grid sm:grid-cols-3 gap-5 md:gap-6">
              <div
                v-for="(card, i) in dog.cards"
                :key="`d-${i}`"
                class="card-in bg-white/[0.06] border border-white/10 rounded-xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/10 hover:shadow-black/20"
                :style="{ animationDelay: `${i * 90}ms` }"
              >
                <h3 class="text-lg font-display font-normal text-white mb-3">{{ card.title }}</h3>
                <p class="text-sm font-body font-light text-white/75 leading-relaxed">{{ card.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Tarifs -->
        <section v-if="dog.pricingSlices.length" v-show="active === idx('tarifs')" class="panel">
          <div class="max-w-3xl mx-auto w-full">
            <div class="flex items-center gap-3 mb-6 md:mb-8">
              <button
                v-if="selectedPrice !== null"
                type="button"
                class="back-btn"
                aria-label="Retour aux tarifs"
                @click="selectedPrice = null"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              </button>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white leading-[1.1]">{{ content.dog.pricingTitle }}</h2>
            </div>

            <Transition name="md-fade" mode="out-in">
              <div v-if="selectedPrice === null" key="list" class="grid sm:grid-cols-2 gap-3">
                <PricingCategory
                  v-for="(slice, i) in dog.pricingSlices"
                  :key="i"
                  :slice="slice"
                  mode="summary"
                  @select="selectedPrice = i"
                />
              </div>
              <PricingCategory
                v-else
                key="detail"
                :slice="dog.pricingSlices[selectedPrice]"
                mode="detail"
              />
            </Transition>
          </div>
        </section>

        <!-- FAQ -->
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

        <!-- Contact -->
        <section v-show="active === idx('contact')" class="panel">
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
  @apply flex-1 flex flex-col justify-start md:justify-center px-6 md:px-10 py-8 md:py-12;
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

.back-btn {
  @apply w-9 h-9 rounded-full flex items-center justify-center shrink-0
         border border-white/20 text-white/80
         hover:bg-white hover:text-bleu
         transition-all duration-300;
}

.md-fade-enter-active,
.md-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.md-fade-enter-from { opacity: 0; transform: translateY(8px); }
.md-fade-leave-to { opacity: 0; transform: translateY(-8px); }

@media (prefers-reduced-motion: reduce) {
  .md-fade-enter-active,
  .md-fade-leave-active { transition: none; }
  .md-fade-enter-from,
  .md-fade-leave-to { transform: none; }
}
</style>
