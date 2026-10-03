<script setup>
defineProps({
  links: { type: Array, default: () => [] },
  cta: { type: Boolean, default: true },
})

const progress = ref(0)
const compact = ref(false)

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? window.scrollY / max : 0
    compact.value = window.scrollY > 40
    ticking = false
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
    <div class="nav-pill pointer-events-auto" :class="{ 'nav-pill--compact': compact }">
      <NuxtLink to="/" class="flex items-center pl-2 shrink-0" aria-label="Lila Chibane, accueil">
        <span class="font-display text-[17px] font-medium tracking-tight">Lila Chibane</span>
      </NuxtLink>

      <nav class="items-center gap-1" :class="cta ? 'hidden md:flex' : 'flex'" aria-label="Navigation principale">
        <template v-for="l in links" :key="l.to">
          <a v-if="l.to.startsWith('#')" :href="l.to" class="nav-link">{{ l.label }}</a>
          <NuxtLink v-else :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
        </template>
      </nav>

      <NuxtLink v-if="cta" to="/feuille-de-route" class="nav-cta group">
        <span class="hidden sm:inline">Feuille de route</span>
        <span class="sm:hidden">Commencer</span>
        <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </NuxtLink>

      <span class="nav-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></span>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.nav-pill {
  @apply relative max-w-5xl mx-auto flex items-center justify-between gap-4 h-14 pl-3 pr-1.5 rounded-full
         text-white bg-ink/85 backdrop-blur-xl border border-white/10 overflow-hidden
         transition-all duration-500;
  box-shadow: 0 10px 40px -12px rgba(10, 12, 30, 0.45);
}
.nav-pill--compact {
  @apply bg-ink/90;
}
.nav-link {
  @apply px-4 py-2 rounded-full text-sm font-body text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300;
}
.nav-cta {
  @apply inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-paper text-ink text-sm font-body font-medium
         hover:bg-terra-soft transition-colors duration-300;
}
.nav-progress {
  @apply absolute left-0 bottom-0 h-[2px] w-full bg-terra-soft origin-left;
  transition: transform 0.1s linear;
}


@media (prefers-reduced-motion: reduce) {
  .nav-progress { transition: none; }
}
</style>
