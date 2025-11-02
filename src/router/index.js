// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Layout
import AdminLayout from '../components/AdminLayout.vue';

// Views (trang)
import Dashboard from '../views/admin/Dashboard.vue';
import BookList from '../views/admin/BookList.vue';
import BookAdd from '../views/admin/BookAdd.vue';
import BookEdit from '../views/admin/BookEdit.vue';
import PublisherList from '../views/admin/PublisherList.vue';
import PublisherAdd from '../views/admin/PublisherAdd.vue';
import PublisherEdit from '../views/admin/PublisherEdit.vue';
import ReaderList from '../views/admin/ReaderList.vue';
import StaffList from '../views/admin/StaffList.vue';
import CategoryList from '../views/admin/CategoryList.vue';

const routes = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/books' }, // redirect mặc định

      // Dashboard
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },

      // Book routes
      { path: 'books', name: 'BookList', component: BookList },
      { path: 'books/add', name: 'BookAdd', component: BookAdd },
      { path: 'books/edit/:id', name: 'BookEdit', component: BookEdit, props: true },

      // Publisher routes
      { path: 'publishers', name: 'PublisherList', component: PublisherList },
      { path: 'publishers/add', name: 'PublisherAdd', component: PublisherAdd },
      { path: 'publishers/edit/:id', name: 'PublisherEdit', component: PublisherEdit, props: true },

      // Các route khác
      { path: 'readers', name: 'ReaderList', component: ReaderList },
      { path: 'staffs', name: 'StaffList', component: StaffList },
      { path: 'categories', name: 'CategoryList', component: CategoryList },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
