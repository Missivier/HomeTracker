<template>
  <DashboardLayout>
    <div
      class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <!-- En-tête -->
      <header
        class="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gradient">HomeDashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
              <ThemeToggle />
              <div class="relative">
                <button
                  @click="isProfileMenuOpen = !isProfileMenuOpen"
                  class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  <div
                    class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold"
                  >
                    {{ user?.name?.charAt(0) || "U" }}
                  </div>
                  <span>{{ user?.name || "Utilisateur" }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <!-- Menu déroulant du profil -->
                <div
                  v-if="isProfileMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profil
                  </a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Paramètres
                  </a>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu principal -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Bonjour, {{ user?.name || "Utilisateur" }} 👋
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Bienvenue sur votre tableau de bord HomeDashboard. Voici un aperçu
            de votre maison.
          </p>
        </div>

        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
          >
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-primary/20 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Consommation d'énergie
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  12.4 kWh
                </p>
                <p class="text-sm text-green-600 dark:text-green-400">
                  -8% par rapport à hier
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
          >
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-primary/20 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Température moyenne
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  22.5°C
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Stable depuis 2h
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
          >
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-primary/20 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Appareils actifs
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  8 / 12
                </p>
                <p class="text-sm text-blue-600 dark:text-blue-400">
                  4 appareils en veille
                </p>
              </div>
            </div>
          </Card>
        </div>

        <!-- Appareils -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Appareils récents
            </h3>
            <Button variant="outline" size="sm">
              Voir tous les appareils
            </Button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="(device, index) in devices" :key="index">
              <div class="flex justify-between items-start">
                <div class="flex items-center">
                  <div class="p-3 rounded-full bg-primary/10 mr-4">
                    <component :is="device.icon" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      {{ device.name }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ device.location }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center">
                  <span
                    :class="[
                      'inline-block w-3 h-3 rounded-full mr-2',
                      device.isActive ? 'bg-green-500' : 'bg-gray-400',
                    ]"
                  ></span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ device.isActive ? "Actif" : "Inactif" }}
                  </span>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ device.status }}
                  </span>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="device.isActive"
                      class="sr-only peer"
                      @change="toggleDevice(index)"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                    ></div>
                  </label>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Scénarios -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Scénarios rapides
            </h3>
            <Button variant="outline" size="sm"> Gérer les scénarios </Button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              v-for="(scenario, index) in scenarios"
              :key="index"
              class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-800/20 transition-all duration-200 border border-gray-200 dark:border-gray-700 text-left"
            >
              <div class="flex items-center mb-2">
                <div class="p-2 rounded-full bg-primary/10 mr-3">
                  <component :is="scenario.icon" class="h-5 w-5 text-primary" />
                </div>
                <h4 class="font-medium text-gray-900 dark:text-white">
                  {{ scenario.name }}
                </h4>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ scenario.description }}
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isProfileMenuOpen = ref(false);
const user = ref(authStore.user);

// Fonction de déconnexion
function logout() {
  authStore.logout();
  router.push("/login");
}

// Données pour les appareils
const devices = ref([
  {
    name: "Thermostat salon",
    location: "Salon",
    isActive: true,
    status: "Température: 22°C",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      `,
    },
  },
  {
    name: "Lumière cuisine",
    location: "Cuisine",
    isActive: true,
    status: "Luminosité: 80%",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      `,
    },
  },
  {
    name: "Caméra entrée",
    location: "Entrée",
    isActive: false,
    status: "Dernière activité: 14:30",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `,
    },
  },
  {
    name: "Enceinte salon",
    location: "Salon",
    isActive: true,
    status: "En lecture: Playlist Jazz",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.072m-2.829 9.9a9 9 0 010-12.728" />
        </svg>
      `,
    },
  },
  {
    name: "Volets chambre",
    location: "Chambre",
    isActive: false,
    status: "Fermés à 80%",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      `,
    },
  },
  {
    name: "Climatisation",
    location: "Général",
    isActive: true,
    status: "Mode: Automatique",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      `,
    },
  },
]);

// Données pour les scénarios
const scenarios = ref([
  {
    name: "Mode Nuit",
    description: "Éteint toutes les lumières et active l'alarme",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `,
    },
  },
  {
    name: "Je pars",
    description: "Ferme les volets, éteint les appareils et active l'alarme",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      `,
    },
  },
  {
    name: "Je rentre",
    description: "Allume les lumières et règle la température",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      `,
    },
  },
  {
    name: "Mode Cinéma",
    description: "Tamise les lumières et prépare le système audio",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      `,
    },
  },
]);

// Fonction pour basculer l'état d'un appareil
function toggleDevice(index: number) {
  devices.value[index].isActive = !devices.value[index].isActive;
}

// Initialisation
onMounted(() => {
  // Vérifier si l'utilisateur est authentifié
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }

  // Fermer le menu du profil lors d'un clic à l'extérieur
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (isProfileMenuOpen.value && !target.closest(".relative")) {
      isProfileMenuOpen.value = false;
    }
  });
});
</script>
