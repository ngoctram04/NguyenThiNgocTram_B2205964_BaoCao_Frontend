<template>
  <div class="user-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-top">
        <h1 class="logo" @click="goHome">📚 Library</h1>

        <!-- Search -->
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="onSearch"
            placeholder="Tìm sách theo tên hoặc tác giả..."
          />
          <button @click="onSearch">🔍</button>
        </div>

        <!-- Navigation -->
        <nav class="nav">
          <router-link to="/user" class="nav-link">Home</router-link>
          <router-link v-if="isLoggedIn" to="/user/profile" class="nav-link">Profile</router-link>

          <!-- Auth buttons -->
          <div v-if="!isLoggedIn" class="auth-buttons">
            <router-link to="/user/login" class="btn-auth">Đăng nhập</router-link>
            <router-link to="/user/register" class="btn-auth outline">Đăng ký</router-link>
          </div>

          <div v-else class="auth-user">
            <span class="username">👤 {{ userName }}</span>
            <button class="btn-auth outline" @click="logout">Đăng xuất</button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <router-view :search-query="searchQuery" />
    </main>

    <!-- Footer -->
    <footer class="footer">
      &copy; 2025 Library System. All rights reserved.
    </footer>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getReaderInfo, getReaderToken, logoutReader } from "../services/readerAuth.service.js";

const searchQuery = ref("");
const isLoggedIn = ref(false);
const userName = ref("");
const router = useRouter();

// Hàm cập nhật trạng thái login
const updateUserInfo = () => {
  const token = getReaderToken();
  const info = getReaderInfo();
  if (token && info) {
    isLoggedIn.value = true;
    // Chú ý đổi tên trường đồng bộ với DB
    userName.value = info.HoLot && info.Ten ? `${info.HoLot} ${info.Ten}` : "Độc giả";
  } else {
    isLoggedIn.value = false;
    userName.value = "";
  }
};

// Load lần đầu
onMounted(() => updateUserInfo());

// Lắng nghe event login-success từ Register/Login form
window.addEventListener("login-success", updateUserInfo);

// Search
const onSearch = () => {
  console.log("Tìm kiếm:", searchQuery.value);
};

// Quay về home
const goHome = () => router.push("/user");

// Logout
const logout = () => {
  logoutReader();
  updateUserInfo();
  router.push("/user/login");
};
</script>


<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f6fa;
}

.header {
  background-color: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
.logo { font-size: 1.8rem; margin:0; cursor:pointer; }
.search-bar { display:flex; flex:1 1 300px; max-width:400px; }
.search-bar input { flex:1; padding:0.5rem 10px; border-radius:6px 0 0 6px; border:none; font-size:0.95rem; }
.search-bar button { padding:0.5rem 12px; border:none; border-radius:0 6px 6px 0; background-color:#357ABD; color:white; cursor:pointer; transition:0.2s; }
.search-bar button:hover { background-color:#2a5c9e; }
.nav { display:flex; align-items:center; gap:1rem; }
.nav-link { color:white; text-decoration:none; font-weight:500; transition:0.2s; }
.nav-link:hover { color:#dbe9ff; }
.auth-buttons, .auth-user { display:flex; align-items:center; gap:0.5rem; }
.btn-auth { padding:0.4rem 0.8rem; border-radius:6px; background-color:white; color:#357abd; text-decoration:none; font-weight:500; border:1px solid transparent; transition:0.2s; }
.btn-auth:hover { background-color:#eaf1ff; }
.btn-auth.outline { background:transparent; border:1px solid white; color:white; }
.btn-auth.outline:hover { background-color: rgba(255,255,255,0.15); }
.username { font-weight:500; }
.main { flex:1; padding:2rem; display:flex; flex-direction:column; gap:1rem; }
.footer { text-align:center; padding:1rem; background-color:#ececec; font-size:0.9rem; color:#333; }

@media (max-width:768px) {
  .header-top { flex-direction:column; align-items:flex-start; }
  .search-bar { width:100%; max-width:100%; }
  .nav { width:100%; justify-content:flex-start; flex-wrap:wrap; gap:0.5rem; }
  .auth-buttons, .auth-user { flex-wrap:wrap; }
}
</style>
