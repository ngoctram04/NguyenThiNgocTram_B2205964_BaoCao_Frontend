<template>
  <div class="reader-list">
    <div class="header">
      <h2>Danh sách độc giả</h2>
    </div>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã độc giả</th>
            <th>Họ lót</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>Phái</th>
            <th>Địa chỉ</th>
            <th>Điện thoại</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in readers" :key="r.MaDocGia">
            <td>{{ r.MaDocGia }}</td>
            <td>{{ r.HoLot }}</td>
            <td>{{ r.Ten }}</td>
            <td>{{ r.NgaySinh }}</td>
            <td>{{ r.Phai }}</td>
            <td>{{ r.DiaChi }}</td>
            <td>{{ r.DienThoai }}</td>
          </tr>
          <tr v-if="readers.length === 0">
            <td colspan="7" class="empty">Chưa có độc giả nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getReaders } from "@/services/reader.service.js";

const readers = ref([]);
const loading = ref(true);

const fetchReaders = async () => {
  loading.value = true;
  try {
    readers.value = await getReaders();
  } catch (err) {
    alert(err.message || "Không tải được danh sách độc giả");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchReaders);
</script>

<style scoped>
.reader-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #1976d2;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 15px;
}

th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
}

tr:hover {
  background: #f1f5f9;
}

.empty {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px;
}

.loading {
  text-align: center;
  color: #555;
}
</style>
