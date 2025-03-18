import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  username?: string;
  phone?: string;
  email: string;
  birthDate?: Date;
  description?: string;
}

export interface RegisterData {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
  birthDate?: string;
  description?: string;
}

// URL de l'API backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuthStore = defineStore("auth", () => {
  // État
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = ref(false);

  // Getters
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

  async function register(userData: RegisterData) {
    isLoading.value = true;
    error.value = null;

    try {
      // Préparer les données pour l'API (ajouter roleId requis par le backend)
      const apiData = {
        ...userData,
        roleId: 1, // Utiliser le rôle par défaut (1 = utilisateur standard)
      };

      // Appel API réel au backend
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de l'inscription");
      }

      console.log("Inscription réussie:", data);
      setUser(data.user);
      setToken(data.token);
      isAuthenticated.value = true;
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

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      // Simuler un délai de réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Vérification simple (pour prototype)
      if (email && password.length >= 6) {
        user.value = {
          id: "1",
          lastName: "Dupont",
          firstName: "Jean",
          email,
        };
        setUser(user.value);
        setToken("mock_jwt_token");
        isAuthenticated.value = true;

        // Stocker dans localStorage pour la persistance
        localStorage.setItem("auth_user", JSON.stringify(user.value));
        localStorage.setItem("is_authenticated", "true");

        return true;
      } else {
        error.value = "Identifiants incorrects";
        return false;
      }
    } catch (err) {
      error.value = "Une erreur est survenue lors de la connexion";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    setUser(null);
    setToken(null);
    isAuthenticated.value = false;

    // Nettoyer localStorage
    localStorage.removeItem("auth_user");
    localStorage.removeItem("is_authenticated");

    return true;
  }

  // Initialisation - Récupérer le token du localStorage au démarrage
  function init() {
    const savedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    const storedAuth = localStorage.getItem("is_authenticated");

    if (savedToken) {
      token.value = savedToken;
      // Dans un cas réel, vous feriez un appel API pour récupérer les infos utilisateur
      // fetchUserProfile();
    }

    if (storedUser && storedAuth === "true") {
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  }

  return {
    // État
    user,
    token,
    isLoading,
    error,
    isAuthenticated,

    // Getters
    userFullName,

    // Actions
    register,
    login,
    logout,
    setUser,
    setToken,
    setError,
    init,
  };
});
