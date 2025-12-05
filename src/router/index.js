import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import AdminLayout from '../components/AdminLayout.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import BookList from "../views/admin/BookList.vue";
import BookAdd from "../views/admin/BookAdd.vue";
import BookEdit from "../views/admin/BookEdit.vue";
import PublisherList from "../views/admin/PublisherList.vue";
import PublisherAdd from "../views/admin/PublisherAdd.vue";
import PublisherEdit from "../views/admin/PublisherEdit.vue";
import CategoryList from "../views/admin/CategoryList.vue";
import CategoryAdd from "../views/admin/CategoryAdd.vue";
import CategoryEdit from "../views/admin/CategoryEdit.vue";

import UserLayout from "../components/UserLayout.vue";
import Home from "../views/user/Home.vue";
import BookDetail from "../views/user/BookDetail.vue";
import UserLogin from "../views/user/Login.vue";
import UserRegister from "../views/user/Register.vue";
import BorrowHistory from "../views/user/BorrowHistory.vue"; 

import NotFound from "../components/NotFound.vue";

const getAdminUser = () => JSON.parse(localStorage.getItem('user') || '{}');
const getReaderToken = () => localStorage.getItem('reader_token');
const getAdminToken = () => localStorage.getItem('token');

function isAdmin() {
  const user = getAdminUser();
  return user.Chucvu?.toLowerCase() === 'admin';
}

const routes = [
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

      { path: 'categories', component: CategoryList },
      { path: 'categories/add', component: CategoryAdd },
      { path: 'categories/edit/:id', component: CategoryEdit, props: true },

      { path: 'staffs', component: () => import('../views/admin/StaffList.vue'), meta: { requiresAdmin: true } },
      { path: 'staffs/add', component: () => import('../views/admin/StaffAdd.vue'), meta: { requiresAdmin: true } },
      { path: 'staffs/edit/:id', component: () => import('../views/admin/StaffEdit.vue'), meta: { requiresAdmin: true }, props: true },

      { path: 'readers', component: () => import('../views/admin/ReaderList.vue') },
      { path: 'borrows', component: () => import('../views/admin/BorrowList.vue') },
    ],
  },

  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '', component: Home },
      { path: 'book/:id', component: BookDetail, props: true },
      { path: 'login', component: UserLogin, meta: { guestOnly: true } },
      { path: 'register', component: UserRegister, meta: { guestOnly: true } },
      { path: 'borrow-history', component: BorrowHistory },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const adminToken = getAdminToken();
  const readerToken = getReaderToken();

  if (to.meta.requiresAdminAuth && !adminToken) return next('/login');

  if (to.meta.guestOnly && adminToken && to.path === '/login') return next('/dashboard');

  if (to.meta.requiresAdmin && !isAdmin()) {
    alert("Chỉ admin mới được truy cập!");
    return next('/dashboard');
  }

  if (to.path.startsWith('/user')) {
    if (to.meta.guestOnly && readerToken) return next('/user');
    if (to.path === '/user/my-borrows' && !readerToken) {
      alert("Vui lòng đăng nhập để xem lịch sử mượn sách!");
      return next('/user/login');
    }
  }

  next();
});

export default router;
