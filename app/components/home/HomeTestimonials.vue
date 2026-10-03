<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})

// Le témoignage complet s'ouvre dans une fenêtre : la section garde sa hauteur d'écran
const dialog = ref(null)
const current = ref(null)
const openQuote = async (t) => {
  current.value = t
  await nextTick()
  dialog.value?.showModal()
}
const close = () => dialog.value?.close()
const onDialogClick = (e) => {
  if (e.target === dialog.value) close()
}

const tints = ['bg-paper', 'bg-terra-soft', 'bg-[#C9D6FF]']
const avatarTints = ['bg-bleu text-paper', 'bg-ink text-paper', 'bg-terra text-paper']
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-5 md:px-10">
    <h2 v-reveal class="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-paper leading-[0.95] tracking-tight mb-8 lg:mb-10">
      Ce qu'elles en disent
    </h2>

    <div class="grid md:grid-cols-3 gap-4 lg:gap-5">
      <figure
        v-for="(t, i) in items"
        :key="`t-${i}`"
        v-reveal="{ delay: i * 110 }"
        class="quote-card"
        :class="tints[i % tints.length]"
      >
        <blockquote>
          <p class="font-display text-xl lg:text-[1.6rem] font-medium leading-[1.2] tracking-tight text-ink">«&nbsp;{{ t.highlight }}&nbsp;»</p>
        </blockquote>

        <button
          v-if="t.quote.length"
          type="button"
          class="mt-5 inline-flex items-center gap-2 text-sm font-body font-medium text-ink/70 hover:text-ink transition-colors duration-300"
          @click="openQuote(t)"
        >
          Lire tout le témoignage
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>

        <figcaption class="mt-auto pt-8 flex items-center gap-3">
          <span class="w-11 h-11 shrink-0 rounded-full grid place-items-center font-display text-base" :class="avatarTints[i % avatarTints.length]">{{ t.author.charAt(0) }}</span>
          <span class="leading-tight">
            <span class="block text-[15px] font-body font-medium text-ink">{{ t.author }}</span>
            <span v-if="t.detail" class="block text-[13px] font-body text-ink/55">{{ t.detail }}</span>
          </span>
        </figcaption>
      </figure>
    </div>

    <dialog ref="dialog" class="quote-dialog" :aria-label="current ? `Témoignage de ${current.author}` : 'Témoignage'" @click="onDialogClick">
      <div v-if="current" class="relative p-7 sm:p-10">
        <button type="button" class="absolute top-4 right-4 w-10 h-10 rounded-full grid place-items-center text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors" aria-label="Fermer" @click="close">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <p class="font-display text-2xl sm:text-3xl font-medium leading-[1.15] tracking-tight text-ink pr-10 mb-6">«&nbsp;{{ current.highlight }}&nbsp;»</p>
        <div class="space-y-4">
          <p v-for="(para, j) in current.quote" :key="j" class="text-[15px] sm:text-base font-body font-light text-ink/80 leading-relaxed">{{ para }}</p>
        </div>
        <p class="mt-8 text-sm font-body text-ink">
          <span class="font-medium">{{ current.author }}</span>
          <span v-if="current.detail" class="text-ink/55"> · {{ current.detail }}</span>
        </p>
      </div>
    </dialog>
  </div>
</template>

<style scoped lang="postcss">
.quote-card {
  @apply flex flex-col rounded-[1.75rem] p-6 lg:p-8 min-h-[17rem] lg:min-h-[19rem];
  box-shadow: 0 30px 60px -30px rgba(10, 12, 30, 0.55);
}
.quote-dialog {
  @apply w-[min(42rem,calc(100vw-2rem))] max-h-[85svh] m-auto p-0 rounded-[1.75rem] bg-paper overflow-y-auto;
  box-shadow: 0 40px 100px -30px rgba(10, 12, 30, 0.7);
}
.quote-dialog::backdrop {
  background: rgba(18, 21, 42, 0.6);
  backdrop-filter: blur(4px);
}
.quote-dialog[open] {
  animation: dialogIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes dialogIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
:global(html:has(dialog[open])) {
  overflow: hidden;
}
@media (prefers-reduced-motion: reduce) {
  .quote-dialog[open] { animation: none; }
}
</style>
