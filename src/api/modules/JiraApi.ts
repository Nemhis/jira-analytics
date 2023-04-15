import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';
import { Raw } from '@/@types/Raw';

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
}
