<template>
  <div class="book-edit">
    <h2>Chỉnh sửa sách</h2>
    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
    <div v-else-if="!book" class="loading">Không tìm thấy sách</div>
    <BookForm
      v-else
      :key="book.MaSach"
      :initial-data="book"
      :publishers="publishers"
      :submit-url="`/books/${book.MaSach}`"
      submit-method="put"
      submit-text="Cập nhật sách"
      @success="onUpdateSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import API from "../../services/api.server.js";
import BookForm from "../../components/BookForm.vue";

const route = useRoute();
const router = useRouter();

const book = ref(null);
const publishers = ref([]);
const loading = ref(true);

const fetchBook = async () => {
  try {
    const res = await API.get(`/books/${route.params.id}`);
    book.value = res.data || null;
  } catch (err) {
    console.error("fetchBook error:", err);
    book.value = null;
  }
};

const fetchPublishers = async () => {
  try {
    const res = await API.get("/publishers");
    publishers.value = res.data || [];
  } catch (err) {
    console.error("fetchPublishers error:", err);
    publishers.value = [];
  }
};

const onUpdateSuccess = () => {
  alert("Cập nhật sách thành công!");
  router.push("/books"); 
};
onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchBook(), fetchPublishers()]);
  loading.value = false;
});
</script>

<style scoped>
.book-edit {
  max-width: 650px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 12px;
  background: #f9fafc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.loading {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px 0;
}
</style>
