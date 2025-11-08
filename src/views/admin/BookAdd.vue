<template>
  <div class="book-add">
    <h2>Thêm sách mới</h2>

    <div v-if="loading" class="loading">Đang tải danh sách NXB...</div>

    <div v-else-if="publishers.length === 0" class="loading">
      Không có NXB.
      <button class="btn-retry" @click="fetchPublishers">Thử lại</button>
    </div>

    <BookForm
      v-else
      :key="publishers.length"
      :publishers="publishers"
      submit-url="/books"
      submit-method="post"
      submit-text="Thêm sách"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../../services/api.server.js";
import BookForm from "../../components/BookForm.vue";

const publishers = ref([]);
const loading = ref(true);

const fetchPublishers = async () => {
  loading.value = true;
  try {
    const res = await API.get("/publishers");
    publishers.value = res.data || [];
  } catch (err) {
    console.error(err);
    publishers.value = [];
    alert("Không thể tải danh sách NXB!");
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
  margin: 20px 0;
}

.btn-retry {
  margin-left: 10px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background-color: #42a5f5;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}

.btn-retry:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}
</style>
