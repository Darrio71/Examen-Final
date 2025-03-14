<template>
  <nav class="navbar">
    <router-link to="/inicio" class="nav-link">Inicio</router-link>
    <router-link to="/carrito" class="nav-link">
      Carrito 🛒 <span class="badge">{{ cantidadCarrito }}</span>
    </router-link>
    <router-link to="/agregar-Producto" class="nav-link">Producto</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  background-color: #007bff;
  border-bottom: 3px solid #0056b3;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #ffd700;
}

.badge {
  background-color: red;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 50%;
}
</style>
