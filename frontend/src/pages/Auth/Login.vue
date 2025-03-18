<template>
  <AuthLayout>
    <div class="w-full max-w-md px-6">
      <FormCard padding="6" className="w-full backdrop-blur-xl">
        <h2
          class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6"
        >
          Connexion
        </h2>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div
            v-if="error"
            class="text-red-500 text-sm text-center bg-red-900/20 p-3 rounded-md border-l-4 border-red-500 animate-pulse"
          >
            {{ error }}
          </div>

          <div class="relative">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Email</label
            >
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="w-full pl-10 px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Votre email"
              />
            </div>
          </div>

          <div class="relative">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Mot de passe</label
            >
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="password"
                class="w-full pl-10 px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Votre mot de passe..."
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="relative">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  v-model="rememberMe"
                  class="h-0 w-0 opacity-0 absolute"
                />
                <label
                  for="remember-me"
                  class="flex items-center cursor-pointer"
                >
                  <span
                    class="relative inline-block w-5 h-5 mr-2 rounded border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 transition-all duration-300"
                  >
                    <span
                      class="absolute inset-0 flex items-center justify-center transform scale-0 transition-transform duration-300"
                      :class="{ 'scale-100': rememberMe }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5 text-primary dark:text-primary-light"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    Se souvenir de moi
                  </span>
                </label>
              </div>
            </div>
            <div class="text-sm">
              <a
                href="#"
                class="text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 relative overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <span v-if="isLoading" class="mr-2">
                  <svg
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                <span v-else class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Se connecter
              </span>
              <span
                class="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark opacity-0 hover:opacity-50 transition-opacity duration-300"
              ></span>
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Vous n'avez pas de compte ?
            <router-link
              to="/register"
              class="text-primary hover:text-primary-dark transition-colors duration-200 font-medium"
              >Créer un compte</router-link
            >
          </p>
        </div>
      </FormCard>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import FormCard from "../../components/FormCard.vue";
import AuthLayout from "../../layouts/AuthLayout.vue";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

// Utiliser les valeurs du store
const isLoading = computed(() => authStore.isLoading);
const error = computed(() => authStore.error);

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);

  if (success) {
    // Rediriger vers le tableau de bord après connexion réussie
    router.push("/dashboard");
  }
};
</script>

<style scoped>
/* Animation d'entrée pour le formulaire */
form {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation pour les champs du formulaire */
form > div {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

form > div:nth-child(1) {
  animation-delay: 0.1s;
}
form > div:nth-child(2) {
  animation-delay: 0.2s;
}
form > div:nth-child(3) {
  animation-delay: 0.3s;
}
form > div:nth-child(4) {
  animation-delay: 0.4s;
}
form > div:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation pour les icônes des inputs */
.group svg {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.group:focus-within svg {
  color: var(--color-primary);
  transform: scale(1.2) rotate(-5deg);
  filter: drop-shadow(0 0 3px rgba(var(--color-primary-rgb), 0.5));
}

.group:hover svg:not(.group:focus-within svg) {
  transform: translateY(-2px);
  color: var(--color-primary-light);
}

/* Animation pour le checkbox */
input[type="checkbox"]:checked + label span {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

input[type="checkbox"]:focus + label span {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.3);
}

input[type="checkbox"] + label:hover span {
  border-color: var(--color-primary);
}

/* Animation pour le bouton */
button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

button:not(:disabled):active {
  transform: translateY(0);
}
</style>
