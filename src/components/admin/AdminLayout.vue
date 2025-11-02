<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="sidebar-title">Quản lý thư viện</h2>
      <nav>
        <router-link to="/books" class="nav-item">Quản lý sách</router-link>
        <router-link to="/readers" class="nav-item">Quản lý độc giả</router-link>
        <router-link to="/staffs" class="nav-item">Quản lý nhân viên</router-link>
        <router-link to="/categories" class="nav-item">Quản lý thể loại</router-link>
        <router-link to="/dashboard" class="nav-item">Thống kê</router-link>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <h3>{{ pageTitle }}</h3>
        <div class="user-info">Admin ▾</div>
      </header>

      <section class="content">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      const routeName = this.$route.name;
      switch(routeName) {
        case 'BookList': return 'Quản lý sách';
        case 'ReaderList': return 'Quản lý độc giả';
        case 'StaffList': return 'Quản lý nhân viên';
        case 'CategoryList': return 'Quản lý thể loại';
        case 'Dashboard': return 'Thống kê';
        default: return '';
      }
    }
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #1976d2;
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
  box-shadow: 3px 0 8px rgba(0,0,0,0.1);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.sidebar-title {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-item {
  display: block;
  padding: 12px 18px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  margin-bottom: 12px;
  transition: background 0.3s, transform 0.2s;
  font-weight: 500;
}

.nav-item:hover,
.router-link-active {
  background-color: #115293;
  transform: translateX(4px);
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
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  font-weight: 500;
}

.content {
  padding: 25px;
  background: #f9fafc;
  flex: 1;
}
</style>
