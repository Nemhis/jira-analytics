import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';

export default class JiraApi extends AbstractApi {
  search(resourceId: string, jql: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/search`, { params: { jql } });
  }

  getProjects(resourceId: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/project/search`);
  }

  getProject(resourceId: string, projectKey: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/project/${projectKey}`);
  }
}
