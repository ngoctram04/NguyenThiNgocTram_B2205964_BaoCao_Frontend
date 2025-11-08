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

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function isAdmin() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.Chucvu?.toLowerCase() === 'admin';
}

const routes = [
  { 
    path: '/login', 
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'books', component: BookList },
      { path: 'books/add', component: BookAdd },
      { path: 'books/edit/:id', component: BookEdit },
      { path: 'publishers', component: PublisherList },
      { path: 'publishers/add', component: PublisherAdd },
      { path: 'publishers/edit/:id', component: PublisherEdit, props: true },
      { 
        path: 'staffs', 
        component: () => import('../views/admin/StaffList.vue'), 
        meta: { requiresAdmin: true } 
      },
      { 
        path: 'staffs/add', 
        component: () => import('../views/admin/StaffAdd.vue'), 
        meta: { requiresAdmin: true } 
      },
      { 
        path: 'staffs/edit/:id', 
        component: () => import('../views/admin/StaffEdit.vue'), 
        meta: { requiresAdmin: true }, 
        props: true 
      },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const loggedIn = isAuthenticated();

  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else if (to.meta.guestOnly && loggedIn) {
    next('/dashboard');
  } else if (to.meta.requiresAdmin && !isAdmin()) {
    alert("Chỉ admin mới được truy cập!");
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
