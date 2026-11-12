<script setup>
const listeUrl = 'https://tally.so/r/e5MeQl'

const pourToi = [
  'Tu veux te remettre au sport efficacement, sans y passer des heures.',
  "Tu veux apprendre à t'autoriser du temps pour toi, sans culpabilité.",
  'Tu veux être entourée par des femmes bienveillantes.',
  'Tu attends que la motivation revienne toute seule (avec ses petites jambes).',
]

const aussiPourToi = [
  'Tu veux apprendre à composer avec un planning fluctuant, des journées parfois chargées.',
  "Tu veux mieux comprendre comment fonctionne ton corps, comment lui apporter de l'énergie et le préserver quand il en a besoin.",
  'Tu veux apprendre les mouvements de base du renforcement musculaire et leur exécution, sans risquer de mal faire ou de te blesser.',
  "Tu veux comprendre l'impact des fluctuations hormonales sur ton corps, ton poids et ton humeur.",
  'Tu sais que tu dois changer un truc, tu ne sais pas lequel, et tu ne veux pas tout chambouler.',
]

const gains = [
  'tu respectes ton énergie',
  'tu gagnes du temps',
  "tu t'autorises du temps pour toi",
  'tu vois ta progression',
  'tu prends soin de ta santé et de ton estime de toi',
]
const reperes = [
  { valeur: '12 semaines', label: 'en ligne, à ton calendrier' },
  { valeur: '6 femmes', label: 'un petit groupe' },
  { valeur: '1 live', label: 'par semaine, et 3 vidéos' },
  { valeur: '650 €', label: 'tarif de la première cohorte' },
]

const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const moments = ['matin', 'midi', 'soir']
const semaines = [
  [[0, 0], [2, 2], [5, 1]],
  [[1, 2], [3, 0], [6, 1]],
  [[0, 1], [4, 2], [5, 0]],
  [[2, 0], [3, 2], [6, 0]],
]
const semaine = ref(0)
let minuteur
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  minuteur = setInterval(() => { semaine.value = (semaine.value + 1) % semaines.length }, 2600)
})
onUnmounted(() => clearInterval(minuteur))

useReveal()

const aLaFin = [
  '2 mois offerts à la communauté « libres et musclées ».',
  'Les 36 vidéos, à garder.',
  'Les techniques pour créer tes propres séances partout où tu te trouves.',
]

const mots = [
  { citation: "À fond boulot et enfant en bas âge, j'ai du mal à me prioriser.", source: 'Une femme interrogée pendant mon enquête' },
  { citation: 'Trop de choses en tête.', source: 'Une femme interrogée pendant mon enquête' },
  { citation: 'Ma soupape de sécurité.', source: 'À propos de ses deux séances hebdomadaires, une femme interrogée pendant mon enquête' },
]

const pasPourToi = [
  "Tu as besoin d'un coach présent à chaque séance.",
  'Tu préfères les séances en présentiel avec un coach physiquement présent.',
  'Tu te sens déjà bien outillée et tu ne cherches aucun défi.',
  "Tu es suivie médicalement pour des douleurs physiques chroniques (lombalgie, fibromyalgie, hernie discale ou cervicale…). La cohorte ne remplace pas ton suivi médical. Demande l'avis de ton médecin ou de ton kiné avant de commencer.",
]

const coches = reactive(new Set())
const cocher = (i) => {
  if (coches.has(i)) coches.delete(i)
  else coches.add(i)
}

useSeoMeta({
  title: 'Les tortues libres et musclées · cohorte en ligne de 12 semaines · Lila Chibane',
  description: "Reprendre le sport à ton rythme, sans y passer des heures. Un petit groupe de 6 femmes, un live par semaine, trois vidéos, et à la fin tu sais créer tes propres séances.",
  ogTitle: 'Les tortues libres et musclées, la cohorte de Lila Chibane',
  ogDescription: "12 semaines en ligne pour reprendre le sport à ton rythme, en petit groupe.",
  ogUrl: 'https://lilachibane.com/cohorte',
  ogImage: 'https://lilachibane.com/og-cohorte.jpg',
  ogImageAlt: 'Lila Chibane dans les pins du Médoc',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-[100dvh] bg-ciel text-encre">
    <ActivityHeader />
    <BoutonColle :href="listeUrl" externe label="Liste d'attente" prix="650 €" detail="12 semaines en ligne" />

    <main class="pt-24 md:pt-28">

      <section class="vente-conteneur pb-12 md:pb-14">
        <div class="grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-x-16 gap-y-8 items-center">
          <div>
            <h1 class="font-titre font-bold text-encre text-[2.3rem] sm:text-5xl md:text-[3.2rem] leading-[1.04] tracking-tight mb-5">
              Reprendre le sport à ton rythme,
              <span class="accent text-corail">sans y passer des heures.</span>
            </h1>
            <p class="font-plume italic text-2xl md:text-[1.75rem] leading-snug text-encre mb-8">Les tortues libres et musclées</p>
            <div class="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a :href="listeUrl" target="_blank" rel="noopener" class="btn-azur">Rejoindre la liste d'attente</a>
              <p class="text-sm font-titre text-ardoise">5 places seulement</p>
            </div>
          </div>
          <div class="relative w-full max-w-[min(54vh,28rem)] mx-auto md:mr-0" aria-hidden="true">
            <img src="/lila-pins.jpg" alt="" class="teinte w-full aspect-square object-cover object-[48%_30%]" fetchpriority="high" />
            <p class="absolute top-4 left-4 bg-encre/75 text-white font-titre text-sm px-3 py-1.5 rounded-full">Semaine 3 sur 12</p>
            <div class="relative h-36 mt-3 md:mt-0 md:absolute md:-left-16 md:right-4 md:bottom-2 md:h-32">
              <OffreVisuel type="groupe" />
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
          <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 mb-10">
            <h2 class="titre">Cette cohorte est pour toi si…</h2>
            <p class="font-titre text-ardoise" aria-live="polite">
              <template v-if="coches.size === 0">Coche ce qui te ressemble.</template>
              <template v-else><span class="font-bold text-encre">{{ coches.size }} sur {{ pourToi.length }}.</span> {{ coches.size >= 2 ? "Tu es au bon endroit." : "Continue." }}</template>
            </p>
          </div>
          <ul class="grid md:grid-cols-2 gap-2 md:gap-3 max-w-4xl">
            <li v-for="(t, i) in pourToi" :key="i">
              <button
                type="button"
                class="w-full h-full text-left flex items-start gap-3 px-4 py-4 md:p-5 border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-azur/40"
                :class="coches.has(i) ? 'bg-azur border-azur text-white' : 'bg-ciel border-ciel text-encre hover:border-azur'"
                :aria-pressed="coches.has(i)"
                @click="cocher(i)"
              >
                <span class="mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center" :class="coches.has(i) ? 'border-white bg-white text-azur' : 'border-ardoise/50 bg-white'">
                  <svg v-if="coches.has(i)" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span class="font-titre text-[15px] md:text-base leading-snug">{{ t }}</span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      <section class="vente-bande !pt-4 vente-conteneur">
        <h2 class="titre mb-10 md:mb-14">Chaque semaine, un cadre simple.</h2>
        <div class="grid md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] gap-x-14 gap-y-10 items-end" data-revele>
          <div aria-hidden="true">
            <div class="grid grid-cols-12 gap-1.5 md:gap-2.5">
              <div v-for="w in 12" :key="w">
                <span class="pousse block h-20 md:h-28 mb-1.5 md:mb-2.5" :class="w === 12 ? 'bg-corail' : 'bg-azur'" :style="{ '--d': `${w * 55}ms` }"></span>
                <span v-for="v in 3" :key="v" class="pousse block aspect-square bg-brume mb-1.5 md:mb-2.5" :style="{ '--d': `${w * 55 + v * 70}ms` }"></span>
                <span class="block text-center text-xs font-titre text-ardoise">{{ w }}</span>
              </div>
            </div>
          </div>
          <ul class="space-y-5">
            <li class="flex items-center gap-4">
              <span class="w-5 h-9 bg-azur shrink-0"></span>
              <p class="font-titre text-encre"><span class="font-bold text-2xl">12 lives</span><br /><span class="text-ardoise">un par semaine</span></p>
            </li>
            <li class="flex items-center gap-4">
              <span class="w-5 h-5 bg-brume shrink-0"></span>
              <p class="font-titre text-encre"><span class="font-bold text-2xl">36 vidéos</span><br /><span class="text-ardoise">trois par semaine, à garder</span></p>
            </li>
            <li class="flex items-center gap-4">
              <span class="w-5 h-9 bg-corail shrink-0"></span>
              <p class="font-titre text-encre"><span class="font-bold text-2xl">Semaine 12</span><br /><span class="text-ardoise">tu conçois ta propre séance</span></p>
            </li>
            <li class="pt-5">
              <div class="flex gap-2 mb-3" aria-hidden="true">
                <span v-for="f in 6" :key="f" class="w-8 h-8 rounded-full" :class="f === 1 ? 'bg-corail' : 'bg-azur/25'"></span>
              </div>
              <p class="font-titre text-encre"><span class="font-bold text-2xl">6 femmes</span><br /><span class="text-ardoise">un groupe WhatsApp et 3 appels individuels avec moi</span></p>
            </li>
          </ul>
        </div>
      </section>
      </div>

      <section class="bande-nuit">
        <figure class="vente-conteneur text-center" data-revele>
          <blockquote class="font-plume italic text-5xl md:text-[6.5rem] leading-[1] text-[#D9B8F5]">«&nbsp;{{ mots[2].citation }}&nbsp;»</blockquote>
          <figcaption class="font-titre text-white/70 mt-6 max-w-md mx-auto">{{ mots[2].source }}</figcaption>
        </figure>
      </section>

      <div class="bande-couchant">
      <section class="grid md:grid-cols-2 items-stretch">
        <img src="/lila-plage.jpg" alt="Lila en fente sur la plage, son chien à côté" class="teinte w-full h-64 md:h-full md:min-h-[30rem] object-cover" loading="lazy" />
        <div class="px-6 md:px-14 py-14 md:py-20 max-w-xl self-center">
          <p class="font-titre font-bold text-encre text-7xl md:text-8xl leading-none mb-3">650 €</p>
          <p class="font-titre text-ardoise mb-6">pour les 12 semaines. Tarif de la première cohorte, 800 € pour celle d'avril.</p>
          <h2 class="font-titre font-bold text-encre text-3xl md:text-[2.6rem] leading-[1.08] tracking-tight mb-5">
            Rejoins la liste d'attente
            <span class="accent text-corail block">et passe en premier.</span>
          </h2>
          <p class="vente-texte mb-8">Un prénom, un email, une minute. Je t'écris dès l'ouverture, avec les dates.</p>
          <a :href="listeUrl" target="_blank" rel="noopener" class="btn-azur">Rejoindre la liste d'attente</a>
          <p class="text-sm font-titre text-ardoise mt-4">5 places seulement. Tu peux te désinscrire à tout moment.</p>
        </div>
      </section>

      <ToutSavoir class="pt-14 md:pt-20 pb-6 md:pb-8" titre="Tout savoir sur la cohorte" resume="Ton calendrier, ce que tu gardes, pour qui ce n'est pas fait.">
        <div class="fiche-ligne">
          <h3 class="fiche-titre">Tu es ton propre calendrier</h3>
          <div>
            <p class="vente-texte mb-6">Aucun horaire imposé. Tu places tes trois séances là où ta semaine le permet, et elles bougent avec elle.</p>
            <div class="max-w-xl" aria-hidden="true">
              <div class="grid grid-cols-[3rem_1fr] gap-x-3">
                <div class="grid grid-rows-3 text-xs font-titre text-ardoise/70">
                  <span v-for="m in moments" :key="m" class="flex items-center">{{ m }}</span>
                </div>
                <div class="relative aspect-[7/3]">
                  <div class="absolute inset-0 grid grid-cols-7 grid-rows-3 gap-1">
                    <span v-for="c in 21" :key="c" class="bg-azur/10"></span>
                  </div>
                  <span
                    v-for="(pos, i) in semaines[semaine]"
                    :key="i"
                    class="seance absolute p-0.5"
                    :style="{ left: `${(pos[0] / 7) * 100}%`, top: `${(pos[1] / 3) * 100}%`, width: `${100 / 7}%`, height: `${100 / 3}%` }"
                  >
                    <span class="block w-full h-full" :class="i === 1 ? 'bg-corail' : 'bg-azur'"></span>
                  </span>
                </div>
                <span></span>
                <div class="grid grid-cols-7 mt-2 text-xs font-titre text-ardoise/70 text-center">
                  <span v-for="(j, i) in jours" :key="i">{{ j }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Ce que tu y gagnes</h3>
          <p class="font-titre text-encre text-lg leading-relaxed">
            Semaine après semaine,
            <template v-for="(g, i) in gains" :key="g"><span class="font-semibold text-corail">{{ g }}</span>{{ i < gains.length - 2 ? ', ' : i === gains.length - 2 ? ' et ' : '.' }}</template>
          </p>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Tu repars avec</h3>
          <div>
            <ul class="mb-6">
              <li v-for="(t, i) in aLaFin" :key="i" class="vente-ligne vente-texte !text-encre flex gap-3">
                <svg class="w-5 h-5 mt-0.5 shrink-0 text-corail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                <span>{{ t }}</span>
              </li>
            </ul>
            <p class="vente-texte">C'est ce que j'appelle l'autonomie garantie : un coaching sportif conçu pour que tu n'aies plus besoin de lui. Par rapport à une salle, des cours collectifs ou un coach, tu gagnes en liberté de planning, sans dépendance.</p>
          </div>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Tu t'y reconnais aussi si</h3>
          <ul class="space-y-3">
            <li v-for="t in aussiPourToi" :key="t" class="vente-texte !text-encre">{{ t }}</li>
          </ul>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Ce n'est pas pour toi si</h3>
          <ul class="space-y-3">
            <li v-for="t in pasPourToi" :key="t" class="vente-texte">{{ t }}</li>
          </ul>
        </div>

        <div class="fiche-ligne">
          <h3 class="fiche-titre">Les mots de mon enquête</h3>
          <div class="space-y-5">
            <figure v-for="m in mots.slice(0, 2)" :key="m.citation">
              <blockquote class="font-plume italic text-2xl md:text-3xl text-encre leading-snug">«&nbsp;{{ m.citation }}&nbsp;»</blockquote>
              <figcaption class="text-sm font-titre text-ardoise mt-1">{{ m.source }}</figcaption>
            </figure>
          </div>
        </div>
      </ToutSavoir>

      <footer class="vente-conteneur py-8 flex flex-wrap items-baseline justify-between gap-4">
        <p class="text-sm font-titre text-ardoise max-w-xl">
          Lila Chibane, coach sportive diplômée, autrice de la newsletter
          <a href="https://corpsdereves.substack.com/" target="_blank" rel="noopener" class="text-azur underline underline-offset-2">Corps de rêves</a>.
          Sport, santé des femmes et sciences, chaque dimanche.
        </p>
        <NuxtLink to="/#accompagnements" class="text-link">Voir les autres accompagnements</NuxtLink>
      </footer>
      </div>

    </main>
  </div>
</template>

<style scoped>
.seance {
  transition: left 0.9s cubic-bezier(0.65, 0, 0.35, 1), top 0.9s cubic-bezier(0.65, 0, 0.35, 1);
}
@media (prefers-reduced-motion: reduce) {
  .seance { transition: none; }
}
</style>
