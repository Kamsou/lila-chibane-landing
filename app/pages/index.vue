<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

useSeoMeta({
  title: 'Lila Chibane · Coach sport-santé en visio',
  description: 'Reprends une activité physique adaptée, régulière et agréable. Coaching en visio pour femmes actives. Sans violence, sans pression, à ton rythme.',
  ogTitle: 'Lila Chibane · Coach sport-santé en visio',
  ogDescription: 'Un corps fort, un esprit apaisé, une énergie qui dure.',
  ogImage: 'https://lilachibane.com/lila-portrait.png',
  ogUrl: 'https://lilachibane.com',
  ogType: 'website',
  twitterTitle: 'Lila Chibane · Coach sport-santé en visio',
  twitterDescription: 'Un corps fort, un esprit apaisé, une énergie qui dure.',
  twitterImage: 'https://lilachibane.com/lila-portrait.png',
})

const scrolled = ref(false)
const isMobileMenuOpen = ref(false)
const scrollIndicatorVisible = ref(true)
const openFaq = ref(null)
const isSubmitting = ref(false)

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

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
    await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    form.reset()
  } catch (err) {
    // silent
  } finally {
    isSubmitting.value = false
  }
}

const navLinks = [
  { label: 'Philosophie', href: '#philosophie' },
  { label: 'Méthode', href: '#methode' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Blog', href: '/blog', external: true },
  { label: 'Quiz', href: '/quiz', external: true },
  { label: 'Contact', href: '#contact' },
]

const faqs = [
  {
    question: "Je n'ai pas fait de sport depuis des années, c'est un problème ?",
    answer: "Pas du tout, c'est même la spécialité de mon accompagnement. Je travaille avec des femmes qui reprennent après un arrêt long. On commence en douceur, à ton rythme, sans aucun prérequis physique. Tout est adapté.",
  },
  {
    question: 'Comment se passent les séances en visio ?',
    answer: "On se retrouve en vidéo, depuis chez toi ou n'importe où. Tu n'as besoin que d'un tapis et d'un peu d'espace. Je te guide en temps réel, je corrige ta posture, j'adapte les exercices. C'est aussi efficace qu'en présentiel, avec la flexibilité en plus.",
  },
  {
    question: "Est-ce que c'est adapté si j'ai des douleurs ou des limitations ?",
    answer: "Oui. Je prends en compte ton historique, tes douleurs, tes limitations. Mon approche intègre la mobilité et la régulation nerveuse, ce qui aide aussi à diminuer les tensions et les douleurs chroniques. En cas de pathologie spécifique, je travaille en lien avec ton médecin.",
  },
  {
    question: 'Comment se déroule un accompagnement individuel ?',
    answer: "Le programme est 100% personnalisé et les séances sont planifiées selon ton emploi du temps. On avance à ton rythme, en visio, avec un suivi adapté à tes objectifs et tes contraintes.",
  },
  {
    question: 'Je suis souvent fatiguée et stressée, est-ce que le sport ne va pas empirer les choses ?',
    answer: "C'est justement l'inverse. Le sport « classique » peut effectivement aggraver le stress si le système nerveux est déjà en surcharge. Mon approche dose l'effort selon ton état. Certains jours, on travaille le renforcement. D'autres jours, on privilégie la mobilité et la respiration. Ton corps apprend à sortir du mode survie.",
  },
  {
    question: 'Combien de temps avant de voir des résultats ?',
    answer: "La plupart des femmes ressentent un changement dès les premières semaines : meilleur sommeil, plus d'énergie, moins de tensions. Les résultats physiques visibles suivent naturellement avec la régularité. Mon objectif n'est pas un résultat rapide, mais un changement durable.",
  },
]

// JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        name: 'Lila Chibane — Coach sport-santé',
        description: 'Coach sport-santé en visio. Accompagnement personnalisé pour femmes actives : reprise du sport, régulation nerveuse, alimentation soutenante.',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/lila-portrait.png',
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
        serviceType: ['Coach sportif', 'Coach santé', 'Coaching en visio', 'Coaching en présentiel'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Lila Chibane',
        url: 'https://lilachibane.com',
        inLanguage: 'fr',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Lila Chibane',
        jobTitle: 'Coach sport-santé',
        url: 'https://lilachibane.com',
        image: 'https://lilachibane.com/lila-portrait.png',
        email: 'lila.chibane@outlook.com',
        knowsAbout: ['Activité physique adaptée', 'Régulation nerveuse', 'Coaching santé', 'Sport féminin'],
      }),
    },
  ],
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  nextTick(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- ==================== NAVIGATION ==================== -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
    :class="scrolled ? 'bg-white/90 backdrop-blur-md border-b border-stone-400/10' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
      <a href="#" @click.prevent="scrollTo($event, '#hero')" class="font-display text-lg md:text-xl font-light tracking-tight text-stone-900">
        Lila Chibane
      </a>

      <nav class="hidden md:flex items-center gap-8 lg:gap-10">
        <template v-for="link in navLinks" :key="link.label">
          <NuxtLink
            v-if="link.external"
            :to="link.href"
            class="nav-link font-body text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-200 relative"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            @click.prevent="scrollTo($event, link.href)"
            class="nav-link font-body text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-200 relative"
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
        <span class="block w-5 h-[1.5px] bg-stone-900 transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''"></span>
        <span class="block w-5 h-[1.5px] bg-stone-900 transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''"></span>
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
          <span class="block w-5 h-[1.5px] bg-stone-900 rotate-45 absolute"></span>
          <span class="block w-5 h-[1.5px] bg-stone-900 -rotate-45 absolute"></span>
        </button>

        <nav class="flex flex-col items-center gap-8">
          <template v-for="(link, i) in navLinks" :key="link.label">
            <NuxtLink
              v-if="link.external"
              :to="link.href"
              class="font-display text-2xl font-light text-stone-900 mobile-menu-link"
              :style="{ animationDelay: `${i * 80}ms` }"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              @click="scrollTo($event, link.href)"
              class="font-display text-2xl font-light text-stone-900 mobile-menu-link"
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
    <section id="hero" class="min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 md:px-8 text-center relative">
      <div class="max-w-3xl mx-auto">
        <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-6 md:mb-8 hero-fade" style="animation-delay: 0.1s">
          Coach sport-santé en visio
        </p>

        <h1 class="font-display font-light text-stone-900 leading-[1.1] tracking-tight">
          <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-fade" style="animation-delay: 0.3s">Un corps fort,</span>
          <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-fade" style="animation-delay: 0.5s">un esprit apaisé,</span>
          <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-fade" style="animation-delay: 0.7s">une énergie qui dure.</span>
        </h1>

        <p class="text-base sm:text-lg md:text-xl font-body font-light text-stone-600 max-w-2xl mx-auto mt-6 md:mt-8 leading-relaxed hero-fade" style="animation-delay: 0.9s">
          Je t'accompagne à reprendre une activité physique adaptée, régulière et agréable. Sans violence, sans pression, à ton rythme.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-12 hero-fade" style="animation-delay: 1.1s">
          <a
            href="#philosophie"
            @click.prevent="scrollTo($event, '#philosophie')"
            class="btn-primary"
          >
            Découvrir mon approche
          </a>
          <NuxtLink to="/quiz" class="btn-secondary">
            Faire le quiz énergie
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        :class="scrollIndicatorVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <div class="w-[1px] h-8 bg-stone-400/40 mx-auto scroll-pulse"></div>
      </div>
    </section>

    <!-- ==================== PHILOSOPHIE ==================== -->
    <section id="philosophie" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6 reveal">Philosophie</p>

        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-stone-900 leading-[1.15] max-w-3xl mb-8 md:mb-12 reveal">
          Ton corps est un système,<br>pas un objet à transformer.
        </h2>

        <blockquote class="text-lg sm:text-xl md:text-2xl font-display font-light text-stone-600 leading-relaxed max-w-3xl italic reveal">
          Un corps fatigué, stressé ou en hypervigilance ne progresse pas durablement.
          Ce n'est pas une question de volonté. C'est une question de régulation.
        </blockquote>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 mt-16 md:mt-20">
          <div class="reveal" style="transition-delay: 0ms">
            <span class="text-xs font-body font-medium text-sage-dark tracking-widest mb-3 block number-blur">01</span>
            <h3 class="text-lg font-display font-semibold text-stone-900 mb-3">Pas de souffrance</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Le sport ne devrait jamais être une punition. Je t'apprends à bouger avec plaisir, en respectant les signaux de ton corps.
            </p>
          </div>

          <div class="reveal" style="transition-delay: 100ms">
            <span class="text-xs font-body font-medium text-sage-dark tracking-widest mb-3 block number-blur">02</span>
            <h3 class="text-lg font-display font-semibold text-stone-900 mb-3">Pas de pression</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Pas d'objectifs irréalistes, pas de « motivation à tout prix ». On construit ensemble une régularité douce, tenable, qui te ressemble.
            </p>
          </div>

          <div class="reveal" style="transition-delay: 200ms">
            <span class="text-xs font-body font-medium text-sage-dark tracking-widest mb-3 block number-blur">03</span>
            <h3 class="text-lg font-display font-semibold text-stone-900 mb-3">Pas de culpabilité</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Tu as le droit de rater une séance. Tu as le droit de faire moins. Mon rôle est de t'aider à avancer sans te juger.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== MÉTHODE ==================== -->
    <section id="methode" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8 bg-sand">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6 reveal">Méthode</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-stone-900 leading-[1.15] reveal">
            Trois piliers pour retrouver<br>ton équilibre.
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-stone-600 mt-5 md:mt-6 leading-relaxed reveal">
            Une approche globale qui relie le mouvement, le système nerveux et l'alimentation.
          </p>
        </div>

        <!-- Photo action -->
        <div class="mt-12 md:mt-16 mb-14 md:mb-20 rounded-2xl overflow-hidden reveal">
          <img
            src="/lila-action.jpg"
            alt="Lila Chibane en séance de mobilité"
            class="w-full h-64 sm:h-80 md:h-96 object-cover object-[center_45%] method-img"
            loading="lazy"
          />
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          <!-- Pilier 1 -->
          <div class="pillar-card bg-white rounded-2xl p-7 md:p-9 reveal" style="transition-delay: 0ms">
            <svg class="w-8 h-8 text-sage mb-5" fill="none" viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5">
              <circle cx="16" cy="8" r="4" /><path d="M16 14v10m-5-7l5 3 5-3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-xs font-body font-medium tracking-wide text-sage-dark mb-3 block">Pilier 01</span>
            <h3 class="text-xl font-display font-semibold text-stone-900 mb-3">Mouvement intelligent</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Renforcement, mobilité, cardio dosé. Chaque séance est pensée pour ton corps tel qu'il est aujourd'hui. On construit la force, la stabilité et la souplesse sans brusquer.
            </p>
          </div>

          <!-- Pilier 2 -->
          <div class="pillar-card bg-white rounded-2xl p-7 md:p-9 reveal" style="transition-delay: 150ms">
            <svg class="w-8 h-8 text-sage mb-5" fill="none" viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5">
              <circle cx="16" cy="16" r="10" /><path d="M10 16c2-3 4-4 6-4s4 1 6 4" stroke-linecap="round" /><path d="M16 6v2m0 16v2m-10-10h2m16 0h2" stroke-linecap="round" />
            </svg>
            <span class="text-xs font-body font-medium tracking-wide text-sage-dark mb-3 block">Pilier 02</span>
            <h3 class="text-xl font-display font-semibold text-stone-900 mb-3">Régulation nerveuse</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Moins de stress, moins d'anxiété, un quotidien plus agréable. J'intègre des outils de régulation du système nerveux pour que ton corps sorte du mode « survie » et puisse enfin progresser.
            </p>
          </div>

          <!-- Pilier 3 -->
          <div class="pillar-card bg-white rounded-2xl p-7 md:p-9 sm:col-span-2 md:col-span-1 reveal" style="transition-delay: 300ms">
            <svg class="w-8 h-8 text-sage mb-5" fill="none" viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5">
              <path d="M16 4c-2 6-8 8-8 14a8 8 0 0016 0c0-6-6-8-8-14z" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13 22c1-2 2-3 3-3s2 1 3 3" stroke-linecap="round" />
            </svg>
            <span class="text-xs font-body font-medium tracking-wide text-sage-dark mb-3 block">Pilier 03</span>
            <h3 class="text-xl font-display font-semibold text-stone-900 mb-3">Alimentation soutenante</h3>
            <p class="text-base font-body font-light text-stone-600 leading-relaxed">
              Pas de régime, pas de restriction, pas de culpabilité. On remet de la conscience et du plaisir dans ton assiette pour nourrir ton énergie au lieu de la saboter.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== PROCESSUS ==================== -->
    <section id="processus" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6 reveal">Processus</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-stone-900 leading-[1.15] reveal">
            Reprendre le sport<br>n'a jamais été aussi simple.
          </h2>
          <p class="text-base sm:text-lg font-body font-light text-stone-600 mt-5 md:mt-6 reveal">
            En 3 étapes, on pose les bases d'une pratique qui te correspond.
          </p>
        </div>

        <div class="space-y-12 md:space-y-16 mt-12 md:mt-16">
          <!-- Step 1 -->
          <div class="flex gap-6 md:gap-10 items-start reveal">
            <div class="flex-shrink-0 flex flex-col items-center">
              <span class="text-4xl md:text-6xl font-display font-light text-sage-light number-blur">01</span>
            </div>
            <div class="pt-2 md:pt-4">
              <h3 class="text-lg sm:text-xl md:text-2xl font-display font-semibold text-stone-900 mb-2 md:mb-3">Ton bilan personnalisé gratuit</h3>
              <p class="text-base font-body font-light text-stone-600 leading-relaxed">
                On échange 30 minutes en visio. Je découvre ton histoire, ton quotidien, tes envies. Tu découvres ma façon de travailler. Zéro engagement, zéro pression.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex gap-6 md:gap-10 items-start reveal" style="transition-delay: 100ms">
            <div class="flex-shrink-0 flex flex-col items-center">
              <span class="text-4xl md:text-6xl font-display font-light text-sage-light number-blur">02</span>
            </div>
            <div class="pt-2 md:pt-4">
              <h3 class="text-lg sm:text-xl md:text-2xl font-display font-semibold text-stone-900 mb-2 md:mb-3">Ton programme sur-mesure</h3>
              <p class="text-base font-body font-light text-stone-600 leading-relaxed">
                Je construis un accompagnement 100% adapté à ton rythme, tes contraintes et tes objectifs. Séances en visio, en individuel.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex gap-6 md:gap-10 items-start reveal" style="transition-delay: 200ms">
            <div class="flex-shrink-0 flex flex-col items-center">
              <span class="text-4xl md:text-6xl font-display font-light text-sage-light number-blur">03</span>
            </div>
            <div class="pt-2 md:pt-4">
              <h3 class="text-lg sm:text-xl md:text-2xl font-display font-semibold text-stone-900 mb-2 md:mb-3">Tu progresses, à ton rythme</h3>
              <p class="text-base font-body font-light text-stone-600 leading-relaxed">
                Suivi bienveillant, ajustements permanents, et une vraie relation de confiance. Tu n'es pas un numéro. Tu es une personne que j'accompagne avec sérieux et humanité.
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-14 md:mt-20 reveal">
          <a
            href="https://calendly.com/lilacoach/bilanpersonnalise"
            target="_blank"
            rel="noopener"
            class="btn-primary inline-block"
          >
            Réserver mon bilan gratuit
          </a>
          <p class="text-xs font-body text-stone-400 mt-4 tracking-wide">
            30 minutes · gratuit · en visio · sans engagement
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== À PROPOS ==================== -->
    <section id="a-propos" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8 bg-sand">
      <div class="max-w-4xl mx-auto">
        <!-- Header with photo -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 mb-6 md:mb-8 reveal">
          <img
            src="/lila-portrait.png"
            alt="Lila Chibane, coach sport-santé"
            class="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover object-top flex-shrink-0 shadow-md"
            loading="lazy"
          />
          <div class="text-center sm:text-left">
            <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-3">À propos</p>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-light text-stone-900">
              Je m'appelle Lila.
            </h2>
          </div>
        </div>

        <!-- Text -->
        <div class="space-y-5 md:space-y-6">
          <p class="text-base font-body font-light text-stone-600 leading-relaxed reveal">
            Je suis coach sport-santé, spécialisée dans la reconnexion corps-esprit et la sortie de la sédentarité. Basée à Bordeaux, j'accompagne des femmes partout en France grâce à la visio.
          </p>
          <p class="text-base font-body font-light text-stone-600 leading-relaxed reveal">
            J'ai longtemps cru que pour progresser, il fallait forcer. M'imposer des séances épuisantes, ignorer la fatigue, repousser les limites. Mon corps a fini par me rappeler à l'ordre.
          </p>
          <p class="text-base font-body font-light text-stone-600 leading-relaxed reveal">
            Aujourd'hui, j'aide les femmes actives et exigeantes, celles qui ont souvent « tout donné », à reprendre le sport autrement. Avec intelligence, douceur et régularité.
          </p>
          <p class="text-base font-body font-light text-stone-600 leading-relaxed reveal">
            Mon approche s'adresse aux femmes au « cerveau qui tourne vite » : celles qui veulent comprendre comment et quand bouger pour leur santé, se sentir belles et fortes chaque jour, sans que le sport devienne une source de stress en plus.
          </p>

          <blockquote class="text-lg md:text-xl font-display italic text-stone-600 my-6 md:my-8 reveal">
            Ici, pas de culte du corps parfait. Seulement la recherche de la joie, de la vitalité et de la santé.
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ==================== FAQ ==================== -->
    <section id="faq" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6 reveal">FAQ</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-stone-900 leading-[1.15] reveal">
            Tu te poses peut-être<br>ces questions.
          </h2>
        </div>

        <div class="mt-10 md:mt-14 reveal">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border-b border-stone-400/20"
          >
            <button
              class="w-full py-5 md:py-6 flex justify-between items-start gap-4 text-left cursor-pointer"
              @click="toggleFaq(index)"
              :aria-expanded="openFaq === index"
            >
              <span class="text-base md:text-lg font-body font-medium text-stone-900 leading-snug">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 flex-shrink-0 text-stone-400 mt-0.5 transition-transform duration-300"
                :class="openFaq === index ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="faq-answer overflow-hidden transition-all duration-400"
              :class="openFaq === index ? 'max-h-96 opacity-100 pb-5 md:pb-6' : 'max-h-0 opacity-0'"
            >
              <p class="text-base font-body font-light text-stone-600 leading-relaxed pr-8">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== CONTACT ==================== -->
    <section id="contact" class="py-20 md:py-32 lg:py-40 px-5 sm:px-6 md:px-8 bg-sand">
      <!-- CTA -->
      <div class="max-w-3xl mx-auto text-center mb-20 md:mb-28">
        <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6 reveal">Prochaine étape</p>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-stone-900 leading-[1.15] reveal">
          Prête à reprendre<br>le sport autrement ?
        </h2>
        <p class="text-base sm:text-lg font-body font-light text-stone-600 mt-5 md:mt-6 max-w-xl mx-auto leading-relaxed reveal">
          Ton premier bilan est gratuit, en visio, et sans aucun engagement.
          On échange 30 minutes pour voir si mon approche te correspond.
        </p>
        <div class="mt-8 md:mt-10 reveal">
          <a
            href="https://calendly.com/lilacoach/bilanpersonnalise"
            target="_blank"
            rel="noopener"
            class="btn-primary inline-block"
          >
            Réserver mon bilan gratuit
          </a>
          <p class="mt-4">
            <NuxtLink to="/quiz" class="text-sm font-body text-stone-400 underline underline-offset-4 hover:text-stone-600 transition-colors duration-200">
              Ou fais le quiz énergie pour découvrir ton profil
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-xl mx-auto">
        <h3 class="text-xl sm:text-2xl md:text-3xl font-display font-light text-stone-900 text-center mb-3 md:mb-4 reveal">
          Ou écris-moi directement.
        </h3>
        <p class="text-sm sm:text-base font-body font-light text-stone-600 text-center mb-10 md:mb-12 reveal">
          Une question, une hésitation, ou simplement envie de discuter. Je réponds personnellement à chaque message.
        </p>

        <form
          action="https://formspree.io/f/movwedpw"
          method="POST"
          class="space-y-5 md:space-y-6 reveal"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label for="name" class="text-sm font-body font-medium text-stone-600 mb-2 block">Prénom</label>
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
            <label for="email" class="text-sm font-body font-medium text-stone-600 mb-2 block">Email</label>
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
            <label for="message" class="text-sm font-body font-medium text-stone-600 mb-2 block">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Dis-moi ce qui t'amène..."
              rows="5"
              required
              class="form-input resize-none"
            ></textarea>
          </div>
          <div class="text-center sm:text-left">
            <button
              type="submit"
              class="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
              :disabled="isSubmitting"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" class="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="opacity-75" />
              </svg>
              {{ isSubmitting ? 'Envoi...' : 'Envoyer mon message' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="bg-stone-900 py-12 md:py-16 px-5 sm:px-6 md:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
        <!-- Identity -->
        <div>
          <p class="font-display text-xl text-white font-light mb-3">Lila Chibane</p>
          <p class="text-sm font-body text-white/40 leading-relaxed">
            Coach sport-santé en visio<br>Bordeaux, France
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <nav class="flex flex-col gap-3">
            <template v-for="link in navLinks" :key="'footer-' + link.label">
              <NuxtLink
                v-if="link.external"
                :to="link.href"
                class="text-sm font-body text-white/50 hover:text-white transition-colors duration-200"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                @click.prevent="scrollTo($event, link.href)"
                class="text-sm font-body text-white/50 hover:text-white transition-colors duration-200"
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
            class="text-sm font-body text-white/50 hover:text-white transition-colors duration-200"
          >
            lila.chibane@outlook.com
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 mt-10 md:mt-12 pt-6 md:pt-8">
        <p class="text-xs font-body text-white/30">
          &copy; {{ new Date().getFullYear() }} Lila Chibane · Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.number-blur {
  filter: blur(6px);
  transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.visible .number-blur,
.reveal.visible .number-blur {
  filter: blur(0);
}

.hero-fade {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes heroFadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.scroll-pulse {
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

.btn-primary {
  @apply bg-stone-900 text-white text-sm font-body font-medium tracking-wide py-3.5 px-8 rounded-full
         hover:bg-stone-800 hover:shadow-lg active:scale-[0.97]
         transition-all duration-300;
}
.btn-secondary {
  @apply bg-transparent border border-stone-300 text-stone-600 text-sm font-body font-medium tracking-wide py-3.5 px-8 rounded-full
         hover:border-stone-900 hover:text-stone-900 active:scale-[0.97]
         transition-all duration-300;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #A7B5A0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after {
  transform: scaleX(1);
}

.mobile-menu-link {
  opacity: 0;
  transform: translateY(10px);
  animation: menuFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes menuFadeIn {
  to { opacity: 1; transform: translateY(0); }
}

.pillar-card {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.5s ease;
  border: 1px solid transparent;
}
.pillar-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.08);
  border-color: rgba(167, 181, 160, 0.3);
}

.method-img {
  transform: scale(1.08);
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible .method-img {
  transform: scale(1);
}

.form-input {
  @apply bg-white border border-stone-400/20 rounded-xl px-4 py-3.5 md:px-5 md:py-4
         text-stone-900 font-body text-base
         placeholder:text-stone-400 placeholder:transition-opacity placeholder:duration-200
         focus:placeholder:opacity-40
         focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage
         transition-colors duration-300 w-full;
}

.faq-answer {
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease,
              padding-bottom 0.4s ease;
}

.fade-enter-active { transition: opacity 0.3s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

html { scroll-behavior: smooth; }
</style>
