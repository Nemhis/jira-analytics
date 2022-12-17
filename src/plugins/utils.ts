import { App } from 'vue';
import * as string from '@/utils/string';

const utils = {
  string,
};

export const createUtils = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$utils = utils;
  };

  return { install };
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $utils: typeof utils;
  }
}
