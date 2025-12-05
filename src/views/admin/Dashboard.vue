<template>
  <div class="dashboard">
    <h2>Thống kê tổng quan</h2>

    <div class="stats-grid">
      <div class="card">
        <div class="card-header"><h3>Tổng số sách</h3></div>
        <p class="number">{{ totalBooks }}</p>
      </div>
      <div class="card">
        <div class="card-header"><h3>Tổng số độc giả</h3></div>
        <p class="number">{{ totalReaders }}</p>
      </div>
      <div class="card">
        <div class="card-header"><h3>Tổng số nhân viên</h3></div>
        <p class="number">{{ totalStaffs }}</p>
      </div>
      <div class="card">
        <div class="card-header"><h3>Tổng số NXB</h3></div>
        <p class="number">{{ totalPublishers }}</p>
      </div>
    </div>

    <h2>Thống kê sách mượn</h2>
    <div class="filters">
      <label>
        Chọn tháng:
        <select v-model="selectedMonth" @change="fetchAdvancedStats">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>

      <label>
        Chọn năm:
        <select v-model="selectedYear" @change="fetchAdvancedStats">
          <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
        </select>
      </label>
    </div>

    <div class="stats-grid">
      <div class="card accent">
        <div class="card-header"><h3>Sách đang mượn</h3></div>
        <p class="number">{{ booksBorrowed }}</p>
      </div>
      <div class="card accent">
        <div class="card-header"><h3>Sách đã trả</h3></div>
        <p class="number">{{ booksReturned }}</p>
      </div>
      <div class="card warning">
        <div class="card-header"><h3>Trả trễ hạn</h3></div>
        <p class="number">{{ booksLate }}</p>
      </div>
      <div class="card danger">
        <div class="card-header"><h3>Sách bị phạt</h3></div>
        <p class="number">{{ booksFined }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardService from "@/services/dashboard.service.js";

const totalBooks = ref(0);
const totalReaders = ref(0);
const totalStaffs = ref(0);
const totalPublishers = ref(0);

const booksBorrowed = ref(0);
const booksReturned = ref(0);
const booksLate = ref(0);
const booksFined = ref(0);

const selectedMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(new Date().getFullYear());

const yearRange = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear - 5; y <= currentYear + 1; y++) {
    years.push(y);
  }
  return years;
});

const fetchOverview = async () => {
  totalBooks.value = await DashboardService.getTotalBooks();
  totalReaders.value = await DashboardService.getTotalReaders();
  totalStaffs.value = await DashboardService.getTotalStaffs();
  totalPublishers.value = await DashboardService.getTotalPublishers();
};

const fetchAdvancedStats = async () => {
  const res = await DashboardService.getBooksStatsByMonthYear(
    selectedMonth.value,
    selectedYear.value
  );
  booksBorrowed.value = res.borrowed;
  booksReturned.value = res.returned;
  booksLate.value = res.late;
  booksFined.value = res.fined;
};

onMounted(() => {
  fetchOverview();
  fetchAdvancedStats();
});
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #1976d2;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.card-header h3 {
  font-size: 16px;
  color: #555;
  margin: 0;
}

.number {
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
  color: #1976d2;
}

.card.accent .number { color: #ff9800; }
.card.warning .number { color: #f57c00; }
.card.danger .number { color: #ef5350; }

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.filters label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #555;
}
.filters select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-top: 4px;
}
</style>
