/**
 * Seed 2 example blog posts into Prismic so Lila has templates to start from.
 *
 * Usage:
 *   PRISMIC_WRITE_TOKEN=xxx node scripts/seed-blog.mjs
 *
 * Get a Write API token at: https://lila-chibane.prismic.io/settings/apps/
 *
 * Creates each post only if its UID doesn't already exist. It does NOT publish:
 * Lila reviews each article in Prismic and clicks Publish when ready.
 */
import { createWriteClient, createMigration } from '@prismicio/client'

const REPOSITORY = 'lila-chibane'
const LANG = 'fr-fr'
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN

if (!WRITE_TOKEN) {
  console.error('\n✗ Missing PRISMIC_WRITE_TOKEN environment variable.\n')
  console.error('  Generate one at: https://lila-chibane.prismic.io/settings/apps/')
  console.error('  Then run: PRISMIC_WRITE_TOKEN=xxx node scripts/seed-blog.mjs\n')
  process.exit(1)
}

const p = (text) => ({ type: 'paragraph', text, spans: [] })
const h2 = (text) => ({ type: 'heading2', text, spans: [] })
const li = (text) => ({ type: 'list-item', text, spans: [] })

const posts = [
  {
    uid: 'reprendre-le-sport-en-douceur',
    title: 'Reprendre le sport après une longue pause, en douceur',
    excerpt: 'Pas besoin de tout révolutionner pour se remettre en mouvement. Voici comment recommencer sans pression, à ton rythme.',
    category: 'coaching',
    publication_date: '2026-06-04',
    reading_time: 4,
    content: [
      p("On imagine souvent qu'il faut repartir fort, plusieurs fois par semaine, avec un programme parfait. C'est souvent comme ça qu'on s'épuise et qu'on abandonne au bout de deux semaines."),
      h2('Commencer petit, vraiment petit'),
      p("Dix minutes de marche, quelques étirements le matin, une séance courte. L'objectif des premières semaines n'est pas la performance, c'est de réinstaller l'habitude et de réapprendre à ton corps que bouger fait du bien."),
      h2('Écouter son corps plutôt que sa montre'),
      p("Certains jours, l'énergie est là. D'autres, non, et c'est normal. Adapter l'effort à ton état du moment, plutôt qu'à un objectif fixe, c'est ce qui rend la reprise durable."),
      h2('Quelques repères pour démarrer'),
      li('Choisis une activité qui te plaît vraiment, pas celle qui « fait maigrir »'),
      li('Fixe-toi un rendez-vous court et régulier plutôt qu’une grosse séance rare'),
      li('Note comment tu te sens après, pas seulement ce que tu as fait'),
      p("Et si tu veux être accompagnée pour construire une reprise qui te ressemble, on peut en parler lors d'un bilan gratuit."),
    ],
  },
  {
    uid: 'preparer-son-chien-a-une-garde',
    title: 'Préparer son chien à une garde sereine',
    excerpt: 'Quelques gestes simples pour que ton chien vive ton absence en confiance, et que tu partes l’esprit tranquille.',
    category: 'dog',
    publication_date: '2026-05-20',
    reading_time: 3,
    content: [
      p("Confier son chien, même à quelqu'un de confiance, ça peut être source de stress, pour lui comme pour toi. Un peu de préparation change tout."),
      h2('Garder ses repères'),
      p("Un chien rassuré, c'est un chien dans ses habitudes : son couchage, ses jouets, ses horaires de repas et de balade. Plus l'environnement reste familier, plus l'absence se passe en douceur."),
      h2('Une rencontre avant le grand jour'),
      p("Se voir une première fois, sans enjeu, permet au chien d'associer la personne à quelque chose de positif. On fait connaissance, on observe son caractère, on note ce qui le rassure et ce qui l'inquiète."),
      h2('Le petit kit à préparer'),
      li('Sa nourriture habituelle, en quantité suffisante'),
      li('Ses contacts utiles : vétérinaire, carnet de santé, traitements éventuels'),
      li('Ses petites manies, pour respecter son rythme à lui'),
      p("L'idée n'est pas de tout contrôler, mais de créer les conditions pour que ton chien se sente bien et que tu puisses souffler."),
    ],
  },
]

const client = createWriteClient(REPOSITORY, { writeToken: WRITE_TOKEN })
const migration = createMigration()

let created = 0
for (const post of posts) {
  let exists = false
  try {
    await client.getByUID('blog_post', post.uid, { lang: LANG })
    exists = true
  } catch {
    // not found, we'll create it
  }

  if (exists) {
    console.log(`· Skipping "${post.title}" (uid "${post.uid}" already exists)`)
    continue
  }

  migration.createDocument(
    {
      type: 'blog_post',
      uid: post.uid,
      lang: LANG,
      data: {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publication_date: post.publication_date,
        reading_time: post.reading_time,
        content: post.content,
      },
    },
    post.title
  )
  created += 1
  console.log(`+ Creating "${post.title}"`)
}

if (created === 0) {
  console.log('\n✓ Nothing to create, both example posts already exist.\n')
  process.exit(0)
}

await client.migrate(migration, {
  reporter: (event) => console.log(`  · ${event.type}`),
})

console.log('\n✓ Done.')
console.log(`  ${created} example post(s) created in Prismic (as drafts).`)
console.log('  Open Prismic → "Blog Post" → édite/publie, ou supprime-les.\n')
