/**
 * Seed the Prismic homepage document with default copy + Lila's pricing grid.
 *
 * Usage:
 *   PRISMIC_WRITE_TOKEN=xxx node scripts/seed-homepage.mjs
 *
 * Get a Write API token at: https://lila-chibane.prismic.io/settings/apps/
 *
 * The script creates the document if it doesn't exist, or overwrites it if it does.
 * It does NOT publish — Lila reviews in Prismic and clicks Publish when ready.
 */
import { createWriteClient, createMigration } from '@prismicio/client'

const REPOSITORY = 'lila-chibane'
const LANG = 'fr-fr'
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN

if (!WRITE_TOKEN) {
  console.error('\n✗ Missing PRISMIC_WRITE_TOKEN environment variable.\n')
  console.error('  Generate one at: https://lila-chibane.prismic.io/settings/apps/')
  console.error('  Then run: PRISMIC_WRITE_TOKEN=xxx node scripts/seed-homepage.mjs\n')
  process.exit(1)
}

const para = (text) => [{ type: 'paragraph', text, spans: [] }]
const paras = (...texts) => texts.map((text) => ({ type: 'paragraph', text, spans: [] }))
const webLink = (url) => ({ link_type: 'Web', url, target: '_blank' })

const pricingCategory = (primary, items) => ({
  slice_type: 'pricing_category',
  slice_label: null,
  variation: 'default',
  version: 'initial',
  primary,
  items,
})

const data = {
  // Hero
  hero_name: "Je m'appelle Lila.",
  hero_subtitle: 'Coach sportive · Peintre · Créatrice sonore · Dog sitter',
  hero_intro_1: 'Quatre pratiques, un même fil : prendre soin du corps, des sens, du vivant, et de ce qui nous relie au monde.',
  hero_intro_2: "Je crée les conditions pour se sentir bien, avec douceur, sans pression, à ton rythme.",
  hero_cta_label: "S'abonner à la newsletter",
  hero_cta_url: webLink('https://jamaistroptard.substack.com/'),
  hero_cta_caption: 'Pour celles qui veulent aller plus loin',

  // Qui suis-je
  about_visible: true,
  about_label: 'Qui suis-je ?',
  about_title: 'Un même fil, plusieurs pratiques',
  about_intro: paras(
    "Je m'appelle Lila. Coach sportive, peintre, créatrice sonore et dog sitter, je vis et travaille dans le Médoc.",
    "Ce qui me porte, c'est le soin : celui du corps, des sens, du vivant. J'aime créer des espaces où l'on peut ralentir, respirer, se reconnecter à soi.",
    "Mes pratiques se nourrissent les unes les autres. Le mouvement, la matière, le son : autant de façons d'être présente au monde et de prendre soin de ce qui nous entoure."
  ),
  about_footer: '',

  // Coaching
  coaching_visible: true,
  coaching_title: 'Coach sportive',
  coaching_intro: para("J'accompagne les femmes actives à reprendre une activité physique adaptée, sans violence, sans pression, à leur rythme. Ton corps n'est pas un objet à transformer, c'est un système à écouter."),
  coaching_cards: [
    { title: 'Mouvement intelligent', text: "Renforcement, mobilité, cardio dosé. Chaque séance est pensée pour ton corps tel qu'il est aujourd'hui." },
    { title: 'Régulation nerveuse', text: "Des outils pour sortir du mode « survie » et retrouver un quotidien plus apaisé, moins de stress, moins d'anxiété." },
    { title: 'Alimentation soutenante', text: "Pas de régime, pas de restriction. Remettre de la conscience et du plaisir dans l'assiette pour nourrir ton énergie." },
  ],
  coaching_cta_label: 'Réserver un bilan gratuit',
  coaching_cta_url: webLink('https://calendly.com/lilacoach/bilanpersonnalise'),
  coaching_cta_caption: '30 minutes · gratuit · en visio · sans engagement',

  // Peinture
  peinture_visible: false,
  peinture_title: 'Peinture',
  peinture_intro: para("[Ici, quelques lignes sur ta démarche : ce qui t'anime quand tu peins, tes thèmes, tes matières, ce que tu cherches à exprimer.]"),
  peinture_footer: 'Galerie complète à venir',

  // Son
  son_visible: false,
  son_title: 'Création sonore',
  son_intro: para("[Ici, quelques lignes sur ton univers sonore : le type de créations (paysages sonores, compositions, field recording...), le contexte (installations, performances, podcasts...), ce que tu cherches à faire ressentir.]"),
  son_footer: 'Sélection à venir',

  // Dog sitting
  dog_visible: true,
  dog_title: 'Dog sitting',
  dog_intro: para("Je prends soin de ton chien comme s'il était le mien. Promenades, garde, présence rassurante : à chaque animal son rythme, à chaque humain sa tranquillité d'esprit."),
  dog_cards: [
    { title: 'Promenades & sorties', text: "Balades adaptées à l'énergie et au caractère de ton chien." },
    { title: 'Garde à domicile', text: "Ton chien reste chez lui, dans ses repères. Je viens, je m'installe, je veille." },
    { title: 'Visites & soins', text: "Passage quotidien : nourrir, sortir, câliner. Pour les absences courtes." },
  ],
  dog_pricing_slices: [
    pricingCategory(
      {
        title: 'Balade individuelle',
        col1_label: 'Durée',
        col2_label: 'Tarif unitaire',
        col3_label: 'Forfait 3 jours',
        note: 'Animal supplémentaire : +5€',
      },
      [
        { col1: '30 min', col2: '18€', col3: '48€' },
        { col1: '1 heure', col2: '28€', col3: '75€' },
        { col1: '1h30', col2: '35€', col3: '95€' },
        { col1: '2 heures', col2: '45€', col3: '120€' },
      ]
    ),
    pricingCategory(
      {
        title: 'Balade collective (3-4 chiens max)',
        col1_label: 'Durée',
        col2_label: 'Tarif / chien',
        col3_label: 'Forfait 3 jours / chien',
        note: '',
      },
      [
        { col1: '30 min', col2: '10€', col3: '27€' },
        { col1: '1 heure', col2: '18€', col3: '48€' },
      ]
    ),
    pricingCategory(
      {
        title: 'Forfait 2 balades par jour',
        col1_label: 'Formule',
        col2_label: 'Tarif / jour',
        col3_label: 'Forfait 3 jours',
        note: 'Animal supplémentaire : +5€',
      },
      [
        { col1: 'Matin + soir (2 × 30 min)', col2: '32€', col3: '87€' },
        { col1: 'Matin + soir (2 × 1h)', col2: '50€', col3: '135€' },
      ]
    ),
    pricingCategory(
      {
        title: 'Garde au domicile du propriétaire',
        col1_label: 'Formule',
        col2_label: 'Tarif',
        col3_label: '',
        note: '',
      },
      [
        { col1: 'Journée (12h)', col2: '75€', col3: 'balade, jeux, soins, médicaments, alimentation' },
        { col1: 'Nuit (12h)', col2: '50€', col3: 'présence, soins, alimentation' },
        { col1: '24h (journée + nuit)', col2: '125€', col3: '' },
      ]
    ),
    pricingCategory(
      {
        title: 'Forfaits multi-jours',
        col1_label: 'Forfait',
        col2_label: 'Tarif',
        col3_label: 'Économie vs tarif plein',
        note: 'Animal supplémentaire : +5€ / prestation · Week-end et jours fériés : +20 %',
      },
      [
        { col1: '2 jours + 2 nuits', col2: '200€', col3: '−50€ vs 250€' },
        { col1: '5 jours + 5 nuits', col2: '560€', col3: '−65€ vs 625€' },
        { col1: '7 jours + 7 nuits', col2: '770€', col3: '−105€ vs 875€' },
      ]
    ),
    pricingCategory(
      {
        title: 'Visite à domicile',
        col1_label: 'Durée',
        col2_label: 'Tarif unitaire',
        col3_label: 'Forfait 3 jours',
        note: 'Inclus : repas, soins, litière · Animal supplémentaire : +3€',
      },
      [
        { col1: '15 min', col2: '11€', col3: '30€' },
        { col1: '30 min', col2: '16€', col3: '43€' },
        { col1: '1 heure', col2: '23€', col3: '62€' },
      ]
    ),
    pricingCategory(
      {
        title: 'Transport',
        col1_label: 'Prestation',
        col2_label: 'Tarif',
        col3_label: '',
        note: '',
      },
      [
        { col1: 'Accompagnement (vétérinaire, toiletteur, dépôt…)', col2: '35€/h', col3: '' },
        { col1: 'Déplacement', col2: '0,65€/km', col3: 'aller-retour' },
      ]
    ),
  ],
  dog_cta_label: 'Me parler de ton chien',
  dog_cta_caption: 'Avensan · Médoc · Le Bouscat · Bordeaux',

  // FAQ
  faq_visible: true,
  faq_label: 'Questions fréquentes',
  faq_title: 'Tu te poses peut-être ces questions',
  faq_items: [
    { question: 'Où proposes-tu le dog sitting ?', answer: "À Avensan, dans tout le Médoc, ainsi qu'au Bouscat et sur Bordeaux. Garde à domicile, promenades et visites, selon les besoins de ton chien." },
    { question: 'Tu gardes mon chien chez moi ou chez toi ?', answer: "À domicile, chez toi : ton chien reste dans ses repères. Je propose aussi des promenades et des passages quotidiens pour les absences plus courtes." },
    { question: 'Le coaching se passe en visio ou en présentiel ?', answer: "Les deux. En visio partout en France, et en présentiel dans le Médoc. On choisit ensemble ce qui te convient le mieux." },
    { question: 'À qui s’adresse le coaching sportif ?', answer: "Aux femmes actives qui veulent reprendre une activité physique en douceur, sans pression ni performance, à leur rythme." },
    { question: 'Comment réserver un premier échange ?', answer: "Tu peux réserver un bilan personnalisé gratuit de 30 minutes, en visio et sans engagement, depuis la section coaching." },
    { question: 'Combien coûte la garde de mon chien ?', answer: "Les tarifs dépendent de la prestation (promenade, garde à domicile, visite). Le détail est dans la grille tarifaire de la section dog sitting ; pour un devis adapté, écris-moi." },
  ],

  // Contact
  contact_visible: true,
  contact_label: 'Contact',
  contact_title: "Envie d'échanger ?",
  contact_intro: para('Que ce soit pour un coaching, une collaboration artistique ou simplement discuter, je réponds personnellement à chaque message.'),
  contact_button_label: 'Envoyer',
  contact_success: 'Merci, ton message est bien arrivé. Je te réponds très vite.',

  // Navigation
  nav_brand_label: 'Lila Chibane',
  nav_label_about: 'Qui suis-je',
  nav_label_coaching: 'Coaching',
  nav_label_peinture: 'Peinture',
  nav_label_son: 'Son',
  nav_label_dog: 'Dog sitting',
  nav_show_blog: true,
  nav_label_blog: 'Blog',
  nav_label_contact: 'Contact',
}

const client = createWriteClient(REPOSITORY, { writeToken: WRITE_TOKEN })
const migration = createMigration()

let existing = null
try {
  existing = await client.getSingle('homepage', { lang: LANG })
} catch (e) {
  // Document doesn't exist yet — we'll create it
}

// Merge: keep Lila's existing edits, only fill in missing fields + always overwrite the pricing grid.
const isEmpty = (v) =>
  v === null ||
  v === undefined ||
  v === '' ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)

const FORCE_OVERWRITE = new Set(['dog_pricing_slices'])

const mergedData = (() => {
  if (!existing?.data) return data
  const out = {}
  for (const [key, defaultValue] of Object.entries(data)) {
    const userValue = existing.data[key]
    if (FORCE_OVERWRITE.has(key) || isEmpty(userValue)) {
      out[key] = defaultValue
    } else {
      out[key] = userValue
    }
  }
  return out
})()

if (existing) {
  console.log(`Updating existing homepage document (id: ${existing.id})...`)
  console.log('  Preserving Lila\'s edits, only filling empty fields + forcing pricing grid.')
  migration.updateDocument(
    { id: existing.id, uid: existing.uid, type: 'homepage', lang: LANG, data: mergedData },
    "Page d'accueil"
  )
} else {
  console.log('Creating new homepage document...')
  migration.createDocument(
    { type: 'homepage', lang: LANG, data },
    "Page d'accueil"
  )
}

await client.migrate(migration, {
  reporter: (event) => console.log(`  · ${event.type}`),
})

console.log('\n✓ Done.')
console.log('  Open Prismic → "Page d\'accueil" → tous les champs sont remplis.')
console.log('  Lila peut éditer en place puis cliquer Publish.\n')
