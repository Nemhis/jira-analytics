import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.LOGIN.path,
    name: Routes.LOGIN.name,
    component: () => import('@/views/Login.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Login',
    },
  },
  {
    path: Routes.RESOURCES.path,
    name: Routes.RESOURCES.name,
    component: () => import('@/views/Resources.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Resources',
    },
  },
  {
    path: Routes.DASHBOARD.path,
    name: Routes.DASHBOARD.name,
    component: () => import('@/views/Dashboard.vue'),
    props: true,
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/',
    redirect: Routes.RESOURCES,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
