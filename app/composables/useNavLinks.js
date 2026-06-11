const HIDDEN_BY_DEFAULT = ['peinture', 'son']

export const isSectionVisible = (data, key) =>
  HIDDEN_BY_DEFAULT.includes(key)
    ? data?.[`${key}_visible`] === true
    : data?.[`${key}_visible`] !== false

export const useNavLinks = async () => {
  const { data: homepage } = await useHomepage()

  const navLinks = computed(() => {
    const d = homepage.value?.data || {}
    return [
      { id: 'about', label: d.nav_label_about || 'Qui suis-je', href: '/#qui-suis-je', visible: isSectionVisible(d, 'about') },
      { id: 'coaching', label: d.nav_label_coaching || 'Coaching', href: '/#coaching', visible: isSectionVisible(d, 'coaching') },
      { id: 'peinture', label: d.nav_label_peinture || 'Peinture', href: '/#peinture', visible: isSectionVisible(d, 'peinture') },
      { id: 'son', label: d.nav_label_son || 'Son', href: '/#creation-sonore', visible: isSectionVisible(d, 'son') },
      { id: 'dog', label: d.nav_label_dog || 'Dog sitting', href: '/#dog-sitting', visible: isSectionVisible(d, 'dog') },
      { id: 'blog', label: d.nav_label_blog || 'Blog', href: '/blog', visible: d.nav_show_blog !== false },
      { id: 'contact', label: d.nav_label_contact || 'Contact', href: '/#contact', visible: isSectionVisible(d, 'contact') },
    ].filter((link) => link.visible)
  })

  return { navLinks, homepage }
}
