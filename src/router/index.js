import { createRouter, createWebHistory } from 'vue-router';

// --- Admin imports
import Login from '../views/Login.vue';
import AdminLayout from '../components/AdminLayout.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import BookList from "../views/admin/BookList.vue";
import BookAdd from "../views/admin/BookAdd.vue";
import BookEdit from "../views/admin/BookEdit.vue";
import PublisherList from "../views/admin/PublisherList.vue";
import PublisherAdd from "../views/admin/PublisherAdd.vue";
import PublisherEdit from "../views/admin/PublisherEdit.vue";

// --- User imports
import UserLayout from "../components/UserLayout.vue";
import Home from "../views/user/Home.vue";
import BookDetail from "../views/user/BookDetail.vue";
import UserLogin from "../views/user/Login.vue";
import UserRegister from "../views/user/Register.vue";

// --- Helper functions
const getAdminUser = () => JSON.parse(localStorage.getItem('user') || '{}');
const getReaderToken = () => localStorage.getItem('reader_token');

function isAdminAuthenticated() {
  return !!localStorage.getItem('token');
}
function isAdmin() {
  const user = getAdminUser();
  return user.Chucvu?.toLowerCase() === 'admin';
}

// --- Routes
const routes = [
  // --- Admin login
  { path: '/login', component: Login, meta: { guestOnly: true } },

  // --- Admin pages
 // --- Admin pages
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
    { path: 'staffs', component: () => import('../views/admin/StaffList.vue'), meta: { requiresAdmin: true } },
    { path: 'staffs/add', component: () => import('../views/admin/StaffAdd.vue'), meta: { requiresAdmin: true } },
    { path: 'staffs/edit/:id', component: () => import('../views/admin/StaffEdit.vue'), meta: { requiresAdmin: true }, props: true },

    // --- Thêm quản lý độc giả
   { 
  path: 'readers', 
  component: () => import('../views/admin/ReaderList.vue'), 
  meta: { requiresAdminAuth: true }
},
  ]
},


  // --- User pages
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '', component: Home },                 // /user
      { path: 'book/:id', component: BookDetail, props: true }, // Xem chi tiết không cần login
      { path: 'login', component: UserLogin, meta: { guestOnly: true } },
      { path: 'register', component: UserRegister, meta: { guestOnly: true } }
    ]
  },

  // --- Redirect tất cả các route khác về /user
  { path: '/:pathMatch(.*)*', redirect: '/user' }
];

// --- Router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// --- Navigation guards
router.beforeEach((to, from, next) => {
  // --- Admin guards
  if (to.meta.requiresAdminAuth && !isAdminAuthenticated()) {
    next('/login'); // chưa login admin
    return;
  }
  if (to.meta.guestOnly && isAdminAuthenticated()) {
    next('/dashboard'); // admin đã login không vào login
    return;
  }
  if (to.meta.requiresAdmin && !isAdmin()) {
    alert("Chỉ admin mới được truy cập!");
    next('/dashboard');
    return;
  }

  // --- Reader: không bắt đăng nhập cho xem chi tiết
  // Chỉ bắt login trong component khi bấm mượn sách
  next();
});

export default router;
