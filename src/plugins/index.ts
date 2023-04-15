import type { App } from 'vue';
import { loadFonts } from './webfont';
import router from '@/router';
import pinia from '@/plugins/pinia';
import utils from '@/plugins/utils';
import vuetify from '@/plugins/vuetify';
import dayjs from '@/plugins/dayjs';
import services from '@/plugins/services';

export function registerPlugins(app: App) {
  loadFonts().then();
  app.use(router).use(pinia).use(utils).use(vuetify).use(dayjs).use(services);
}
