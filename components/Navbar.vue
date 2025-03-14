<template>
  <nav class="navbar">
    <router-link to="/inicio" class="nav-link">Inicio</router-link>
    <router-link to="/carrito" class="nav-link">Carrito 🛒</router-link>
    <router-link to="/agregar-Producto" class="nav-link">Producto</router-link>
    
    <div class="dropdown">
      <button class="dropbtn">Cuenta ▼</button>
      <div class="dropdown-content">
        <router-link to="/perfil">Perfil</router-link>
        <router-link to="/" class="logout">Cerrar Sesión</router-link>
      </div>
    </div>
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #0056b3;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.dropbtn:hover {
  background-color: #004494;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 150px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  right: 0;
}

.dropdown-content a {
  color: black;
  padding: 10px;
  display: block;
  text-decoration: none;
  font-size: 1rem;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logout {
  color: red;
  font-weight: bold;
}
</style>