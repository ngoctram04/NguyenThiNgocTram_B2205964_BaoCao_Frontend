<template>
  <div class="login-container">
    <h2>Đăng nhập Admin</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>MSNV:</label>
        <input v-model="MSNV" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="Password" type="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import staffService from "@/services/staff.service.js";

export default {
  name: "Login",
  data() {
    return {
      MSNV: "",
      Password: "",
      error: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await staffService.login({
          MSNV: this.MSNV,
          Password: this.Password,
        });

        const staff = res.data.staff;

        if (staff.Chucvu !== "admin") {
          this.error = "Bạn không có quyền truy cập admin";
          return;
        }

        localStorage.setItem("user", JSON.stringify(staff));
        this.router.push("/dashboard");
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || "Đăng nhập thất bại";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}
input {
  width: 100%;
  margin: 5px 0;
}
button {
  width: 100%;
  margin-top: 10px;
}
</style>
