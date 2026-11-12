<script setup>
useSeoMeta({
  title: 'La feuille de route · questionnaire coaching · Lila Chibane',
  description: "Quelques questions pour préparer notre premier échange coaching sport-santé. 2 minutes, confidentiel.",
  robots: 'noindex, follow',
})
</script>

<template>
  <div class="min-h-[100dvh] text-encre">
    <header class="sticky top-0 z-40 bg-ciel/85 backdrop-blur-md">
      <div class="max-w-2xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 font-titre text-lg font-bold">
          Lila Chibane
        </NuxtLink>
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm font-titre text-ardoise hover:text-encre transition-colors duration-300">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Coaching
        </NuxtLink>
      </div>
    </header>

    <div class="bande-ciel">
      <div class="max-w-2xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 class="font-plume italic text-5xl md:text-[4.5rem] leading-[0.98] mb-5">La feuille de route</h1>
        <p class="font-titre font-bold text-xl md:text-2xl mb-3">Préparons ton premier échange.</p>
        <p class="text-base md:text-lg font-titre text-ardoise leading-relaxed max-w-xl">
          2 minutes, quelques questions. Ça me permet de mieux te connaître et de préparer un échange vraiment utile pour toi.
        </p>
      </div>
    </div>
    <main class="max-w-2xl mx-auto px-6 md:px-8 py-12 md:py-16">

      <QualificationForm />

      <footer class="mt-12 pt-6">
        <p class="text-xs font-titre text-ardoise/80 leading-relaxed">
          Tes données, y compris celles relatives à ta santé, sont conservées 12 mois maximum puis supprimées, et servent uniquement à préparer notre accompagnement. Pour les consulter, les rectifier ou les faire effacer, écris à
          <a href="mailto:lila.chibane.pro@outlook.com" class="underline hover:text-encre">lila.chibane.pro@outlook.com</a>.
        </p>
      </footer>
    </main>
  </div>
</template>
