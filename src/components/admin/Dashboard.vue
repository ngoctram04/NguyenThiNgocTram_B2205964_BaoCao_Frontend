<template>
  <div class="dashboard">
    <h2>Thống kê nhanh</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Sách</h3>
        <p>{{ booksCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Độc giả</h3>
        <p>{{ readersCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Nhân viên</h3>
        <p>{{ staffsCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Đang mượn</h3>
        <p>{{ borrowedCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booksCount: 0,
      readersCount: 0,
      staffsCount: 0,
      borrowedCount: 0,
    };
  },
  mounted() {
    // Tạm thời hiển thị 0 nếu chưa có dữ liệu từ API
    this.fetchStats();
  },
  methods: {
    fetchStats() {
      // TODO: Thay bằng API thực tế sau
      this.booksCount = 0;
      this.readersCount = 0;
      this.staffsCount = 0;
      this.borrowedCount = 0;
    },
  },
};
</script>

<style scoped>
.dashboard {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

h2 {
  margin-bottom: 20px;
  color: #1976d2;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

.stat-card h3 {
  margin-bottom: 12px;
  color: #0d47a1;
  font-weight: 500;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1976d2;
}
</style>
