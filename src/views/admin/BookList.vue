<template>
  <div class="book-list">
    <div class="header">
      <h2>Danh sách sách</h2>
      <button class="btn add" @click="$router.push('/books/add')">+ Thêm sách</button>
    </div>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã sách</th>
            <th>Hình ảnh</th>
            <th>Tên sách</th>
            <th>Giá</th>
            <th>Số quyển</th>
            <th>Năm XB</th>
            <th>Tác giả</th>
            <th>Nhà xuất bản</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.MaSach">
            <td>{{ book.MaSach }}</td>
            <td>
              <img
                v-if="book.HinhAnh"
                :src="getImageUrl(book.HinhAnh)"
                alt="Bìa sách"
                class="book-img"
              />
              <span v-else class="no-img">Chưa có</span>
            </td>
            <td>{{ book.TenSach }}</td>
            <td>{{ formatPrice(book.DonGia) }}</td>
            <td>{{ book.SoQuyen }}</td>
            <td>{{ book.NamXuatBan }}</td>
            <td>{{ book.TacGia }}</td>
            <td>{{ getPublisherName(book.MaNXB) }}</td>
            <td>
              <button
                class="btn edit"
                @click="$router.push('/books/edit/' + book.MaSach)"
              >Sửa</button>
              <button class="btn delete" @click="deleteBook(book)">Xóa</button>
            </td>
          </tr>

          <tr v-if="books.length === 0">
            <td colspan="9" class="empty">Chưa có sách nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const books = ref([]);
const publishers = ref([]);
const loading = ref(true);


const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:3000${path}`;
};

const fetchBooks = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/books");
  books.value = res.data;
};


const fetchPublishers = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/publishers");
  publishers.value = res.data;
};

const getPublisherName = (maNXB) => {
  const pub = publishers.value.find(
    (p) => String(p.MaNXB) === String(maNXB)
  );
  return pub ? pub.TenNXB : "Không rõ";
};



const deleteBook = async (book) => {
  if (!confirm(`Bạn có chắc muốn xóa sách "${book.TenSach}" không?`)) return;

  try {
    const res = await axios.delete(
      `http://localhost:3000/api/admin/books/${book.MaSach}`
    );
    books.value = books.value.filter((b) => b.MaSach !== book.MaSach);
    alert(res.data.message || "Xóa sách thành công!");
  } catch (err) {
    console.error(err);
    alert("Xóa sách thất bại!");
  }
};


onMounted(async () => {
  try {
    await Promise.all([fetchBooks(), fetchPublishers()]);
  } catch (err) {
    console.error(err);
    alert("Không thể tải dữ liệu!");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.book-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
h2 {
  color: #1976d2;
}
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}
th,
td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}
th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
}
tr:hover {
  background: #f1f5f9;
}
.book-img {
  width: 55px;
  height: 75px;
  object-fit: cover;
  border-radius: 6px;
}
.no-img {
  color: #888;
  font-style: italic;
}
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.btn.add {
  background-color: #42a5f5;
  color: white;
}
.btn.edit {
  background-color: #64b5f6;
  color: white;
  margin-right: 6px;
}
.btn.delete {
  background-color: #ef5350;
  color: white;
}
.empty {
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>
