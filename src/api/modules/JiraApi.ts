import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';
import { Raw } from '@/@interfaces/Raw';

export default class JiraApi extends AbstractApi {
  search(resourceId: string, params: Raw): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/search`, { params });
  }

  getProjects(resourceId: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/project/search`);
  }

  getProject(resourceId: string, projectKey: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/project/${projectKey}`);
  }

  getChangelog(resourceId: string, issueKey: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/issue/${issueKey}/changelog`);
  }

  getWorkflowStatuses(resourceId: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/status`);
  }

  getUsers(resourceId: string, query: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/user/search?includeInactive=false&maxResults=30&query=${query}`);
  }

  getBoards(resourceId: string, projectId: number | null): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/agile/1.0/board?${projectId ? `projectKeyOrId=${projectId}` : ''}`);
  }

  getSprints(resourceId: string, boardId: number | null): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/agile/1.0/board/${boardId}/sprint`);
  }
}
