<template>
  <div class="login">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="submitLogin">
      <input v-model="MSNV" placeholder="MSNV" required @input="clearError" />
      <input v-model="Password" type="password" placeholder="Mật khẩu" required @input="clearError" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/auth.service.js";

const MSNV = ref("");
const Password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();

const clearError = () => {
  error.value = "";
};

const submitLogin = async () => {
  loading.value = true;
  try {

    const res = await login(MSNV.value, Password.value);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    if (res.user.Chucvu.toLowerCase() === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/books");
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Đăng nhập thất bại";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login {
  width: 320px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

input {
  margin-bottom: 12px;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #1976d2;
  outline: none;
}

button {
  padding: 10px;
  font-size: 14px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover:enabled {
  background-color: #115293;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 10px;
  color: #d32f2f;
  text-align: center;
  font-size: 13px;
}
</style>
