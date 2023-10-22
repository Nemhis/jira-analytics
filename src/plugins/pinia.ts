import API from '@/api';
import { createPinia } from 'pinia';

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
