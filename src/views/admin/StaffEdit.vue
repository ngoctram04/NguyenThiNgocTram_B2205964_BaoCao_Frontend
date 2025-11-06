<template>
  <div class="staff-edit">
    <h2>Cập nhật nhân viên</h2>
    <StaffForm
      v-if="staff.MSNV"
      :initial-data="staff"
      :submit-url="`http://localhost:3000/api/admin/staffs/${staff.MSNV}`"
      submit-method="put"
      submit-text="Cập nhật nhân viên"
      @success="$router.push('/staffs')"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import StaffForm from '../../components/StaffForm.vue';

const route = useRoute();
const staff = ref({});

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/admin/staffs/${route.params.id}`);
    staff.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Không thể tải thông tin nhân viên!");
  }
});
</script>

<style scoped>
.staff-edit { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
