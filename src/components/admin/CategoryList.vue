<template>
  <div class="container mt-4">
    <h2>Danh mục / Nhà xuất bản</h2>
    <table class="table table-bordered">
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
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const publishers = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/publishers");
    publishers.value = res.data;
  } catch (err) {
    console.error(err);
  }
});
</script>
