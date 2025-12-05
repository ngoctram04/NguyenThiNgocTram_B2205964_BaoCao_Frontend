<template>
  <div class="category-add">
    <h2>Thêm thể loại mới</h2>

    <div v-if="loading" class="loading">Đang tải...</div>

    <CategoryForm v-else :submitText="'Thêm'" @submit="handleAdd" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CategoryForm from "../../components/CategoryForm.vue";
import categoryService from "../../services/category.service.js";

const router = useRouter();
const loading = ref(true);

onMounted(() => {
  loading.value = false;
});

const handleAdd = async (data) => {
  try {
    await categoryService.create(data);
    alert("Thêm thể loại thành công");
    router.push("/categories");
  } catch (err) {
    alert("Lỗi: " + err.message);
  }
};
</script>

<style scoped>
.category-add {
  max-width: 600px;
  margin: 40px auto;
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #555;
}
</style>
