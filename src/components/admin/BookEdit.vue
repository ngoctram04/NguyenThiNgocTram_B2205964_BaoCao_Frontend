<template>
  <div class="book-edit">
    <h2>Cập nhật thông tin sách</h2>

    <form @submit.prevent="updateBook">
      <div class="form-group">
        <label>Tên sách:</label>
        <input v-model="book.TenSach" required />
      </div>

      <div class="form-group">
        <label>Giá:</label>
        <input v-model.number="book.DonGia" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label>Số quyển:</label>
        <input v-model.number="book.SoQuyen" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label>Năm xuất bản:</label>
        <input v-model.number="book.NamXuatBan" type="number" required />
      </div>

      <div class="form-group">
        <label>Tác giả:</label>
        <input v-model="book.TacGia" required />
      </div>

      <div class="form-group">
        <label>Nhà xuất bản:</label>
        <input v-model="book.MaNXB" required />
      </div>

      <div class="form-group">
        <label>Hình ảnh <span class="required">*</span></label>
        <input type="file" accept="image/*" @change="onFileChange" />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="Preview" />
        </div>
      </div>

      <button type="submit" class="btn submit">Cập nhật sách</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const book = ref({
  TenSach: "",
  DonGia: 0,
  SoQuyen: 0,
  NamXuatBan: new Date().getFullYear(),
  TacGia: "",
  MaNXB: "",
  HinhAnh: "",
});

const preview = ref("");
let selectedFile = null;

const fetchBook = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/admin/books/${route.params.id}`);
    book.value = res.data;

    preview.value = book.value.HinhAnh ? `http://localhost:3000${book.value.HinhAnh}` : "";
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu sách:", err);
    alert("Không thể tải thông tin sách!");
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  preview.value = URL.createObjectURL(file);
};

const updateBook = async () => {
  try {
    const formData = new FormData();
    for (const key in book.value) {
      if (key !== "_id") formData.append(key, book.value[key]);
    }

    if (selectedFile) {
      formData.append("HinhAnh", selectedFile);
    }

    const res = await axios.put(
      `http://localhost:3000/api/admin/books/${route.params.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert(res.data.message || "Cập nhật sách thành công!");
    router.push("/books");
  } catch (err) {
    console.error("Lỗi khi cập nhật sách:", err);
    alert("Cập nhật thất bại!");
  }
};

onMounted(fetchBook);
</script>

<style scoped>
.book-edit {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
}

input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.preview {
  margin-top: 10px;
}

.preview img {
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
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
