<template>
  <div class="category-edit">
    <h2>Cập nhật thể loại</h2>

    <div v-if="!category" class="loading">Đang tải dữ liệu...</div>

    <CategoryForm
      v-else
      :category="category"
      :submitText="'Cập nhật'"
      @submit="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import CategoryForm from "../../components/CategoryForm.vue";
import categoryService from "../../services/category.service.js";

const router = useRouter();
const route = useRoute();

const category = ref(null);

onMounted(async () => {
  try {
    category.value = await categoryService.getById(route.params.id);
  } catch (err) {
    alert("Lỗi: " + err.message);
    router.push("/categories");
  }
});

const handleUpdate = async (data) => {
  try {
    await categoryService.update(route.params.id, data);
    alert("Cập nhật thể loại thành công");
    router.push("/categories");
  } catch (err) {
    alert("Lỗi: " + err.message);
  }
};
</script>

<style scoped>
.category-edit {
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
