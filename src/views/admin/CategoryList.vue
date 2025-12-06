<template>
  <div class="category-list">
    <div class="header">
      <input
        v-model="searchText"
        placeholder="Tìm thể loại..."
        class="search-input"
      />
      <button class="btn add" @click="goAdd">+ Thêm thể loại</button>
    </div>

    <div v-if="loading" class="loading">Đang tải danh sách...</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã thể loại</th>
            <th>Tên thể loại</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in filteredCategories" :key="cat.MaTL">
            <td>{{ cat.MaTL }}</td>
            <td>{{ cat.TenTL }}</td>
            <td>{{ cat.MoTa || "-" }}</td>
            <td>
              <button class="btn edit" @click="goEdit(cat.MaTL)">Sửa</button>
              <button class="btn delete" @click="handleDelete(cat.MaTL)">Xóa</button>
            </td>
          </tr>

          <tr v-if="filteredCategories.length === 0">
            <td colspan="4" class="empty">Không tìm thấy thể loại nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import categoryService from "../../services/category.service.js";

const router = useRouter();
const categories = ref([]);
const loading = ref(true);
const searchText = ref("");

const fetchCategories = async () => {
  loading.value = true;
  try {
    categories.value = await categoryService.getAll();
  } catch (err) {
    alert("Lỗi tải danh sách: " + err.message);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);

const goAdd = () => router.push("/categories/add");
const goEdit = (id) => router.push(`/categories/edit/${id}`);

const handleDelete = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa thể loại này?")) return;
  try {
    await categoryService.delete(id);
    alert("Xóa thành công!");
    fetchCategories();
  } catch (err) {
    alert("Lỗi xóa: " + err.message);
  }
};

const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    (c.TenTL || "").toLowerCase().includes(searchText.value.toLowerCase())
  )
);
</script>

<style scoped>
.category-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  min-width: 200px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn.add {
  background-color: #42a5f5;
  color: white;
}

.btn.edit {
  background-color: #64b5f6;
  color: white;
  margin-right: 6px;
}

.btn.delete {
  background-color: #ef5350;
  color: white;
}

.btn:hover {
  opacity: 0.9;
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
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 15px;
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
  padding: 20px;
}

.loading {
  text-align: center;
  color: #555;
}
</style>
