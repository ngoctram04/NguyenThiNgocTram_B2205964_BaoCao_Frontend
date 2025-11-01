<template>
  <div class="container-fluid mt-4">
    <h2 class="mb-4">Dashboard</h2>
    <div class="row g-4">
      <div class="col-sm-6 col-md-3" v-for="card in cards" :key="card.title">
        <div
          class="card text-white shadow-sm h-100 border-0"
          :class="card.bg"
        >
          <div class="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text fs-3 fw-bold">{{ card.count }}</p>
            </div>
            <div class="icon fs-1">
              <i :class="card.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header">
            <h5>Thống kê mượn sách gần đây</h5>
          </div>
          <div class="card-body">
            <p>Biểu đồ hoặc danh sách các mượn/trả sách có thể thêm ở đây</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cards = ref([
  { title: "Sách", count: 0, bg: "bg-primary", icon: "bi bi-book" },
  { title: "Độc giả", count: 0, bg: "bg-success", icon: "bi bi-people" },
  { title: "Nhân viên", count: 0, bg: "bg-warning", icon: "bi bi-person-badge" },
  { title: "NXB", count: 0, bg: "bg-danger", icon: "bi bi-building" },
]);

onMounted(async () => {
  try {
    const books = await axios.get("http://localhost:3000/api/admin/books");
    const readers = await axios.get("http://localhost:3000/api/admin/readers");
    const staffs = await axios.get("http://localhost:3000/api/admin/staffs");
    const publishers = await axios.get("http://localhost:3000/api/admin/categories"); // hoặc /publishers

    cards.value[0].count = books.data.length;
    cards.value[1].count = readers.data.length;
    cards.value[2].count = staffs.data.length;
    cards.value[3].count = publishers.data.length;
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.icon {
  opacity: 0.6;
}
</style>
