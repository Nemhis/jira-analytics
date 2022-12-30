export const Routes = {
  MAIN: {
    path: '/',
    name: 'Jira Analytics',
  },
  LOGIN: {
    path: '/login',
    name: 'login',
  },
  RESOURCES: {
    path: '/resources/',
    name: 'resources',
  },
  DASHBOARD: {
    path: '/dashboard/:resourceId?',
    name: 'dashboard',
  },
};
