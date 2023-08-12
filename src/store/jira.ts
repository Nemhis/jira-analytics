import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import Issue from '@/adapters/Issue';
import { Raw } from '@/@interfaces/Raw';
import Project from '@/adapters/Project';
import Filter from '@/adapters/Filter';
import PaginatedList from '@/adapters/PaginatedList';
import Changelog from '@/adapters/Changelog';
import WorkflowStatus from '@/adapters/WorkflowStatus';
import User from '@/adapters/User';
import Sprint from '@/adapters/Sprint';
import Board from '@/adapters/Board';

export const useJiraStore = defineStore('jira', {
  state: () => ({
    workflowStatuses: {} as Record<number, WorkflowStatus>,
  }),
  getters: {},
  actions: {
    search(resourceId: string, params: Filter): Promise<Issue[]> {
      const jql = Filter.toJQL(params) ? { jql: Filter.toJQL(params) } : {};

      return this.$api.jira.search(resourceId, jql).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.issues) ? data.issues.map((raw: Raw) => Issue.fromRaw(raw)) : [];
      });
    },

    getProjects(resourceId: string): Promise<Project[]> {
      return this.$api.jira.getProjects(resourceId).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.values) ? data.values.map((raw: Raw) => Project.fromRaw(raw)) : [];
      });
    },

    getProject(resourceId: string, projectKey: string): Promise<Project[]> {
      return this.$api.jira.getProject(resourceId, projectKey).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getUsers(resourceId: string, query: string): Promise<User[]> {
      return this.$api.jira.getUsers(resourceId, query).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getBoards(resourceId: string, projectId: number | null): Promise<Board[]> {
      return this.$api.jira.getBoards(resourceId, projectId).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getSprints(resourceId: string, boardId: number | null): Promise<Sprint[]> {
      return this.$api.jira.getSprints(resourceId, boardId).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    loadChangelog(resourceId: string, issueKey: string): Promise<PaginatedList<Changelog>> {
      return this.$api.jira.getChangelog(resourceId, issueKey).then(({ data }: AxiosResponse) => {
        const list: PaginatedList<Changelog> = PaginatedList.fromRaw(data);
        list.values = Array.isArray(data.values) ? data.values.map((itemRaw: Raw) => Changelog.fromRaw(itemRaw)) : [];

        return list;
      });
    },

    loadWorkflowStatuses(resourceId: string): Promise<WorkflowStatus[]> {
      return Object.keys(this.$state.workflowStatuses).length === 0
        ? this.$api.jira.getWorkflowStatuses(resourceId).then(({ data }: AxiosResponse) => {
            const statuses: WorkflowStatus[] = Array.isArray(data)
              ? data.map((raw: Raw) => WorkflowStatus.fromRaw(raw))
              : [];

            statuses.forEach((status: WorkflowStatus) => {
              this.$state.workflowStatuses[status.id] = status;
            });

            return statuses;
          })
        : Promise.resolve(Object.values(this.$state.workflowStatuses));
    },
  },
});
