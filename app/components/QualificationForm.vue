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
  <div>
    <div v-if="status === 'success'" class="rounded-2xl bg-white/[0.06] border border-white/15 p-8 md:p-12 text-center" role="status" aria-live="polite">
      <div class="w-12 h-12 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </div>
      <h2 class="font-display text-2xl md:text-3xl font-normal text-white mb-3">Merci, {{ submittedPrenom }} !</h2>
      <p class="text-base font-body font-light text-white/80 leading-relaxed max-w-md mx-auto">
        J'ai bien reçu tes réponses. Je reviens vers toi très vite pour caler un premier appel ensemble.
      </p>
    </div>

    <form v-else class="space-y-12" novalidate @submit.prevent="submit">
      <!-- Bloc 1 -->
      <section class="block">
        <h2 class="block-title">Identité & contexte</h2>
        <div class="space-y-6">
          <div class="grid sm:grid-cols-2 gap-5">
            <div :data-error="!!errors.prenom">
              <label for="q-prenom" class="q-label">Prénom <span class="req">*</span></label>
              <input id="q-prenom" v-model="state.prenom" type="text" autocomplete="given-name" placeholder="Ton prénom" class="form-input-light" />
              <p v-if="errors.prenom" class="err">{{ errors.prenom }}</p>
            </div>
            <div :data-error="!!errors.email">
              <label for="q-email" class="q-label">Email <span class="req">*</span></label>
              <input id="q-email" v-model="state.email" type="email" inputmode="email" autocomplete="email" placeholder="ton@email.com" class="form-input-light" />
              <p v-if="errors.email" class="err">{{ errors.email }}</p>
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label for="q-tel" class="q-label">Téléphone <span class="req">(facultatif)</span></label>
              <input id="q-tel" v-model="state.telephone" type="tel" inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78" class="form-input-light" />
            </div>
            <div>
              <label for="q-ville" class="q-label">Ville / secteur <span class="req">(facultatif)</span></label>
              <input id="q-ville" v-model="state.ville" type="text" placeholder="Ta ville" class="form-input-light" />
            </div>
          </div>
          <div :data-error="!!errors.age">
            <label for="q-age" class="q-label">Âge <span class="req">*</span></label>
            <div class="select-wrap">
              <select id="q-age" v-model="state.age" class="form-input-light appearance-none pr-8">
                <option value="" disabled>Choisir…</option>
                <option v-for="a in AGES" :key="a" :value="a">{{ a }}</option>
              </select>
              <svg class="select-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            <p v-if="errors.age" class="err">{{ errors.age }}</p>
          </div>
        </div>
      </section>

      <!-- Bloc 2 -->
      <section class="block">
        <h2 class="block-title">Situation actuelle</h2>
        <div class="space-y-8">
          <fieldset class="q">
            <legend class="q-label">Niveau d'expérience sportive</legend>
            <div class="q-options">
              <label v-for="o in EXPERIENCE" :key="o" class="opt" :class="{ 'opt--on': state.experience === o }">
                <input type="radio" class="sr-only" name="experience" :value="o" v-model="state.experience" />
                <span>{{ o }}</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="q">
            <legend class="q-label">Difficultés physiques actuelles</legend>
            <div class="q-options">
              <label v-for="o in DIFFICULTES" :key="o" class="opt" :class="{ 'opt--on': state.difficultes.includes(o) }">
                <input type="checkbox" class="sr-only" :value="o" :checked="state.difficultes.includes(o)" @change="toggleDifficulte(o)" />
                <span>{{ o }}</span>
              </label>
            </div>
            <input v-if="state.difficultes.includes('Autre')" v-model="state.difficulteAutre" type="text" placeholder="Précise…" class="form-input-light mt-3" />
          </fieldset>

          <fieldset class="q">
            <legend class="q-label">Contre-indication médicale ou suivi en cours</legend>
            <div class="q-options q-options--row">
              <label v-for="o in OUI_NON" :key="o" class="opt" :class="{ 'opt--on': state.contreIndication === o }">
                <input type="radio" class="sr-only" name="contre" :value="o" v-model="state.contreIndication" />
                <span>{{ o }}</span>
              </label>
            </div>
            <input v-if="state.contreIndication === 'Oui'" v-model="state.contreIndicationPrecision" type="text" placeholder="Précise…" class="form-input-light mt-3" />
          </fieldset>

          <div>
            <label for="q-freins" class="q-label">Qu'est-ce qui t'a empêchée d'atteindre tes objectifs jusqu'ici ?</label>
            <textarea id="q-freins" v-model="state.freins" rows="3" maxlength="500" placeholder="Raconte-moi…" class="form-input-light resize-none"></textarea>
          </div>
        </div>
      </section>

      <!-- Bloc 3 -->
      <section class="block">
        <h2 class="block-title">Objectifs</h2>
        <div class="space-y-8">
          <fieldset class="q" :data-error="!!errors.objectif">
            <legend class="q-label">Objectif principal <span class="req">*</span></legend>
            <div class="q-options">
              <label v-for="o in OBJECTIFS" :key="o" class="opt" :class="{ 'opt--on': state.objectif === o }">
                <input type="radio" class="sr-only" name="objectif" :value="o" v-model="state.objectif" />
                <span>{{ o }}</span>
              </label>
            </div>
            <input v-if="state.objectif === 'Autre'" v-model="state.objectifAutre" type="text" placeholder="Précise…" class="form-input-light mt-3" />
            <p v-if="errors.objectif" class="err">{{ errors.objectif }}</p>
          </fieldset>

          <fieldset class="q">
            <legend class="q-label">Qu'est-ce qui a déclenché cette démarche ?</legend>
            <div class="q-options">
              <label v-for="o in DECLENCHEURS" :key="o" class="opt" :class="{ 'opt--on': state.declencheur === o }">
                <input type="radio" class="sr-only" name="declencheur" :value="o" v-model="state.declencheur" />
                <span>{{ o }}</span>
              </label>
            </div>
            <input v-if="state.declencheur === 'Autre'" v-model="state.declencheurAutre" type="text" placeholder="Précise…" class="form-input-light mt-3" />
          </fieldset>

          <fieldset class="q">
            <legend class="q-label">Urgence ressentie</legend>
            <div class="q-options">
              <label v-for="o in URGENCES" :key="o" class="opt" :class="{ 'opt--on': state.urgence === o }">
                <input type="radio" class="sr-only" name="urgence" :value="o" v-model="state.urgence" />
                <span>{{ o }}</span>
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <!-- Bloc 4 -->
      <section class="block">
        <h2 class="block-title">Autonomie & équipement</h2>
        <div class="space-y-8">
          <fieldset class="q">
            <legend class="q-label">Es-tu à l'aise avec l'idée de t'entraîner en autonomie (programme personnalisé + suivi en visio, sans présence physique) ?</legend>
            <div class="q-options">
              <label v-for="o in AUTONOMIES" :key="o" class="opt" :class="{ 'opt--on': state.autonomie === o }">
                <input type="radio" class="sr-only" name="autonomie" :value="o" v-model="state.autonomie" />
                <span>{{ o }}</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="q">
            <legend class="q-label">As-tu déjà du matériel chez toi pour t'entraîner ?</legend>
            <div class="q-options">
              <label v-for="o in MATERIELS" :key="o" class="opt" :class="{ 'opt--on': state.materiel === o }">
                <input type="radio" class="sr-only" name="materiel" :value="o" v-model="state.materiel" />
                <span>{{ o }}</span>
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <!-- Bloc 5 -->
      <section class="block">
        <h2 class="block-title">Pour finir</h2>
        <div class="space-y-8">
          <fieldset class="q">
            <legend class="q-label">As-tu déjà travaillé avec un coach ou une salle de sport ?</legend>
            <div class="q-options q-options--row">
              <label v-for="o in OUI_NON" :key="o" class="opt" :class="{ 'opt--on': state.dejaCoach === o }">
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
                <span>{{ o }}</span>
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <!-- Bloc 6 : consentement -->
      <section class="block" :data-error="!!errors.consentement">
        <label class="consent" :class="{ 'consent--on': state.consentement }">
          <input v-model="state.consentement" type="checkbox" class="consent-box" />
          <span class="text-sm font-body font-light text-white/85 leading-relaxed">
            J'accepte que les informations transmises, y compris celles relatives à ma santé, soient utilisées uniquement pour évaluer l'adéquation avec l'accompagnement proposé par La Feuille de Route. Elles ne seront ni partagées ni cédées à des tiers. <span class="req">*</span>
          </span>
        </label>
        <p v-if="errors.consentement" class="err">{{ errors.consentement }}</p>
      </section>

      <!-- Conclusion + envoi -->
      <div class="text-center">
        <p class="text-sm font-body font-light text-white/70 leading-relaxed max-w-lg mx-auto mb-6">
          Tes réponses restent confidentielles et ne servent qu'à préparer notre échange. Je reviens vers toi sous 24/48h pour te proposer un créneau.
        </p>
        <button type="submit" class="btn-light inline-flex items-center justify-center gap-2" :disabled="status === 'submitting'">
          <svg v-if="status === 'submitting'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" class="opacity-25" />
            <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="opacity-75" />
          </svg>
          {{ status === 'submitting' ? 'Envoi…' : 'Envoyer mes réponses' }}
        </button>
        <p v-if="status === 'error'" class="err mt-4" role="alert">
          Oups, l'envoi n'a pas fonctionné. Tu peux réessayer ou m'écrire à
          <a href="mailto:lila.chibane.pro@outlook.com" class="underline">lila.chibane.pro@outlook.com</a>.
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="postcss">
.block { @apply pt-8 border-t border-white/10 first:pt-0 first:border-0; }
.block-title { @apply font-display text-xl md:text-2xl font-normal text-white mb-6; }
.q { @apply border-0 p-0 m-0; }
.q-label { @apply block text-sm font-body font-normal text-white/80 mb-3 leading-relaxed; }
.req { @apply text-white/45 font-normal; }
.q-options { @apply flex flex-col gap-2; }
.q-options--row { @apply flex-row flex-wrap; }
.opt {
  @apply flex items-center gap-2 cursor-pointer select-none rounded-xl border border-white/20 bg-white/[0.04]
         px-4 py-3 text-sm font-body font-light text-white/85
         hover:bg-white/10 transition-colors duration-200;
}
.opt--on { @apply bg-white text-bleu border-white font-normal; }
.opt:focus-within { @apply ring-2 ring-white/40; }

.select-wrap { @apply relative; }
.select-caret { @apply w-4 h-4 text-white/50 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none; }

.consent {
  @apply flex items-start gap-3 cursor-pointer rounded-xl border border-white/20 bg-white/[0.04]
         p-5 hover:bg-white/[0.07] transition-colors duration-200;
}
.consent--on { @apply border-white/40 bg-white/[0.08]; }
.consent-box { @apply mt-0.5 w-5 h-5 shrink-0 accent-white cursor-pointer; }

.err { @apply text-sm text-red-200 mt-2; }
</style>
