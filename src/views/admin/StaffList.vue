<template>
  <div>
    <h2>Quản lý nhân viên</h2>
    <button @click="showAddForm = true">Thêm nhân viên</button>

    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>Mã NV</th>
          <th>Họ tên</th>
          <th>Chức vụ</th>
          <th>Địa chỉ</th>
          <th>SĐT</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff._id">
          <td>{{ staff.MSNV }}</td>
          <td>{{ staff.HoTenNV }}</td>
          <td>{{ staff.Chucvu }}</td>
          <td>{{ staff.Diachi }}</td>
          <td>{{ staff.SoDienThoai }}</td>
          <td>
            <button @click="editStaff(staff)">Sửa</button>
            <button @click="deleteStaff(staff._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddForm" class="form-modal">
      <h3>{{ isEditing ? 'Sửa nhân viên' : 'Thêm nhân viên' }}</h3>
      <form @submit.prevent="submitForm">
        <div>
          <label>MSNV:</label>
          <input v-model="form.MSNV" :readonly="isEditing" required />
        </div>
        <div>
          <label>Họ tên:</label>
          <input v-model="form.HoTenNV" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="form.Password" type="password" :required="!isEditing" />
        </div>
        <div>
          <label>Chức vụ:</label>
          <select v-model="form.Chucvu" required>
            <option value="admin">Admin</option>
            <option value="staff">Nhân viên</option>
          </select>
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input v-model="form.Diachi" />
        </div>
        <div>
          <label>SĐT:</label>
          <input v-model="form.SoDienThoai" />
        </div>
        <button type="submit">{{ isEditing ? 'Cập nhật' : 'Thêm' }}</button>
        <button @click.prevent="cancelForm">Hủy</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import staffService from "@/services/staff.service.js";

const staffs = ref([]);
const showAddForm = ref(false);
const isEditing = ref(false);
const form = ref({
  MSNV: "",
  HoTenNV: "",
  Password: "",
  Chucvu: "staff",
  Diachi: "",
  SoDienThoai: "",
});

const fetchStaffs = async () => {
  try {
    const res = await staffService.getAll();
    staffs.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Không tải được danh sách nhân viên");
  }
};

const editStaff = (staff) => {
  isEditing.value = true;
  showAddForm.value = true;
  form.value = { ...staff, Password: "" };
};

const cancelForm = () => {
  showAddForm.value = false;
  isEditing.value = false;
  form.value = {
    MSNV: "",
    HoTenNV: "",
    Password: "",
    Chucvu: "staff",
    Diachi: "",
    SoDienThoai: "",
  };
};

const submitForm = async () => {
  try {
    if (isEditing.value) {
      const dataToUpdate = { ...form.value };
      if (!dataToUpdate.Password) delete dataToUpdate.Password;
      await staffService.update(form.value.MSNV, dataToUpdate);
      alert("Cập nhật thành công");
    } else {
      await staffService.create(form.value);
      alert("Thêm nhân viên thành công");
    }
    cancelForm();
    fetchStaffs();
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra");
  }
};

const deleteStaff = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
  try {
    await staffService.delete(id);
    alert("Xóa thành công");
    fetchStaffs();
  } catch (err) {
    console.error(err);
    alert("Xóa thất bại");
  }
};

onMounted(fetchStaffs);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
th, td {
  padding: 8px 12px;
  text-align: left;
}
th {
  background: #1976d2;
  color: white;
}
tr:nth-child(even) {
  background: #f2f2f2;
}

.form-modal {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  background: white;
}
form div {
  margin-bottom: 10px;
}
form input, form select {
  padding: 5px;
  width: 200px;
}
form button {
  margin-right: 10px;
}
</style>
