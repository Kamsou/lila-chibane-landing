<script setup>
// Cohérence simple : 4 s d'inspiration, 6 s d'expiration, 3 cycles (30 s)
const INHALE = 4
const EXHALE = 6
const CYCLES = 3

const phase = ref('idle') // idle | inhale | exhale | done
const cycle = ref(0)
const count = ref(0)

let phaseTimer = null
let tickTimer = null

const clear = () => {
  clearTimeout(phaseTimer)
  clearInterval(tickTimer)
}

const run = (name, seconds, next) => {
  phase.value = name
  count.value = seconds
  clearInterval(tickTimer)
  tickTimer = setInterval(() => {
    if (count.value > 1) count.value--
  }, 1000)
  phaseTimer = setTimeout(next, seconds * 1000)
}

const breathe = () => {
  cycle.value++
  run('inhale', INHALE, () =>
    run('exhale', EXHALE, () => {
      if (cycle.value < CYCLES) breathe()
      else {
        clear()
        phase.value = 'done'
      }
    })
  )
}

const start = () => {
  clear()
  cycle.value = 0
  breathe()
}
const stop = () => {
  clear()
  phase.value = 'idle'
  cycle.value = 0
}

onUnmounted(clear)

const running = computed(() => phase.value === 'inhale' || phase.value === 'exhale')
const label = computed(() => ({
  idle: 'Prête ?',
  inhale: 'Inspire',
  exhale: 'Expire',
  done: 'Voilà.',
})[phase.value])
const orbStyle = computed(() => {
  if (phase.value === 'inhale') return { transform: 'scale(1)', transitionDuration: `${INHALE}s` }
  if (phase.value === 'exhale') return { transform: 'scale(0.62)', transitionDuration: `${EXHALE}s` }
  return { transform: 'scale(0.62)', transitionDuration: '1.2s' }
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
    <div v-reveal>
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-ink leading-[0.98] tracking-tight mb-6">
        Respire avec moi
      </h2>
      <p class="text-base md:text-lg font-body font-light text-ink/70 leading-relaxed max-w-md mb-8">
        Trente secondes pour sortir du pilote automatique. Ton système nerveux se pose, ton corps redevient un allié. C'est souvent là que tout commence.
      </p>
      <div class="flex items-center gap-4">
        <button v-if="!running" type="button" class="pause-btn" @click="start">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
          {{ phase === 'done' ? 'Encore une fois' : 'Commencer' }}
        </button>
        <button v-else type="button" class="pause-btn pause-btn--ghost" @click="stop">Arrêter</button>
        <div class="flex gap-1.5" aria-hidden="true">
          <span
            v-for="n in CYCLES"
            :key="n"
            class="w-2 h-2 rounded-full transition-colors duration-500"
            :class="n <= cycle || phase === 'done' ? 'bg-terra' : 'bg-ink/15'"
          ></span>
        </div>
      </div>
    </div>

    <div v-reveal="{ type: 'scale', delay: 120 }" class="relative mx-auto w-full max-w-[26rem] aspect-square">
      <span class="ripple" :class="{ 'ripple--on': running }" aria-hidden="true"></span>
      <span class="ripple ripple--2" :class="{ 'ripple--on': running }" aria-hidden="true"></span>
      <div class="orb" :class="{ 'orb--idle': phase === 'idle' || phase === 'done' }" :style="orbStyle" aria-hidden="true"></div>
      <div class="absolute inset-0 grid place-items-center pointer-events-none">
        <div class="text-center text-paper" aria-live="polite">
          <p class="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-none">{{ label }}</p>
          <p v-if="running" class="mt-3 font-body text-sm text-paper/80 tabular-nums">{{ count }}</p>
          <p v-else-if="phase === 'done'" class="mt-3 font-body text-sm text-paper/85 max-w-[12rem] mx-auto leading-snug">Ton corps vient de te dire merci.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.pause-btn {
  @apply inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-paper text-sm font-body font-medium
         hover:bg-terra active:scale-[0.97] transition-all duration-300;
}
.pause-btn--ghost {
  @apply bg-transparent text-ink border border-ink/25 hover:bg-ink hover:text-paper;
}

.orb {
  @apply absolute inset-0 rounded-full;
  background:
    radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.35), transparent 42%),
    radial-gradient(circle at 70% 75%, #EE8A63, transparent 60%),
    linear-gradient(140deg, #1B3FA0 10%, #3B5FD0 45%, #C9502B 100%);
  box-shadow: 0 40px 80px -30px rgba(27, 63, 160, 0.6), inset 0 -20px 60px rgba(18, 21, 42, 0.25);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
}
.orb--idle {
  animation: idle 10s ease-in-out infinite;
}
@keyframes idle {
  0%, 100% { transform: scale(0.62); }
  40% { transform: scale(0.7); }
}

.ripple {
  @apply absolute inset-[19%] rounded-full border border-terra/40 opacity-0;
}
.ripple--on {
  animation: ripple 5s ease-out infinite;
}
.ripple--2.ripple--on {
  animation-delay: 2.5s;
}
@keyframes ripple {
  from { transform: scale(1); opacity: 0.7; }
  to { transform: scale(1.6); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .orb--idle, .ripple--on { animation: none; }
}
</style>
