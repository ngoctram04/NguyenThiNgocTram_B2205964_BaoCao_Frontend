<template>
  <div class="book-add">
    <h2>Thêm sách mới</h2>
    <BookForm 
      submit-url="http://localhost:3000/api/admin/books"
      submit-method="post"
      submit-text="Thêm sách"
    />
  </div>
</template>

<script setup>
import BookForm from '../../components/BookForm.vue';
</script>

<style scoped>
.book-add { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
