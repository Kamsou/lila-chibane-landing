<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

useSeoMeta({
  title: 'Lila Chibane · Coach sportive · Peintre · Création sonore',
  description: 'Lila Chibane, coach sportive, peintre et créatrice sonore. Trois façons de faire du bien au corps et à l\'esprit.',
  ogTitle: 'Lila Chibane · Coach · Peintre · Son',
  ogDescription: 'Trois façons de faire du bien au corps et à l\'esprit.',
  ogImage: 'https://lilachibane.com/IMG_2553.jpg',
  ogUrl: 'https://lilachibane.com',
  ogType: 'website',
  twitterTitle: 'Lila Chibane · Coach · Peintre · Son',
  twitterDescription: 'Trois façons de faire du bien au corps et à l\'esprit.',
  twitterImage: 'https://lilachibane.com/IMG_2553.jpg',
})

const scrolled = ref(false)
const isMobileMenuOpen = ref(false)
const scrollIndicatorVisible = ref(true)
const isSubmitting = ref(false)
let revealObserver = null

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
  if (window.scrollY > 50) scrollIndicatorVisible.value = false
}

const scrollTo = (e, id) => {
  e.preventDefault()
  isMobileMenuOpen.value = false
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async (e) => {
  isSubmitting.value = true
  const form = e.target
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    if (res.ok) form.reset()
  } catch (err) {
    // silent
  } finally {
    isSubmitting.value = false
  }
}

const navLinks = [
  { label: 'Coaching', href: '#coaching' },
  { label: 'Peinture', href: '#peinture' },
  { label: 'Son', href: '#creation-sonore' },
  { label: 'Blog', href: '/blog', external: true },
  { label: 'Contact', href: '#contact' },
]

// JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        name: 'Lila Chibane',
        description: 'Coach sportive, peintre et créatrice sonore. Coaching sport-santé, art visuel et création audio.',
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
        serviceType: ['Coach sportif', 'Coach santé', 'Coaching en visio', 'Coaching en présentiel', 'Peinture', 'Création sonore'],
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
        jobTitle: 'Coach sportive, peintre et créatrice sonore',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/IMG_2553.jpg',
        email: 'lila.chibane@outlook.com',
        knowsAbout: ['Activité physique adaptée', 'Régulation nerveuse', 'Coaching santé', 'Peinture', 'Art visuel', 'Création sonore', 'Sound design'],
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
  <!-- ==================== NAVIGATION ==================== -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-gray-faint' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
      <a href="#" @click.prevent="scrollTo($event, '#hero')" class="font-display text-lg md:text-xl font-normal tracking-tight transition-colors duration-500" :class="scrolled ? 'text-warm' : 'text-white'">
        Lila Chibane
      </a>

      <nav class="hidden md:flex items-center gap-10 lg:gap-12">
        <template v-for="link in navLinks" :key="link.label">
          <NuxtLink
            v-if="link.external"
            :to="link.href"
            class="nav-link font-body text-sm font-normal tracking-wide transition-colors duration-500 relative"
            :class="scrolled ? 'text-gray hover:text-warm' : 'text-white/60 hover:text-white'"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            @click.prevent="scrollTo($event, link.href)"
            class="nav-link font-body text-sm font-normal tracking-wide transition-colors duration-500 relative"
            :class="scrolled ? 'text-gray hover:text-warm' : 'text-white/60 hover:text-white'"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <button
        class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        style="touch-action: manipulation"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      >
        <span class="block w-5 h-[1px] transition-all duration-500" :class="[scrolled ? 'bg-warm' : 'bg-cream', isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : '']"></span>
        <span class="block w-5 h-[1px] transition-all duration-500" :class="[scrolled ? 'bg-warm' : 'bg-cream', isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : '']"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 top-0 bg-cream z-40 flex flex-col items-center justify-center">
        <button
          class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
          @click="isMobileMenuOpen = false"
          aria-label="Fermer le menu"
        >
          <span class="block w-5 h-[1px] bg-warm rotate-45 absolute"></span>
          <span class="block w-5 h-[1px] bg-warm -rotate-45 absolute"></span>
        </button>

        <nav class="flex flex-col items-center gap-8">
          <template v-for="(link, i) in navLinks" :key="link.label">
            <NuxtLink
              v-if="link.external"
              :to="link.href"
              class="font-body text-sm font-normal tracking-wide text-warm mobile-menu-link"
              :style="{ animationDelay: `${i * 80}ms` }"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              @click="scrollTo($event, link.href)"
              class="font-body text-sm font-normal tracking-wide text-warm mobile-menu-link"
              :style="{ animationDelay: `${i * 80}ms` }"
            >
              {{ link.label }}
            </a>
          </template>
        </nav>
      </div>
    </Transition>
  </header>

  <main class="bg-cream">
    <!-- ==================== HERO ==================== -->
    <section id="hero" class="h-screen max-h-screen bg-warm grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <!-- Photo -->
      <div class="h-[50vh] md:h-auto overflow-hidden hero-fade" style="animation-delay: 0.1s">
        <img
          src="/IMG_2553.jpg"
          alt="Lila Chibane"
          class="w-full h-full object-cover object-[center_25%]"
        />
      </div>

      <!-- Texte -->
      <div class="flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-12 md:py-0">
        <div>
          <h1 class="font-body font-light text-white text-4xl md:text-5xl leading-tight mb-10 md:mb-14 tracking-tight hero-fade" style="animation-delay: 0.3s">
            Lila Chibane
          </h1>

          <div class="space-y-4 md:space-y-5 mb-12 md:mb-16">
            <div class="hero-fade" style="animation-delay: 0.5s">
              <a
                href="#coaching"
                @click.prevent="scrollTo($event, '#coaching')"
                class="hero-link group inline-flex items-center gap-3 font-display font-normal text-white text-2xl md:text-3xl lg:text-4xl"
              >
                <span class="border-b border-white/30 group-hover:border-bronze pb-1 transition-colors duration-300">Coach sportive</span>
                <span class="text-white/30 group-hover:text-bronze group-hover:translate-x-1 transition-all duration-300 text-lg">&#8594;</span>
              </a>
            </div>
            <div class="hero-fade" style="animation-delay: 0.65s">
              <a
                href="#peinture"
                @click.prevent="scrollTo($event, '#peinture')"
                class="hero-link group inline-flex items-center gap-3 font-display font-normal text-white text-2xl md:text-3xl lg:text-4xl"
              >
                <span class="border-b border-white/30 group-hover:border-bronze pb-1 transition-colors duration-300">Peinture</span>
                <span class="text-white/30 group-hover:text-bronze group-hover:translate-x-1 transition-all duration-300 text-lg">&#8594;</span>
              </a>
            </div>
            <div class="hero-fade" style="animation-delay: 0.8s">
              <a
                href="#creation-sonore"
                @click.prevent="scrollTo($event, '#creation-sonore')"
                class="hero-link group inline-flex items-center gap-3 font-display font-normal text-white text-2xl md:text-3xl lg:text-4xl"
              >
                <span class="border-b border-white/30 group-hover:border-bronze pb-1 transition-colors duration-300">Création sonore</span>
                <span class="text-white/30 group-hover:text-bronze group-hover:translate-x-1 transition-all duration-300 text-lg">&#8594;</span>
              </a>
            </div>
          </div>

          <p class="text-sm font-body font-light text-white/40 max-w-sm leading-relaxed hero-fade" style="animation-delay: 1s">
            Je coache, je peins, je crée du son. Trois façons de faire du bien au corps et à l'esprit.
          </p>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        :class="scrollIndicatorVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <div class="w-[1px] h-8 bg-cream/20 mx-auto scroll-pulse"></div>
      </div>
    </section>

    <!-- ==================== COACHING ==================== -->
    <section id="coaching" class="py-24 md:py-40 lg:py-52 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">01</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal">
            Coach sportive
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            J'accompagne les femmes actives à reprendre une activité physique adaptée, sans violence, sans pression, à leur rythme. Ton corps n'est pas un objet à transformer, c'est un système à écouter.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-14 md:mt-20">
          <div class="bg-sand rounded-xl p-7 md:p-8 reveal" style="transition-delay: 0ms">
            <h3 class="text-lg font-display font-normal text-warm mb-3">Mouvement intelligent</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed">
              Renforcement, mobilité, cardio dosé. Chaque séance est pensée pour ton corps tel qu'il est aujourd'hui.
            </p>
          </div>

          <div class="bg-sand rounded-xl p-7 md:p-8 reveal" style="transition-delay: 120ms">
            <h3 class="text-lg font-display font-normal text-warm mb-3">Régulation nerveuse</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed">
              Des outils pour sortir du mode « survie » et retrouver un quotidien plus apaisé, moins de stress, moins d'anxiété.
            </p>
          </div>

          <div class="bg-sand rounded-xl p-7 md:p-8 sm:col-span-2 md:col-span-1 reveal" style="transition-delay: 240ms">
            <h3 class="text-lg font-display font-normal text-warm mb-3">Alimentation soutenante</h3>
            <p class="text-sm font-body font-light text-gray leading-relaxed">
              Pas de régime, pas de restriction. Remettre de la conscience et du plaisir dans l'assiette pour nourrir ton énergie.
            </p>
          </div>
        </div>

        <div class="text-center mt-16 md:mt-24 reveal">
          <a
            href="https://calendly.com/lilacoach/bilanpersonnalise"
            target="_blank"
            rel="noopener"
            class="btn-warm inline-block"
          >
            Réserver un bilan gratuit
          </a>
          <p class="text-xs font-body text-gray-light mt-4 tracking-wide">
            30 minutes · gratuit · en visio · sans engagement
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== PEINTURE ==================== -->
    <section id="peinture" class="py-24 md:py-40 lg:py-52 px-6 md:px-10 bg-warm">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-white/40 mb-4 block reveal">02</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-white leading-[1.1] mb-6 md:mb-8 reveal">
            Peinture
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-white/70 leading-relaxed reveal">
            [Ici, quelques lignes sur ta démarche : ce qui t'anime quand tu peins, tes thèmes, tes matières, ce que tu cherches à exprimer.]
          </p>
        </div>

        <!-- Grille œuvres -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-[1px] mt-14 md:mt-20">
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 0ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Huile sur toile, 80×60 cm</p>
          </div>
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 60ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Acrylique, 100×100 cm</p>
          </div>
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 120ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Technique mixte, 60×40 cm</p>
          </div>
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 180ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Huile sur bois, 50×50 cm</p>
          </div>
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 240ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Encre et pigments, 70×50 cm</p>
          </div>
          <div class="aspect-square bg-white/10 flex flex-col items-center justify-center p-4 reveal" style="transition-delay: 300ms">
            <svg class="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.75"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p class="text-sm font-body text-white/50">Titre de l'œuvre</p>
            <p class="text-xs font-body text-white/30">Acrylique sur papier, 40×30 cm</p>
          </div>
        </div>

        <div class="mt-10 md:mt-14 reveal">
          <span class="text-sm font-body text-white/50 cursor-default border-b border-white/20 pb-1">
            Voir la galerie complète →
          </span>
        </div>
      </div>
    </section>

    <!-- ==================== CRÉATION SONORE ==================== -->
    <section id="creation-sonore" class="py-24 md:py-40 lg:py-52 px-6 md:px-10">
      <div class="max-w-5xl mx-auto">
        <div class="max-w-2xl">
          <span class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 block reveal">03</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] mb-6 md:mb-8 reveal">
            Création sonore
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-gray leading-relaxed reveal">
            [Ici, quelques lignes sur ton univers sonore : le type de créations (paysages sonores, compositions, field recording...), le contexte (installations, performances, podcasts...), ce que tu cherches à faire ressentir.]
          </p>
        </div>

        <!-- Pistes -->
        <div class="mt-14 md:mt-20">
          <div class="border-b border-gray-faint py-6 md:py-8 flex items-center justify-between reveal" style="transition-delay: 0ms">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-faint flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-gray-light ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div>
                <p class="text-base font-body font-normal text-warm">Titre de la pièce sonore</p>
                <p class="text-xs font-body text-gray-light">Field recording, paysage sonore</p>
              </div>
            </div>
            <span class="text-sm font-body text-gray-light">3:42</span>
          </div>

          <div class="border-b border-gray-faint py-6 md:py-8 flex items-center justify-between reveal" style="transition-delay: 80ms">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-faint flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-gray-light ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div>
                <p class="text-base font-body font-normal text-warm">Titre de la pièce sonore</p>
                <p class="text-xs font-body text-gray-light">Composition électro-acoustique</p>
              </div>
            </div>
            <span class="text-sm font-body text-gray-light">5:17</span>
          </div>

          <div class="border-b border-gray-faint py-6 md:py-8 flex items-center justify-between reveal" style="transition-delay: 160ms">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-faint flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-gray-light ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div>
                <p class="text-base font-body font-normal text-warm">Titre de la pièce sonore</p>
                <p class="text-xs font-body text-gray-light">Installation sonore, performance</p>
              </div>
            </div>
            <span class="text-sm font-body text-gray-light">8:03</span>
          </div>
        </div>

        <div class="mt-10 md:mt-14 reveal">
          <span class="text-sm font-body text-gray cursor-default border-b border-gray-faint pb-1">
            Écouter sur SoundCloud →
          </span>
        </div>
      </div>
    </section>

    <!-- ==================== À PROPOS ==================== -->
    <section id="a-propos" class="py-24 md:py-40 lg:py-52 px-6 md:px-10 bg-warm">
      <div class="max-w-3xl mx-auto">
        <span class="text-xs font-body font-normal tracking-wider text-white/40 mb-4 block reveal">À propos</span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white leading-[1.1] mb-10 md:mb-14 reveal">
          Je m'appelle Lila.
        </h2>

        <div class="space-y-6 md:space-y-8">
          <p class="text-base sm:text-lg font-body font-light text-white/70 leading-relaxed reveal">
            Coach sportive, peintre, créatrice sonore. Trois pratiques, un même fil : prendre soin du corps, des sens et de ce qui nous relie au monde.
          </p>
          <p class="text-base sm:text-lg font-body font-light text-white/70 leading-relaxed reveal">
            Le coaching m'a appris à accompagner avec douceur. La peinture me permet d'exprimer ce que les mots ne disent pas. La création sonore donne une forme à ce qu'on ressent sans pouvoir le nommer.
          </p>

          <blockquote class="text-xl md:text-2xl font-display font-normal italic text-white py-2 md:py-4 reveal">
            Trois façons de faire, une même envie : créer les conditions pour se sentir bien.
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ==================== CONTACT ==================== -->
    <section id="contact" class="py-24 md:py-40 lg:py-52 px-6 md:px-10">
      <!-- CTA -->
      <div class="max-w-2xl mx-auto text-center mb-20 md:mb-28">
        <p class="text-xs font-body font-normal tracking-wider text-gray-light mb-4 reveal">Contact</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-warm leading-[1.1] reveal">
          Envie d'échanger ?
        </h2>
        <p class="text-base sm:text-lg font-body font-light text-gray mt-6 md:mt-8 max-w-lg mx-auto leading-relaxed reveal">
          Que ce soit pour un coaching, une collaboration artistique ou simplement discuter, je réponds personnellement à chaque message.
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
              {{ isSubmitting ? 'Envoi...' : 'Envoyer' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="bg-warm py-16 md:py-20 px-6 md:px-10">
    <div class="max-w-5xl mx-auto">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
        <!-- Identity -->
        <div>
          <p class="font-display text-xl text-white font-normal mb-3">Lila Chibane</p>
          <p class="text-xs font-body text-white/30 leading-relaxed tracking-wide">
            Coach sportive · Peintre · Créatrice sonore<br>Médoc, France
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <nav class="flex flex-col gap-3">
            <template v-for="link in navLinks" :key="'footer-' + link.label">
              <NuxtLink
                v-if="link.external"
                :to="link.href"
                class="text-sm font-body text-white/40 hover:text-white transition-colors duration-300"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                @click.prevent="scrollTo($event, link.href)"
                class="text-sm font-body text-white/40 hover:text-white transition-colors duration-300"
              >
                {{ link.label }}
              </a>
            </template>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <a
            href="mailto:lila.chibane@outlook.com"
            class="text-sm font-body text-white/40 hover:text-white transition-colors duration-300"
          >
            lila.chibane@outlook.com
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 mt-14 md:mt-16 pt-8">
        <p class="text-xs font-body text-white/20 tracking-[0.15em]">
          &copy; {{ new Date().getFullYear() }} Lila Chibane
        </p>
      </div>
    </div>
  </footer>
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
  @apply bg-warm text-white text-sm font-body font-normal tracking-wide py-4 px-10
         hover:opacity-90 active:scale-[0.98]
         transition-all duration-300;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after {
  transform: scaleX(1);
}

.mobile-menu-link {
  opacity: 0;
  transform: translateY(8px);
  animation: menuFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes menuFadeIn {
  to { opacity: 1; transform: translateY(0); }
}

.form-input {
  @apply bg-transparent border-b border-gray-faint px-0 py-3
         text-warm font-body text-base
         placeholder:text-gray-light
         focus:outline-none focus:border-bronze
         transition-colors duration-300 w-full;
}

.fade-enter-active { transition: opacity 0.3s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

html { scroll-behavior: smooth; }
</style>
