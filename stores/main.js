import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Tienda from "./pages/index.vue"; // Tu lista de productos
import Carrito from "./pages/carrito.vue"; // Página del carrito

const routes = [
  { path: "/", component: Tienda },
  { path: "/carrito", component: Carrito },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
