<script setup>
const props = defineProps({
  label: { type: String, required: true },
  href: { type: String, required: true },
  prix: { type: String, default: '' },
  detail: { type: String, default: '' },
  externe: { type: Boolean, default: false },
})

const visible = ref(false)
let raf = 0
const maj = () => {
  raf = 0
  const bas = window.scrollY + window.innerHeight
  const fin = document.documentElement.scrollHeight - 900
  visible.value = window.scrollY > window.innerHeight * 0.9 && bas < fin
}
const surScroll = () => {
  if (!raf) raf = requestAnimationFrame(maj)
}
onMounted(() => {
  window.addEventListener('scroll', surScroll, { passive: true })
  window.addEventListener('resize', surScroll, { passive: true })
  maj()
})
onUnmounted(() => {
  window.removeEventListener('scroll', surScroll)
  window.removeEventListener('resize', surScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <Transition name="colle">
    <div v-if="visible" class="md:hidden fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40">
      <div class="flex items-center justify-between gap-3 rounded-full bg-encre text-white pl-5 pr-1.5 py-1.5 shadow-xl shadow-encre/30">
        <p v-if="prix" class="font-titre leading-tight min-w-0">
          <span class="block font-bold text-lg">{{ prix }}</span>
          <span v-if="detail" class="block text-xs text-white/70 truncate">{{ detail }}</span>
        </p>
        <a
          :href="href"
          :target="externe ? '_blank' : undefined"
          :rel="externe ? 'noopener' : undefined"
          class="shrink-0 inline-flex items-center gap-2 rounded-full bg-white text-encre font-titre font-semibold text-sm px-5 py-3 active:scale-[0.98] transition-transform"
        >
          {{ label }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.colle-enter-active,
.colle-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.colle-enter-from,
.colle-leave-to {
  opacity: 0;
  transform: translateY(120%);
}
@media (prefers-reduced-motion: reduce) {
  .colle-enter-active,
  .colle-leave-active { transition: opacity 0.2s ease; }
  .colle-enter-from,
  .colle-leave-to { transform: none; }
}
</style>
