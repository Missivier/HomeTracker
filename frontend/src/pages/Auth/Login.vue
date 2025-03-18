<template>
  <AuthLayout>
    <div
      class="w-full max-w-5xl flex items-start justify-center gap-4 px-4 sm:px-6 relative"
    >
      <div class="w-full max-w-md">
        <FormCard padding="6" className="w-full backdrop-blur-xl">
          <h2
            class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6"
          >
            Connexion
          </h2>

          <form class="space-y-4" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="relative">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Email <span class="text-red-500">*</span></label
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

            <!-- Mot de passe -->
            <div class="relative">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Mot de passe <span class="text-red-500">*</span></label
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

            <!-- Se souvenir de moi et mot de passe oublié -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="relative">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    v-model="rememberMe"
                    class="h-4 w-4 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 rounded text-primary focus:ring-primary transition-colors duration-200"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Se souvenir de moi
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

            <!-- Bouton de soumission -->
            <button
              type="submit"
              :disabled="isLoading || !email || !password"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 relative overflow-hidden cursor-pointer"
              :class="{
                'cursor-not-allowed': isLoading || !email || !password,
              }"
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

            <!-- Lien d'inscription -->
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Vous n'avez pas de compte ?
                <router-link
                  to="/register"
                  class="text-primary hover:text-primary-dark transition-colors duration-200 font-medium"
                  >Créer un compte</router-link
                >
              </p>
            </div>
          </form>
        </FormCard>
      </div>

      <!-- Notifications à droite du formulaire -->
      <div class="hidden md:block md:w-64 lg:w-72 pt-2">
        <!-- Notification d'erreur -->
        <div
          v-if="error"
          class="mb-4 text-red-100 text-xs bg-red-600 p-2 rounded-md shadow-md border-l-4 border-red-800 animate-pulse"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm">{{ error }}</span>
          </div>
          <button
            @click="clearError"
            class="absolute top-1 right-1 text-red-100 hover:text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Notification de succès -->
        <div
          v-if="successMessage"
          class="mb-4 text-green-100 text-xs bg-green-600 p-2 rounded-md shadow-md border-l-4 border-green-800 animate-pulse"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm">{{ successMessage }}</span>
          </div>
          <button
            @click="successMessage = ''"
            class="absolute top-1 right-1 text-green-100 hover:text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Notifications pour mobile, plus petites -->
      <div
        v-if="error"
        class="md:hidden fixed top-2 right-2 text-red-100 text-xs bg-red-600 p-2 rounded-md shadow-md border-l-4 border-red-800 animate-pulse z-50 max-w-[250px]"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">{{ error }}</span>
        </div>
        <button
          @click="clearError"
          class="absolute top-1 right-1 text-red-100 hover:text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="successMessage"
        class="md:hidden fixed top-2 right-2 text-green-100 text-xs bg-green-600 p-2 rounded-md shadow-md border-l-4 border-green-800 animate-pulse z-50 max-w-[250px]"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">{{ successMessage }}</span>
        </div>
        <button
          @click="successMessage = ''"
          class="absolute top-1 right-1 text-green-100 hover:text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
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
const successMessage = ref("");

// Utiliser les valeurs du store
const isLoading = computed(() => authStore.isLoading);
const error = computed(() => authStore.error);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return;
  }

  const success = await authStore.login(email.value, password.value);

  if (success) {
    // Afficher un message de succès
    successMessage.value =
      "Connexion réussie ! Vous allez être redirigé vers votre tableau de bord.";

    // Rediriger vers le tableau de bord après un court délai
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }
};

// Fonction pour effacer l'erreur
const clearError = () => {
  authStore.setError(null);
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
form > button {
  animation: fadeIn 0.4s ease-out 0.5s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
input[type="checkbox"]:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

input[type="checkbox"]:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.3);
}

/* Animation pour le bouton */
button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
  cursor: pointer;
}

button:not(:disabled):active {
  transform: translateY(0);
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
