<template>
  <div class="book-card" @click="$emit('view-detail', book.MaSach)">
    <div class="image-wrapper">
      <img :src="getImageUrl(book.HinhAnh)" alt="Ảnh sách" />
    </div>

    <div class="info">
      <h3 class="title">{{ book.TenSach }}</h3>
      <p class="author">Tác giả: {{ book.TacGia || "Không rõ" }}</p>
      <p class="publisher">Tên NXB: {{ book.TenNXB || "Không rõ" }}</p>
    </div>

    <div class="actions">
      <button class="details-btn">Xem chi tiết</button>
      <button
        v-if="isUser"
        class="borrow-btn"
        :disabled="book.SoQuyen === 0"
        @click.stop="borrowBook"
      >
        {{ book.SoQuyen === 0 ? "Hết sách" : "Mượn sách" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import borrowService from "../services/borrow.service.js";

const props = defineProps({
  book: Object,
  isUser: Boolean
});

const getImageUrl = (path) =>
  path ? `http://localhost:3000${path}` : "/placeholder.png";

const borrowBook = async () => {
  try {
    await borrowService.requestBorrow(props.book.MaSach);
    alert(`Yêu cầu mượn sách "${props.book.TenSach}" đã gửi, chờ admin duyệt!`);
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};
</script>

<style scoped>
.book-card {
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 12px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
}
.image-wrapper {
  width: 100%;
  height: 230px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info { margin-top: 8px; }
.title { font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #222; min-height: 40px; }
.author, .publisher { font-size: 0.85rem; color: #555; margin: 2px 0; }

.actions {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}
.details-btn {
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: background-color 0.2s;
}
.details-btn:hover { background-color: #1258a1; }

.borrow-btn {
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: background-color 0.2s;
}
.borrow-btn:hover { background-color: #1e7e34; }
.borrow-btn:disabled { background-color: #ccc; cursor: not-allowed; }
</style>
