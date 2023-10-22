import { RouteLocationRaw } from 'vue-router';

export const Routes: Record<string, RouteLocationRaw> = {
  LOGIN: {
    path: '/login',
    name: 'login',
  },
  RESOURCES: {
    path: '/resources',
    name: 'resources',
  },
  DASHBOARD: {
    path: '/dashboard/:resourceId',
    name: 'dashboard',
  },
};
