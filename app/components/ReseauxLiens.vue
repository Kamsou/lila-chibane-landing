<script setup>
defineProps({
  socials: { type: Array, default: () => [] },
})
</script>

<template>
  <div v-if="socials.length" class="flex flex-wrap items-center gap-x-6 gap-y-2">
    <a
      v-for="s in socials"
      :key="s.key"
      :href="s.url"
      target="_blank"
      rel="noopener"
      :aria-label="s.label"
      :title="s.label"
      class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-titre text-encre/80 hover:text-encre transition-colors duration-300"
    >
      <svg v-if="s.type === 'instagram'" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" /></svg>
      <svg v-else class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.93V21H10z" /></svg>
      <span v-if="s.short">{{ s.short }}</span>
    </a>
  </div>
</template>
