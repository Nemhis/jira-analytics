import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

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
