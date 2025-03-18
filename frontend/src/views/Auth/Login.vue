<!-- src/views/Auth/Login.vue -->
<template>
  <div class="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-6">Connexion</h1>

    <form @submit.prevent="handleLogin" class="w-full">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium mb-1" for="password"
          >Mot de passe</label
        >
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <Button type="submit" variant="primary" block :disabled="isLoading">
        {{ isLoading ? "Chargement..." : "Se connecter" }}
      </Button>
    </form>

    <div class="mt-4 text-center">
      <p>
        Pas encore de compte?
        <router-link to="/auth/register" class="text-primary"
          >S'inscrire</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/Button.vue";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const success = await authStore.login(
      form.value.email,
      form.value.password
    );

    if (success) {
      router.push("/dashboard");
    } else {
      error.value = "Identifiants invalides";
    }
  } catch (err) {
    error.value = "Une erreur est survenue";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>
