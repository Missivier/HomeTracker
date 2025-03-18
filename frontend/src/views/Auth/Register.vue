<template>
  <AuthLayout>
    <FormCard className="register-form">
      <h2 class="form-title">Créer un compte</h2>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input
            id="lastName"
            type="text"
            v-model="formData.lastName"
            required
            placeholder="Votre nom"
          />
        </div>

        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input
            id="firstName"
            type="text"
            v-model="formData.firstName"
            required
            placeholder="Votre prénom"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            required
            placeholder="Votre email"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            required
            placeholder="Votre mot de passe"
          />
        </div>

        <div class="form-check">
          <input id="terms" type="checkbox" v-model="acceptTerms" required />
          <label for="terms"> J'accepte les conditions d'utilisation </label>
        </div>

        <button
          type="submit"
          class="button_primary"
          :disabled="isLoading || !isFormValid"
        >
          <span v-if="isLoading">Chargement...</span>
          <span v-else>Créer un compte</span>
        </button>
      </form>

      <div class="form-footer">
        <p>
          Vous avez déjà un compte ?
          <router-link to="/login" class="form-link">Se connecter</router-link>
        </p>
      </div>
    </FormCard>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import FormCard from "../../components/FormCard.vue";
import AuthLayout from "../../layouts/AuthLayout.vue";
import type { RegisterData } from "../../stores/auth";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive<RegisterData>({
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  username: "",
  phone: "",
  birthDate: "",
  description: "",
});

const acceptTerms = ref(false);
const localError = ref("");

// Utiliser les valeurs du store
const isLoading = computed(() => authStore.isLoading);
const storeError = computed(() => authStore.error);

const isFormValid = computed(() => {
  return (
    formData.lastName.trim() !== "" &&
    formData.firstName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.length >= 8 &&
    acceptTerms.value
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) {
    localError.value =
      "Veuillez remplir correctement tous les champs. Le mot de passe doit contenir au moins 8 caractères.";
    return;
  }

  try {
    // Réinitialiser les erreurs
    localError.value = "";
    authStore.setError(null);

    // Appeler la méthode register du store
    const success = await authStore.register(formData);

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
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--color-foreground);
}

:global(.dark) .form-title {
  color: var(--color-foreground-dark);
}

.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border-left: 4px solid #ef4444;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
  color: var(--color-foreground);
}

:global(.dark) label {
  color: var(--color-foreground-dark);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
}

:global(.dark) input[type="text"],
:global(.dark) input[type="email"],
:global(.dark) input[type="password"] {
  background-color: #374151;
  border-color: #4b5563;
  color: white;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.2);
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.form-check input {
  margin-right: 0.5rem;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

:global(.dark) .form-footer {
  color: #9ca3af;
}

.form-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

:global(.dark) .form-link {
  color: var(--color-primary-dark);
}

.form-link:hover {
  text-decoration: underline;
}
</style>
