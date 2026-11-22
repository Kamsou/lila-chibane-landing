export const useReveal = () => {
  let io
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('vu')
        io.unobserve(e.target)
      })
    }, { threshold: 0.18 })
    document.querySelectorAll('[data-revele]').forEach((el) => {
      el.classList.add('revele')
      io.observe(el)
    })
  })
  onUnmounted(() => io?.disconnect())
}
