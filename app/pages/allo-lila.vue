<script setup>
const reservationUrl = 'mailto:lila.chibane.pro@outlook.com?subject=All%C3%B4%20Lila'

const blocages = [
  'Une semaine trop remplie',
  'La culpabilité de prendre du temps pour toi',
  'Du mal à te prioriser',
  'Un rapport au sport compliqué',
  'La peur de te faire mal',
  'Un cycle menstruel qui change ton énergie',
  'Un palier qui ne bouge plus',
  'Une alimentation à ajuster',
]

const reperes = [
  { valeur: '45 min', label: 'chrono, en tête-à-tête' },
  { valeur: 'Visio', label: 'depuis chez toi' },
  { valeur: 'Récap', label: "écrit, après l'appel" },
  { valeur: '85 €', label: 'une seule fois' },
]

const restant = ref(45 * 60)
const chrono = computed(() => `${String(Math.floor(restant.value / 60)).padStart(2, '0')}:${String(restant.value % 60).padStart(2, '0')}`)
let tic
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  tic = setInterval(() => { restant.value = restant.value > 0 ? restant.value - 1 : 45 * 60 }, 1000)
})
onUnmounted(() => clearInterval(tic))

const arrivees = [
  { titre: 'Je reprends le sport', texte: 'Après une pause longue ou une période chargée. Tu veux repartir sans tout recommencer à zéro et sans la culpabilité du temps écoulé.' },
  { titre: "Je manque d'organisation", texte: 'Tu sais ce que tu aimerais faire, et ta semaine ne laisse aucune place. On cherche les créneaux réels, la durée de séance qui tient et les jours de repli.' },
  { titre: 'Je veux passer un palier', texte: 'Course, force, régularité : ta progression plafonne. On regarde la charge, la récupération et la structure de tes semaines, puis on choisit le premier levier à actionner.' },
  { titre: 'Je veux faire évoluer mon alimentation', texte: "Manger de façon cohérente avec ton entraînement, ton énergie et ta vie. On part de ce que tu manges aujourd'hui et on retient un ou deux ajustements." },
  { titre: "Je veux m'entraîner avec mon cycle", texte: 'Repérer comment ton énergie varie au fil du mois et en tenir compte dans tes séances. Cycle régulier ou non, contraception hormonale ou non : on adapte.' },
]

const apports = [
  { titre: 'Un diagnostic net', texte: 'Ce qui coince vraiment, dit avec bienveillance.' },
  { titre: 'Une semaine type réaliste', texte: 'Posée sur ton agenda réel, avec une version minimale.' },
  { titre: 'Trois priorités pour quatre semaines', texte: 'Peu de choses, dans le bon ordre.' },
  { titre: 'Des repères alimentation', texte: 'Les ajustements qui comptent pour toi, sans régime.' },
  { titre: 'Un cadre pour ton cycle', texte: 'Ce que tu peux moduler, et ce qui ne change pas.' },
  { titre: 'Une décision prise', texte: 'Tu hésites entre deux options, on tranche ensemble.' },
]

const temoignages = [
  {
    grand: true,
    paragraphes: [
      "J'arrive avec une bonne condition physique, une pratique régulière, des connaissances solides en yoga, biomécanique et hormones. Et une perte de poids verrouillée.",
      'Un appel avec Lila. Un protocole clair. Des ajustements alimentaires et un programme renfo/cardio taillé à ma ménopause, mon mode de vie, ma personnalité. Pas une méthode standard sortie d\'un tiroir.',
      "Ce que j'ai apprécié : la clarté, l'absence totale de blabla, et des solutions vraiment actionnables. Même quand on a des connaissances, on a parfois besoin d'une vraie expertise extérieure pour débloquer ce qui est coincé.",
    ],
    auteur: 'Raquel Devillé',
    detail: 'Thérapeute somatique, recommandation LinkedIn, juin 2026',
  },
  { paragraphes: ["Pendant les séances, tu as su t'adapter à moi, à mon niveau / humeur / cycle du moment, sans jamais me mettre en difficulté ou me faire sentir en échec."], auteur: 'Sabrina Verger', detail: 'Responsable administrative freelance' },
  { paragraphes: ["Je m'y remettais chaque mois de janvier pour abandonner 2 mois plus tard. (…) Aujourd'hui, je suis plus tonique et le sport fait vraiment partie de mon quotidien."], auteur: 'Lien Muguercia', detail: 'Développeuse iOS' },
  { paragraphes: ["Lila m'a contactée le jour où j'avais justement décidé de me remettre au sport. Après 8 ans d'arrêt. Elle a été un véritable cadeau. Cette reprise n'aurait jamais été aussi facile, et légère sans elle."], auteur: 'Caroline Legrand', detail: 'Ex-consultante en organisation' },
  { paragraphes: ["Lila est une très bonne coach qui a su adapter les séances à ma condition physique et sportive. (…) Au-delà du coaching sportif, Lila est une belle personne, bienveillante et à l'écoute."], auteur: 'Marie Lamborot', detail: 'Thérapeute' },
]

const pendant = [
  { quand: '0 à 5 min', quoi: 'cadrage de ta question' },
  { quand: '5 à 30 min', quoi: 'analyse et choix' },
  { quand: '30 à 45 min', quoi: "plan d'action et priorités" },
]

const regles = [
  { titre: '45 minutes chrono', texte: "L'intensité compte plus que la durée. Une question, un plan." },
  { titre: 'Franchise bienveillante', texte: 'Je te dis ce que je vois. Ton rythme, tes limites et ton histoire guident chaque choix.' },
  { titre: 'Confidentialité', texte: 'Ce que tu partages reste entre nous.' },
  { titre: 'Cadre de santé', texte: "Mon métier est coach sportive. Le diagnostic et le suivi médical restent du ressort de ton médecin, notamment pour une pathologie, une douleur qui dure ou un trouble du comportement alimentaire. Cet appel ne s'adresse pas aux femmes enceintes ni en post-partum." },
]

const questions = [
  { q: "Je n'ai pas d'objectif précis, l'appel a-t-il du sens ?", r: "Oui. Le questionnaire t'aide à formuler ce qui te pèse, et les cinq premières minutes de l'appel servent à cadrer ta question." },
  { q: "Je n'ai pas de cycle régulier, ou je prends une contraception hormonale.", r: "On travaille avec ce que tu observes : énergie, sommeil, récupération, humeur. Le cycle est un repère parmi d'autres, et l'appel reste utile sans lui." },
  { q: "L'appel remplace-t-il un programme complet ?", r: "L'appel donne une direction et un plan sur quatre semaines. Un programme détaillé séance par séance n'est pas inclus." },
  { q: 'Comment se passe la visio ?', r: 'Tu reçois le lien après ta réservation. Prévois un endroit au calme et ton agenda sous la main.' },
]

const arrivee = ref(0)

useReveal()

useSeoMeta({
  title: 'Allô Lila · un appel de 45 minutes pour remettre ton sport en route · Lila Chibane',
  description: "Un appel individuel de 45 minutes en visio avec Lila Chibane, coach sportive. On repère ce qui coince vraiment, et tu repars avec un plan. 85 €, récap écrit après l'appel.",
  ogTitle: 'Allô Lila, 45 minutes pour remettre ton sport en route',
  ogDescription: "Un appel individuel en visio, un plan pour les semaines qui arrivent. 85 €.",
  ogUrl: 'https://lilachibane.com/allo-lila',
  ogImage: 'https://lilachibane.com/og-allo.jpg',
  ogImageAlt: 'Lila Chibane, coach sportive, qui rit',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-[100dvh] bg-ciel text-encre">
    <ActivityHeader />
    <BoutonColle :href="reservationUrl" label="Réserver mon appel" prix="85 €" detail="45 minutes en visio" />

    <main class="pt-24 md:pt-28">

      <section class="vente-conteneur pb-12 md:pb-14">
        <div class="grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-x-16 gap-y-8 items-center">
          <div>
            <h1 class="font-titre font-bold text-encre text-[2.3rem] sm:text-5xl md:text-[3.6rem] leading-[1.04] tracking-tight mb-8">
              Allô Lila, 45 minutes pour remettre ton sport
              <span class="accent text-corail">en route.</span>
            </h1>
            <div class="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a :href="reservationUrl" class="btn-azur">Réserver mon appel</a>
              <a href="#deroule" class="text-link">Voir comment ça se passe</a>
            </div>
          </div>
          <div class="relative w-full max-w-[min(54vh,28rem)] mx-auto md:mr-0" aria-hidden="true">
            <img src="/lila-visio.jpg" alt="" class="teinte w-full aspect-square object-cover" fetchpriority="high" />
            <p class="absolute top-4 left-4 bg-encre/75 text-white font-titre text-sm px-3 py-1.5 rounded-full tabular-nums">Allô Lila&nbsp; {{ chrono }}</p>
            <div class="relative h-36 mt-3 md:mt-0 md:absolute md:-left-16 md:right-4 md:bottom-2 md:h-32">
              <OffreVisuel type="conversation" />
            </div>
          </div>
        </div>
      </section>

      <dl class="vente-conteneur grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 pb-16 md:pb-24">
        <div v-for="r in reperes" :key="r.valeur" class="flex flex-col-reverse justify-end">
          <dt class="font-titre text-ardoise mt-1">{{ r.label }}</dt>
          <dd class="font-titre font-bold text-encre text-[1.6rem] sm:text-3xl md:text-[2.2rem] leading-none tracking-tight">{{ r.valeur }}</dd>
        </div>
      </dl>

      <div class="bande-voile">
      <section class="vente-bande">
        <div class="vente-conteneur">
          <div class="max-w-2xl mb-8 md:mb-10">
            <h2 class="titre mb-4">Cinq façons d'arriver à cet appel</h2>
            <p class="vente-texte">Une seule suffit. Laquelle est la tienne ?</p>
          </div>
          <div class="grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-x-14">
            <ul>
              <li v-for="(a, i) in arrivees" :key="a.titre" class="">
                <button
                  type="button"
                  class="w-full text-left py-3 flex items-baseline justify-between gap-4 font-titre font-bold text-2xl md:text-[1.9rem] leading-[1.1] tracking-tight transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-azur/40"
                  :class="arrivee === i ? 'text-corail' : 'text-encre/45 hover:text-encre'"
                  :aria-expanded="arrivee === i"
                  @click="arrivee = i"
                  @mouseenter="arrivee = i"
                >
                  {{ a.titre }}
                </button>
                <p v-if="arrivee === i" class="md:hidden vente-texte pb-5">{{ a.texte }}</p>
              </li>
            </ul>
            <div class="hidden md:flex flex-col justify-between bg-white/70 p-10 min-h-[18rem]">
              <p :key="arrivee" class="apparait font-titre text-encre text-xl leading-relaxed">{{ arrivees[arrivee].texte }}</p>
              <a :href="reservationUrl" class="btn-azur self-start mt-8">Réserver mon appel</a>
            </div>
          </div>
          <p class="vente-texte mt-8">Ta situation ne rentre dans aucune case ? Explique-la dans le questionnaire, on la cadre ensemble.</p>
        </div>
      </section>

      <section id="deroule" class="vente-bande !pt-4 vente-conteneur scroll-mt-20">
        <h2 class="titre mb-10 md:mb-14 max-w-2xl">Trois temps, une feuille de route à la fin</h2>
        <div class="grid md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)_minmax(0,3fr)] gap-x-8 gap-y-10" data-revele>
          <div>
            <h3 class="font-titre font-bold text-2xl leading-tight tracking-tight text-encre mb-3">Tu poses ton contexte</h3>
            <p class="font-titre text-ardoise text-[15px] leading-relaxed">Avant l'appel, un court questionnaire : ton objectif, ta semaine type, ce qui bloque. J'arrive avec ton dossier déjà lu.</p>
          </div>
          <div>
            <h3 class="font-titre font-bold text-2xl leading-tight tracking-tight text-encre mb-5">45 minutes pour avancer vite</h3>
            <div class="flex gap-1.5">
              <div v-for="(p, i) in pendant" :key="p.quand" class="min-w-0" :class="['flex-[5] min-w-[6.5rem]', 'flex-[25]', 'flex-[15]'][i]">
                <div class="pousse h-24" :class="['bg-brume', 'bg-azur', 'bg-corail'][i]"></div>
                <p class="font-titre font-bold text-encre text-sm mt-3">{{ p.quand }}</p>
                <p class="font-titre text-ardoise text-sm leading-snug">{{ p.quoi }}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-titre font-bold text-2xl leading-tight tracking-tight text-encre mb-3">Tu repars avec une trace</h3>
            <p class="font-titre text-ardoise text-[15px] leading-relaxed">Après l'appel, un récap écrit : tes décisions, tes trois priorités et tes premières étapes de la semaine.</p>
          </div>
        </div>
      </section>
      </div>

      <section class="bande-nuit">
        <figure class="vente-conteneur max-w-4xl" data-revele>
          <blockquote>
            <p class="font-plume italic text-4xl md:text-[3.6rem] leading-[1.04] mb-8">«&nbsp;Un appel avec Lila. Un protocole clair.&nbsp;»</p>
            <p class="font-titre text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">{{ temoignages[0].paragraphes[2] }}</p>
          </blockquote>
          <figcaption class="mt-6">
            <span class="block font-titre font-bold">{{ temoignages[0].auteur }}</span>
            <span class="block text-sm font-titre text-white/60">{{ temoignages[0].detail }}</span>
          </figcaption>
        </figure>
      </section>

      <div class="bande-couchant">
      <section class="vente-bande">
        <div class="vente-conteneur flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <h2 class="font-titre font-bold text-encre text-4xl md:text-[3.6rem] leading-[1.05] tracking-tight mb-4">
              Apporte ta question.
              <span class="accent block text-corail">Repars avec un plan.</span>
            </h2>
            <p class="font-titre text-ardoise text-lg">45 minutes en visio, récap écrit après l'appel.</p>
          </div>
          <div class="text-right">
            <p class="font-titre font-bold text-encre text-7xl md:text-8xl leading-none mb-5">85 €</p>
            <a :href="reservationUrl" class="btn-azur">Réserver mon appel</a>
          </div>
        </div>
      </section>

      <ToutSavoir class="pb-6 md:pb-8" titre="Tout savoir sur l'appel" resume="Ton récap, les autres témoignages, le cadre et tes questions.">
        <div class="fiche-ligne">
          <h3 class="fiche-titre">Ton récap après l'appel</h3>
          <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <li v-for="a in apports" :key="a.titre" class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 shrink-0 text-corail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              <div>
                <p class="font-titre font-bold text-encre">{{ a.titre }}</p>
                <p class="font-titre text-ardoise text-[15px] leading-relaxed">{{ a.texte }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Ce qui peut coincer</h3>
          <ul class="flex flex-wrap gap-2 content-start">
            <li v-for="b in blocages" :key="b" class="bg-ciel px-3 py-1.5 text-sm font-titre text-encre">{{ b }}</li>
          </ul>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Elles en parlent</h3>
          <div>
            <div class="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              <figure v-for="t in temoignages.slice(1)" :key="t.auteur">
                <blockquote class="font-titre text-encre text-[15px] leading-relaxed mb-3">«&nbsp;{{ t.paragraphes[0] }}&nbsp;»</blockquote>
                <figcaption>
                  <span class="block font-titre font-bold text-sm text-encre">{{ t.auteur }}</span>
                  <span class="block text-sm font-titre text-ardoise">{{ t.detail }}</span>
                </figcaption>
              </figure>
            </div>
            <p class="text-sm font-titre text-ardoise mt-8">Des recommandations publiées sur mon profil LinkedIn, reproduites telles qu'elles ont été écrites.</p>
          </div>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Avec qui tu parles</h3>
          <div class="flex flex-col sm:flex-row gap-6 items-start">
            <img src="/lila-visio.jpg" alt="Lila Chibane qui rit dans un parc" class="teinte w-28 h-28 object-cover shrink-0" loading="lazy" />
            <p class="vente-texte">Lila Chibane, coach sportive indépendante dans le Médoc, diplômée en sport santé et certifiée en nutrition. J'accompagne des femmes qui veulent un cadre solide et une pratique qui respecte leur vie, leurs contraintes et leur corps.</p>
          </div>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Le cadre</h3>
          <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            <li v-for="r in regles" :key="r.titre">
              <p class="font-titre font-bold text-encre mb-1">{{ r.titre }}</p>
              <p class="font-titre text-ardoise text-[15px] leading-relaxed">{{ r.texte }}</p>
            </li>
          </ul>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Tes questions</h3>
          <div>
            <details v-for="item in questions" :key="item.q" class="group bg-ciel px-5 py-4 mb-2.5">
              <summary class="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden">
                <span class="font-titre font-bold text-encre leading-snug">{{ item.q }}</span>
                <svg class="w-4 h-4 text-azur shrink-0 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
              </summary>
              <p class="vente-texte mt-3">{{ item.r }}</p>
            </details>
            <p class="vente-texte mt-6">
              Cet appel est un échange unique, sans suivi après : tu repars avec un plan que tu appliques en autonomie. Pour prolonger la réflexion, j'écris
              <a href="https://corpsdereves.substack.com/" target="_blank" rel="noopener" class="text-azur underline underline-offset-2">Corps de rêves</a>, ma newsletter sur le sport, la santé féminine et la société.
            </p>
          </div>
        </div>
      </ToutSavoir>

      <footer class="vente-conteneur py-8 flex flex-wrap items-baseline justify-between gap-4">
        <p class="text-sm font-titre text-ardoise">Lila Chibane, Avensan (Médoc)</p>
        <NuxtLink to="/#accompagnements" class="text-link">Voir les autres accompagnements</NuxtLink>
      </footer>
      </div>

    </main>
  </div>
</template>

<style scoped>
summary::-webkit-details-marker { display: none; }
.apparait {
  animation: apparait 0.35s ease-out;
}
@keyframes apparait {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .apparait { animation: none; }
}
</style>
