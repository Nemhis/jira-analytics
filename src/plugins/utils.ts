import { App } from 'vue';
import * as string from '@/utils/string';
import * as url from '@/utils/url';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $utils: typeof utils;
  }
}

const utils = {
  string,
  url,
};

const createUtils = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$utils = utils;
  };

  return { install };
};

export default createUtils();
