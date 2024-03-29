import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { App } from 'vue';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('ru');

export const createDayJs = (): { install: (app: App) => void } => {
  const install = (app: App) => {
    app.config.globalProperties.$date = dayjs;
  };

  return { install };
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $date: (date?: dayjs.ConfigType, format?: dayjs.OptionType) => dayjs.Dayjs;
  }
}

export default createDayJs();
