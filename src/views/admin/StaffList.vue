<template>
  <div class="staff-list">
    <div class="header">
      <h2>Danh sách nhân viên</h2>
      <button class="btn add" @click="$router.push('/staffs/add')">
        + Thêm nhân viên
      </button>
    </div>

    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="staff in staffs" :key="staff.MSNV">
            <td>{{ staff.MSNV }}</td>
            <td>{{ staff.HoTenNV }}</td>
            <td>{{ staff.Chucvu || "-" }}</td>
            <td>{{ staff.Diachi || "-" }}</td>
            <td>{{ staff.SoDienThoai || "-" }}</td>
            <td>
              <button
                class="btn edit"
                @click="$router.push('/staffs/edit/' + staff.MSNV)"
              >
                Sửa
              </button>
              <button class="btn delete" @click="deleteStaff(staff.MSNV)">
                Xóa
              </button>
            </td>
          </tr>

          <tr v-if="staffs.length === 0">
            <td colspan="6" class="empty">Chưa có nhân viên nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStaffs, deleteStaff as deleteStaffService } from "@/services/staff.service.js";

const staffs = ref([]);
const loading = ref(true);

const fetchStaffs = async () => {
  loading.value = true;
  try {
    staffs.value = await getStaffs();
  } catch (err) {
    console.error(err);
    alert(err.message || "Không tải được danh sách nhân viên!");
  } finally {
    loading.value = false;
  }
};

const deleteStaff = async (msnv) => {
  if (!confirm("Bạn có chắc muốn xóa nhân viên này không?")) return;
  try {
    await deleteStaffService(msnv);
    staffs.value = staffs.value.filter((s) => s.MSNV !== msnv);
    alert("Xóa thành công!");
  } catch (err) {
    console.error(err);
    alert(err.message || "Xóa thất bại!");
  }
};

onMounted(fetchStaffs);
</script>

<style scoped>
.staff-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #1976d2;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th,
td {
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
  transition: background 0.2s;
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

.btn.add:hover {
  background-color: #1e88e5;
}

.btn.edit {
  background-color: #64b5f6;
  color: white;
  margin-right: 6px;
}

.btn.edit:hover {
  background-color: #1e88e5;
}

.btn.delete {
  background-color: #ef5350;
  color: white;
}

.btn.delete:hover {
  background-color: #e53935;
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
