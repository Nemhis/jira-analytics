import { App } from 'vue';
import * as string from '@/utils/string';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $utils: typeof utils;
  }
}

const utils = {
  string,
};

const createUtils = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$utils = utils;
  };

  return { install };
};

export default createUtils();
