import { createPinia } from 'pinia';
import createApiInstance from '@/api/api-factory';
import Api from '@/api';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: Api;
  }
}

const pinia = createPinia();

pinia.use(() => ({
  $api: new Api(createApiInstance()),
}));

export default pinia;
