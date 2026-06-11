import * as prismic from '@prismicio/client'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  let showPeinture = false
  let showSon = false
  try {
    const client = prismic.createClient('lila-chibane')
    const home = await client.getSingle('homepage', { lang: 'fr-fr' })
    showPeinture = home?.data?.peinture_visible === true
    showSon = home?.data?.son_visible === true
  } catch {
    showPeinture = false
    showSon = false
  }

  const titleRoles = ['Sports coach', 'Dog sitter']
  if (showPeinture) titleRoles.push('Painter')
  if (showSon) titleRoles.push('Sound creator')

  const professions = ['Sports & health coach', 'dog sitter']
  if (showPeinture) professions.push('painter')
  if (showSon) professions.push('sound creator')

  const extraIntro = [
    showPeinture ? 'a painter' : null,
    showSon ? 'a sound creator' : null,
  ].filter(Boolean)
  const intro = extraIntro.length
    ? ` She is also ${extraIntro.join(' and ')}.`
    : ''

  const sections = [
    {
      title: 'Sports coaching',
      body: `### Target audience

- Active women, ages 30-55
- Returning to exercise after a long break
- Chronic fatigue, stress, mental overload
- Physical pain or limitations
- Looking for a supportive, pressure-free coaching approach

### Approach

Lila offers individual coaching built on three pillars:

1. **Adapted physical activity**: strength training, mobility, dosed cardio, tailored to each woman's level and constraints.
2. **Nervous system regulation**: stress management, breathing, body awareness. Effort is adjusted to the state of the nervous system.
3. **Supportive nutrition**: guidance to sustain energy and recovery, with no dieting or restriction.

### Format

- Individual coaching, by video (all of France) or in person (Médoc)
- Fully personalized program, sessions around the client's availability
- Free 30-minute discovery call (no commitment)

### Values

- No pressure, no punishment, at your own pace
- Pleasure over performance, consistency over intensity
- Kindness, zero guilt`,
    },
    {
      title: 'Dog sitting',
      body: `Dog care in Avensan, the Médoc, Le Bouscat and Bordeaux.

### Services

- **Walks & outings**: walks adapted to the dog's energy and temperament (forest, beach, trails)
- **In-home boarding**: the dog stays in its own home and routine; presence day and/or night
- **Visits & care**: daily drop-ins to feed, walk and give attention, for shorter absences
- **Transport**: accompanying the dog to the vet, groomer, etc.

### Approach

Each dog at its own pace, each owner with peace of mind. Pricing depends on the service (walk, in-home boarding, visit); detailed rates are on the website, and a tailored quote is available on request.`,
    },
  ]

  if (showPeinture) {
    sections.push({
      title: 'Painting',
      body: 'Lila is a painter. Her visual work explores the connection between body, senses and the world.',
    })
  }
  if (showSon) {
    sections.push({
      title: 'Sound creation',
      body: 'Lila creates sound pieces (sound landscapes, compositions, field recording). Her audio work explores the space between the visible and the invisible.',
    })
  }

  const sectionsText = sections
    .map((s, i) => `## ${String(i + 1).padStart(2, '0')} - ${s.title}\n\n${s.body}`)
    .join('\n\n---\n\n')

  return `# Lila Chibane - ${titleRoles.join(' · ')}

> Lila Chibane is a sports & health coach and a dog sitter based in Avensan, in the Médoc area (Gironde, Nouvelle-Aquitaine, France).${intro} Her work centers on care: of the body, the senses, and living beings.

## Identity

- Name: Lila Chibane
- Professions: ${professions.join(', ')}
- Based in: Avensan, Médoc, Gironde (33480), France
- Website: https://lilachibane.com
- Contact: lila.chibane@outlook.com
- Newsletter: https://jamaistroptard.substack.com/
- Language: French

## Service areas

- Sports coaching online (video): all of France
- Sports coaching in person: Médoc area (Gironde)
- Dog sitting: Avensan, the Médoc, Le Bouscat and Bordeaux (Bordeaux Métropole)

---

${sectionsText}

---

## Site pages

- https://lilachibane.com - Home page
- https://lilachibane.com/blog - Blog with health, fitness and wellness tips
- https://lilachibane.com/quiz - Energy quiz to discover your profile and get personalized advice
`
})
