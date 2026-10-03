<script setup>
const { content, faqFor } = await useSiteContent()

const coaching = computed(() => content.value.coaching)
const faq = computed(() => (content.value.faq.visible ? faqFor('coaching') : []))
const testimonials = computed(() => coaching.value.testimonials || [])
const socials = computed(() => content.value.socials.filter((s) => s.key !== 'instagram-dog'))

const navLinks = computed(() => [
  { label: 'Approche', to: '#approche' },
  ...(testimonials.value.length ? [{ label: 'Témoignages', to: '#temoignages' }] : []),
  ...(faq.value.length ? [{ label: 'Questions', to: '#questions' }] : []),
  { label: 'Blog', to: '/blog' },
])

// "Coach sportive" : un mot par ligne, apparition mot à mot
const titleWords = computed(() => (coaching.value.title || '').trim().split(/\s+/))

const cardThemes = [
  { bg: 'bg-bleu', accent: 'text-terra-soft' },
  { bg: 'bg-terra', accent: 'text-ink' },
  { bg: 'bg-mat', accent: 'text-terra-soft' },
]

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
  <div class="home bg-paper text-ink">
    <HomeNav :links="navLinks" />

    <main>
      <!-- Hero -->
      <section class="hero relative overflow-hidden bg-bleu text-paper">
        <div class="hero-glow hero-glow--a" aria-hidden="true"></div>
        <div class="hero-glow hero-glow--b" aria-hidden="true"></div>

        <div class="relative max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-20 md:pt-28 md:pb-14 grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-8 items-center min-h-[100svh]">
          <div class="order-2 md:order-1">
            <h1 class="hero-title">
              <span v-for="(w, i) in titleWords" :key="w + i" class="hero-line"><span class="hero-word" :style="{ '--d': `${80 + i * 120}ms` }">{{ w }}</span></span>
            </h1>

            <p class="hero-in text-base sm:text-lg font-body font-light text-paper/80 leading-relaxed max-w-xl mt-7 md:mt-9 mb-9" style="--d: 360ms">
              {{ coaching.intro }}
            </p>

            <div class="hero-in flex flex-wrap items-center gap-x-6 gap-y-4" style="--d: 480ms">
              <NuxtLink v-magnetic to="/feuille-de-route" class="btn-big group">
                Remplir la feuille de route
                <span class="btn-big-arrow">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </NuxtLink>
              <p class="text-[13px] font-body text-paper/60">2 minutes · gratuit<span class="sm:hidden"> ·</span><br class="hidden sm:block"> sans engagement</p>
            </div>
          </div>

          <div class="order-1 md:order-2 relative w-full max-w-[13.5rem] sm:max-w-xs md:max-w-none mx-auto">
            <div class="hero-in relative aspect-[4/5]" style="--d: 150ms">
              <span class="ring ring--1" aria-hidden="true"></span>
              <span class="ring ring--2" aria-hidden="true"></span>
              <div class="blob">
                <img src="/coaching-sportif.jpeg" alt="Lila Chibane, coach sportive, en étirement sur un tapis" class="w-full h-full object-cover object-[50%_30%]" fetchpriority="high" loading="eager" decoding="async" />
              </div>
            </div>
            <p class="hero-in mt-6 md:mt-8 text-center text-[13px] font-body text-paper/60" style="--d: 300ms">
              Avensan, Médoc · et en visio partout en France
            </p>
          </div>
        </div>
      </section>

      <!-- La courbe : 45 et 60 ans -->
      <section class="screen max-w-6xl mx-auto px-5 md:px-10 py-20">
        <HomeAgeCurve />
      </section>

      <!-- Pause respiration -->
      <section id="pause" class="anchor screen max-w-6xl mx-auto px-5 md:px-10 py-20">
        <HomeBreathingPause />
      </section>

      <!-- Approche -->
      <section id="approche" class="anchor screen max-w-6xl mx-auto px-5 md:px-10 py-20">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 lg:mb-12">
          <h2 v-reveal class="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.92] tracking-tight">
            {{ coaching.approachTitle }}
          </h2>
          <p v-reveal="{ delay: 120 }" class="max-w-xs text-base font-body font-light text-ink/65 leading-relaxed">
            Trois engagements, pour que ton corps redevienne un terrain de jeu, pas un chantier.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-4 lg:gap-5">
          <article
            v-for="(card, i) in coaching.cards"
            :key="`c-${i}`"
            v-reveal="{ delay: i * 120 }"
            class="approach-card"
            :class="cardThemes[i % cardThemes.length].bg"
          >
            <div class="h-[11.5rem] mb-6">
              <HomeApproachVisual :kind="i" />
            </div>
            <h3 class="font-display text-2xl lg:text-[1.7rem] font-medium leading-[1.08] tracking-tight mb-3">{{ card.title }}</h3>
            <p class="text-[15px] font-body font-light leading-relaxed opacity-85">{{ card.text }}</p>
          </article>
        </div>
      </section>

      <!-- Témoignages -->
      <section v-if="testimonials.length" id="temoignages" class="anchor screen bg-bleu py-20 rounded-t-[2.5rem] md:rounded-t-[4rem] relative">
        <HomeTestimonials :items="testimonials" />
        <div class="w-full max-w-6xl mx-auto px-5 md:px-10 mt-8">
          <NuxtLink to="/feuille-de-route" class="group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-body text-paper/75 hover:text-paper transition-colors duration-300">
            Toi aussi, prête à t'y mettre&nbsp;?
            <span class="underline underline-offset-4 decoration-terra-soft decoration-2">Remplir la feuille de route</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>
        </div>
      </section>

      <!-- FAQ -->
      <section v-if="faq.length" id="questions" class="anchor screen max-w-6xl mx-auto px-5 md:px-10 py-20 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
        <h2 v-reveal class="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[0.98] tracking-tight md:sticky md:top-28 self-start">
          {{ content.faq.title }}
        </h2>
        <div>
          <details v-for="(item, i) in faq" :key="`f-${i}`" v-reveal="{ delay: i * 60 }" class="faq group">
            <summary class="flex items-center justify-between gap-6 cursor-pointer list-none py-6">
              <h3 class="text-lg md:text-xl font-display font-medium">{{ item.question }}</h3>
              <span class="faq-icon">
                <svg class="w-4 h-4 transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </summary>
            <p class="text-base font-body font-light text-ink/70 leading-relaxed pb-6 -mt-1 max-w-2xl">{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <!-- Appel final -->
      <section id="contact" class="anchor screen relative overflow-hidden bg-terra text-paper py-20">
        <div class="w-full max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-[1.3fr_0.7fr] gap-14 md:gap-10 items-center">
          <div>
            <h2 v-reveal class="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.92] tracking-tight mb-6">
              {{ content.contact.title }}
            </h2>
            <p v-reveal="{ delay: 100 }" class="text-base md:text-lg font-body font-light text-paper/85 leading-relaxed max-w-lg mb-8">
              Réponds à quelques questions pour préparer un premier échange vraiment utile pour toi.
            </p>
            <div v-reveal="{ delay: 180 }" class="flex flex-wrap items-center gap-x-6 gap-y-4 mb-10">
              <NuxtLink v-magnetic to="/feuille-de-route" class="btn-big btn-big--ink group">
                Remplir la feuille de route
                <span class="btn-big-arrow">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </NuxtLink>
              <p class="text-[13px] font-body text-paper/75">2 minutes · gratuit · sans engagement</p>
            </div>

            <div v-reveal="{ delay: 240 }" class="flex flex-col gap-4 text-[15px] font-body text-paper/80">
              <p>
                ou écris-moi à
                <a href="mailto:lila.chibane.pro@outlook.com" class="text-paper underline underline-offset-4 decoration-paper/40 hover:decoration-paper transition-colors">lila.chibane.pro@outlook.com</a>
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <a :href="content.hero.ctaUrl" target="_blank" rel="noopener" class="chip-link">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  {{ content.hero.ctaLabel }}
                </a>
                <a v-for="s in socials" :key="s.key" :href="s.url" target="_blank" rel="noopener" :aria-label="s.label" class="chip-link">
                  <svg v-if="s.type === 'instagram'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" /></svg>
                  <svg v-else class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.93V21H10z" /></svg>
                  {{ s.short }}
                </a>
              </div>
            </div>
          </div>

          <figure v-reveal="{ type: 'scale', delay: 150 }" class="max-w-[18rem] md:max-w-[20rem] mx-auto w-full">
            <img src="/test-2.jpeg" alt="Lila Chibane en ville, écharpe bleue" class="w-full aspect-[4/5] max-h-[62svh] object-cover object-[60%_45%] rounded-[1.75rem]" loading="lazy" decoding="async" />
            <figcaption class="mt-4 text-[13px] font-body text-paper/75">C'est moi, Lila. Je réponds personnellement à chaque message.</figcaption>
          </figure>
        </div>
      </section>
    </main>

    <HomeFooter />
  </div>
</template>

<style scoped lang="postcss">
/* Grain léger sur toute la page */
.home::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.07;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Sur mobile la navigation recouvre le haut ; dès md, chaque section intègre déjà sa place */
.anchor { @apply scroll-mt-20 md:scroll-mt-0; }

/* Hero */
.hero-title {
  @apply font-display font-medium tracking-[-0.045em] leading-[0.88];
  font-size: clamp(3.4rem, min(9.6vw, 15.5svh), 8.6rem);
}
.hero-line {
  @apply block overflow-hidden pb-[0.08em];
}
.hero-word {
  @apply inline-block;
  animation: wordUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes wordUp {
  from { transform: translateY(105%) rotate(4deg); }
  to { transform: none; }
}
.hero-in {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}

.hero-glow {
  @apply absolute rounded-full pointer-events-none;
  filter: blur(90px);
}
.hero-glow--a {
  width: 38rem; height: 38rem; right: -10rem; top: -8rem;
  background: rgba(238, 138, 99, 0.45);
  animation: drift 18s ease-in-out infinite alternate;
}
.hero-glow--b {
  width: 32rem; height: 32rem; left: -12rem; bottom: -14rem;
  background: rgba(110, 150, 255, 0.45);
  animation: drift 22s ease-in-out infinite alternate-reverse;
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(-4rem, 3rem) scale(1.15); }
}

.blob {
  @apply absolute inset-0 overflow-hidden;
  border-radius: 58% 42% 46% 54% / 52% 44% 56% 48%;
  animation: morph 14s ease-in-out infinite;
  box-shadow: 0 50px 100px -40px rgba(10, 12, 30, 0.7);
}
@keyframes morph {
  0%, 100% { border-radius: 58% 42% 46% 54% / 52% 44% 56% 48%; }
  33% { border-radius: 44% 56% 60% 40% / 42% 58% 42% 58%; }
  66% { border-radius: 52% 48% 38% 62% / 60% 40% 60% 40%; }
}
.ring {
  @apply absolute rounded-full border border-paper/25 pointer-events-none;
  inset: -6%;
  animation: breathe 10s ease-in-out infinite;
}
.ring--2 {
  inset: -14%;
  border-style: dashed;
  border-color: rgba(244, 238, 227, 0.15);
  animation-delay: -1.5s;
}
@keyframes breathe {
  0%, 100% { transform: scale(0.96); opacity: 0.6; }
  40% { transform: scale(1.04); opacity: 1; }
}



/* Une section = un écran (portable 14 pouces et plus). Le haut laisse la place à la navigation. */
.screen {
  @apply md:min-h-[100svh] md:flex md:flex-col md:justify-center md:pt-24 md:pb-10;
}

/* Approche */
.approach-card {
  @apply rounded-[1.75rem] p-6 lg:p-7 text-paper flex flex-col;
}

/* FAQ */
.faq { @apply border-b border-ink/15; }
.faq summary::-webkit-details-marker { display: none; }
.faq-icon {
  @apply w-10 h-10 shrink-0 rounded-full border border-ink/20 grid place-items-center transition-colors duration-300;
}
.faq[open] .faq-icon { @apply bg-ink text-paper border-ink; }

/* Appel final */
.chip-link {
  @apply inline-flex items-center gap-2 h-10 px-4 rounded-full bg-paper/10 border border-paper/20 text-paper/90
         hover:bg-paper hover:text-terra transition-colors duration-300;
}

@media (prefers-reduced-motion: reduce) {
  .hero-word, .hero-in, .hero-glow, .blob, .ring {
    animation: none;
  }
}
</style>
