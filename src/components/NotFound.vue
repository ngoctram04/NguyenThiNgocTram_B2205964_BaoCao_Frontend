<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Trang bạn tìm kiếm không tồn tại </p>
    <router-link to="/user" class="btn-home">Quay về trang chủ</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  color: #444;
}

.not-found h1 {
  font-size: 80px;
  margin-bottom: 15px;
  color: #ff6b6b;
}

.not-found p {
  font-size: 18px;
  margin-bottom: 20px;
}

.btn-home {
  padding: 10px 25px;
  background-color: #4f46e5;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.btn-home:hover {
  background-color: #4338ca;
}
</style>
