<script setup>
const props = defineProps({
  minimal: { type: Boolean, default: false },
  activePage: { type: String, default: '' },
})

const route = useRoute()
const scrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { data: homepage } = await useHomepage()

const brandLabel = computed(() => homepage.value?.data?.nav_brand_label || 'Lila Chibane')

const navLinks = computed(() => {
  const d = homepage.value?.data || {}
  return [
    { id: 'coaching', label: d.nav_label_coaching || 'Coaching', href: '/#coaching' },
    { id: 'peinture', label: d.nav_label_peinture || 'Peinture', href: '/#peinture' },
    { id: 'son', label: d.nav_label_son || 'Son', href: '/#creation-sonore' },
    { id: 'dog', label: d.nav_label_dog || 'Dog sitting', href: '/#dog-sitting' },
    { id: 'blog', label: d.nav_label_blog || 'Blog', href: '/blog' },
    { id: 'contact', label: d.nav_label_contact || 'Contact', href: '/#contact' },
  ]
})

const isHome = computed(() => route.path === '/')
const transparent = computed(() => isHome.value && !scrolled.value && !isMobileMenuOpen.value)

const isActive = (link) => {
  if (props.activePage && link.id === props.activePage.toLowerCase()) return true
  if (link.href === '/blog' && route.path.startsWith('/blog')) return true
  return false
}

let scrollTicking = false
const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    const threshold = isHome.value ? window.innerHeight - 80 : 100
    const next = window.scrollY > threshold
    if (next !== scrolled.value) scrolled.value = next
    scrollTicking = false
  })
}

const scrollTo = (e, id) => {
  e.preventDefault()
  isMobileMenuOpen.value = false
  if (route.path !== '/') {
    navigateTo(id)
    return
  }
  const anchor = id.replace('/#', '#')
  const el = document.querySelector(anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="transparent ? 'bg-bleu' : (scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-gray-faint' : 'bg-cream')"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
      <NuxtLink
        to="/"
        class="font-display text-lg md:text-xl font-normal tracking-tight transition-colors duration-500"
        :class="transparent ? 'text-white' : 'text-warm'"
      >
        {{ brandLabel }}
      </NuxtLink>

      <template v-if="!minimal">
        <nav class="hidden md:flex items-center gap-10 lg:gap-12">
          <template v-for="link in navLinks" :key="link.id">
            <a
              v-if="link.href.startsWith('/#')"
              :href="link.href"
              @click="scrollTo($event, link.href)"
              class="nav-link font-body text-sm font-normal tracking-wide transition-colors duration-300 relative"
              :class="transparent
                ? (isActive(link) ? 'text-white' : 'text-white/70 hover:text-white')
                : (isActive(link) ? 'text-warm' : 'text-gray hover:text-bleu')"
            >
              {{ link.label }}
            </a>
            <NuxtLink
              v-else
              :to="link.href"
              class="nav-link font-body text-sm font-normal tracking-wide transition-colors duration-300 relative"
              :class="transparent
                ? (isActive(link) ? 'text-white' : 'text-white/70 hover:text-white')
                : (isActive(link) ? 'text-warm' : 'text-gray hover:text-bleu')"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          style="touch-action: manipulation"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        >
          <span
            class="block w-5 h-[1px] transition-all duration-300"
            :class="[transparent ? 'bg-white' : 'bg-warm', isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : '']"
          ></span>
          <span
            class="block w-5 h-[1px] transition-all duration-300"
            :class="[transparent ? 'bg-white' : 'bg-warm', isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : '']"
          ></span>
        </button>
      </template>
    </div>

    <!-- Mobile menu -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen && !minimal" class="md:hidden fixed inset-0 top-0 bg-cream z-40 flex flex-col items-center justify-center">
        <button
          class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
          @click="isMobileMenuOpen = false"
          aria-label="Fermer le menu"
        >
          <span class="block w-5 h-[1px] bg-warm rotate-45 absolute"></span>
          <span class="block w-5 h-[1px] bg-warm -rotate-45 absolute"></span>
        </button>

        <nav class="flex flex-col items-center gap-8">
          <template v-for="(link, i) in navLinks" :key="link.id">
            <a
              v-if="link.href.startsWith('/#')"
              :href="link.href"
              @click="scrollTo($event, link.href)"
              class="font-body text-sm font-normal tracking-wide text-warm mobile-menu-link"
              :style="{ animationDelay: `${i * 80}ms` }"
            >
              {{ link.label }}
            </a>
            <NuxtLink
              v-else
              :to="link.href"
              class="font-body text-sm font-normal tracking-wide text-warm mobile-menu-link"
              :style="{ animationDelay: `${i * 80}ms` }"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
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

.fade-enter-active { transition: opacity 0.3s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
