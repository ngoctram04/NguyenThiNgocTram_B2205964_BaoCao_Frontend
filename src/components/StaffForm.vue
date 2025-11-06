<template>
  <form @submit.prevent="submitForm" class="staff-form">
    <div class="form-group">
      <label>Mã nhân viên</label>
      <input v-model="formData.MSNV" :disabled="isEdit" required />
    </div>

    <div class="form-group">
      <label>Họ tên</label>
      <input v-model="formData.HoTenNV" required />
    </div>

    <div class="form-group">
      <label>Chức vụ</label>
      <input v-model="formData.ChucVu" required />
    </div>

    <div class="form-group">
      <label>Địa chỉ</label>
      <input v-model="formData.DiaChi" />
    </div>

    <div class="form-group">
      <label>Số điện thoại</label>
      <input v-model="formData.SoDienThoai" />
    </div>

    <div class="form-group">
      <label>Mật khẩu</label>
      <input type="password" v-model="formData.Password" :required="!isEdit" />
    </div>

    <button class="btn submit">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  submitUrl: String,
  submitMethod: String,
  submitText: String
});

const emit = defineEmits(['success']);
const formData = ref({ ...props.initialData });
const isEdit = computed(() => props.submitMethod === 'put');

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
});

const submitForm = async () => {
  try {
    await axios[props.submitMethod](props.submitUrl, formData.value);
    alert(`${props.submitText} thành công!`);
    emit('success');
  } catch (err) {
    console.error(err);
    alert(`${props.submitText} thất bại!`);
  }
};
</script>

<style scoped>
.staff-form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; }
label { font-weight: 500; color: #0d47a1; margin-bottom: 4px; }
input { padding: 8px; border: 1px solid #ccc; border-radius: 6px; }
.btn.submit { background: #1976d2; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }
</style>
