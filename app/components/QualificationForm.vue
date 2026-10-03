<script setup>
const AGES = ['18-30', '31-40', '41-50', '51-60', '60+']
const EXPERIENCE = ['Jamais pratiqué', "J'ai arrêté depuis longtemps", 'Je pratique déjà mais je veux structurer', 'Sportive confirmée']
const DIFFICULTES = ['Douleurs articulaires', "Manque d'énergie", 'Fatigue chronique', 'Troubles du sommeil', 'Prise de poids', 'Aucune', 'Autre']
const OUI_NON = ['Oui', 'Non']
const OBJECTIFS = ['Perte de poids', 'Prise de masse musculaire', "Retrouver de l'énergie", 'Préparer ou traverser la ménopause', 'Reprendre une activité après un arrêt', 'Autre']
const DECLENCHEURS = ['Un événement de vie (naissance, ménopause, bilan santé…)', 'Une prise de conscience progressive', 'Une recommandation', 'Autre']
const URGENCES = ['Je veux commencer maintenant', 'Dans le mois qui vient', 'Je me renseigne pour plus tard']
const AUTONOMIES = ["Oui, c'est ce que je recherche", 'Je ne suis pas sûre', "Non, j'ai besoin de présence physique"]
const MATERIELS = ["Oui, j'ai le nécessaire", 'Non, mais je suis prête à investir', "Je ne sais pas ce qu'il me faut"]
const INVESTIR = ['Oui, je cherche activement', 'Je me renseigne', 'Pas encore, je découvre']

const state = reactive({
  prenom: '', email: '', telephone: '', age: '', ville: '',
  experience: '', difficultes: [], difficulteAutre: '',
  contreIndication: '', contreIndicationPrecision: '',
  freins: '',
  objectif: '', objectifAutre: '',
  declencheur: '', declencheurAutre: '',
  urgence: '',
  autonomie: '', materiel: '',
  dejaCoach: '', pretInvestir: '',
  consentement: false,
})

const toggleDifficulte = (value) => {
  const i = state.difficultes.indexOf(value)
  if (i === -1) state.difficultes.push(value)
  else state.difficultes.splice(i, 1)
}

const errors = reactive({})
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const validate = () => {
  const e = {}
  if (!state.prenom.trim()) e.prenom = 'Ton prénom est requis.'
  if (!emailOk(state.email.trim())) e.email = 'Une adresse email valide est requise.'
  if (!state.age) e.age = "Merci de choisir une tranche d'âge."
  if (!state.objectif) e.objectif = 'Merci de choisir un objectif principal.'
  if (!state.consentement) e.consentement = "Le consentement est nécessaire pour envoyer le formulaire."
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

// La feuille de route qui se remplit à côté du formulaire
const pick = (value, other) => (value === 'Autre' ? other.trim() || 'Autre' : value)
const sheet = computed(() => [
  { label: 'prénom', value: state.prenom.trim() },
  { label: 'âge', value: state.age ? `${state.age} ans` : '' },
  { label: 'objectif', value: pick(state.objectif, state.objectifAutre) },
  { label: 'déclencheur', value: pick(state.declencheur, state.declencheurAutre) },
  { label: 'urgence', value: state.urgence },
  { label: 'format', value: state.autonomie },
])
const answered = computed(() => [
  state.prenom.trim(), emailOk(state.email.trim()), state.age, state.experience, state.difficultes.length,
  state.contreIndication, state.freins.trim(), state.objectif, state.declencheur, state.urgence,
  state.autonomie, state.materiel, state.dejaCoach, state.pretInvestir,
].filter(Boolean).length)
const progress = computed(() => Math.round((answered.value / 14) * 100))

const status = ref('idle')
const submittedPrenom = ref('')

const buildPayload = () => ({
  prenom: state.prenom.trim(),
  email: state.email.trim(),
  telephone: state.telephone.trim(),
  age: state.age,
  ville: state.ville.trim(),
  experience: state.experience,
  difficultes: state.difficultes,
  difficulteAutre: state.difficultes.includes('Autre') ? state.difficulteAutre.trim() : '',
  contreIndication: state.contreIndication,
  contreIndicationPrecision: state.contreIndication === 'Oui' ? state.contreIndicationPrecision.trim() : '',
  freins: state.freins.trim(),
  objectif: state.objectif,
  objectifAutre: state.objectif === 'Autre' ? state.objectifAutre.trim() : '',
  declencheur: state.declencheur,
  declencheurAutre: state.declencheur === 'Autre' ? state.declencheurAutre.trim() : '',
  urgence: state.urgence,
  autonomie: state.autonomie,
  materiel: state.materiel,
  dejaCoach: state.dejaCoach,
  pretInvestir: state.pretInvestir,
  consentement: state.consentement,
})

const submit = async () => {
  if (!validate()) {
    await nextTick()
    document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  status.value = 'submitting'
  try {
    await $fetch('/api/qualification', { method: 'POST', body: buildPayload() })
    submittedPrenom.value = state.prenom.trim()
    status.value = 'success'
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-16 items-start">
    <aside class="lg:sticky lg:top-28">
      <slot name="intro" />

      <!-- La feuille de route se remplit au fil des réponses -->
      <div class="sheet hidden lg:block" aria-hidden="true">
        <div class="flex items-center justify-between mb-2">
          <p class="font-display text-lg font-medium">Ta feuille de route</p>
          <span class="text-[12px] font-body text-ink/50 tabular-nums">{{ progress }} %</span>
        </div>
        <div class="h-1.5 rounded-full bg-ink/10 overflow-hidden mb-3">
          <div class="h-full rounded-full bg-terra transition-[width] duration-500 ease-out" :style="{ width: `${progress}%` }"></div>
        </div>
        <ul>
          <li v-for="row in sheet" :key="row.label" class="sheet-row">
            <span class="sheet-check" :class="{ 'sheet-check--on': row.value }">
              <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <span class="text-ink/50 w-24 shrink-0">{{ row.label }}</span>
            <span class="truncate" :class="row.value ? 'text-ink font-medium' : 'text-ink/25'">{{ row.value || '…' }}</span>
          </li>
        </ul>
      </div>
    </aside>

    <div>
      <div v-if="status === 'success'" class="rounded-[1.75rem] bg-bleu text-paper p-8 md:p-12" role="status" aria-live="polite">
        <div class="w-12 h-12 mb-6 rounded-full bg-paper text-bleu grid place-items-center">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 class="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">Merci, {{ submittedPrenom }} !</h2>
        <p class="text-base md:text-lg font-body font-light text-paper/85 leading-relaxed max-w-md mb-8">
          J'ai bien reçu tes réponses. Je reviens vers toi très vite pour caler un premier appel ensemble.
        </p>
        <NuxtLink to="/blog" class="text-sm font-body text-paper/80 hover:text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper transition-colors">
          En attendant, lire le blog
        </NuxtLink>
      </div>

      <form v-else class="space-y-4" novalidate @submit.prevent="submit">
        <!-- Étape 1 -->
        <section class="step">
          <p class="step-count">étape 1 sur 5</p>
          <h2 class="step-title">Identité et contexte</h2>
          <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-4">
              <div :data-error="!!errors.prenom">
                <label for="q-prenom" class="q-label">Prénom <span class="req">*</span></label>
                <input id="q-prenom" v-model="state.prenom" type="text" autocomplete="given-name" placeholder="Ton prénom" class="field" :class="{ 'field--err': errors.prenom }" />
                <p v-if="errors.prenom" class="err">{{ errors.prenom }}</p>
              </div>
              <div :data-error="!!errors.email">
                <label for="q-email" class="q-label">Email <span class="req">*</span></label>
                <input id="q-email" v-model="state.email" type="email" inputmode="email" autocomplete="email" placeholder="ton@email.com" class="field" :class="{ 'field--err': errors.email }" />
                <p v-if="errors.email" class="err">{{ errors.email }}</p>
              </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label for="q-tel" class="q-label">Téléphone <span class="opt-hint">facultatif</span></label>
                <input id="q-tel" v-model="state.telephone" type="tel" inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78" class="field" />
              </div>
              <div>
                <label for="q-ville" class="q-label">Ville ou secteur <span class="opt-hint">facultatif</span></label>
                <input id="q-ville" v-model="state.ville" type="text" placeholder="Ta ville" class="field" />
              </div>
            </div>
            <fieldset class="q" :data-error="!!errors.age">
              <legend class="q-label">Âge <span class="req">*</span></legend>
              <div class="flex flex-wrap gap-2">
                <label v-for="a in AGES" :key="a" class="opt opt--compact" :class="{ 'opt--on': state.age === a }">
                  <input type="radio" class="sr-only" name="age" :value="a" v-model="state.age" />
                  <span>{{ a }}</span>
                </label>
              </div>
              <p v-if="errors.age" class="err">{{ errors.age }}</p>
            </fieldset>
          </div>
        </section>

        <!-- Étape 2 -->
        <section class="step">
          <p class="step-count">étape 2 sur 5</p>
          <h2 class="step-title">Situation actuelle</h2>
          <div class="space-y-7">
            <fieldset class="q">
              <legend class="q-label">Niveau d'expérience sportive</legend>
              <div class="q-options">
                <label v-for="o in EXPERIENCE" :key="o" class="opt" :class="{ 'opt--on': state.experience === o }">
                  <input type="radio" class="sr-only" name="experience" :value="o" v-model="state.experience" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">Difficultés physiques actuelles <span class="opt-hint">plusieurs choix possibles</span></legend>
              <div class="q-options">
                <label v-for="o in DIFFICULTES" :key="o" class="opt" :class="{ 'opt--on': state.difficultes.includes(o) }">
                  <input type="checkbox" class="sr-only" :value="o" :checked="state.difficultes.includes(o)" @change="toggleDifficulte(o)" />
                  <span class="opt-dot opt-dot--square"></span><span>{{ o }}</span>
                </label>
              </div>
              <input v-if="state.difficultes.includes('Autre')" v-model="state.difficulteAutre" type="text" placeholder="Précise…" class="field mt-3" />
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">Contre-indication médicale ou suivi en cours</legend>
              <div class="flex flex-wrap gap-2">
                <label v-for="o in OUI_NON" :key="o" class="opt opt--compact" :class="{ 'opt--on': state.contreIndication === o }">
                  <input type="radio" class="sr-only" name="contre" :value="o" v-model="state.contreIndication" />
                  <span>{{ o }}</span>
                </label>
              </div>
              <input v-if="state.contreIndication === 'Oui'" v-model="state.contreIndicationPrecision" type="text" placeholder="Précise…" class="field mt-3" />
            </fieldset>

            <div>
              <label for="q-freins" class="q-label">Qu'est-ce qui t'a empêchée d'atteindre tes objectifs jusqu'ici ?</label>
              <textarea id="q-freins" v-model="state.freins" rows="3" maxlength="500" placeholder="Raconte-moi…" class="field resize-none"></textarea>
            </div>
          </div>
        </section>

        <!-- Étape 3 -->
        <section class="step">
          <p class="step-count">étape 3 sur 5</p>
          <h2 class="step-title">Objectifs</h2>
          <div class="space-y-7">
            <fieldset class="q" :data-error="!!errors.objectif">
              <legend class="q-label">Objectif principal <span class="req">*</span></legend>
              <div class="q-options">
                <label v-for="o in OBJECTIFS" :key="o" class="opt" :class="{ 'opt--on': state.objectif === o }">
                  <input type="radio" class="sr-only" name="objectif" :value="o" v-model="state.objectif" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
              <input v-if="state.objectif === 'Autre'" v-model="state.objectifAutre" type="text" placeholder="Précise…" class="field mt-3" />
              <p v-if="errors.objectif" class="err">{{ errors.objectif }}</p>
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">Qu'est-ce qui a déclenché cette démarche ?</legend>
              <div class="q-options">
                <label v-for="o in DECLENCHEURS" :key="o" class="opt" :class="{ 'opt--on': state.declencheur === o }">
                  <input type="radio" class="sr-only" name="declencheur" :value="o" v-model="state.declencheur" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
              <input v-if="state.declencheur === 'Autre'" v-model="state.declencheurAutre" type="text" placeholder="Précise…" class="field mt-3" />
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">Urgence ressentie</legend>
              <div class="q-options">
                <label v-for="o in URGENCES" :key="o" class="opt" :class="{ 'opt--on': state.urgence === o }">
                  <input type="radio" class="sr-only" name="urgence" :value="o" v-model="state.urgence" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
            </fieldset>
          </div>
        </section>

        <!-- Étape 4 -->
        <section class="step">
          <p class="step-count">étape 4 sur 5</p>
          <h2 class="step-title">Autonomie et équipement</h2>
          <div class="space-y-7">
            <fieldset class="q">
              <legend class="q-label">Es-tu à l'aise avec l'idée de t'entraîner en autonomie (programme personnalisé et suivi en visio, sans présence physique) ?</legend>
              <div class="q-options">
                <label v-for="o in AUTONOMIES" :key="o" class="opt" :class="{ 'opt--on': state.autonomie === o }">
                  <input type="radio" class="sr-only" name="autonomie" :value="o" v-model="state.autonomie" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">As-tu déjà du matériel chez toi pour t'entraîner ?</legend>
              <div class="q-options">
                <label v-for="o in MATERIELS" :key="o" class="opt" :class="{ 'opt--on': state.materiel === o }">
                  <input type="radio" class="sr-only" name="materiel" :value="o" v-model="state.materiel" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
            </fieldset>
          </div>
        </section>

        <!-- Étape 5 -->
        <section class="step">
          <p class="step-count">étape 5 sur 5</p>
          <h2 class="step-title">Pour finir</h2>
          <div class="space-y-7">
            <fieldset class="q">
              <legend class="q-label">As-tu déjà travaillé avec un coach ou une salle de sport ?</legend>
              <div class="flex flex-wrap gap-2">
                <label v-for="o in OUI_NON" :key="o" class="opt opt--compact" :class="{ 'opt--on': state.dejaCoach === o }">
                  <input type="radio" class="sr-only" name="dejacoach" :value="o" v-model="state.dejaCoach" />
                  <span>{{ o }}</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="q">
              <legend class="q-label">Es-tu prête à investir dans un accompagnement personnalisé ?</legend>
              <div class="q-options">
                <label v-for="o in INVESTIR" :key="o" class="opt" :class="{ 'opt--on': state.pretInvestir === o }">
                  <input type="radio" class="sr-only" name="investir" :value="o" v-model="state.pretInvestir" />
                  <span class="opt-dot"></span><span>{{ o }}</span>
                </label>
              </div>
            </fieldset>

            <div :data-error="!!errors.consentement">
              <label class="consent" :class="{ 'consent--on': state.consentement, 'consent--err': errors.consentement }">
                <input v-model="state.consentement" type="checkbox" class="consent-box" />
                <span class="text-sm font-body font-light text-ink/80 leading-relaxed">
                  J'accepte que les informations transmises, y compris celles relatives à ma santé, soient utilisées uniquement pour évaluer l'adéquation avec l'accompagnement proposé par La Feuille de Route. Elles ne seront ni partagées ni cédées à des tiers. <span class="req">*</span>
                </span>
              </label>
              <p v-if="errors.consentement" class="err">{{ errors.consentement }}</p>
            </div>
          </div>
        </section>

        <!-- Envoi -->
        <div class="pt-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <button type="submit" class="btn-big btn-big--ink group shrink-0 disabled:opacity-70" :disabled="status === 'submitting'">
            {{ status === 'submitting' ? 'Envoi…' : 'Envoyer mes réponses' }}
            <span class="btn-big-arrow">
              <svg v-if="status === 'submitting'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" class="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
              <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </button>
          <p class="text-sm font-body font-light text-ink/60 leading-relaxed">
            Tes réponses restent confidentielles et ne servent qu'à préparer notre échange. Je reviens vers toi sous 24/48h pour te proposer un créneau.
          </p>
        </div>
        <p v-if="status === 'error'" class="err" role="alert">
          Oups, l'envoi n'a pas fonctionné. Tu peux réessayer ou m'écrire à
          <a href="mailto:lila.chibane.pro@outlook.com" class="underline">lila.chibane.pro@outlook.com</a>.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="postcss">
/* Feuille de route (colonne de gauche) */
.sheet {
  @apply mt-10 bg-white rounded-[1.5rem] px-5 py-4 shadow-xl shadow-ink/10;
}
.sheet-row {
  @apply flex items-center gap-2.5 text-[13px] font-body py-2 border-b border-ink/[0.08] last:border-0;
}
.sheet-check {
  @apply w-4 h-4 shrink-0 rounded-full border border-ink/20 text-transparent grid place-items-center transition-colors duration-300;
}
.sheet-check--on { @apply bg-bleu border-bleu text-paper; }

/* Étapes */
.step {
  @apply bg-white rounded-[1.75rem] p-6 md:p-8;
}
.step-count { @apply text-[13px] font-body text-terra mb-1; }
.step-title { @apply font-display text-2xl md:text-[1.75rem] font-medium tracking-tight text-ink mb-6; }
.q { @apply border-0 p-0 m-0 min-w-0; }
.q-label { @apply block text-[15px] font-body text-ink/85 mb-3 leading-relaxed; }
.req { @apply text-terra; }
.opt-hint { @apply text-[13px] text-ink/45; }

.field {
  @apply w-full bg-paper border border-ink/10 rounded-xl px-4 py-3 text-[15px] font-body text-ink
         placeholder:text-ink/35 focus:outline-none focus:border-bleu focus:ring-4 focus:ring-bleu/10
         transition-colors duration-200;
}
.field--err { @apply border-terra; }

.q-options { @apply grid sm:grid-cols-2 gap-2; }
.opt {
  @apply flex items-center gap-3 cursor-pointer select-none rounded-xl border border-ink/10 bg-paper
         px-4 py-3 text-[14px] font-body text-ink/80 leading-snug
         hover:border-ink/25 transition-colors duration-200;
}
.opt--compact { @apply px-5 py-2.5; }
.opt--on { @apply bg-bleu border-bleu text-paper; }
.opt:focus-within { @apply ring-4 ring-bleu/15; }
.opt-dot {
  @apply w-4 h-4 shrink-0 rounded-full border-2 border-ink/20 transition-colors duration-200;
}
.opt-dot--square { @apply rounded-[5px]; }
.opt--on .opt-dot { @apply border-paper bg-paper; box-shadow: inset 0 0 0 3px #1B3FA0; }

.consent {
  @apply flex items-start gap-3 cursor-pointer rounded-xl border border-ink/10 bg-paper p-5
         hover:border-ink/25 transition-colors duration-200;
}
.consent--on { @apply border-bleu/40; }
.consent--err { @apply border-terra; }
.consent-box { @apply mt-0.5 w-5 h-5 shrink-0 accent-bleu cursor-pointer; }

.err { @apply text-sm font-body text-terra mt-2; }
</style>
