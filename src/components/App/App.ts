// @Watch('$route', { immediate: true }) routeChanged({ meta }: RouteLocation): void {
//   document.title = meta.title ? String(meta.title) : DEFAULT_APP_TITLE;
// }

import { defineComponent } from 'vue';
import { RouteLocation } from 'vue-router';
import { DEFAULT_APP_TITLE } from '@/const';

export default defineComponent({
  name: 'App',
  watch: {
    $route: {
      handler({ meta }: RouteLocation): void {
        document.title = meta.title ? String(meta.title) : DEFAULT_APP_TITLE;
      },
      immediate: true,
    },
  },
});
