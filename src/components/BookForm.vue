<template>
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="form-group">
      <label>Tên sách *</label>
      <input v-model="book.TenSach" placeholder="Nhập tên sách" required />
    </div>

    <div class="form-group">
      <label>Giá *</label>
      <input type="number" v-model.number="book.DonGia" min="0" required />
    </div>

    <div class="form-group">
      <label>Số quyển *</label>
      <input type="number" v-model.number="book.SoQuyen" min="0" required />
    </div>

    <div class="form-group">
      <label>Năm xuất bản</label>
      <input type="number" v-model.number="book.NamXuatBan" min="1900" />
    </div>

    <div class="form-group">
      <label>Tác giả / Nguồn gốc</label>
      <input v-model="book.TacGia" placeholder="Nhập tác giả" />
    </div>

    <div class="form-group">
      <label>Nhà xuất bản *</label>
      <select v-model="book.MaNXB" required>
        <option value="">-- Chọn NXB --</option>
        <option v-for="nxb in publishers" :key="nxb._id" :value="nxb._id">
          {{ nxb.TenNXB }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Hình ảnh</label>
      <input type="file" @change="onFileChange" accept="image/*" />
      <div v-if="preview" class="preview">
        <img :src="preview" alt="Preview" />
      </div>
    </div>

    <button type="submit" class="btn submit">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import API from "../services/api.server.js";
import { useRouter } from "vue-router";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  publishers: { type: Array, default: () => [] },
  submitUrl: { type: String, required: true },
  submitMethod: { type: String, default: "post" },
  submitText: { type: String, default: "Lưu" },
});

const router = useRouter();
const book = ref({
  TenSach: "",
  DonGia: 0,
  SoQuyen: 1,
  NamXuatBan: new Date().getFullYear(),
  TacGia: "",
  MaNXB: "",
  HinhAnh: "",
  ...props.initialData,
});

const preview = ref("");
let selectedFile = null;

onMounted(() => {
  if (props.initialData?.HinhAnh) {
    preview.value = getImageUrl(props.initialData.HinhAnh);
  }
});

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      book.value = { ...newVal };
      preview.value = getImageUrl(book.value.HinhAnh);
      selectedFile = null;
    }
  },
  { deep: true }
);

const getImageUrl = (path) => (path ? (path.startsWith("http") ? path : `http://localhost:3000${path}`) : "");

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  preview.value = URL.createObjectURL(file);
};

const onSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("TenSach", book.value.TenSach || "");
    formData.append("DonGia", (book.value.DonGia || 0).toString());
    formData.append("SoQuyen", (book.value.SoQuyen || 1).toString());
    formData.append("NamXuatBan", book.value.NamXuatBan ? book.value.NamXuatBan.toString() : "");
    formData.append("TacGia", book.value.TacGia || "");
    formData.append("MaNXB", book.value.MaNXB || "");

    if (selectedFile) {
      formData.append("HinhAnh", selectedFile);
    }

    const res = await API({
      method: props.submitMethod,
      url: props.submitUrl,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(res.data.message || "Thao tác thành công!");
    router.back();
  } catch (err) {
    console.error("BookForm submit error:", err);
    alert(err.response?.data?.message || "Thao tác thất bại!");
  }
};
</script>

<style scoped>
.form-group { margin-bottom: 16px; display: flex; flex-direction: column; }
input, select { padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; }
.preview img { max-width: 120px; max-height: 160px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc; margin-top: 8px; }
.btn.submit { background-color: #42a5f5; color: white; padding: 10px 16px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 500; transition: all 0.2s; }
.btn.submit:hover { background-color: #1e88e5; transform: translateY(-2px); }
</style>
