import type { App } from 'vue';
import router from '@/router';
import pinia from '@/plugins/pinia';

export function registerPlugins(app: App) {
  app.use(router).use(pinia);
}
