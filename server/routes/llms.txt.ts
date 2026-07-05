export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `# Lila Chibane - Sports coach · Dog sitter

> Lila Chibane is a sports & health coach and a dog sitter based in Avensan, in the Médoc area (Gironde, Nouvelle-Aquitaine, France). Her work centers on care: of the body, the senses, and living beings.

## Identity

- Name: Lila Chibane
- Professions: sports & health coach, dog sitter
- Based in: Avensan, Médoc, Gironde (33480), France
- Website: https://lilachibane.com
- Contact: lila.chibane.pro@outlook.com
- Newsletter: https://jamaistroptard.substack.com/
- Language: French

## Service areas

- Sports coaching online (video): all of France
- Sports coaching in person: Médoc area (Gironde)
- Dog sitting: Avensan, the Médoc and Le Bouscat

---

## 01 - Sports coaching

### Target audience

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
- Kindness, zero guilt

---

## 02 - Dog sitting

Dog care in Avensan, the Médoc and Le Bouscat.

### Services

- **Walks & outings**: walks adapted to the dog's energy and temperament (forest, beach, trails)
- **In-home boarding**: the dog stays in its own home and routine; presence day and/or night
- **Visits & care**: daily drop-ins to feed, walk and give attention, for shorter absences
- **Transport**: accompanying the dog to the vet, groomer, etc.

### Approach

Each dog at its own pace, each owner with peace of mind. Pricing depends on the service (walk, in-home boarding, visit); detailed rates are on the website, and a tailored quote is available on request.

---

## Site pages

- https://lilachibane.com - Home (choose between coaching and dog sitting)
- https://lilachibane.com/coaching - Sports coaching page (approach, FAQ, contact)
- https://lilachibane.com/dog-sitting - Dog sitting page (services, pricing, FAQ, contact)
- https://lilachibane.com/blog - Blog with health, fitness and wellness tips
- https://lilachibane.com/quiz - Energy quiz to discover your profile and get personalized advice
`
})
