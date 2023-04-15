import { App } from 'vue';
import ChangelogService from '@/services/ChangelogService';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $services: typeof serviceProvider;
  }
}

export const serviceProvider = {
  changelogService: new ChangelogService(),
};

const createServices = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$services = serviceProvider;
  };

  return { install };
};

export default createServices();
