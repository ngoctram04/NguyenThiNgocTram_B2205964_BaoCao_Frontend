<template>
  <div class="publisher-edit">
    <h2>Cập nhật nhà xuất bản</h2>
    <PublisherForm
      :initial-data="publisher"
      :submit-url="`http://localhost:3000/api/admin/publishers/${publisher.MaNXB}`"
      submit-method="put"
      submit-text="Cập nhật NXB"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import PublisherForm from '../../components/PublisherForm.vue';

const route = useRoute();
const publisher = ref({});

const fetchPublisher = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/admin/publishers/${route.params.id}`);
    publisher.value = res.data;
  } catch (err) {
    console.error(err);
    alert('Không thể tải thông tin NXB!');
  }
};

onMounted(fetchPublisher);
</script>

<style scoped>
.publisher-edit { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
