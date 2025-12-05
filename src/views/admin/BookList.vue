<template>
  <div class="book-list">
    <div class="header">
      <div class="search-filter">
        <input
          v-model="searchText"
          placeholder="Tìm sách..."
          class="search-input"
        />
        <select v-model="selectedPublisher" class="filter-select">
          <option value="">-- Lọc NXB --</option>
          <option v-for="nxb in publishers" :key="nxb._id" :value="nxb._id">
            {{ nxb.TenNXB }}
          </option>
        </select>
        <select v-model="selectedCategory" class="filter-select">
          <option value="">-- Lọc Thể loại --</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.TenTL }}
          </option>
        </select>
      </div>
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
            <th>Thể loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in paginatedBooks" :key="book.MaSach">
            <td>{{ book.MaSach }}</td>
            <td>
              <img
                v-if="book.HinhAnh"
                :src="getImageUrl(book.HinhAnh)"
                class="book-img"
              />
              <span v-else class="no-img">Chưa có</span>
            </td>
            <td>{{ book.TenSach }}</td>
            <td>{{ formatPrice(book.DonGia) }}</td>
            <td>{{ book.SoQuyen }}</td>
            <td>{{ book.NamXuatBan || "-" }}</td>
            <td>{{ book.TacGia || "-" }}</td>
            <td>{{ getPublisherName(book.MaNXB) }}</td>
            <td>{{ getCategoryName(book.MaTL) }}</td>
            <td>
              <button class="btn edit" @click="editBook(book)">Sửa</button>
              <button class="btn delete" @click="deleteBook(book)">Xóa</button>
            </td>
          </tr>
          <tr v-if="paginatedBooks.length === 0">
            <td colspan="10" class="empty">Không tìm thấy sách nào</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination" v-if="totalPages > 1">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          « Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Sau »</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import API from "../../services/api.server.js";

const books = ref([]);
const publishers = ref([]);
const categories = ref([]);
const loading = ref(true);
const router = useRouter();

const searchText = ref("");
const selectedPublisher = ref("");
const selectedCategory = ref("");

const currentPage = ref(1);
const pageSize = ref(5);

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const getImageUrl = (path) =>
  path ? (path.startsWith("http") ? path : `http://localhost:3000${path}`) : "";

const fetchBooks = async () => {
  try {
    const res = await API.get("/books");
    books.value = res.data || [];
  } catch (err) {
    console.error(err);
    alert("Lấy danh sách sách thất bại!");
  }
};

const fetchPublishers = async () => {
  try {
    const res = await API.get("/publishers");
    publishers.value = res.data || [];
  } catch (err) {
    console.error(err);
    publishers.value = [];
  }
};

const fetchCategories = async () => {
  try {
    const res = await API.get("/categories");
    categories.value = res.data || [];
  } catch (err) {
    console.error(err);
    categories.value = [];
  }
};

const getPublisherName = (maNXB) => {
  const pub = publishers.value.find((p) => String(p._id || p.MaNXB) === String(maNXB));
  return pub ? pub.TenNXB : "Không rõ";
};

const getCategoryName = (maTL) => {
  const cat = categories.value.find((c) => String(c._id || c.MaTL) === String(maTL));
  return cat ? cat.TenTL : "Không rõ";
};

const deleteBook = async (book) => {
  if (!confirm(`Bạn có chắc muốn xóa sách "${book.TenSach}" không?`)) return;
  try {
    await API.delete(`/books/${book.MaSach}`);
    books.value = books.value.filter((b) => b.MaSach !== book.MaSach);
    alert("Xóa sách thành công!");
  } catch (err) {
    console.error(err);
    alert("Xóa sách thất bại!");
  }
};

const editBook = (book) => {
  router.push(`/books/edit/${book.MaSach}`);
};

const filteredBooks = computed(() => {
  currentPage.value = 1;
  return books.value.filter((b) => {
    const matchesText =
      b.TenSach.toLowerCase().includes(searchText.value.toLowerCase()) ||
      (b.TacGia || "").toLowerCase().includes(searchText.value.toLowerCase());
    const matchesPublisher = selectedPublisher.value ? b.MaNXB === selectedPublisher.value : true;
    const matchesCategory = selectedCategory.value ? b.MaTL === selectedCategory.value : true;
    return matchesText && matchesPublisher && matchesCategory;
  });
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredBooks.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / pageSize.value);
});

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchPublishers(), fetchCategories(), fetchBooks()]);
  loading.value = false;
});
</script>
<style scoped>
.book-list { background: #f9fafc; padding: 25px; border-radius: 12px; }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input,
.filter-select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  width: 180px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
}

tr:hover { background: #f1f5f9; }

.book-img { width: 55px; height: 75px; object-fit: cover; border-radius: 6px; }
.no-img { color: #888; font-style: italic; }

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn.add { background-color: #42a5f5; color: white; }
.btn.edit { background-color: #64b5f6; color: white; margin-right: 6px; }
.btn.delete { background-color: #ef5350; color: white; }

.empty { text-align: center; color: #999; font-style: italic; padding: 10px 0; }
.loading { text-align: center; padding: 20px; font-weight: 500; color: #1976d2; }

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination .btn {
  padding: 4px 12px;
  font-size: 0.9rem;
}
</style>
