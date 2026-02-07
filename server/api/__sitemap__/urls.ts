import { defineSitemapEventHandler } from '#imports'
import * as prismic from '@prismicio/client'

export default defineSitemapEventHandler(async () => {
  const client = prismic.createClient('lila-chibane')

  const posts = await client.getAllByType('blog_post', {
    orderings: [{ field: 'my.blog_post.publication_date', direction: 'desc' }],
  })

  return posts.map((post) => ({
    loc: `/blog/${post.uid}`,
    lastmod: post.data.publication_date || post.last_publication_date,
  }))
})
