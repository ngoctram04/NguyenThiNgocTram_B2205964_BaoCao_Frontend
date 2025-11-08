<template>
  <form @submit.prevent="submitForm" class="staff-form">
    <div class="form-group">
      <label>Mã nhân viên</label>
      <input v-model="formData.MSNV" :disabled="isEdit || isDefaultAdmin" required />
    </div>

    <div class="form-group">
      <label>Họ tên</label>
      <input v-model="formData.HoTenNV" required />
    </div>

    <div class="form-group">
      <label>Chức vụ</label>
      <select v-model="formData.Chucvu" :disabled="isDefaultAdmin" required>
        <option value="admin">Admin</option>
        <option value="nhanvien">Nhân viên</option>
      </select>
    </div>

    <div class="form-group">
      <label>Địa chỉ</label>
      <input v-model="formData.Diachi" />
    </div>

    <div class="form-group">
      <label>Số điện thoại</label>
      <input v-model="formData.SoDienThoai" />
    </div>

    <div class="form-group">
      <label>Mật khẩu</label>
      <input type="password" v-model="formData.Password" :required="!isEdit" />
      <small v-if="isEdit">Để trống nếu không muốn đổi mật khẩu</small>
    </div>

    <button type="submit" class="btn submit">{{ props.submitText }}</button>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from "vue";
import axios from "axios";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  submitUrl: { type: String, required: true },
  submitMethod: { type: String, default: "post" },
  submitText: { type: String, default: "Gửi" },
});

const emit = defineEmits(["success"]);

const formData = reactive({
  MSNV: "",
  HoTenNV: "",
  Chucvu: "nhanvien",
  Diachi: "",
  SoDienThoai: "",
  Password: "",
  ...props.initialData,
});

const isEdit = computed(() => props.submitMethod.toLowerCase() === "put");

const isDefaultAdmin = computed(() => formData.MSNV === "AD001");

watch(
  () => props.initialData,
  (val) => {
    if (val && Object.keys(val).length > 0) {
      Object.assign(formData, val);
    }
  },
  { immediate: true }
);

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token") || "";
    const payload = { ...formData };
    if (isEdit.value && !payload.Password) delete payload.Password;

    await axios({
      method: props.submitMethod,
      url: props.submitUrl,
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(`${props.submitText} thành công!`);
    emit("success");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || `${props.submitText} thất bại!`);
  }
};
</script>

<style scoped>
.staff-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  color: #0d47a1;
  margin-bottom: 4px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

small {
  color: #555;
  font-size: 12px;
  margin-top: 2px;
}

.btn.submit {
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn.submit:hover {
  background: #1565c0;
  transform: translateY(-2px);
}
</style>
