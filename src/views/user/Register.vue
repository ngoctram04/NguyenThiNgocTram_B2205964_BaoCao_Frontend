<template>
  <div class="auth-form">
    <h2>Đăng ký</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="Tên đăng nhập" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <input v-model="fullName" placeholder="Họ và tên" required />
      <button type="submit" :disabled="loading">{{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}</button>
    </form>
    <p>Bạn đã có tài khoản? <router-link to="/user/login">Đăng nhập</router-link></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerReader } from "../../services/readerAuth.service.js";

const username = ref("");
const password = ref("");
const fullName = ref("");
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  try {
    await registerReader({ username: username.value, password: password.value, fullName: fullName.value });
    alert("Đăng ký thành công! Hãy đăng nhập.");
    router.push("/user/login");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Đăng ký thất bại!");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-form { max-width: 400px; margin: 50px auto; display: flex; flex-direction: column; gap: 10px; }
.auth-form input { padding: 10px; font-size: 1rem; border-radius: 6px; border: 1px solid #ccc; }
.auth-form button { padding: 10px; font-size: 1rem; border: none; border-radius: 6px; background-color: #1976d2; color: white; cursor: pointer; }
.auth-form button:disabled { background-color: #888; cursor: not-allowed; }
</style>
