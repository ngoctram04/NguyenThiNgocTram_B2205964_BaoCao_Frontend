<template>
  <div class="book-edit">
    <h2>Cập nhật sách</h2>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <BookForm
      v-else
      :initial-data="book"
      :publishers="publishers"
      :submit-url="`http://localhost:3000/api/admin/books/${book.MaSach}`"
      submit-method="put"
      submit-text="Cập nhật sách"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BookForm from '../../components/BookForm.vue';

const route = useRoute();
const book = ref({});
const publishers = ref([]);
const loading = ref(true);

const fetchBook = async () => {
  const res = await axios.get(`http://localhost:3000/api/admin/books/${route.params.id}`);
  book.value = res.data;
};


const fetchPublishers = async () => {
  const res = await axios.get('http://localhost:3000/api/admin/publishers');
  publishers.value = res.data;
};


onMounted(async () => {
  try {
    await Promise.all([fetchBook(), fetchPublishers()]);
  } catch (err) {
    console.error(err);
    alert('Không thể tải dữ liệu sách hoặc NXB!');
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.book-edit {
  max-width: 650px;
  margin: 0 auto;
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.loading {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
