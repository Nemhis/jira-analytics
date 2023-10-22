import router from '@/router';
import type { App } from 'vue';
import dayjs from '@/plugins/dayjs';
import pinia from '@/plugins/pinia';
import services from '@/plugins/services';
import utils from '@/plugins/utils';
import vuetify from '@/plugins/vuetify';
import { loadFonts } from './webfont';

export function registerPlugins(app: App) {
  loadFonts().then();
  app.use(router).use(pinia).use(utils).use(vuetify).use(dayjs).use(services);
}
