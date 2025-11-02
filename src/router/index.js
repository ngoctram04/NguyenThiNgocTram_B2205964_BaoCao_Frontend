import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../components/admin/AdminLayout.vue';
import Dashboard from '../components/admin/Dashboard.vue';
import BookList from '../components/admin/BookList.vue';
import BookAdd from '../components/admin/BookAdd.vue';
import BookEdit from '../components/admin/BookEdit.vue';
import ReaderList from '../components/admin/ReaderList.vue';
import StaffList from '../components/admin/StaffList.vue';
import CategoryList from '../components/admin/CategoryList.vue';

const routes = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: '', redirect: 'books' },

      // Dashboard
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },

      // Book routes
      { path: 'books', name: 'Books', component: BookList },
      { path: 'books/add', name: 'BookAdd', component: BookAdd },
      { path: 'books/edit/:id', name: 'BookEdit', component: BookEdit },

      // Các route khác
      { path: 'readers', name: 'Readers', component: ReaderList },
      { path: 'staffs', name: 'Staffs', component: StaffList },
      { path: 'categories', name: 'Categories', component: CategoryList },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
