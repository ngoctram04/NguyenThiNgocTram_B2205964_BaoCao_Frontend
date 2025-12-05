<template>
  <div class="user-form">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="onLogin">
      <div class="form-row">
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div class="form-row">
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
      </div>
      <div class="form-row">
        <button type="submit">Đăng nhập</button>
      </div>
    </form>

    <p v-if="message" :class="{'error': isError, 'success': !isError}">{{ message }}</p>

    <div class="register-link">
      <span>Chưa có tài khoản?</span>
      <router-link to="/user/register">Đăng ký ngay</router-link>
    </div>
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
      Email: email.value,
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
  margin: 4rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.form-row {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 5px rgba(59,130,246,0.3);
}

button {
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #4a90e2, #357ABD);
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

p.error {
  color: #dc2626;
  font-weight: 500;
  text-align: center;
}

p.success {
  color: #16a34a;
  font-weight: 500;
  text-align: center;
}

.register-link {
  text-align: center;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.register-link span {
  margin-right: 5px;
}
.register-link a {
  color: #3b82f6;
  font-weight: 600;
  transition: color 0.2s;
}
.register-link a:hover {
  color: #1e40af;
}

@media (max-width: 480px) {
  .user-form {
    margin: 2rem 1rem;
    padding: 2rem 1.5rem;
  }
  h2 { font-size: 1.5rem; }
}
</style>
