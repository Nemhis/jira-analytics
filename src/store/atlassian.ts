import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import AccessibleResource from '@/adapters/AccessibleResource';
import { Raw } from '@/@types/Raw';

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
