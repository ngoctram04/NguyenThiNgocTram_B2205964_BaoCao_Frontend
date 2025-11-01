<template>
  <div class="container mt-4">
    <h2>Danh sách độc giả</h2>
    <table class="table table-bordered">
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
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const readers = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/readers");
    readers.value = res.data;
  } catch (err) {
    console.error(err);
  }
});
</script>
