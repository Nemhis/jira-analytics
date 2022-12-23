import { createPinia } from 'pinia';
import { createJira, createProxy, createAtlassian } from '@/api/api-factory';
import Api from '@/api';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: Api;
  }
}

const pinia = createPinia();

pinia.use(() => ({
  $api: new Api({
    proxy: createProxy(),
    jira: createJira(),
    atlassian: createAtlassian(),
  }),
}));

export default pinia;
