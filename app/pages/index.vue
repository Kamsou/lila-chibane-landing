<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { asText, asLink } from '@prismicio/client'
import { components as sliceComponents } from '~~/slices'

const { data: homepage } = await useHomepage()

const content = computed(() => {
  const d = homepage.value?.data || {}
  return {
    hero: {
      name: d.hero_name || "Je m'appelle Lila.",
      subtitle: d.hero_subtitle || 'Coach sportive · Peintre · Créatrice sonore · Dog sitter',
      intro1: d.hero_intro_1 || 'Quatre pratiques, un même fil : prendre soin du corps, des sens, du vivant, et de ce qui nous relie au monde.',
      intro2: d.hero_intro_2 || "Je crée les conditions pour se sentir bien, avec douceur, sans pression, à ton rythme.",
      ctaLabel: d.hero_cta_label || "S'abonner à la newsletter",
      ctaUrl: asLink(d.hero_cta_url) || 'https://jamaistroptard.substack.com/',
      ctaCaption: d.hero_cta_caption || 'Pour celles qui veulent aller plus loin',
    },
    about: {
      visible: isSectionVisible(d, 'about'),
      label: d.about_label || 'Qui suis-je ?',
      title: d.about_title || 'Un même fil, plusieurs pratiques',
      introField: d.about_intro,
      hasIntro: !!asText(d.about_intro),
      paragraphs: [
        "Je m'appelle Lila. Coach sportive, peintre, créatrice sonore et dog sitter, je vis et travaille dans le Médoc.",
        "Ce qui me porte, c'est le soin : celui du corps, des sens, du vivant. J'aime créer des espaces où l'on peut ralentir, respirer, se reconnecter à soi.",
        "Mes pratiques se nourrissent les unes les autres. Le mouvement, la matière, le son : autant de façons d'être présente au monde et de prendre soin de ce qui nous entoure.",
      ],
      image: d.about_image,
      footer: d.about_footer || '',
    },
    coaching: {
      visible: isSectionVisible(d, 'coaching'),
      title: d.coaching_title || 'Coach sportive',
      intro: asText(d.coaching_intro) || "J'accompagne les femmes actives à reprendre une activité physique adaptée, sans violence, sans pression, à leur rythme. Ton corps n'est pas un objet à transformer, c'est un système à écouter.",
      cards: (d.coaching_cards?.length ? d.coaching_cards : [
        { title: 'Mouvement intelligent', text: "Renforcement, mobilité, cardio dosé. Chaque séance est pensée pour ton corps tel qu'il est aujourd'hui." },
        { title: 'Régulation nerveuse', text: "Des outils pour sortir du mode « survie » et retrouver un quotidien plus apaisé, moins de stress, moins d'anxiété." },
        { title: 'Alimentation soutenante', text: "Pas de régime, pas de restriction. Remettre de la conscience et du plaisir dans l'assiette pour nourrir ton énergie." },
      ]),
      ctaLabel: d.coaching_cta_label || 'Réserver un bilan gratuit',
      ctaUrl: asLink(d.coaching_cta_url) || 'https://calendly.com/lilacoach/bilanpersonnalise',
      ctaCaption: d.coaching_cta_caption || '30 minutes · gratuit · en visio · sans engagement',
    },
    peinture: {
      visible: isSectionVisible(d, 'peinture'),
      title: d.peinture_title || 'Peinture',
      intro: asText(d.peinture_intro) || "[Ici, quelques lignes sur ta démarche : ce qui t'anime quand tu peins, tes thèmes, tes matières, ce que tu cherches à exprimer.]",
      footer: d.peinture_footer || 'Galerie complète à venir',
    },
    son: {
      visible: isSectionVisible(d, 'son'),
      title: d.son_title || 'Création sonore',
      intro: asText(d.son_intro) || "[Ici, quelques lignes sur ton univers sonore : le type de créations (paysages sonores, compositions, field recording...), le contexte (installations, performances, podcasts...), ce que tu cherches à faire ressentir.]",
      footer: d.son_footer || 'Sélection à venir',
    },
    dog: {
      visible: isSectionVisible(d, 'dog'),
      title: d.dog_title || 'Dog sitting',
      intro: asText(d.dog_intro) || "Je prends soin de ton chien comme s'il était le mien. Promenades, garde, présence rassurante : à chaque animal son rythme, à chaque humain sa tranquillité d'esprit.",
      cards: (d.dog_cards?.length ? d.dog_cards : [
        { title: 'Promenades & sorties', text: "Des balades dans le Médoc, adaptées à l'énergie et au caractère de ton chien. Forêt, plage, sentiers." },
        { title: 'Garde à domicile', text: "Ton chien reste chez lui, dans ses repères. Je viens, je m'installe, je veille. Pour les week-ends ou les vacances." },
        { title: 'Visites & soins', text: "Passage quotidien : nourrir, sortir, câliner. Pour les absences courtes ou les besoins ponctuels." },
      ]),
      pricingSlices: d.dog_pricing_slices || [],
      ctaLabel: d.dog_cta_label || 'Me parler de ton chien',
      ctaCaption: d.dog_cta_caption || 'Médoc, Gironde · tarifs sur demande',
    },
    contact: {
      visible: isSectionVisible(d, 'contact'),
      label: d.contact_label || 'Contact',
      title: d.contact_title || "Envie d'échanger ?",
      intro: asText(d.contact_intro) || 'Que ce soit pour un coaching, une collaboration artistique ou simplement discuter, je réponds personnellement à chaque message.',
      buttonLabel: d.contact_button_label || 'Envoyer',
      successMessage: d.contact_success || 'Merci, ton message est bien arrivé. Je te réponds très vite.',
    },
  }
})

const SECTION_ORDER = ['about', 'coaching', 'peinture', 'son', 'dog', 'contact']
const NUMBERED_SECTIONS = ['coaching', 'peinture', 'son', 'dog']

const sectionNumber = computed(() => {
  const map = {}
  let n = 0
  for (const key of NUMBERED_SECTIONS) {
    if (content.value[key]?.visible) {
      n += 1
      map[key] = String(n).padStart(2, '0')
    }
  }
  return map
})

const sectionBg = computed(() => {
  const map = {}
  let i = 0
  for (const key of SECTION_ORDER) {
    if (content.value[key]?.visible) {
      map[key] = i % 2 === 0 ? 'bg-sand' : 'bg-cream'
      i += 1
    }
  }
  return map
})

const cardBg = computed(() => {
  const map = {}
  for (const key in sectionBg.value) {
    map[key] = sectionBg.value[key] === 'bg-sand' ? 'bg-cream' : 'bg-sand'
  }
  return map
})

useSeoMeta({
  title: 'Lila Chibane · Coach sportive · Peintre · Création sonore · Dog sitting',
  description: 'Lila Chibane, coach sportive, peintre, créatrice sonore et dog sitter. Quatre façons de faire du bien au corps, à l\'esprit, et aux compagnons à quatre pattes.',
  ogTitle: 'Lila Chibane · Coach · Peintre · Son · Dog sitting',
  ogDescription: 'Quatre façons de prendre soin : du corps, des sens, et des compagnons à quatre pattes.',
  ogImage: 'https://lilachibane.com/IMG_2553.jpg',
  ogUrl: 'https://lilachibane.com',
  ogType: 'website',
  twitterTitle: 'Lila Chibane · Coach · Peintre · Son · Dog sitting',
  twitterDescription: 'Quatre façons de prendre soin : du corps, des sens, et des compagnons à quatre pattes.',
  twitterImage: 'https://lilachibane.com/IMG_2553.jpg',
})

const paintingPlaceholders = [
  { medium: 'Huile sur toile, 80×60 cm' },
  { medium: 'Acrylique, 100×100 cm' },
  { medium: 'Technique mixte, 60×40 cm' },
  { medium: 'Huile sur bois, 50×50 cm' },
  { medium: 'Encre et pigments, 70×50 cm' },
  { medium: 'Acrylique sur papier, 40×30 cm' },
]
const trackPlaceholders = [
  { type: 'Field recording, paysage sonore', duration: '3:42' },
  { type: 'Composition électro-acoustique', duration: '5:17' },
  { type: 'Installation sonore, performance', duration: '8:03' },
]

/** @type {import('vue').Ref<'idle' | 'success' | 'error'>} */
const formStatus = ref('idle')
const scrollIndicatorVisible = ref(true)
const isSubmitting = ref(false)
let revealObserver = null

const handleScroll = () => {
  if (window.scrollY > 50) {
    scrollIndicatorVisible.value = false
    window.removeEventListener('scroll', handleScroll)
  }
}

const scrollToContact = (e) => {
  e.preventDefault()
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const pricingAllOpen = ref(false)
const togglePricingAll = () => {
  pricingAllOpen.value = !pricingAllOpen.value
  document.querySelectorAll('.pricing-category').forEach((el) => {
    if (pricingAllOpen.value) el.setAttribute('open', '')
    else el.removeAttribute('open')
  })
}

const handleSubmit = async (e) => {
  isSubmitting.value = true
  formStatus.value = 'idle'
  const form = e.target
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      form.reset()
      formStatus.value = 'success'
    } else {
      formStatus.value = 'error'
    }
  } catch (err) {
    formStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        name: 'Lila Chibane',
        description: 'Coach sportive, peintre, créatrice sonore et dog sitter. Coaching sport-santé, art visuel, création audio et garde de chiens dans le Médoc.',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/IMG_2553.jpg',
        email: 'lila.chibane@outlook.com',
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Médoc, Gironde' },
          { '@type': 'Country', name: 'France' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Nouvelle-Aquitaine',
          addressCountry: 'FR',
        },
        priceRange: '€€',
        serviceType: ['Coach sportif', 'Coach santé', 'Coaching en visio', 'Coaching en présentiel', 'Peinture', 'Création sonore', 'Dog sitting', 'Garde de chien à domicile', 'Promenade de chien'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Lila Chibane',
        description: 'Coach sportive, peintre et créatrice sonore.',
        url: 'https://lilachibane.com',
        inLanguage: 'fr',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Lila Chibane',
        jobTitle: 'Coach sportive, peintre, créatrice sonore et dog sitter',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/IMG_2553.jpg',
        email: 'lila.chibane@outlook.com',
        knowsAbout: ['Activité physique adaptée', 'Régulation nerveuse', 'Coaching santé', 'Peinture', 'Art visuel', 'Création sonore', 'Sound design', 'Dog sitting', 'Garde de chien', 'Bien-être animal'],
      }),
    },
  ],
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  nextTick(() => {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (revealObserver) revealObserver.disconnect()
})
</script>

<template>
  <AppHeader />

  <main class="bg-cream">
    <section id="hero" class="min-h-screen md:h-screen md:max-h-screen bg-bleu grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <!-- Photo -->
      <div class="h-[50vh] md:h-auto overflow-hidden hero-fade" style="animation-delay: 0.1s">
        <img
          src="/test-2.jpeg"
          alt="Lila Chibane"
          width="1200"
          height="1800"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          class="w-full h-full object-cover object-[center_25%]"
        />
      </div>

      <!-- Texte -->
      <div class="flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-16 md:py-20">
        <div class="max-w-xl">
          <h1
            class="font-display font-normal text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-10 hero-fade"
            style="animation-delay: 0.3s"
          >
            {{ content.hero.name }}
          </h1>

          <p
            class="text-sm font-body font-light text-white/60 mb-6 md:mb-8 hero-fade"
            style="animation-delay: 0.45s"
          >
            {{ content.hero.subtitle }}
          </p>

          <div class="space-y-5 md:space-y-6 mb-10 md:mb-12">
            <p
              class="text-base sm:text-lg font-body font-light text-white/85 leading-relaxed hero-fade"
              style="animation-delay: 0.6s"
            >
              {{ content.hero.intro1 }}
            </p>
            <p
              class="text-base sm:text-lg font-body font-light text-white/85 leading-relaxed hero-fade"
              style="animation-delay: 0.75s"
            >
              {{ content.hero.intro2 }}
            </p>
          </div>

          <div class="hero-fade inline-block" style="animation-delay: 0.9s">
            <a
              :href="content.hero.ctaUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-white text-bleu text-sm font-body font-normal tracking-wide py-4 px-8 rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-300"
            >
              <span class="sparkle">✦</span> {{ content.hero.ctaLabel }}
            </a>
            <p class="text-[11px] font-body font-light text-white/50 mt-3 text-center">
              {{ content.hero.ctaCaption }}
            </p>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        :class="scrollIndicatorVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <div class="w-[1px] h-8 bg-white/30 mx-auto scroll-pulse"></div>
      </div>
    </section>

    <section v-if="content.about.visible" id="qui-suis-je" :class="sectionBg.about" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          <!-- Portrait -->
          <div class="reveal">
            <div class="aspect-[4/5] overflow-hidden rounded-2xl">
              <PrismicImage
                v-if="content.about.image?.url"
                :field="content.about.image"
                class="w-full h-full object-cover"
              />
              <img
                v-else
                src="/test-2.jpeg"
                alt="Lila Chibane"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover object-[center_25%]"
              />
            </div>
          </div>

          <!-- Texte -->
          <div>
            <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">{{ content.about.label }}</span>
            <h2 class="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal">
              {{ content.about.title }}
            </h2>
            <PrismicRichText
              v-if="content.about.hasIntro"
              :field="content.about.introField"
              class="about-richtext reveal"
            />
            <div v-else class="space-y-5 reveal">
              <p
                v-for="(para, i) in content.about.paragraphs"
                :key="`about-${i}`"
                class="text-base sm:text-lg font-body font-light text-gray leading-relaxed"
              >
                {{ para }}
              </p>
            </div>
            <p v-if="content.about.footer" class="text-xs font-body font-light text-gray-light italic mt-8 reveal">
              {{ content.about.footer }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="content.coaching.visible" id="coaching" :class="sectionBg.coaching" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">{{ sectionNumber.coaching }}</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal flex items-center gap-4 md:gap-6">
            {{ content.coaching.title }}
            <svg class="w-10 h-10 md:w-14 md:h-14 text-bleu flex-shrink-0 section-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="24" cy="8" r="4" />
              <path d="M24 14v10" />
              <path d="M16 44l4-14h8l4 14" />
              <path d="M14 22h20" class="icon-draw" />
              <path d="M18 16l-6 10" />
              <path d="M30 16l6 10" />
              <circle cx="10" cy="28" r="2" class="icon-pulse" />
              <circle cx="38" cy="28" r="2" class="icon-pulse" style="animation-delay: 0.5s" />
            </svg>
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            {{ content.coaching.intro }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">
          <div
            v-for="(card, i) in content.coaching.cards"
            :key="`coaching-${i}`"
            class="rounded-xl p-6 md:p-7 reveal"
            :class="[cardBg.coaching, i === 2 ? 'sm:col-span-2 md:col-span-1' : '']"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <h3 class="text-lg font-display font-normal text-warm mb-3">{{ card.title }}</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed">{{ card.text }}</p>
          </div>
        </div>

        <div class="text-center mt-10 md:mt-14 reveal">
          <a
            :href="content.coaching.ctaUrl"
            target="_blank"
            rel="noopener"
            class="btn-warm inline-block"
          >
            {{ content.coaching.ctaLabel }}
          </a>
          <p class="text-xs font-body text-gray-light mt-4 tracking-wide">
            {{ content.coaching.ctaCaption }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="content.peinture.visible" id="peinture" :class="sectionBg.peinture" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">{{ sectionNumber.peinture }}</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal flex items-center gap-4 md:gap-6">
            {{ content.peinture.title }}
            <svg class="w-10 h-10 md:w-14 md:h-14 text-bleu flex-shrink-0 section-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 38 Q14 20 24 14 Q34 8 38 10" class="icon-draw" />
              <path d="M38 10 L42 6" />
              <path d="M42 6 C44 4 46 6 44 8 L40 12" />
              <circle cx="12" cy="36" r="5" fill="currentColor" opacity="0.15" class="icon-pulse" />
              <circle cx="22" cy="26" r="3" fill="currentColor" opacity="0.1" class="icon-pulse" style="animation-delay: 0.4s" />
            </svg>
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            {{ content.peinture.intro }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] mt-10 md:mt-12">
          <div
            v-for="(painting, i) in paintingPlaceholders"
            :key="`painting-${i}`"
            class="aspect-[4/3] flex flex-col items-center justify-center p-4 reveal"
            :class="cardBg.peinture"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <svg class="w-8 h-8 text-gray-faint mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-gray">Titre de l'œuvre</p>
            <p class="text-xs font-body text-gray-light">{{ painting.medium }}</p>
          </div>
        </div>

        <div class="mt-10 md:mt-14 reveal">
          <span class="text-xs font-body font-light text-gray-light italic">
            {{ content.peinture.footer }}
          </span>
        </div>
      </div>
    </section>

    <section v-if="content.son.visible" id="creation-sonore" :class="sectionBg.son" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">{{ sectionNumber.son }}</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal flex items-center gap-4 md:gap-6">
            {{ content.son.title }}
            <svg class="w-10 h-10 md:w-14 md:h-14 text-bleu flex-shrink-0 section-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M6 24c0-8 4-14 10-14s8 6 8 14-2 14-8 14S6 32 6 24z" class="icon-wave" />
              <path d="M24 24c0-10 4-18 10-18s8 8 8 18-2 18-8 18-10-8-10-18z" class="icon-wave" style="animation-delay: 0.3s" />
            </svg>
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            {{ content.son.intro }}
          </p>
        </div>

        <div class="mt-10 md:mt-12">
          <div
            v-for="(track, i) in trackPlaceholders"
            :key="`track-${i}`"
            class="border-b border-gray-faint py-6 md:py-8 flex items-center justify-between reveal"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-faint flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-gray-light ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div>
                <p class="text-base font-body font-normal text-warm">Titre de la pièce sonore</p>
                <p class="text-xs font-body text-gray-light">{{ track.type }}</p>
              </div>
            </div>
            <span class="text-sm font-body text-gray-light">{{ track.duration }}</span>
          </div>
        </div>

        <div class="mt-10 md:mt-14 reveal">
          <span class="text-xs font-body font-light text-gray-light italic">
            {{ content.son.footer }}
          </span>
        </div>
      </div>
    </section>

    <section v-if="content.dog.visible" id="dog-sitting" :class="sectionBg.dog" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">{{ sectionNumber.dog }}</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal flex items-center gap-4 md:gap-6">
            {{ content.dog.title }}
            <svg class="w-10 h-10 md:w-14 md:h-14 text-bleu flex-shrink-0 section-icon" viewBox="0 0 48 48" fill="currentColor" stroke="none">
              <!-- Coussinet métacarpien : pointe arrondie en haut, base large avec 3 lobes -->
              <path
                d="M 24 18
                   C 28 18 31 19 33 22
                   C 35 25 37 28 37 32
                   C 37 35 36 37 34 38.5
                   C 32 39.7 30.5 39.2 29 38.2
                   C 28 37.6 27 37.6 26 38.3
                   C 25.2 38.9 24.8 39.3 24 39.3
                   C 23.2 39.3 22.8 38.9 22 38.3
                   C 21 37.6 20 37.6 19 38.2
                   C 17.5 39.2 16 39.7 14 38.5
                   C 12 37 11 35 11 32
                   C 11 28 13 25 15 22
                   C 17 19 20 18 24 18 Z"
                class="paw-pad paw-center"
              />
              <!-- 4 coussinets digitaux : ovales pleins, orientés radialement -->
              <g transform="rotate(-30 9 18)">
                <ellipse cx="9" cy="18" rx="3.5" ry="5" class="paw-pad paw-toe" style="animation-delay: 0s" />
              </g>
              <g transform="rotate(-10 18 10)">
                <ellipse cx="18" cy="10" rx="3.5" ry="5.5" class="paw-pad paw-toe" style="animation-delay: 0.18s" />
              </g>
              <g transform="rotate(10 30 10)">
                <ellipse cx="30" cy="10" rx="3.5" ry="5.5" class="paw-pad paw-toe" style="animation-delay: 0.36s" />
              </g>
              <g transform="rotate(30 39 18)">
                <ellipse cx="39" cy="18" rx="3.5" ry="5" class="paw-pad paw-toe" style="animation-delay: 0.54s" />
              </g>
            </svg>
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            {{ content.dog.intro }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">
          <div
            v-for="(card, i) in content.dog.cards"
            :key="`dog-${i}`"
            class="rounded-xl p-6 md:p-7 reveal"
            :class="[cardBg.dog, i === 2 ? 'sm:col-span-2 md:col-span-1' : '']"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <h3 class="text-lg font-display font-normal text-warm mb-3">{{ card.title }}</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed">{{ card.text }}</p>
          </div>
        </div>

        <div v-if="content.dog.pricingSlices.length" class="max-w-5xl mx-auto mt-10 md:mt-14">
          <div class="flex justify-end mb-3 md:mb-4">
            <button
              type="button"
              @click="togglePricingAll"
              class="text-xs font-body text-gray-light hover:text-bleu transition-colors duration-200"
            >
              {{ pricingAllOpen ? 'Tout replier' : 'Tout déplier' }}
            </button>
          </div>
          <div class="columns-1 sm:columns-2 gap-5 md:gap-6">
            <SliceZone :slices="content.dog.pricingSlices" :components="sliceComponents" :context="{ cardBg: cardBg.dog }" />
          </div>
        </div>

        <div class="text-center mt-10 md:mt-14 reveal">
          <a
            :href="content.contact.visible ? '#contact' : 'mailto:lila.chibane@outlook.com'"
            @click="content.contact.visible && scrollToContact($event)"
            class="btn-warm inline-block"
          >
            {{ content.dog.ctaLabel }}
          </a>
          <p class="text-xs font-body text-gray-light mt-4 tracking-wide">
            {{ content.dog.ctaCaption }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="content.contact.visible" id="contact" :class="sectionBg.contact" class="scroll-mt-16 md:scroll-mt-20 py-16 md:py-20 lg:py-24 px-6 md:px-10">
      <!-- CTA -->
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <p class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 reveal">{{ content.contact.label }}</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] reveal">
          {{ content.contact.title }}
        </h2>
        <p class="text-base sm:text-lg font-body font-light text-gray mt-6 md:mt-8 max-w-lg mx-auto leading-relaxed reveal">
          {{ content.contact.intro }}
        </p>
      </div>

      <!-- Form -->
      <div class="max-w-lg mx-auto">
        <form
          action="https://formspree.io/f/movwedpw"
          method="POST"
          class="space-y-8 md:space-y-10 reveal"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label for="name" class="text-xs font-body font-normal tracking-wide text-gray-light mb-3 block">Prénom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ton prénom"
              required
              autocomplete="given-name"
              class="form-input"
            />
          </div>
          <div>
            <label for="email" class="text-xs font-body font-normal tracking-wide text-gray-light mb-3 block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ton@email.com"
              required
              autocomplete="email"
              inputmode="email"
              class="form-input"
            />
          </div>
          <div>
            <label for="message" class="text-xs font-body font-normal tracking-wide text-gray-light mb-3 block">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Dis-moi ce qui t'amène..."
              rows="5"
              required
              class="form-input resize-none"
            ></textarea>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn-warm inline-flex items-center justify-center gap-2"
              :disabled="isSubmitting"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" class="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="opacity-75" />
              </svg>
              {{ isSubmitting ? 'Envoi...' : content.contact.buttonLabel }}
            </button>
            <p
              v-if="formStatus === 'success'"
              class="text-sm font-body font-light text-bleu mt-6"
              role="status"
              aria-live="polite"
            >
              {{ content.contact.successMessage }}
            </p>
            <p
              v-else-if="formStatus === 'error'"
              class="text-sm font-body font-light text-warm mt-6"
              role="alert"
            >
              Oups, l'envoi n'a pas fonctionné. Tu peux réessayer ou m'écrire directement à
              <a href="mailto:lila.chibane@outlook.com" class="underline">lila.chibane@outlook.com</a>.
            </p>
          </div>
        </form>
      </div>
    </section>
  </main>

  <AppFooter />
</template>

<style scoped lang="postcss">
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-fade {
  opacity: 0;
  transform: translateY(16px);
  animation: heroFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes heroFadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.scroll-pulse {
  animation: scrollPulse 2.5s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.2; transform: scaleY(1); }
  50% { opacity: 0.6; transform: scaleY(1.15); }
}

.btn-warm {
  @apply bg-bleu text-white text-sm font-body font-normal tracking-wide py-4 px-10 rounded-full
         hover:opacity-90 active:scale-[0.98]
         transition-all duration-300;
}

.section-icon {
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.4s;
}
.reveal.visible .section-icon {
  opacity: 1;
  transform: scale(1);
}

.icon-pulse {
  animation: iconPulse 2s ease-in-out infinite;
}
@keyframes iconPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

.icon-draw {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: iconDraw 2s ease-out forwards;
  animation-delay: 0.8s;
}
.reveal.visible .icon-draw {
  animation: iconDraw 2s ease-out forwards;
}
@keyframes iconDraw {
  to { stroke-dashoffset: 0; }
}

.icon-wave {
  animation: iconWave 3s ease-in-out infinite;
}
@keyframes iconWave {
  0%, 100% { transform: scaleX(1); opacity: 0.6; }
  50% { transform: scaleX(1.1); opacity: 1; }
}

:deep(.about-richtext) {
  @apply space-y-5;
}
:deep(.about-richtext p) {
  @apply text-base sm:text-lg font-body font-light text-gray leading-relaxed;
}
:deep(.about-richtext strong) {
  @apply font-normal text-warm;
}
:deep(.about-richtext em) {
  @apply italic;
}

.form-input {
  @apply bg-transparent border-b border-gray-faint px-0 py-3
         text-warm font-body text-base
         placeholder:text-gray-light
         focus:outline-none focus:border-bronze
         transition-colors duration-300 w-full;
}

.sparkle {
  display: inline-block;
  color: #1B3FA0;
  animation: sparkle 2s ease-in-out infinite;
  margin-right: 4px;
}
@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(15deg); }
}

.paw-pad {
  transform-origin: center;
  transform-box: fill-box;
}
.paw-toe {
  animation: pawTap 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.paw-center {
  animation: pawPress 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: 0.7s;
}
@keyframes pawTap {
  0%, 70%, 100% { transform: scale(1); opacity: 1; }
  18% { transform: scale(1.12); opacity: 0.65; }
}
@keyframes pawPress {
  0%, 70%, 100% { transform: scale(1); opacity: 1; }
  18% { transform: scale(1.04); opacity: 0.75; }
}

html { scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal,
  .hero-fade,
  .scroll-pulse,
  .section-icon,
  .icon-pulse,
  .icon-draw,
  .icon-wave,
  .sparkle,
  .paw-toe,
  .paw-center {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    stroke-dashoffset: 0 !important;
  }
}
</style>
