<template>
  <div class="container mt-4">
    <h2>Danh sách sách</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Mã sách</th>
          <th>Tên sách</th>
          <th>Giá</th>
          <th>Số quyển</th>
          <th>Năm XB</th>
          <th>Tác giả</th>
          <th>NXB</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.MaSach">
          <td>{{ book.MaSach }}</td>
          <td>{{ book.TenSach }}</td>
          <td>{{ book.DonGia }}</td>
          <td>{{ book.SoQuyen }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>{{ book.TacGia }}</td>
          <td>{{ book.MaNXB }}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click="editBook(book)">Sửa</button>
            <button class="btn btn-sm btn-danger" @click="deleteBook(book.MaSach)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const books = ref([]);

const fetchBooks = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/books");
    books.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteBook = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa?")) return;
  try {
    await axios.delete(`http://localhost:3000/api/books/${id}`);
    books.value = books.value.filter(b => b.MaSach !== id);
  } catch (err) {
    console.error(err);
  }
};

const editBook = (book) => {
  alert(`Bạn muốn sửa sách: ${book.TenSach} (Chức năng form sẽ làm riêng)`);
};

onMounted(fetchBooks);
</script>
