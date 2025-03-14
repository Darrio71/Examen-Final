<template>
  <div class="filtros-container">
    <input v-model="filtroTitulo" placeholder="Buscar por título" @input="filtrarProductos" />
    <input v-model="filtroId" type="number" placeholder="Buscar por ID" @input="filtrarProductos" />
    <input v-model="filtroPrecio" type="number" placeholder="Buscar por precio exacto" @input="filtrarProductos" />
    <input v-model="precioMin" type="number" placeholder="Precio mínimo" @input="filtrarProductos" />
    <input v-model="precioMax" type="number" placeholder="Precio máximo" @input="filtrarProductos" />
    <select v-model="categoria" @change="filtrarProductos">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const filtroTitulo = ref('');
const filtroId = ref('');
const filtroPrecio = ref('');
const precioMin = ref('');
const precioMax = ref('');
const categoria = ref('');
const categorias = ref([]);
const emit = defineEmits(['filtrar']);

const filtrarProductos = () => {
  const filtros = {
    title: filtroTitulo.value,
    id: filtroId.value,
    price: filtroPrecio.value,
    price_min: precioMin.value,
    price_max: precioMax.value,
    categoryId: categoria.value,
  };
  emit('filtrar', filtros);
};

const obtenerCategorias = async () => {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories');
    categorias.value = await res.json();
  } catch (error) {
    console.error('Error al obtener categorías:', error);
  }
};

onMounted(obtenerCategorias);
</script>

<style scoped>
.filtros-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
input, select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

  
  