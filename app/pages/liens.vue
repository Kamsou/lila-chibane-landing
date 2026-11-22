<script setup>
// Page "linktree" pour la bio Instagram : lilachibane.com/liens
const { content } = await useSiteContent()

const links = computed(() => content.value.links)
const socials = computed(() => content.value.socials.filter((s) => s.key !== 'instagram-dog'))
const numeros = computed(() => links.value.items.filter((l) => l.title.startsWith('#')))
const newsletter = computed(() => links.value.items.find((l) => !l.title.startsWith('#')))
const numero = (title) => {
  const m = title.match(/^(#\d+)\s*(.*)$/)
  return m ? { num: m[1], rest: m[2] } : { num: '', rest: title }
}
const NuxtLink = resolveComponent('NuxtLink')
const offres = computed(() => content.value.offres.items.map((o, i) => {
  const interne = o.url.startsWith('/')
  return { nom: o.nom, detail: [o.note, o.prix].filter(Boolean).join(', '), to: interne ? o.url : undefined, href: interne ? undefined : o.url, fort: i === 0 }
}))

useSeoMeta({
  title: 'Liens · Lila Chibane',
  description: "Les liens de Lila Chibane : la newsletter Corps de rêves, ses derniers numéros et le coaching sportif sport-santé.",
  ogTitle: 'Liens · Lila Chibane',
  ogDescription: 'La newsletter Corps de rêves, ses derniers numéros et le coaching sport-santé.',
  ogImage: 'https://lilachibane.com/og-lila.jpg',
  ogUrl: 'https://lilachibane.com/liens',
  robots: 'noindex, follow',
})
</script>

<template>
  <div class="min-h-[100dvh] text-encre">
    <main class="max-w-md mx-auto px-5 pt-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
      <header class="flex flex-col items-center text-center mb-10">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-white/70 shadow-lg shadow-encre/10">
          <img src="/lila-rire.jpg" alt="Lila Chibane" class="teinte w-full h-full object-cover" fetchpriority="high" />
        </div>
        <h1 class="font-titre text-xl font-bold mb-2">Lila Chibane</h1>
        <p class="font-plume italic text-[1.6rem] leading-snug text-encre">Tu as le droit de comprendre ton corps <span class="text-corail">avant qu'on te dise quoi en faire.</span></p>
      </header>

      <section class="mb-10" aria-labelledby="t-accompagnements">
        <h2 id="t-accompagnements" class="font-titre font-bold text-lg mb-3">Avancer avec moi</h2>
        <ul class="space-y-2.5">
          <li v-for="(o, i) in offres" :key="o.nom" class="lien-in" :style="{ animationDelay: `${i * 70}ms` }">
            <component
              :is="o.to ? NuxtLink : 'a'"
              :to="o.to"
              :href="o.href"
              :target="o.href ? '_blank' : undefined"
              :rel="o.href ? 'noopener' : undefined"
              class="bouton group"
              :class="o.fort ? 'bg-encre text-white shadow-lg shadow-encre/20' : 'bg-white/75 text-encre hover:bg-white'"
            >
              <span class="min-w-0">
                <span class="block font-plume italic text-[1.45rem] leading-tight">{{ o.nom }}</span>
                <span class="block text-[13px] font-titre mt-0.5" :class="o.fort ? 'text-white/70' : 'text-ardoise'">{{ o.detail }}</span>
              </span>
              <span class="fleche" :class="o.fort ? 'bg-corail text-white' : 'bg-ciel text-encre/60 group-hover:text-encre'"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </component>
          </li>
        </ul>
      </section>

      <section class="mb-10" aria-labelledby="t-newsletter">
        <h2 id="t-newsletter" class="font-titre font-bold text-lg mb-1">Corps de rêves, ma newsletter</h2>
        <p class="font-titre text-[15px] text-ardoise mb-3">Chaque dimanche, le corps des femmes, le sport et la gourmandise.</p>
        <a v-if="newsletter" :href="newsletter.url" target="_blank" rel="noopener" class="bouton group bg-azur text-white shadow-lg shadow-azur/20 mb-4">
          <span class="font-titre font-semibold">S'abonner gratuitement</span>
          <span class="fleche bg-white text-azur"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
        </a>
        <ul>
          <li v-for="l in numeros" :key="l.url">
            <a :href="l.url" target="_blank" rel="noopener" class="group block py-3">
              <span class="block font-plume italic text-[1.3rem] leading-tight text-encre group-hover:text-azur transition-colors duration-300"><span class="text-corail">{{ numero(l.title).num }}</span> {{ numero(l.title).rest }}</span>
              <span v-if="l.description" class="block text-[13px] font-titre text-ardoise leading-snug mt-1">{{ l.description }}</span>
            </a>
          </li>
        </ul>
      </section>

      <footer class="flex flex-col items-center gap-5">
        <div class="flex items-center gap-6 text-sm font-titre font-semibold text-azur">
          <NuxtLink to="/" class="underline underline-offset-4 decoration-azur/40 hover:decoration-azur">Le site</NuxtLink>
          <NuxtLink to="/blog" class="underline underline-offset-4 decoration-azur/40 hover:decoration-azur">Le blog</NuxtLink>
        </div>
        <div v-if="socials.length" class="flex items-center gap-3">
          <a
            v-for="s in socials"
            :key="s.key"
            :href="s.url"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="w-11 h-11 rounded-full grid place-items-center bg-white/75 text-encre hover:bg-white transition-colors duration-300"
          >
            <svg v-if="s.type === 'instagram'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" /></svg>
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.93V21H10z" /></svg>
          </a>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.bouton {
  @apply w-full flex items-center justify-between gap-4 rounded-full pl-6 pr-2.5 py-2.5 text-left
         transition-all duration-300 hover:-translate-y-0.5;
}
.fleche {
  @apply shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300;
}
.lien-in {
  opacity: 0;
  animation: lienIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes lienIn {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .lien-in { animation: none; opacity: 1; }
}
</style>
