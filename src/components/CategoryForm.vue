<template>
  <form @submit.prevent="handleSubmit" class="category-form">
    <div class="form-row">
      <label for="TenTL">Tên thể loại <span class="required">*</span></label>
      <input
        type="text"
        id="TenTL"
        v-model="form.TenTL"
        placeholder="Nhập tên thể loại"
        required
      />
    </div>

    <div class="form-row">
      <label for="MoTa">Mô tả</label>
      <textarea
        id="MoTa"
        v-model="form.MoTa"
        placeholder="Nhập mô tả (tùy chọn)"
      ></textarea>
    </div>

    <button type="submit" class="btn-primary">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  category: { type: Object, default: () => ({}) },
  submitText: { type: String, default: "Lưu" },
});
const emits = defineEmits(["submit"]);

const form = reactive({
  TenTL: props.category.TenTL || "",
  MoTa: props.category.MoTa || "",
});

watch(
  () => props.category,
  (newVal) => {
    form.TenTL = newVal.TenTL || "";
    form.MoTa = newVal.MoTa || "";
  }
);

const handleSubmit = () => {
  emits("submit", { ...form });
};
</script>

<style scoped>
.category-form {
  max-width: 600px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.form-row label {
  width: 150px;
  font-weight: 600;
  font-size: 15px;
}

.form-row input,
.form-row textarea {
  flex: 1;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  transition: 0.2s;
}

.form-row input:focus,
.form-row textarea:focus {
  border-color: #1a73e8;
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
}

textarea {
  min-height: 90px;
  resize: vertical;
}

.required {
  color: #e53935;
}

.btn-primary {
  width: 100%;
  background: #1a73e8;
  color: white;
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #1669c1;
}
</style>
