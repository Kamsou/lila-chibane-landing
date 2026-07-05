<script setup>
useSeoMeta({
  title: 'La feuille de route · questionnaire coaching · Lila Chibane',
  description: "Quelques questions pour préparer notre premier échange coaching sport-santé. 2 minutes, confidentiel.",
  robots: 'noindex, follow',
})
</script>

<template>
  <div class="min-h-[100dvh] bg-bleu text-white">
    <header class="sticky top-0 z-40 bg-bleu/85 backdrop-blur-md border-b border-white/10">
      <div class="max-w-2xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 font-display text-lg font-normal">
          <span class="w-1.5 h-1.5 rounded-full bg-white"></span> Lila Chibane
        </NuxtLink>
        <NuxtLink to="/coaching" class="inline-flex items-center gap-1.5 text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-300">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Coaching
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <div class="mb-10 md:mb-12">
        <p class="text-xs font-body font-normal tracking-wider text-white/50 mb-3">La feuille de route</p>
        <h1 class="font-display text-3xl md:text-4xl font-normal leading-[1.1] mb-5">Préparons ton premier échange</h1>
        <p class="text-base font-body font-light text-white/80 leading-relaxed">
          Avant notre échange, prends 2 minutes pour répondre à quelques questions. Ça me permet de mieux te connaître et de préparer un premier échange vraiment utile pour toi.
        </p>
      </div>

      <QualificationForm />

      <footer class="mt-12 pt-6 border-t border-white/10">
        <p class="text-xs font-body font-light text-white/45 leading-relaxed">
          Tes données, y compris celles relatives à ta santé, sont conservées 12 mois maximum puis supprimées, et servent uniquement à préparer notre accompagnement. Pour les consulter, les rectifier ou les faire effacer, écris à
          <a href="mailto:lila.chibane.pro@outlook.com" class="underline hover:text-white/70">lila.chibane.pro@outlook.com</a>.
        </p>
      </footer>
    </main>
  </div>
</template>
