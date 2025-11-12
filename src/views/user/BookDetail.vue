<template>
  <div class="book-detail" v-if="book">
    <div class="container">
      <div class="image-section">
        <img :src="getImageUrl(book.HinhAnh)" alt="Ảnh sách" />
      </div>

      <div class="info-section">
        <h1 class="title">{{ book.TenSach }}</h1>
        <p class="author"><strong>Tác giả:</strong> {{ book.TacGia || 'Không rõ' }}</p>
        <p class="publisher"><strong>Nhà xuất bản:</strong> {{ book.MaNXB || 'Không rõ' }}</p>
        <p class="year"><strong>Năm xuất bản:</strong> {{ book.NamXuatBan || 'Không rõ' }}</p>
        <p class="quantity"><strong>Số lượng còn:</strong> {{ book.SoQuyen || 0 }}</p>

        <button 
          class="borrow-btn" 
          :disabled="book.SoQuyen === 0 || borrowing"
          @click="handleBorrow"
        >
          {{ book.SoQuyen === 0 ? 'Hết sách' : (borrowing ? 'Đang mượn...' : 'Mượn sách') }}
        </button>
      </div>
    </div>
  </div>

  <div v-else class="loading">Đang tải sách...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBook, borrowBook as apiBorrowBook } from "../../services/book.service.js";
import { getReaderToken } from "../../services/readerAuth.service.js";

const book = ref(null);
const borrowing = ref(false);
const route = useRoute();
const router = useRouter();

// Lấy chi tiết sách
const fetchBook = async () => {
  try {
    book.value = await getBook(route.params.id);
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết sách:", err.message || err);
    alert("Không thể lấy chi tiết sách.");
  }
};

// Mượn sách – chỉ kiểm tra đăng nhập khi nhấn nút
const handleBorrow = async () => {
  const token = getReaderToken();
  if (!token) {
    alert("Bạn cần đăng nhập để mượn sách!");
    router.push("/user/login");
    return;
  }

  if (!book.value || book.value.SoQuyen === 0) return;

  borrowing.value = true;
  try {
    await apiBorrowBook(book.value.MaSach); // gọi backend
    book.value.SoQuyen -= 1; // giảm số lượng còn
    alert(`Bạn đã mượn sách "${book.value.TenSach}" thành công!`);
  } catch (err) {
    console.error(err);
    alert("Mượn sách thất bại!");
  } finally {
    borrowing.value = false;
  }
};

// Xử lý ảnh
const getImageUrl = (path) => path ? `http://localhost:3000${path}` : "/placeholder.png";

onMounted(fetchBook);
</script>

<style scoped>
.book-detail { padding: 20px; display: flex; justify-content: center; }
.loading { text-align: center; padding: 50px; font-weight: bold; }
.container { display: flex; flex-wrap: wrap; gap: 20px; max-width: 900px; background-color: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.image-section { flex: 1 1 300px; max-width: 350px; border-radius: 8px; overflow: hidden; background-color: #f0f0f0; }
.image-section img { width: 100%; height: 100%; object-fit: cover; }
.info-section { flex: 2 1 400px; display: flex; flex-direction: column; gap: 10px; }
.title { font-size: 1.8rem; font-weight: 600; color: #1976d2; margin-bottom: 8px; }
.author, .publisher, .year, .quantity { font-size: 1rem; color: #333; }
.borrow-btn { margin-top: 15px; padding: 10px 20px; font-size: 1rem; font-weight: 500; color: white; background-color: #4a90e2; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; }
.borrow-btn:disabled { background-color: #888; cursor: not-allowed; }
.borrow-btn:hover:not(:disabled) { background-color: #357ABD; }
</style>
