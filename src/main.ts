import { createApp } from 'vue';
import App from '@/components/App.vue';
import './registerServiceWorker';
import { registerPlugins } from '@/plugins';
import Header from '@/components/Header.vue';

const app = createApp(App);

app.component('Header', Header);
registerPlugins(app);
app.mount('#app');
