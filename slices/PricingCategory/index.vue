<script setup>
defineProps({
  slice: { type: Object, required: true },
})
</script>

<template>
  <div class="reveal">
    <h3 class="text-lg md:text-xl font-display font-normal text-warm mb-4">
      {{ slice.primary.title }}
    </h3>

    <div class="grid grid-cols-[1fr_auto_auto] gap-x-5 sm:gap-x-8 gap-y-3 items-baseline">
      <template v-if="slice.primary.col1_label || slice.primary.col2_label || slice.primary.col3_label">
        <div class="text-[10px] sm:text-xs font-body text-gray-light tracking-wider uppercase pb-2 border-b border-gray-faint">
          {{ slice.primary.col1_label }}
        </div>
        <div class="text-[10px] sm:text-xs font-body text-gray-light tracking-wider uppercase pb-2 border-b border-gray-faint text-right">
          {{ slice.primary.col2_label }}
        </div>
        <div class="text-[10px] sm:text-xs font-body text-gray-light tracking-wider uppercase pb-2 border-b border-gray-faint text-right">
          {{ slice.primary.col3_label }}
        </div>
      </template>

      <template v-for="(item, i) in slice.items" :key="i">
        <div class="text-sm md:text-base font-body text-warm">{{ item.col1 }}</div>
        <div class="text-sm md:text-base font-body font-normal text-bleu text-right whitespace-nowrap">{{ item.col2 }}</div>
        <div class="text-xs md:text-sm font-body font-light text-gray text-right">{{ item.col3 }}</div>
      </template>
    </div>

    <p v-if="slice.primary.note" class="text-xs font-body font-light italic text-gray-light mt-4">
      {{ slice.primary.note }}
    </p>
  </div>
</template>
