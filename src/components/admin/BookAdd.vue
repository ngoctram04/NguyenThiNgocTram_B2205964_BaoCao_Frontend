<template>
  <div class="book-add">
    <h2>Thêm sách mới</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-group">
        <label>Tên sách <span class="required">*</span></label>
        <input v-model="book.TenSach" required placeholder="Nhập tên sách" />
      </div>

      <div class="form-group">
        <label>Giá <span class="required">*</span></label>
        <input v-model.number="book.DonGia" type="number" min="0" required placeholder="Nhập giá sách" />
      </div>

      <div class="form-group">
        <label>Số quyển <span class="required">*</span></label>
        <input v-model.number="book.SoQuyen" type="number" min="0" required placeholder="Nhập số quyển" />
      </div>

      <div class="form-group">
        <label>Năm xuất bản <span class="required">*</span></label>
        <input v-model.number="book.NamXuatBan" type="number" min="1900" required placeholder="Nhập năm xuất bản" />
      </div>

      <div class="form-group">
        <label>Tác giả / Nguồn gốc</label>
        <input v-model="book.TacGia" placeholder="Nhập tên tác giả hoặc nguồn gốc" />
      </div>

      <div class="form-group">
        <label>NXB</label>
        <input v-model="book.MaNXB" placeholder="Nhập nhà xuất bản" />
      </div>

      <div class="form-group">
        <label>Hình ảnh <span class="required">*</span></label>
        <input type="file" @change="onFileChange" accept="image/*" required />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="preview" />
        </div>
      </div>

      <button type="submit" class="btn submit">Thêm sách</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const book = ref({
  TenSach: "",
  DonGia: 0,
  SoQuyen: 0,
  NamXuatBan: new Date().getFullYear(),
  TacGia: "",
  MaNXB: "",
});

const selectedFile = ref(null);
const preview = ref(null);

const onFileChange = (e) => {
  selectedFile.value = e.target.files[0];
  if (selectedFile.value) {
    preview.value = URL.createObjectURL(selectedFile.value);
  } else {
    preview.value = null;
  }
};

const submitForm = async () => {
  if (!selectedFile.value) {
    alert("Hình ảnh là bắt buộc!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("TenSach", book.value.TenSach);
    formData.append("DonGia", book.value.DonGia);
    formData.append("SoQuyen", book.value.SoQuyen);
    formData.append("NamXuatBan", book.value.NamXuatBan);
    formData.append("TacGia", book.value.TacGia);
    formData.append("MaNXB", book.value.MaNXB);
    formData.append("HinhAnh", selectedFile.value);

    const res = await axios.post("http://localhost:3000/api/admin/books", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(`Thêm sách thành công! Mã sách: ${res.data.book.MaSach}`);
    router.push("/books");
  } catch (err) {
    console.error("Lỗi khi thêm sách:", err);
    alert("Thêm sách thất bại!");
  }
};
</script>

<style scoped>
.book-add {
  max-width: 500px;
  margin: 30px auto;
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.08);
}

h2 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-left: 2px;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

input[type="file"] {
  padding: 4px 6px;
}

.preview {
  margin-top: 8px;
}

.preview img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn.submit {
  background-color: #42a5f5;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  width: 100%;
  transition: all 0.2s;
}

.btn.submit:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}
</style>
