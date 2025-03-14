<template>
  <div>
    <!-- Solo muestra el NavBar si NO estamos en la página de login -->
    <NavBar v-if="!esPaginaDeLogin && !EspaginaDeRegistro" />

    <!-- Renderiza la página actual -->
    <NuxtPage />
  </div>
</template>
<script setup>
import NavBar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

// Verifica si la página actual es "/login"
const esPaginaDeLogin = computed(() => route.path === "/");
const EspaginaDeRegistro= computed(() => route.path === "/registro");
</script>