import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';

export default class JiraApi extends AbstractApi {
  search(resourceId: string): Promise<AxiosResponse> {
    return this.api.get(`/${resourceId}/rest/api/3/search?jql=project = "B2B" &startAt=0&maxResults=50`);
  }
}
