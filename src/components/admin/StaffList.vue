<template>
  <div class="container mt-4">
    <h2>Danh sách nhân viên</h2>
    <table class="table table-bordered">
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
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const staffs = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/staffs");
    staffs.value = res.data;
  } catch (err) {
    console.error(err);
  }
});
</script>
