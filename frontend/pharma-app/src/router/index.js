import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import EntryView from '@/views/EntryView.vue';
import StockView from '../views/StockView.vue';
import TransactionView from '../views/TransactionView.vue';
import ExitView from '../views/ExitView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/intrari',
    name: 'Intrari',
    component: EntryView,
    meta: { requiresAuth: true },
  },
  {
    path: '/stoc',
    name: 'Stoc',
    component: StockView,
    meta: { requiresAuth: true },
  },
  {
    path: '/tranzactii',
    name: 'Tranzactii',
    component: TransactionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/iesiri',
    name: 'Iesiri',
    component: ExitView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
