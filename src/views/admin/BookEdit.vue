<template>
  <div class="book-edit">
    <h2>Cập nhật sách</h2>
    <BookForm 
      :initial-data="book"
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

const fetchBook = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/admin/books/${route.params.id}`);
    book.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Không thể tải thông tin sách!");
  }
};

onMounted(fetchBook);
</script>

<style scoped>
.book-edit { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
