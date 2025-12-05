<template>
  <div class="user-form">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="onRegister">
      <div class="form-row double">
        <input v-model="holot" placeholder="Họ lót" required />
        <input v-model="ten" placeholder="Tên" required />
      </div>
      <div class="form-row double">
        <input v-model="ngaysinh" type="date" placeholder="Ngày sinh" required />
        <select v-model="phai" required>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div class="form-row"><input v-model="diachi" placeholder="Địa chỉ" required /></div>
      <div class="form-row"><input v-model="dienthoai" placeholder="Điện thoại" required /></div>
      <div class="form-row"><input v-model="email" type="email" placeholder="Email" required /></div>
      <div class="form-row"><input v-model="password" type="password" placeholder="Mật khẩu" required /></div>
      <div class="form-row"><button type="submit">Đăng ký</button></div>
    </form>

    <p v-if="message" :class="{'error': isError, 'success': !isError}">{{ message }}</p>
    <div class="login-link">
      <span>Bạn đã có tài khoản?</span>
      <router-link to="/user/login">Đăng nhập</router-link>
    </div>
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

    await loginReader({ Email: email.value, Password: password.value });
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
  max-width: 550px;
  margin: 4rem auto;
  padding: 3rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

h2 {
  text-align: center;
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
}

.form-row {
  margin-bottom: 1rem;
}

.form-row.double {
  display: flex;
  gap: 1rem;
}
.form-row.double input,
.form-row.double select {
  flex: 1;
}

input, select {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1.05rem;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 6px rgba(59,130,246,0.3);
}

button {
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #4a90e2, #357ABD);
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.05rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 18px rgba(0,0,0,0.2);
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

.login-link {
  text-align: center;
  font-size: 1rem;
  margin-top: 0.8rem;
}
.login-link span {
  margin-right: 5px;
}
.login-link a {
  color: #3b82f6;
  font-weight: 600;
  transition: color 0.2s;
}
.login-link a:hover {
  color: #1e40af;
}

@media (max-width: 600px) {
  .user-form {
    margin: 2rem 1rem;
    padding: 2rem 1.5rem;
    max-width: 100%;
  }
  h2 { font-size: 1.7rem; }
  input, select, button { font-size: 1rem; padding: 0.6rem 0.8rem; }
  .form-row.double {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
