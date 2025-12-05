<template>
  <div class="home">
    <div class="home-header">
      <div class="filters">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">-- Tất cả thể loại --</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.TenTL }}
          </option>
        </select>
      </div>

      <div class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">‹</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">›</button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <span class="spinner"></span> Đang tải sách...
    </div>

    <div v-else-if="booksFiltered.length === 0" class="empty">
      Không tìm thấy sách nào.
    </div>
    <div v-else class="book-list">
      <BookCard
        v-for="book in paginatedBooks"
        :key="book.MaSach"
        :book="book"
        @view-detail="goDetail"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getBooks } from "../../services/book.service.js";
import API from "../../services/api.server.js";
import BookCard from "../../components/BookCard.vue";

const books = ref([]);
const categories = ref([]);
const publishers = ref([]);
const loading = ref(true);
const selectedCategory = ref("");

const currentPage = ref(1);
const perPage = 12;

const router = useRouter();
const route = useRoute();

const fetchPublishers = async () => {
  try {
    const res = await API.get("/publishers");
    publishers.value = res.data || [];
  } catch (err) {
    console.error(err);
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
  const pub = publishers.value.find(
    (p) => String(p._id || p.MaNXB) === String(maNXB)
  );
  return pub ? pub.TenNXB : "Không rõ";
};

const fetchBooks = async () => {
  loading.value = true;
  try {
    const data = await getBooks();
    books.value = data.map((b) => ({
      ...b,
      TenNXB: getPublisherName(b.MaNXB),
    }));
  } catch (err) {
    console.error(err);
    alert("Không thể tải danh sách sách.");
  } finally {
    loading.value = false;
  }
};

const booksFiltered = computed(() => {
  const searchQuery = route.query.q || "";
  return books.value.filter((b) => {
    const matchesCategory = selectedCategory.value
      ? b.MaTL === selectedCategory.value
      : true;

    const matchesSearch = searchQuery
      ? (b.TenSach?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (b.TacGia || "").toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });
});

const totalPages = computed(() => Math.ceil(booksFiltered.value.length / perPage));
const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return booksFiltered.value.slice(start, start + perPage);
});

const prevPage = () => { if(currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if(currentPage.value < totalPages.value) currentPage.value++; };

const goDetail = (id) => router.push(`/user/book/${id}`);

onMounted(async () => {
  await Promise.all([fetchPublishers(), fetchBooks(), fetchCategories()]);
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 30px;
  background: #f5f6fa;
  min-height: 100vh;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  min-width: 220px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: all 0.2s;
}
.filter-select:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-btn:hover:not(:disabled) {
  background: #2563eb;
}

.loading, .empty {
  text-align: center;
  color: #64748b;
  font-style: italic;
  font-size: 1.1rem;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #cbd5e1;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}
.book-list > * {
  transition: transform 0.3s, box-shadow 0.3s;
}
.book-list > *:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .home { padding: 20px; }
  .book-list { gap: 18px; }
  .filter-select { min-width: 160px; }
  .home-header { flex-direction: column; align-items: stretch; gap: 10px; }
}
</style>
