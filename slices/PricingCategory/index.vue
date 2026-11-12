<script setup>
const props = defineProps({
  slice: { type: Object, required: true },
  mode: { type: String, default: 'detail' },
})
const emit = defineEmits(['select'])

const hasHeaders = computed(() =>
  Boolean(props.slice.primary.col1_label || props.slice.primary.col2_label || props.slice.primary.col3_label)
)
const hasCol3 = computed(() =>
  Boolean(props.slice.primary.col3_label) || props.slice.items.some((it) => it.col3)
)

const priceRange = computed(() => {
  const items = props.slice.items || []
  if (!items.length) return null
  if (items.some((it) => /\//.test(it.col2 || ''))) return null
  const nums = items
    .map((it) => parseFloat((it.col2 || '').replace(/[^\d,.-]/g, '').replace(',', '.')))
    .filter((n) => !isNaN(n))
  if (nums.length === 0) return null
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const fmt = (n) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')}€`
  return min === max ? fmt(min) : `${fmt(min)} à ${fmt(max)}`
})
</script>

<template>
  <button v-if="mode === 'summary'" type="button" class="price-summary group" @click="emit('select')">
    <h3 class="text-base md:text-lg font-titre font-bold text-encre">
      {{ slice.primary.title }}
    </h3>
    <div class="flex items-center gap-3 shrink-0">
      <span v-if="priceRange" class="text-sm font-titre font-normal text-encre whitespace-nowrap">{{ priceRange }}</span>
      <svg class="w-4 h-4 text-ardoise/80 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </div>
  </button>

  <div v-else class="rounded-xl bg-white border border-brume p-5 md:p-6">
    <div class="flex items-center justify-between gap-4 mb-4 md:mb-5">
      <h3 class="text-lg md:text-xl font-titre font-bold text-encre">{{ slice.primary.title }}</h3>
      <span v-if="priceRange" class="text-sm font-titre text-ardoise whitespace-nowrap">{{ priceRange }}</span>
    </div>

    <table class="w-full border-collapse">
      <thead v-if="hasHeaders">
        <tr class="border-b border-brume">
          <th class="text-left text-[10px] sm:text-xs font-titre font-normal text-ardoise/80 tracking-wide pb-2 md:pb-3">{{ slice.primary.col1_label }}</th>
          <th class="text-right text-[10px] sm:text-xs font-titre font-normal text-ardoise/80 tracking-wide pb-2 md:pb-3 pl-4">{{ slice.primary.col2_label }}</th>
          <th v-if="hasCol3" class="text-right text-[10px] sm:text-xs font-titre font-normal text-ardoise/80 tracking-wide pb-2 md:pb-3 pl-4 hidden sm:table-cell">{{ slice.primary.col3_label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in slice.items" :key="i" class="border-b border-brume last:border-0">
          <td class="py-2.5 pr-3 text-sm md:text-base font-titre text-encre align-top">
            {{ item.col1 }}
            <span v-if="hasCol3 && item.col3" class="block sm:hidden text-xs font-titre text-ardoise mt-1">
              <span v-if="slice.primary.col3_label" class="text-ardoise/80">{{ slice.primary.col3_label }} : </span>{{ item.col3 }}
            </span>
          </td>
          <td class="py-2.5 pl-4 text-sm md:text-base font-titre font-normal text-encre text-right whitespace-nowrap align-top">{{ item.col2 }}</td>
          <td v-if="hasCol3" class="py-2.5 pl-4 text-xs md:text-sm font-titre text-ardoise text-right align-top hidden sm:table-cell">{{ item.col3 }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="slice.primary.note" class="text-xs font-titre italic text-ardoise/80 mt-4 md:mt-5">{{ slice.primary.note }}</p>
  </div>
</template>

<style scoped lang="postcss">
.price-summary {
  @apply w-full flex items-center justify-between gap-4 text-left p-4 md:p-5 rounded-xl
         bg-white border border-brume
         hover:bg-nuage hover:-translate-y-0.5
         transition-all duration-300 break-inside-avoid;
}
</style>
