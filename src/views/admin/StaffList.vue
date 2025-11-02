<template>
  <div class="staff-list">
    <h2>Danh sách nhân viên</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>Điện thoại</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="staff in staffs" :key="staff.MSNV">
            <td>{{ staff.MSNV }}</td>
            <td>{{ staff.HoTenNV }}</td>
            <td>{{ staff.ChucVu }}</td>
            <td>{{ staff.DiaChi }}</td>
            <td>{{ staff.SoDienThoai }}</td>
          </tr>
          <tr v-if="staffs.length === 0">
            <td colspan="5" class="empty">Chưa có nhân viên nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const staffs = ref([]);

const fetchStaffs = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/staffs");
    staffs.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchStaffs);
</script>

<style scoped>
.staff-list {
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
  min-width: 600px;
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
