<template>
  <div class="auth-layout h-screen overflow-hidden flex">
    <!-- Colonne gauche avec image -->
    <div class="hidden md:block w-1/2 relative">
      <img
        src="../assets/auth-background.svg"
        alt="Image d'authentification"
        class="absolute inset-0 w-full h-full object-cover"
        onerror="this.src='https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'; this.onerror=null;"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary-dark/30 backdrop-blur-sm"
      ></div>
    </div>

    <!-- Colonne droite avec header et formulaire -->
    <div class="w-full md:w-1/2 flex flex-col bg-white dark:bg-gray-900">
      <!-- Header -->
      <header
        class="py-4 px-8 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
      >
        <router-link
          to="/"
          class="text-xl font-bold text-primary dark:text-primary-light"
        >
          🏠 HomeDashboard
        </router-link>

        <div class="flex items-center space-x-4">
          <ThemeToggle />

          <Button
            variant="gradient"
            size="sm"
            @click="
              $router.push(
                $route.path.includes('login') ? '/register' : '/login'
              )
            "
            class="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark transition-colors duration-300"
          >
            {{ $route.path.includes("login") ? "S'inscrire" : "Se connecter" }}
          </Button>
        </div>
      </header>

      <!-- Contenu principal -->
      <main
        class="flex-grow flex items-center justify-center p-6 overflow-y-auto"
      >
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../components/Button.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
</script>

<style scoped>
.auth-layout {
  height: 100vh;
  max-height: 100vh;
}

/* Animation d'entrée pour le layout */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.auth-layout {
  animation: fadeIn 0.5s ease-out;
}
</style>
