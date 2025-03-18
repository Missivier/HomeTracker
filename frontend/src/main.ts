import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeStores } from "./stores";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialiser les stores après avoir monté Pinia
initializeStores();

app.mount("#app");
