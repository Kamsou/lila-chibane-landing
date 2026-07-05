<script setup>
const props = defineProps({
  contact: { type: Object, required: true },
})

/** @type {import('vue').Ref<'idle' | 'success' | 'error'>} */
const formStatus = ref('idle')
const isSubmitting = ref(false)

const handleSubmit = async (e) => {
  isSubmitting.value = true
  formStatus.value = 'idle'
  const form = e.target
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      form.reset()
      formStatus.value = 'success'
    } else {
      formStatus.value = 'error'
    }
  } catch (err) {
    formStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form
    action="https://formspree.io/f/movwedpw"
    method="POST"
    class="space-y-4 md:space-y-5"
    @submit.prevent="handleSubmit"
  >
    <div class="grid sm:grid-cols-2 gap-4 md:gap-5">
      <div>
        <label for="name" class="text-xs font-body font-normal tracking-wide text-white/60 mb-1.5 block">Prénom</label>
        <input type="text" id="name" name="name" placeholder="Ton prénom" required autocomplete="given-name" class="form-input-light" />
      </div>
      <div>
        <label for="email" class="text-xs font-body font-normal tracking-wide text-white/60 mb-1.5 block">Email</label>
        <input type="email" id="email" name="email" placeholder="ton@email.com" required autocomplete="email" inputmode="email" class="form-input-light" />
      </div>
    </div>
    <div>
      <label for="phone" class="text-xs font-body font-normal tracking-wide text-white/60 mb-1.5 block">Téléphone <span class="text-white/40">(facultatif)</span></label>
      <input type="tel" id="phone" name="phone" placeholder="06 12 34 56 78" autocomplete="tel" inputmode="tel" class="form-input-light" />
    </div>
    <div>
      <label for="message" class="text-xs font-body font-normal tracking-wide text-white/60 mb-1.5 block">Message</label>
      <textarea id="message" name="message" placeholder="Dis-moi ce qui t'amène..." rows="3" required class="form-input-light resize-none"></textarea>
    </div>
    <div class="text-center pt-1">
      <button type="submit" class="btn-light inline-flex items-center justify-center gap-2" :disabled="isSubmitting">
        <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" class="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="opacity-75" />
        </svg>
        {{ isSubmitting ? 'Envoi...' : contact.buttonLabel }}
      </button>
      <p v-if="formStatus === 'success'" class="text-sm font-body font-light text-white mt-4" role="status" aria-live="polite">
        {{ contact.successMessage }}
      </p>
      <p v-else-if="formStatus === 'error'" class="text-sm font-body font-light text-white/90 mt-4" role="alert">
        Oups, l'envoi n'a pas fonctionné. Tu peux réessayer ou m'écrire à
        <a href="mailto:lila.chibane.pro@outlook.com" class="underline">lila.chibane.pro@outlook.com</a>.
      </p>
    </div>
  </form>
</template>
