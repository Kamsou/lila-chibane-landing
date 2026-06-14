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
})
</script>

<template>
  <section class="flex-1 min-h-0 flex flex-col md:flex-row">
    <div class="flex-1 min-h-0 overflow-y-auto flex flex-col justify-start md:justify-center px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:py-12 md:pr-10 md:pl-[max(2.5rem,calc((100vw_-_64rem)/2_+_2.5rem))]">
      <div class="max-w-md">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white leading-[1.1] mb-6 md:mb-8">
          {{ title }}
        </h1>
        <p v-if="intro" class="text-base sm:text-lg font-body font-light text-white/75 leading-relaxed mb-8 md:mb-10">
          {{ intro }}
        </p>
        <a v-if="ctaLabel" :href="ctaUrl" target="_blank" rel="noopener" class="btn-light inline-block">{{ ctaLabel }}</a>
        <p v-if="caption" class="text-xs font-body text-white/50 tracking-wide" :class="{ 'mt-4': ctaLabel }">{{ caption }}</p>
      </div>
    </div>
    <div class="order-first md:order-none md:flex-1 h-48 sm:h-64 md:h-auto min-h-0 overflow-hidden">
      <img :src="imageSrc" :alt="imageAlt" class="w-full h-full object-cover" :class="imagePosition" loading="eager" decoding="async" />
    </div>
  </section>
</template>
