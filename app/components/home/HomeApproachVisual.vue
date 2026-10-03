<script setup>
// Une mini-maquette par carte "Mon approche", tirée de son texte :
// 0 la feuille de route · 1 la semaine qui s'adapte · 2 les 2 mois vers l'autonomie
defineProps({
  kind: { type: Number, default: 0 },
})

const fields = [
  { label: 'ton objectif', value: 'plus d\'énergie' },
  { label: 'ta période de vie', value: 'périménopause' },
  { label: 'ton cycle', value: 'pris en compte' },
  { label: 'ton histoire', value: '8 ans sans sport' },
]

const days = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim']

// Sur 8 semaines, l'accompagnement diminue pendant que l'autonomie monte
const weeks = Array.from({ length: 8 }, (_, i) => ({
  guide: 92 - i * 11,
  self: 14 + i * 11,
}))
</script>

<template>
  <div v-reveal="{ type: 'draw' }" class="viz">
    <!-- 0 · La feuille de route -->
    <div v-if="kind % 3 === 0" class="sheet">
      <div class="flex items-center justify-between mb-1.5">
        <p class="font-display text-[15px] font-medium">Ta feuille de route</p>
        <span class="text-[11px] font-body text-ink/45">pour toi seule</span>
      </div>
      <ul>
        <li v-for="(f, i) in fields" :key="f.label" class="sheet-row" :style="{ '--i': i }">
          <span class="sheet-check" aria-hidden="true">
            <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <span class="text-ink/50 w-[7.5rem] shrink-0">{{ f.label }}</span>
          <span class="text-ink font-medium truncate">{{ f.value }}</span>
        </li>
      </ul>
    </div>

    <!-- 1 · La semaine qui s'adapte -->
    <div v-else-if="kind % 3 === 1" class="week">
      <div class="week-grid">
        <div v-for="(d, i) in days" :key="d" class="flex flex-col gap-1.5">
          <span class="text-[11px] font-body text-center text-ink/60">{{ d }}</span>
          <div class="day" :class="{ 'day--off': i === 2 }">
            <span v-if="i === 0 || i === 4" class="session"></span>
          </div>
        </div>
        <span class="session session--moving" aria-hidden="true"></span>
      </div>
      <div class="flex items-center gap-4 mt-3 text-[11.5px] font-body text-ink/65">
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-ink"></span>séance</span>
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded day--off"></span>imprévu</span>
      </div>
      <p class="mt-2 text-[12.5px] font-body text-ink/80">Réunion mercredi ? La séance glisse à jeudi.</p>
    </div>

    <!-- 2 · Deux mois vers l'autonomie -->
    <div v-else class="months">
      <div class="months-chart">
        <div v-for="(w, i) in weeks" :key="i" class="months-col" :style="{ '--i': i }">
          <span class="bar bar--guide" :style="{ '--h': `${w.guide}%` }"></span>
          <span class="bar bar--self" :style="{ '--h': `${w.self}%` }"></span>
        </div>
      </div>
      <div class="flex justify-between mt-2 text-[11px] font-body text-paper/55">
        <span>semaine 1</span><span>semaine 8</span>
      </div>
      <div class="flex gap-4 mt-3 text-[12px] font-body text-paper/85">
        <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-paper/35"></span>mon accompagnement</span>
        <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-terra-soft"></span>ton autonomie</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.viz {
  @apply h-full font-body;
}

/* Feuille de route */
.sheet {
  @apply bg-paper text-ink rounded-2xl px-4 py-3.5 shadow-xl shadow-black/20;
}
.sheet-row {
  @apply flex items-center gap-2.5 text-[12.5px] py-[5px] border-b border-ink/10 last:border-0;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(0.3s + var(--i) * 0.18s);
}
.sheet-check {
  @apply w-4 h-4 shrink-0 rounded-full bg-bleu text-paper grid place-items-center;
}
.viz.is-in .sheet-row { opacity: 1; transform: none; }

/* Semaine */
.week {
  @apply bg-paper/90 rounded-2xl p-4;
}
.week-grid {
  --gap: 0.375rem;
  @apply relative grid grid-cols-7;
  gap: var(--gap);
}
.day {
  @apply relative h-[4.5rem] rounded-lg bg-ink/[0.06] flex flex-col justify-end p-1;
}
.day--off {
  background: repeating-linear-gradient(-45deg, rgba(18, 21, 42, 0.14) 0 4px, transparent 4px 9px);
}
.session {
  @apply block w-full h-6 rounded-md bg-ink;
}
/* La séance part de mercredi (colonne 3) et glisse à jeudi (colonne 4) */
.session--moving {
  --col-w: calc((100% - 6 * var(--gap)) / 7);
  @apply absolute bottom-1 bg-terra;
  width: calc(var(--col-w) - 0.5rem);
  left: calc(2 * (var(--col-w) + var(--gap)) + 0.25rem);
  transition: left 0.9s cubic-bezier(0.65, 0, 0.35, 1) 0.9s;
}
.viz.is-in .session--moving {
  left: calc(3 * (var(--col-w) + var(--gap)) + 0.25rem);
}

/* Deux mois */
.months-chart {
  @apply h-28 flex items-end gap-2 border-b border-paper/25;
}
.months-col {
  @apply flex-1 h-full flex items-end gap-[3px];
}
.bar {
  @apply flex-1 rounded-t-sm origin-bottom;
  height: var(--h);
  transform: scaleY(0);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(0.2s + var(--i) * 0.08s);
}
.bar--guide { @apply bg-paper/35; }
.bar--self { @apply bg-terra-soft; }
.viz.is-in .bar { transform: none; }

@media (prefers-reduced-motion: reduce) {
  .sheet-row, .session--moving, .bar { transition: none; }
}
</style>
