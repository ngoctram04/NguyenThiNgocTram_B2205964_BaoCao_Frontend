<template>
  <form @submit.prevent="submitForm" class="publisher-form">
    <div class="form-group">
      <label>Tên NXB <span class="required">*</span></label>
      <input
        v-model="form.TenNXB"
        type="text"
        placeholder="Nhập tên nhà xuất bản"
        required
      />
    </div>

    <div class="form-group">
      <label>Địa chỉ</label>
      <input
        v-model="form.DiaChi"
        type="text"
        placeholder="Nhập địa chỉ nhà xuất bản"
      />
    </div>

    <button type="submit" class="btn submit">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import PublisherService from "../services/publisher.service.js";

const props = defineProps({
  submitText: { type: String, default: "Gửi" },
  initialData: { type: Object, default: () => ({}) },
});

const router = useRouter();
const form = ref({ MaNXB: null, TenNXB: "", DiaChi: "" });

watch(
  () => props.initialData,
  (val) => {
    if (val && Object.keys(val).length > 0) {
      form.value = { ...val };
    }
  },
  { immediate: true }
);

const submitForm = async () => {
  if (!form.value.TenNXB?.trim()) {
    alert("Tên NXB là bắt buộc!");
    return;
  }

  try {
    if (form.value.MaNXB) {

      await PublisherService.update(form.value.MaNXB, {
        TenNXB: form.value.TenNXB.trim(),
        DiaChi: form.value.DiaChi?.trim() || "",
      });
      alert("Cập nhật nhà xuất bản thành công!");
    } else {

      await PublisherService.create({
        TenNXB: form.value.TenNXB.trim(),
        DiaChi: form.value.DiaChi?.trim() || "",
      });
      alert("Thêm nhà xuất bản thành công!");
    }

    router.push("/publishers");
  } catch (err) {
    console.error("PublisherForm error:", err);
    alert(err.response?.data?.message || "Thao tác thất bại!");
  }
};
</script>

<style scoped>
.publisher-form {
  background: #f9fafc;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
}

.required {
  color: red;
  margin-left: 2px;
}

input[type="text"] {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.btn.submit {
  background-color: #42a5f5;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: all 0.2s;
}

.btn.submit:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}
</style>
