<script setup>
// Deux trajectoires qui partent ensemble et se séparent à 45 ans.
// Repère 0..100 : x = (âge - 30) / 50 * 100, y vers le bas = moins d'énergie.
const ageToX = (age) => ((age - 30) / 50) * 100
const ticks = [30, 40, 45, 50, 60, 70, 80]
const keyAges = [45, 60]

const told = 'M0,46 C12,40 22,38 30,42 S48,58 60,70 S84,86 100,92'
const built = 'M0,46 C12,40 22,38 30,42 C38,45 46,36 56,31 S80,22 100,17'

const clipId = `curve-${useId()}`
const root = ref(null)
const curve = ref(null)
const progress = ref(0)
const head = ref({ x: 0, y: 46 })

let ticking = false
const update = () => {
  ticking = false
  const el = root.value
  const path = curve.value
  if (!el || !path) return
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  // 0 quand le haut du graphique entre par le bas, 1 quand il arrive vers le milieu de l'écran
  const p = Math.min(Math.max((vh - r.top) / (vh * 0.55), 0), 1)
  progress.value = p
  const len = path.getTotalLength()
  const pt = path.getPointAtLength(len * p)
  head.value = { x: pt.x, y: pt.y }
}
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 1
    head.value = { x: 100, y: 17 }
    return
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

const split = computed(() => progress.value > 0.32)
</script>

<template>
  <div>
    <div class="grid md:grid-cols-[1fr_auto] gap-6 md:gap-16 items-end mb-10 lg:mb-12">
      <h2 v-reveal class="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-ink leading-[0.98] tracking-tight max-w-3xl">
        45 ans n'est pas un virage. 60 ans n'est pas une fin.
      </h2>
      <p v-reveal="{ delay: 120 }" class="text-base font-body font-light text-ink/65 leading-relaxed max-w-xs">
        On t'a raconté une pente. On peut écrire une autre courbe, la tienne.
      </p>
    </div>

    <figure ref="root" class="relative">
      <div class="relative aspect-[4/3] sm:aspect-auto sm:h-[clamp(13rem,38svh,22rem)]">
        <!-- Repères verticaux -->
        <span
          v-for="age in keyAges"
          :key="`k-${age}`"
          class="absolute top-0 bottom-0 w-px bg-ink/15"
          :style="{ left: `${ageToX(age)}%` }"
          aria-hidden="true"
        ></span>

        <svg class="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <!-- La courbe avance de gauche à droite : on la dévoile jusqu'à sa tête -->
            <clipPath :id="clipId">
              <rect x="-2" y="-10" :width="head.x + 2" height="120" />
            </clipPath>
          </defs>
          <path :d="told" class="curve-told" :class="{ 'curve-told--on': split }" vector-effect="non-scaling-stroke" />
          <path ref="curve" :d="built" class="curve-built" vector-effect="non-scaling-stroke" :clip-path="`url(#${clipId})`" />
        </svg>

        <span class="curve-head" :style="{ left: `${head.x}%`, top: `${head.y}%` }" aria-hidden="true"></span>

        <p class="curve-label text-terra" :style="{ top: '3%', opacity: progress > 0.85 ? 1 : 0 }">ce qu'on construit ensemble</p>
        <p class="curve-label text-ink/50" :style="{ top: '78%', opacity: split ? 1 : 0 }">ce qu'on t'a raconté</p>
      </div>

      <!-- Axe des âges -->
      <div class="relative h-10 mt-3 border-t border-ink/20" aria-hidden="true">
        <span
          v-for="age in ticks"
          :key="`t-${age}`"
          class="absolute top-2 -translate-x-1/2 text-[12px] sm:text-[13px] font-body tabular-nums"
          :class="keyAges.includes(age) ? 'text-ink font-medium' : 'text-ink/40'"
          :style="{ left: `${ageToX(age)}%` }"
        >{{ age }}</span>
      </div>
      <figcaption class="sr-only">
        Illustration : deux trajectoires d'énergie et de force au fil de l'âge. Celle qu'on t'a racontée décline à partir de 45 ans, celle qu'on construit ensemble continue de monter après 45 et 60 ans.
      </figcaption>
    </figure>
  </div>
</template>

<style scoped lang="postcss">
.curve-told {
  fill: none;
  stroke: rgba(18, 21, 42, 0.35);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 1 7;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.curve-told--on { opacity: 1; }
.curve-built {
  fill: none;
  stroke: #C9502B;
  stroke-width: 4;
  stroke-linecap: round;
}
.curve-head {
  @apply absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-terra;
  box-shadow: 0 0 0 6px rgba(201, 80, 43, 0.18);
}
.curve-label {
  @apply absolute right-0 pl-2 bg-paper text-[13px] sm:text-[15px] font-body font-medium transition-opacity duration-700;
}
@media (prefers-reduced-motion: reduce) {
  .curve-told, .curve-label { transition: none; }
}
</style>
