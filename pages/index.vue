<script scritpt setup>

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 400;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
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
      <h1 class="text-md md:text-2xl animate-fade-down">Lila Chibane</h1>
      <nav class="flex gap-2 sm:gap-6 text-[8px] md:text-sm tracking-widest">
        <a href="#about" class="nav-link hover:text-yellow-400 transition">À propos</a>
        <a href="#services" class="nav-link hover:text-yellow-400 transition">L'Accompagnement</a>
        <NuxtLink to="/blog" class="nav-link hover:text-yellow-400 transition">Blog</NuxtLink>
        <a href="#contact" class="nav-link hover:text-yellow-400 transition">Contact</a>
      </nav>
    </header>

<div class="relative h-full bg-black bg-opacity-50">
  <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-3xl mx-auto">
    <h2 class="text-4xl md:text-8xl font-extrabold mb-8 animate-fade-up font-tuffy">
      Coach sportive
    </h2>
    <p class="text-md md:text-md font-tuffy mb-8 animate-fade-up animate-delay-400">
      J'aide les télétravailleuses à retrouver la forme en restant chez elles<br>
      Reconnexion corps et mental
    </p>
    <a href="#about" class="btn-primary animate-fade-up animate-delay-400 nav-link">Je découvre</a>
    <div class="mt-12 animate-bounce">
      <a href="#about" class="text-white text-3xl nav-link">↓</a>
    </div>
  </div>
</div>

  </section>

  <section id="about" class="py-20 md:py-64 bg-white text-gray-800 animate-fade-up">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <img src="/lila-portrait.png" alt="Portrait de Lila Chibane">
      </div>
      <div>
        <h3 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-tuffy tracking-tighter">Je m'appelle Lila,</h3>
        <p class="text-md md:text-lg leading-relaxed mb-6 text-gray-600">
          Je suis passionnée par le mouvement, le bien-être corporel et la confiance en soi. Mon approche est simple : te guider pour que tu te reconnectes à ton corps et que tu oses t'exprimer pleinement.
        </p>
        <p class="text-md md:text-lg leading-relaxed text-gray-600">
          Que ce soit en ligne ou en présentiel, je t'accompagne avec une méthode personnalisée, bienveillante et axée sur ton évolution.
        </p>
      </div>
    </div>
  </section>

<section id="services" class="py-24 sm:py-32 bg-gradient-to-b from-yellow-50 via-white to-white text-gray-700">
  <div class="max-w-5xl mx-auto px-4 md:text-center">
    <h3 class="text-4xl text-center md:text-5xl mb-20 font-tuffy tracking-tighter">
      L'accompagnement
    </h3>
    <div class="grid md:grid-cols-3 gap-20 lg:gap-8">
      <!-- Coaching en ligne -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" />
            <path d="M8 20h8" stroke="currentColor" stroke-linecap="round"/>
          </svg>
        </span>
        <h4 class="mt-6 text-2xl text-gray-600 mb-3">Coaching en ligne</h4>
        <p class="text-sm leading-relaxed text-left text-gray-700">
          Un accompagnement <span class="font-semibold text-yellow-600">100% flexible</span>, adapté à ton rythme et à ton quotidien.
          Bouge où tu veux, quand tu veux, avec un suivi personnalisé et bienveillant.
        </p>
      </div>

      <!-- Séances en présentiel -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z" stroke="currentColor"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor"/>
          </svg>
        </span>
        <h4 class="mt-6 text-2xl text-gray-600 mb-3">Séances en présentiel</h4>
        <p class="text-sm text-left leading-relaxed text-gray-700">
          Retrouvons-nous <span class="font-semibold text-yellow-600">à Paris</span> pour des séances sur mesure, pensées pour progresser en toute confiance et dans le respect de ton corps.<br>
          Un moment privilégié pour toi, dans la bonne humeur.
        </p>
      </div>

      <!-- Méthode Anima -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" stroke="currentColor"/>
          </svg>
        </span>
        <h4 class="mt-6 text-2xl text-gray-600 mb-3">Méthode Anima™</h4>
        <p class="text-sm text-left leading-relaxed text-gray-700">
          Une méthode unique qui reconnecte ton corps et ton esprit.<br>
          Retrouve ton énergie intérieure et épanouis-toi pleinement grâce à un accompagnement global et innovant.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-40 from-yellow-50 to-white">
  <div class="max-w-4xl mx-auto md:text-center px-6">
    <h4 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
      Trouve ton équilibre. Reprends le pouvoir sur ton bien-être.
    </h4>
    <p class="text-lg text-gray-700">
      <span class="font-semibold text-yellow-600">Bienveillance, énergie, et résultats :</span> une approche sur-mesure pour t’aider à progresser, à ton rythme, et sans pression.
    </p>
  </div>
</section>



<section id="offers" class="py-24 md:py-40 bg-gradient-to-b from-white via-yellow-50 to-gray-100 text-gray-900">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h3 class="text-4xl md:text-5xl font-extrabold mb-16 font-tuffy tracking-tighter">
      Mes offres
    </h3>
    <div class="grid md:grid-cols-3 gap-20 lg:gap-10">
      <!-- Offre 1 -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <!-- Person Icon -->
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="currentColor"/>
            <path d="M6 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor"/>
          </svg>
        </span>
        <h4 class="mt-6 text-xl font-bold mb-1">Coaching individuel</h4>
        <p class="text-gray-600 mb-4">En présentiel à Paris</p>
        <div class="text-4xl font-extrabold text-yellow-500 mb-3 tracking-tight">80&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-8 space-y-1">
          <li>Séance personnalisée</li>
          <li>En salle ou en extérieur</li>
          <li>Suivi adapté à tes besoins</li>
        </ul>
        <a href="https://calendly.com/lilacoach/call?back=1" target="_blank" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-1 shadow-lg shadow-yellow-100/40">Prendre RDV</a>
      </div>
      <!-- Offre 2 -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <!-- Laptop Icon -->
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor"/>
            <path d="M8 20h8" stroke="currentColor" stroke-linecap="round"/>
          </svg>
        </span>
        <h4 class="mt-6 text-xl font-bold mb-1">Coaching individuel</h4>
        <p class="text-gray-600 mb-4">En visio</p>
        <div class="text-4xl font-extrabold text-yellow-500 mb-3 tracking-tight">70&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-8 space-y-1">
          <li>Séance à distance</li>
          <li>Flexibilité horaire</li>
          <li>Accompagnement personnalisé</li>
        </ul>
        <a href="https://calendly.com/lilacoach/call?back=1" target="_blank" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-1 shadow-lg shadow-yellow-100/40">Prendre RDV</a>
      </div>
      <!-- Offre 3 -->
      <div class="group relative bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl border border-yellow-100">
        <span class="absolute left-1/2 -top-8 -translate-x-1/2 bg-yellow-400/80 rounded-full p-4 shadow-md group-hover:scale-105 transition">
          <!-- Star/Medal Icon -->
          <svg class="lg:w-10 lg:h-10 w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="10" r="6" stroke="currentColor"/>
            <path d="M12 16v4M10 20h4" stroke="currentColor" stroke-linecap="round"/>
          </svg>
        </span>
        <h4 class="mt-6 text-xl font-bold mb-1">Accompagnement global</h4>
        <p class="text-gray-600 mb-4">Sur 3 mois (100% live)</p>
        <div class="text-4xl font-extrabold text-yellow-500 mb-3 tracking-tight">1500&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-8 space-y-1">
          <li>Programme complet sur 3 mois</li>
          <li>Séances en direct chaque semaine</li>
          <li>Suivi & soutien continu</li>
        </ul>
        <a href="#contact" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-1 shadow-lg shadow-yellow-100/40">Me contacter</a>
      </div>
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
    <form class="grid gap-6 mt-8 text-left">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-semibold text-white">Nom</label>
        <input id="name" type="text" placeholder="Ton nom" class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-semibold text-white">Email</label>
        <input id="email" type="email" placeholder="Ton email" class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm font-semibold text-white">Message</label>
        <textarea id="message" placeholder="Écris ton message ici" rows="5" class="border border-yellow-700 bg-gray-900/80 text-white p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"></textarea>
      </div>
      <button type="submit" class="mt-2 bg-white hover:bg-yellow-500 active:bg-yellow-600 text-gray-800  text-base py-4 w-full sm:w-[220px] mx-auto rounded-full shadow-lg shadow-yellow-200/40 transition">
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
</style>
