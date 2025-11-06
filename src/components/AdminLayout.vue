<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Quản lý thư viện</h2>
      <nav>
        <router-link to="/books" class="nav-item">Quản lý sách</router-link>
        <router-link to="/publishers" class="nav-item">Quản lý nhà xuất bản</router-link>
        <router-link to="/readers" class="nav-item">Quản lý độc giả</router-link>
        <router-link v-if="isAdmin" to="/staffs" class="nav-item">Quản lý nhân viên</router-link>
        <router-link to="/categories" class="nav-item">Quản lý thể loại</router-link>
        <router-link to="/dashboard" class="nav-item">Thống kê</router-link>
        <a @click.prevent="logout" href="#" class="nav-item logout">Đăng xuất</a>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <header class="topbar">
        <h3>{{ pageTitle }}</h3>
        <div class="user-info">{{ user.HoTenNV }} ▾</div>
      </header>
      <section class="content">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Lấy user từ localStorage
const user = reactive(JSON.parse(localStorage.getItem("user") || "{}"));

// Kiểm tra admin
const isAdmin = computed(() => user?.Chucvu === "admin");

// Tiêu đề trang
const pageTitle = computed(() => {
  switch (route.name) {
    case "BookList":
    case "BookAdd":
    case "BookEdit":
      return "Quản lý sách";
    case "PublisherList":
    case "PublisherAdd":
    case "PublisherEdit":
      return "Quản lý nhà xuất bản";
    case "ReaderList":
      return "Quản lý độc giả";
    case "StaffList":
      return "Quản lý nhân viên";
    case "CategoryList":
      return "Quản lý thể loại";
    case "Dashboard":
      return "Thống kê";
    default:
      return "";
  }
});

// Logout
const logout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #1976d2;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 8px rgba(0,0,0,0.1);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.sidebar-title {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.nav-item {
  display: block;
  padding: 12px 18px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  margin-bottom: 12px;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
}

.nav-item:hover,
.router-link-active {
  background-color: #115293;
  transform: translateX(4px);
}

.nav-item.logout {
  margin-top: auto;
  background-color: #d32f2f;
  text-align: center;
}

.nav-item.logout:hover {
  background-color: #9a0007;
}

/* Main content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: white;
  padding: 18px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.content {
  flex: 1;
  padding: 25px;
  background: #f9fafc;
}
</style>
