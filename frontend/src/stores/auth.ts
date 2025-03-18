import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  id: number;
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  roleId: number;
  token?: string;
}

// URL de base de l'API
const API_BASE_URL = "http://localhost:3000/api";

export const useAuthStore = defineStore("auth", () => {
  // État
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userFullName = computed(() => {
    if (!user.value) return "";
    return `${user.value.firstName} ${user.value.lastName}`;
  });

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

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion");
      }

      if (!data.success || !data.data) {
        throw new Error(data.message || "Données de réponse invalides");
      }

      // Stocker le token et les informations utilisateur
      setUser(data.data);
      setToken(data.data.token);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Échec de la connexion. Veuillez vérifier vos identifiants.";
      setError(errorMessage);
      console.error("Erreur de connexion:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string;
    phone?: string;
    birthDate?: string;
    description?: string;
  }) {
    isLoading.value = true;
    error.value = null;

    try {
      // Nous devons spécifier un roleId pour que l'inscription fonctionne
      const registerData = {
        ...userData,
        roleId: 1, // Rôle par défaut (utilisateur standard)
      };

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de l'inscription");
      }

      if (!data.success) {
        throw new Error(data.message || "Données de réponse invalides");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Échec de l'inscription. Veuillez réessayer.";
      setError(errorMessage);
      console.error("Erreur d'inscription:", err);
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
      // Dans un cas réel, vous feriez un appel API pour récupérer les infos utilisateur avec le token
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
    register,
    setUser,
    setToken,
    setError,
    init,
  };
});
