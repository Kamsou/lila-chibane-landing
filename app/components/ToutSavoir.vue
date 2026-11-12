<script setup>
defineProps({
  titre: { type: String, required: true },
  resume: { type: String, default: '' },
})

const ouvert = ref(false)
const id = useId()
</script>

<template>
  <section class="vente-conteneur">
    <div class="bg-white">
      <button
        type="button"
        class="w-full text-left flex items-center justify-between gap-6 px-6 md:px-10 py-7 md:py-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-azur/40"
        :aria-expanded="ouvert"
        :aria-controls="id"
        @click="ouvert = !ouvert"
      >
        <span>
          <span class="block font-titre font-bold text-encre text-2xl md:text-3xl leading-tight">{{ titre }}</span>
          <span v-if="resume" class="block font-titre text-ardoise mt-1.5">{{ resume }}</span>
        </span>
        <span class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300" :class="ouvert ? 'bg-encre text-white' : 'bg-azur text-white'" aria-hidden="true">
          <svg class="w-5 h-5 transition-transform duration-300" :class="ouvert ? 'rotate-45' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <div v-show="ouvert" :id="id" class="px-6 md:px-10 pb-4 md:pb-8">
        <slot />
      </div>
    </div>
  </section>
</template>
