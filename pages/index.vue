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
    <section class="relative h-screen bg-cover bg-center scroll-smooth" style="background-image: url('/header.jpg');">
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
          Remise en forme post-burn-out et trouble psy | Reconnexion corps et mental
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
        <p class="text-lg leading-relaxed mb-6 text-gray-600">
          Je suis passionnée par le mouvement, le bien-être corporel et la confiance en soi. Mon approche est simple : te guider pour que tu te reconnectes à ton corps et que tu oses t'exprimer pleinement.
        </p>
        <p class="text-lg leading-relaxed text-gray-600">
          Que ce soit en ligne ou en présentiel, je t'accompagne avec une méthode personnalisée, bienveillante et axée sur ton évolution.
        </p>
      </div>
    </div>
  </section>

  <section id="services" class="py-40 sm:py-50 bg-gray-100 text-gray-800 animate-fade-up">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <h3 class="text-3xl md:text-4xl font-bold mb-40 text-gray-900 font-tuffy tracking-tighter">
      L'accompagnement
    </h3>
    <div class="grid gap-16">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2 flex flex-col items-start">
          <div class="mb-4">
            <svg class="w-10 h-10 text-yellow-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" />
              <path d="M8 20h8" stroke="currentColor" stroke-linecap="round"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-2">Coaching en ligne</h4>
          <p class="text-lg leading-relaxed text-left">
            Un accompagnement 100% flexible, adapté à ton rythme et à ton quotidien.<br>
            Bouge où tu veux, quand tu veux, avec un suivi personnalisé et bienveillant.
          </p>
        </div>
        <div class="w-full md:w-1/2">
          <img src="/visio.jpg" alt="Coaching en ligne" class="rounded-lg shadow-md w-full object-cover h-64">
        </div>
      </div>

      <div class="flex flex-col md:flex-row-reverse items-center gap-8">
        <div class="md:w-1/2 flex flex-col items-start">
          <div class="mb-4">
            <svg class="w-10 h-10 text-yellow-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z" stroke="currentColor"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-2">Séances en présentiel</h4>
          <p class="text-lg leading-relaxed text-left">
            Retrouvons-nous à Paris pour des séances sur mesure, pensées pour progresser en toute confiance et dans le respect de ton corps.<br>
            Un moment privilégié pour toi, dans la bonne humeur.
          </p>
        </div>
        <div class="w-full md:w-1/2">
          <img src="/home.jpg" alt="Coaching en présentiel" class="rounded-lg shadow-md w-full object-cover h-64">
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2 flex flex-col items-start">
          <div class="mb-4">
            <svg class="w-10 h-10 text-yellow-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" stroke="currentColor"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-2">Méthode Anima™</h4>
          <p class="text-lg leading-relaxed text-left">
            Une méthode unique qui reconnecte ton corps et ton esprit.<br>
            Retrouve ton énergie intérieure et épanouis-toi pleinement grâce à un accompagnement global et innovant.
          </p>
        </div>
        <div class="w-full md:w-1/2">
          <img src="/header.jpg" alt="Méthode Anima" class="rounded-lg shadow-md w-full object-cover h-64">
        </div>
      </div>
    </div>
  </div>
</section>

  <section id="offers" class="py-20 md:py-64 text-gray-800 animate-fade-up">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <h3 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900 font-tuffy tracking-tighter">Mes offres</h3>
    <div class="grid md:grid-cols-3 gap-10">
      <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h4 class="text-xl font-bold mb-2">Coaching individuel</h4>
        <p class="text-gray-600 mb-4">En présentiel à Paris</p>
        <div class="text-3xl font-extrabold text-yellow-500 mb-4">80&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-6">
          <li>Séance personnalisée</li>
          <li>En salle ou en extérieur</li>
          <li>Suivi adapté à tes besoins</li>
        </ul>
        <a href="https://calendly.com/lilacoach/call?back=1" target="_blank" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-2">Prendre RDV</a>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h4 class="text-xl font-bold mb-2">Coaching individuel</h4>
        <p class="text-gray-600 mb-4">En visio</p>
        <div class="text-3xl font-extrabold text-yellow-500 mb-4">70&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-6">
          <li>Séance à distance</li>
          <li>Flexibilité horaire</li>
          <li>Accompagnement personnalisé</li>
        </ul>
        <a href="https://calendly.com/lilacoach/call?back=1" target="_blank" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-2">Prendre RDV</a>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h4 class="text-xl font-bold mb-2">Accompagnement global</h4>
        <p class="text-gray-600 mb-4">Sur 3 mois (100% live)</p>
        <div class="text-3xl font-extrabold text-yellow-500 mb-4">1500&nbsp;€</div>
        <ul class="text-gray-500 text-sm mb-6">
          <li>Programme complet sur 3 mois</li>
          <li>Séances en direct chaque semaine</li>
          <li>Suivi & soutien continu</li>
        </ul>
          <a href="#contact" class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition mb-2">Me contacter</a>
      </div>
    </div>
  </div>
</section>

  <section id="contact" class="py-24 sm:py-40 bg-orange-100 text-gray-800 animate-fade-up">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h3 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900 font-tuffy tracking-tighter">Me contacter</h3>
      <p class="text-lg mb-8">
        Tu veux réserver une séance, poser une question ou tout simplement échanger ?<br>
        Écris-moi, je serai ravie de te répondre.
      </p>
      <form class="grid gap-6 mt-8">
        <input type="text" placeholder="Nom" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400">
        <input type="email" placeholder="Email" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400">
        <textarea placeholder="Votre message" rows="5" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400"></textarea>
        <button type="submit" class="bg-yellow-400 hover:bg-yellow-700 text-black text-xs py-4 w-full sm:w-[200px] mx-auto rounded-full">Envoyer</button>
      </form>
    </div>
  </section>

  <footer class="py-8 bg-gray-800 text-white text-center text-sm">
    <div class="max-w-6xl mx-auto px-6">
      © 2025 Lila Chibane — Tous droits réservés.
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
