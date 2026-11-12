<script setup>
const { content, faqFor } = await useSiteContent()

const coaching = computed(() => content.value.coaching)
const faq = computed(() => faqFor('coaching'))
const testimonials = computed(() => coaching.value.testimonials || [])
const socials = computed(() => content.value.socials.filter((s) => s.key !== 'instagram-dog'))
const issues = computed(() => content.value.links.items.filter((l) => l.title.startsWith('#')).slice(0, 3))
const issueParts = (title) => {
  const m = title.match(/^(#\d+)\s*(.*)$/)
  return m ? { num: m[1], rest: m[2] } : { num: '', rest: title }
}
const ciels = {
  intro: '#E4E8FB',
  offres: '#ECE5FA',
  approche: '#E8EBF8',
  newsletter: '#171F4D',
  temoignages: '#EFE6F8',
  faq: '#E8EBF8',
  contact: '#E6E3FA',
}
const lu = ref(null)
const fermerSurEchap = (e) => { if (e.key === 'Escape') lu.value = null }
onMounted(() => window.addEventListener('keydown', fermerSurEchap))
onUnmounted(() => window.removeEventListener('keydown', fermerSurEchap))
const titreContact = computed(() => content.value.contact.title.replace(/ ([?!:;])/g, '\u00a0$1'))
const brouillons = computed(() => content.value.contact.brouillons)
const brouillon = ref('')
let frappe
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { brouillon.value = brouillons.value[0] || ''; return }
  let b = 0
  let c = 0
  let pause = 0
  frappe = setInterval(() => {
    if (pause > 0) { pause--; return }
    const texte = brouillons.value[b] || ''
    if (c < texte.length) { c++; brouillon.value = texte.slice(0, c); if (c === texte.length) pause = 60; return }
    b = (b + 1) % (brouillons.value.length || 1)
    c = 0
    brouillon.value = ''
  }, 45)
})
onUnmounted(() => clearInterval(frappe))
const visuels = ['semaines', 'conversation', 'tortue']
const offres = computed(() => content.value.offres.items.map((o, i) => ({ ...o, visuel: visuels[i] || 'tortue' })))
const offre = ref(0)
onMounted(() => {
  try {
    const i = Number(sessionStorage.getItem('offre'))
    if (i > 0 && i < offres.value.length) offre.value = i
  } catch {}
})
watch(offre, (i) => {
  try { sessionStorage.setItem('offre', String(i)) } catch {}
})

const panelDefs = computed(() => {
  const list = [
    { key: 'intro', slug: 'presentation', label: 'Présentation' },
    { key: 'offres', slug: 'accompagnements', label: 'Accompagnements' },
    { key: 'approche', label: 'Approche' },
    { key: 'newsletter', label: 'Newsletter' },
  ]
  if (testimonials.value.length) list.push({ key: 'temoignages', label: 'Témoignages' })
  if (content.value.faq.visible && faq.value.length) list.push({ key: 'faq', slug: 'questions', label: 'Questions' })
  list.push({ key: 'contact', label: 'Contact' })
  return list
})
const labels = computed(() => panelDefs.value.map((p) => p.label))
const slugs = computed(() => panelDefs.value.map((p) => p.slug || p.key))
const idx = (key) => panelDefs.value.findIndex((p) => p.key === key)
const cielsOnglets = computed(() => panelDefs.value.map((p) => ciels[p.key]))
const nuit = computed(() => [idx('intro'), idx('newsletter')])

useSeoMeta({
  title: 'Lila Chibane · Coach sportive sport-santé · visio & Médoc',
  description: "Coach sportive pour femmes, dans le Médoc et en visio. Une cohorte en ligne de 12 semaines, un appel de 45 minutes, une pratique qui respecte ton rythme, sans pression.",
  ogTitle: 'Lila Chibane · Coach sportive sport-santé',
  ogDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  ogImage: 'https://lilachibane.com/og-lila.jpg',
  ogImageAlt: 'Lila Chibane, coach sportive',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogUrl: 'https://lilachibane.com/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Lila Chibane · Coach sportive sport-santé',
  twitterDescription: 'Reprendre une activité physique en douceur, sans pression. En visio et dans le Médoc.',
  twitterImage: 'https://lilachibane.com/og-lila.jpg',
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
        image: 'https://lilachibane.com/og-lila.jpg',
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
          'https://corpsdereves.substack.com/',
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
          'https://corpsdereves.substack.com/',
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
        offers: [
          { '@type': 'Offer', name: 'Les tortues libres et musclées, cohorte en ligne de 12 semaines', price: '650', priceCurrency: 'EUR', url: 'https://lilachibane.com/cohorte' },
          { '@type': 'Offer', name: 'Allô Lila, appel individuel de 45 minutes', price: '85', priceCurrency: 'EUR', url: 'https://lilachibane.com/allo-lila' },
        ],
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
  <div class="text-encre">
    <ActivityHeader transparent burger />

    <PanelDeck :labels="labels" :slugs="slugs" :ciels="cielsOnglets" :nuit="nuit" :plein="[idx('intro')]" accueil burger @change="lu = null">
      <template #default="{ active, go }">
        <section v-show="active === idx('intro')" class="relative flex-1 flex flex-col md:justify-center">
          <div class="relative flex-1 flex flex-col justify-end pt-16 overflow-hidden bg-[#FFD2A1] isolate">
            <picture>
              <source media="(min-width: 768px)" srcset="/lila-parc-large.jpg" />
              <img src="/lila-parc.jpg" alt="Lila Chibane, coach sportive, qui rit dans un parc" class="absolute inset-0 w-full h-full object-cover object-[60%_22%] md:object-[70%_30%] grayscale contrast-[1.15] mix-blend-multiply" fetchpriority="high" />
            </picture>
            <span class="absolute inset-0 bg-[#2A2E7C] mix-blend-lighten" aria-hidden="true"></span>
            <span class="absolute inset-0 bg-[#171F4D]/15" aria-hidden="true"></span>
            <div class="relative px-6 pb-12 md:pb-0 md:flex-1 md:flex md:flex-col md:justify-center md:px-[max(2.5rem,calc((100vw_-_64rem)/2_+_2.5rem))] text-white">
              <div class="md:max-w-[36rem]">
                <h1 class="font-titre font-bold text-[2.3rem] sm:text-5xl md:text-[clamp(2.4rem,min(7.4vh,4vw),4.6rem)] leading-[1.02] tracking-tight text-white mb-6 md:mb-[4vh]">
                  {{ content.accueil.titre }}
                  <span class="text-[#D9B8F5]">{{ content.accueil.titreAccent }}</span>
                </h1>
                <div class="flex flex-wrap items-center gap-x-7 gap-y-4">
                  <button type="button" class="btn-blanc group" @click="go(idx('offres'))">{{ content.accueil.bouton }}</button>
                  <button type="button" class="font-titre font-semibold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white" @click="go(idx('newsletter'))">{{ content.accueil.lien }}</button>
                </div>
              </div>
              <dl class="grid grid-cols-3 gap-x-6 font-titre mt-8 md:mt-[6vh] max-w-lg">
                <div v-for="p in content.accueil.preuves" :key="p.valeur"><dt class="text-sm text-white/70">{{ p.label }}</dt><dd class="font-bold leading-snug">{{ p.valeur }}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section v-show="active === idx('offres')" class="panel">
          <div class="max-w-[59rem] mx-auto w-full grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-x-16 gap-y-10 items-center">
            <div>
              <h2 class="titre mb-6 md:mb-[4vh]">{{ content.offres.titre.replace(/ ([?!:;])/g, '\u00a0$1') }}</h2>
              <ul class="space-y-3">
                <li v-for="(o, i) in offres" :key="o.nom">
                  <button
                    type="button"
                    class="choix group w-full flex items-center justify-between gap-4 rounded-full pl-7 pr-3 py-3 md:py-[clamp(0.55rem,1.7vh,0.9rem)] text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-azur/50"
                    :class="offre === i ? 'bg-encre text-white shadow-lg shadow-encre/20' : 'bg-white/70 text-encre hover:bg-white hover:shadow-md hover:shadow-encre/10'"
                    :aria-pressed="offre === i"
                    @click="offre = i"
                    @mouseenter="offre = i"
                  >
                    <span class="font-titre font-semibold text-[1.05rem] sm:text-xl md:text-[clamp(1.15rem,3.3vh,1.55rem)] leading-tight tracking-tight whitespace-nowrap">{{ o.besoin }}</span>
                    <span
                      class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      :class="offre === i ? 'bg-corail text-white' : 'bg-ciel text-encre/50 group-hover:text-encre md:group-hover:translate-x-0.5'"
                      aria-hidden="true"
                    >
                      <svg class="w-4 h-4 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div :key="offre" class="offre-in">
              <div class="h-36 md:h-[clamp(7rem,24vh,13rem)] mb-6 md:mb-[4vh]">
                <OffreVisuel :type="offres[offre].visuel" />
              </div>
              <h3 class="font-titre font-bold text-encre text-2xl leading-tight mb-2">{{ offres[offre].nom }}</h3>
              <p class="font-titre text-ardoise mb-6 md:mb-[3.5vh]"><span class="font-semibold text-encre">{{ offres[offre].prix }}</span>, {{ offres[offre].note }}</p>
              <NuxtLink v-if="offres[offre].url.startsWith('/')" :to="offres[offre].url" class="btn-azur">{{ offres[offre].cta }}</NuxtLink>
              <a v-else :href="offres[offre].url" target="_blank" rel="noopener" class="btn-azur">{{ offres[offre].cta }}</a>
            </div>
          </div>
        </section>

        <section v-show="active === idx('approche')" class="panel">
          <div class="max-w-[59rem] mx-auto w-full grid md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-x-16 gap-y-8 items-start">
            <h2 class="titre md:!text-[clamp(2.6rem,8vh,4rem)] md:sticky md:top-24">{{ content.coaching.approachTitle }}</h2>
            <ol class="space-y-7 md:space-y-[5vh]">
              <li v-for="(card, i) in coaching.cards" :key="`c-${i}`" class="card-in grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4" :style="{ animationDelay: `${150 + i * 180}ms` }">
                <span class="w-9 h-9 rounded-full flex items-center justify-center font-titre font-bold text-white text-sm mt-0.5" :class="i === coaching.cards.length - 1 ? 'bg-corail' : 'bg-azur'" aria-hidden="true">{{ i + 1 }}</span>
                <div>
                  <h3 class="font-titre font-bold text-encre text-xl md:text-[clamp(1.25rem,3.4vh,1.6rem)] leading-tight tracking-tight mb-2">{{ card.title }}</h3>
                  <p class="font-titre text-ardoise text-base leading-relaxed max-w-lg">{{ card.text }}</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section v-show="active === idx('newsletter')" class="panel text-white">
          <div class="max-w-[59rem] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <img src="/lila-ecriture.jpg" alt="Lila devant son ordinateur, les mains dans les cheveux" class="teinte w-32 md:w-40 aspect-[4/5] object-cover object-[60%_15%] mb-7" loading="lazy" decoding="async" />
              <h2 class="titre !text-white mb-6">{{ content.newsletter.titre }}</h2>
              <p class="text-base sm:text-lg font-titre text-white/80 leading-relaxed mb-8">
                {{ content.newsletter.texte }}
              </p>
              <a :href="content.newsletter.url" target="_blank" rel="noopener" class="btn-blanc group">
                {{ content.newsletter.bouton }}
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <ul v-if="issues.length" class="">
              <li v-for="(l, i) in issues" :key="`n-${i}`" class="card-in" :style="{ animationDelay: `${i * 90}ms` }">
                <a :href="l.url" target="_blank" rel="noopener" class="group flex items-start gap-4 py-5">
                  <span class="flex-1 min-w-0">
                    <span class="block font-plume italic text-2xl md:text-[2rem] leading-tight text-white group-hover:text-[#D9B8F5] transition-colors duration-300"><span v-if="issueParts(l.title).num" class="text-[#D9B8F5]">{{ issueParts(l.title).num }}</span> {{ issueParts(l.title).rest }}</span>
                    <span v-if="l.description" class="block text-sm font-titre text-white/65 leading-snug mt-1.5">{{ l.description }}</span>
                  </span>
                  <svg class="w-4 h-4 mt-2 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section v-if="testimonials.length" v-show="active === idx('temoignages')" class="panel">
          <div class="max-w-[59rem] mx-auto w-full flex-1 min-h-0 flex flex-col justify-center">
            <h2 class="titre shrink-0 mb-6 md:mb-[3vh]">{{ content.temoignagesTitre }}</h2>
            <div class="min-h-0 overflow-y-auto md:overflow-visible space-y-8 md:space-y-[3.2vh]">
              <figure
                v-for="(t, i) in testimonials"
                :key="`t-${i}`"
                class="card-in md:max-w-[38rem]"
                :class="['', 'md:ml-auto md:text-right', 'md:ml-[14%]'][i % 3]"
                :style="{ animationDelay: `${i * 140}ms` }"
              >
                <blockquote>
                  <p class="font-plume italic text-encre text-3xl md:text-[clamp(1.8rem,5vh,2.7rem)] leading-[1.08]">«&nbsp;{{ t.highlight }}&nbsp;»</p>
                </blockquote>
                <figcaption class="mt-2.5 font-titre text-sm text-ardoise">
                  <span class="font-semibold text-corail">{{ t.author }}</span><template v-if="t.detail">, {{ t.detail.replaceAll(' · ', ', ') }}</template>
                  <button v-if="t.quote.length" type="button" class="ml-2 font-semibold text-azur underline underline-offset-4 decoration-azur/40 hover:decoration-azur" @click="lu = i">Lire en entier</button>
                </figcaption>
              </figure>
            </div>
          </div>
          <Transition name="lecture">
            <div v-if="lu !== null" class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-10 bg-encre/40 backdrop-blur-sm" @click.self="lu = null">
              <div class="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white p-7 md:p-12 shadow-2xl" role="dialog" aria-modal="true" :aria-label="`Témoignage de ${testimonials[lu].author}`">
                <button type="button" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-ciel text-encre flex items-center justify-center hover:bg-brume" aria-label="Fermer" @click="lu = null">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
                <p class="font-plume italic text-corail text-3xl leading-tight mb-6 pr-10">«&nbsp;{{ testimonials[lu].highlight }}&nbsp;»</p>
                <div class="space-y-4">
                  <p v-for="(para, k) in testimonials[lu].quote" :key="k" class="font-titre text-ardoise leading-relaxed">{{ para }}</p>
                </div>
                <p class="font-titre text-sm text-encre mt-6"><span class="font-semibold">{{ testimonials[lu].author }}</span><template v-if="testimonials[lu].detail">, {{ testimonials[lu].detail.replaceAll(' · ', ', ') }}</template></p>
              </div>
            </div>
          </Transition>
        </section>

        <section v-if="faq.length" v-show="active === idx('faq')" class="panel">
          <div class="max-w-2xl mx-auto w-full">
            <h2 class="titre mb-8 md:mb-10">{{ content.faq.title }}</h2>
            <div class="max-h-[55vh] overflow-y-auto">
              <details v-for="(item, i) in faq" :key="`f-${i}`" class="faq-item group py-5">
                <summary class="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden">
                  <h3 class="text-base md:text-lg font-titre font-semibold text-encre">{{ item.question }}</h3>
                  <svg class="w-4 h-4 text-azur shrink-0 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p class="text-[15px] md:text-base font-titre text-ardoise leading-relaxed mt-3">{{ item.answer }}</p>
              </details>
            </div>
          </div>
        </section>

        <section v-show="active === idx('contact')" class="panel">
          <div class="max-w-[59rem] mx-auto w-full grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-16 gap-y-8 items-center">
            <div>
              <h2 class="titre md:!text-[clamp(2.6rem,8vh,4rem)] mb-5">{{ titreContact }}</h2>
              <p class="font-titre text-ardoise text-lg leading-relaxed mb-6 max-w-sm">{{ content.contact.phrase }}</p>
              <p class="text-sm font-titre text-encre/70 mb-3 select-all">{{ content.contact.email }}</p>
              <ReseauxLiens :socials="socials" />
            </div>
            <div class="bg-white shadow-[0_24px_60px_-28px_rgba(23,31,77,0.35)]">
              <div class="px-6 md:px-8 py-4 font-titre text-sm text-ardoise space-y-1.5 border-b border-brume">
                <p><span class="text-ardoise/70">À</span>&nbsp; <span class="text-encre">Lila Chibane</span></p>
                <p><span class="text-ardoise/70">Objet</span>&nbsp; <span class="text-encre">{{ content.contact.objet }}</span></p>
              </div>
              <div class="px-6 md:px-8 py-6 font-titre text-encre leading-relaxed min-h-[9rem]">
                <p>Bonjour Lila,</p>
                <p class="mt-2">{{ brouillon }}<span class="curseur" aria-hidden="true"></span></p>
              </div>
              <div class="px-6 md:px-8 pb-6 flex flex-col-reverse items-start sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-4">
                <div class="flex items-center gap-3">
                  <img src="/lila-visio.jpg" alt="" class="teinte w-10 h-10 rounded-full object-cover" aria-hidden="true" />
                  <p class="text-sm font-titre text-ardoise leading-tight max-w-[11rem]">{{ content.contact.mention }}</p>
                </div>
                <a :href="`mailto:${content.contact.email}?subject=${encodeURIComponent(content.contact.objet)}`" class="btn-azur group shrink-0">
                  {{ content.contact.ecrire }}
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
  @apply flex-1 flex flex-col justify-start md:justify-center px-6 md:px-10 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:py-[clamp(0.75rem,3vh,3rem)];
}
.faq-item summary::-webkit-details-marker { display: none; }


.curseur {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background-color: rgb(var(--accent, 162 89 217));
  animation: clignote 1s steps(1) infinite;
}
@keyframes clignote {
  50% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .curseur { animation: none; }
}
.lecture-enter-active,
.lecture-leave-active {
  transition: opacity 0.3s ease;
}
.lecture-enter-from,
.lecture-leave-to {
  opacity: 0;
}
.offre-in {
  animation: offreIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes offreIn {
  from { opacity: 0; transform: translateY(12px); }
}
@media (prefers-reduced-motion: reduce) {
  .offre-in { animation: none; }
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
