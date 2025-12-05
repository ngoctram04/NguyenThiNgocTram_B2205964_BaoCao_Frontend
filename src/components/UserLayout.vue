<template>
  <div class="user-layout">
    <header class="header">
      <div class="header-top">
        <h1 class="logo" @click="goHome">Library</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Tìm sách theo tên hoặc tác giả..."
          />
        </div>

        <nav class="nav">
          <router-link to="/user" class="nav-link">Trang chủ</router-link>
          <router-link v-if="isLoggedIn" to="/user/borrow-history" class="nav-link">Lịch sử mượn</router-link>
          <div v-if="!isLoggedIn" class="auth-buttons">
            <router-link to="/user/login" class="btn-auth">Đăng nhập</router-link>
            <router-link to="/user/register" class="btn-auth outline">Đăng ký</router-link>
          </div>

          <div v-else class="auth-user">
            <span class="username">{{ userName }}</span>
            <button class="btn-auth outline" @click="logout">Đăng xuất</button>
          </div>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-view :search-query="searchQuery" />
    </main>

    <footer class="footer">
      &copy; 2025 Library System. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getReaderInfo, getReaderToken, logoutReader } from "../services/readerAuth.service.js";

const searchQuery = ref("");
const isLoggedIn = ref(false);
const userName = ref("");
const router = useRouter();
const route = useRoute();

const updateUserInfo = () => {
  const token = getReaderToken();
  const info = getReaderInfo();
  if (token && info) {
    isLoggedIn.value = true;
    userName.value = info.HoLot && info.Ten ? `${info.HoLot} ${info.Ten}` : "Độc giả";
  } else {
    isLoggedIn.value = false;
    userName.value = "";
  }
};

onMounted(() => {
  updateUserInfo();

  if (route.query.q) searchQuery.value = route.query.q;
});

window.addEventListener("login-success", updateUserInfo);

const goHome = () => router.push("/user");

const logout = () => {
  logoutReader();
  updateUserInfo();
  router.push("/user/login");
};

watch(searchQuery, (newVal) => {
  router.replace({ path: "/user", query: newVal ? { q: newVal } : {} });
});
</script>


<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
}

.header {
  background-color: #1f2937;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}

.header-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  letter-spacing: 1px;
}

.search-bar {
  display: flex;
  flex: 1 1 300px;
  max-width: 400px;
}

.search-bar input {
  flex: 1;
  padding: 0.55rem 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s;
}
.search-bar input:focus {
  border-color: #3b82f6;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  transition: 0.2s;
}
.nav-link:hover {
  background-color: rgba(255,255,255,0.15);
}

.auth-buttons, .auth-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-auth {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  background-color: white;
  color: #1f2937;
  font-weight: 500;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
}
.btn-auth:hover {
  background-color: #f3f4f6;
}

.btn-auth.outline {
  background: transparent;
  border: 1px solid white;
  color: white;
}
.btn-auth.outline:hover {
  background-color: rgba(255,255,255,0.2);
}

.username {
  font-weight: 500;
}

.main {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: #e5e7eb;
  font-size: 0.9rem;
  color: #374151;
  border-top: 1px solid #d1d5db;
}

@media (max-width:768px) {
  .header-top {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-bar {
    width: 100%;
    max-width: 100%;
  }
  .nav {
    width: 100%;
    justify-content: flex-start;
    gap: 0.5rem;
  }
  .auth-buttons, .auth-user {
    flex-wrap: wrap;
  }
}
</style>
