<template>
  <div class="user-form">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="onRegister">
      <input v-model="holot" placeholder="Họ lót" required />
      <input v-model="ten" placeholder="Tên" required />
      <input v-model="ngaysinh" type="date" placeholder="Ngày sinh" required />
      <select v-model="phai" required>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>
      <input v-model="diachi" placeholder="Địa chỉ" required />
      <input v-model="dienthoai" placeholder="Điện thoại" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng ký</button>
    </form>

    <p v-if="message" :class="{'error': isError, 'success': !isError}">{{ message }}</p>
    <router-link to="/user/login">Bạn đã có tài khoản? Đăng nhập</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerReader, loginReader } from "../../services/readerAuth.service.js";

const holot = ref("");
const ten = ref("");
const ngaysinh = ref("");
const phai = ref("Nam");
const diachi = ref("");
const dienthoai = ref("");
const email = ref("");
const password = ref("");

const message = ref("");
const isError = ref(false);
const router = useRouter();

const onRegister = async () => {
  isError.value = false;
  message.value = "";

  try {
    // Gửi dữ liệu đăng ký với PascalCase đúng backend
    await registerReader({
      HoLot: holot.value,
      Ten: ten.value,
      NgaySinh: ngaysinh.value,
      Phai: phai.value,
      DiaCHi: diachi.value,
      DienThoai: dienthoai.value,
      Email: email.value,
      Password: password.value
    });

    // Tự động login sau khi đăng ký
    await loginReader({
      Email: email.value,
      Password: password.value
    });

    window.dispatchEvent(new Event("login-success"));

    message.value = "Đăng ký và đăng nhập thành công!";
    isError.value = false;

    router.push("/user");
  } catch (err) {
    message.value = err.response?.data?.message || "Đăng ký thất bại!";
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

input, select {
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
