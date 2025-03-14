<template>
    <div>
      <h2>Carrito de Compras</h2>
  
      <div v-if="carrito.length === 0">
        <p>El carrito está vacío.</p>
      </div>
  
      <div v-else class="carrito-container">
        <div v-for="(producto, index) in carrito" :key="index" class="carrito-item">
          <img :src="producto.images[0]" :alt="producto.title" class="carrito-imagen">
          <div class="carrito-info">
            <p class="titulo">{{ producto.title }}</p>
            <p class="precio">S/ {{ producto.price }}</p>
          </div>
          <button class="boton-eliminar" @click="eliminarDelCarrito(index)">Eliminar</button>
        </div>
        
        <div class="total-container">
          <p><strong>Total a pagar:</strong> S/ {{ totalPagar }}</p>
        </div>
      </div>
  
      <router-link to="/inicio" class="volver-btn">Volver a la tienda</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const carrito = ref(JSON.parse(localStorage.getItem("carrito")) || []);
  
  const eliminarDelCarrito = (index) => {
    carrito.value.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito.value));
  };
  
  const totalPagar = computed(() => {
    return carrito.value.reduce((total, producto) => total + producto.price, 0);
  });
  </script>
  
  <style>
  .carrito-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .carrito-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
  }
  
  .carrito-imagen {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .carrito-info {
    flex-grow: 1;
    padding-left: 10px;
  }
  
  .titulo {
    font-weight: bold;
  }
  
  .precio {
    color: blue;
  }
  
  .boton-eliminar {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .total-container {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
  }
  
  .volver-btn {
    display: block;
    margin-top: 15px;
    padding: 10px;
    text-align: center;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  </style>
