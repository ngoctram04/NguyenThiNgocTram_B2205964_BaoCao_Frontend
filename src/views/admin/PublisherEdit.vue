<template>
  <div class="publisher-edit">
    <h2>Cập nhật nhà xuất bản</h2>

    <div v-if="loading" class="loading">Đang tải thông tin NXB...</div>

    <PublisherForm
      v-else
      :initial-data="publisher"
      :submit-url="`/publishers/${publisher.MaNXB}`"
      submit-method="put"
      submit-text="Cập nhật NXB"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PublisherForm from "../../components/PublisherForm.vue";
import PublisherService from "../../services/publisher.service.js";

const route = useRoute();
const publisher = ref({});
const loading = ref(true);

const fetchPublisher = async () => {
  loading.value = true;
  try {
    const res = await PublisherService.getById(route.params.id);
    publisher.value = res.data;
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Không thể tải thông tin NXB!");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPublisher);
</script>

<style scoped>
.publisher-edit {
  max-width: 600px;
  margin: 0 auto;
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
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
