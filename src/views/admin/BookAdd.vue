<template>
  <div class="book-add">
    <h2>Thêm sách mới</h2>

    <div v-if="loading" class="loading">Đang tải danh sách NXB...</div>

    <BookForm 
      v-else
      :publishers="publishers"
      submit-url="http://localhost:3000/api/admin/books"
      submit-method="post"
      submit-text="Thêm sách"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BookForm from '../../components/BookForm.vue';

const publishers = ref([]);
const loading = ref(true);

const fetchPublishers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/admin/publishers');
    publishers.value = res.data;
  } catch (err) {
    console.error(err);
    alert('Không thể tải danh sách nhà xuất bản!');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPublishers);
</script>

<style scoped>
.book-add {
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
