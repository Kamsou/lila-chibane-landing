<script setup>
// Page "linktree" pour la bio Instagram : lilachibane.com/liens
const { content } = await useSiteContent()

const links = computed(() => content.value.links)
const socials = computed(() => content.value.socials.filter((s) => s.key !== 'instagram-dog'))

useSeoMeta({
  title: 'Liens · Lila Chibane',
  description: "Les liens de Lila Chibane : la newsletter Corps de rêves, ses derniers numéros et le coaching sportif sport-santé.",
  ogTitle: 'Liens · Lila Chibane',
  ogDescription: 'La newsletter Corps de rêves, ses derniers numéros et le coaching sport-santé.',
  ogImage: 'https://lilachibane.com/coaching-sportif.jpeg',
  ogUrl: 'https://lilachibane.com/liens',
  robots: 'noindex, follow',
})
</script>

<template>
  <div class="min-h-[100dvh] bg-bleu text-white">
    <main class="max-w-md mx-auto px-6 pt-14 pb-[max(3rem,env(safe-area-inset-bottom))] flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-full overflow-hidden mb-5">
        <img
          src="/coaching-sportif.jpeg"
          alt="Lila Chibane"
          class="w-full h-full object-cover object-top scale-[2.2] origin-[14%_27%]"
          fetchpriority="high"
        />
      </div>
      <h1 class="font-display text-2xl font-normal text-white mb-3">Lila Chibane</h1>
      <p v-if="links.bio" class="text-[15px] font-body font-light text-white/75 leading-relaxed mb-8">{{ links.bio }}</p>

      <ul class="w-full space-y-3">
        <li v-for="(l, i) in links.items" :key="`l-${i}`">
          <a
            :href="l.url"
            target="_blank"
            rel="noopener"
            class="link-card group"
            :style="{ animationDelay: `${i * 70}ms` }"
          >
            <span class="flex-1 min-w-0 text-left">
              <span class="block text-[15px] font-body font-normal text-white leading-snug">{{ l.title }}</span>
              <span v-if="l.description" class="block text-[13px] font-body font-light text-white/60 leading-snug mt-1">{{ l.description }}</span>
            </span>
            <svg class="w-4 h-4 shrink-0 text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </li>
      </ul>

      <div class="w-full mt-10 pt-8 border-t border-white/10">
        <p class="text-[13px] font-body text-white/50 mb-4">Coaching sportif sport-santé, en visio et dans le Médoc</p>
        <NuxtLink to="/feuille-de-route" class="btn-light w-full inline-flex items-center justify-center gap-2 group">
          Remplir la feuille de route
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
        <div class="mt-5 flex items-center justify-center gap-6 text-sm font-body text-white/70">
          <NuxtLink to="/" class="hover:text-white transition-colors duration-300">Le site</NuxtLink>
          <NuxtLink to="/blog" class="hover:text-white transition-colors duration-300">Le blog</NuxtLink>
        </div>
      </div>

      <div v-if="socials.length" class="mt-8 flex items-center justify-center gap-5">
        <a
          v-for="s in socials"
          :key="s.key"
          :href="s.url"
          target="_blank"
          rel="noopener"
          :aria-label="s.label"
          class="w-10 h-10 rounded-full grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300"
        >
          <svg v-if="s.type === 'instagram'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" /></svg>
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.93V21H10z" /></svg>
        </a>
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.link-card {
  @apply flex items-center gap-4 w-full rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4
         hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300;
  opacity: 0;
  animation: linkIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes linkIn {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .link-card { animation: none; opacity: 1; }
}
</style>
