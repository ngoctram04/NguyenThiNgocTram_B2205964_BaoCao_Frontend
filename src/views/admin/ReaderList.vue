<template>
  <div class="reader-list">
    <div class="header">
      <div class="search-filter">
        <input
          v-model="searchText"
          placeholder="Tìm độc giả..."
          class="search-input"
        />

        <select v-model="filterGender" class="filter-select">
          <option value="">-- Chọn phái --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
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
          <tr v-for="r in filteredReaders" :key="r.MaDocGia">
            <td>{{ r.MaDocGia }}</td>
            <td>{{ r.HoLot }}</td>
            <td>{{ r.Ten }}</td>
            <td>{{ formatDate(r.NgaySinh) }}</td>
            <td>{{ r.Phai }}</td>
            <td>{{ r.DiaCHi || "-" }}</td>
            <td>{{ r.DienThoai || "-" }}</td>
          </tr>
          <tr v-if="filteredReaders.length === 0">
            <td colspan="7" class="empty">Không tìm thấy độc giả nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getReaders } from "@/services/reader.service.js";

const readers = ref([]);
const loading = ref(true);

const searchText = ref("");
const filterGender = ref("");
const filterAddress = ref("");

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN");
};

const fetchReaders = async () => {
  loading.value = true;
  try {
    readers.value = await getReaders();
  } catch (err) {
    alert(err.response?.data?.message || "Không tải được danh sách độc giả");
  } finally {
    loading.value = false;
  }
};

const filteredReaders = computed(() =>
  readers.value.filter(r => {
    const searchMatch =
      String(r.MaDocGia).toLowerCase().includes(searchText.value.toLowerCase()) ||
      (r.Ten || "").toLowerCase().includes(searchText.value.toLowerCase()) ||
      (r.HoLot || "").toLowerCase().includes(searchText.value.toLowerCase());

    const genderMatch = filterGender.value
      ? r.Phai === filterGender.value
      : true;

    const addressMatch = filterAddress.value
      ? (r.DiaChi || "").toLowerCase().includes(filterAddress.value.toLowerCase())
      : true;

    return searchMatch && genderMatch && addressMatch;
  })
);

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
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input, .filter-select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  width: 150px;
}

.filter-select {
  width: 130px;
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
