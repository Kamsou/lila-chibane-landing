<template>
    <section class="relative h-screen bg-cover bg-center scroll-smooth" style="background-image: url('/main.jpg');">
    <header
      :class="['fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50 font-tuffy transition-all duration-300 ease-in-out', scrolled ? 'bg-white text-gray-900 shadow' : 'bg-transparent text-white']"
    >
      <h1 class="text-md md:text-2xl animate-fade-down">Lila Chibane</h1>
      <nav class="flex gap-2 sm:gap-6 text-[8px] md:text-sm uppercase tracking-widest">
        <a href="#about" class="nav-link hover:text-yellow-400 transition">À propos</a>
        <a href="#services" class="nav-link hover:text-yellow-400 transition">Accompagnement</a>
        <a href="#contact" class="nav-link hover:text-yellow-400 transition">Me contacter</a>
      </nav>
    </header>

    <div class="relative h-full bg-black bg-opacity-50">
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-6xl font-extrabold mb-2 animate-fade-up font-tuffy">
          Coach sportive et mentale
        </h2>
        <p class="text-sm block mb-6 ">(accompagnement en ligne / en présentiel)</p>
        <p class="text-md md:text-md font-tuffy mb-8 animate-fade-up animate-delay-400">
          Créatrice de la méthode Anima™ : harmoniser mouvement et bien-être.
        </p>
        <a href="#about" class="btn-primary animate-fade-up animate-delay-400 nav-link">Je découvre</a>
        <div class="mt-12 animate-bounce">
          <a href="#about" class="text-white text-3xl nav-link">↓</a>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="py-24 bg-white text-gray-800 animate-fade-up">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <img src="/lila-portrait.png" alt="Portrait de Lila Chibane">
      </div>
      <div>
        <h3 class="text-3xl md:text-4xl font-bold mb-6 text-yellow-700 font-tuffy">À propos de moi</h3>
        <p class="text-lg leading-relaxed mb-6">
          Je suis passionnée par le mouvement, le bien-être corporel et la confiance en soi. Mon approche est simple : te guider pour que tu te reconnectes à ton corps et que tu oses t'exprimer pleinement.
        </p>
        <p class="text-lg leading-relaxed">
          Que ce soit en ligne ou en présentiel, je t'accompagne avec une méthode personnalisée, bienveillante et axée sur ton évolution.
        </p>
      </div>
    </div>
  </section>

    <section id="services" class="py-20 bg-gray-100 text-gray-800 animate-fade-up">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h3 class="text-3xl md:text-4xl font-bold mb-12 text-yellow-700 font-tuffy">Un accompagnement pensé pour toi</h3>
      <div class="grid gap-16">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h4 class="text-2xl font-bold mb-4">Coaching en ligne</h4>
            <p class="text-lg leading-relaxed">
              Un programme 100% flexible, adapté à ton rythme et à ton quotidien. Bouge où tu veux, quand tu veux, avec un suivi personnalisé.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="/main.jpg" alt="Coaching en ligne" class="rounded-lg shadow-md w-full object-cover h-64">
          </div>
        </div>

        <div class="flex flex-col md:flex-row-reverse items-center gap-8">
          <div class="md:w-1/2">
            <h4 class="text-2xl font-bold mb-4">Séances en présentiel</h4>
            <p class="text-lg leading-relaxed">
              Retrouvons-nous pour des séances sur mesure, pensées pour progresser en toute confiance et dans le respect de ton corps.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="/main.jpg" alt="Coaching en présentiel" class="rounded-lg shadow-md w-full object-cover h-64">
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h4 class="text-2xl font-bold mb-4">Méthode Anima™</h4>
            <p class="text-lg leading-relaxed">
              Une méthode unique qui reconnecte ton corps et ton esprit, pour retrouver ton énergie intérieure et t'épanouir pleinement.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="/main.jpg" alt="Méthode Anima" class="rounded-lg shadow-md w-full object-cover h-64">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="py-24 bg-white text-gray-800 animate-fade-up">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h3 class="text-3xl md:text-4xl font-bold mb-12 text-yellow-700 font-tuffy">Me contacter</h3>
      <p class="text-lg mb-8">
        Tu veux réserver une séance, poser une question ou tout simplement échanger ?<br>
        Écris-moi, je serai ravie de te répondre.
      </p>
      <form class="grid gap-6 mt-8">
        <input type="text" placeholder="Nom" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400">
        <input type="email" placeholder="Email" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400">
        <textarea placeholder="Votre message" rows="5" class="border border-gray-300 p-4 rounded focus:ring-2 focus:ring-yellow-400"></textarea>
        <button type="submit" class="btn-primary">Envoyer</button>
      </form>
    </div>
  </section>

  <footer class="py-8 bg-yellow-600 text-gray-800 text-center text-sm">
    <div class="max-w-6xl mx-auto px-6">
      © 2025 Lila Chibane — Tous droits réservés.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
  @apply bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105 hover:shadow-lg;
}
</style>
