<template>
  <div class="publisher-add">
    <h2>Thêm nhà xuất bản mới</h2>

    <div v-if="loading" class="loading">Đang tải...</div>

    <PublisherForm v-else submit-text="Thêm NXB" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PublisherForm from "../../components/PublisherForm.vue";

const loading = ref(true);

onMounted(() => {
  loading.value = false;
});
</script>

<style scoped>
.publisher-add {
  max-width: 600px;
  margin: 0 auto;
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #555;
}
</style>
