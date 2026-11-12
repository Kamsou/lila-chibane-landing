<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
  slugs: { type: Array, default: () => [] },
  ciels: { type: Array, default: () => [] },
  burger: { type: Boolean, default: false },
  nuit: { type: Array, default: () => [] },
  plein: { type: Array, default: () => [] },
  accueil: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

const active = ref(0)
const dir = ref('forward')
const tablist = ref(null)

const scrollActiveIntoView = () => {
  tablist.value?.children?.[active.value]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
}

const go = (i) => {
  const next = Math.min(Math.max(i, 0), props.labels.length - 1)
  if (next === active.value) return
  dir.value = next > active.value ? 'forward' : 'back'
  active.value = next
  emit('change', next)
  nextTick(scrollActiveIntoView)
  syncHash()
}

const router = useRouter()
const menuOuvert = ref(false)
const choisir = (i) => {
  menuOuvert.value = false
  go(i)
}
const fermerMenu = (e) => { if (e.key === 'Escape') menuOuvert.value = false }
watch(active, () => { menuOuvert.value = false })
useHead({ htmlAttrs: { class: computed(() => (props.nuit.includes(active.value) ? 'de-nuit' : '')) } })
const syncHash = () => {
  if (!props.slugs.length) return
  const hash = active.value > 0 ? `#${props.slugs[active.value]}` : ''
  if (hash === location.hash) return
  router.replace({ query: router.currentRoute.value.query, hash })
}
const readHash = () => {
  const hash = decodeURIComponent(location.hash.slice(1))
  const i = hash ? props.slugs.indexOf(hash) : 0
  if (i >= 0) go(i)
}
watch(() => router.currentRoute.value.hash, () => nextTick(readHash))
const transitionName = computed(() => (dir.value === 'forward' ? 'slide-left' : 'slide-right'))

const onKey = (e) => {
  if (e.key === 'ArrowRight') go(active.value + 1)
  else if (e.key === 'ArrowLeft') go(active.value - 1)
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('hashchange', readHash)
  window.addEventListener('keydown', fermerMenu)
  readHash()
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('hashchange', readHash)
  window.removeEventListener('keydown', fermerMenu)
})

let touchX = 0
let touchY = 0
const onTouchStart = (e) => {
  touchX = e.changedTouches[0].clientX
  touchY = e.changedTouches[0].clientY
}
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchX
  const dy = e.changedTouches[0].clientY - touchY
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6) {
    go(active.value + (dx < 0 ? 1 : -1))
  }
}
</script>

<template>
  <div class="relative h-[100dvh] flex flex-col" :class="plein.includes(active) ? '' : 'pt-16'">
    <div v-if="ciels.length" class="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div v-for="(c, i) in ciels" :key="i" class="ciel absolute inset-0" :style="{ background: c, opacity: i === active ? 1 : 0 }"></div>
    </div>
    <div class="shrink-0 lg:py-0 lg:fixed lg:top-0 lg:inset-x-0 lg:z-50 lg:h-16 lg:flex lg:items-center lg:justify-center lg:pointer-events-none" :class="burger ? 'hidden' : 'py-1'">
      <div class="px-6 lg:px-0">
        <div ref="tablist" class="max-w-full overflow-x-auto no-scrollbar flex gap-6 lg:gap-7 pointer-events-auto" role="tablist">
          <button
            v-for="(label, i) in labels"
            :key="i"
            type="button"
            role="tab"
            :aria-selected="active === i"
            v-show="!(accueil && i === 0)"
            class="tab"
            :class="active === i ? 'tab--active' : ''"
            @click="go(i)"
          >
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <template v-if="burger">
      <button
        type="button"
        class="bouton-menu lg:hidden fixed top-0 right-0 z-50 h-16 pl-4 pr-5 flex items-center gap-2.5 font-titre font-semibold text-sm text-encre transition-colors duration-700"
        :aria-expanded="menuOuvert"
        aria-controls="menu-onglets"
        @click="menuOuvert = true"
      >
        <span>{{ accueil && active === 0 ? 'Menu' : labels[active] }}</span>
        <span class="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white/80 text-encre">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
        </span>
        <span class="sr-only">Ouvrir le menu</span>
      </button>
      <Transition name="menu">
        <nav v-if="menuOuvert" id="menu-onglets" class="lg:hidden fixed inset-0 z-[60] bg-ciel flex flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]" aria-label="Sections">
          <div class="h-16 flex items-center justify-between shrink-0">
            <button type="button" class="font-titre font-bold text-encre text-lg tracking-tight" @click="choisir(0)">Lila Chibane</button>
            <button type="button" class="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-encre" aria-label="Fermer le menu" @click="menuOuvert = false">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <ul class="flex-1 flex flex-col justify-center gap-1">
            <li v-for="(label, i) in labels" v-show="!(accueil && i === 0)" :key="i" class="menu-item" :style="{ transitionDelay: `${i * 40}ms` }">
              <button
                type="button"
                class="w-full text-left py-2 font-plume italic text-[2.6rem] leading-tight transition-colors duration-300"
                :class="active === i ? 'text-corail' : 'text-encre'"
                :aria-current="active === i ? 'true' : undefined"
                @click="choisir(i)"
              >{{ label }}</button>
            </li>
          </ul>
          <NuxtLink to="/blog" class="shrink-0 btn-azur self-start" @click="menuOuvert = false">Le blog</NuxtLink>
        </nav>
      </Transition>
    </template>

    <div
      class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <Transition :name="transitionName" mode="out-in">
        <div :key="active" class="flex-1 min-h-0 flex flex-col">
          <slot :active="active" :go="go" />
        </div>
      </Transition>
    </div>

    <p class="md:hidden shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-[11px] font-titre" :class="[nuit.includes(active) ? 'text-white/70' : 'text-ardoise/70', plein.includes(active) ? 'absolute bottom-0 inset-x-0 z-10' : '']">
      {{ burger ? 'Glisse pour passer à la suite' : 'Glisse ou touche un onglet pour naviguer' }}
    </p>
  </div>
</template>

<style scoped>
.tab {
  @apply relative flex items-center py-2 text-[15px] font-titre whitespace-nowrap
         text-ardoise hover:text-encre transition-colors duration-300
         focus:outline-none focus-visible:ring-2 focus-visible:ring-azur/40;
}
.tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background-color: rgb(var(--accent, 162 89 217));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.tab--active {
  @apply text-encre;
}
.tab--active::after {
  transform: scaleX(1);
}
.ciel {
  transition: opacity 1.6s ease;
}
@media (prefers-reduced-motion: reduce) {
  .ciel { transition: none; }
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active { transition: opacity 0.2s ease; }
  .menu-enter-from,
  .menu-leave-to { transform: none; }
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.slide-left-enter-active,
.slide-right-enter-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-left-leave-active,
.slide-right-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.slide-left-enter-from { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-32px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to { opacity: 0; transform: translateX(32px); }

@media (prefers-reduced-motion: reduce) {
  .slide-left-enter-active,
  .slide-right-enter-active,
  .slide-left-leave-active,
  .slide-right-leave-active { transition: opacity 0.2s ease; }
  .slide-left-enter-from,
  .slide-right-enter-from,
  .slide-left-leave-to,
  .slide-right-leave-to { transform: none; }
}
</style>
