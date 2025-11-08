<template>
  <div class="staff-edit">
    <div class="header">
      <h2>Cập nhật nhân viên</h2>
      <button class="btn back" @click="$router.push('/staffs')">
        ← Quay lại
      </button>
    </div>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <form v-else @submit.prevent="handleUpdateStaff" class="form-container">
      <div class="form-group">
        <label>Mã nhân viên</label>
        <input v-model="form.MSNV" readonly />
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

      <div class="btn-container">
        <button type="submit" class="btn save">💾 Lưu thay đổi</button>
        <button type="button" class="btn cancel" @click="$router.push('/staffs')">❌ Hủy</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateStaff, getStaffs } from "../../services/staff.service.js"; // service

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const form = reactive({
  MSNV: "",
  HoTenNV: "",
  Chucvu: "",
  Diachi: "",
  SoDienThoai: "",
});

const fetchStaff = async () => {
  try {
    const staffs = await getStaffs();
    const staff = staffs.find(s => s.MSNV === route.params.id);

    if (!staff) {
      alert("Không tìm thấy nhân viên!");
      router.push("/staffs");
      return;
    }

    form.MSNV = staff.MSNV;
    form.HoTenNV = staff.HoTenNV;
    form.Chucvu = staff.Chucvu || "";
    form.Diachi = staff.Diachi || "";
    form.SoDienThoai = staff.SoDienThoai || "";

  } catch (err) {
    console.error(err);
    alert("Không tải được thông tin nhân viên!");
    router.push("/staffs");
  } finally {
    loading.value = false;
  }
};

const handleUpdateStaff = async () => {
  if (!form.HoTenNV || !form.Chucvu) {
    alert("Họ tên và chức vụ là bắt buộc!");
    return;
  }

  try {
    const data = {
      HoTenNV: form.HoTenNV,
      Chucvu: form.Chucvu,
      Diachi: form.Diachi,
      SoDienThoai: form.SoDienThoai,
    };

    const res = await updateStaff(form.MSNV, data);
    alert(`${res.message || "Cập nhật nhân viên thành công"}`);
    router.push("/staffs");
  } catch (err) {
    console.error(err);
    const msg = err.message || err?.response?.data?.message || "Lỗi khi cập nhật nhân viên!";
    alert(`${msg}`);
  }
};

onMounted(fetchStaff);
</script>

<style scoped>
.staff-edit {
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
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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

.btn.save {
  background-color: #42a5f5;
  color: white;
}

.btn.save:hover {
  background-color: #1e88e5;
}

.btn.cancel {
  background-color: #90caf9;
  color: #0d47a1;
}

.btn.cancel:hover {
  background-color: #64b5f6;
}

.loading {
  text-align: center;
  color: #555;
}
</style>
