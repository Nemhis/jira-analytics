import { createApp } from 'vue';
import App from '@/components/App.vue';
import './registerServiceWorker';
import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);
app.mount('#app');
