<script setup>
defineProps({
  transparent: { type: Boolean, default: false },
  burger: { type: Boolean, default: false },
})

const route = useRoute()

const allLinks = [{ label: 'Blog', to: '/blog' }]
const links = computed(() => allLinks.filter((l) => l.to !== route.path))
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-40" :class="transparent ? '' : 'bg-ciel/85 backdrop-blur-md'">
    <div class="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span class="brand-name text-lg tracking-tight">Lila Chibane</span>
      </NuxtLink>
      <nav class="items-center gap-6 sm:gap-8 md:gap-10" :class="burger ? 'hidden lg:flex' : 'flex'">
        <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="nav-link">
          {{ l.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.brand-name {
  @apply font-titre font-bold text-encre transition-colors duration-700;
}
.nav-link {
  @apply relative text-sm font-titre text-ardoise hover:text-encre transition-colors duration-300 py-1;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1.5px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after { transition: none; }
  }
</style>
