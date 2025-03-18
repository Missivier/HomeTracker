<template>
  <AuthLayout>
    <FormCard className="login-form">
      <h2 class="form-title">Connexion</h2>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Votre email"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Votre mot de passe"
          />
        </div>

        <div class="form-check">
          <input id="remember" type="checkbox" v-model="remember" />
          <label for="remember"> Se souvenir de moi </label>
        </div>

        <button type="submit" class="button_primary" :disabled="isLoading">
          <span v-if="isLoading">Chargement...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="form-footer">
        <p>
          Vous n'avez pas de compte ?
          <router-link to="/register" class="form-link">S'inscrire</router-link>
        </p>
      </div>
    </FormCard>
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
const remember = ref(false);

// Utiliser les valeurs du store
const isLoading = computed(() => authStore.isLoading);
const storeError = computed(() => authStore.error);
const error = computed(() => storeError.value);

const handleLogin = async () => {
  try {
    authStore.setError(null);

    const success = await authStore.login(email.value, password.value);

    if (success) {
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("Erreur de connexion:", err);
  }
};
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
