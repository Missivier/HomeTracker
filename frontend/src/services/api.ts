import { useAuthStore } from "../stores/auth";

// URL de base de l'API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Stockage temporaire du token CSRF
let csrfToken: string | null = null;

/**
 * Service pour les requêtes API
 */
const apiService = {
  /**
   * Obtient un token CSRF du serveur
   * @returns Le token CSRF
   */
  async getCsrfToken(): Promise<string> {
    if (csrfToken) {
      return csrfToken;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/csrf-token`, {
        method: "GET",
        credentials: "include", // Nécessaire pour envoyer/recevoir des cookies
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération du token CSRF");
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error("Réponse invalide du serveur pour le token CSRF");
      }

      csrfToken = data.token;
      return data.token;
    } catch (error) {
      console.error("Erreur lors de la récupération du token CSRF:", error);
      throw error;
    }
  },

  /**
   * Effectue une requête API
   * @param url - L'URL relative de l'endpoint
   * @param options - Options de la requête fetch
   * @returns La réponse de l'API
   */
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const authStore = useAuthStore();
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    // Configuration par défaut
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include", // Envoyer des cookies pour CSRF
    };

    // Fusionner les options
    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Ajouter le token d'authentification s'il existe
    if (authStore.token) {
      (mergedOptions.headers as Record<string, string>)["Authorization"] =
        `Bearer ${authStore.token}`;
    }

    // Ajouter le token CSRF pour les méthodes non sécurisées
    const method = options.method || "GET";
    if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) {
      try {
        const token = await this.getCsrfToken();
        (mergedOptions.headers as Record<string, string>)["X-CSRF-Token"] =
          token;
      } catch (error) {
        console.error("Impossible d'obtenir un token CSRF:", error);
      }
    }

    try {
      const response = await fetch(fullUrl, mergedOptions);

      // Gérer les erreurs HTTP
      if (!response.ok) {
        // Si la réponse est 401, deconnecter l'utilisateur
        if (response.status === 401) {
          authStore.logout();
        }

        // Extraire le message d'erreur si disponible
        let errorMessage = "Une erreur est survenue";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // Ignorer les erreurs de parsing
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");

      // Retourner JSON si c'est du JSON
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      // Sinon, retourner la réponse telle quelle
      return response as unknown as T;
    } catch (error) {
      console.error(`Erreur lors de la requête ${fullUrl}:`, error);
      throw error;
    }
  },

  // Méthodes pratiques pour les requêtes courantes
  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  },

  async post<T>(url: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async put<T>(url: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  },

  // Fonctions spécifiques à l'authentification
  async login(email: string, password: string) {
    return this.post<any>("/users/login", { email, password });
  },

  async register(userData: any) {
    return this.post<any>("/users/register", userData);
  },

  // Réinitialiser le token CSRF (utile après une déconnexion)
  resetCsrfToken() {
    csrfToken = null;
  },
};

export default apiService;
