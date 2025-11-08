<template>
  <div class="staff-add">
    <div class="header">
      <h2>Thêm nhân viên</h2>
      <button class="btn back" @click="$router.push('/staffs')">
        ← Quay lại
      </button>
    </div>

    <form @submit.prevent="addStaff" class="form-container">
      <div class="form-group">
        <label>Mã nhân viên *</label>
        <input v-model.trim="form.MSNV" placeholder="VD: NV001" required />
      </div>

      <div class="form-group">
        <label>Họ tên *</label>
        <input v-model.trim="form.HoTenNV" placeholder="Nhập họ tên" required />
      </div>

      <div class="form-group">
        <label>Chức vụ *</label>
        <select v-model="form.Chucvu" required>
          <option value="">-- Chọn chức vụ --</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div class="form-group">
        <label>Địa chỉ</label>
        <input v-model.trim="form.Diachi" placeholder="Nhập địa chỉ" />
      </div>

      <div class="form-group">
        <label>Số điện thoại</label>
        <input v-model.trim="form.SoDienThoai" placeholder="VD: 0912345678" />
      </div>

      <div class="form-group">
        <label>Mật khẩu *</label>
        <input type="password" v-model="form.Password" placeholder="******" required />
      </div>

      <div class="btn-container">
        <button type="submit" class="btn add">+ Thêm nhân viên</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { createStaff } from "../../services/staff.service.js";

const router = useRouter();

const form = reactive({
  MSNV: "",
  HoTenNV: "",
  Chucvu: "",
  Diachi: "",
  SoDienThoai: "",
  Password: ""
});

const addStaff = async () => {
  if (!form.MSNV || !form.HoTenNV || !form.Password || !form.Chucvu) {
    alert("Vui lòng điền đầy đủ các trường bắt buộc!");
    return;
  }

  try {
    const res = await createStaff(form);
    alert(`${res.message || "Tạo nhân viên thành công"}`);
    router.push("/staffs");
  } catch (err) {
    console.error(err);
    const msg = err.message || err?.response?.data?.message || "Lỗi khi thêm nhân viên!";
    alert(`${msg}`);
  }
};
</script>

<style scoped>
.staff-add {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h2 {
  color: #1976d2;
  font-weight: 600;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #0d47a1;
  font-weight: 500;
  margin-bottom: 5px;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  transition: border 0.2s;
}

input:focus,
select:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 3px rgba(66, 165, 245, 0.4);
}

.btn-container {
  text-align: right;
  margin-top: 10px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn.add {
  background-color: #42a5f5;
  color: white;
}

.btn.add:hover {
  background-color: #1e88e5;
}

.btn.back {
  background-color: #90caf9;
  color: #0d47a1;
}

.btn.back:hover {
  background-color: #64b5f6;
}
</style>
