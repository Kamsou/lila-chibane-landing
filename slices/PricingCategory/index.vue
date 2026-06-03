<script setup>
const props = defineProps({
  slice: { type: Object, required: true },
})

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
  <details class="pricing-category bg-cream rounded-xl mb-5 md:mb-6 break-inside-avoid reveal group">
    <summary class="flex items-center justify-between gap-4 cursor-pointer list-none p-6 md:p-7 marker:hidden">
      <h3 class="text-base md:text-lg font-display font-normal text-warm">
        {{ slice.primary.title }}
      </h3>
      <div class="flex items-center gap-4 shrink-0">
        <span v-if="priceRange" class="text-sm font-body font-normal text-bleu whitespace-nowrap">
          {{ priceRange }}
        </span>
        <svg
          class="w-4 h-4 text-gray-light transition-transform duration-300 group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </summary>

    <div class="px-6 md:px-7 pb-6 md:pb-7 pt-1">
      <table class="w-full border-collapse">
        <thead v-if="hasHeaders">
          <tr class="border-b border-gray-faint">
            <th class="text-left text-[10px] sm:text-xs font-body font-normal text-gray-light tracking-wide pb-2 md:pb-3">
              {{ slice.primary.col1_label }}
            </th>
            <th class="text-right text-[10px] sm:text-xs font-body font-normal text-gray-light tracking-wide pb-2 md:pb-3 pl-4">
              {{ slice.primary.col2_label }}
            </th>
            <th
              v-if="hasCol3"
              class="text-right text-[10px] sm:text-xs font-body font-normal text-gray-light tracking-wide pb-2 md:pb-3 pl-4 hidden sm:table-cell"
            >
              {{ slice.primary.col3_label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in slice.items"
            :key="i"
            class="border-b border-gray-faint last:border-0"
          >
            <td class="py-3 md:py-3.5 pr-3 text-sm md:text-base font-body text-warm align-top">
              {{ item.col1 }}
              <span
                v-if="hasCol3 && item.col3"
                class="block sm:hidden text-xs font-body font-light text-gray mt-1"
              >
                {{ item.col3 }}
              </span>
            </td>
            <td class="py-3 md:py-3.5 pl-4 text-sm md:text-base font-body font-normal text-bleu text-right whitespace-nowrap align-top">
              {{ item.col2 }}
            </td>
            <td
              v-if="hasCol3"
              class="py-3 md:py-3.5 pl-4 text-xs md:text-sm font-body font-light text-gray text-right align-top hidden sm:table-cell"
            >
              {{ item.col3 }}
            </td>
          </tr>
        </tbody>
      </table>

      <p
        v-if="slice.primary.note"
        class="text-xs font-body font-light italic text-gray-light mt-4 md:mt-5"
      >
        {{ slice.primary.note }}
      </p>
    </div>
  </details>
</template>

<style scoped>
summary::-webkit-details-marker { display: none; }
</style>
