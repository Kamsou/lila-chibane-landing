export const isSectionVisible = (data, key) => data?.[`${key}_visible`] !== false

export const useNavLinks = async () => {
  const { data: homepage } = await useHomepage()

  const navLinks = computed(() => {
    const d = homepage.value?.data || {}
    return [
      { id: 'coaching', label: d.nav_label_coaching || 'Coaching', href: '/coaching', visible: isSectionVisible(d, 'coaching') },
      { id: 'dog', label: d.nav_label_dog || 'Dog sitting', href: '/dog-sitting', visible: isSectionVisible(d, 'dog') },
      { id: 'blog', label: d.nav_label_blog || 'Blog', href: '/blog', visible: d.nav_show_blog !== false },
    ].filter((link) => link.visible)
  })

  return { navLinks, homepage }
}
