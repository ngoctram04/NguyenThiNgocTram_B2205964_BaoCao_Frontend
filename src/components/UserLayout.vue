<!-- src/components/UserLayout.vue -->
<template>
  <div class="user-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-top">
        <h1 class="logo">📚 Library</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="onSearch"
            placeholder="Tìm sách theo tên hoặc tác giả..."
          />
          <button @click="onSearch">🔍</button>
        </div>
        <nav class="nav">
          <router-link to="/user" class="nav-link">Home</router-link>
          <router-link to="/user/profile" class="nav-link">Profile</router-link>
        </nav>
      </div>
    </header>

    <!-- Main content -->
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
import { ref } from "vue";

const searchQuery = ref("");

const onSearch = () => {
  // Gửi sự kiện search ra component con (trang Home)
  // Hoặc dùng router query: /user?search=...
  // Mình để cơ bản ở đây, router-view có thể nhận prop search-query
  console.log("Tìm kiếm:", searchQuery.value);
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

/* Header */
.header {
  background-color: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  margin: 0;
}

.search-bar {
  display: flex;
  flex: 1 1 300px;
  max-width: 400px;
}

.search-bar input {
  flex: 1;
  padding: 0.5rem 10px;
  border-radius: 6px 0 0 6px;
  border: none;
  font-size: 0.95rem;
}

.search-bar button {
  padding: 0.5rem 12px;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: #357ABD;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}
.search-bar button:hover {
  background-color: #2a5c9e;
}

/* Navigation links */
.nav {
  display: flex;
  gap: 1rem;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #dbe9ff;
}

/* Main */
.main {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Footer */
.footer {
  text-align: center;
  padding: 1rem;
  background-color: #ececec;
  font-size: 0.9rem;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
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
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
