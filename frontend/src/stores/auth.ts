import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  // État
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userFullName = computed(() => user.value?.name || "");

  // Actions
  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  function setToken(newToken: string | null) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  function setError(message: string | null) {
    error.value = message;
  }

  async function login(email: string, _password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dans un cas réel, vous feriez un appel API ici
      // const response = await api.post('/auth/login', { email, password });

      // Données simulées
      const mockUser: User = {
        id: "1",
        name: "Utilisateur Test",
        email: email,
      };
      const mockToken = "mock_jwt_token";

      setUser(mockUser);
      setToken(mockToken);

      return true;
    } catch (err) {
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      console.error("Erreur de connexion:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  // Initialisation - Récupérer le token du localStorage au démarrage
  function init() {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      token.value = savedToken;
      // Dans un cas réel, vous feriez un appel API pour récupérer les infos utilisateur
      // fetchUserProfile();
    }
  }

  return {
    // État
    user,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    userFullName,

    // Actions
    login,
    logout,
    setUser,
    setToken,
    setError,
    init,
  };
});
