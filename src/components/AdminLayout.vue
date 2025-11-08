<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="sidebar-title">Quản lý thư viện</h2>
      <nav>
        <router-link
          v-for="item in filteredMenu"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
        <a href="#" class="nav-item logout" @click.prevent="logout">
          Đăng xuất
        </a>
      </nav>
    </aside>

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
import { reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const user = reactive(JSON.parse(localStorage.getItem("user") || "{}"));

const isAdmin = computed(() => user?.Chucvu?.toLowerCase() === "admin");

const menuItems = [
  { name: "Thống kê", path: "/dashboard" },
  { name: "Quản lý sách", path: "/books" },
  { name: "Quản lý NXB", path: "/publishers" },
  { name: "Quản lý độc giả", path: "/readers" },
  { name: "Quản lý nhân viên", path: "/staffs", adminOnly: true },
  { name: "Quản lý thể loại", path: "/categories" },
];

const filteredMenu = computed(() =>
  menuItems.filter((item) => !item.adminOnly || isAdmin.value)
);

const pageTitle = computed(() => {
  const path = route.path;
  const match = menuItems.find((item) => path.startsWith(item.path));
  return match ? match.name : "";
});

const isActive = (path) => route.path.startsWith(path);

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #1976d2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 8px rgba(0,0,0,0.1);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.sidebar-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
}

.nav-item {
  display: block;
  padding: 12px 18px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item.active {
  background-color: #115293;
}

.nav-item:hover {
  background-color: #115293;
}

.nav-item.logout {
  margin-top: auto;
  background-color: #d32f2f;
  text-align: center;
}

.nav-item.logout:hover {
  background-color: #9a0007;
}

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
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
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
