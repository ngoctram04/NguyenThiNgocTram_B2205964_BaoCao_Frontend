<template>
  <div class="auth-form">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Tên đăng nhập" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit" :disabled="loading">{{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}</button>
    </form>
    <p>Bạn chưa có tài khoản? <router-link to="/user/register">Đăng ký</router-link></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginReader } from "../../services/readerAuth.service.js";

const username = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    await loginReader({ username: username.value, password: password.value });
    alert("Đăng nhập thành công!");
    router.push("/user");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Đăng nhập thất bại!");
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
