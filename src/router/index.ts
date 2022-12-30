import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.MAIN.path,
    name: Routes.MAIN.name,
    component: () => import('../views/MainPage.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Jira Analytics',
    },
  },
  {
    path: Routes.LOGIN.path,
    name: Routes.LOGIN.name,
    component: () => import('../views/Login.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Login',
    },
  },
  {
    path: Routes.RESOURCES.path,
    name: Routes.RESOURCES.name,
    component: () => import('../views/Resources.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Resources',
    },
  },
  {
    path: Routes.DASHBOARD.path,
    name: Routes.DASHBOARD.name,
    component: () => import('../views/Dashboard.vue'),
    props: (route: RouteLocation) => ({ query: route.query }),
    meta: {
      title: 'Dashboard',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
