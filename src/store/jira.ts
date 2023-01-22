import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import Issue from '@/adapters/Issue';
import { Raw } from '@/@types/Raw';
import Project from '@/adapters/Project';

export const useJiraStore = defineStore('jira', {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    search(resourceId: string, projectKey: string): Promise<Issue[]> {
      return this.$api.jira.search(resourceId, projectKey).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.issues) ? data.issues.map((raw: Raw) => Issue.fromRaw(raw)) : [];
      });
    },
    projects(resourceId: string): Promise<Project[]> {
      return this.$api.jira.projects(resourceId).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.values) ? data.values.map((raw: Raw) => Project.fromRaw(raw)) : [];
      });
    },
    project(resourceId: string, projectKey: string): Promise<Project[]> {
      return this.$api.jira.project(resourceId, projectKey).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },
  },
});
