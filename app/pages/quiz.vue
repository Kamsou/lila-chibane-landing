<script setup>
import { ref, computed, nextTick } from 'vue';

const currentStep = ref(0);
const answers = ref({
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  q8: null,
  q9: null
});

const questions = [
  {
    step: 1,
    title: 'Énergie physique',
    icon: '🌞',
    questions: [
      {
        id: 'q1',
        text: '🌅 Le matin…',
        options: [
          { value: 'A', label: 'Je me lève pleine d\'énergie' },
          { value: 'B', label: 'J\'ai du mal à émerger' },
          { value: 'C', label: 'Je dépends du café pour survivre' }
        ]
      },
      {
        id: 'q2',
        text: '⚡ Ton niveau d\'énergie dans la journée ?',
        options: [
          { value: 'A', label: 'Stable' },
          { value: 'B', label: 'En dents de scie' },
          { value: 'C', label: 'Fatigue permanente' }
        ]
      },
      {
        id: 'q3',
        text: '😴 Ton sommeil ?',
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
    icon: '☁️',
    questions: [
      {
        id: 'q4',
        text: '🧠 Ton mental en ce moment ?',
        options: [
          { value: 'A', label: 'Clair et concentré' },
          { value: 'B', label: 'Brouillon / dispersé' },
          { value: 'C', label: 'Saturé / sous pression' }
        ]
      },
      {
        id: 'q5',
        text: '💬 Ton rapport à toi-même ?',
        options: [
          { value: 'A', label: 'Bienveillant' },
          { value: 'B', label: 'Critique' },
          { value: 'C', label: 'Exigeant, dur' }
        ]
      },
      {
        id: 'q6',
        text: '🌊 Tes émotions ?',
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
    icon: '🌿',
    questions: [
      {
        id: 'q7',
        text: '🤸‍♀️ Combien de fois par semaine fais-tu du sport ?',
        options: [
          { value: 'A', label: '3 fois ou plus' },
          { value: 'B', label: '1 à 2 fois' },
          { value: 'C', label: 'Rarement' }
        ]
      },
      {
        id: 'q8',
        text: '🥗 Ton alimentation ?',
        options: [
          { value: 'A', label: 'Équilibrée et intuitive' },
          { value: 'B', label: 'Je mange sur le pouce' },
          { value: 'C', label: 'Je mange sous stress / émotions' }
        ]
      },
      {
        id: 'q9',
        text: '☕ Tu fais des pauses dans la journée ?',
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
    icon: '⚡',
    color: 'yellow',
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
    icon: '🌪️',
    color: 'blue',
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
    icon: '☁️',
    color: 'gray',
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
  if (currentStep.value === 0) return true; // Intro page
  if (currentStep.value === questions.length + 1) return true; // Results page

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

  return {
    counts,
    profile: profiles[dominantProfile]
  };
});

function nextStep() {
  if (currentStep.value < questions.length) {
    currentStep.value++;
  } else {
    showResults.value = true;
    currentStep.value++;
  }
  window.scrollTo(0, 0);
  nextTick(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    showResults.value = false;
  }
  window.scrollTo(0, 0);
  nextTick(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function restart() {
  currentStep.value = 0;
  showResults.value = false;
  answers.value = {
    q1: null, q2: null, q3: null,
    q4: null, q5: null, q6: null,
    q7: null, q8: null, q9: null
  };
  window.scrollTo(0, 0);
  nextTick(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
    <!-- Header -->
    <header class="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <NuxtLink to="/" class="text-lg md:text-xl font-tuffy text-gray-800 hover:text-yellow-600 transition flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Lila Chibane
      </NuxtLink>
    </header>

    <!-- Intro Page -->
    <div v-if="currentStep === 0" class="h-screen flex items-center justify-center px-4 pt-20">
      <div class="max-w-3xl w-full animate-fade-up">
        <div class="text-center mb-10">
          <div class="text-6xl mb-6">✨</div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-tuffy tracking-tight">
            Quel est ton profil d'énergie actuelle ?
          </h1>
          <p class="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Découvre en quelques minutes ton état d'énergie, physique, mental et émotionnel
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 mb-8">
          <div class="flex items-start gap-3 mb-6">
            <span class="text-2xl">🌸</span>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <div class="space-y-3 text-gray-600 text-base leading-relaxed">
                <p>Bienvenue dans ce quiz introspectif.</p>
                <p>Il n'y a pas de bonne ou de mauvaise réponse, juste une invitation à t'écouter.</p>
                <p class="text-gray-700">À la fin, tu découvriras ton profil d'énergie et des pistes concrètes pour le rééquilibrer naturellement.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button @click="nextStep" class="bg-gray-900 hover:bg-gray-800 text-white font-medium text-base py-4 px-12 rounded-full shadow-sm transition transform hover:scale-[1.02]">
            Commencer le quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Question Steps -->
    <div v-else-if="currentStep > 0 && currentStep <= questions.length" class="min-h-screen flex flex-col pt-20 pb-8">
      <div class="flex-1 flex items-center justify-center px-4 py-8">
        <div class="max-w-3xl w-full animate-fade-up my-auto">
          <!-- Progress Bar -->
          <div class="mb-10">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Étape {{ currentStep }} / {{ questions.length }}</span>
              <span class="text-xs font-medium text-gray-900">{{ Math.round((currentStep / questions.length) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gray-900 h-1.5 rounded-full transition-all duration-700 ease-out" :style="{ width: (currentStep / questions.length) * 100 + '%' }"></div>
            </div>
          </div>

          <!-- Questions Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <span class="text-2xl">{{ questions[currentStep - 1].icon }}</span>
              <h2 class="text-xl md:text-2xl font-semibold text-gray-900">
                {{ questions[currentStep - 1].title }}
              </h2>
            </div>

            <div class="space-y-5">
              <div v-for="question in questions[currentStep - 1].questions" :key="question.id" class="space-y-2">
                <h3 class="text-sm font-medium text-gray-800">{{ question.text }}</h3>
                <div class="space-y-1.5">
                  <label
                    v-for="option in question.options"
                    :key="option.value"
                    class="flex items-center p-2.5 rounded-lg border cursor-pointer transition-all group"
                    :class="answers[question.id] === option.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'"
                  >
                    <input
                      type="radio"
                      :name="question.id"
                      :value="option.value"
                      v-model="answers[question.id]"
                      class="w-4 h-4 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <span class="ml-3 text-gray-700 text-sm">{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between gap-4">
            <button @click="prevStep" class="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full transition text-sm">
              ← Retour
            </button>
            <button
              @click="nextStep"
              :disabled="!canProgress"
              class="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-full transition text-sm"
              :class="canProgress ? 'shadow-sm transform hover:scale-[1.02]' : ''"
            >
              {{ currentStep === questions.length ? 'Voir mes résultats' : 'Suivant →' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Page -->
    <div v-else-if="showResults" class="min-h-screen px-4 py-24">
      <div class="max-w-4xl mx-auto animate-fade-up">
        <div class="text-center mb-12">
          <div class="text-6xl mb-6">{{ result.profile.icon }}</div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-tuffy">
            Ton profil : {{ result.profile.title }}
          </h1>
          <div class="flex justify-center gap-6 text-xs text-gray-500 uppercase tracking-wider">
            <span>A : {{ result.counts.A }}</span>
            <span>B : {{ result.counts.B }}</span>
            <span>C : {{ result.counts.C }}</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
          <div class="space-y-8 text-gray-700">
            <p class="text-lg leading-relaxed font-medium text-gray-900">{{ result.profile.description }}</p>

            <div v-for="detail in result.profile.details" :key="detail" class="text-base leading-relaxed text-gray-600">
              <p>{{ detail }}</p>
            </div>

            <div class="border-t border-gray-100 pt-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌿</span>
                Ce que cela dit de toi
              </h3>
              <ul class="space-y-3">
                <li v-for="item in result.profile.whatThisSays" :key="item" class="text-base leading-relaxed text-gray-600">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="border-t border-gray-100 pt-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>✨</span>
                Ce que tu peux approfondir
              </h3>
              <ul class="space-y-3">
                <li v-for="item in result.profile.toDeepen" :key="item" class="flex items-start gap-2 text-base leading-relaxed text-gray-600">
                  <span class="text-gray-400 mt-1">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="border-t border-gray-100 pt-8 bg-gray-50 -mx-8 md:-mx-12 px-8 md:px-12 py-8 rounded-xl">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎯</span>
                Ton prochain défi
              </h3>
              <p class="text-base leading-relaxed text-gray-700">{{ result.profile.challenge }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-sm p-8 md:p-10 text-center mb-8 border border-gray-700">
          <div class="text-4xl mb-4">🌷</div>
          <h3 class="text-2xl font-semibold text-white mb-3">Tu veux aller plus loin ?</h3>
          <p class="text-base text-gray-300 mb-6 max-w-md mx-auto">Prends rendez-vous pour un bilan gratuit personnalisé</p>
          <a
            href="https://calendly.com/lilacoach/bilanpersonnalise"
            target="_blank"
            class="inline-block bg-white hover:bg-gray-100 text-gray-900 font-medium text-sm py-3.5 px-10 rounded-full shadow-sm transition transform hover:scale-[1.02] mb-6"
          >
            Je prends RDV
          </a>
          <div class="border-t border-gray-700 pt-6 mt-6">
            <p class="text-sm text-gray-300 mb-2">Aucun créneau ne te convient ?</p>
            <a href="mailto:lila.chibane@outlook.com" class="text-base md:text-lg font-medium text-white hover:text-yellow-400 transition underline">
              lila.chibane@outlook.com
            </a>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button @click="restart" class="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full transition text-sm">
            Refaire le quiz
          </button>
          <NuxtLink to="/" class="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-full transition shadow-sm text-sm">
            Retour sur le site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.6s ease-out;
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
