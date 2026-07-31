<script setup>
defineProps({
  title: { type: String, required: true },
  intro: { type: String, default: '' },
  caption: { type: String, default: '' },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  imagePosition: { type: String, default: 'object-center' },
  ctaLabel: { type: String, default: '' },
  ctaUrl: { type: String, default: '' },
  approachTitle: { type: String, default: '' },
  approachParagraphs: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="flex-1 min-h-0 flex flex-col md:flex-row">
    <div class="flex-1 min-h-0 overflow-y-auto flex flex-col px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:pt-16 md:pb-16 md:pr-10 md:pl-[max(2.5rem,calc((100vw_-_64rem)/2_+_2.5rem))]">
      <div class="max-w-md my-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white leading-[1.1] mb-6 md:mb-8">
          {{ title }}
        </h1>
        <p v-if="intro" class="text-base sm:text-lg font-body font-light text-white/75 leading-relaxed mb-8 md:mb-10">
          {{ intro }}
        </p>
        <NuxtLink v-if="ctaLabel && ctaUrl.startsWith('/')" :to="ctaUrl" class="btn-light inline-flex items-center gap-2 group">
          {{ ctaLabel }}
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
        <a v-else-if="ctaLabel" :href="ctaUrl" target="_blank" rel="noopener" class="btn-light inline-block">{{ ctaLabel }}</a>
        <p v-if="caption" class="text-xs font-body text-white/50 tracking-wide" :class="{ 'mt-4': ctaLabel }">{{ caption }}</p>

        <div v-if="approachParagraphs.length" class="mt-7 md:mt-8 pt-6 border-t border-white/10">
          <p v-if="approachTitle" class="text-xs font-body font-normal tracking-wider text-white/50 mb-3">{{ approachTitle }}</p>
          <div class="space-y-3">
            <p v-for="(para, i) in approachParagraphs" :key="i" class="text-sm font-body font-light text-white/75 leading-relaxed">{{ para }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-first md:order-none md:flex-1 h-48 sm:h-64 md:h-auto min-h-0 overflow-hidden">
      <img :src="imageSrc" :alt="imageAlt" class="w-full h-full object-cover" :class="imagePosition" fetchpriority="high" loading="eager" decoding="async" />
    </div>
  </section>
</template>
