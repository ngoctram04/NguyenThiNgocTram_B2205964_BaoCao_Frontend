<template>
  <div class="home">
    <h2>📚 Danh sách sách</h2>

    <div v-if="loading" class="loading">Đang tải sách...</div>

    <div v-else>
      <div v-if="books.length === 0" class="empty">Không tìm thấy sách nào.</div>

      <div v-else class="book-list">
        <BookCard
          v-for="book in books"
          :key="book.MaSach"
          :book="book"
          @view-detail="goDetail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getBooks } from "../../services/book.service.js";
import BookCard from "../../components/BookCard.vue";

const books = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchBooks = async () => {
  loading.value = true;
  try {
    books.value = await getBooks();
  } catch (err) {
    console.error(err);
    alert("Không thể tải danh sách sách.");
  } finally {
    loading.value = false;
  }
};

const goDetail = (id) => router.push(`/user/book/${id}`);

onMounted(fetchBooks);
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px 20px;
}
h2 { color: #1976d2; font-weight: 700; text-align: center; margin-bottom: 0.5rem; }
.loading, .empty { text-align: center; color: #555; font-style: italic; margin: 20px 0; }
.book-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
</style>
