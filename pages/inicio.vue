<template>
  <div class="pagina-inicio"> 
    <FiltroProductos @filtrar="aplicarFiltros" />
    <h2>Lista de Productos</h2>
    
    <div class="productos-container">
      <div 
        v-for="producto in productosFiltrados" 
        :key="producto.id" 
        class="producto-card" 
        @click="mostrarDetalles(producto)"
      >
        <img :src="producto.images[0]" :alt="producto.title" class="producto-imagen">
        <p class="titulo">{{ producto.title }}</p>
        <p class="precio">S/ {{ producto.price }}</p>
        <button class="boton-carrito" @click.stop="agregarAlCarrito(producto)">Añadir al carrito</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="cerrarModal">&times;</span>
        <h2>{{ productoSeleccionado.title }}</h2>
        <img 
          :src="productoSeleccionado.images[0]" 
          :alt="productoSeleccionado.title" 
          class="modal-imagen"
        >
        <p><strong>ID:</strong> {{ productoSeleccionado.id }}</p>
        <p><strong>Precio:</strong> S/ {{ productoSeleccionado.price }}</p>
        <p><strong>Descripción:</strong> {{ productoSeleccionado.description }}</p>

        <div class="botones-container">
          <button class="btn eliminar" @click="eliminarProducto">Eliminar</button>
          <button class="btn actualizar" @click="actualizarProducto">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import FiltroProductos from "@/components/FiltroProductos.vue";

const productos = ref([]);
const mostrarModal = ref(false);
const productoSeleccionado = ref({});
const carrito = ref([]);
const router =useRouter();
const productosFiltrados = ref([]);

const obtenerProductos = async () => {
  try {
    const respuesta = await fetch("https://api.escuelajs.co/api/v1/products");
    productos.value = await respuesta.json();
    productosFiltrados.value = productos.value; // Inicialmente, mostrar todos
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const mostrarDetalles = (producto) => {
  productoSeleccionado.value = producto;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const agregarAlCarrito = (producto) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.title} añadido al carrito`);
};
const eliminarProducto = () => {
  productos.value = productos.value.filter(p => p.id !== productoSeleccionado.value.id);
  cerrarModal();
};

const actualizarProducto = () => {
  router.push({ 
    name: "actualiza-producto", 
    query: { id: productoSeleccionado.value.id } 
  });
};
// Aplicar filtros
const aplicarFiltros = (filtros) => {
  productosFiltrados.value = productos.value.filter((producto) => {
    return (
      (!filtros.title || producto.title.toLowerCase().includes(filtros.title.toLowerCase())) &&
      (!filtros.id || producto.id == filtros.id) &&
      (!filtros.price || producto.price == filtros.price) &&
      (!filtros.price_min || producto.price >= filtros.price_min) &&
      (!filtros.price_max || producto.price <= filtros.price_max) &&
      (!filtros.categoryId || producto.category.id == filtros.categoryId)
    );
  });
};
onMounted(obtenerProductos);
</script>

<style>
.pagina-inicio {
  margin-top: 80px; /* Ajusta este valor según la altura del navbar */
  padding: 20px;
}
.productos-container {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.producto-card {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  width: 200px;
  background-color: white;
  transition: 0.3s;
  border-radius: 10px;
}

.producto-card:hover {
  background-color: #f0f0f0;
}

.producto-imagen {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.titulo {
  font-weight: bold;
}

.precio {
  color: blue;
}

.boton-carrito {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  background-color: green;
  color: white;
}

/* Estilos para el Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.modal-imagen {
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 25px;
  cursor: pointer;
}
.eliminar {
  background-color: red;
  color: white;
}

.actualizar {
  background-color: green;
  color: white;
}
</style>
