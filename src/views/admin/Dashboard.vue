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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalBooks = ref(0);
const totalReaders = ref(0);
const totalStaffs = ref(0);

const fetchStats = async () => {
  try {
    const [booksRes, readersRes, staffsRes] = await Promise.all([
      axios.get('http://localhost:3000/api/admin/books'),
      axios.get('http://localhost:3000/api/admin/readers'),
      axios.get('http://localhost:3000/api/admin/staffs'),
    ]);
    totalBooks.value = booksRes.data.length;
    totalReaders.value = readersRes.data.length;
    totalStaffs.value = staffsRes.data.length;
  } catch (err) {
    console.error('Lỗi khi lấy thống kê:', err);
  }
};

onMounted(fetchStats);
</script>

<style scoped>
.dashboard { max-width: 1000px; margin: 0 auto; }
.stats { display: flex; gap: 20px; margin-top: 25px; }
.card { flex: 1; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.08); text-align: center; }
.card h3 { margin-bottom: 12px; color: #1976d2; }
.card p { font-size: 24px; font-weight: 600; }
</style>
