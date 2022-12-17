import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.LOGIN.path,
    name: Routes.LOGIN.name,
    component: () => import('../views/Login/Login.vue'),
    meta: {
      title: 'Login',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
