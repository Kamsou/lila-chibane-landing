// v-reveal : apparition au scroll (classe .is-in ajoutée quand l'élément entre à l'écran)
// v-magnetic : le bouton suit légèrement le curseur (souris uniquement)
export default defineNuxtPlugin((nuxtApp) => {
  let io = null
  const observer = () => {
    if (io) return io
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    return io
  }

  const revealProps = (binding) => {
    const delay = binding.value?.delay
    return {
      'data-reveal': binding.value?.type || 'up',
      ...(delay ? { style: `--reveal-delay:${delay}ms` } : {}),
    }
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: revealProps,
    mounted(el, binding) {
      const props = revealProps(binding)
      el.setAttribute('data-reveal', props['data-reveal'])
      if (binding.value?.delay) el.style.setProperty('--reveal-delay', `${binding.value.delay}ms`)
      observer().observe(el)
    },
    unmounted(el) {
      io?.unobserve(el)
    },
  })

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el, binding) {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!fine || calm) return
      const strength = binding.value || 0.3
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      el._onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) * strength
        const y = (e.clientY - (r.top + r.height / 2)) * strength
        el.style.transform = `translate(${x}px, ${y}px)`
      }
      el._onLeave = () => { el.style.transform = '' }
      el.addEventListener('pointermove', el._onMove)
      el.addEventListener('pointerleave', el._onLeave)
    },
    unmounted(el) {
      if (!el._onMove) return
      el.removeEventListener('pointermove', el._onMove)
      el.removeEventListener('pointerleave', el._onLeave)
    },
  })
})
