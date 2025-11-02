<template>
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="form-group">
      <label>Tên sách <span class="required">*</span></label>
      <input v-model="book.TenSach" placeholder="Nhập tên sách" required />
    </div>

    <div class="form-group">
      <label>Giá <span class="required">*</span></label>
      <input v-model.number="book.DonGia" type="number" min="0" placeholder="Nhập giá sách" required />
    </div>

    <div class="form-group">
      <label>Số quyển <span class="required">*</span></label>
      <input v-model.number="book.SoQuyen" type="number" min="0" placeholder="Nhập số quyển" required />
    </div>

    <div class="form-group">
      <label>Năm xuất bản</label>
      <input v-model.number="book.NamXuatBan" type="number" min="1900" placeholder="Nhập năm xuất bản" />
    </div>

    <div class="form-group">
      <label>Tác giả / Nguồn gốc</label>
      <input v-model="book.TacGia" placeholder="Nhập tác giả hoặc nguồn gốc" />
    </div>

    <div class="form-group">
      <label>NXB</label>
      <input v-model="book.MaNXB" placeholder="Nhập nhà xuất bản" />
    </div>

    <div class="form-group">
      <label>Hình ảnh <span class="required">*</span></label>
      <input type="file" @change="onFileChange" accept="image/*" />
      <div v-if="preview" class="preview">
        <img :src="preview" alt="Preview" />
      </div>
    </div>

    <button type="submit" class="btn submit">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  initialData: Object,
  submitUrl: String,
  submitMethod: { type: String, default: 'post' },
  submitText: { type: String, default: 'Lưu' }
});

const router = useRouter();
const book = ref({ ...props.initialData } || {
  TenSach: '',
  DonGia: 0,
  SoQuyen: 0,
  NamXuatBan: new Date().getFullYear(),
  TacGia: '',
  MaNXB: '',
  HinhAnh: ''
});

const preview = ref('');
let selectedFile = null;

const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `http://localhost:3000${path}`;
};

watch(() => props.initialData, (newVal) => {
  if (newVal) book.value = { ...newVal };
  preview.value = getImageUrl(book.value.HinhAnh);
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  preview.value = URL.createObjectURL(file);
};

const onSubmit = async () => {
  try {
    const formData = new FormData();
    for (const key in book.value) {
      if (key !== '_id') formData.append(key, book.value[key]);
    }
    if (selectedFile) formData.append('HinhAnh', selectedFile);

    const res = await axios({
      method: props.submitMethod,
      url: props.submitUrl,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert(res.data.message || 'Thao tác thành công!');
    router.back();
  } catch (err) {
    console.error(err);
    alert('Thao tác thất bại!');
  }
};
</script>

<style scoped>
.form-group { margin-bottom: 16px; display: flex; flex-direction: column; }
label { font-weight: 500; margin-bottom: 6px; }
input { padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; }
.preview { margin-top: 8px; }
.preview img { max-width: 120px; max-height: 160px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc; }
.btn.submit { background-color: #42a5f5; color: white; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; width: 100%; transition: all 0.2s; }
.btn.submit:hover { background-color: #1e88e5; transform: translateY(-2px); }
.required { color: red; margin-left: 2px; }
</style>
