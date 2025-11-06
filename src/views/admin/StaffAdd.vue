<template>
  <div class="staff-add">
    <h2>Thêm nhân viên</h2>
    <StaffForm
      submit-url="http://localhost:3000/api/admin/staffs"
      submit-method="post"
      submit-text="Thêm nhân viên"
      @success="$router.push('/staffs')"
    />
  </div>
</template>

<script setup>
import StaffForm from '../../components/StaffForm.vue';
</script>

<style scoped>
.staff-add { max-width: 600px; margin: 0 auto; }
h2 { color: #1976d2; margin-bottom: 20px; text-align: center; }
</style>
