import type { App } from 'vue';
import router from '@/router';
import pinia from '@/plugins/pinia';
import { createUtils } from '@/plugins/utils';

export function registerPlugins(app: App) {
  app.use(router).use(pinia).use(createUtils());
}
