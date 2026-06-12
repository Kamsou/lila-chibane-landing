<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
})

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
  nextTick(scrollActiveIntoView)
}
const transitionName = computed(() => (dir.value === 'forward' ? 'slide-left' : 'slide-right'))

const onKey = (e) => {
  if (e.key === 'ArrowRight') go(active.value + 1)
  else if (e.key === 'ArrowLeft') go(active.value - 1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="h-[100dvh] pt-16 flex flex-col">
    <div class="shrink-0 py-4 md:py-5">
      <div class="max-w-5xl mx-auto px-4 md:px-10">
        <div ref="tablist" class="inline-flex gap-1 p-1 rounded-full bg-white/5 border border-white/15 max-w-full overflow-x-auto no-scrollbar" role="tablist">
          <button
            v-for="(label, i) in labels"
            :key="i"
            type="button"
            role="tab"
            :aria-selected="active === i"
            class="tab"
            :class="active === i ? 'tab--active' : ''"
            @click="go(i)"
          >
            <span class="tab-num hidden sm:inline-block">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
      <Transition :name="transitionName" mode="out-in">
        <div :key="active" class="flex-1 min-h-0 flex flex-col">
          <slot :active="active" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tab {
  @apply flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-body whitespace-nowrap
         text-white/60 hover:text-white transition-all duration-300
         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40;
}
.tab--active {
  @apply bg-white text-bleu shadow-sm hover:text-bleu;
}
.tab-num {
  @apply text-[10px] tracking-wider tabular-nums opacity-50;
}
.tab--active .tab-num {
  @apply opacity-60;
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
