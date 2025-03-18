<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    aria-label="Basculer le thème"
  >
    <!-- Icône soleil pour le mode sombre -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Icône lune pour le mode clair -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// État du thème
const isDark = ref(false);

// Fonction pour basculer le thème
function toggleTheme() {
  isDark.value = !isDark.value;
  updateTheme();
}

// Fonction pour mettre à jour le thème dans le DOM
function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Initialisation du thème au chargement du composant
onMounted(() => {
  // Vérifier les préférences de l'utilisateur
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Définir le thème initial
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    isDark.value = true;
  } else {
    isDark.value = false;
  }

  // Appliquer le thème
  updateTheme();

  // Écouter les changements de préférences système
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        isDark.value = e.matches;
        updateTheme();
      }
    });
});
</script>

<style scoped>
button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 10%,
    transparent 10.01%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition:
    transform 0.3s,
    opacity 0.5s;
}

button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
</style>
