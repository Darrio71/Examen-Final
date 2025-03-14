<template>
  <div>
    <!-- 🔹 El Navbar solo se muestra si NO estamos en /login -->
    <Navbar v-if="!esPaginaDeLogin" />

    <!-- 🔹 Renderiza la página actual -->
    <NuxtPage />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue';

// 🔹 Obtiene la ruta actual
const route = useRoute();

// 🔹 Verifica si la ruta actual es /login
const esPaginaDeLogin = computed(() => route.path === '/login');
</script>
