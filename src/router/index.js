import { createRouter, createWebHistory } from 'vue-router';

/* ==========================
   --- ADMIN IMPORTS ---
========================== */
import Login from '../views/Login.vue';
import AdminLayout from '../components/AdminLayout.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import BookList from "../views/admin/BookList.vue";
import BookAdd from "../views/admin/BookAdd.vue";
import BookEdit from "../views/admin/BookEdit.vue";
import PublisherList from "../views/admin/PublisherList.vue";
import PublisherAdd from "../views/admin/PublisherAdd.vue";
import PublisherEdit from "../views/admin/PublisherEdit.vue";

/* ==========================
   --- USER IMPORTS ---
========================== */
import UserLayout from "../components/UserLayout.vue";
import Home from "../views/user/Home.vue";
import BookDetail from "../views/user/BookDetail.vue";
import UserLogin from "../views/user/Login.vue";
import UserRegister from "../views/user/Register.vue";

/* ==========================
   --- HELPER FUNCTIONS ---
========================== */
const getAdminUser = () => JSON.parse(localStorage.getItem('user') || '{}');
const getReaderToken = () => localStorage.getItem('reader_token');
const getAdminToken = () => localStorage.getItem('token');

function isAdminAuthenticated() {
  return !!getAdminToken();
}
function isAdmin() {
  const user = getAdminUser();
  return user.Chucvu?.toLowerCase() === 'admin';
}

/* ==========================
   --- ROUTES CONFIG ---
========================== */
const routes = [
  /* ---------- ADMIN / STAFF ---------- */
  { path: '/login', component: Login, meta: { guestOnly: true } },

  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAdminAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'books', component: BookList },
      { path: 'books/add', component: BookAdd },
      { path: 'books/edit/:id', component: BookEdit, props: true },

      { path: 'publishers', component: PublisherList },
      { path: 'publishers/add', component: PublisherAdd },
      { path: 'publishers/edit/:id', component: PublisherEdit, props: true },

      // Chỉ admin mới được thao tác với staff
      { path: 'staffs', component: () => import('../views/admin/StaffList.vue'), meta: { requiresAdmin: true } },
      { path: 'staffs/add', component: () => import('../views/admin/StaffAdd.vue'), meta: { requiresAdmin: true } },
      { path: 'staffs/edit/:id', component: () => import('../views/admin/StaffEdit.vue'), meta: { requiresAdmin: true }, props: true },

      // Quản lý độc giả
      { path: 'readers', component: () => import('../views/admin/ReaderList.vue') },
    ],
  },

  /* ---------- USER / READER ---------- */
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '', component: Home }, // /user
      { path: 'book/:id', component: BookDetail, props: true }, // xem sách
      { path: 'login', component: UserLogin, meta: { guestOnly: true } },
      { path: 'register', component: UserRegister, meta: { guestOnly: true } },
    ],
  },

  /* ---------- FALLBACK ---------- */
  { path: '/:pathMatch(.*)*', redirect: '/user' },
];

/* ==========================
   --- ROUTER INIT ---
========================== */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* ==========================
   --- NAVIGATION GUARDS ---
========================== */
router.beforeEach((to, from, next) => {
  const adminToken = getAdminToken();
  const readerToken = getReaderToken();

  /* ---------- ADMIN GUARDS ---------- */
  if (to.meta.requiresAdminAuth && !adminToken) {
    return next('/login'); // chưa login admin
  }

  if (to.meta.guestOnly && adminToken && to.path === '/login') {
    return next('/dashboard'); // admin đã login thì không vào login
  }

  if (to.meta.requiresAdmin && !isAdmin()) {
    alert("Chỉ admin mới được truy cập!");
    return next('/dashboard');
  }

  /* ---------- USER GUARDS ---------- */
  if (to.path.startsWith('/user')) {
    // Nếu đã login reader mà vào /user/login hoặc /user/register → chuyển về /user
    if (to.meta.guestOnly && readerToken) {
      return next('/user');
    }
  }

  next();
});

export default router;
