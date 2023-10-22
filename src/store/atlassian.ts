import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { Raw } from '@/@interfaces/Raw';
import AccessibleResource from '@/adapters/AccessibleResource';

export const useAtlassianStore = defineStore('atlassian', {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    getAccessibleResources(): Promise<AccessibleResource[]> {
      return this.$api.atlassian.getAccessibleResources().then(({ data }: AxiosResponse) => {
        return Array.isArray(data) ? data.map((raw: Raw) => AccessibleResource.fromRaw(raw)) : [];
      });
    },
  },
});
