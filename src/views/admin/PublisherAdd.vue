<template>
  <div class="publisher-add">
    <h2>Thêm nhà xuất bản mới</h2>
    <PublisherForm 
      submit-url="http://localhost:3000/api/admin/publishers"
      submit-method="post"
      submit-text="Thêm NXB"
    />
  </div>
</template>

<script setup>
import PublisherForm from '../../components/PublisherForm.vue';
</script>

<style scoped>
.publisher-add { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
