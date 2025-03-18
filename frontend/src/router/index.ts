import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard.vue";

// Lazy-loading pour les vues d'authentification
const Login = () => import("../views/Auth/Login.vue");
const Register = () => import("../views/Auth/Register.vue");

// Layouts
import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
