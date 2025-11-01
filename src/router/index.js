import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/admin/Dashboard.vue';
import BookList from '../components/admin/BookList.vue';
import ReaderList from '../components/admin/ReaderList.vue';
import StaffList from '../components/admin/StaffList.vue';
import CategoryList from '../components/admin/CategoryList.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/books', component: BookList },
  { path: '/readers', component: ReaderList },
  { path: '/staffs', component: StaffList },
  { path: '/categories', component: CategoryList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
