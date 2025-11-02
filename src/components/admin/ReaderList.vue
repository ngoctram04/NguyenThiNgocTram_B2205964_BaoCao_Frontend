<template>
  <div class="reader-list">
    <h2>Danh sách độc giả</h2>
    <div class="table-container">
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
          <tr v-for="reader in readers" :key="reader.MaDocGia">
            <td>{{ reader.MaDocGia }}</td>
            <td>{{ reader.HoLot }}</td>
            <td>{{ reader.Ten }}</td>
            <td>{{ reader.NgaySinh }}</td>
            <td>{{ reader.Phai }}</td>
            <td>{{ reader.DiaChi }}</td>
            <td>{{ reader.DienThoai }}</td>
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
import axios from "axios";

const readers = ref([]);

const fetchReaders = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/readers");
    readers.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchReaders);
</script>

<style scoped>
.reader-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

h2 {
  margin-bottom: 20px;
  font-weight: 600;
  color: #1976d2;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
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
}
</style>
