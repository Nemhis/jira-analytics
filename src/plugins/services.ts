import { App } from 'vue';
import ChangelogService from '@/services/ChangelogService';
import StatusService from '@/services/StatusService';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $services: typeof serviceProvider;
  }
}

export const serviceProvider = {
  changelog: new ChangelogService(),
  status: new StatusService(),
};

const createServices = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$services = serviceProvider;
  };

  return { install };
};

export default createServices();
