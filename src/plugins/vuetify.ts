import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

const vuetify = createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: 'lg',
    thresholds: {
      lg: 992,
    },
  },
});

export default vuetify;
