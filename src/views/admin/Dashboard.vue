<template>
  <div class="dashboard">
    <h2>Thống kê tổng quan</h2>
    <div class="stats">
      <div class="card">
        <h3>Tổng số sách</h3>
        <p>{{ totalBooks }}</p>
      </div>
      <div class="card">
        <h3>Tổng số độc giả</h3>
        <p>{{ totalReaders }}</p>
      </div>
      <div class="card">
        <h3>Tổng số nhân viên</h3>
        <p>{{ totalStaffs }}</p>
      </div>
      <div class="card">
        <h3>Tổng số NXB</h3>
        <p>{{ totalPublishers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardService from '@/services/dashboard.service.js';

const totalBooks = ref(0);
const totalReaders = ref(0);
const totalStaffs = ref(0);
const totalPublishers = ref(0);

const fetchStats = async () => {
  totalBooks.value = await DashboardService.getTotalBooks();
  totalReaders.value = await DashboardService.getTotalReaders();
  totalStaffs.value = await DashboardService.getTotalStaffs();
  totalPublishers.value = await DashboardService.getTotalPublishers();
};

onMounted(fetchStats);
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
}
.stats {
  display: flex;
  gap: 20px;
  margin-top: 25px;
  flex-wrap: wrap;
}
.card {
  flex: 1 1 200px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  text-align: center;
}
.card h3 {
  margin-bottom: 12px;
  color: #1976d2;
}
.card p {
  font-size: 24px;
  font-weight: 600;
}
</style>
