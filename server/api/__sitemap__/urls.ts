import { defineSitemapEventHandler } from '#imports'
import * as prismic from '@prismicio/client'

export default defineSitemapEventHandler(async () => {
  const client = prismic.createClient('lila-chibane')

  const posts = await client.getAllByType('blog_post', {
    orderings: [{ field: 'my.blog_post.publication_date', direction: 'desc' }],
  })

  const blogPosts = posts.map((post) => ({
    loc: `/blog/${post.uid}`,
    lastmod: post.data.publication_date || post.last_publication_date,
  }))

  return [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
    { loc: '/quiz', changefreq: 'monthly', priority: 0.7 },
    ...blogPosts,
  ]
})
