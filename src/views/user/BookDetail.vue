<template>
  <div class="book-detail" v-if="book">
    <div class="container">
      <div class="image-section">
        <img :src="getImageUrl(book.HinhAnh)" :alt="book.TenSach" />
      </div>

      <div class="info-section">
        <h1 class="title">{{ book.TenSach }}</h1>

        <p class="author">
          <strong>Tác giả:</strong> {{ book.TacGia || "Không rõ" }}
        </p>

        <p class="publisher">
          <strong>Nhà xuất bản:</strong> {{ getPublisherName(book.MaNXB) }}
        </p>

        <p class="year">
          <strong>Năm xuất bản:</strong> {{ book.NamXuatBan || "Không rõ" }}
        </p>

        <p class="quantity">
          <strong>Số lượng còn: </strong>
          <span :class="book.SoQuyen > 0 ? 'in-stock' : 'out-of-stock'">
            {{ book.SoQuyen || 0 }}
          </span>
        </p>

        <p v-if="book.MoTa" class="description">
          <strong>Mô tả:</strong> {{ book.MoTa }}
        </p>

        <button
          class="borrow-btn"
          :disabled="book.SoQuyen === 0 || borrowing"
          @click="handleBorrow"
        >
          {{
            book.SoQuyen === 0
              ? "Hết sách"
              : borrowing
              ? "Đang mượn..."
              : "Mượn sách"
          }}
        </button>
      </div>
    </div>
  </div>

  <div v-else class="loading">Đang tải sách...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBook } from "../../services/book.service.js";
import borrowService from "../../services/borrow.service.js";
import { getReaderToken } from "../../services/readerAuth.service.js";
import API from "../../services/api.server.js";

const book = ref(null);
const publishers = ref([]);
const borrowing = ref(false);
const route = useRoute();
const router = useRouter();

const fetchBook = async () => {
  try {
    book.value = await getBook(route.params.id);
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết sách:", err);
    alert("Không thể lấy chi tiết sách.");
  }
};

const fetchPublishers = async () => {
  try {
    const res = await API.get("/publishers");
    publishers.value = res.data || [];
  } catch (err) {
    console.error("Lỗi khi lấy danh sách NXB:", err);
  }
};

const getPublisherName = (maNXB) => {
  const pub = publishers.value.find(
    (p) => String(p._id || p.MaNXB) === String(maNXB)
  );
  return pub ? pub.TenNXB : "Không rõ";
};

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
    await borrowService.borrow({ MaSach: book.value.MaSach });
    book.value.SoQuyen -= 1;
    alert(`Bạn đã gửi yêu cầu mượn sách "${book.value.TenSach}" thành công!`);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Mượn sách thất bại!");
  } finally {
    borrowing.value = false;
  }
};

const getImageUrl = (path) =>
  path ? `http://localhost:3000${path}` : "/placeholder.png";

onMounted(async () => {
  await Promise.all([fetchBook(), fetchPublishers()]);
});
</script>

<style scoped>
.book-detail {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.loading {
  text-align: center;
  padding: 50px;
  font-weight: bold;
  color: #555;
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 900px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
.image-section {
  flex: 1 1 300px;
  max-width: 350px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  transition: transform 0.3s;
}
.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.image-section:hover {
  transform: scale(1.03);
}
.info-section {
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 8px;
}
.author,
.publisher,
.year,
.quantity,
.description {
  font-size: 1rem;
  color: #333;
}
.description {
  margin-top: 8px;
  line-height: 1.4;
}
.in-stock {
  color: green;
  font-weight: 600;
}
.out-of-stock {
  color: red;
  font-weight: 600;
}
.borrow-btn {
  margin-top: 15px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.borrow-btn:disabled {
  background-color: #888;
  cursor: not-allowed;
}
.borrow-btn:hover:not(:disabled) {
  background-color: #357abd;
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
  .image-section {
    max-width: 100%;
    height: 300px;
  }
  .info-section {
    width: 100%;
  }
}
</style>
