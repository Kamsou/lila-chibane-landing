<script setup>
import { ref, computed, nextTick } from 'vue';

useSeoMeta({
  title: 'Quiz Énergie — Lila Chibane · Coach sport-santé',
  description: 'Découvre ton profil énergie et reçois des conseils personnalisés pour retrouver forme et vitalité.',
  ogTitle: 'Quiz Énergie — Lila Chibane',
  ogDescription: 'Quel est ton profil énergie ? Fais le quiz gratuit.',
  ogUrl: 'https://lilachibane.com/quiz',
  ogType: 'website',
  ogImage: 'https://lilachibane.com/lila-portrait.png',
  twitterTitle: 'Quiz Énergie — Lila Chibane',
  twitterDescription: 'Quel est ton profil énergie ? Fais le quiz gratuit.',
  twitterImage: 'https://lilachibane.com/lila-portrait.png',
})

const currentStep = ref(0);
const answers = ref({
  q1: null, q2: null, q3: null,
  q4: null, q5: null, q6: null,
  q7: null, q8: null, q9: null
});

const questions = [
  {
    step: 1,
    title: 'Énergie physique',
    questions: [
      {
        id: 'q1',
        text: 'Le matin…',
        options: [
          { value: 'A', label: 'Je me lève pleine d\'énergie' },
          { value: 'B', label: 'J\'ai du mal à émerger' },
          { value: 'C', label: 'Je dépends du café pour survivre' }
        ]
      },
      {
        id: 'q2',
        text: 'Ton niveau d\'énergie dans la journée ?',
        options: [
          { value: 'A', label: 'Stable' },
          { value: 'B', label: 'En dents de scie' },
          { value: 'C', label: 'Fatigue permanente' }
        ]
      },
      {
        id: 'q3',
        text: 'Ton sommeil ?',
        options: [
          { value: 'A', label: 'Réparateur' },
          { value: 'B', label: 'Léger / entrecoupé' },
          { value: 'C', label: 'Chaotique' }
        ]
      }
    ]
  },
  {
    step: 2,
    title: 'Mental & émotions',
    questions: [
      {
        id: 'q4',
        text: 'Ton mental en ce moment ?',
        options: [
          { value: 'A', label: 'Clair et concentré' },
          { value: 'B', label: 'Brouillon / dispersé' },
          { value: 'C', label: 'Saturé / sous pression' }
        ]
      },
      {
        id: 'q5',
        text: 'Ton rapport à toi-même ?',
        options: [
          { value: 'A', label: 'Bienveillant' },
          { value: 'B', label: 'Critique' },
          { value: 'C', label: 'Exigeant, dur' }
        ]
      },
      {
        id: 'q6',
        text: 'Tes émotions ?',
        options: [
          { value: 'A', label: 'Fluides' },
          { value: 'B', label: 'En montagnes russes' },
          { value: 'C', label: 'Bloquées ou refoulées' }
        ]
      }
    ]
  },
  {
    step: 3,
    title: 'Habitudes & hygiène de vie',
    questions: [
      {
        id: 'q7',
        text: 'Combien de fois par semaine fais-tu du sport ?',
        options: [
          { value: 'A', label: '3 fois ou plus' },
          { value: 'B', label: '1 à 2 fois' },
          { value: 'C', label: 'Rarement' }
        ]
      },
      {
        id: 'q8',
        text: 'Ton alimentation ?',
        options: [
          { value: 'A', label: 'Équilibrée et intuitive' },
          { value: 'B', label: 'Je mange sur le pouce' },
          { value: 'C', label: 'Je mange sous stress / émotions' }
        ]
      },
      {
        id: 'q9',
        text: 'Tu fais des pauses dans la journée ?',
        options: [
          { value: 'A', label: 'Plusieurs fois' },
          { value: 'B', label: 'Parfois' },
          { value: 'C', label: 'Rarement' }
        ]
      }
    ]
  }
];

const profiles = {
  A: {
    title: 'L\'Énergisée',
    description: 'Tu es connectée à ton corps et à tes sensations.',
    details: [
      'Tu as compris qu\'avoir de l\'énergie ne veut pas dire "en faire plus", mais "mieux gérer ton équilibre".',
      'Tu as trouvé ton rythme entre mouvement, alimentation et récupération.',
      'Ton mental est souvent clair, ton corps réactif, et ton moral stable.'
    ],
    whatThisSays: [
      'Tu es à l\'écoute de toi-même, tu respectes tes besoins, et tu sais reconnaître les signaux de fatigue avant qu\'ils ne t\'épuisent.',
      'Tu bouges pour te sentir bien, pas pour te punir. Tu manges pour nourrir ton corps, pas pour combler un manque.'
    ],
    toDeepen: [
      'Consolider tes routines sans tomber dans la rigidité.',
      'Entretenir la régularité de ton sommeil et de tes repas.',
      'Explorer le lien entre ton énergie et ton cycle hormonal ou émotionnel.'
    ],
    challenge: 'Apprendre à "ralentir pour durer". Ton corps est ton meilleur allié, continue à l\'écouter pour maintenir cette belle stabilité.'
  },
  B: {
    title: 'L\'Éparpillée',
    description: 'Tu es souvent pleine de bonne volonté, motivée, mais ton énergie part dans tous les sens.',
    details: [
      'Certaines journées, tu es au top : concentrée, productive, en mouvement.',
      'Et d\'autres… tu te sens vidée, tendue, dispersée, sans comprendre pourquoi.'
    ],
    whatThisSays: [
      'Tu donnes beaucoup, à ton travail, à ton entourage, à tes obligations, mais tu oublies parfois de recharger tes batteries.',
      'Ton mental carbure, mais ton corps peine à suivre. Tu alternes entre phases d\'énergie et moments de fatigue émotionnelle ou physique.'
    ],
    toDeepen: [
      'Structurer des pauses réelles dans ta journée (sans culpabilité).',
      'Créer une routine douce et constante (sans viser la perfection).',
      'Réapprendre à bouger par plaisir, pas par "devoir".'
    ],
    challenge: 'Remettre de la cohérence dans ton rythme. Ton énergie est là, elle a juste besoin d\'un cadre stable pour s\'exprimer durablement.'
  },
  C: {
    title: 'L\'Éteinte',
    description: 'Ton corps t\'envoie des signaux clairs : fatigue persistante, démotivation, tensions physiques, alimentation émotionnelle…',
    details: [
      'Tu sens que ton énergie baisse, même quand tu dors ou manges "bien".',
      'Tu te dis parfois : "Je n\'ai plus l\'énergie que j\'avais avant."'
    ],
    whatThisSays: [
      'Tu es probablement épuisée d\'avoir tenu trop longtemps sans vraiment te reposer.',
      'Ton mental veut avancer, mais ton corps a besoin de récupérer.',
      'Tu vis peut-être une forme de surcharge émotionnelle ou de stress chronique que ton organisme exprime à sa façon.'
    ],
    toDeepen: [
      'T\'offrir de vraies pauses, sans te sentir coupable.',
      'Reprendre le mouvement en douceur, avec des exercices simples et progressifs.',
      'Te reconnecter à la respiration, à la marche, à la sensation du corps.'
    ],
    challenge: 'Revenir à toi. Pas en forçant, mais en apaisant. Ton énergie reviendra dès que tu cesseras de la contraindre, et je peux t\'aider à poser les bases pour y parvenir.'
  }
};

const showResults = ref(false);

const canProgress = computed(() => {
  if (currentStep.value === 0) return true;
  if (currentStep.value === questions.length + 1) return true;
  const stepQuestions = questions[currentStep.value - 1].questions;
  return stepQuestions.every(q => answers.value[q.id] !== null);
});

const result = computed(() => {
  const counts = { A: 0, B: 0, C: 0 };
  Object.values(answers.value).forEach(answer => {
    if (answer) counts[answer]++;
  });
  const maxCount = Math.max(counts.A, counts.B, counts.C);
  const dominantProfile = Object.entries(counts).find(([_, count]) => count === maxCount)?.[0];
  return { counts, profile: profiles[dominantProfile] };
});

function scrollTop() {
  window.scrollTo(0, 0);
  nextTick(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function nextStep() {
  if (currentStep.value < questions.length) {
    currentStep.value++;
  } else {
    showResults.value = true;
    currentStep.value++;
  }
  scrollTop();
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    showResults.value = false;
  }
  scrollTop();
}

function restart() {
  currentStep.value = 0;
  showResults.value = false;
  answers.value = {
    q1: null, q2: null, q3: null,
    q4: null, q5: null, q6: null,
    q7: null, q8: null, q9: null
  };
  scrollTop();
}
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-400/10">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
        <NuxtLink to="/" class="font-display text-lg md:text-xl font-light tracking-tight text-stone-900 flex items-center gap-2">
          <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Lila Chibane
        </NuxtLink>
      </div>
    </header>

    <!-- Intro Page -->
    <div v-if="currentStep === 0" class="min-h-screen flex items-center justify-center px-5 sm:px-6 md:px-8 pt-20">
      <div class="max-w-2xl w-full animate-fade-up">
        <div class="text-center mb-10 md:mb-12">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6">Quiz energie</p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-stone-900 leading-[1.15] mb-5 md:mb-6">
            Quel est ton profil<br>d'energie actuelle ?
          </h1>
          <p class="text-base sm:text-lg font-body font-light text-stone-600 max-w-xl mx-auto leading-relaxed">
            Decouvre en quelques minutes ton etat d'energie, physique, mental et emotionnel
          </p>
        </div>

        <div class="bg-white rounded-2xl border border-stone-400/10 p-7 md:p-9 mb-8">
          <h2 class="text-lg font-display font-semibold text-stone-900 mb-4">Introduction</h2>
          <div class="space-y-3 text-base font-body font-light text-stone-600 leading-relaxed">
            <p>Bienvenue dans ce quiz introspectif.</p>
            <p>Il n'y a pas de bonne ou de mauvaise reponse, juste une invitation a t'ecouter.</p>
            <p class="text-stone-800 font-normal">A la fin, tu decouvriras ton profil d'energie et des pistes concretes pour le reequilibrer naturellement.</p>
          </div>
        </div>

        <div class="text-center">
          <button @click="nextStep" class="bg-stone-900 hover:bg-stone-800 text-white text-sm font-body font-medium tracking-wide py-3.5 px-10 rounded-full transition-all duration-300 hover:shadow-lg active:scale-[0.97]">
            Commencer le quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Question Steps -->
    <div v-else-if="currentStep > 0 && currentStep <= questions.length" class="min-h-screen flex flex-col pt-20 pb-8">
      <div class="flex-1 flex items-center justify-center px-5 sm:px-6 md:px-8 py-8">
        <div class="max-w-2xl w-full animate-fade-up my-auto">
          <!-- Progress Bar -->
          <div class="mb-8 md:mb-10">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-body font-medium text-sage-dark tracking-wide">Etape {{ currentStep }} / {{ questions.length }}</span>
              <span class="text-xs font-body font-medium text-stone-900">{{ Math.round((currentStep / questions.length) * 100) }}%</span>
            </div>
            <div class="w-full bg-sand rounded-full h-1 overflow-hidden">
              <div class="bg-stone-900 h-1 rounded-full transition-all duration-700 ease-out" :style="{ width: (currentStep / questions.length) * 100 + '%' }"></div>
            </div>
          </div>

          <!-- Questions Card -->
          <div class="bg-white rounded-2xl border border-stone-400/10 p-6 md:p-8 mb-6">
            <div class="mb-6 pb-4 border-b border-stone-400/10">
              <p class="text-xs font-body font-medium text-sage-dark tracking-wide mb-2">Etape {{ currentStep }}</p>
              <h2 class="text-xl md:text-2xl font-display font-light text-stone-900">
                {{ questions[currentStep - 1].title }}
              </h2>
            </div>

            <div class="space-y-6">
              <div v-for="question in questions[currentStep - 1].questions" :key="question.id" class="space-y-2.5">
                <h3 class="text-sm font-body font-medium text-stone-900">{{ question.text }}</h3>
                <div class="space-y-1.5">
                  <label
                    v-for="option in question.options"
                    :key="option.value"
                    class="flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200"
                    :class="answers[question.id] === option.value ? 'border-stone-900 bg-sand/50' : 'border-stone-400/15 hover:border-stone-400/30 hover:bg-sand/30'"
                  >
                    <input
                      type="radio"
                      :name="question.id"
                      :value="option.value"
                      v-model="answers[question.id]"
                      class="w-4 h-4 text-stone-900 focus:ring-sage cursor-pointer accent-stone-900"
                    />
                    <span class="ml-3 text-sm font-body text-stone-700">{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between gap-4">
            <button @click="prevStep" class="bg-transparent border border-stone-300 text-stone-600 text-sm font-body font-medium py-3 px-6 rounded-full hover:border-stone-900 hover:text-stone-900 transition-all duration-300">
              Retour
            </button>
            <button
              @click="nextStep"
              :disabled="!canProgress"
              class="text-sm font-body font-medium py-3 px-8 rounded-full transition-all duration-300"
              :class="canProgress ? 'bg-stone-900 hover:bg-stone-800 text-white hover:shadow-lg active:scale-[0.97]' : 'bg-sand text-stone-400 cursor-not-allowed'"
            >
              {{ currentStep === questions.length ? 'Voir mes resultats' : 'Suivant' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Page -->
    <div v-else-if="showResults" class="min-h-screen px-5 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 md:pb-32">
      <div class="max-w-3xl mx-auto animate-fade-up">
        <div class="text-center mb-10 md:mb-14">
          <p class="text-xs font-body font-medium tracking-wide text-sage-dark mb-5 md:mb-6">Ton resultat</p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-stone-900 leading-[1.15] mb-4">
            {{ result.profile.title }}
          </h1>
          <div class="flex justify-center gap-6 text-xs font-body text-stone-400 tracking-wide">
            <span>A : {{ result.counts.A }}</span>
            <span>B : {{ result.counts.B }}</span>
            <span>C : {{ result.counts.C }}</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-stone-400/10 p-7 md:p-10 mb-8">
          <div class="space-y-8">
            <p class="text-lg font-body font-medium text-stone-900 leading-relaxed">{{ result.profile.description }}</p>

            <div v-for="detail in result.profile.details" :key="detail" class="text-base font-body font-light text-stone-600 leading-relaxed">
              <p>{{ detail }}</p>
            </div>

            <div class="border-t border-stone-400/15 pt-8">
              <h3 class="text-lg font-display font-semibold text-stone-900 mb-4">Ce que cela dit de toi</h3>
              <ul class="space-y-3">
                <li v-for="item in result.profile.whatThisSays" :key="item" class="text-base font-body font-light text-stone-600 leading-relaxed">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="border-t border-stone-400/15 pt-8">
              <h3 class="text-lg font-display font-semibold text-stone-900 mb-4">Ce que tu peux approfondir</h3>
              <ul class="space-y-3">
                <li v-for="item in result.profile.toDeepen" :key="item" class="flex items-start gap-2.5 text-base font-body font-light text-stone-600 leading-relaxed">
                  <span class="text-sage mt-1.5 text-xs">&#9679;</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="border-t border-stone-400/15 pt-8 bg-sand -mx-7 md:-mx-10 px-7 md:px-10 py-8 rounded-xl">
              <h3 class="text-lg font-display font-semibold text-stone-900 mb-4">Ton prochain defi</h3>
              <p class="text-base font-body font-light text-stone-700 leading-relaxed">{{ result.profile.challenge }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-stone-900 rounded-2xl p-8 md:p-10 text-center mb-8">
          <h3 class="text-xl md:text-2xl font-display font-light text-white mb-3">Tu veux aller plus loin ?</h3>
          <p class="text-sm font-body text-white/60 mb-6 max-w-md mx-auto leading-relaxed">
            Prends rendez-vous pour un bilan gratuit personnalise
          </p>
          <a
            href="https://calendly.com/lilacoach/bilanpersonnalise"
            target="_blank"
            rel="noopener"
            class="inline-block bg-white hover:bg-cream text-stone-900 text-sm font-body font-medium tracking-wide py-3.5 px-10 rounded-full transition-all duration-300 hover:shadow-lg mb-6"
          >
            Je prends RDV
          </a>
          <div class="border-t border-white/10 pt-6 mt-2">
            <p class="text-xs font-body text-white/40 mb-2">Aucun creneau ne te convient ?</p>
            <a href="mailto:lila.chibane@outlook.com" class="text-sm font-body font-medium text-white hover:text-white/80 transition-colors duration-200 underline underline-offset-4">
              lila.chibane@outlook.com
            </a>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button @click="restart" class="bg-transparent border border-stone-300 text-stone-600 text-sm font-body font-medium py-3 px-6 rounded-full hover:border-stone-900 hover:text-stone-900 transition-all duration-300">
            Refaire le quiz
          </button>
          <NuxtLink to="/" class="bg-stone-900 hover:bg-stone-800 text-white text-sm font-body font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg">
            Retour sur le site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
