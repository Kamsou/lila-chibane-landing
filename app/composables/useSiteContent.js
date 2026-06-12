import { asText, asLink } from '@prismicio/client'

export const useSiteContent = async () => {
  const { data: homepage } = await useHomepage()

  const content = computed(() => {
    const d = homepage.value?.data || {}
    return {
      brand: d.nav_brand_label || 'Lila Chibane',
      portal: {
        choiceLabel: d.portal_choice_label || 'Je viens pour…',
      },
      hero: {
        name: d.hero_name || "Je m'appelle Lila.",
        intro1: d.hero_intro_1 || 'Prendre soin du corps, des sens, du vivant, et de ce qui nous relie au monde.',
        ctaLabel: d.hero_cta_label || "S'abonner à la newsletter",
        ctaUrl: asLink(d.hero_cta_url) || 'https://jamaistroptard.substack.com/',
        ctaCaption: d.hero_cta_caption || 'Pour celles qui veulent aller plus loin',
      },
      coaching: {
        visible: isSectionVisible(d, 'coaching'),
        kicker: d.coaching_kicker || 'Coaching sportif',
        doorText: d.coaching_door_text || 'Sport-santé pour femmes, en douceur',
        approachTitle: d.coaching_approach_title || 'Mon approche',
        title: d.coaching_title || 'Coach sportive',
        intro: asText(d.coaching_intro) || "J'accompagne les femmes actives à reprendre une activité physique adaptée, sans violence, sans pression, à leur rythme. Ton corps n'est pas un objet à transformer, c'est un système à écouter.",
        cards: (d.coaching_cards?.length ? d.coaching_cards : [
          { title: 'Mouvement intelligent', text: "Renforcement, mobilité, cardio dosé. Chaque séance est pensée pour ton corps tel qu'il est aujourd'hui." },
          { title: 'Régulation nerveuse', text: "Des outils pour sortir du mode « survie » et retrouver un quotidien plus apaisé, moins de stress, moins d'anxiété." },
          { title: 'Alimentation soutenante', text: "Pas de régime, pas de restriction. Remettre de la conscience et du plaisir dans l'assiette pour nourrir ton énergie." },
        ]),
        ctaLabel: d.coaching_cta_label || 'Réserver un bilan gratuit',
        ctaUrl: asLink(d.coaching_cta_url) || 'https://calendly.com/lilacoach/bilanpersonnalise',
        ctaCaption: d.coaching_cta_caption || '30 minutes · gratuit · en visio · sans engagement',
      },
      dog: {
        visible: isSectionVisible(d, 'dog'),
        kicker: d.dog_kicker || 'Dog sitting',
        doorText: d.dog_door_text || 'Garde & promenade, Médoc et Le Bouscat',
        servicesTitle: d.dog_services_title || 'Les prestations',
        pricingTitle: d.dog_pricing_title || 'Tarifs',
        title: d.dog_title || 'Dog sitting',
        intro: asText(d.dog_intro) || "Je prends soin de ton chien comme s'il était le mien. Promenades, garde, présence rassurante : à chaque animal son rythme, à chaque humain sa tranquillité d'esprit.",
        cards: (d.dog_cards?.length ? d.dog_cards : [
          { title: 'Promenades & sorties', text: "Des balades dans le Médoc, adaptées à l'énergie et au caractère de ton chien. Forêt, plage, sentiers." },
          { title: 'Garde à domicile', text: "Ton chien reste chez lui, dans ses repères. Je viens, je m'installe, je veille. Pour les week-ends ou les vacances." },
          { title: 'Visites & soins', text: "Passage quotidien : nourrir, sortir, câliner. Pour les absences courtes ou les besoins ponctuels." },
        ]),
        pricingSlices: d.dog_pricing_slices || [],
        ctaCaption: d.dog_cta_caption || 'Avensan · Médoc · Le Bouscat · tarifs sur demande',
      },
      faq: {
        visible: isSectionVisible(d, 'faq'),
        label: d.faq_label || 'Questions fréquentes',
        title: d.faq_title || 'Tu te poses peut-être ces questions',
        items: (d.faq_items?.length ? d.faq_items : [
          { question: 'Où proposes-tu le dog sitting ?', answer: "À Avensan, dans tout le Médoc, ainsi qu'au Bouscat. Garde à domicile, promenades et visites, selon les besoins de ton chien.", category: 'dog' },
          { question: 'Tu gardes mon chien chez moi ou chez toi ?', answer: "À domicile, chez toi : ton chien reste dans ses repères. Je propose aussi des promenades et des passages quotidiens pour les absences plus courtes.", category: 'dog' },
          { question: 'Le coaching se passe en visio ou en présentiel ?', answer: "Les deux. En visio partout en France, et en présentiel dans le Médoc. On choisit ensemble ce qui te convient le mieux.", category: 'coaching' },
          { question: 'À qui s’adresse le coaching sportif ?', answer: "Aux femmes actives qui veulent reprendre une activité physique en douceur, sans pression ni performance, à leur rythme.", category: 'coaching' },
          { question: 'Comment réserver un premier échange ?', answer: "Tu peux réserver un bilan personnalisé gratuit de 30 minutes, en visio et sans engagement, depuis la page coaching.", category: 'coaching' },
          { question: 'Combien coûte la garde de mon chien ?', answer: "Les tarifs dépendent de la prestation (promenade, garde à domicile, visite). Le détail est sur la page dog sitting ; pour un devis adapté, écris-moi.", category: 'dog' },
        ]),
      },
      contact: {
        visible: isSectionVisible(d, 'contact'),
        title: d.contact_title || "Envie d'échanger ?",
        intro: asText(d.contact_intro) || 'Que ce soit pour un coaching, une garde de chien ou simplement discuter, je réponds personnellement à chaque message.',
        buttonLabel: d.contact_button_label || 'Envoyer',
        successMessage: d.contact_success || 'Merci, ton message est bien arrivé. Je te réponds très vite.',
      },
    }
  })

  const faqFor = (activity) =>
    content.value.faq.items.filter((it) => {
      const c = it.category || 'les deux'
      return c === 'les deux' || c === activity
    })

  return { content, homepage, faqFor }
}
