<template>
  <div
    class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- En-tête -->
    <header class="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gradient">HomeDashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <ThemeToggle />
            <div class="flex space-x-4">
              <Button variant="gradient" @click="$router.push('/login')">
                Se connecter
              </Button>
              <Button variant="gradient" @click="$router.push('/register')">
                Créer un compte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Aperçu du Dashboard -->
    <section class="py-12 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Votre tableau de bord personnel
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Un espace unique pour organiser votre quotidien et gérer tous les
            aspects de votre vie personnelle.
          </p>
        </div>

        <div
          class="relative rounded-xl overflow-hidden shadow-xl dark:shadow-gray-800/30 mb-16"
        >
          <img
            src="@/assets/auth-background.svg"
            alt="Aperçu du Dashboard"
            class="w-full h-auto rounded-xl"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm"
          ></div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités -->
    <section
      class="py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Fonctionnalités disponibles
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les outils qui vous aideront à mieux organiser votre
            quotidien.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="(feature, index) in features"
            :key="index"
            className="h-full"
          >
            <template #header>
              <div class="flex items-center mb-4">
                <div
                  class="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mr-4"
                >
                  <component :is="feature.icon" class="h-6 w-6 text-primary" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ feature.title }}
                </h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </Card>
        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section class="py-12 bg-primary/10 dark:bg-primary/5">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Prêt à essayer HomeDashboard ?
        </h2>
        <div
          class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            variant="gradient"
            size="lg"
            @click="$router.push('/register')"
          >
            Créer un compte
          </Button>
          <Button variant="gradient" size="lg" @click="$router.push('/login')">
            Se connecter
          </Button>
        </div>
      </div>
    </section>

    <!-- Pied de page -->
    <footer
      class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-base text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} HomeDashboard. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

// Données pour les fonctionnalités
const features = [
  {
    title: "Gestion de calendrier",
    description:
      "Organisez vos rendez-vous, événements et rappels dans un calendrier intuitif et synchronisé.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      `,
    },
  },
  {
    title: "To-Do List",
    description:
      "Créez et gérez vos tâches quotidiennes avec des listes personnalisables et des rappels.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      `,
    },
  },
  {
    title: "Animaux de compagnie",
    description:
      "Suivez les soins, l'alimentation et les rendez-vous vétérinaires de vos animaux de compagnie.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      `,
    },
  },
  {
    title: "Notes et documents",
    description:
      "Stockez et organisez vos notes, documents importants et informations personnelles.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      `,
    },
  },
  {
    title: "Suivi des dépenses",
    description:
      "Gérez votre budget et suivez vos dépenses avec des graphiques et des catégories personnalisables.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
  },
  {
    title: "Rappels médicaux",
    description:
      "Suivez vos rendez-vous médicaux, médicaments et informations de santé importantes.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      `,
    },
  },
  {
    title: "Inventaire maison",
    description:
      "Gardez une trace de vos biens, garanties et dates d'achat pour une meilleure organisation.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      `,
    },
  },
  {
    title: "Objectifs personnels",
    description:
      "Définissez et suivez vos objectifs personnels avec des indicateurs de progression visuels.",
    icon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      `,
    },
  },
];
</script>
