import { defineStore } from "pinia";
import { computed, ref } from "vue";
import apiService from "../services/api";

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
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
console.log(
  "API_BASE_URL (variable d'environnement):",
  import.meta.env.VITE_API_BASE_URL
);
console.log("API_BASE_URL (effective):", API_BASE_URL);

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
      console.log("Début de la fonction login");
      console.log("Email:", email);

      const response = await apiService.login(email, password);
      console.log("Réponse de la connexion:", response);

      if (response.success === false) {
        throw new Error(response.message || "Données de réponse invalides");
      }

      // Stocker le token et les informations utilisateur
      if (response && response.data) {
        console.log("Données utilisateur reçues:", response.data);
        setUser(response.data);
        if (response.data.token) {
          console.log(
            "Token reçu:",
            response.data.token.substring(0, 10) + "..."
          );
          setToken(response.data.token);
        } else {
          console.warn("Aucun token reçu dans la réponse");
          throw new Error("Aucun token reçu dans la réponse");
        }
        console.log("Connexion réussie");
        return true;
      } else {
        console.error("Données utilisateur manquantes:", response);
        throw new Error("Données utilisateur manquantes dans la réponse");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Échec de la connexion. Veuillez vérifier vos identifiants.";
      setError(errorMessage);
      return false;
    } finally {
      isLoading.value = false;
      console.log("Fin de la fonction login");
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
      console.log("Début de la fonction register");

      // Définir le roleId par défaut à 1 (rôle "No roles")
      const registerData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        roleId: 1, // Rôle "No roles" par défaut
        username: userData.username || undefined,
        phone: userData.phone || undefined,
        birthDate: userData.birthDate || undefined,
        description: userData.description || undefined,
      };

      console.log("Données d'inscription:", JSON.stringify(registerData));

      const response = await apiService.register(registerData);
      console.log("Réponse de l'API:", response);

      // Si le serveur renvoie une erreur
      if (response.success === false) {
        throw new Error(response.message || "Échec de l'inscription");
      }

      // Si la réponse a un statut de réussite, considérons que l'opération a réussi
      console.log("Inscription réussie");
      return true;
    } catch (err) {
      console.error("Erreur inattendue:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Échec de l'inscription. Veuillez réessayer.";
      setError(errorMessage);
      return false;
    } finally {
      isLoading.value = false;
      console.log("Fin de la fonction register");
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    apiService.resetCsrfToken(); // Réinitialiser le token CSRF
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
