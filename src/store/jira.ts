import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import Issue from '@/adapters/Issue';
import { Raw } from '@/@types/Raw';

export const useJiraStore = defineStore('jira', {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    search(resourceId: string): Promise<Issue[]> {
      return this.$api.jira.search(resourceId).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.issues) ? data.issues.map((raw: Raw) => Issue.fromRaw(raw)) : [];
      });
    },
  },
});
