import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';
import { Raw } from '@/@interfaces/Raw';
import { createJira } from '@/api/api-factory';

export default class JiraApi extends AbstractApi {
  setResource(resourceId: string): void {
    this.api = createJira(resourceId);
  }

  search(params: Raw): Promise<AxiosResponse> {
    return this.api.get('/rest/api/3/search', { params });
  }

  getProjects(): Promise<AxiosResponse> {
    return this.api.get('/rest/api/3/project/search');
  }

  getProject(projectKey: string): Promise<AxiosResponse> {
    return this.api.get(`/rest/api/3/project/${projectKey}`);
  }

  getChangelog(issueKey: string): Promise<AxiosResponse> {
    return this.api.get(`/rest/api/3/issue/${issueKey}/changelog`);
  }

  searchStatusesPaginated(): Promise<AxiosResponse> {
    return this.api.get('/rest/api/3/statuses/search', { params: { expand: 'usages' } });
  }

  getUsers(query: string): Promise<AxiosResponse> {
    return this.api.get(`/rest/api/3/user/search?includeInactive=false&maxResults=30&query=${query}`);
  }

  getBoards(projectId: number | null): Promise<AxiosResponse> {
    return this.api.get(`/rest/agile/1.0/board?${projectId ? `projectKeyOrId=${projectId}` : ''}`);
  }

  getSprints(boardId: number | null): Promise<AxiosResponse> {
    return this.api.get(`/rest/agile/1.0/board/${boardId}/sprint`);
  }
}
