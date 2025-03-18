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
            Créer un compte
          </h2>

          <form class="space-y-4" @submit.prevent="handleRegister">
            <!-- Prénom -->
            <div class="relative">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Prénom <span class="text-red-500">*</span></label
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
                >Nom <span class="text-red-500">*</span></label
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
                  autocomplete="new-password"
                  required
                  v-model="password"
                  class="w-full pl-10 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Votre mot de passe..."
                />
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
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
                  <span class="text-red-500">*</span>
                </label>
              </div>
            </div>

            <!-- Bouton de soumission -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 relative overflow-hidden cursor-pointer"
              :class="{ 'cursor-not-allowed': isLoading || !isFormValid }"
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

            <p
              class="mt-2 text-xs text-center text-gray-500 dark:text-gray-400"
            >
              <span class="text-red-500">*</span> Champs obligatoires
            </p>

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

      <!-- Notifications à droite du formulaire -->
      <div class="hidden md:block md:w-64 lg:w-72 pt-2">
        <!-- Notification d'erreur -->
        <div
          v-if="error"
          class="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md flex items-center max-w-md animate-fadeIn z-50"
          role="alert"
          @click="clearError"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span class="font-medium">Erreur: </span>
            {{ error }}

            <div
              v-if="error.includes('connecter au serveur')"
              class="mt-1 text-sm"
            >
              <p class="font-bold">Solutions possibles:</p>
              <ul class="list-disc pl-5 mt-1">
                <li>Vérifiez que le serveur backend est bien démarré</li>
                <li>
                  Vérifiez que l'URL de l'API est correcte dans le fichier .env
                </li>
                <li>
                  Assurez-vous que le serveur backend accepte les connexions
                  depuis votre frontend
                </li>
              </ul>
            </div>
          </div>
          <button
            @click.stop="clearError"
            class="ml-auto bg-red-200 hover:bg-red-300 rounded-full p-1 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-red-700"
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
          class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center max-w-md animate-fadeIn z-50"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span class="font-medium">Succès: </span>
            {{ successMessage }}
          </div>
          <button
            @click="successMessage = ''"
            class="ml-auto bg-green-200 hover:bg-green-300 rounded-full p-1 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-green-700"
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
        class="md:hidden fixed top-2 right-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded shadow-md flex items-center z-50 max-w-[300px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-red-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="text-sm">
          <span class="font-medium">Erreur: </span>
          {{ error }}
        </div>
        <button
          @click="clearError"
          class="ml-auto bg-red-200 hover:bg-red-300 rounded-full p-1 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-700"
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
        class="md:hidden fixed top-2 right-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded shadow-md flex items-center z-50 max-w-[300px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-green-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="text-sm">
          <span class="font-medium">Succès: </span>
          {{ successMessage }}
        </div>
        <button
          @click="successMessage = ''"
          class="ml-auto bg-green-200 hover:bg-green-300 rounded-full p-1 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-green-700"
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

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const acceptTerms = ref(false);
const localError = ref("");
const successMessage = ref("");

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
  console.log("Début de handleRegister");

  if (!isFormValid.value) {
    console.log("Formulaire invalide:", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value.length >= 8 ? "valide" : "invalide",
      terms: acceptTerms.value,
    });
    localError.value = "Veuillez remplir correctement tous les champs.";
    return;
  }

  console.log("Formulaire valide, préparation de l'envoi");

  try {
    // Réinitialiser les erreurs
    localError.value = "";
    authStore.setError(null);

    // Préparer les données d'inscription
    const registerData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      // Le roleId sera défini par défaut dans le store et le backend
    };

    console.log("Envoi des données d'inscription:", registerData);
    console.log("Appel de authStore.register");

    // Appeler la fonction register du store avec les données du formulaire
    const success = await authStore.register(registerData);
    console.log("Résultat de l'inscription:", success);

    if (success) {
      console.log("Inscription réussie, préparation de la redirection");
      // Afficher un message de succès
      successMessage.value =
        "Compte créé avec succès ! Redirection vers la page de connexion...";

      // Vider le formulaire
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      password.value = "";
      acceptTerms.value = false;

      // Rediriger vers la page de connexion
      setTimeout(() => {
        console.log("Redirection vers /login");
        router.push("/login");
      }, 2000);
    } else {
      console.log("Échec de l'inscription, erreur:", error.value);
      if (!error.value) {
        localError.value =
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }
      console.error("Échec de l'inscription:", error.value);
    }
  } catch (err) {
    console.error("Exception dans handleRegister:", err);
    localError.value = "Échec de l'inscription. Veuillez réessayer.";
    console.error("Erreur d'inscription:", err);
  } finally {
    console.log("Fin de handleRegister");
  }
};

// Computed pour afficher soit l'erreur locale, soit l'erreur du store
const error = computed(() => localError.value || storeError.value);

// Fonction pour effacer les erreurs
const clearError = () => {
  localError.value = "";
  authStore.setError(null);
};
</script>

<style scoped>
/* Animation pour les champs du formulaire */
form > div {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

form > div:nth-child(1) {
  animation-delay: 0.05s;
}
form > div:nth-child(2) {
  animation-delay: 0.1s;
}
form > div:nth-child(3) {
  animation-delay: 0.15s;
}
form > div:nth-child(4) {
  animation-delay: 0.2s;
}
form > div:nth-child(5) {
  animation-delay: 0.25s;
}
form > div:nth-child(6) {
  animation-delay: 0.3s;
}
form > div:nth-child(7) {
  animation-delay: 0.35s;
}
form > button {
  animation: fadeIn 0.4s ease-out 0.4s forwards;
  opacity: 0;
}
form > p {
  animation: fadeIn 0.4s ease-out 0.45s forwards;
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
