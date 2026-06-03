export const useHomepage = () => {
  const prismic = usePrismic()
  return useAsyncData('homepage', async () => {
    try {
      return await prismic.client.getSingle('homepage')
    } catch (e) {
      if (import.meta.dev) console.error('[homepage] Prismic fetch failed:', e)
      return null
    }
  })
}
