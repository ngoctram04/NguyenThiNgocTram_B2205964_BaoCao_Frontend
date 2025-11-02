<template>
  <div class="publisher-list">
    <h2>Danh mục / Nhà xuất bản</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pub in publishers" :key="pub.MaNXB">
            <td>{{ pub.MaNXB }}</td>
            <td>{{ pub.TenNXB }}</td>
            <td>{{ pub.DiaChi }}</td>
          </tr>
          <tr v-if="publishers.length === 0">
            <td colspan="3" class="empty">Chưa có nhà xuất bản nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const publishers = ref([]);

const fetchPublishers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/publishers");
    publishers.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchPublishers);
</script>

<style scoped>
.publisher-list {
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
  min-width: 500px;
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
