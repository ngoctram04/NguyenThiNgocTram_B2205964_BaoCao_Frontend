<template>
  <div class="user-form">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="onLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng nhập</button>
    </form>

    <p v-if="message" :class="{'error': isError, 'success': !isError}">{{ message }}</p>
    <router-link to="/user/register">Chưa có tài khoản? Đăng ký</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginReader } from "../../services/readerAuth.service.js";

const email = ref("");
const password = ref("");
const message = ref("");
const isError = ref(false);
const router = useRouter();

const onLogin = async () => {
  isError.value = false;
  message.value = "";

  try {
    const res = await loginReader({
      Email: email.value,   // PascalCase để match backend
      Password: password.value
    });

    if (res?.token) {
      window.dispatchEvent(new Event("login-success"));
      message.value = "Đăng nhập thành công!";
      isError.value = false;
      router.push("/user");
    } else {
      message.value = "Đăng nhập thất bại!";
      isError.value = true;
    }
  } catch (err) {
    message.value = err.response?.data?.message || "Đăng nhập thất bại!";
    isError.value = true;
  }
};
</script>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: #4a90e2;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #357ABD;
}

p.error {
  color: red;
}

p.success {
  color: green;
}
</style>
