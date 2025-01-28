import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import EntryView from '@/views/EntryView.vue';
import StockView from '../views/StockView.vue';

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
  },
  {
    path: '/intrari',
    name: 'Intrari',
    component: EntryView,
  },
  {
    path: '/stoc',
    name: 'Stoc',
    component: StockView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
