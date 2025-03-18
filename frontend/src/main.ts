import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Configuration de sécurité
const app = createApp(App);

// Protection XSS - Désactiver la compilation de template pour le contenu dynamique
app.config.compilerOptions.whitespace = "condense";
app.config.globalProperties.$sanitize = (html: string): string => {
  // Fonction simple pour échapper les caractères dangereux
  return String(html)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#x2F;");
};

app.use(createPinia());
app.use(router);

app.mount("#app");

// Initialisation du store d'authentification
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore();
authStore.init();
