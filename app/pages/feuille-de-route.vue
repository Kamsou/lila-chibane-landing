<script setup>
useSeoMeta({
  title: 'La feuille de route · questionnaire coaching · Lila Chibane',
  description: "Quelques questions pour préparer notre premier échange coaching sport-santé. 2 minutes, confidentiel.",
  robots: 'noindex, follow',
})

const navLinks = [
  { label: 'Coaching', to: '/' },
  { label: 'Blog', to: '/blog' },
]
</script>

<template>
  <div class="min-h-[100dvh] bg-paper text-ink">
    <HomeNav :links="navLinks" :cta="false" />

    <main class="max-w-6xl mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
      <QualificationForm>
        <template #intro>
          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[0.98] tracking-tight mb-6">
            Préparons ton premier échange
          </h1>
          <p class="text-base md:text-lg font-body font-light text-ink/70 leading-relaxed">
            Prends 2 minutes pour répondre à quelques questions. Ça me permet de mieux te connaître et de préparer un premier échange vraiment utile pour toi.
          </p>
        </template>
      </QualificationForm>

      <p class="mt-14 pt-6 border-t border-ink/10 text-xs font-body font-light text-ink/50 leading-relaxed max-w-3xl">
        Tes données, y compris celles relatives à ta santé, sont conservées 12 mois maximum puis supprimées, et servent uniquement à préparer notre accompagnement. Pour les consulter, les rectifier ou les faire effacer, écris à
        <a href="mailto:lila.chibane.pro@outlook.com" class="underline hover:text-ink">lila.chibane.pro@outlook.com</a>.
      </p>
    </main>

    <HomeFooter />
  </div>
</template>
