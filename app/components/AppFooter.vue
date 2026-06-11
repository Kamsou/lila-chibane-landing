<script setup>
defineProps({
  simple: { type: Boolean, default: false },
})

const { navLinks: footerLinks, homepage } = await useNavLinks()

const tagline = computed(() => {
  const d = homepage.value?.data || {}
  return [
    { key: 'coaching', label: 'Coach sportive' },
    { key: 'peinture', label: 'Peintre' },
    { key: 'son', label: 'Créatrice sonore' },
    { key: 'dog', label: 'Dog sitter' },
  ]
    .filter((r) => isSectionVisible(d, r.key))
    .map((r) => r.label)
    .join(' · ')
})
</script>

<template>
  <!-- Footer complet -->
  <footer v-if="!simple" class="bg-warm py-16 md:py-20 px-6 md:px-10">
    <div class="max-w-5xl mx-auto">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <p class="font-display text-xl text-white font-normal mb-3">Lila Chibane</p>
          <p class="text-xs font-body text-white/30 leading-relaxed tracking-wide">
            {{ tagline }}<br>Médoc, France
          </p>
        </div>

        <div>
          <nav class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in footerLinks"
              :key="link.id"
              :to="link.href"
              class="text-sm font-body text-white/40 hover:text-white transition-colors duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div>
          <a
            href="mailto:lila.chibane@outlook.com"
            class="text-sm font-body text-white/40 hover:text-white transition-colors duration-300"
          >
            lila.chibane@outlook.com
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 mt-14 md:mt-16 pt-8">
        <p class="text-xs font-body text-white/20 tracking-wide">
          &copy; {{ new Date().getFullYear() }} Lila Chibane
        </p>
      </div>
    </div>
  </footer>

  <!-- Footer simple -->
  <footer v-else class="bg-warm py-14 md:py-16 px-6 md:px-10">
    <div class="max-w-5xl mx-auto flex flex-col items-center gap-3">
      <p class="font-display text-lg text-white font-normal">Lila Chibane</p>
      <p class="text-xs font-body text-white/30">&copy; {{ new Date().getFullYear() }} Lila Chibane</p>
      <NuxtLink to="/" class="text-xs font-body text-white/40 hover:text-white transition-colors duration-300 mt-1">
        Retour à l'accueil
      </NuxtLink>
    </div>
  </footer>
</template>
