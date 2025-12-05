<template>
  <form @submit.prevent="handleSubmit" class="category-form">
    <div class="form-group">
      <label for="TenTL">Tên thể loại <span class="required">*</span></label>
      <input
        type="text"
        id="TenTL"
        v-model="form.TenTL"
        placeholder="Nhập tên thể loại"
        required
      />
    </div>

    <div class="form-group">
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
import { reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  category: { type: Object, default: () => ({}) },
  submitText: { type: String, default: "Lưu" },
});

const emits = defineEmits(["submit"]);

const router = useRouter();

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
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
}

input, textarea {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.required {
  color: red;
}

.btn-primary {
  background: #1a73e8;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1669c1;
}
</style>
