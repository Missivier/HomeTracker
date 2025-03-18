import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Routes
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: { requiresAuth: false, isAuthPage: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
    meta: { requiresAuth: false, isAuthPage: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

// Création du router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard pour l'authentification
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialiser l'authentification
  if (!from.name) {
    authStore.init();
  }

  // Redirection en fonction de l'authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion si l'authentification est requise
    next({ name: "login" });
  } else if (to.meta.isAuthPage && authStore.isAuthenticated) {
    // Rediriger vers le tableau de bord si déjà connecté
    next({ name: "dashboard" });
  } else {
    // Autoriser la navigation
    next();
  }
});

export default router;
