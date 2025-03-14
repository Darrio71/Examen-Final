<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div class="bg-container">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-6">Agregar Producto</h1>
  
        <form @submit.prevent="crearProducto">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Título:</label>
            <input v-model="producto.title" type="text" class="input-field">
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Precio:</label>
            <input v-model="producto.price" type="number" class="input-field">
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Descripción:</label>
            <textarea v-model="producto.description" class="input-field resize-none h-24"></textarea>
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">ID de Categoría:</label>
            <input v-model="producto.categoryId" type="number" class="input-field">
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Imagen (URL):</label>
            <input v-model="producto.images[0]" type="text" class="input-field">
          </div>
  
          <button type="submit" class="btn-primary w-full">Crear Producto</button>
        </form>
      </div>
  
      <!-- Modal de Confirmación -->
      <div v-if="modalVisible" class="modal-overlay">
        <div class="modal-content">
          <h2 class="text-xl font-bold mb-3">¡Producto Creado!</h2>
          <p class="text-gray-700">Tu producto ha sido agregado exitosamente.</p>
          <button @click="cerrarModal" class="btn-success">Aceptar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const producto = ref({
    title: "",
    price: null,
    description: "",
    categoryId: null,
    images: [""],
  });
  
  const modalVisible = ref(false);
  
  const crearProducto = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto.value),
      });
  
      if (response.ok) {
        modalVisible.value = true; // Mostrar modal
        producto.value = { title: "", price: null, description: "", categoryId: null, images: [""] };
      } else {
        alert("Error al crear el producto.");
      }
    } catch (error) {
      alert("Hubo un problema con la solicitud.");
    }
  };
  
  const cerrarModal = () => {
    modalVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* Input Fields */
  .input-field {
    width: 100%;
    border: 1px solid #d1d5db;
    padding: 10px;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus {
    border-color: #2563eb;
    box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
  }
  
  /* Primary Button */
  .btn-primary {
    background-color: #2563eb;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #1e40af;
  }
  
  /* Success Button */
  .btn-success {
    background-color: #10b981;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .btn-success:hover {
    background-color: #047857;
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
  }
  
  /* Animación del Modal */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
/* Estilo general del formulario */
.bg-container {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 75px auto 0; /* 50px desde la parte superior y centrado automáticamente */
}


/* Estilo de los inputs y textarea */
.input-field {
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
}

/* Botón principal */
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-primary:hover {
  background-color: #1e40af;
}

  </style>
  