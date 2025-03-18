// src/stores/auth.ts
import { defineStore } from "pinia";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(email: string) {
      try {
        // Ici, vous ferez un appel API réel vers votre backend
        // Pour le moment, simulons une réponse
        const response = {
          token: "fake-jwt-token",
          user: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: email,
          },
        };

        this.token = response.token;
        this.user = response.user;
        this.isAuthenticated = true;

        localStorage.setItem("token", response.token);
        return true;
      } catch (error) {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
