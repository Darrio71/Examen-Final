<template>
    <div class="actualizar-container">
      <button class="btn-atras" @click="volverAtras">← Atrás</button>
      <h2>Actualizar Producto</h2>
      
      <form @submit.prevent="guardarCambios">
        <label>Nombre del producto:</label>
        <input v-model="producto.title" type="text" required />
        
        <label>Precio:</label>
        <input v-model="producto.price" type="number" required />
        
        <label>Descripción:</label>
        <textarea v-model="producto.description"></textarea>
        
        <button type="submit" class="btn-guardar">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const producto = ref({});
  
  onMounted(async () => {
    try {
      const respuesta = await fetch(`https://api.escuelajs.co/api/v1/products/${route.query.id}`);
      producto.value = await respuesta.json();
    } catch (error) {
      console.error("Error al cargar producto:", error);
    }
  });
  
  const guardarCambios = async () => {
  try {
    const idProducto = route.query.id; // Asegura que este ID está llegando
    if (!idProducto) throw new Error("ID del producto no encontrado");

    console.log(`Actualizando producto con ID: ${idProducto}`);

    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${idProducto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: producto.value.title,
        price: producto.value.price
      }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message || "No se pudo actualizar"}`);
    }

    alert("Producto actualizado correctamente");
    router.push("/"); // Redirigir al inicio
  } catch (error) {
    console.error("Error en la actualización:", error);
    alert(`Error al actualizar producto: ${error.message}`);
  }
};

  
  const volverAtras = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .actualizar-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-guardar {
    display: block;
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn-atras {
    background-color: #ddd;
    color: black;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    display: block;
    margin-bottom: 10px;
  }
  </style>
  