import { registerPlugins } from '@/plugins';
import { createApp } from 'vue';
import App from '@/components/App.vue';
import './registerServiceWorker';

const app = createApp(App);

registerPlugins(app);
app.mount('#app');
