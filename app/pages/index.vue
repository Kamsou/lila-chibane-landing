<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const scrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 400;
};

const handleLinkClick = (e, href) => {
  e.preventDefault();
  isMobileMenuOpen.value = false;
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <section id="header" class="relative h-screen bg-cover bg-center scroll-smooth" style="background-image: url('https://res.cloudinary.com/augalo/image/upload/v1747472814/lilachibane/header_dyrbsr.jpg');">
 <header
      :class="['fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50 font-tuffy transition-all duration-300 ease-in-out', scrolled ? 'bg-white text-gray-900 shadow' : 'bg-transparent text-white']"
    >
      <h1 class="text-md md:text-2xl xl:text-3xl animate-fade-down">Lila Chibane</h1>
      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-2 md:gap-10 text-base xl:text-md tracking-widest items-center">
        <a href="#about" class="nav-link hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#about')">À propos</a>
        <a href="#services" class="nav-link hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#services')">L'Accompagnement</a>
        <NuxtLink to="/blog" class="nav-link hover:text-yellow-400 transition">Blog</NuxtLink>
        <a href="#contact" class="nav-link hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#contact')">Contact</a>
      </nav>
      <!-- Burger menu (mobile) -->
      <button class="md:hidden p-2 focus:outline-none z-50"  style="touch-action: manipulation;" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <transition name="fade">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-tuffy z-40 shadow-xl">
          <a href="#about" class="nav-link text-gray-900 hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#about')">À propos</a>
          <a href="#services" class="nav-link text-gray-900 hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#services')">L'Accompagnement</a>
          <NuxtLink to="/blog" class="nav-link text-gray-900 hover:text-yellow-400 transition" @click="isMobileMenuOpen = false">Blog</NuxtLink>
          <a href="#contact" class="nav-link text-gray-900 hover:text-yellow-400 transition" @click="e => handleLinkClick(e, '#contact')">Contact</a>
        </div>
      </transition>
    </header>

<div class="relative h-full bg-black bg-opacity-50">
  <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold mb-6 md:mb-8 animate-fade-up font-tuffy leading-tight">
      Retrouve énergie, forme et confiance<br>
      <span class="text-yellow-300">sans souffrance ni pression</span>
    </h2>
    <p class="text-base md:text-xl font-light mb-8 animate-fade-up animate-delay-200 leading-relaxed">
      Du mouvement doux et intelligent pour renouer avec ton énergie naturelle<br>
      <span class="text-yellow-300">sans régime, ni salle de sport</span>
    </p>
    <a href="#about" class="btn-primary animate-fade-up animate-delay-400 nav-link">Je découvre</a>
    <div class="mt-12 animate-bounce">
      <a href="#about" class="text-white text-3xl nav-link">↓</a>
    </div>
  </div>
</div>

  </section>

  <section id="about" class="py-20 md:py-32 text-gray-800 animate-fade-up">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col items-center mb-8 md:mb-12">
        <img src="/lila-portrait.png" alt="Portrait de Lila Chibane" class="w-48 md:w-64 mb-6">
        <h3 class="text-3xl md:text-4xl font-bold text-gray-900 font-tuffy tracking-tighter text-center">Je m'appelle Lila.</h3>
      </div>

      <div class="grid md:grid-cols-3 gap-8 md:gap-10 mb-10">
        <div>
          <p class="text-base md:text-lg leading-loose text-gray-700">
            Je suis coach sport-santé, spécialisée dans la reconnexion corps/mental et la sortie de la sédentarité.
          </p>
          <p class="text-base md:text-lg leading-loose text-gray-700 mt-6">
            J'ai longtemps cru que pour progresser, il fallait souffrir. Aujourd'hui, j'aide les femmes à retrouver énergie, bien-être et confiance en elles, sans violence envers leur corps.
          </p>
        </div>

        <div>
          <p class="text-base md:text-lg leading-loose text-gray-700">
            Mon approche combine travail de renforcement, mobilité et relâchement pour reconnecter ton corps à sa vitalité naturelle.
          </p>
          <p class="text-base md:text-lg leading-loose text-gray-700 mt-6">
            Ce sont des séances qui réveillent ton énergie tout en respectant ton rythme. Le but : bouger, respirer, s'ancrer - sans brusquer ton corps, ni ton esprit.
          </p>
        </div>

        <div>
          <p class="text-base md:text-lg leading-loose text-gray-700">
            J'accompagne les femmes, souvent prises dans le rythme du télétravail, à sortir de la sédentarité et à retrouver un corps fort, un mental apaisé et une énergie durable, tout en respectant leur rythme, sans contrainte ni culpabilité.
          </p>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-8">
        <p class="text-base md:text-lg leading-loose text-gray-700 text-center max-w-5xl mx-auto">
          <span class="font-semibold text-gray-900">Tu es la bienvenue ici, quel que soit ton niveau ou ton parcours sportif.</span><br>
          J'ai créé ces espaces pour rendre la pratique du sport accessible, confortable et bienveillante. Quelle que soit ta morphologie, ta condition physique ou ton histoire, mes coachings sont pensés comme des lieux d'écoute, de respect et de chaleur humaine.<br>
          <span class="text-yellow-600">Ici, pas de culte du corps parfait - seulement la recherche de la joie, de la vitalité et de la santé !</span>
        </p>
      </div>
    </div>
  </section>

<section id="services" class="py-24 sm:py-32 bg-gradient-to-b from-yellow-50 via-white to-white text-gray-700">
  <div class="max-w-6xl mx-auto px-4">
    <h3 class="text-4xl text-center md:text-5xl mb-12 font-tuffy tracking-tighter">
      L'accompagnement
    </h3>

    <!-- Ma méthode - Section principale -->
    <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border-2 border-yellow-200">
      <div class="flex items-center justify-center mb-6">
        <span class="bg-yellow-400/80 rounded-full p-4 shadow-md">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="currentColor"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
          </svg>
        </span>
      </div>
      <h4 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">Ma méthode</h4>
      <p class="text-base md:text-lg leading-relaxed text-gray-700 text-center max-w-4xl mx-auto">
        Une méthode qui relie <span class="font-semibold text-yellow-600">le mouvement, le mental et l'alimentation</span>.
        Parce que ton énergie vient autant de ce que tu manges que de la façon dont tu bouges,
        je t'aide à renouer avec des habitudes plus justes, plus douces, plus naturelles — pour retrouver une vitalité durable.
      </p>
    </div>

    <!-- Deux options -->
    <div class="text-center mb-10">
      <h4 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Deux formules, une même approche</h4>
      <p class="text-base md:text-lg text-gray-600">Choisis le format qui te correspond</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
      <!-- Coaching individuel -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="currentColor"/>
            <path d="M6 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor"/>
          </svg>
        </span>
        <h5 class="mt-6 text-xl md:text-2xl font-bold text-gray-700 mb-3">Coaching individuel</h5>
        <p class="text-sm md:text-base leading-relaxed text-gray-700 text-center">
          Un accompagnement <span class="font-semibold text-yellow-600">100% flexible et sur-mesure</span>, entièrement adapté à ton rythme et à ton quotidien.<br>
          Séances en visio avec un suivi personnalisé et bienveillant.
        </p>
      </div>

      <!-- Séances en groupe réduit -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="9" cy="7" r="3" stroke="currentColor"/>
            <circle cx="15" cy="7" r="3" stroke="currentColor"/>
            <path d="M3 18c0-2 2.5-3.5 6-3.5s6 1.5 6 3.5" stroke="currentColor"/>
            <path d="M15 18c0-2 2.5-3.5 6-3.5s6 1.5 6 3.5" stroke="currentColor"/>
          </svg>
        </span>
        <h5 class="mt-6 text-xl md:text-2xl font-bold text-gray-700 mb-3">Séances en groupe réduit</h5>
        <p class="text-sm md:text-base leading-relaxed text-gray-700 text-center">
          Des séances <span class="font-semibold text-yellow-600">en visio en petit comité (max 5 personnes)</span> pour un accompagnement personnalisé et convivial.<br>
          Bouge avec d'autres, progresse dans la bonne humeur et le respect de ton rythme.
        </p>
      </div>
    </div>

    <!-- Call to action -->
    <div class="text-center mt-16">
      <a href="https://calendly.com/lilacoach/bilanpersonnalise" target="_blank" class="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg py-4 px-10 rounded-full transition transform hover:scale-105 shadow-xl shadow-yellow-200/50">
        Prendre rendez-vous
      </a>
      <p class="text-gray-600 mt-4 text-sm">Premier bilan personnalisé offert</p>
    </div>
  </div>
</section>





<section id="contact" class="py-24 sm:py-40 bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 text-white animate-fade-up">
  <div class="max-w-3xl mx-auto px-6 md:text-center">
    <h3 class="text-4xl md:text-5xl font-extrabold mb-8 font-tuffy tracking-tighter text-white drop-shadow">
      Me contacter
    </h3>
    <p class="text-md md:text-xl mb-10 text-gray-100 md:w-[500px] mx-auto">
      Envie d'en savoir plus ou de discuter de tes besoins ?
      <span class="text-yellow-400 text-base">Écris-moi, je te répondrai avec plaisir !</span>
    </p>
    <form 
      action="https://formspree.io/f/movwedpw" 
      method="POST"
      class="grid gap-6 mt-8 text-left"
    >
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-semibold text-white">Nom</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="Ton nom" 
          class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" 
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-semibold text-white">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Ton email" 
          class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" 
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm font-semibold text-white">Message</label>
        <textarea 
          id="message" 
          name="message" 
          placeholder="Écris ton message ici" 
          rows="5" 
          class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          required
        ></textarea>
      </div>
      <button 
        type="submit" 
        class="mt-2 bg-white hover:bg-yellow-500 active:bg-yellow-600 text-gray-800  text-base py-4 w-full sm:w-[220px] mx-auto rounded-full shadow-lg shadow-yellow-200/40 transition"
      >
        Envoyer
      </button>
    </form>

  </div>
</section>



<footer class="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center text-sm shadow-inner">
  <div class="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2">
    <span class="tracking-wide">© 2025 Lila Chibane — Tous droits réservés.</span>
    <a href="#header" class="text-yellow-400 hover:underline text-xs mt-1 nav-link">Retour en haut</a>
  </div>
</footer>

</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease-out forwards;
}
.animate-fade-down {
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeDown 1s ease-out forwards;
}
.animate-delay-200 {
  animation-delay: 0.2s;
}
.animate-delay-400 {
  animation-delay: 0.4s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-primary {
  @apply bg-white hover:bg-gray-200 text-black text-xs font-semibold py-3 px-6 rounded-full transition transform hover:scale-105 hover:shadow-lg;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
