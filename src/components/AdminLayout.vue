<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="sidebar-title">Quản lý thư viện</h2>
      <nav class="menu">
        <router-link
          v-for="item in filteredMenu"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <span class="nav-label">{{ item.name }}</span>

          <span
            v-if="item.path === '/borrows' && pendingCount > 0"
            class="badge"
          >
            {{ pendingCount }}
          </span>

          <div class="active-bar" v-if="isActive(item.path)"></div>
        </router-link>

        <a href="#" class="nav-item logout" @click.prevent="logout">
          <span class="nav-label">Đăng xuất</span>
        </a>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <h3 class="page-title">{{ pageTitle }}</h3>
        <div class="user-info">{{ user.HoTenNV }} ▾</div>
      </header>

      <section class="content">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import borrowService from "../services/borrow.service.js";

const router = useRouter();
const route = useRoute();

const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = computed(() => user?.Chucvu?.toLowerCase() === "admin");

const menuItems = [
  { name: "Thống kê", path: "/dashboard" },
  { name: "Quản lý sách", path: "/books" },
  { name: "Quản lý NXB", path: "/publishers" },
  { name: "Quản lý thể loại", path: "/categories" },
  { name: "Quản lý độc giả", path: "/readers" },
  { name: "Quản lý nhân viên", path: "/staffs", adminOnly: true },
  { name: "Quản lý phiếu mượn", path: "/borrows" }
];

const filteredMenu = computed(() =>
  menuItems.filter((item) => !item.adminOnly || isAdmin.value)
);

const pageTitle = computed(() => {
  const match = menuItems.find((item) => route.path.startsWith(item.path));
  return match ? match.name : "";
});

const isActive = (path) => route.path.startsWith(path);

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  router.push("/login");
};

const pendingCount = ref(0);

const fetchPendingBorrows = async () => {
  try {
    const borrows = await borrowService.getAll();
    pendingCount.value = borrows.filter(v => v.TrangThai === "CHUA_DUYET").length;
  } catch (err) {
    console.error("Lỗi lấy phiếu chờ duyệt:", err);
  }
};

onMounted(fetchPendingBorrows);
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f3f6fb;
  font-family: "Inter", system-ui, sans-serif;
}

.sidebar {
  width: 240px;
  background: #1a73e8;
  color: white;
  padding: 28px 18px;
  box-shadow: 3px 0 12px rgba(0,0,0,0.1);
  border-radius: 0 16px 16px 0;
}

.sidebar-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 30px;
  padding-left: 5px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: 0.2s;
  overflow: hidden;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-item.active {
  background: rgba(0, 0, 0, 0.18);
}

.active-bar {
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background: #ffeb3b;
  border-radius: 0 4px 4px 0;
}

.badge {
  background: #ff5252;
  color: white;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 10px;
  font-weight: 600;
}

.nav-item.logout {
  margin-top: 20px;
  background: #d32f2f;
}
.nav-item.logout:hover {
  background: #c62828;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 64px;
  background: white;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.user-info {
  color: #444;
  font-weight: 500;
}

.content {
  flex: 1;
  padding: 25px 30px;
  background: #f3f6fb;
}
.admin-layout { display: flex; height: 100vh; background: #f3f6fb; font-family: "Inter", system-ui, sans-serif; }
.sidebar { width: 240px; background: #1a73e8; color: white; padding: 28px 18px; box-shadow: 3px 0 12px rgba(0,0,0,0.1); border-radius: 0 16px 16px 0; }
.sidebar-title { font-size: 22px; font-weight: 700; margin-bottom: 30px; padding-left: 5px; }
.menu { display: flex; flex-direction: column; gap: 10px; }
.nav-item { position: relative; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 10px; color: white; text-decoration: none; font-size: 15px; font-weight: 500; transition: 0.2s; overflow: hidden; }
.nav-item:hover { background: rgba(255, 255, 255, 0.15); }
.nav-item.active { background: rgba(0, 0, 0, 0.18); }
.active-bar { position: absolute; left: 0; width: 4px; height: 100%; background: #ffeb3b; border-radius: 0 4px 4px 0; }
.badge { background: #ff5252; color: white; padding: 3px 8px; font-size: 12px; border-radius: 10px; font-weight: 600; }
.nav-item.logout { margin-top: 20px; background: #d32f2f; }
.nav-item.logout:hover { background: #c62828; }
.main-content { flex: 1; display: flex; flex-direction: column; }
.topbar { height: 64px; background: white; padding: 0 28px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 3px 10px rgba(0,0,0,0.08); }
.page-title { font-size: 20px; font-weight: 600; color: #333; }
.user-info { color: #444; font-weight: 500; }
.content { flex: 1; padding: 25px 30px; background: #f3f6fb; }
</style>
