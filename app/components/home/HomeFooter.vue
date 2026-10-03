<template>
  <footer class="bg-ink text-paper/60">
    <div class="max-w-6xl mx-auto px-5 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-body">
      <p class="flex items-center gap-2"><span class="font-display text-base text-paper">Lila Chibane</span> · Coach sportive · Médoc</p>
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="hover:text-paper transition-colors">Coaching</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-paper transition-colors">Blog</NuxtLink>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </div>
  </footer>
</template>
