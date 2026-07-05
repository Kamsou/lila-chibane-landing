/**
 * Qualification form endpoint (coaching · "La Feuille de Route").
 *
 * - Validates the required fields + RGPD consent server-side
 * - Computes the hidden lead score (authoritative, never trusted from the client)
 * - Sends a recap email via Formspree (works out of the box)
 * - Writes a structured row to Notion IF `NUXT_NOTION_TOKEN` + `NUXT_NOTION_DATABASE_ID`
 *   are set (no Zapier). Notion failure never blocks the email.
 *
 * Notion database columns to create (names must match, types matter; select
 * options are created automatically on write):
 *   Prénom (Title), Email (Email), Téléphone (Phone), Âge (Select),
 *   Ville (Text), Expérience (Select), Difficultés (Multi-select),
 *   Contre-indication (Text), Freins (Text), Objectif (Select),
 *   Déclencheur (Select), Urgence (Select), Autonomie (Select),
 *   Matériel (Select), Déjà coach (Select), Investir (Select),
 *   Consentement (Checkbox), Score (Number)
 */

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<Record<string, any>>(event)

  const prenom = clean(body?.prenom)
  const email = clean(body?.email)
  const objectif = clean(body?.objectif)
  const age = clean(body?.age)
  const consentement = body?.consentement === true

  if (!prenom || !emailOk(email) || !age || !objectif || !consentement) {
    throw createError({ statusCode: 400, statusMessage: 'Champs obligatoires manquants ou consentement absent.' })
  }

  const difficultes: string[] = Array.isArray(body?.difficultes) ? body.difficultes.filter((d: unknown) => typeof d === 'string') : []
  const withOther = (base: string, other: string) => (base === 'Autre' && other ? `Autre : ${other}` : base)

  const objectifFull = withOther(objectif, clean(body?.objectifAutre))
  const declencheurFull = withOther(clean(body?.declencheur), clean(body?.declencheurAutre))
  const difficultesText = [
    ...difficultes.filter((d) => d !== 'Autre'),
    ...(difficultes.includes('Autre') && clean(body?.difficulteAutre) ? [`Autre : ${clean(body?.difficulteAutre)}`] : []),
  ].join(', ')
  const contreIndication = clean(body?.contreIndication)
  const contreFull = contreIndication === 'Oui' && clean(body?.contreIndicationPrecision)
    ? `Oui (${clean(body?.contreIndicationPrecision)})`
    : contreIndication

  // Hidden lead score (authoritative, server-side)
  let score = 0
  if (clean(body?.urgence) === 'Je veux commencer maintenant') score += 2
  if (clean(body?.pretInvestir) === 'Oui, je cherche activement') score += 2
  if (clean(body?.autonomie) === "Oui, c'est ce que je recherche") score += 2
  if (contreIndication === 'Non') score += 1

  const rows: Record<string, string> = {
    Prénom: prenom,
    Email: email,
    Téléphone: clean(body?.telephone) || '—',
    Âge: age,
    'Ville / secteur': clean(body?.ville) || '—',
    "Niveau d'expérience": clean(body?.experience) || '—',
    'Difficultés physiques': difficultesText || '—',
    'Contre-indication médicale': contreFull || '—',
    'Freins passés': clean(body?.freins) || '—',
    'Objectif principal': objectifFull,
    Déclencheur: declencheurFull || '—',
    'Urgence ressentie': clean(body?.urgence) || '—',
    'Autonomie (visio)': clean(body?.autonomie) || '—',
    Matériel: clean(body?.materiel) || '—',
    'Déjà coach / salle': clean(body?.dejaCoach) || '—',
    'Prêt à investir': clean(body?.pretInvestir) || '—',
    'Consentement RGPD': 'Oui',
    'Score (interne)': `${score}/7`,
  }

  // 1) Recap email via Formspree
  const emailSent = await $fetch(`https://formspree.io/f/${config.formspreeId}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: { ...rows, _subject: `Nouvelle qualification : ${prenom} (score ${score}/7)`, email },
  })
    .then(() => true)
    .catch(() => false)

  // 2) Optional direct Notion write (no Zapier)
  if (config.notionToken && config.notionDatabaseId) {
    const text = (content: string) => ({ rich_text: [{ text: { content: content || '' } }] })
    const select = (name: string) => (name ? { select: { name } } : { select: null })

    await $fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.notionToken}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: {
        parent: { database_id: config.notionDatabaseId },
        properties: {
          Prénom: { title: [{ text: { content: prenom } }] },
          Email: { email },
          Téléphone: clean(body?.telephone) ? { phone_number: clean(body?.telephone) } : { phone_number: null },
          Âge: select(age),
          Ville: text(clean(body?.ville)),
          Expérience: select(clean(body?.experience)),
          Difficultés: { multi_select: difficultes.map((name) => ({ name })) },
          'Contre-indication': text(contreFull),
          Freins: text(clean(body?.freins)),
          Objectif: select(objectifFull),
          Déclencheur: select(declencheurFull),
          Urgence: select(clean(body?.urgence)),
          Autonomie: select(clean(body?.autonomie)),
          Matériel: select(clean(body?.materiel)),
          'Déjà coach': select(clean(body?.dejaCoach)),
          Investir: select(clean(body?.pretInvestir)),
          Consentement: { checkbox: true },
          Score: { number: score },
        },
      },
    }).catch((err) => {
      console.error('[qualification] Notion write failed:', err?.data || err?.message || err)
    })
  }

  if (!emailSent) {
    throw createError({ statusCode: 502, statusMessage: "L'envoi n'a pas pu aboutir." })
  }

  return { ok: true, prenom }
})
