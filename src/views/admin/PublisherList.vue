<template>
  <div class="publisher-list">
    <div class="header">
      <h2>Danh sách nhà xuất bản</h2>
      <button class="btn add" @click="$router.push('/publishers/add')">+ Thêm NXB</button>
    </div>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher.MaNXB">
            <td>{{ publisher.MaNXB }}</td>
            <td>{{ publisher.TenNXB }}</td>
            <td>{{ publisher.DiaChi || '-' }}</td>
            <td>
              <button class="btn edit" @click="$router.push('/publishers/edit/' + publisher.MaNXB)">Sửa</button>
              <button class="btn delete" @click="deletePublisher(publisher)">Xóa</button>
            </td>
          </tr>

          <tr v-if="publishers.length === 0">
            <td colspan="4" class="empty">Chưa có nhà xuất bản nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const publishers = ref([]);
const loading = ref(true);

const fetchPublishers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/admin/publishers');
    publishers.value = res.data;
  } catch (err) {
    console.error(err);
    alert('Không thể lấy danh sách NXB!');
  } finally {
    loading.value = false;
  }
};

const deletePublisher = async (publisher) => {
  if (!confirm(`Bạn có chắc muốn xóa NXB "${publisher.TenNXB}" không?`)) return;

  try {
    const res = await axios.delete(`http://localhost:3000/api/admin/publishers/${publisher.MaNXB}`);
    publishers.value = publishers.value.filter(p => p.MaNXB !== publisher.MaNXB);
    alert(res.data.message || "Xóa thành công!");
  } catch (err) {
    console.error(err);
    alert("Xóa thất bại!");
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #1976d2;
  font-size: 22px;
  font-weight: 600;
}

.loading {
  text-align: center;
  color: #555;
  font-style: italic;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
}

tr:hover {
  background: #f1f5f9;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn.add {
  background-color: #42a5f5;
  color: white;
}

.btn.add:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}

.btn.edit {
  background-color: #64b5f6;
  color: white;
  margin-right: 6px;
}

.btn.edit:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}

.btn.delete {
  background-color: #ef5350;
  color: white;
}

.btn.delete:hover {
  background-color: #c62828;
  transform: translateY(-2px);
}

.empty {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 10px 0;
}
</style>
