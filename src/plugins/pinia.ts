import { createPinia } from 'pinia';
import API from '@/api';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: typeof API;
  }
}

const pinia = createPinia();

pinia.use(() => ({
  $api: API,
}));

export default pinia;
