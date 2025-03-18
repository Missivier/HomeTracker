import { useAuthStore } from "./auth";

/**
 * Initialise tous les stores de l'application
 */
export function initializeStores() {
  const authStore = useAuthStore();
  authStore.init();

  // Initialiser d'autres stores ici si nécessaire
}

export { useAuthStore };
