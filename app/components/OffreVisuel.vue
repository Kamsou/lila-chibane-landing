<script setup>
defineProps({
  type: { type: String, required: true },
})
</script>

<template>
  <div class="w-full h-full flex items-end" aria-hidden="true">
    <div v-if="type === 'semaines'" class="w-full max-w-[22rem] h-[82%] flex flex-col">
      <div class="flex items-end gap-1.5 w-full flex-1 min-h-0">
        <div v-for="w in 12" :key="w" class="flex-1 h-full flex flex-col justify-end gap-1">
          <span class="monte flex-1" :class="w === 12 ? 'bg-corail' : 'bg-azur'" :style="{ '--d': `${w * 45}ms`, opacity: w === 12 ? 1 : 0.25 + w * 0.05 }"></span>
          <span v-for="v in 3" :key="v" class="monte h-1.5 md:h-2 bg-azur/20" :style="{ '--d': `${w * 45 + 250}ms` }"></span>
        </div>
      </div>
      <div class="flex justify-between text-xs font-titre font-semibold text-encre/60 mt-1.5"><span>semaine 1</span><span class="text-corail">semaine 12</span></div>
    </div>
    <div v-else-if="type === 'conversation'" class="w-full max-w-[22rem] h-full flex flex-col justify-end gap-2.5 font-titre">
      <p class="bulle bulle-elle self-start bg-white text-encre">Je n'arrive pas à m'y remettre.</p>
      <p class="bulle bulle-lila self-end bg-azur text-white" style="--d: 500ms">On regarde ta semaine.</p>
      <p class="bulle bulle-lila self-end bg-corail text-white" style="--d: 1000ms">Voilà ton plan.</p>
    </div>
    <div v-else-if="type === 'groupe'" class="w-full max-w-[22rem] h-full flex flex-col justify-end gap-2.5 font-titre">
      <p class="bulle bulle-elle self-start bg-white text-encre">Séance faite ce matin, 20 minutes.</p>
      <p class="bulle bulle-elle self-start bg-white text-encre" style="--d: 500ms">Moi ce soir, avant le dîner.</p>
      <p class="bulle bulle-lila self-end bg-corail text-white" style="--d: 1000ms">Bravo les tortues !</p>
    </div>
    <img v-else src="/tortue.svg" alt="" class="h-[82%] w-auto max-w-[22rem] object-contain object-left-bottom" />
  </div>
</template>

<style scoped lang="postcss">
.monte {
  transform-origin: bottom;
  animation: monte 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes monte {
  from { transform: scaleY(0); }
}
.bulle {
  @apply px-4 py-2.5 text-[15px] leading-snug max-w-[85%] shadow-sm;
  border-radius: 1.1rem;
  animation: bulle 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}
.bulle-elle { border-bottom-left-radius: 0.25rem; }
.bulle-lila { border-bottom-right-radius: 0.25rem; }
@keyframes bulle {
  from { opacity: 0; transform: translateY(8px) scale(0.96); }
}
@media (prefers-reduced-motion: reduce) {
  .monte, .bulle { animation: none; }
}
</style>
