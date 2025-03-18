<template>
  <AuthLayout>
    <div class="w-full max-w-4xl px-4 sm:px-6">
      <FormCard padding="6" className="w-full backdrop-blur-xl">
        <h2
          class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6"
        >
          Créer un compte
        </h2>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div
            v-if="error"
            class="text-red-500 text-sm text-center bg-red-900/20 p-3 rounded-md border-l-4 border-red-500 animate-pulse"
          >
            {{ error }}
          </div>

          <!-- Grille responsive à deux colonnes pour les champs du formulaire -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Prénom -->
            <div class="relative">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Prénom</label
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
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  v-model="firstName"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre prénom..."
                />
              </div>
            </div>

            <!-- Nom -->
            <div class="relative">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Nom</label
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
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="name"
                  name="lastName"
                  type="text"
                  required
                  v-model="lastName"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre nom de famille..."
                />
              </div>
            </div>

            <!-- Email -->
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
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre email..."
                />
              </div>
            </div>

            <!-- Mot de passe -->
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
                  autocomplete="new-password"
                  required
                  v-model="password"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre mot de passe..."
                />
              </div>
            </div>

            <!-- Nom d'utilisateur -->
            <div class="relative">
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Nom d'utilisateur (optionnel)</label
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
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  v-model="username"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre nom d'utilisateur..."
                />
              </div>
            </div>

            <!-- Téléphone -->
            <div class="relative">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Téléphone (optionnel)</label
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
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  v-model="phone"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre numéro de téléphone..."
                />
              </div>
            </div>

            <!-- Date de naissance -->
            <div class="relative">
              <label
                for="birthDate"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Date de naissance (optionnel)</label
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
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  v-model="birthDate"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <!-- Description sur toute la largeur -->
          <div class="relative">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Description (optionnel)</label
            >
            <div class="relative group">
              <div
                class="absolute top-3 left-3 flex items-start pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <textarea
                id="description"
                name="description"
                v-model="description"
                rows="2"
                class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Courte description à propos de vous..."
              ></textarea>
            </div>
          </div>

          <!-- Acceptation des conditions -->
          <div class="flex items-center">
            <div class="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                v-model="acceptTerms"
                class="h-4 w-4 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 rounded text-primary focus:ring-primary transition-colors duration-200"
              />
              <label
                for="terms"
                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                J'accepte les conditions d'utilisation
              </label>
            </div>
          </div>

          <!-- Bouton de soumission -->
          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 relative overflow-hidden"
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
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Créer un compte
              </span>
              <span
                class="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark opacity-0 hover:opacity-50 transition-opacity duration-300"
              ></span>
            </button>
          </div>

          <!-- Lien de connexion -->
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Vous avez déjà un compte ?
              <router-link
                to="/login"
                class="text-primary hover:text-primary-dark transition-colors duration-200 font-medium"
                >Se connecter</router-link
              >
            </p>
          </div>
        </form>
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

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const phone = ref("");
const birthDate = ref("");
const description = ref("");
const email = ref("");
const password = ref("");
const acceptTerms = ref(false);
const localError = ref("");

// Utiliser les valeurs du store
const isLoading = computed(() => authStore.isLoading);
const storeError = computed(() => authStore.error);

const isFormValid = computed(() => {
  return (
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value.length >= 8 &&
    acceptTerms.value
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) {
    localError.value = "Veuillez remplir correctement tous les champs.";
    return;
  }

  try {
    // Réinitialiser les erreurs
    localError.value = "";
    authStore.setError(null);

    // Appeler la fonction register du store avec les données du formulaire
    const success = await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      username: username.value || undefined,
      phone: phone.value || undefined,
      birthDate: birthDate.value || undefined,
      description: description.value || undefined,
    });

    if (success) {
      // Rediriger vers la page de connexion après inscription réussie
      router.push("/login");
    }
  } catch (err) {
    localError.value = "Échec de l'inscription. Veuillez réessayer.";
    console.error("Erreur d'inscription:", err);
  }
};

// Computed pour afficher soit l'erreur locale, soit l'erreur du store
const error = computed(() => localError.value || storeError.value);
</script>

<style scoped>
/* Animation pour les champs du formulaire */
form > div,
.grid > div {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

/* Animations séquentielles pour la grille */
.grid > div:nth-child(1) {
  animation-delay: 0.1s;
}
.grid > div:nth-child(2) {
  animation-delay: 0.15s;
}
.grid > div:nth-child(3) {
  animation-delay: 0.2s;
}
.grid > div:nth-child(4) {
  animation-delay: 0.25s;
}
.grid > div:nth-child(5) {
  animation-delay: 0.3s;
}
.grid > div:nth-child(6) {
  animation-delay: 0.35s;
}
.grid > div:nth-child(7) {
  animation-delay: 0.4s;
}
.grid > div:nth-child(8) {
  animation-delay: 0.45s;
}

/* Animations pour les éléments hors de la grille */
form > div:nth-child(1) {
  animation-delay: 0.05s;
}
form > div:nth-child(3) {
  animation-delay: 0.5s;
}
form > div:nth-child(4) {
  animation-delay: 0.55s;
}
form > div:nth-child(5) {
  animation-delay: 0.6s;
}
form > div:nth-child(6) {
  animation-delay: 0.65s;
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

/* Animation pour le bouton */
button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

button:not(:disabled):active {
  transform: translateY(0);
}
</style>
