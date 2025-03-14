<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña (6 números)" required />
        <button type="submit">Ingresar</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p class="register-link">¿No tienes una cuenta? <router-link to="/registro">Crea una aquí</router-link></p>
    </div>
    <div class="image-container">
      <img src="/images/Manzana.jpeg" alt="Imagen de inicio de sesión" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = () => {
  if (!email.value.endsWith('@gmail.com')) {
    error.value = 'El correo debe terminar en @gmail.com';
    return;
  }
  if (!/^\d{6}$/.test(password.value)) {
    error.value = 'La contraseña debe tener 6 números';
    return;
  }

  // Si pasa las validaciones
  alert('Login exitoso!');
  router.push('/inicio'); // Redirige al usuario
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: #f8f9fa;
}

.login-container {
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.image-container {
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 350px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>

