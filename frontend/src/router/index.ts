import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Home from "../pages/Home.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  // Route 404
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next({ name: "login" });
  } else if (requiresGuest && authStore.isAuthenticated) {
    // Rediriger vers le tableau de bord si l'utilisateur est déjà authentifié
    next({ name: "dashboard" });
  } else {
    // Continuer normalement
    next();
  }
});

export default router;
