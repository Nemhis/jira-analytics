import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';
import Project from '@/adapters/Project';

export default class JiraApi extends AbstractApi {
  search(resourceId: string, projectKey: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/search?jql=project = ${projectKey}`);
  }
  projects(resourceId: string): Promise<AxiosResponse> {
    return this.api.get<Project>(`/${resourceId}/rest/api/3/project/search`);
  }
  project(resourceId: string, projectKey: string): Promise<AxiosResponse> {
    return this.api.get<Project>(`/${resourceId}/rest/api/3/project/${projectKey}`);
  }
}
