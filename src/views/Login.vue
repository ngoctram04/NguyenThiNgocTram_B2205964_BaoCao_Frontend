<template>
  <div class="login-container">
    <div class="login-card">
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
  width: 320px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #1e3a8a;
}

input {
  padding: 0.7rem 0.9rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #bbb;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 0.5rem;
}

input:focus {
  border-color: #1976d2;
}

button {
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

button:hover:enabled {
  background-color: #115293;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

@media (max-width: 480px) {
  .login-card {
    width: 100%;
    padding: 1.5rem;
  }
}
</style>

